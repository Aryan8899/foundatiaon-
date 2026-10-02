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

/* On xl screens (1280px+) sizes scale with screen width (vw), so this
   section looks like the reference banner at any desktop size.
   Mobile / tablet keep normal responsive sizes. */

/* ---------- Data ---------- */

const FEATURED = {
  title: "Community Welfare & Women Empowerment Programme",
  date: "11 October 2026",
  location: "Bhandaripokhari, Odisha",
  description:
    "Distribution of sarees and hygiene kits, felicitation of women achievers, awareness session and community engagement for a stronger and empowered society.",
  href: "#events",
  leftImage: "/sambhav.png",
  rightImage: "/guest.png",
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
    text: "text-brand-rose",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Bring your time, skills and experience.",
    href: "#volunteer",
    icon: Users,
    card: "bg-purple-100 hover:bg-purple-200/70",
    text: "text-brand-plum",
  },
  {
    id: "partner",
    title: "Partner With Us",
    description: "Collaborate for larger community impact.",
    href: "#partner",
    icon: Handshake,
    card: "bg-green-100 hover:bg-green-200/70",
    text: "text-brand-sage",
  },
];

interface Story {
  id: string;
  image: string;
  alt: string;
}

/* These use images that already exist in /public (same ones as the About cards).
   Swap them with your own story photos any time. */
const STORIES: Story[] = [
  { id: "s1", image: "/women.png", alt: "Women with Sambhav Foundation kits" },
  { id: "s2", image: "/education.png", alt: "Schoolchildren in a classroom" },
  { id: "s3", image: "/heath.png", alt: "Doctor checking a patient" },
  { id: "s4", image: "/rural.png", alt: "Rural community women with a tablet" },
  { id: "s5", image: "/finance.png", alt: "Financial awareness session" },
  { id: "s6", image: "/youth.png", alt: "Youth learning on computers" },
];

/* ---------- Shared piece ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 xl:gap-[1vw]">
      <p className="shrink-0 text-xs font-bold tracking-wide text-brand-rose xl:text-[0.65vw]">
        {children}
      </p>
      <span className="hidden h-px flex-1 bg-pink-200 sm:block" aria-hidden="true" />
    </div>
  );
}

/* ---------- 1. Featured initiative ---------- */

function FeaturedInitiative() {
  const { guest } = FEATURED;
  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-[1700px] px-4 pt-6 sm:px-6 lg:px-8 xl:px-[3vw] xl:pt-[1.5vw]"
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 lg:flex-row xl:h-[19vw] xl:rounded-[1vw]">
        {/* Left image */}
        <div className="h-56 lg:h-auto lg:w-[36%] lg:shrink-0">
          <img
            src={FEATURED.leftImage}
            alt="Sambhav Foundation bag with sarees"
            className="h-full w-full object-cover lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]"
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:px-4 lg:py-6 xl:px-[1.5vw] xl:py-[1vw]">
          <Eyebrow>FEATURED INITIATIVE</Eyebrow>
          <h2
            id="featured-heading"
            className="mt-3 text-2xl font-extrabold leading-tight text-brand-plum sm:text-3xl xl:mt-[0.6vw] xl:text-[1.7vw]"
          >
            Community Welfare &amp;
            <br className="hidden lg:block" /> Women Empowerment Programme
          </h2>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-slate-800 xl:mt-[0.9vw] xl:gap-x-[2vw] xl:text-[0.8vw]">
            <span className="inline-flex items-center gap-2 xl:gap-[0.5vw]">
              <Calendar aria-hidden="true" className="h-5 w-5 text-brand-plum xl:h-[1.2vw] xl:w-[1.2vw]" />
              {FEATURED.date}
            </span>
            <span className="inline-flex items-center gap-2 xl:gap-[0.5vw]">
              <MapPin aria-hidden="true" className="h-5 w-5 text-brand-plum xl:h-[1.2vw] xl:w-[1.2vw]" />
              {FEATURED.location}
            </span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 xl:mt-[0.9vw] xl:max-w-[34vw] xl:text-[0.8vw]">
            {FEATURED.description}
          </p>

          <a
            href={FEATURED.href}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-plum px-6 py-3
              text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-plum-dark
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-brand-plum
              xl:mt-[1.2vw] xl:gap-[0.5vw] xl:rounded-[0.6vw] xl:px-[1.4vw] xl:py-[0.7vw] xl:text-[0.8vw]"
          >
            Read More About This Event
            <ArrowRight aria-hidden="true" className="h-4 w-4 xl:h-[0.95vw] xl:w-[0.95vw]" />
          </a>
        </div>

        {/* Right image + guest badge */}
        <div className="relative h-72 lg:h-auto lg:w-[28%] lg:shrink-0">
          <img
            src={FEATURED.rightImage}
            alt={guest.name}
            className="h-full w-full object-cover object-top lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />
          <div
            className="absolute bottom-4 left-4 max-w-[75%] rounded-xl bg-brand-gold-light px-4 py-3
              text-brand-plum shadow-lg lg:left-8 lg:-rotate-2
              xl:bottom-[1vw] xl:left-[2vw] xl:rounded-[0.6vw] xl:px-[1vw] xl:py-[0.6vw]"
          >
            <p className="text-[11px] font-medium xl:text-[0.6vw]">{guest.prefix}</p>
            <p className="text-lg font-extrabold leading-tight xl:text-[1.1vw]">{guest.name}</p>
            <p className="mt-0.5 text-[11px] leading-snug xl:text-[0.6vw]">{guest.role}</p>
            <p className="text-[11px] font-semibold leading-snug xl:text-[0.6vw]">{guest.post}</p>
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
      className="mx-auto max-w-[1700px] px-4 py-10 sm:px-6 lg:px-8 xl:px-[3vw] xl:py-[1.6vw]"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:gap-[1.5vw]">
        <div>
          <p className="text-xs font-bold tracking-wide text-brand-rose xl:text-[0.65vw]">
            GET INVOLVED
          </p>
          <h2
            id="involved-heading"
            className="mt-2 text-3xl font-extrabold text-brand-plum sm:text-4xl xl:mt-[0.4vw] xl:text-[1.9vw] xl:leading-tight"
          >
            You Can Be Part of the Change
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600 xl:mt-[0.4vw] xl:max-w-none xl:text-[0.8vw]">
            Your support can help us reach more families and create a lasting impact.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 xl:gap-[1vw]">
          {INVOLVE_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`group relative flex h-full gap-3 rounded-2xl p-5 pb-9 shadow-sm ring-1 ring-black/5
                    transition-colors ${item.card}
                    xl:gap-[0.8vw] xl:rounded-[1vw] xl:p-[1.1vw] xl:pb-[2vw]`}
                >
                  <Icon
                    fill={item.id === "donate" ? "currentColor" : "none"}
                    className={`mt-1 h-[30px] w-[30px] shrink-0 xl:h-[2.1vw] xl:w-[2.1vw] ${item.text}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className={`block text-base font-bold xl:text-[1vw] ${item.text}`}>
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-700 xl:text-[0.7vw]">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className={`absolute bottom-3 right-4 h-[14px] w-[14px] transition-transform group-hover:translate-x-1
                      xl:bottom-[0.7vw] xl:right-[1vw] xl:h-[0.9vw] xl:w-[0.9vw] ${item.text}`}
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
      className="mx-auto max-w-[1700px] px-4 pb-14 sm:px-6 lg:px-8 xl:px-[3vw] xl:pb-[3vw]"
    >
      <Eyebrow>STORIES FROM THE COMMUNITY</Eyebrow>

      <div className="mt-1 flex items-end justify-between gap-4 xl:mt-[0.3vw]">
        <h2
          id="stories-heading"
          className="text-3xl font-extrabold text-brand-plum sm:text-4xl xl:text-[1.9vw] xl:leading-tight"
        >
          Real People. Real Change.
        </h2>

        <div className="flex shrink-0 items-center gap-4 xl:gap-[1vw]">
          <a
            href="#all-stories"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand-plum hover:underline sm:inline-flex xl:gap-[0.4vw] xl:text-[0.8vw]"
          >
            View All Stories
            <ArrowRight aria-hidden="true" className="h-[14px] w-[14px] xl:h-[0.9vw] xl:w-[0.9vw]" />
          </a>
          <div className="flex gap-2 xl:gap-[0.5vw]">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous stories"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300
                bg-white text-brand-plum transition-colors hover:bg-slate-100
                xl:h-[2.2vw] xl:w-[2.2vw] xl:rounded-[0.5vw]"
            >
              <ChevronLeft className="h-[18px] w-[18px] xl:h-[1.1vw] xl:w-[1.1vw]" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next stories"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300
                bg-white text-brand-plum transition-colors hover:bg-slate-100
                xl:h-[2.2vw] xl:w-[2.2vw] xl:rounded-[0.5vw]"
            >
              <ChevronRight className="h-[18px] w-[18px] xl:h-[1.1vw] xl:w-[1.1vw]" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          xl:mt-[1vw] xl:gap-[1vw]"
      >
        {STORIES.map((story) => (
          <li
            key={story.id}
            className="w-[70%] shrink-0 snap-start sm:w-[40%] md:w-[30%] lg:w-[calc(20%-0.8rem)]"
          >
            <a
              href="#all-stories"
              className="block overflow-hidden rounded-xl shadow-md xl:rounded-[0.8vw]"
            >
              <img
                src={story.image}
                alt={story.alt}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-105"
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