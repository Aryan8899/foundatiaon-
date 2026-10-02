"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Laptop,
  Sprout,
  Users,
  UserCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* ---------- Data ---------- */

interface FocusArea {
  id: string;
  title: string;
  description: string;
  image: string; // put images in /public/
  icon: LucideIcon;
  iconBg: string; // full class names so Tailwind can detect them
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: "women",
    title: "Women Empowerment",
    description: "Skills, awareness and livelihood opportunities",
    image: "/women.png",
    icon: HeartHandshake,
    iconBg: "bg-brand-orange",
  },
  {
    id: "education",
    title: "Education & Digital Literacy",
    description: "Access to education and digital skills",
    image: "/education.png",
    icon: Laptop,
    iconBg: "bg-brand-green",
  },
  {
    id: "health",
    title: "Healthcare & Hygiene",
    description: "Health awareness and essential support",
    image: "/heath.png",
    icon: HeartPulse,
    iconBg: "bg-amber-600",
  },
  {
    id: "rural",
    title: "Rural Development",
    description: "Community welfare and development",
    image: "/rural.png",
    icon: Sprout,
    iconBg: "bg-brand-leaf",
  },
  {
    id: "finance",
    title: "Financial Inclusion",
    description: "Awareness and access to digital financial services",
    image: "/finance.png",
    icon: Wallet,
    iconBg: "bg-brand-gold",
  },
  {
    id: "youth",
    title: "Youth & Skill Development",
    description: "Creating opportunities for a brighter future",
    image: "/youth.png",
    icon: GraduationCap,
    iconBg: "bg-teal-700",
  },
];

interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
}

const STATS: Stat[] = [
  { id: "families", value: 1000, suffix: "+", label: "Families Reached", icon: Users },
  { id: "women", value: 500, suffix: "+", label: "Women Supported", icon: UserCheck },
  { id: "students", value: 250, suffix: "+", label: "Students & Youth Engaged", icon: GraduationCap },
  { id: "initiatives", value: 10, suffix: "+", label: "Community Initiatives", icon: Sprout },
];

/* ---------- Count-up animation ---------- */

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number; // ms
  className?: string;
}

function CountUp({ end, suffix = "", duration = 2000, className }: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip the animation for people who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }

    let frame = 0;

    const start = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setCount(Math.round(eased * end));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <p ref={ref} className={className} aria-label={`${end.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden="true">
        {count.toLocaleString("en-US")}
        {suffix}
      </span>
    </p>
  );
}

/* ---------- Pieces ---------- */
/* On xl screens sizes scale with screen width (vw) so the section
   looks like the reference banner at any desktop size. */

function FocusCard({ area }: { area: FocusArea }) {
  const Icon = area.icon;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 xl:rounded-[1vw]">
      <img
        src={area.image}
        alt={area.title}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      <div className="relative flex-1 px-4 pb-5 pt-9 xl:px-[0.9vw] xl:pb-[1.2vw] xl:pt-[2.2vw]">
        <span
          className={`absolute -top-5 left-4 flex h-10 w-10 items-center justify-center rounded-full
            text-white ring-4 ring-white ${area.iconBg}
            xl:-top-[1.3vw] xl:left-[0.9vw] xl:h-[2.3vw] xl:w-[2.3vw]`}
        >
          <Icon aria-hidden="true" className="h-5 w-5 xl:h-[1.1vw] xl:w-[1.1vw]" />
        </span>
        <h3 className="text-[15px] font-bold leading-snug text-brand-green xl:text-[0.9vw]">
          {area.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600 xl:mt-[0.4vw] xl:text-[0.7vw]">
          {area.description}
        </p>
      </div>
    </article>
  );
}

function StatItem({ stat, isFirst }: { stat: Stat; isFirst: boolean }) {
  const Icon = stat.icon;
  return (
    <div
      className={`flex flex-col items-center px-4 py-2 text-center text-white
        ${isFirst ? "" : "lg:border-l lg:border-white/20"}`}
    >
      <Icon
        strokeWidth={1.5}
        aria-hidden="true"
        className="h-9 w-9 xl:h-[2.3vw] xl:w-[2.3vw]"
      />
      <CountUp
        end={stat.value}
        suffix={stat.suffix}
        className="mt-3 text-3xl font-bold tabular-nums sm:text-4xl xl:mt-[0.6vw] xl:text-[2.2vw]"
      />
      <p className="mt-1 text-sm text-white/85 xl:text-[0.85vw]">{stat.label}</p>
    </div>
  );
}

/* ---------- Section ---------- */

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      {/* Intro + focus areas */}
      <div className="bg-brand-blush">
        <div className="mx-auto grid max-w-[1700px] gap-10 px-4 py-14 sm:px-6 lg:px-8 xl:grid-cols-[22vw_minmax(0,1fr)] xl:items-center xl:gap-[2.5vw] xl:px-[3vw] xl:py-[1.8vw]">
          {/* Text */}
          <div>
            <p className="text-sm font-bold tracking-wide xl:text-[0.8vw]">
              <span className="text-brand-orange">ABOUT</span>{" "}
              <span className="text-brand-green">SAMBHAV FOUNDATION</span>
            </p>
            <h2
              id="about-heading"
              className="mt-3 text-3xl font-extrabold leading-tight text-brand-green sm:text-4xl xl:mt-[0.6vw] xl:text-[2.1vw]"
            >
              Together, We Make
              <br className="hidden xl:block" /> Possibilities Happen
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 xl:mt-[1.2vw] xl:text-[0.85vw]">
              Sambhav Foundation works at the grassroots to create positive and sustainable change
              in underserved communities. We focus on real needs, practical solutions and long-term
              empowerment for women, children and families.
            </p>
            <a
              href="#about-us"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-green px-7 py-3.5
                text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-brand-green-dark
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-brand-green
                xl:mt-[1.8vw] xl:rounded-[0.8vw] xl:px-[2vw] xl:py-[0.9vw] xl:text-[0.9vw]"
            >
              Know More About Us
              <ArrowRight aria-hidden="true" className="h-[18px] w-[18px] xl:h-[1.1vw] xl:w-[1.1vw]" />
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3 xl:grid-cols-6 xl:gap-[0.9vw] xl:pt-0">
            {FOCUS_AREAS.map((area) => (
              <FocusCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </div>

      {/* Impact strip */}
      <div className="relative overflow-hidden bg-brand-green">
        {/* Optional faded map: put it at /public/images/odisha-map.png */}
        <img
          src="/images/odisha-map.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-0 hidden h-[120%] w-auto opacity-20 lg:block"
        />

        <div className="relative mx-auto grid max-w-[1700px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-8 xl:px-[3vw] xl:py-[1.6vw]">
          <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatItem key={stat.id} stat={stat} isFirst={i === 0} />
            ))}
          </div>

          <blockquote className="text-center font-serif text-lg italic leading-relaxed text-white lg:border-l lg:border-white/20 lg:pl-10 lg:text-left xl:pl-[3vw] xl:text-[1.05vw]">
            <p>“Empowering individuals</p>
            <p>Strengthening communities</p>
            <p>Creating a brighter and more inclusive Odisha.”</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}