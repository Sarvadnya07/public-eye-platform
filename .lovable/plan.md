

# PublicEye — Civic Grievance & Trust Platform

## Overview
A premium civic complaint platform with two views: **Citizen View** (file & track complaints) and **Admin Authority View** (manage & resolve issues). Fully functional with local state and 15+ mock complaints.

---

## Design System
- **Colors**: Deep Navy (`#0f172a`) primary, Slate Gray secondary text, semantic status colors (red/amber/emerald)
- **Font**: Inter with tight letter-spacing on headings
- **Theme**: Glassmorphic top navbar with Citizen/Admin view toggle
- **Animations**: Framer Motion for page transitions, staggered reveals, and micro-interactions
- **Components**: Heavy use of shadcn/ui (Cards, Dialogs, Tables, Badges, Sheets, Skeleton loaders, Sonner toasts)

---

## Pages & Features

### 1. Landing Page
- Hero with headline "Empowering Citizens. Ensuring Transparency." and a large floating "Track Complaint" search bar
- Three animated value-prop cards (AI Routing, Blockchain Verified, Anonymous)
- Live transparency ticker with mock stats (complaints resolved, avg resolution time, latest hash)
- CTA buttons to file a complaint or enter admin view

### 2. Citizen Complaint Wizard (4 Steps)
- **Step 1 — Details**: Title + description with character counter
- **Step 2 — Smart Category**: Category dropdown + "AI Auto-Categorize" button that triggers skeleton loading, auto-selects category, shows "AI Confidence: 94%" badge
- **Step 3 — Evidence & Location**: Drag-and-drop file upload with progress bar/thumbnail + mock map pin placeholder
- **Step 4 — Privacy**: Whistleblower Mode toggle that shifts UI darker with lock icon and ZK-proof tooltip
- **Success Screen**: Animated checkmark, tracking ID (PE-2026-X89), blockchain hash with copy button

### 3. Citizen Tracking View
- Vertical animated timeline: Submitted → AI Routed → In Progress → Resolved
- Each stage shows timestamp, department, status icon
- Expandable "Audit Log" accordion showing simulated ledger history entries

### 4. Admin Dashboard
- **Layout**: Collapsible sidebar (Dashboard, Issues, Analytics, Settings) + header with avatar, notification bell (pulsing badge)
- **KPI Cards**: Open Issues, SLA Breaches, Resolved Today, AI Accuracy — with animated count-ups and mini sparkline charts
- **Data Table**: 15+ mock complaints with ID, Title, Category (icon), Date, Status (colored badge), Ledger Status. Features: search, category filter, sortable columns, select-all checkbox
- **Issue Detail Sheet**: Slides in on row click. Shows full details, image thumbnails, mock map. "Update Status" dropdown + Save button triggers Sonner toast and updates local state
- **Analytics Page**: Mock charts (complaints by category, resolution trends, SLA performance) using Recharts

### 5. Mobile Responsiveness
- Landing page stacks vertically with large tap targets
- Wizard becomes full-screen with sticky bottom "Next" button
- Admin sidebar collapses to hamburger menu
- Data table scrolls horizontally with sticky ID column

### 6. Mock Data & Simulated Backend
- 15+ realistic complaints with varied categories, statuses, dates, AI scores, blockchain hashes
- Simulated latency (500ms–1.5s) on filtering, AI categorization, and form submissions
- All state managed in React — fully interactive and demonstrable

