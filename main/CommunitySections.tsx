"use client";

import { useRef } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Heart,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

/* ---------- Data ---------- */

const FEATURED = {
  title: "Community Welfare & Women Empowerment Programme",
  date: "11 October 2026",
  location: "Bhandaripokhari, Odisha",
  description:
    "Distribution of sarees and hygiene kits, felicitation of women achievers, awareness session and community engagement for a stronger and empowered society.",
  href: "#events",
  leftImage: "/images/featured/sarees-bag.jpg", // put images in /public/images/featured/
  rightImage: "/images/featured/guest.jpg",
  guest: {
    prefix: "With the support of",
    name: "Smt. Payal Singh",
    role: "Social Worker",
    post: "BJP Yuva Morcha Coordinator",
  },
};

interface InvolveCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  card: string;
  text: string;
}

const INVOLVE_CARDS: InvolveCard[] = [
  {
    id: "donate",
    title: "Donate",
    description: "Support our initiatives and help more communities.",
    href: "#donate",
    icon: Heart,
    card: "bg-pink-100 hover:bg-pink-200/70",
    text: "text-pink-600",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Bring your time, skills and experience.",
    href: "#volunteer",
    icon: Users,
    card: "bg-blue-100 hover:bg-blue-200/70",
    text: "text-blue-700",
  },
  {
    id: "partner",
    title: "Partner With Us",
    description: "Collaborate for larger community impact.",
    href: "#partner",
    icon: Handshake,
    card: "bg-green-100 hover:bg-green-200/70",
    text: "text-green-700",
  },
];

interface Story {
  id: string;
  image: string;
  alt: string;
}

const STORIES: Story[] = [
  { id: "s1", image: "/images/stories/story-1.jpg", alt: "Women holding Sambhav Foundation kits" },
  { id: "s2", image: "/images/stories/story-2.jpg", alt: "Schoolchildren smiling together" },
  { id: "s3", image: "/images/stories/story-3.jpg", alt: "Doctor checking an elderly woman" },
  { id: "s4", image: "/images/stories/story-4.jpg", alt: "Girls learning on computers" },
  { id: "s5", image: "/images/stories/story-5.jpg", alt: "Community gathering of women" },
];

/* ---------- Shared piece ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <p className="shrink-0 text-xs font-bold tracking-wide text-orange-600">{children}</p>
      <span className="hidden h-px flex-1 bg-orange-200 sm:block" aria-hidden="true" />
    </div>
  );
}

/* ---------- 1. Featured initiative ---------- */

function FeaturedInitiative() {
  const { guest } = FEATURED;
  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 lg:flex-row">
        {/* Left image */}
        <div className="h-56 lg:h-auto lg:w-[34%] lg:shrink-0">
          <img
            src={FEATURED.leftImage}
            alt="Sambhav Foundation bag with sarees"
            className="h-full w-full object-cover lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]"
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:px-4 lg:py-6">
          <Eyebrow>FEATURED INITIATIVE</Eyebrow>
          <h2
            id="featured-heading"
            className="mt-3 text-2xl font-extrabold leading-tight text-brand-navy sm:text-3xl"
          >
            {FEATURED.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-slate-800">
            <span className="inline-flex items-center gap-2">
              <Calendar size={20} className="text-brand-navy" aria-hidden="true" />
              {FEATURED.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={20} className="text-brand-navy" aria-hidden="true" />
              {FEATURED.location}
            </span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700">
            {FEATURED.description}
          </p>

          <a
            href={FEATURED.href}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-navy px-6 py-3
              text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-950
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-brand-navy"
          >
            Read More About This Event
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Right image + guest badge */}
        <div className="relative h-72 lg:h-auto lg:w-[30%] lg:shrink-0">
          <img
            src={FEATURED.rightImage}
            alt={guest.name}
            className="h-full w-full object-cover object-top lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />
          <div
            className="absolute bottom-4 left-4 max-w-[75%] rounded-xl bg-yellow-400 px-4 py-3
              text-brand-navy shadow-lg lg:left-8 lg:-rotate-2"
          >
            <p className="text-[11px] font-medium">{guest.prefix}</p>
            <p className="text-lg font-extrabold leading-tight">{guest.name}</p>
            <p className="mt-0.5 text-[11px] leading-snug">{guest.role}</p>
            <p className="text-[11px] font-semibold leading-snug">{guest.post}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Get involved ---------- */

function GetInvolved() {
  return (
    <section
      id="get-involved"
      aria-labelledby="involved-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <p className="text-xs font-bold tracking-wide text-orange-600">GET INVOLVED</p>
          <h2
            id="involved-heading"
            className="mt-2 text-3xl font-extrabold text-brand-navy sm:text-4xl"
          >
            You Can Be Part of the Change
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Your support can help us reach more families and create a lasting impact.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {INVOLVE_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`group relative flex h-full gap-3 rounded-2xl p-5 pb-9 shadow-sm ring-1 ring-black/5
                    transition-colors ${item.card}`}
                >
                  <Icon
                    size={30}
                    fill={item.id === "donate" ? "currentColor" : "none"}
                    className={`mt-1 shrink-0 ${item.text}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className={`block text-base font-bold ${item.text}`}>{item.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-700">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight
                    size={14}
                    className={`absolute bottom-3 right-4 transition-transform group-hover:translate-x-1 ${item.text}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3. Stories ---------- */

function Stories() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
    >
      <Eyebrow>STORIES FROM THE COMMUNITY</Eyebrow>

      <div className="mt-1 flex items-end justify-between gap-4">
        <h2 id="stories-heading" className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          Real People. Real Change.
        </h2>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="#all-stories"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand-navy hover:underline sm:inline-flex"
          >
            View All Stories
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous stories"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300
                bg-white text-brand-navy transition-colors hover:bg-slate-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next stories"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300
                bg-white text-brand-navy transition-colors hover:bg-slate-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {STORIES.map((story) => (
          <li
            key={story.id}
            className="w-[70%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[calc(20%-0.8rem)]"
          >
            <a href="#all-stories" className="block overflow-hidden rounded-xl shadow-md">
              <img
                src={story.image}
                alt={story.alt}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Combined export ---------- */

export default function CommunitySections() {
  return (
    <>
      <FeaturedInitiative />
      <GetInvolved />
      <Stories />
    </>
  );
}