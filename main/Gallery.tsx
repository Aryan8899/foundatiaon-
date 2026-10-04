"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useLanguage } from "@/main/Languageprovider";

/* =====================================================================
   GALLERY  (photos + videos)

   HOW TO ADD YOUR OWN MEDIA
   1. Photos:   put the files in  public/gallery/  (e.g. public/gallery/p1.jpg)
                and add  { id, type: "image", src: "/gallery/p1.jpg", alt }
   2. Videos you host yourself (short clips, under ~25 MB):
                put  public/gallery/v1.mp4  and add  { id, type: "video", src: "/gallery/v1.mp4", alt }
                (the first frame is used as the cover and the length is shown
                 automatically; add  poster: "/gallery/v1.jpg"  only if you want a custom cover)
   3. Long videos: upload to YouTube (Unlisted is fine) and add
                { id, type: "youtube", youtubeId: "dQw4w9WgXcQ", alt }
                (the id is the part after  v=  in the YouTube link)
   Optional on every item:  caption: { en: "...", or: "..." }   duration: "0:45"
   Tip: compress photos to ~300-500 KB each so the page stays fast.
   Only upload photos of people (especially children) who have agreed to it.
   ===================================================================== */

interface Caption {
  en: string;
  or?: string;
}

type GalleryItem =
  | { id: string; type: "image"; src: string; alt: string; caption?: Caption }
  | { id: string; type: "video"; src: string; poster?: string; alt: string; caption?: Caption; duration?: string }
  | { id: string; type: "youtube"; youtubeId: string; alt: string; caption?: Caption; duration?: string };

/* Your media (files are in public/gallery/). Change the alt text / add a caption
   to describe each one, e.g.  caption: { en: "Saree distribution", or: "..." } */
const GALLERY_ITEMS: GalleryItem[] = [
  { id: "p1", type: "image", src: "/gallery/pic1.jpeg", alt: "Sambhav Foundation community programme photo 1" },
  { id: "v1", type: "video", src: "/gallery/vid1.mp4", alt: "Sambhav Foundation community programme video 1" },
  { id: "p2", type: "image", src: "/gallery/pic2.jpeg", alt: "Sambhav Foundation community programme photo 2" },
  { id: "v2", type: "video", src: "/gallery/vid2.mp4", alt: "Sambhav Foundation community programme video 2" },
  { id: "p3", type: "image", src: "/gallery/pic3.jpeg", alt: "Sambhav Foundation community programme photo 3" },
  { id: "v3", type: "video", src: "/gallery/vid3.mp4", alt: "Sambhav Foundation community programme video 3" },
  { id: "p4", type: "image", src: "/gallery/pic4.jpeg", alt: "Sambhav Foundation community programme photo 4" },
  { id: "v4", type: "video", src: "/gallery/vid4.mp4", alt: "Sambhav Foundation community programme video 4" },
  { id: "p5", type: "image", src: "/gallery/pic5.jpeg", alt: "Sambhav Foundation community programme photo 5" },

  { id: "v5", type: "video", src: "/gallery/vid5.mp4", alt: "Sambhav Foundation community programme video 5" },
{ id: "p6", type: "image", src: "/gallery/pic6.jpeg", alt: "Sambhav Foundation community programme photo 6" },

  { id: "v6", type: "video", src: "/gallery/vid6.mp4", alt: "Sambhav Foundation community programme video 6" },
  // Long video on YouTube instead (remove the // to use):
  // { id: "y1", type: "youtube", youtubeId: "YOUR_VIDEO_ID", alt: "Community visit" },
];

const FIRST_PAGE = 9; // thumbnails shown at first (1 big + 8 small fills the grid exactly)
const MORE_STEP = 12; // extra thumbnails each time "Show more" is pressed

type Filter = "all" | "photos" | "videos";

const isVideoItem = (item: GalleryItem) => item.type !== "image";

function thumbnailOf(item: GalleryItem): string {
  if (item.type === "image") return item.src;
  if (item.type === "video") return item.poster ?? "";
  return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
}

function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

const thumbClass =
  "h-full w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105";

function DurationBadge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur xl:right-[0.6vw] xl:top-[0.6vw] xl:px-[0.6vw] xl:text-[0.7vw]">
      {text}
    </span>
  );
}

/* Thumbnail in the grid. A video without a cover photo shows its first frame
   and its length is read from the file itself. */
function Thumb({ item }: { item: GalleryItem }) {
  const [autoDuration, setAutoDuration] = useState("");

  if (item.type === "video" && !item.poster) {
    return (
      <>
        <video
          src={`${item.src}#t=0.1`}
          preload="metadata"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={(e) => {
            const length = e.currentTarget.duration;
            if (Number.isFinite(length)) setAutoDuration(formatDuration(length));
          }}
          className={thumbClass}
        />
        <DurationBadge text={item.duration ?? autoDuration} />
      </>
    );
  }

  return (
    <>
      <img src={thumbnailOf(item)} alt={item.alt} loading="lazy" className={thumbClass} />
      {item.type !== "image" && <DurationBadge text={item.duration} />}
    </>
  );
}

/* ---------- Gallery ---------- */

export default function Gallery() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(FIRST_PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const hasPhotos = GALLERY_ITEMS.some((i) => !isVideoItem(i));
  const hasVideos = GALLERY_ITEMS.some(isVideoItem);

  const filtered = useMemo(
    () =>
      GALLERY_ITEMS.filter((item) =>
        filter === "all" ? true : filter === "videos" ? isVideoItem(item) : !isVideoItem(item)
      ),
    [filter]
  );
  const shown = filtered.slice(0, visible);
  // the first item is shown big when there are enough items to fill the grid nicely
  const featuredFirst = filtered.length >= FIRST_PAGE;
  const current = openIndex !== null ? filtered[openIndex] : null;

  const chooseFilter = (next: Filter) => {
    setFilter(next);
    setVisible(FIRST_PAGE);
  };

  const step = (direction: 1 | -1) =>
    setOpenIndex((index) => (index === null ? null : (index + direction + filtered.length) % filtered.length));

  // Open / close the native <dialog> (focus trap + Esc come for free)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const captionOf = (item: GalleryItem) => item.caption?.[lang] ?? item.caption?.en;

  const photoCount = GALLERY_ITEMS.filter((i) => !isVideoItem(i)).length;
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t("gallery.all"), count: GALLERY_ITEMS.length },
    { id: "photos", label: t("gallery.photos"), count: photoCount },
    { id: "videos", label: t("gallery.videos"), count: GALLERY_ITEMS.length - photoCount },
  ];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 bg-brand-blush"
    >
      <div className="mx-auto max-w-[1700px] px-4 py-14 sm:px-6 lg:px-8 xl:px-[3vw] xl:py-[3vw]">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 xl:gap-[1vw]">
          <p className="shrink-0 text-xs font-bold tracking-wide text-brand-orange xl:text-[0.65vw]">
            {t("gallery.eyebrow")}
          </p>
          <span className="hidden h-px flex-1 bg-orange-200 sm:block" aria-hidden="true" />
        </div>

        {/* Title + filters */}
        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between xl:mt-[0.3vw]">
          <div>
            <h2
              id="gallery-heading"
              className="text-3xl font-extrabold text-brand-green sm:text-4xl xl:text-[1.9vw] xl:leading-tight"
            >
              {t("gallery.title")}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 xl:mt-[0.4vw] xl:max-w-none xl:text-[0.8vw]">
              {t("gallery.sub")}
            </p>
          </div>

          {hasPhotos && hasVideos && (
            <div role="group" aria-label={t("gallery.title")} className="flex shrink-0 flex-wrap gap-2 xl:gap-[0.5vw] cursor-pointer">
              {filters.map(({ id, label, count }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => chooseFilter(id)}
                  aria-pressed={filter === id}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange
                    xl:px-[1.1vw] xl:py-[0.45vw] xl:text-[0.8vw]
                    ${
                      filter === id
                        ? "border-brand-green bg-brand-green text-white"
                        : "border-slate-300 bg-white text-brand-green hover:bg-white/60"
                    }`}
                >
                  {label}
                  <span className={`ml-1.5 text-xs font-bold ${filter === id ? "text-white/70" : "text-slate-400"}`}>{count}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid: first tile big, the rest small */}
        <ul className="mt-6 grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:mt-[1.2vw] xl:grid-cols-6 xl:gap-[1vw]">
          {shown.map((item, index) => {
            const video = isVideoItem(item);
            const featured = featuredFirst && index === 0;
            const caption = captionOf(item);
            return (
              <li key={item.id} className={featured ? "col-span-2 row-span-2" : ""}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className={`group relative block w-full overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-black/5
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange
                    xl:rounded-[1vw] ${featured ? "h-full min-h-[16rem]" : "aspect-[4/5]"}`}
                >
                  <Thumb item={item} />

                  {/* soft shade at the bottom so labels stay readable */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {video && (
                    <>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`flex items-center justify-center rounded-full bg-white/85 text-brand-orange shadow-lg backdrop-blur
                            transition-transform duration-300 group-hover:scale-110
                            ${featured ? "h-16 w-16 xl:h-[4vw] xl:w-[4vw]" : "h-11 w-11 xl:h-[2.8vw] xl:w-[2.8vw]"}`}
                        >
                          <Play
                            fill="currentColor"
                            aria-hidden="true"
                            className={featured ? "ml-1 h-7 w-7 xl:h-[1.8vw] xl:w-[1.8vw]" : "ml-0.5 h-5 w-5 xl:h-[1.2vw] xl:w-[1.2vw]"}
                          />
                        </span>
                      </span>
                      <span className="sr-only">
                        {t("gallery.play")}: {item.alt}
                      </span>
                    </>
                  )}

                  {caption && (
                    <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 xl:p-[0.8vw] xl:text-[0.8vw]">
                      {caption}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {filtered.length > visible && (
          <div className="mt-8 text-center xl:mt-[1.6vw]">
            <button
              type="button"
              onClick={() => setVisible((v) => v + MORE_STEP)}
              className="inline-flex items-center rounded-full border-2 border-brand-green px-8 py-3 text-sm font-semibold
                text-brand-green transition-colors hover:bg-brand-green hover:text-white
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green
                xl:px-[2.2vw] xl:py-[0.8vw] xl:text-[0.85vw]"
            >
              {t("gallery.showMore")}
            </button>
          </div>
        )}
      </div>

      {/* Full-screen viewer */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label={current?.alt ?? t("gallery.title")}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {current && (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-14"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpenIndex(null);
            }}
          >
            {current.type === "image" && (
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[78vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
              />
            )}
            {current.type === "video" && (
              <video
                key={current.id}
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] max-w-[92vw] rounded-lg bg-black shadow-2xl"
              />
            )}
            {current.type === "youtube" && (
              <iframe
                key={current.id}
                src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                title={current.alt}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="aspect-video w-[min(92vw,1000px)] rounded-lg bg-black shadow-2xl"
              />
            )}

            <div className="max-w-[92vw] text-center text-white">
              {captionOf(current) && <p className="text-sm font-medium sm:text-base">{captionOf(current)}</p>}
              <p className="mt-1 text-xs text-white/70">
                {(openIndex ?? 0) + 1} / {filtered.length}
              </p>
            </div>

            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t("gallery.prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur
                    transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-5"
                >
                  <ChevronLeft size={26} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t("gallery.next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur
                    transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-5"
                >
                  <ChevronRight size={26} aria-hidden="true" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label={t("gallery.close")}
              className="absolute right-3 top-3 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition-colors
                hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-5 sm:top-5"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}