# UniLink-App

UniLink is a platform designed to seamlessly connect university students with top employers. It moves beyond generic job boards by allowing employers to target pre-vetted campus talent based on verified coursework, skills, and university standing.

## Development Progress

### ✅ Finished
- **User Creation**: Available through sign up (resolved Supabase fetch/API key issues).
- **Dashboard Navigation**: Sidebar fully functional with correct UniLink logo redirect to `/dashboard`.
- **Student Dashboard Pages**: Generated missing core pages (Applications, Recommended Jobs, Settings, and Profile).
- **Interactive Profile Questionnaire**: Built a 9-step branching wizard ("Vibe" -> "Path" -> "Convergence") for first-timers to populate their skills dynamically.
- **Framework Search**: Inline adding and deleting of top industry frameworks via a responsive autocomplete dropdown.
- **PDF Resume Viewer**: Users can upload a PDF resume directly to their profile to be rendered instantly for employers.
- **Next.js Framework**: Initialized `v15` app utilizing the React App Router, Server Components, and strict TypeScript rules.
- **Tailwind Ecosystem**: Established global variables and styling matching a modern, dark-mode/light-mode ready aesthetic.
- **Component Library**: Handbuilt a custom suite of reusable UI components (`Card`, `Input`, `Button`) mimicking enterprise UI designs.

### 🚧 Needs Implementing
- **Email Verification**: Email sent to user email after sign up.
- **Password Management**: Reset password email flow.
- **Application page**: Users can fill out an application form to posts skills and desired jobs or gigs.
- **Data Mutations**: Replace hardcoded UI arrays in the dashboard with live fetch logic reading from the Supabase tables (`public.person`, `public.application`, etc.).
- **Live fetch for applications**: Employees can see students applications in the application page.
- **Job Seeding**: Create fake business accounts & jobs to fill jobs page.
- **Job Listing Page**: Create a jobs listing page.

## Running the Project Local

1. Install dependencies (if you haven't): `npm install`
2. Generate a `.env.local` to match `.env.example` using your Supabase credentials.
3. Run the Dev Server: `npm run dev`
4. Visit [http://localhost:3000](http://localhost:3000)
