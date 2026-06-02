export const projectCategories = [
  "All",
  "Mobile Apps",
  "SaaS",
  "Full Stack",
  "Firebase",
  "Admin",
  "UI",
];

export const projects = [
  {
    id: "foodapp",
    title: "Food Delivery App",
    status: "Completed",
    categoryLabel: "Mobile App",
    description:
      "A full-featured React Native food ordering app with customer flows, admin controls, Firebase services, SQLite caching, cart behavior, and polished mobile screens.",
    image: "/images/projects/foodapp/01-home.png",
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
      "Restaurant",
      "Cart",
      "Search",
      "Menu",
      "Login",
      "Register",
      "Admin add",
      "Admin edit",
      "Checkout",
    ],
    categories: ["All", "Mobile Apps", "Firebase", "Admin", "UI"],
    stack: ["React Native", "Firebase", "Firestore", "SQLite", "AsyncStorage"],
    features: [
      "Customer authentication, browsing, search, menu, cart, profile, and order tracking flows",
      "Admin screens for restaurant, menu item, and user management",
      "Firebase Auth, Firestore, Storage, Messaging, Analytics, SQLite, and AsyncStorage",
    ],
    stats: [
      { label: "Screens", value: 12, suffix: "+" },
      { label: "Flows", value: 2, suffix: "" },
      { label: "Data Models", value: 5, suffix: "" },
    ],
    problem:
      "Food ordering needs a frictionless path from discovery to checkout while admins still need clean tools to manage restaurant and menu data.",
    architecture:
      "React Native screens are split into auth, customer tabs, restaurant detail, cart, and admin flows. Firebase powers auth, realtime data, image storage, notifications, and analytics, while SQLite and AsyncStorage support local persistence.",
    challenges: [
      "Keeping customer and admin navigation understandable",
      "Making cart totals, delivery, discounts, and quantities clear",
      "Balancing realtime Firebase data with local SQLite caching",
    ],
    optimizations: [
      "Reusable buttons, search bars, section headers, empty states, and loading cards",
      "Local persistence for smoother repeat access",
      "Compact mobile-first screens with clear hierarchy",
    ],
    responsiveness:
      "Built for Android and iOS with bottom tabs, stack transitions, large tap targets, and compact screen spacing.",
    gitUrl: "",
    liveUrl: "",
    accent: "from-orange-400 via-rose-400 to-amber-300",
  },
  {
    id: "safco-e-credit",
    title: "SAFCO E-Credit App",
    status: "Live",
    categoryLabel: "Microfinance App",
    description:
      "A live React Native customer microfinance app on Google Play for digital loan services, redesigned with a simplified two-screen E-Credit application flow, auto-filled customer details, loan submission, repayment options, and profile management.",
    image: "/images/projects/safco/02-dashboard.jpeg",
    screenshots: [
      "/images/projects/safco/02-dashboard.jpeg",
      "/images/projects/safco/03-personal-details.jpeg",
      "/images/projects/safco/04-work-loan-details.jpeg",
      "/images/projects/safco/05-payment-methods.jpeg",
      "/images/projects/safco/06-profile.jpeg",
      "/images/projects/safco/07-dashboard-photo.jpeg",
      "/images/projects/safco/01-splash.jpeg",
    ],
    screenLabels: [
      "Dashboard",
      "Personal details",
      "Work and loan",
      "Payment methods",
      "Profile",
      "Dashboard photo",
      "Splash",
    ],
    categories: ["All", "Mobile Apps", "Admin", "UI"],
    stack: ["React Native", "Redux", "REST APIs", "Axios", "AsyncStorage"],
    features: [
      "Simplified E-Credit application from a longer form into two guided screens",
      "Auto-filled personal details with editable address input for accurate customer data",
      "Loan submission routed directly to Branch Manager and connected to the normal E-Appraisal workflow",
      "Dashboard for active loan status, loan history, new loan, repayment, and support access",
      "Repayment method selection for JazzCash, EasyPaisa, HBL Connect, and PayPro",
      "Profile view and profile picture update flow with customer CNIC, mobile, and gender details",
      "Published on Google Play as Safco eCredit for existing SAFCO customers",
    ],
    stats: [
      { label: "Screens", value: 7, suffix: "+" },
      { label: "Loan Steps", value: 2, suffix: "" },
      { label: "Payments", value: 4, suffix: "" },
    ],
    problem:
      "Customers needed a faster and clearer way to apply for E-Credit loans without filling unnecessary repeated information, while the backend still needed clean routing into the Branch Manager and E-Appraisal process.",
    architecture:
      "The app uses React Native screens with Redux-managed state, REST API integrations through Axios, and local session persistence through AsyncStorage. The New Loan flow starts with a backend loan inquiry to auto-fill customer data, validates the two-step form, then submits the application payload into the Branch Manager and E-Appraisal workflow.",
    challenges: [
      "Reducing the E-Credit application to only the essential customer inputs",
      "Keeping auto-filled personal data readable while allowing address edits",
      "Maintaining backend routing for Branch Manager review and normal E-Appraisal processing",
    ],
    optimizations: [
      "Two-step form flow for faster completion",
      "Auto-fill behavior to reduce manual entry and user mistakes",
      "Clear mobile cards, large actions, and focused input sections",
    ],
    responsiveness:
      "Built for Android and iOS customers with mobile-first screens, large tap targets, clear form spacing, and dashboard actions optimized for quick loan and repayment access.",
    gitUrl: "",
    liveUrl: "https://play.google.com/store/apps/details?id=com.vergesystems.safco_e_banking",
    accent: "from-emerald-300 via-cyan-300 to-indigo-400",
  },
  {
    id: "queueless",
    title: "QueueLess Appointment App",
    status: "In Progress",
    categoryLabel: "Product App",
    description:
      "Appointment booking concept for reducing waiting time with queue slots, booking status, service selection, and customer notifications.",
    image: null,
    placeholder: "QueueLess",
    categories: ["All", "Mobile Apps", "Firebase", "UI"],
    stack: ["React Native", "Firebase", "Notifications", "Context API"],
    features: [
      "Book service appointments and select available queue slots",
      "Track booking status and estimated waiting time",
      "Notification-ready structure for customer updates",
    ],
    stats: [
      { label: "Flows", value: 4, suffix: "" },
      { label: "Screens", value: 10, suffix: "+" },
      { label: "Roles", value: 2, suffix: "" },
    ],
    problem:
      "Customers waste time waiting without clear appointment visibility, while businesses need a simpler way to organize arrivals.",
    architecture:
      "A mobile-first appointment flow with customer booking screens, queue state, admin/service management, and notification-ready Firebase data.",
    challenges: [
      "Presenting queue position without overwhelming the user",
      "Designing booking states for pending, active, completed, and cancelled appointments",
      "Keeping the UI useful for both customers and service providers",
    ],
    optimizations: [
      "Reusable status components",
      "Lightweight state model for queue updates",
      "Touch-friendly booking cards",
    ],
    responsiveness:
      "Designed for fast mobile booking with large actions, compact status cards, and readable queue states.",
    gitUrl: "",
    liveUrl: "",
    accent: "from-cyan-300 via-sky-400 to-indigo-400",
  },
  {
    id: "ai-saas-dashboard",
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
