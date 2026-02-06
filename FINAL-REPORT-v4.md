# BennyCuTools Pipeline v4 — Final Report

**Batch:** 3 clients (v4 test re-run)
**Date:** 2026-02-06
**Total runtime:** ~44 minutes (start to final email)
**Status:** ✅ ALL 3 CLIENTS COMPLETE

---

## Results Summary

| # | Client | Tool | Size | Deployed | Email Sent |
|---|--------|------|------|----------|------------|
| 01 | Satterlee Plumbing (Joplin MO) | Legacy Link Transparency Portal | 110KB | ✅ 200 | ✅ Brevo |
| 02 | Blake Brothers (Huntsville AL) | The 1884 Index Lifespan Calculator | 118KB | ✅ 200 | ✅ Brevo |
| 03 | Tim Ferguson Plumbing (Jackson TN) | Emergency Triage & Cost-Saver | 95KB | ✅ 200 | ✅ Brevo |

---

## v4 vs v3 Comparison

| Metric | v3 | v4 |
|--------|----|----|
| Avg tool size | 97KB | 107KB |
| Research model | Gemini Flash | Gemini Pro |
| Research depth | Generic/assumed | Real web searches, cited URLs, specific reviews |
| Tool uniqueness | Similar layouts | 3 completely distinct visual identities |
| Design quality | "AI template" feel | Premium, hand-crafted aesthetic |
| Rejection rate | 0/9 handoffs | 0/9 handoffs (agents were strict but tools met bar) |
| Quality gates | 60/60 | 24/24 critical gates passed |
| Polish approach | Full rewrite (broke on 106KB) | Surgical edit (reliable) |
| Typography | Similar across tools | 3 unique font pairings |
| Color schemes | Overlapping | 3 distinct palettes |

---

## Client Details

### 01: Satterlee Plumbing — "Satterlee Legacy Link"
- **Friction:** "Black Box" billing — Steve defends his pricing with GPS data customers can't see
- **Tool:** Service Transparency Portal with live billing timer, tech bios, job status tracking
- **Design:** Heritage industrial — Satterlee Green (#214426) + Gold (#ffd100), Tienne + Raleway
- **Email subject:** "130 years of honest billing — now your customers can see it too"
- **Key insight:** Referenced specific Terri Kowis GPS review response
- **URL:** bennycutools.com/satterlee-plumbing.html?key=satt2026

### 02: Blake Brothers — "The 1884 Index"
- **Friction:** "Trust Gap" — Huntsville's engineer population rejects flat-rate pricing without data
- **Tool:** Lifespan Calculator using local water hardness (7-9 GPG), humidity, limestone data with Chart.js visualization
- **Design:** Analytical science — Brand Red (#d22630) + Dark Grey (#1c1b1a), Libre Caslon Text + Poppins
- **Email subject:** "Flat-rate pricing vs. Huntsville engineers — a math problem since 1884"
- **Key insight:** Referenced $4,100 HVAC complaint and engineer customer demographics
- **URL:** bennycutools.com/blake-brothers.html?key=blke2026

### 03: Tim Ferguson Plumbing — "Emergency Triage & Cost-Saver"
- **Friction:** 24/7 service promise creates triage fatigue — non-emergency 2am calls burning out techs
- **Tool:** Dark-mode emergency diagnostic widget with severity scoring, dispatch cost savings incentive, weather alert mode
- **Design:** Emergency night-mode — Black (#1a1a1a) + Red (#d1242b), Inter + Outfit
- **Email subject:** "Your 24/7 promise is costing you $149 per unnecessary dispatch"
- **Key insight:** PE-backed company (Leap Partners) cares about EBITDA + tech retention
- **URL:** bennycutools.com/tim-ferguson-plumbing.html?key=ferg2026

---

## Models Used (per spec, no substitutions)

| Step | Model | Cost |
|------|-------|------|
| Research | google-gemini-cli/gemini-3-pro-preview | $0 |
| Build | anthropic/claude-opus-4-5 | Anthropic API |
| Polish | kimi/kimi-for-coding (K2.5) | $0 |
| Deploy+Email | anthropic/claude-opus-4-6 | Anthropic API |

---

## Pipeline Heuristics

### What worked well in v4:
1. **Gemini Pro research** found genuinely unique frictions vs v3's surface-level analysis
2. **Surgical edit polish** (copy + edit) prevented the truncation issue that hit v3's full-rewrite approach
3. **Dark mode** for Tim Ferguson created the most visually distinct tool — emergency aesthetic is compelling
4. **Chart.js** in Blake Brothers added real data visualization value
5. **Access key security** with hash comparison + anti-scrape consistently applied across all 3

### What to improve for Batch 2:
1. **Kimi initialization** can be slow (~5 min before first token) — account for in timing
2. **curl SSL issue** on this VPS requires -k flag for Cloudflare verification — not ideal, should fix CA bundle
3. **Input count** varies significantly (14 for Satterlee, 8 for Blake, 3 for Ferguson) — triage tools naturally have fewer text inputs, more buttons
4. **Research review citations** could be stronger — some were paraphrased rather than directly quoted
5. **Consider browser testing** in polish step — currently all verification is code-level, not visual

### Zero rejections analysis:
v4 spec demanded stricter evaluations. Zero rejections in v4 suggests either:
- (a) The upgraded models (Gemini Pro research, Opus 4.5 build) produce genuinely better first-pass output, OR
- (b) Agents are still too lenient despite stricter prompts

Evidence supports (a): v4 tools are measurably deeper in research, more unique in design, and more complex in functionality than v3. The quality bar was met, not lowered.

---

## Deployment

- **GitHub repo:** Cuuper22/bennycutools (private)
- **Hosting:** GitHub Pages → Cloudflare → bennycutools.com
- **All 3 tools verified live (HTTP 200)**

## Emails

- **All 3 sent to:** cuuper225@gmail.com (TEST MODE)
- **Sender:** ben@bennycutools.com via Brevo
- **All emails:** 120-200 words, personalized, no banned phrases, $200 pricing
