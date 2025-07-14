export interface NavigationLink {
  href: string;
  label: string;
  icon: string;
  description: string;
  authOnly?: boolean; // If true, only show when logged in
}
