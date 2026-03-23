# UniLink-App

UniLink is a platform designed to seamlessly connect university students with top employers. It moves beyond generic job boards by allowing employers to target pre-vetted campus talent based on verified coursework, skills, and university standing.

## Development Progress

### ✅ Completed Setup (Frontend & Architecture)
- **Next.js Framework**: Initialized `v15` app utilizing the React App Router, Server Components, and strict TypeScript rules.
- **Tailwind Ecosystem**: Established global variables and styling matching a modern, dark-mode/light-mode ready aesthetic.
- **Component Library**: Handbuilt a custom suite of reusable UI components (`Card`, `Input`, `Button`) mimicking enterprise UI designs.
- **Core Views Built**:
  - `app/page.tsx`: Primary Landing Page with unified dual-actor routing.
  - `app/students/page.tsx`: Student value proposition and feature highlights.
  - `app/employers/page.tsx`: Employer pipeline marketing and feature highlights.
  - `app/login/page.tsx`: Standard auth layout.
  - `app/register/page.tsx`: Interactive client-side component to toggle between rendering 'Student' or 'Employer' registration contexts.
  - `app/dashboard/`: Responsive sidebar layout shell with sub-routing capabilities.
- **Database Architecture**: Evaluated original raw `queries.sql` representing a MySQL schema and mapped these to Supabase Postgres compatible structures utilizing `UUID` for keys. Found locally in `src/supabase/migrations/0000_initial_schema.sql`.
- **API Prep**: Added the requisite API initialization scripts for `@supabase/ssr` (`lib/supabase.ts`) and `resend` (`lib/email.ts`).
- **Source Control Safety**: Updated project-level `.gitignore` files to guarantee sensitive initialization SQL (`queries.sql`) and `.env` credentials are not pushed into Git tracking.
- **Supabase Cloud Initializer**: The `.env` requires keys from a newly initialized Supabase Dashboard instance.
- **Supabase Auth**: Wire up the visual `/login` and `/register` components to Supabase Auth handler endpoints for real user generation.
- **Row Level Security (RLS)**: Policies implemented, pending Supabase auth validation

### 🚧 Pending Setup (Backend & Auth Integration)
- **Application page**: Users can fill out an application form to posts skills and desired jobs or gigs.
- **Data Mutations**: Replace hardcoded UI arrays in the dashboard with live fetch logic reading from the Supabase tables (`public.person`, `public.application`, etc.).
- **Student Skills**: Being able to add skills and education of the student so employees can see the student skills.
- **Live fetch for applications**: Employees can see students applications in the application page.

## Running the Project Local

1. Move into the child directory: `cd unilink-app`
2. Install dependencies (if you haven't): `npm install`
3. Generate a `.env.local` to match `.env.example` using your Supabase credentials.
4. Run the Dev Server: `npm run dev`
5. Visit [http://localhost:3000](http://localhost:3000)
