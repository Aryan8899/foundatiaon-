import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
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

// Handwritten font for the "Odisha" word in the sticker
const script = Caveat({ subsets: ["latin"], weight: ["700"] });


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

function StickerBadge() {
  return (
    <div
      className="absolute right-4 top-6 hidden -rotate-6 bg-white px-8 py-5 text-center shadow-xl
        md:block lg:right-12 lg:top-8
        [clip-path:polygon(2%_6%,18%_0,40%_4%,62%_0,84%_5%,100%_2%,98%_40%,100%_72%,97%_100%,70%_96%,44%_100%,20%_97%,0_100%,3%_65%,0_32%)]"
    >
      <p className="text-lg font-extrabold leading-tight text-brand-navy">
        Empowered
        <br />
        Communities
        <br />
        Stronger
      </p>
      <p className={`${script.className} text-3xl leading-none text-brand-orange`}>Odisha</p>
    </div>
  );
}

function FocusItem({ area }: { area: FocusArea }) {
  const Icon = area.icon;
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
      <span className="whitespace-pre-line text-xs font-medium leading-tight sm:text-sm">
        {area.label}
      </span>
    </li>
  );
}

/* ---------- Hero ---------- */

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[620px] overflow-hidden text-white lg:h-[600px]">
      {/* Background photo — save your image as /public/images/hero.jpg */}
      <Image
        src="/images/hero.jpg"
        alt="A woman reading a book with three smiling girls"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[65%_center]"
      />

      {/* Dark overlays keep the text readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <StickerBadge />

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-14">
        {/* Text content */}
        <div className="max-w-xl">
          <p className="text-base font-semibold uppercase tracking-wide sm:text-lg">
            Creating Opportunities.
            <br />
            Empowering Communities.
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Building a
            <br />
            <span className="text-brand-orange">Better Tomorrow.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            Sambhav Foundation is committed to creating meaningful opportunities for women,
            children and rural communities through education, healthcare, skill development
            and financial inclusion.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-7 py-3 text-sm font-semibold
                transition-colors hover:bg-brand-orange-dark"
            >
              Our Work
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#donate"
              className="inline-flex items-center rounded-lg border border-white/80 px-7 py-3 text-sm font-semibold
                transition-colors hover:bg-white/10"
            >
              Support Our Mission
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