"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  GraduationCap,
  HeartPulse,
  Sprout,
  Coins,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/main/Languageprovider";

/* ---------- Data ---------- */

interface FocusArea {
  id: string;
  label: string; // \n = manual line break
  icon: LucideIcon;
}

const FOCUS_AREAS: FocusArea[] = [
  { id: "women", label: "Women\nEmpowerment", icon: Users },
  { id: "education", label: "Education &\nDigital Literacy", icon: GraduationCap },
  { id: "health", label: "Healthcare\n& Hygiene", icon: HeartPulse },
  { id: "rural", label: "Rural\nDevelopment", icon: Sprout },
  { id: "finance", label: "Financial\nInclusion", icon: Coins },
  { id: "youth", label: "Youth &\nSkill Development", icon: UsersRound },
];

/* ---------- Small presentational pieces ---------- */

function FocusItem({ area }: { area: FocusArea }) {
  const { t } = useLanguage();
  const Icon = area.icon;
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
      <span className="whitespace-pre-line text-xs font-medium leading-tight sm:text-sm">
        {t(`hero.focus.${area.id}`)}
      </span>
    </li>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[620px] overflow-hidden text-white lg:h-[760px]"
    >
      {/* Background photo (sticker is already part of this image) — /public/hero.png */}
      <Image
        src="/hero1.png"
        alt="A woman reading a book with three smiling girls"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_20%]"
      />

      {/* Dark overlays keep the text readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-green-dark/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* max-w-none + lg:px-[10vw] = content starts further left */}
      <div className="mx-auto flex w-full max-w-none flex-col justify-between px-4 pb-6 pt-16 sm:px-6 lg:px-[10vw] lg:pt-28">
        {/* Text content */}
        <div className="max-w-xl">
          <p className="text-base font-semibold uppercase tracking-wide sm:text-lg">
            {t("hero.tag1")}
            <br />
            {t("hero.tag2")}
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            {t("hero.h1a")}
            <br />
            <span className="text-brand-gold-light">{t("hero.h1b")}</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            {t("hero.desc")}
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3 text-sm font-semibold
                transition-colors hover:bg-brand-orange-hover"
            >
              {t("hero.cta1")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#donate"
              className="inline-flex items-center rounded-lg border border-white/80 px-7 py-3 text-sm font-semibold
                transition-colors hover:bg-white/10"
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>

        {/* Focus areas */}
        <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-6 lg:grid-cols-6">
          {FOCUS_AREAS.map((area) => (
            <FocusItem key={area.id} area={area} />
          ))}
        </ul>
      </div>
    </section>
  );
}