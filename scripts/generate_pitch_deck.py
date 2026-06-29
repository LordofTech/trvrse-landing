"""Generate Trvrse investor pitch deck PDF."""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

W, H = A4

NAVY = colors.HexColor("#0A1628")
BLUE = colors.HexColor("#2D7DD2")
GREEN = colors.HexColor("#06D6A0")
WHITE = colors.white
GREY = colors.HexColor("#8899AA")
LIGHTBLUE = colors.HexColor("#0F1F35")
RED = colors.HexColor("#E63946")
GOLD = colors.HexColor("#FFD700")

OUTPUT = Path(__file__).resolve().parent.parent / "public" / "trvrse-pitch-deck.pdf"


def draw_bg(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_accent_line(c, y=H - 18 * mm):
    c.setFillColor(BLUE)
    c.rect(0, y, W, 2, fill=1, stroke=0)


def draw_slide_number(c, num, total=12):
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8)
    c.drawRightString(W - 15 * mm, 10 * mm, f"{num} / {total}")


def draw_logo_text(c, x=15 * mm, y=H - 14 * mm):
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x, y, "TRVRSE")
    c.setFillColor(GREY)
    c.setFont("Helvetica", 7)
    c.drawString(x, y - 9, "by NEXXOGEN")


def draw_tag(c, text, x, y, bg=BLUE, fg=WHITE):
    tw = c.stringWidth(text, "Helvetica-Bold", 8) + 12
    c.setFillColor(bg)
    c.roundRect(x, y, tw, 14, 4, fill=1, stroke=0)
    c.setFillColor(fg)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x + 6, y + 3.5, text)


def draw_card(c, x, y, w, h, color=LIGHTBLUE, radius=8):
    c.setFillColor(color)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=0)


def heading(c, text, x, y, size=28, color=WHITE):
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", size)
    c.drawString(x, y, text)


def subheading(c, text, x, y, size=13, color=GREY):
    c.setFillColor(color)
    c.setFont("Helvetica", size)
    c.drawString(x, y, text)


def body(c, text, x, y, size=10, color=WHITE):
    c.setFillColor(color)
    c.setFont("Helvetica", size)
    c.drawString(x, y, text)


def wrap_text(c, text, x, y, max_width, font="Helvetica", size=10, color=WHITE, line_height=14):
    c.setFillColor(color)
    c.setFont(font, size)
    words = text.split()
    line = ""
    current_y = y
    for word in words:
        test = line + " " + word if line else word
        if c.stringWidth(test, font, size) <= max_width:
            line = test
        else:
            c.drawString(x, current_y, line)
            current_y -= line_height
            line = word
    if line:
        c.drawString(x, current_y, line)
    return current_y


def draw_divider(c, x, y, width, color=BLUE):
    c.setFillColor(color)
    c.rect(x, y, width, 1.5, fill=1, stroke=0)


def metric_card(c, x, y, w, h, value, label, color=BLUE):
    draw_card(c, x, y, w, h, LIGHTBLUE)
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 22)
    vw = c.stringWidth(value, "Helvetica-Bold", 22)
    c.drawString(x + (w - vw) / 2, y + h - 28, value)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8)
    lw = c.stringWidth(label, "Helvetica", 8)
    c.drawString(x + (w - lw) / 2, y + 10, label)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)

    # SLIDE 1: COVER
    draw_bg(c)
    draw_accent_line(c, H - 3 * mm)
    c.setFillColor(BLUE)
    c.roundRect(W / 2 - 28, H / 2 + 20, 56, 56, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(W / 2, H / 2 + 36, "T")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 42)
    c.drawCentredString(W / 2, H / 2 - 8, "TRVRSE")
    c.setFillColor(BLUE)
    c.setFont("Helvetica", 13)
    c.drawCentredString(W / 2, H / 2 - 26, "Pay Anywhere. Always.")
    draw_divider(c, W / 2 - 40, H / 2 - 38, 80, BLUE)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 10)
    c.drawCentredString(W / 2, H / 2 - 54, "Cross-Border Fintech Wallet")
    c.drawCentredString(W / 2, H / 2 - 68, "by Nexxogen Limited")
    draw_tag(c, "SEED ROUND 2025", W / 2 - 42, H / 2 - 100, BLUE, WHITE)
    draw_tag(c, "CONFIDENTIAL", W / 2 - 42, 18 * mm, RED, WHITE)
    draw_slide_number(c, 1)
    c.showPage()

    # SLIDE 2: THE PROBLEM
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 2)
    heading(c, "The Problem", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Traveling abroad is a financial nightmare for Nigerians", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    problems = [
        ("X", "Card Declined Abroad", "Nigerian bank cards are frequently blocked or declined in foreign countries, leaving travelers stranded."),
        ("$", "Hidden Exchange Fees", "Banks charge up to 10% in hidden fees for international transactions, draining money silently."),
        ("!", "Multiple Apps, Zero Unity", "Users juggle 3-5 different apps for payments, conversions, and transfers with no unified experience."),
    ]
    cy = H - 68 * mm
    for icon, title, desc in problems:
        draw_card(c, 15 * mm, cy - 28, W - 30 * mm, 34, LIGHTBLUE)
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(22 * mm, cy - 8, icon)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(35 * mm, cy - 6, title)
        wrap_text(c, desc, 35 * mm, cy - 18, W - 55 * mm, size=9, color=GREY)
        cy -= 42
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(W / 2, 28 * mm, "50 million Nigerians in the diaspora face this every day.")
    c.showPage()

    # SLIDE 3: THE SOLUTION
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 3)
    heading(c, "The Solution", 15 * mm, H - 35 * mm, 26)
    subheading(c, "One app. Every currency. Any bank. Anywhere.", 15 * mm, H - 46 * mm, 11, GREEN)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm, GREEN)
    features = [
        ("1", "Real-Time Currency Conversion", "Auto-detects your location and instantly converts your balance to the local currency at live forex rates."),
        ("2", "Direct Bank Transfers Globally", "Send money directly to any bank account worldwide — JP Morgan, Barclays, Access Bank, anyone."),
        ("3", "Virtual Cards in Every Currency", "Create virtual cards in NGN, USD, GBP, CAD, EUR and pay online or in stores anywhere on earth."),
        ("4", "Location-Aware Intelligence", "The moment you land in a new country, Trvrse switches your currency automatically. No manual steps."),
    ]
    cy = H - 65 * mm
    for icon, title, desc in features:
        draw_card(c, 15 * mm, cy - 26, W - 30 * mm, 32, LIGHTBLUE)
        c.setFillColor(GREEN)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(22 * mm, cy - 7, icon)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(34 * mm, cy - 5, title)
        wrap_text(c, desc, 34 * mm, cy - 17, W - 52 * mm, size=9, color=GREY)
        cy -= 38
    c.showPage()

    # SLIDE 4: MARKET OPPORTUNITY
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 4)
    heading(c, "Market Opportunity", 15 * mm, H - 35 * mm, 26)
    subheading(c, "A massive, underserved, and rapidly growing market", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    cw = (W - 38 * mm) / 3
    cx = 15 * mm
    metric_card(c, cx, H - 120 * mm, cw, 55, "$190B", "Global Remittance Market")
    metric_card(c, cx + cw + 4 * mm, H - 120 * mm, cw, 55, "50M+", "Nigerian Diaspora Worldwide", GREEN)
    metric_card(c, cx + 2 * (cw + 4 * mm), H - 120 * mm, cw, 55, "15%", "Annual Growth Rate Africa", GOLD)
    subheading(c, "Key Insights", 15 * mm, H - 138 * mm, 11, WHITE)
    insights = [
        "• Nigeria is the largest remittance recipient in Africa — $20B+ annually",
        "• Only 5% of cross-border payments in Africa are fully digital",
        "• Travel payments for Nigerian diaspora exceed $8B annually",
        "• No single app currently offers location-aware auto-currency switching for Africans",
    ]
    cy = H - 152 * mm
    for ins in insights:
        body(c, ins, 18 * mm, cy, 10, GREY)
        cy -= 14
    draw_card(c, 15 * mm, 22 * mm, W - 30 * mm, 22, BLUE)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(W / 2, 30 * mm, "Trvrse is targeting the $8B travel payment corridor first — Nigeria to UK, US, and Canada.")
    c.showPage()

    # SLIDE 5: PRODUCT
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 5)
    heading(c, "How It Works", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Three steps. Sixty seconds. Zero friction.", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    steps = [
        ("01", "Fund Your Wallet", "Connect your Nigerian bank account (Access, GTB, Zenith) and top up your Trvrse wallet in naira instantly."),
        ("02", "Land. App Detects. Auto-Converts.", "Touch down in Canada. Trvrse detects your location and prompts you to convert your balance to CAD at live rates. One tap."),
        ("03", "Pay Anyone, Anywhere.", "Send directly to any bank account globally or pay with your Trvrse virtual card in local currency. Done."),
    ]
    cy = H - 68 * mm
    for num, title, desc in steps:
        c.setFillColor(colors.HexColor("#1A2F4A"))
        c.setFont("Helvetica-Bold", 32)
        c.drawString(15 * mm, cy - 18, num)
        draw_card(c, 35 * mm, cy - 28, W - 52 * mm, 36, LIGHTBLUE)
        c.setFillColor(GREEN)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(42 * mm, cy - 8, title)
        wrap_text(c, desc, 42 * mm, cy - 20, W - 62 * mm, size=9, color=GREY)
        if cy > H - 140 * mm:
            c.setFillColor(BLUE)
            c.rect(26 * mm, cy - 28, 2, 36, fill=1, stroke=0)
        cy -= 48
    c.showPage()

    # SLIDE 6: BUSINESS MODEL
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 6)
    heading(c, "Business Model", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Simple, scalable, transaction-based revenue", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    streams = [
        ("FX", "Currency Conversion Fee", "0.5% per conversion", "Primary revenue stream. User converts NGN to USD, Trvrse takes 0.5% of transaction value."),
        ("TX", "Transfer Fee", "Flat / 0.5% intl", "Every direct bank transfer generates flat or percentage-based fee depending on corridor."),
        ("VC", "Virtual Card Interchange", "0.3% per transaction", "Every card payment generates interchange revenue shared between Trvrse and card network."),
        ("PR", "Premium Tier Subscription", "NGN 2,500 / month", "Power users pay monthly for higher limits, lower fees, priority support, and multi-currency cards."),
    ]
    cy = H - 65 * mm
    for icon, title, rate, desc in streams:
        draw_card(c, 15 * mm, cy - 28, W - 30 * mm, 34, LIGHTBLUE)
        c.setFillColor(BLUE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(21 * mm, cy - 8, icon)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(33 * mm, cy - 6, title)
        draw_tag(c, rate, W - 70 * mm, cy - 12, GREEN, NAVY)
        wrap_text(c, desc, 33 * mm, cy - 19, W - 55 * mm, size=9, color=GREY)
        cy -= 40
    draw_card(c, 15 * mm, 18 * mm, W - 30 * mm, 24, BLUE)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(W / 2, 27 * mm, "At 5M transactions/year at avg $20 = $50M volume -> $250,000 annual revenue at 0.5%")
    c.showPage()

    # SLIDE 7: TRACTION & ROADMAP
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 7)
    heading(c, "Traction & Roadmap", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Where we are and where we're going", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    subheading(c, "Current Status", 15 * mm, H - 60 * mm, 10, GREEN)
    milestones = [
        ("Y", "Company registered — Nexxogen Limited (CAC)"),
        ("Y", "Legal opinion secured for CBN licensing pathway"),
        ("Y", "PSSP + Super Agent + Bank Partnership model confirmed"),
        ("Y", "UI/UX prototype complete — 26 screens designed"),
        ("Y", "Access Bank partnership discussions initiated"),
        ("~", "MVP development in progress — React Native + Node.js"),
    ]
    cy = H - 72 * mm
    for icon, text in milestones:
        c.setFillColor(GREEN if icon == "Y" else BLUE)
        c.setFont("Helvetica", 10)
        c.drawString(18 * mm, cy, icon)
        c.setFillColor(WHITE if icon == "Y" else GREY)
        c.drawString(30 * mm, cy, text)
        cy -= 13
    subheading(c, "Roadmap", 15 * mm, cy - 8, 10, BLUE)
    cy -= 20
    roadmap = [
        ("Q3 2025", "MVP Launch + Beta Users", BLUE),
        ("Q4 2025", "CBN PSSP License Application Submitted", GREEN),
        ("Q1 2026", "Access Bank Partnership Live", GOLD),
        ("Q2 2026", "Nigeria-UK-US Corridor Launch", GREEN),
        ("Q3 2026", "Series A + Global Expansion", BLUE),
    ]
    for quarter, milestone, color in roadmap:
        draw_card(c, 15 * mm, cy - 12, W - 30 * mm, 16, LIGHTBLUE)
        draw_tag(c, quarter, 18 * mm, cy - 9, color, WHITE if color != GOLD else NAVY)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 9)
        c.drawString(55 * mm, cy - 5, milestone)
        cy -= 20
    c.showPage()

    # SLIDE 8: COMPETITIVE LANDSCAPE
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 8)
    heading(c, "Why Trvrse Wins", 15 * mm, H - 35 * mm, 26)
    subheading(c, "No existing solution combines all of these for African users", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    cols = ["Feature", "Wise", "Revolut", "Chipper", "Trvrse"]
    col_w = (W - 30 * mm) / len(cols)
    rows = [
        ["Auto Location Detection", "No", "No", "No", "Yes"],
        ["Direct Bank Transfers", "Yes", "No", "Yes", "Yes"],
        ["Virtual Cards Multi-Currency", "No", "Yes", "No", "Yes"],
        ["Nigeria-Focused UX", "No", "No", "Yes", "Yes"],
        ["Real-Time Forex Conversion", "Yes", "Yes", "No", "Yes"],
        ["Wallet + Bank + Card Unified", "No", "No", "No", "Yes"],
    ]
    cy = H - 62 * mm
    draw_card(c, 15 * mm, cy - 12, W - 30 * mm, 16, BLUE)
    for i, col in enumerate(cols):
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9)
        cx2 = 15 * mm + i * col_w + col_w / 2
        tw = c.stringWidth(col, "Helvetica-Bold", 9)
        c.drawString(cx2 - tw / 2, cy - 5, col)
    cy -= 14
    for row in rows:
        draw_card(c, 15 * mm, cy - 12, W - 30 * mm, 14, LIGHTBLUE)
        for i, cell in enumerate(row):
            cx2 = 15 * mm + i * col_w + col_w / 2
            if cell == "Yes":
                color = GREEN
            elif cell == "No":
                color = RED
            else:
                color = WHITE
            c.setFillColor(color)
            c.setFont("Helvetica-Bold" if i == len(row) - 1 else "Helvetica", 9)
            tw = c.stringWidth(cell, "Helvetica", 9)
            c.drawString(cx2 - tw / 2, cy - 5, cell)
        cy -= 16
    draw_card(c, 15 * mm, 20 * mm, W - 30 * mm, 22, BLUE)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(W / 2, 28 * mm, "Trvrse is the only app built specifically for Nigerians traveling and living abroad.")
    c.showPage()

    # SLIDE 9: GO-TO-MARKET
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 9)
    heading(c, "Go-To-Market", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Start focused. Scale fast. Dominate the corridor.", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    phases = [
        ("Phase 1", "Nigeria-UK-US Corridor", "Q3-Q4 2025", "Launch beta with 1,000 invite-only users. Nigerian professionals and students traveling to UK and US. Partner with Access Bank. Validate the model."),
        ("Phase 2", "Nigeria + Africa Expansion", "Q1-Q2 2026", "Add Kenya, Ghana, South Africa corridors. Launch virtual cards. Apply for CBN PSSP license. Target 50,000 active users."),
        ("Phase 3", "Global Scale", "Q3 2026+", "Expand to EU, India, Canada corridors. Launch premium tier. Series A fundraise. Target 500,000 active users across 20 countries."),
    ]
    cy = H - 68 * mm
    for phase, title, timeline, desc in phases:
        draw_card(c, 15 * mm, cy - 42, W - 30 * mm, 48, LIGHTBLUE)
        draw_tag(c, phase, 20 * mm, cy - 10, BLUE, WHITE)
        draw_tag(c, timeline, W - 65 * mm, cy - 10, GREEN, NAVY)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(20 * mm, cy - 22, title)
        wrap_text(c, desc, 20 * mm, cy - 34, W - 42 * mm, size=9, color=GREY)
        cy -= 58
    c.showPage()

    # SLIDE 10: TEAM
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 10)
    heading(c, "The Team", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Builders, operators, and domain experts", 15 * mm, H - 46 * mm, 11)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm)
    tw2 = (W - 38 * mm) / 2
    team = [
        ("Arthur", "Co-Founder & CTO", "Full-stack engineer with React Native, Node.js, Python expertise. Previously contracted at Andela. Senior Backend Developer at Sujimoto. Vibe coder and builder."),
        ("Mary (Legal)", "Co-Founder & CLO", "Fintech lawyer specializing in CBN compliance, licensing, and regulatory affairs. Leads all legal and licensing strategy for Nexxogen."),
    ]
    cy = H - 70 * mm
    for i, (name, role, bio) in enumerate(team):
        x2 = 15 * mm + i * (tw2 + 8 * mm)
        draw_card(c, x2, cy - 90, tw2, 96, LIGHTBLUE)
        c.setFillColor(BLUE)
        c.circle(x2 + tw2 / 2, cy - 20, 18, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 16)
        initials = "".join([w[0] for w in name.split()[:2]])
        iw = c.stringWidth(initials, "Helvetica-Bold", 16)
        c.drawString(x2 + tw2 / 2 - iw / 2, cy - 25, initials)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        nw = c.stringWidth(name, "Helvetica-Bold", 11)
        c.drawString(x2 + tw2 / 2 - nw / 2, cy - 48, name)
        c.setFillColor(GREEN)
        c.setFont("Helvetica", 9)
        rw = c.stringWidth(role, "Helvetica", 9)
        c.drawString(x2 + tw2 / 2 - rw / 2, cy - 60, role)
        wrap_text(c, bio, x2 + 8, cy - 75, tw2 - 16, size=8, color=GREY, line_height=11)
    subheading(c, "Advisors & Partners", 15 * mm, cy - 110, 10, WHITE)
    advisors = [
        "Access Bank — Banking Partner",
        "Oluwatodimu Ige & Associates — Legal Counsel",
        "Wise API — Forex & Settlement Rails",
        "Andela Network — Tech Talent & Connections",
    ]
    ay = cy - 122
    for a in advisors:
        draw_tag(c, a, 15 * mm, ay, LIGHTBLUE, GREY)
        ay -= 18
    c.showPage()

    # SLIDE 11: THE ASK
    draw_bg(c)
    draw_accent_line(c)
    draw_logo_text(c)
    draw_slide_number(c, 11)
    heading(c, "The Ask", 15 * mm, H - 35 * mm, 26)
    subheading(c, "Seed Round — $500,000 USD", 15 * mm, H - 46 * mm, 13, GREEN)
    draw_divider(c, 15 * mm, H - 50 * mm, 80 * mm, GREEN)
    draw_card(c, 15 * mm, H - 100 * mm, W - 30 * mm, 40, LIGHTBLUE)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(22 * mm, H - 68 * mm, "We are raising $500,000 USD (approx. NGN 750M) in our seed round.")
    wrap_text(
        c,
        "Funds will be deployed to obtain CBN PSSP license, build production infrastructure, acquire first 10,000 users, and establish Access Bank partnership.",
        22 * mm,
        H - 82 * mm,
        W - 46 * mm,
        size=9,
        color=GREY,
    )
    use_of_funds = [
        ("CBN PSSP License Capital & Legal Fees", "40%", BLUE),
        ("Product Development & Infrastructure", "25%", GREEN),
        ("User Acquisition & Marketing", "20%", GOLD),
        ("Operations & Team Expansion", "10%", GREY),
        ("Reserve & Contingency", "5%", colors.HexColor("#4A5568")),
    ]
    subheading(c, "Use of Funds", 15 * mm, H - 112 * mm, 10, WHITE)
    cy = H - 124 * mm
    for item, pct, color in use_of_funds:
        draw_card(c, 15 * mm, cy - 12, W - 30 * mm, 14, LIGHTBLUE)
        c.setFillColor(color)
        c.rect(15 * mm, cy - 12, 4, 14, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 9)
        c.drawString(24 * mm, cy - 4, item)
        c.setFillColor(color)
        c.setFont("Helvetica-Bold", 10)
        c.drawRightString(W - 20 * mm, cy - 4, pct)
        cy -= 17
    draw_card(c, 15 * mm, 18 * mm, W - 30 * mm, 30, BLUE)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(W / 2, 34 * mm, "Target: 10,000 users in Year 1 -> $500K ARR by Year 2")
    c.setFont("Helvetica", 9)
    c.setFillColor(colors.HexColor("#D0E8FF"))
    c.drawCentredString(W / 2, 24 * mm, "Equity offered: 15-20% | Valuation: $2.5M pre-money")
    c.showPage()

    # SLIDE 12: CLOSING
    draw_bg(c)
    draw_accent_line(c, H - 3 * mm)
    c.setFillColor(BLUE)
    c.roundRect(W / 2 - 28, H / 2 + 40, 56, 56, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 36)
    c.drawCentredString(W / 2, H / 2 + 56, "T")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 32)
    c.drawCentredString(W / 2, H / 2 + 16, "Let's Build the Future")
    c.setFillColor(BLUE)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(W / 2, H / 2 + 0, "of Cross-Border Payments Together.")
    draw_divider(c, W / 2 - 50, H / 2 - 12, 100)
    contact = [
        ("Email", "invest@nexxogen.com"),
        ("Website", "www.trvrse.app"),
        ("Company", "Nexxogen Limited — Lagos, Nigeria"),
    ]
    cy = H / 2 - 28
    for label, val in contact:
        c.setFillColor(GREY)
        c.setFont("Helvetica", 9)
        c.drawCentredString(W / 2, cy, label + ": " + val)
        cy -= 14
    draw_tag(c, "CONFIDENTIAL — FOR INVESTOR USE ONLY", W / 2 - 70, 18 * mm, RED, WHITE)
    draw_slide_number(c, 12)
    c.showPage()

    c.save()
    print(f"Generated: {OUTPUT}")


if __name__ == "__main__":
    main()
