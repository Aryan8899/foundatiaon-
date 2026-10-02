import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS } from "../NavLinks/navLinks";

/* ---------- Social icons (inline SVG: newer lucide-react removed brand icons) ---------- */

interface IconProps {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

function SvgIcon({ size = 24, className, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

const Facebook = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </SvgIcon>
);

const Instagram = (props: IconProps) => (
  <SvgIcon {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </SvgIcon>
);

const Linkedin = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </SvgIcon>
);

const Youtube = (props: IconProps) => (
  <SvgIcon {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </SvgIcon>
);

/* ---------- Data ---------- */

const INITIATIVES = [
  { label: "Women Empowerment", href: "#our-work" },
  { label: "Education", href: "#our-work" },
  { label: "Healthcare", href: "#our-work" },
  { label: "Rural Development", href: "#our-work" },
  { label: "Financial Inclusion", href: "#our-work" },
  { label: "Youth Development", href: "#our-work" },
];

const CONTACT = {
  address: "Bhandaripokhari, Bhadrak\nOdisha, India",
  email: "info@sambhavfoundation.org",
  phone: "+91 98765 43210",
};

interface Social {
  label: string;
  href: string;
  icon: (props: IconProps) => React.JSX.Element;
}

const SOCIALS: Social[] = [
  { label: "Facebook", href: "https://facebook.com/", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/", icon: Youtube },
];

/* ---------- Pieces ---------- */

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white">{children}</h3>
      <span aria-hidden="true" className="mt-2 block h-[3px] w-8 rounded-full bg-brand-gold-light" />
    </div>
  );
}

const linkClass =
  "text-sm text-white/80 transition-colors hover:text-pink-300 focus-visible:text-pink-300 focus-visible:outline-none";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={`inline-block transition-transform duration-200 hover:translate-x-1 ${linkClass}`}>
      {children}
    </a>
  );
}

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-pink-300">
      {children}
    </span>
  );
}

/* ---------- Footer ---------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-plum-dark text-white">
      {/* Brand colour strip taken from the logo */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-plum via-brand-rose to-brand-gold"
      />

      {/* Faded logo icon as a background watermark */}
      <img
        src="/logo-icon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 hidden h-56 w-auto opacity-[0.06] brightness-0 invert lg:block"
      />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">

        {/* Columns */}
        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.2fr_1.6fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              aria-label="Sambhav Foundation home"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-lg"
            >
              <img src="/logo-icon.png" alt="" aria-hidden="true" className="h-9 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-tight text-brand-plum">
                  Sambhav
                </span>
                <span className="mt-1 text-[9px] font-semibold tracking-[0.42em] text-brand-gold">
                  FOUNDATION
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
              Working towards an inclusive and empowered society through education, healthcare,
              skill development and community welfare.
            </p>

            {/* Social */}
            <ul className="mt-4 flex gap-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white
                      transition-colors hover:bg-brand-rose
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Initiatives */}
          <nav aria-label="Our initiatives">
            <ColumnHeading>Our Initiatives</ColumnHeading>
            <ul className="space-y-2">
              {INITIATIVES.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <ContactIcon>
                  <MapPin size={16} aria-hidden="true" />
                </ContactIcon>
                <address className="whitespace-pre-line pt-1 not-italic">{CONTACT.address}</address>
              </li>
              <li className="flex items-center gap-3">
                <ContactIcon>
                  <Mail size={16} aria-hidden="true" />
                </ContactIcon>
                <a href={`mailto:${CONTACT.email}`} className={`break-all ${linkClass}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ContactIcon>
                  <Phone size={16} aria-hidden="true" />
                </ContactIcon>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 py-4 text-xs text-white/70 sm:flex-row">
          <p>© {year} Sambhav Foundation. All rights reserved.</p>
          <p className="tracking-wide text-brand-gold-light">
            Empowering Women <span className="mx-2 text-pink-300">•</span> Brighter Tomorrows
          </p>
          <p className="flex gap-4">
            <a href="#privacy" className={linkClass}>Privacy Policy</a>
            <a href="#terms" className={linkClass}>Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}