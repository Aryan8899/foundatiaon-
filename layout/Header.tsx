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
      {/* Wordmark as real text (Montserrat, like the logo) */}
      <span className="flex flex-col leading-none">
        <span className="text-[24px] font-extrabold tracking-tight text-brand-green sm:text-[28px] xl:text-[2rem]">
          Sambhav
        </span>
        <span className="mt-0.5 text-[13px] font-light tracking-wide text-brand-green-dark sm:text-[15px] xl:text-[1.2rem]">
          Foundation
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
        after:bg-brand-orange after:transition-transform after:duration-200
        ${
          isActive
            ? "font-semibold text-brand-green after:scale-x-100"
            : "font-medium text-slate-700 hover:text-brand-green after:scale-x-0 hover:after:scale-x-100"
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
        bg-gradient-to-r from-brand-orange to-brand-green
        px-7 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-orange/30
        transition hover:brightness-110 hover:shadow-brand-orange/50
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-brand-orange
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
        scrolled ? "shadow-md shadow-brand-green/10" : "border-b border-slate-100"
      }`}
    >
      {/* Brand colour strip taken from the logo */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-brand-green via-brand-orange to-brand-gold"
      />

      {/* max-w-[1500px] keeps logo and Donate button pulled in from the screen edges (smaller number = more inward, bigger = closer to the screen edges) */}
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 md:h-24 lg:gap-4 lg:px-8 xl:gap-6">
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
            className="rounded-lg p-2 text-brand-green hover:bg-brand-blush lg:hidden"
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
                      ? "bg-brand-blush text-brand-green"
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