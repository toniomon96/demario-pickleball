# Full-Stack Conversion Prompt

Convert the existing static `index.html` prototype in this repo into a production-grade full-stack web application for DeMario Montez's pickleball coaching business.

## Stack

- **Frontend**: Next.js (App Router, TypeScript)
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API routes (Route Handlers)
- **Auth**: Supabase Auth (for coach admin login)
- **Deploy**: Vercel

## What to build

### 1. Convert to Next.js

Recreate the existing `index.html` design pixel-perfectly as a Next.js App Router project. The design uses Space Grotesk + Inter fonts, a dark charcoal theme (`oklch(0.17 0.01 260)`), and an electric lime accent (`oklch(0.88 0.24 135)`). All sections, animations, and interactions from the static prototype must be preserved:

- Sticky nav
- Hero with full-bleed photo, stats row, and CTA buttons
- Scrollable trust bar
- Auto-advancing testimonial carousel with pager dots
- "What You'll Improve" 2×2 card grid
- Philosophy section with strikethrough + italic accent
- Tabbed lesson structure (Foundations / Strategy Lab / Group Clinic)
- About section with coach photo, bio, stat grid, and photo gallery
- Final CTA with radial glow
- Footer
- Sticky "Book a lesson" bar (appears after 500px scroll)
- Booking modal (day picker, time slots, confirmation receipt)
- Scroll-triggered reveal animations on all sections

Images are in `/img` — copy them into the Next.js `public/` directory.

### 2. Supabase — database schema

Create the following tables in Supabase:

**`bookings`**
```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  lesson_type text not null check (lesson_type in ('beginner', 'advanced', 'clinic')),
  lesson_date date not null,
  lesson_time text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text
);
```

**`inquiries`**
```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false
);
```

### 3. API routes

Implement the following Next.js Route Handlers:

- `POST /api/bookings` — accepts `{ name, email, phone, lesson_type, lesson_date, lesson_time, notes }`, inserts into Supabase `bookings`, returns the created booking
- `GET /api/bookings` — protected (requires coach session); returns all bookings ordered by `lesson_date`
- `PATCH /api/bookings/[id]` — protected; updates booking `status` (confirm or cancel)
- `POST /api/inquiries` — accepts `{ name, email, message }`, inserts into `inquiries`

### 4. Booking modal — wire to real API

Update the booking modal (currently pure UI state) to:

- Add name, email, and phone fields before the day/time picker
- On confirm, call `POST /api/bookings` and show the confirmation receipt with the returned booking ID
- Show a loading state while the request is in-flight
- Show an error state if the request fails

### 5. Coach admin dashboard

Create a protected route at `/admin` that:

- Requires Supabase Auth login (email + password) — DeMario's credentials
- Shows a table of all bookings: date, time, student name, email, lesson type, status
- Allows confirming or cancelling each booking inline
- Shows unread inquiries in a separate tab
- Redirects unauthenticated users to `/admin/login`

The admin UI should match the site's dark theme and use the same CSS variables.

## Environment variables needed

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Notes

- Use the Supabase JS client (`@supabase/supabase-js`) for all DB access
- Use `@supabase/ssr` for server-side auth in Next.js App Router
- The public routes (`POST /api/bookings`, `POST /api/inquiries`) should use the anon key
- The protected admin routes should validate the session server-side using the service role key
- Keep the design faithful to the prototype — don't introduce new UI patterns or component libraries
