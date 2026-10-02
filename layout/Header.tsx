"use client";

import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { NAV_LINKS, type NavLink } from "../NavLinks/navLinks";

/* ---------- Small presentational pieces ---------- */

function Logo() {
  return (
    <a
      href="#home"
      className="flex min-w-0 shrink-0 items-center gap-3 xl:gap-4"
      aria-label="Sambhav Foundation home"
    >
      {/* Icon only (woman + leaves): /public/logo-icon.png */}
      <img
        src="/logo-icon.png"
        alt=""
        aria-hidden="true"
        className="h-12 w-auto sm:h-14 xl:h-16"
      />
      {/* Wordmark as real text, so it stays sharp at any size */}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[26px] font-bold tracking-tight text-brand-plum sm:text-3xl xl:text-[2.1rem]">
          Sambhav
        </span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.42em] text-brand-gold sm:text-[10px] xl:text-[11px]">
          FOUNDATION
        </span>
      </span>
    </a>
  );
}

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  onClick: (id: string) => void;
}

function NavItem({ link, isActive, onClick }: NavItemProps) {
  return (
    <a
      href={link.href}
      onClick={() => onClick(link.id)}
      aria-current={isActive ? "page" : undefined}
      className={`relative whitespace-nowrap py-2 text-[13.5px] transition-colors xl:text-[15px]
        after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:rounded-full
        after:bg-brand-rose after:transition-transform after:duration-200
        ${
          isActive
            ? "font-semibold text-brand-plum after:scale-x-100"
            : "font-medium text-slate-700 hover:text-brand-plum after:scale-x-0 hover:after:scale-x-100"
        }`}
    >
      {link.label}
    </a>
  );
}

interface DonateButtonProps {
  className?: string;
}

function DonateButton({ className = "inline-flex" }: DonateButtonProps) {
  return (
    <a
      href="#donate"
      className={`shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full
        bg-gradient-to-r from-brand-rose to-brand-plum
        px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-rose/30
        transition hover:brightness-110 hover:shadow-brand-rose/50
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-brand-rose
        lg:px-5 lg:py-2.5 lg:text-sm xl:px-7 xl:py-3 xl:text-[15px] ${className}`}
    >
      <Heart size={18} fill="currentColor" aria-hidden="true" />
      Donate Now
    </a>
  );
}

/* ---------- Header ---------- */

export default function Header() {
  const [activeId, setActiveId] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Adds a soft shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-md shadow-brand-plum/10" : "border-b border-slate-100"
      }`}
    >
      {/* Brand colour strip taken from the logo */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-plum via-brand-rose to-brand-gold"
      />

      {/* max-w-7xl keeps logo and Donate button pulled in from the screen edges (try max-w-6xl for even more, max-w-[1700px] to align with the sections) */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 md:h-24 lg:gap-4 lg:px-8 xl:gap-6">
        <Logo />

        {/* Desktop navigation, centered between logo and button */}
        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-9"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.id}
              link={link}
              isActive={activeId === link.id}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <DonateButton className="hidden sm:inline-flex" />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-brand-plum hover:bg-brand-blush lg:hidden"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation (scrolls if the screen is very short) */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100vh-6rem)] overflow-y-auto border-t border-slate-100 bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    activeId === link.id
                      ? "bg-brand-blush text-brand-plum"
                      : "text-slate-700 hover:bg-brand-blush"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <DonateButton className="flex w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}