export interface NavLink {
  id: string;
  label: string;
  href: string;
}

// Single source of truth for header + footer navigation.
// (The visible text comes from i18n/translations.ts -> "nav.<id>")
export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "work", label: "Our Work", href: "#work" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "contact", label: "Contact", href: "#contact" },
];