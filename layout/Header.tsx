"use client";

import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { NAV_LINKS, type NavLink } from "../NavLinks/navLinks";

/* ---------- Small presentational pieces ---------- */

function Logo() {
  return (
    <a href="#home" className="flex min-w-0 shrink items-center" aria-label="Sambhav Foundation home">
      {/* Export the full lockup (icon + SAMBHAV FOUNDATION + tagline) to /public/logo.png */}
      {/* max-w keeps the logo from pushing the menu button off tiny screens;
          it is slightly smaller only on 1024–1279px so the nav fits on one line */}
      <img
        src="/header.png"
        alt="Sambhav Foundation"
        className="h-14 w-auto max-w-[60vw] object-contain object-left md:h-16 lg:h-12 xl:h-16 lg:max-w-none"
      />
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
        after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full
        after:bg-brand-navy after:transition-transform after:duration-200
        ${
          isActive
            ? "font-semibold text-brand-navy after:scale-x-100"
            : "font-medium text-slate-800 hover:text-brand-navy after:scale-x-0 hover:after:scale-x-100"
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
      className={`shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-orange-500
        px-7 py-3 text-[15px] font-semibold text-white shadow-md transition-colors
        hover:bg-orange-600 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-orange-500
        lg:px-4 lg:py-2.5 lg:text-sm xl:px-7 xl:py-3 xl:text-[15px] ${className}`}
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

  const handleNavClick = (id: string) => {
    setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6 lg:gap-4 lg:px-8 xl:gap-6">
        <Logo />

        {/* Desktop navigation, centered between logo and button */}
        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-8"
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
            className="rounded-md p-2 text-brand-navy hover:bg-slate-100 lg:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation (scrolls if the screen is very short, e.g. phone in landscape) */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-100 bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.id)}
                  className={`block rounded-md px-3 py-2.5 text-base font-medium ${
                    activeId === link.id
                      ? "bg-brand-navy/5 text-brand-navy"
                      : "text-slate-700 hover:bg-slate-50"
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