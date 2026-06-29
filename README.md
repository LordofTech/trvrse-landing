# Trvrse Landing Page

Investor-facing landing page for **Trvrse** — a cross-border fintech wallet by **Nexxogen**.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Animations:** Framer Motion, GSAP ScrollTrigger, Three.js (React Three Fiber)
- **Backend:** Next.js API Routes
- **Database:** Supabase (waitlist)
- **Hosting:** Vercel

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example env file and add your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create the Supabase table

In your [Supabase SQL Editor](https://supabase.com/dashboard), run the SQL in `supabase/schema.sql`.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to Vercel and add the environment variables in the Vercel dashboard.

```bash
# Production deploy
npx vercel --prod
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout + fonts
│   └── api/waitlist/route.ts # Waitlist API endpoint
├── components/
│   ├── Hero.tsx              # Hero with particles + phone mockup
│   ├── Problem.tsx           # Pain points section
│   ├── Solution.tsx          # Feature cards
│   ├── HowItWorks.tsx        # 3-step flow with GSAP line
│   ├── LiveDemo.tsx          # Live forex ticker demo
│   ├── UseCases.tsx          # Flip cards with personas
│   ├── Stats.tsx             # Animated counters
│   ├── InvestorSection.tsx   # Pitch section + 3D globe
│   ├── Waitlist.tsx          # Email capture + confetti
│   └── Footer.tsx            # Footer navigation
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── rate-limit.ts         # API rate limiting
├── styles/
│   └── globals.css           # Global styles + scrollbar
└── supabase/
    └── schema.sql            # Database schema
```

## Features

- Fully responsive (iOS, Android, desktop)
- `prefers-reduced-motion` support
- iOS safe area insets
- Touch-friendly 44px tap targets
- Custom cursor glow (desktop only)
- Lazy-loaded heavy components (Three.js globe)
- Server-side email validation + rate limiting
- Confetti on successful waitlist signup

## API

### `POST /api/waitlist`

```json
{
  "email": "user@example.com",
  "country": "NG"
}
```

**Responses:**
- `200` — Success
- `400` — Invalid email
- `409` — Email already registered
- `429` — Rate limited (5 requests/minute per IP)

## Pitch Deck

The investor pitch deck PDF is in `public/trvrse-pitch-deck.pdf`. Regenerate it anytime:

```bash
pip install reportlab
npm run generate:deck
```

The **Download Pitch Deck** button on the site links directly to this file.

## License

© 2025 Nexxogen Limited. All rights reserved.
