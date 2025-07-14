import { NavigationLink } from "./types";

// Navigation links - single source of truth
export const navigationLinks: NavigationLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "📊",
    description: "Your financial overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: "💳",
    description: "Track expenses & income",
  },
  {
    href: "/goals",
    label: "Goals",
    icon: "🎯",
    description: "Savings & budgets",
  },
  {
    href: "/insights",
    label: "Insights",
    icon: "📈",
    description: "Financial reports",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "⚙️",
    description: "Account & preferences",
  },
];
