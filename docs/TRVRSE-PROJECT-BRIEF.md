# Trvrse by Nexxogen — Project Brief & Reference

> **Source:** Claude voice/text conversations (Jun 2025–2026)  
> **Purpose:** Single source of truth for product, business, legal, and build decisions  
> **Company:** Nexxogen Limited (register as LLC)  
> **Product:** Trvrse — cross-border fintech wallet  

---

## Agent / Developer Quick Guide

Use this section when continuing work in Cursor or with any AI assistant.

### What we're building
**Trvrse** is a wallet app (not a bank) that lets users:
- Fund from local Nigerian banks (Access Bank first)
- Auto-detect location and switch/display local currency
- Convert NGN ↔ USD, GBP, CAD, EUR, and 10+ currencies at **live forex rates**
- Send **direct bank transfers** globally (Wise rails — not direct per-bank APIs)
- Pay with **virtual cards** per currency (phase 2; UI placeholder OK for MVP)
- Tiered KYC limits (Basic → Verified → Premium → Business)

### What's already built (landing)
- Next.js 14 investor landing page in this repo
- Live forex via ExchangeRate-API (`/api/rates`)
- Waitlist API (`/api/waitlist`) + Supabase schema
- Pitch deck PDF: `public/trvrse-pitch-deck.pdf`
- Regenerate deck: `npm run generate:deck`

### Stack decisions (locked)
| Layer | Choice |
|-------|--------|
| Mobile app (future) | React Native + Expo |
| Landing / marketing | Next.js 14, Tailwind, Framer Motion, GSAP, Three.js |
| Hosting | Vercel (free) |
| DB (waitlist) | Supabase (free) |
| Forex (MVP) | ExchangeRate-API → migrate to Wise API when approved |
| Settlement rails | Access Bank (NG) + Wise (global outbound) |
| Design | Navy `#0A1628`, Electric `#2D7DD2`, Emerald `#06D6A0`, Poppins/Inter |

### Do NOT do yet without license
- Process real customer funds at scale without CBN PSSP approval
- Build direct API integrations to hundreds of banks (use Wise orchestration)
- Register as sole proprietorship (use **LLC** only)

### Priority order for Arthur
1. CAC register **Nexxogen Limited** (LLC)
2. Open **Access Bank** business account
3. Mary (legal) → CBN PSSP + Super Agent application, AML/KYC policies
4. Wise + Adyen **sandbox** API access
5. Build mobile MVP (26+ screens in Stitch → React Native)
6. Apply BOI YES Programme + Tony Elumelu Foundation for legal/capital
7. Seed raise ($200K–$500K) after MVP traction → deposit ₦200M CBN escrow
8. Deploy landing to Vercel; share with investors

### Key personas (use cases)
1. **Chioma** — lands Toronto, NGN → CAD, pays with virtual card
2. **Tunde** — paid in USD, sends to family in Lagos
3. **Zainab** — global business, pays suppliers GBP/USD
4. **Adekunle** — tuition from Nigeria to UK account

---

## 1. Product Vision

### Problem
Nigerians abroad face:
- Declined cards at foreign merchants
- Hidden FX fees (up to ~5–10%)
- Fragmented apps (remittance + forex + cards)

### Solution
One app: fund locally → auto-detect country → convert at live rates → send to any bank or pay with virtual card.

### Tagline
**"Pay Anywhere. Always."** / **"The Last Wallet You'll Ever Need."**

### Competitive edge
Location-aware auto-currency + direct bank transfers + multi-currency virtual cards in **one** Nigeria-first UX. Wise/Revolut/Chipper each do parts; none combine all three for the Nigeria diaspora corridor.

---

## 2. Business Model

### Revenue streams
| Stream | Fee |
|--------|-----|
| Currency conversion | 0.5% (primary) |
| Domestic transfer (NG) | Flat fee under ~$10 equivalent |
| International transfer | ~0.5% |
| Virtual card interchange | ~0.3% per transaction |
| Premium subscription | ₦2,500/month (future) |

### Unit economics (0.5% margin)
- $20 avg × 1M txns/year = $20M volume → **$100K/year**
- $100 avg × 1M txns → **$500K/year**
- Sustainable at **2–3M+ transactions/year** or higher average ticket

### Pricing strategy
- Early: compete on **experience/speed**, not undercutting Wise on price
- Example: Wise ~2%, charge **2.5%**, keep **0.5%** margin
- Minimum transfer amounts on micro-txns to avoid fixed-cost losses (~10–20¢ infra per txn)

---

## 3. Legal & Regulatory (Nigeria)

### Entity structure
- **Nexxogen Limited** — Private **LLC** (not sole prop, not enterprise)
- LLC = liability protection + CBN credibility

### License path (from legal opinion — Mary / Oluwatodimu Ige & Associates)
| Item | Detail |
|------|--------|
| Primary license | **PSSP** (Payment Solution Service Provider) |
| Recommended stack | PSSP + **Super Agent** + **Bank partnership** |
| Capital requirement | **₦200,000,000** in CBN escrow (proof of capital, not a fee) |
| Legal/application costs | ~₦5–10M (law firm, audits, docs) |
| Full PSB alternative | ₦5B+ — avoid for now |
| Data protection | Nigeria Data Protection Act 2023; register with NDPC |

### What you need before CBN approval
- Technology infrastructure
- Risk management framework
- AML/CFT policies
- Information security framework
- Board/management CBN approval

### Operating before full license
- **Cannot** legally process real money at scale without approval
- **Can:** build MVP, sandbox test, beta under Access Bank's license (with their blessing), submit application and wait
- **Cannot** skip licensing for production

### Timeline (optimistic)
| Phase | Duration |
|-------|----------|
| MVP build | Weeks 1–6 |
| CBN application | Month 2+ |
| CBN review | 2–6 months |
| Go-live (licensed) | ~4–6 months; target Dec 2025 / buffer Q1 2026 |

---

## 4. Partnerships & Infrastructure

### Nigeria (deposits / settlement)
- **Access Bank** (primary) — fintech-friendly APIs
- Alternatives: GTBank, First Bank

### Global (outbound transfers — do NOT integrate every bank)
- **Wise API** — bank lookup, settlement, 80+ countries
- **Adyen** or **Mangopay** — payment orchestration (evaluate vs Wise)

### Flow
```
User (NG) → Access Bank fund wallet → Trvrse UX
User sends to US bank → Wise API → JP Morgan (etc.)
User in Canada enters account → Wise bank lookup → auto-fill bank name
```

### Corridor strategy
- **Year 1:** Nigeria ↔ UK, US, Canada
- **Year 2+:** India, Kenya, Ghana, EU via Wise expansion
- Do not launch globally day one

---

## 5. Funding Strategy

### Immediate (no equity)
| Source | Amount | Notes |
|--------|--------|-------|
| [BOI YES Programme](https://www.boi.ng) | Up to ₦10M | Covers legal fees |
| [Tony Elumelu Foundation](https://www.tonyelumelufoundation.org/teep) | $5,000 grant | Non-dilutive; apply when open |
| [LSETF](https://www.lsetf.ng) | Loans | Lagos-based |
| Personal salary (Sujimoto) | Bootstrap | Check employment IP clause |

### Seed (after MVP + traction)
| Source | Typical check |
|--------|---------------|
| Antler Nigeria | $100K for 10% (needs co-founder team) |
| Y Combinator | ~$500K (Mar/Sep batches) |
| Nigerian VCs | Founders Factory, Loftyinc, Greentec, Magic Fund |
| Target | $200K–$500K seed |

### Capital sequence
1. Build MVP + prove transactions (sandbox/beta)
2. Raise seed → company bank account
3. Deposit **₦200M** CBN escrow
4. PSSP approved → scale live

### Message to Mary (legal)
> "Based on the legal opinion, our path is PSSP + Super Agent with a bank partnership (₦200M capital). Can you help with the CBN application and draft AML/KYC and data protection policies? I'm registering Nexxogen Limited this week."

---

## 6. Technical Architecture

### Mobile app (MVP — to build)
- **React Native + Expo**
- **React Navigation**, Reanimated 2, Lottie
- **TypeScript**
- Biometric auth, PIN, KYC upload flows
- Location detection → currency banner
- 26+ screens (Stitch prototype)

### Landing (this repo)
```
traverse-website/
├── app/                    # Next.js App Router
├── components/             # Hero, Problem, Solution, etc.
├── lib/                    # currencies, forex, supabase
├── public/trvrse-pitch-deck.pdf
├── scripts/generate_pitch_deck.py
└── supabase/schema.sql
```

### Hosting costs (bootstrap)
| Service | Cost |
|---------|------|
| Vercel | Free tier |
| Supabase | Free tier |
| Railway/Render (if needed) | $0–10/mo |
| Wise/Adyen | Per-transaction only |

### Employment note
- Keep Sujimoto job while building
- Build on personal time/devices; verify no IP assignment clause
- Nexxogen must be clearly separate from employer work

---

## 7. User Tier System (CBN-aligned)

| Tier | KYC | Daily limit | Monthly | Features |
|------|-----|-------------|---------|----------|
| **Basic** | Email/phone | $50 | $200 | Wallet-to-wallet only |
| **Verified** | BVN/ID | $500 | $2,000 | Domestic bank, conversion |
| **Premium** | Full KYC + selfie | $5,000 | $20,000 | International, multi-bank, 1.5% fee |
| **Business** | CAC + director ID | $50,000 | $500,000 | Bulk, API, dedicated manager |

UI: tier badge, progress bars, upgrade CTA, limit-reached modal.

---

## 8. UI/UX & Animation Spec

### Intro / splash (2.5s)
- Navy bg → logo spring in → tagline letter-by-letter → blue pulse line → slide up to onboarding

### Onboarding (3 slides)
1. Globe + pins (NG, UK, CA) — "Your money follows you everywhere"
2. Currency cards + live rate — "Convert instantly at live rates"
3. Transfer success + confetti — "Send directly to any bank"

### Location switch
- Banner: "Welcome to Canada — Switched to CAD"
- Balance card flip animation
- Pre-fill converter with detected currency

### Design tools
- **Stitch** — full 26-screen clickable prototype (super prompt in chat history)
- **Cursor** — React Native code generation from Stitch screenshots

### Logo (Stitch prompt)
- Stylized **T** from opposing arrows (borderless movement + FX)
- Colors: Navy, Electric Blue, Emerald
- Variations: horizontal, stacked, app icon, monochrome
- Avoid: globe clichés, dollar signs, thin lines

---

## 9. Pitch Deck (12 slides)

Generated PDF in repo. Slides:
1. Cover — Seed Round 2025
2. Problem
3. Solution (4 features)
4. Market ($190B, 50M+, 15%)
5. How It Works (3 steps)
6. Business Model (4 streams)
7. Traction & Roadmap
8. Competitive matrix vs Wise/Revolut/Chipper
9. Go-to-Market (3 phases)
10. Team (Arthur CTO, Mary CLO)
11. The Ask — $500K seed, use of funds
12. Closing + contact

**Regenerate:** `python scripts/generate_pitch_deck.py`

---

## 10. Competitors

| Company | Strength | Gap vs Trvrse |
|---------|----------|-----------------|
| Wise | FX, multi-currency | No location auto-switch; weak NG consumer UX |
| Revolut | Cards, auto-FX | Not Nigeria-first |
| Chipper Cash | Africa remittance | No virtual card; no location detection |
| Flutterwave | B2B payments | Not consumer wallet |
| Remitly/WorldRemit | One-way remittance | Not travel wallet |

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| CBN delays | Apply early; operate beta under bank partner |
| Bank API rejection | Partner with Access; use Wise for outbound |
| ₦200M capital | Seed raise after MVP traction |
| FX rate risk | Wise handles hedging at scale |
| Fraud/AML | KYC tiers + compliance policies |
| User acquisition cost | One corridor first; diaspora communities |

---

## 12. Application Links

| Program | URL |
|---------|-----|
| CAC registration | https://cac.gov.ng |
| Tony Elumelu Foundation | https://www.tonyelumelufoundation.org/teep |
| Bank of Industry YES | https://www.boi.ng |
| Antler Nigeria | https://www.antler.co/location/nigeria |
| Y Combinator | https://www.ycombinator.com/apply |
| LSETF | https://www.lsetf.ng |
| MEST Africa | https://meltwater.org/en/mest |
| ExchangeRate-API | https://www.exchangerate-api.com |
| Wise API | https://wise.com/gb/business/api |

---

## 13. Contacts & Brand

| Item | Value |
|------|-------|
| Company | Nexxogen Limited |
| Product | Trvrse |
| Invest email | invest@nexxogen.com |
| General | hello@nexxogen.com |
| Website (planned) | www.trvrse.app |
| Legal counsel | Oluwatodimu Ige & Associates (via Mary) |
| Banking partner (target) | Access Bank |

---

## 14. Conversation Log Summary

Arthur (senior backend dev, Sujimoto, ex-Andela contractor) conceived a universal cross-border wallet after personal pain traveling abroad as a Nigerian. Core insight evolved from "reversal" to **universal payment**. Company named **Nexxogen**; product named **Trvrse** (transparency/global movement theme). Girlfriend **Mary** provides legal path via PSSP. Build-first strategy: code MVP while licensing runs in parallel. Landing page built for investor demo. Funding via grants first (BOI, TEF), then seed. Target 0.5% transaction margin with volume growth to sustainability.

---

*Last updated: June 2026 — sync with `docs/TRVRSE-AGENT-GUIDE.md` for condensed AI instructions.*
