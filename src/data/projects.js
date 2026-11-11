export const projectCategories = [
  "All",
  "Mobile Apps",
  "SaaS",
  "Full Stack",
  "Firebase",
  "Supabase",
  "Fintech",
  "Admin",
  "UI",
];

// Thumbnail sections for the MediQ case study.
const MEDIQ_WEB = "Clinic web app · desktop";
const MEDIQ_PATIENT = "Patient pages · phone browser, no install";
const MEDIQ_APP = "Android app · doctors, owners, reception";

const projectRecords = [
  {
    id: "foodapp",
    featured: false,
    order: 3,
    title: "FoodApp - Food Ordering & Delivery App",
    status: "In Progress",
    categoryLabel: "Full Stack Mobile App",
    description:
      "A React Native food ordering and delivery app where customers browse restaurants, manage cart and checkout flows, and admins manage restaurants, menu items, and users from the same mobile product.",
    // Card cover: marketing banner built from the app's own screens.
    image: "/images/projects/foodapp/cover.jpg",
    screenshots: [
      "/images/projects/foodapp/01-home.png",
      "/images/projects/foodapp/03-restaurant-detail.png",
      "/images/projects/foodapp/05-cart.png",
      "/images/projects/foodapp/02-search.png",
      "/images/projects/foodapp/04-menu.png",
      "/images/projects/foodapp/06-login.png",
      "/images/projects/foodapp/07-register.png",
      "/images/projects/foodapp/08-admin-add-resturant.png",
      "/images/projects/foodapp/09-admin-edit-item.png",
      "/images/projects/foodapp/00-current.png",
    ],
    screenLabels: [
      "Home",
      "Search",
      "Restaurant detail",
      "Menu",
      "Cart",
      "Login",
      "Register",
      "Admin add restaurant",
      "Admin edit item",
      "Current preview",
    ],
    categories: ["All", "Mobile Apps", "Full Stack", "Firebase", "Admin", "UI"],
    stack: [
      "React Native CLI",
      "React 19",
      "React Navigation",
      "Firebase Messaging",
      "SQLite",
      "AsyncStorage",
      "Context API",
      "Image Picker",
    ],
    features: [
      "Email/password login, register, onboarding, home discovery, search, restaurant detail, menu, cart, checkout, order tracking, and profile flows",
      "Restaurant browsing with categories, filters, ratings, offers, favorites, recent searches, and responsive menu previews",
      "Admin dashboard screens for adding, editing, and deleting restaurants, menu items, and users",
      "SQLite local database with users, restaurants, menu_items, cart, and admin_users tables",
      "Firebase Messaging setup for notification permissions, FCM token handling, and foreground/background notification support",
      "Reusable UI components, centralized design tokens, image registry, skeleton states, empty states, and theme/data helpers",
    ],
    stats: [
      { label: "Screens", value: 17, suffix: "" },
      { label: "Flows", value: 8, suffix: "" },
      { label: "Data Models", value: 5, suffix: "" },
    ],
    problem:
      "Food ordering needs a simple mobile path from restaurant discovery to cart and checkout, while admins need practical tools to keep restaurant, menu, and user data updated.",
    architecture:
      "The React Native app uses Stack and Bottom Tab navigation, Context API for auth state, a ThemeProvider for visual state, SQLite for local users, restaurants, menu_items, cart, and admin_users data, AsyncStorage for recent searches, and Firebase Messaging for notification setup.",
    challenges: [
      "Keeping customer and admin navigation understandable in one app",
      "Synchronizing cart quantities, promo-code state, checkout routing, and local SQLite CRUD",
      "Maintaining responsive card widths, search persistence, and clean hierarchy across many screens",
    ],
    optimizations: [
      "Reusable UI components and centralized design system for consistent screens",
      "SQLite caching and AsyncStorage recent searches for faster local behavior",
      "Memoized filtered lists, skeleton states, empty states, and compact mobile-first layouts",
    ],
    responsiveness:
      "Built for Android and iOS with useWindowDimensions based card sizing, compact cart layouts, bottom tab navigation, and mobile-first spacing.",
    gitUrl: "https://github.com/Awais-Chandio/FoodApp",
    liveUrl: "",
    accent: "from-orange-400 via-rose-400 to-amber-300",
  },
  {
    id: "safco-e-credit",
    featured: true,
    order: 1,
    title: "SAFCO E-Credit App / Safco eCredit",
    status: "Live",
    categoryLabel: "Fintech Microfinance App",
    description:
      "A live React Native customer self-service app for SAFCO/SSF customers to securely view loan information, apply for new loans, track repayments, submit complaints, and manage profile details.",
    // Card cover: marketing banner built from the app's own screens.
    image: "/images/projects/safco/cover.jpg",
    screenshots: [
      "/images/projects/safco/02-dashboard.jpeg",
      "/images/projects/safco/03-personal-details.jpeg",
      "/images/projects/safco/04-work-loan-details.jpeg",
      "/images/projects/safco/05-payment-methods.jpeg",
      "/images/projects/safco/06-profile.jpeg",
      "/images/projects/safco/07-dashboard-photo.jpeg",
      "/images/projects/safco/08-login.jpeg",
    ],
    screenLabels: [
      "Dashboard",
      "Personal details",
      "Work and loan details",
      "Payment methods",
      "Profile",
      "Dashboard photo",
      "Login",
    ],
    categories: ["All", "Mobile Apps", "Full Stack", "Fintech", "Admin", "UI"],
    stack: [
      "React Native 0.85",
      "React 19",
      "Redux",
      "React Navigation",
      "Axios APIs",
      "AsyncStorage",
      "WebView",
      "PDF Viewer",
      "Geolocation",
    ],
    features: [
      "Secure login, signup, OTP verification, reset password, terms acceptance, and persisted session preferences",
      "Dashboard with active loan status, total loan amount, loan history, remaining loan list, and repayment schedule tracking",
      "New loan application with CNIC, location, occupation, station, purpose, province, district, taluka, and validation logic",
      "Dynamic payment gateway list with JazzCash, EasyPaisa, HBL Connect, and PayPro screens plus WebView payment redirects",
      "Profile update, profile picture upload, complaint add/view flow, feedback, multilingual terms screens, language switching, and light/dark theme",
      "30 exported service methods backed by SAFCO APIs for user, profile, loan, installment, payment gateway, complaint, feedback, language, and theme models",
      "Published live on Google Play as Safco eCredit with 5,000+ downloads",
    ],
    stats: [
      { label: "Screens", value: 28, suffix: "" },
      { label: "Flows", value: 12, suffix: "" },
      { label: "APIs", value: 30, suffix: "" },
    ],
    problem:
      "Existing SAFCO/SSF customers needed mobile access to loan information, repayment schedules, profile services, complaints, and new loan applications without visiting a branch for every basic request.",
    architecture:
      "The root stack handles splash, auth, and terms screens, a Drawer wraps the authenticated app, and the main stack contains dashboard, loan, repayment, profile, complaint, payment, and settings screens. Redux manages user, theme, language, and loan-form labels, AsyncStorage persists session preferences, Axios sends multipart FormData requests to SAFCO APIs, and WebView supports payment redirect flows.",
    challenges: [
      "Handling multilingual UI, PDF terms, CNIC formatting, and microfinance loan-form validation",
      "Building dynamic province, district, and taluka filtering with live backend data",
      "Keeping payment gateways, geolocation, device IDs, push token handling, and Android/iOS layouts consistent",
    ],
    optimizations: [
      "Reusable form controls, headers, loaders, and structured navigation patterns",
      "Memoized new-loan fields plus persisted language and theme state",
      "Centralized service layer, dynamic gateway loading, and clear mobile-first loan and repayment flows",
    ],
    responsiveness:
      "Built for Android and iOS with device dimensions, safe-area handling, keyboard-aware forms, and platform-specific control heights. Android package is com.vergesystems.safco_e_banking, version 1.16.",
    gitUrl: "https://github.com/vergesystems/SSF_MIS_Mobile_ECredit.git",
    liveUrl: "https://play.google.com/store/apps/details?id=com.vergesystems.safco_e_banking",
    accent: "from-emerald-300 via-cyan-300 to-indigo-400",
  },
  {
    id: "mediq",
    featured: false,
    order: 2,
    title: "MediQ - Multi-Clinic SaaS for Appointments & Live Queues",
    status: "Coming Soon",
    categoryLabel: "Full Stack SaaS (Web + Mobile)",
    description:
      "Clinic queues without the crowded waiting room. Patients scan a QR code at the door, get a token on their phone and walk in when it's their turn, while reception, doctors, the waiting-room TV and the clinic owner all see the same live queue.",
    // Card cover: the marketing banner (public/demos/mediq/og-image.png)
    // extended to the card's 16:10 shape.
    image: "/images/projects/mediq/cover.jpg",
    // Objects rather than plain paths (both work): `device` picks the browser
    // or phone frame, `tall` pages scroll inside the frame instead of shrinking
    // to fit, and `group` sections the thumbnails (kept contiguous, since the
    // arrows step through the array in order).
    screenshots: [
      { src: "/images/projects/mediq/web-10-reception-now-serving.jpg", group: MEDIQ_WEB, device: "desktop", label: "Reception desk: live queue per doctor" },
      { src: "/images/projects/mediq/web-08-reception-new-walk-in.jpg", group: MEDIQ_WEB, device: "desktop", label: "Walk-in token with fee" },
      { src: "/images/projects/mediq/web-16-reception-verify-payment.jpg", group: MEDIQ_WEB, device: "desktop", label: "Verify an online payment" },
      { src: "/images/projects/mediq/web-25-reception-urdu.jpg", group: MEDIQ_WEB, device: "desktop", label: "Same desk in Urdu (right to left)" },
      { src: "/images/projects/mediq/web-23-records.jpg", group: MEDIQ_WEB, device: "desktop", tall: true, label: "Records and cash closing" },
      { src: "/images/projects/mediq/web-24-plans.jpg", group: MEDIQ_WEB, device: "desktop", label: "Plans per clinic" },
      { src: "/images/projects/mediq/web-12-patient-join-english.jpg", group: MEDIQ_PATIENT, device: "phone", label: "Scan the QR, get a token" },
      { src: "/images/projects/mediq/web-13-patient-pay-fee.jpg", group: MEDIQ_PATIENT, device: "phone", label: "Pay the fee" },
      { src: "/images/projects/mediq/web-17-patient-in-line.jpg", group: MEDIQ_PATIENT, device: "phone", tall: true, label: "Live place in line" },
      { src: "/images/projects/mediq/web-20-patient-almost-turn.jpg", group: MEDIQ_PATIENT, device: "phone", label: "You're next" },
      { src: "/images/projects/mediq/web-21-patient-your-turn.jpg", group: MEDIQ_PATIENT, device: "phone", label: "It's your turn" },
      { src: "/images/projects/mediq/app-12-doctor-dashboard.jpg", group: MEDIQ_APP, device: "phone", label: "Doctor: dashboard" },
      { src: "/images/projects/mediq/app-14-doctor-now-serving.jpg", group: MEDIQ_APP, device: "phone", label: "Doctor: now serving" },
      { src: "/images/projects/mediq/app-15-doctor-prescription.jpg", group: MEDIQ_APP, device: "phone", label: "Doctor: notes and prescription" },
      { src: "/images/projects/mediq/app-16-doctor-schedule.jpg", group: MEDIQ_APP, device: "phone", label: "Doctor: schedule" },
      { src: "/images/projects/mediq/app-05-owner-today.jpg", group: MEDIQ_APP, device: "phone", label: "Owner: today's numbers" },
      { src: "/images/projects/mediq/app-07-reception-now-serving.jpg", group: MEDIQ_APP, device: "phone", label: "Reception: desk on a phone" },
    ],
    categories: ["All", "Mobile Apps", "SaaS", "Full Stack", "Supabase", "Admin", "UI"],
    stack: [
      "React Native 0.84",
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Postgres RLS",
      "Supabase Realtime",
      "Edge Functions",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS 4",
      "Firebase Messaging",
      "Playwright",
    ],
    features: [
      "Self-serve clinic onboarding: owner account, clinic details, doctors with rooms and fees, receptionist email invite, and a printable bilingual QR poster",
      "Patients scan the QR to get a token in the browser with no app install, in Urdu by default with English one tap away",
      "Fee before joining the line: cash at the counter or online via Easypaisa, bank or Raast with a transaction ID that reception verifies in one click",
      "Live patient token page showing people ahead, estimated wait, now serving, and \"you're next\" / \"it's your turn\" alerts",
      "Reception desk with one queue per doctor, walk-in tokens with fee and payment method, call next, skip, no-show, break and running-late controls, plus N / W keyboard shortcuts",
      "Waiting-room TV display with now serving and next up for every doctor, a chime, and no patient names on screen",
      "Android app for doctors (dashboard, queue, now serving, diagnosis and prescription, schedule and time off) and for owners and reception (today's numbers, desk on a phone)",
      "Records with every visit and payment by day, week or month, per-receptionist cash closing, CSV export, and trial and monthly plans per clinic",
      "1,600+ automated tests: 962 pgTAP database tests, 641 Jest tests and 57 Playwright E2E tests, including Urdu/English RTL layout checks on phone and desktop widths",
    ],
    stats: [
      { label: "Tables (RLS)", value: 37, suffix: "" },
      { label: "RPCs", value: 80, suffix: "" },
      { label: "Tests", value: 1600, suffix: "+" },
    ],
    problem:
      "In most clinics patients take a slip, then sit on a crowded bench for hours because nobody knows when their turn will come. MediQ puts the queue on everyone's phone: patients can wait outside, at the pharmacy or at home and walk in on time, and the front desk stops being a crowd.",
    // Shown under the Architecture tab; see diagrams/MediQRoleDiagram.jsx.
    architectureDiagram: "mediq-roles",
    architecture:
      "One Supabase backend serves two clients: a Next.js web app (staff desk, settings, records, the public QR join and token pages, and the TV display) and a React Native app for doctors, owners and reception. Clinics are organizations with org_members in owner, receptionist or doctor roles, and Row-Level Security is on all 37 tables. 126 SQL functions (80 of them client-callable RPCs) across 34 migrations carry the queue, join and payment logic, and 5 pg_cron jobs handle notifications, token expiry and the plan lifecycle. The reception desk and TV board subscribe to Supabase Realtime, and Edge Functions send queue notifications from a notification outbox.",
    challenges: [
      "Keeping the TV, the patient's phone, the doctor's app and the reception desk in step when a patient is called",
      "Online fees without a payment gateway: unpaid QR tokens stay out of the line, expire after a set time, and never expire while reception is checking a transaction ID",
      "Making the whole staff side and patient pages work in Urdu, right to left, as well as English",
      "Catching bugs the database tests missed: E2E tests found an UPDATE without a WHERE and a Next.js Suspense build failure, and a backfill migration test stopped a bug that would have cut Pro clinics' doctor limit from 10 to 3",
    ],
    optimizations: [
      "Realtime subscriptions instead of polling on the reception desk and TV display",
      "Role checks and queue rules enforced in the database through RLS and RPCs, so web and mobile share the same guarantees",
      "Append-only payment ledger (refunds are new rows) and atomic slot-locking RPCs that prevent double-booking",
      "Phased delivery: security lockdown, multi-clinic SaaS, QR join, reception, plans and payments, each backed by pgTAP, Jest and Playwright tests",
    ],
    responsiveness:
      "The reception desk and records are built for desktop, patient join and token pages are phone-first web pages with no install, the TV board fills a 1920x1080 screen, and doctors and owners use the native Android app.",
    gitUrl: "https://github.com/Awais-Chandio/QueueLess",
    // Not on the stores yet, so the live link is the click-through product
    // tour served from public/demos/mediq (copied from the app's marketing kit).
    liveUrl: "/demos/mediq/index.html",
    liveLabel: "Interactive Tour",
    accent: "from-teal-300 via-cyan-300 to-sky-400",
  },
  {
    id: "ai-saas-dashboard",
    featured: false,
    order: 7,
    title: "AI SaaS Dashboard",
    status: "Concept",
    categoryLabel: "SaaS Dashboard",
    description:
      "A modern analytics dashboard concept for AI usage, billing, workspaces, prompt activity, and product-level insights.",
    image: null,
    placeholder: "AI SaaS",
    categories: ["All", "SaaS", "Full Stack", "UI"],
    stack: ["Next.js", "Tailwind CSS", "Charts", "Auth", "API Routes"],
    features: [
      "Usage analytics, workspace cards, activity feed, and billing overview",
      "Admin-style interface with filters and responsive data panels",
      "Dark SaaS layout inspired by Vercel, Linear, and Framer",
    ],
    stats: [
      { label: "Widgets", value: 9, suffix: "" },
      { label: "Views", value: 5, suffix: "" },
      { label: "API Areas", value: 4, suffix: "" },
    ],
    problem:
      "SaaS teams need a clean way to understand product usage, AI costs, team activity, and workspace health.",
    architecture:
      "A Next.js dashboard structure with reusable panels, metrics, charts, server-ready API boundaries, and auth-friendly page composition.",
    challenges: [
      "Keeping dense product data easy to scan",
      "Balancing executive metrics with operational details",
      "Designing responsive dashboard layouts without clutter",
    ],
    optimizations: [
      "Reusable dashboard cards",
      "Responsive grid tracks",
      "Low-noise dark interface for repeated daily use",
    ],
    responsiveness:
      "Desktop-first for data density, with tablet and mobile layouts collapsing into readable stacked panels.",
    gitUrl: "",
    liveUrl: "",
    accent: "from-violet-300 via-fuchsia-400 to-cyan-300",
  },
  {
    id: "ecommerce-platform",
    featured: false,
    order: 5,
    title: "E-Commerce Platform",
    status: "Completed",
    categoryLabel: "Full Stack",
    description:
      "Commerce storefront concept with product discovery, cart state, checkout-ready flow, admin inventory thinking, and responsive product cards.",
    image: null,
    placeholder: "Commerce",
    categories: ["All", "Full Stack", "Admin", "UI"],
    stack: ["Next.js", "Tailwind CSS", "Stripe-ready", "Database Models"],
    features: [
      "Product grid, filters, cart summary, and checkout-ready structure",
      "Admin-friendly inventory and product management model",
      "Responsive storefront UI with clean product hierarchy",
    ],
    stats: [
      { label: "Modules", value: 6, suffix: "" },
      { label: "Models", value: 5, suffix: "" },
      { label: "Breakpoints", value: 4, suffix: "" },
    ],
    problem:
      "Small commerce brands need a polished storefront that makes browsing, cart review, and checkout feel fast and trustworthy.",
    architecture:
      "A modular storefront architecture with product data, cart state, checkout boundaries, and admin-ready product models.",
    challenges: [
      "Making product cards informative without becoming busy",
      "Keeping cart state visible and easy to understand",
      "Preparing the UI for real checkout and inventory data",
    ],
    optimizations: [
      "Image-first product cards",
      "Reusable filter controls",
      "Responsive grid composition",
    ],
    responsiveness:
      "Optimized for storefront browsing across mobile, tablet, and desktop with flexible product grids.",
    gitUrl: "",
    liveUrl: "",
    accent: "from-emerald-300 via-teal-300 to-lime-300",
  },
  {
    id: "portfolio-site",
    featured: false,
    order: 6,
    title: "Portfolio Website",
    status: "Completed",
    categoryLabel: "Portfolio",
    description:
      "A dark, animated developer portfolio with section reveals, modern project presentation, responsive navigation, and recruiter-focused content.",
    image: "/images/projects/1.png",
    screenshots: ["/images/projects/1.png"],
    screenLabels: ["Portfolio preview"],
    categories: ["All", "SaaS", "UI"],
    stack: ["Next.js 13", "Tailwind CSS", "Framer Motion", "Three.js"],
    features: [
      "Animated sections, responsive layout, and dark glass UI",
      "Reusable portfolio data and project components",
      "Interactive visual polish for recruiter and client review",
    ],
    stats: [
      { label: "Sections", value: 7, suffix: "" },
      { label: "Components", value: 20, suffix: "+" },
      { label: "Motion", value: 10, suffix: "+" },
    ],
    problem:
      "A developer portfolio needs to communicate skill, taste, project thinking, and contact paths quickly.",
    architecture:
      "A Next.js App Router page with data-driven sections, Tailwind component classes, Framer Motion reveals, and reusable UI components.",
    challenges: [
      "Keeping animations smooth without distracting from content",
      "Making project details easy to scan",
      "Preserving responsive spacing across every section",
    ],
    optimizations: [
      "Static rendering",
      "Image optimization through Next Image",
      "Data-driven sections for easy updates",
    ],
    responsiveness:
      "Fully responsive across mobile, tablet, and desktop with compact nav and adaptive project grids.",
    gitUrl: "https://github.com/Awais-Chandio",
    liveUrl: "",
    accent: "from-sky-300 via-cyan-300 to-teal-300",
  },
  {
    id: "bidbuyy",
    featured: false,
    order: 4,
    title: "BidBuyy Auction",
    status: "Completed",
    categoryLabel: "Auction App",
    description:
      "A Flutter auction app concept focused on bidding interactions, product states, and Firebase-backed realtime update patterns.",
    image: "/images/projects/7.jpeg",
    screenshots: ["/images/projects/7.jpeg"],
    screenLabels: ["Auction overview"],
    categories: ["All", "Mobile Apps", "Firebase"],
    stack: ["Flutter", "Firebase", "Realtime State"],
    features: [
      "Auction product listing screens",
      "Realtime bidding states",
      "Firebase-backed data updates",
    ],
    stats: [
      { label: "Screens", value: 6, suffix: "+" },
      { label: "States", value: 4, suffix: "" },
      { label: "Backend", value: 1, suffix: "" },
    ],
    problem:
      "Auction products need fast state changes and a UI that makes bid activity easy to understand.",
    architecture:
      "Flutter screens are structured around product listings, item details, bidding states, and Firebase-backed updates.",
    challenges: [
      "Communicating active bidding state clearly",
      "Designing screens for fast product comparison",
      "Keeping realtime update patterns simple enough to maintain",
    ],
    optimizations: [
      "Compact listing UI",
      "Reusable product card patterns",
      "Firebase-ready bid state flow",
    ],
    responsiveness:
      "Mobile-first Flutter layout with readable cards and touch-friendly bidding actions.",
    gitUrl: "https://github.com/Awais-Chandio/BidBuyy",
    liveUrl: "",
    accent: "from-blue-300 via-indigo-300 to-violet-300",
  },
];

/**
 * Display order for the Work section, controlled entirely by the two fields on
 * each record above:
 *
 *   featured: true  — pins the record to the top, ahead of every `order` value.
 *   order: <number> — sequences the rest, lowest first.
 *
 * Ties and gaps are safe: records sharing a value keep their order in this file.
 * Nothing else reads position — Services and Writing resolve projects by `id` —
 * so reordering here is the whole change.
 */
export const projects = [...projectRecords]
  .map((project, index) => ({ project, index }))
  .sort((a, b) => {
    const featured = Number(b.project.featured === true) - Number(a.project.featured === true);
    if (featured) return featured;

    // A record with no `order` sorts after every record that has one.
    const orderA = Number.isFinite(a.project.order) ? a.project.order : Infinity;
    const orderB = Number.isFinite(b.project.order) ? b.project.order : Infinity;
    if (orderA !== orderB) return orderA - orderB;

    return a.index - b.index;
  })
  .map(({ project }) => project);
