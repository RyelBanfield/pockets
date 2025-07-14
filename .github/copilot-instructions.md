# Copilot Instructions for AI Agents: Pockets Codebase

## Project Overview

- **Stack:** Next.js (frontend & routing), Convex (backend/database/functions), Clerk (authentication), Tailwind CSS (UI), React 19.
- **Purpose:** Collaborative personal finance app for couples—track expenses, budgets, and goals with real-time updates.

## Architecture & Key Patterns

- **Frontend:**
  - Located in `src/app/` (pages, layouts, routing) and `src/components/` (UI, providers, shared logic).
  - Uses Next.js App Router (see `src/app/layout.tsx` for providers and theming).
  - UI is built with Tailwind CSS and custom design tokens (see `src/app/globals.css`).
  - Component variants and styling use `class-variance-authority` and utility functions from `src/lib/utils.ts`.
- **Backend:**
  - Convex functions in `convex/` (business logic, data access, schema in `convex/schema.ts`).
  - Convex Auth via Clerk, configured in `auth.config.ts` and `middleware.ts`.
  - Convex client is provided to React via `ConvexClientProvider`.
- **Authentication:**
  - Clerk is the only supported auth provider (see `middleware.ts` and `auth.config.ts`).
  - User data is synced in `convex/users.ts`.

## Developer Workflows

- **Install & Run:**
  - Use `npm install` (or `pnpm install` if using pnpm) to install dependencies.
  - Start dev server: `npm run dev` (Next.js + Convex dev server).
- **Convex Functions:**
  - Edit/add functions in `convex/`.
  - Deploy/push with `npx convex push`.
  - Use `npx convex dev` for local backend.
- **Styling:**
  - Use Tailwind classes and custom CSS variables (see `src/app/globals.css`).
  - Prefer utility-first styling and component variants.
- **Component Patterns:**
  - UI components in `src/components/ui/` are mostly wrappers around Radix UI primitives, with custom props and styling.
  - Use `cn` from `src/lib/utils.ts` for className composition.
  - Data attributes (e.g., `data-slot`, `data-sidebar`) are used for styling and state.
- **Routing:**
  - Pages are colocated in `src/app/` (e.g., `src/app/goals/page.tsx`).
  - Layout and providers are set in `src/app/layout.tsx`.

## Conventions & Integration

- **No server-side rendering for Convex functions—use client components for data fetching.**
- **All authentication flows must go through Clerk.**
- **Use the provided hooks and context providers for state and data access.**
- **Do not modify files in `convex/_generated/`—these are auto-generated.**
- **Use `pnpm` for dependency management if possible (see `pnpm-workspace.yaml`).**
- **Always use arrow functions for React components (no function declarations).**

## Examples

- **Add a new page:** Create a folder in `src/app/` and add a `page.tsx` file.
- **Add a Convex mutation:** Add a function to `convex/`, update `schema.ts`, then run `npx convex push`.
- **Style a component:** Use Tailwind classes and reference design tokens from `globals.css`.
