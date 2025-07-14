import { NavigationLink } from "./types";

// Navigation links - single source of truth
export const navigationLinks: NavigationLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "Your financial overview",
    authOnly: true,
  },
  // Add more links as needed, e.g.:
  // {
  //   href: "/about",
  //   label: "About",
  //   icon: "ℹ️",
  //   description: "Learn more about Pockets",
  //   authOnly: false,
  // },
];
