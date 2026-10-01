export interface NavLink {
  id: string;
  label: string;
  href: string;
}

// Single source of truth for header navigation.
// To add or rename a page, edit this array only.
export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "work", label: "Our Work", href: "#work" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "events", label: "Events", href: "#events" },
  { id: "get-involved", label: "Get Involved", href: "#get-involved" },
  { id: "contact", label: "Contact", href: "#contact" },
];