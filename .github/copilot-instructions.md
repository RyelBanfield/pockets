# Copilot Instructions for AI Agents: Pockets Codebase

## Project Overview

- **Stack:** Next.js (App Router), Convex (backend/functions/database), Clerk (auth), Tailwind CSS, React 19.
- **Purpose:** Collaborative personal finance for couples—track expenses, budgets, and goals with real-time sync.

## Architecture & Key Patterns

- **Frontend:**
  - Pages and routing in `src/app/` (see `layout.tsx` for providers: Clerk, ConvexClientProvider, ThemeProvider).
  - UI components in `src/components/ui/` wrap Radix primitives, styled with Tailwind and `class-variance-authority`.
  - Use `cn` from `src/lib/utils.ts` for className composition.
  - Data attributes (e.g., `data-slot`, `data-sidebar`) are used for styling and state.
  - All data fetching from Convex must be in client components (never server components).
- **Backend:**
  - Convex functions in `convex/` (business logic, schema in `convex/schema.ts`).
  - Auth via Clerk, configured in `auth.config.ts` and `middleware.ts`.
  - Convex client API is provided to React via `ConvexClientProvider`.
- **Authentication:**
  - Only Clerk is supported. All user flows must use Clerk (see `middleware.ts`, `auth.config.ts`).
  - User data is managed in `convex/users.ts` and synced via Clerk webhooks (`convex/http.ts`).

## Developer Workflows

- **Install & Run:**
  - Use `pnpm install` (preferred, see `pnpm-workspace.yaml`).
  - Start dev servers: `npm run dev` (runs Next.js and Convex dev server together).
- **Convex Functions:**
  - Add/edit functions in `convex/`.
  - Update schema in `convex/schema.ts` and run `npx convex push` to deploy changes.
  - Use `npx convex dev` for local backend development.
  - Never edit files in `convex/_generated/` (auto-generated).
- **Styling:**
  - Use Tailwind classes and custom CSS variables (see `src/app/globals.css`).
  - Prefer utility-first styling and component variants via `class-variance-authority`.
- **Component Patterns:**
  - All React components must be arrow functions (no function declarations).
  - UI components in `src/components/ui/` are wrappers around Radix UI, with custom props and styling.
  - Use data attributes for stateful styling (e.g., `data-slot`, `data-sidebar`).
- **Routing:**
  - Pages are colocated in `src/app/` (e.g., `src/app/dashboard/page.tsx`).
  - Layout and providers are set in `src/app/layout.tsx`.

## Conventions & Integration

- **No SSR for Convex data—fetch in client components only.**
- **All authentication must use Clerk.**
- **Use provided hooks/context for state and data access.**
- **Never modify `convex/_generated/` files.**
- **Use pnpm for dependency management.**
- **React components: always use arrow functions.**

## Examples

- **Add a new page:** Create a folder in `src/app/` and add a `page.tsx` file.
- **Add a Convex mutation:** Add a function to `convex/`, update `schema.ts`, then run `npx convex push`.
- **Style a component:** Use Tailwind classes and reference design tokens from `globals.css`.
- **Use Convex in React:**
  - Import hooks from `convex/react` and API from `convex/_generated/api`.
  - Example:
    ```ts
    import { useQuery, useMutation } from "convex/react";
    import { api } from "@/../convex/_generated/api";
    const data = useQuery(api.pockets.getAll, {});
    const addPocket = useMutation(api.pockets.add);
    ```

---
