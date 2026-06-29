# Trvrse — AI Agent Guide (Condensed)

> Paste this file with `@docs/TRVRSE-AGENT-GUIDE.md` in Cursor when starting new work.

## Identity
- **Company:** Nexxogen Limited (Nigerian LLC)
- **Product:** Trvrse — cross-border fintech wallet
- **Tagline:** Pay Anywhere. Always.
- **Founder:** Arthur (CTO, backend engineer)

## Core product (one sentence)
Fund from Nigerian bank → app detects country → convert at live FX → send to any global bank account or pay with multi-currency virtual card.

## Build status in this repo
- ✅ Investor landing page (Next.js 14, animated)
- ✅ Live forex ticker (ExchangeRate-API)
- ✅ Waitlist API + Supabase schema
- ✅ Pitch deck PDF (`public/trvrse-pitch-deck.pdf`)
- ⏳ Mobile app (React Native) — not in this repo yet
- ⏳ Wise API integration — after sandbox approval
- ⏳ CBN PSSP license — in progress via legal counsel

## Non-negotiables
1. Register and operate as **LLC**, not sole proprietorship
2. Use **Wise** (or similar) for global bank rails — never integrate every bank directly
3. **Access Bank** as primary NG banking partner
4. **Live forex** on demo/marketing — no fake random rates
5. Tiered KYC limits (Basic / Verified / Premium / Business)
6. Free-tier hosting only for demo (Vercel + Supabase)

## Design tokens
```
Navy:    #0A1628
Electric:#2D7DD2
Emerald: #06D6A0
Subtext: #8899AA
Fonts:   Inter (headings), Poppins (body)
```

## When building features, ask:
- Does this match the Nigeria → UK/US/Canada corridor MVP?
- Does it respect tier limits?
- Is FX from a real API?
- Is location-based currency switch reflected in UI?

## Key files
| Path | Purpose |
|------|---------|
| `components/LiveDemo.tsx` | Forex ticker + phone mockup sync |
| `lib/forex.ts` | ExchangeRate-API fetch + cache |
| `lib/currencies.ts` | 14 currency definitions |
| `app/api/waitlist/route.ts` | Email capture |
| `app/api/rates/route.ts` | Live rates endpoint |
| `scripts/generate_pitch_deck.py` | PDF deck generator |
| `docs/TRVRSE-PROJECT-BRIEF.md` | Full reference doc |

## Next product work (priority)
1. React Native app from Stitch 26-screen prototype
2. Wise sandbox integration
3. Access Bank funding flow
4. KYC + tier enforcement
5. Virtual card UI (placeholder → real issuer later)

## Do not
- Process real money without CBN approval
- Use `npx convex deploy` for dev (use `npx convex dev` if Convex added later)
- Commit `.env.local` or secrets

## Personas for copy/UX
- Chioma (traveler, NG→CAD)
- Tunde (remote USD → Lagos)
- Zainab (global business GBP/USD)
- Adekunle (tuition NG→UK)
