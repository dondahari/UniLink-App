# UniLink-App

UniLink is a platform designed to seamlessly connect university students with top employers. It moves beyond generic job boards by allowing employers to target pre-vetted campus talent based on verified coursework, skills, and university standing.

## Development Progress

### ✅ Finished

#### Core Architecture
- **Next.js Framework**: Initialized `v15` app utilizing the React App Router, Server Components, and strict TypeScript rules.
- **Tailwind Ecosystem**: Established global variables and styling matching a modern, dark-mode/light-mode ready aesthetic.
- **Component Library**: Handbuilt a custom suite of reusable UI components (`Card`, `Input`, `Button`) mimicking enterprise UI designs.
- **User Creation & Routing**: Active Role-Based Access Control (RBAC). Upon login, the server natively checks user metadata to smartly map them directly to `/dashboard` (Students) or `/employer` (Employer SaaS), completely isolating functionality.
- **Database Seeding**: Hard-written `seed_jobs.sql` payload fully mimicking 29 dynamic jobs spanning 11 test employers across varying domains, injecting detailed rich text descriptions, payout variables, and contract lengths.

#### Student Hub
- **Interactive Profile Questionnaire**: Built a 9-step branching wizard ("Vibe" -> "Path" -> "Convergence") for first-timers to populate their skills dynamically.
- **Framework Search**: Inline adding and deleting of top industry frameworks via a responsive autocomplete dropdown.
- **Integrated Jobs Board**: Replaced standard listings with a dual-pane detail system. Selecting a job opens a high-fidelity description pane while maintaining scroll context in the main feed.
- **Expanding Bounty Terminal**: Designed an "Expanding Card" model for the Bounties page. Mission cards vertically stretch in-place using `framer-motion` to reveal parameters with a stabilized, non-bouncing transition.
- **Unified Filter Sidebar**: Centralized all search and range-based filtering into a dedicated "Terminal" sidebar, freeing up screen real estate for listing density.

#### Employer Hub
- **KPI Metrics Dashboard**: Aesthetic "SaaS-style" dashboard layout calculating real-time integers counting active applications against live bindings.
- **Bento Box Postings Manager**: Restyled live listings into rich, deep-data KPI cards showing experience requirements, truncated descriptions, and localized analytic bounds natively generated through `application(count)` tables.
- **Dynamic Listing Creator**: Multi-form environment spanning Jobs vs Bounties, hiding/rendering parameters to force accurate insertion types directly onto Supabase bindings.
- **Storage Avatars**: Full pipeline engineered allowing `.jpg`/`.png` file rendering directly inside the profile settings mapping cleanly into a native explicit `employer-logos` Supabase Bucket.

### 🚧 Needs Implementing
- **Password Management**: Reset password email flow.
- **Advanced Filtering Mechanics**: Hook custom search parameters strictly dynamically against queried items vs local JSON objects.
- **Live Student Applications**: Finalize the true data-insertion phase of the student hitting "Apply" inside the Tinder-UI seamlessly porting to the employer's Candidate view.
- **Live Search / Connections**: Enable active real-time messaging bindings between mapped students/employers natively interacting.

## Running the Project Local

1. Install dependencies (if you haven't): `npm install`
2. Generate a `.env.local` to match `.env.example` using your Supabase credentials.
3. Apply SQL migrations in `/src/supabase/migrations` starting from `0000` to `0005`.
4. Run `seed_jobs.sql` inside your Supabase dashboard to generate live dummy listings!
5. Run the Dev Server: `npm run dev`
6. Visit [http://localhost:3000](http://localhost:3000)
