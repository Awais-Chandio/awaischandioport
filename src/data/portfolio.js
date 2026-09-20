export const personalInfo = {
  name: "Muhammad Awais",
  shortName: "Awais",
  // Exact title as it appears on the resume. Rendered verbatim in the hero.
  title: "React Native Developer | Mobile Software Engineer",
  // Short form of the same title, for the places a full two-part title will not
  // fit: the nav, the footer, the About meta line, and the JSON-LD jobTitle.
  role: "React Native Developer",
  location: "Hyderabad, Pakistan",
  availability:
    "Open to mobile product teams, React Native roles, and focused app feature work.",
  email: "awaischandio827@gmail.com",
  phone: "+92 3163461656",
  // Served from /public. `resumeFileName` is what the browser saves the file as,
  // independent of the path it is served from, so the visitor always gets
  // "Muhammad-Awais-Resume.pdf" regardless of the URL.
  //
  // This is the single definition behind all four CV controls: "View Resume"
  // and "Download CV" in the hero, and "Download CV" in both the desktop nav
  // and the mobile menu. Replacing the file at the path below updates them all.
  resumeUrl: "/resume/resume.pdf",
  resumeFileName: "Muhammad-Awais-Resume.pdf",
  githubUrl: "https://github.com/Awais-Chandio",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-awais45",
  // The hero is the only slot that uses a photo. `aboutImage` used to mirror it
  // for the About column and went with that column's removal.
  heroImage: "/images/profile.jpg",
  currentCompany: "Verge Systems (WebHR)",
  degree: "B.E. Software Engineering",
  university: "Mehran University of Engineering and Technology (MUET)",
  headline:
    "React Native developer building cross-platform mobile apps for Android and iOS.",
  subheadline:
    "I build and maintain production mobile apps in React Native and Flutter, shipped to Google Play and wired to Supabase and Firebase.",
  intro:
    "React Native and Flutter on the interface, Supabase, Firebase, and SQLite on the data layer, tied together with REST API integration and push notifications.",
};

// Primary site navigation. Entries carrying a `sectionId` live on the home page,
// so the nav renders them as a bare `#anchor` there and as a full `/#anchor` URL
// from any standalone route. Entries without one are their own routes.
export const primaryNav = [
  { title: "Home", href: "/", sectionId: "home" },
  { title: "Work", href: "/#projects", sectionId: "projects" },
  { title: "Services", href: "/services" },
  { title: "Writing", href: "/writing" },
  { title: "About", href: "/#about", sectionId: "about" },
  { title: "Work With Me", href: "/work-with-me" },
];

// Deliberately outside the primary nav: the casual "just say hi" route, surfaced
// in the footer next to the social links rather than competing with Work With Me.
// Also outside the primary nav, which is full at six items. Reached from the
// footer, the command palette and a cross-link on /writing.
export const labLink = { title: "Lab", href: "/lab" };

export const contactLink = { title: "Contact", href: "/#contact", sectionId: "contact" };

export const heroHighlights = [
  "Reusable app screens with clear state, navigation, and component structure.",
  "API-connected flows for auth, data handling, and product actions.",
  "Local storage, backend services, and notification-ready implementations.",
];

export const heroSpotlights = [
  {
    label: "Delivery",
    value: "Screens to flows",
    detail: "Turning product requirements into navigable, testable app experiences.",
  },
  {
    label: "Integration",
    value: "Data + auth",
    detail: "Connecting APIs, Firebase, Supabase, local persistence, and notifications.",
  },
  {
    label: "Quality",
    value: "Clean UI",
    detail: "Keeping layouts responsive, readable, and easy to maintain.",
  },
];

// Two paragraphs, deliberately. A third on AI-assisted tooling was dropped
// because the Skills section already lists those tools by name, and a numbered
// summary list under these paragraphs was dropped because every line in it
// restated a sentence above it.
export const aboutParagraphs = [
  "I'm a software engineer with production experience building cross-platform mobile apps in React Native and Flutter, for both Android and iOS. The work I care about is the unglamorous part: features that hold up after release.",
  "I've shipped and maintained apps with thousands of downloads on Google Play, working with Supabase and Firebase for authentication, real-time data, and offline-capable storage. Owning a feature end to end comes naturally to me — from API integration through debugging to production release.",
];

// Categorisation is taken verbatim from the resume so the site and the PDF can
// never disagree about what is claimed. Order and grouping are the resume's.
export const skillGroups = [
  {
    title: "Languages",
    description: "The languages I write day to day across app and data work.",
    skills: ["JavaScript", "TypeScript", "Dart", "SQL"],
  },
  {
    title: "Mobile Development",
    description: "Cross-platform app development and the platforms I ship to.",
    skills: ["React Native", "Flutter", "Android", "iOS"],
  },
  {
    title: "State, Data & Navigation",
    description: "How I structure state, data fetching, forms, and screen flow.",
    skills: [
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "React Navigation",
      "GetX",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    title: "Backend & Data",
    description: "The services and storage layers I connect apps to.",
    skills: [
      "Supabase (Auth, Row-Level Security)",
      "Firebase (Auth, Firestore, Cloud Messaging)",
      "SQLite",
      "REST APIs",
    ],
  },
  {
    title: "Tools & Practices",
    description: "Version control, automation, and the process side of delivery.",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "Agile/Scrum",
      "Code Reviews",
    ],
  },
  {
    title: "AI-Assisted Development",
    description: "Tools I use to debug faster and iterate quickly.",
    skills: ["Claude", "Codex", "Cursor", "Google Antigravity"],
  },
  {
    title: "Professional Skills",
    description: "How I work alongside the rest of a product team.",
    skills: [
      "Cross-Functional Collaboration",
      "Debugging & Troubleshooting",
      "Agile Teamwork",
    ],
  },
];

// Roles, employers, locations and dates exactly as the resume states them. The
// resume lists no per-role responsibilities, so none are given here: the
// section renders a summary and bullets only when an entry carries them.
export const experience = [
  {
    title: "Software Engineer (React Native)",
    company: "Verge Systems (WebHR)",
    location: "Karachi",
    period: "Sep 2025 – Present",
  },
  {
    title: "Software Engineer (React Native & Flutter)",
    company: "Algorithms Consulting",
    location: "Karachi",
    period: "Jan 2025 – Aug 2025",
  },
  {
    title: "Flutter Developer",
    company: "Bidbuyy",
    location: "Jamshoro",
    period: "Dec 2023 – Jan 2024",
  },
];

export const education = [
  {
    degree: "B.E. Software Engineering",
    institution: "Mehran University of Engineering and Technology (MUET)",
    period: "Nov 2020 – Nov 2024",
  },
];

export const projectCategories = [
  "All",
  "Mobile Apps",
  "Flutter",
  "Firebase",
  "Data / Auth",
  "Admin",
  "UI",
];

export const projects = [
  {
    id: 1,
    title: "Food Delivery App",
    subtitle: "Full food ordering app with customer, admin, Firebase, and SQLite flows",
    description:
      "A full-featured React Native food ordering and delivery app with authentication, restaurant browsing, menu management, cart functionality, order tracking, and admin controls.",
    image: "/images/projects/foodapp/01-home.png",
    previewLabel: "User + Admin Flow",
    type: "Featured Mobile Case Study",
    status: "Functional mobile app with admin panel",
    platform: "React Native for Android and iOS",
    role: "Mobile app development, screen flow, Firebase integration, SQLite caching, admin forms",
    overview:
      "FoodApp is a complete food ordering and delivery platform built with React Native. Users can sign up, browse nearby and popular restaurants, search restaurants or menu items, open restaurant details, add dishes to cart, manage quantities, and track orders. The app also includes admin-side screens for managing restaurants, menu items, and users, making it a strong real-world mobile project with both customer and management workflows.",
    metrics: [
      { label: "Screens", value: "12+" },
      { label: "Flows", value: "Customer + Admin" },
      { label: "Database", value: "SQLite + Firebase" },
      { label: "Services", value: "5 Firebase" },
    ],
    integrations: [
      "Firebase Authentication for email/password login and signup",
      "Firestore for real-time restaurant, user, cart, and order data",
      "Firebase Storage for restaurant and menu images",
      "Firebase Messaging and Analytics service coverage",
      "SQLite and AsyncStorage for offline/local app data",
      "React Navigation for tabs, stacks, and auth/admin flows",
    ],
    featureGroups: [
      {
        title: "Customer App",
        items: [
          "Login, register, browse, search, menu detail, cart, profile, and tracking screens",
          "Restaurant categories, filters, quantity controls, and checkout summary",
        ],
      },
      {
        title: "Admin Panel",
        items: [
          "Protected admin access for restaurant, menu item, and user management",
          "Add/edit screens connected to the app's database structure",
        ],
      },
      {
        title: "Backend & Storage",
        items: [
          "Firebase Auth, Firestore, Storage, Messaging, Analytics, SQLite, and AsyncStorage",
          "Reusable components, Context API state, custom hooks, and smooth navigation",
        ],
      },
    ],
    databaseSchema: [
      "users",
      "restaurants",
      "menu_items",
      "cart",
      "admin_users",
    ],
    galleryTitle: "Food app screen flow",
    screenLabels: [
      "Home discovery",
      "Restaurant detail",
      "Cart summary",
      "Search results",
      "Menu items",
      "Login",
      "Register",
      "Add restaurant",
      "Edit menu item",
      "Checkout state",
    ],
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
    categories: ["All", "Mobile Apps", "Data / Auth", "Admin", "UI"],
    stack: [
      "React Native",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "SQLite",
      "AsyncStorage",
      "React Navigation",
      "Context API",
      "Reanimated",
    ],
    features: [
      "Customer auth, onboarding, home, search, restaurant detail, menu, cart, profile, and order tracking flows",
      "Admin dashboard, manage restaurants, manage menu items, and manage users screens",
      "Firebase backend services with SQLite local storage for a full-stack mobile structure",
      "Modern food-ordering UI with gradients, theme support, loading states, and smooth navigation",
    ],
    problem:
      "Food ordering apps need a clear path from discovery to checkout while still giving admins a way to manage live restaurant and menu data.",
    architecture:
      "React Native screens are organized around auth, customer tabs, restaurant detail, cart, and admin flows. Firebase handles auth, realtime data, image storage, notifications, and analytics, while SQLite and AsyncStorage support local app data.",
    challenges: [
      "Keeping customer and admin flows understandable without making navigation feel heavy",
      "Designing cart and checkout state so totals, delivery, discounts, and quantities remain clear",
      "Balancing realtime Firebase data with local SQLite caching patterns",
    ],
    optimizations: [
      "Reusable UI components for buttons, search, empty states, headers, and loading cards",
      "Local persistence for faster repeat access and smoother app startup behavior",
      "Lean screen-specific data so mobile views stay responsive",
    ],
    responsiveness:
      "Built for mobile-first Android and iOS layouts with bottom tabs, stack transitions, large touch targets, and clean spacing across compact screens.",
    gitUrl: "",
    liveUrl: "",
  },
  {
    id: 2,
    title: "BidBuyy Auction",
    description:
      "A mobile auction app concept focused on bidding interactions, dynamic product states, and realtime update patterns.",
    image: "/images/projects/7.jpeg",
    categories: ["All", "Mobile Apps", "Flutter", "Firebase", "Data / Auth"],
    stack: ["Flutter", "Firebase", "Realtime"],
    integrations: [
      "Firebase-backed data flow for products and bidding states",
      "Authentication-ready user access pattern",
      "Realtime update pattern for active auctions",
    ],
    features: [
      "Auction listing screens",
      "Realtime bidding states",
      "Firebase-backed updates",
    ],
    screenshots: ["/images/projects/7.jpeg"],
    screenLabels: ["Auction overview"],
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
      "Compact listing UI for quick scanning",
      "Reusable product card patterns",
      "Firebase-ready state flow for bid updates",
    ],
    responsiveness:
      "Designed as a mobile-first Flutter experience with readable product cards and touch-friendly bidding actions.",
    gitUrl: "https://github.com/Awais-Chandio/BidBuyy",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Medical Care App",
    description:
      "A healthcare mobile interface designed around readable content, structured navigation, and accessible appointment-style flows.",
    image: "/images/projects/5.png",
    categories: ["All", "Mobile Apps", "Flutter", "UI"],
    stack: ["Flutter", "Healthcare", "Mobile UX"],
    integrations: [
      "Structured healthcare service data layout",
      "Appointment-style navigation flow",
      "Reusable mobile UI components",
    ],
    features: [
      "Healthcare service screens",
      "Simple navigation structure",
      "Readable mobile UI",
    ],
    screenshots: ["/images/projects/5.png"],
    screenLabels: ["Healthcare interface"],
    problem:
      "Healthcare apps need calm, readable interfaces where users can understand services and move through appointment-style flows quickly.",
    architecture:
      "Flutter UI screens are grouped around service discovery, healthcare content, and simple navigation patterns.",
    challenges: [
      "Keeping medical content readable on small screens",
      "Creating a simple navigation structure",
      "Making the interface feel trustworthy and accessible",
    ],
    optimizations: [
      "Readable spacing and typography",
      "Focused screens with low visual noise",
      "Reusable mobile interface sections",
    ],
    responsiveness:
      "Built around mobile layouts with clear hierarchy, readable content blocks, and comfortable spacing.",
    gitUrl: "https://github.com/Awais-Chandio/MadProject",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Workout Companion",
    description:
      "A fitness-oriented mobile product concept with workout screens, progress-oriented flows, and clear interaction patterns.",
    image: "/images/projects/9.jpeg",
    categories: ["All", "Mobile Apps", "Flutter", "UI"],
    stack: ["Flutter", "Fitness", "Product UI"],
    integrations: [
      "Workout and progress screen structure",
      "Reusable exercise-card UI patterns",
      "Mobile-first fitness product navigation",
    ],
    features: [
      "Workout flow screens",
      "Progress-focused interface",
      "Mobile product layout",
    ],
    screenshots: ["/images/projects/9.jpeg"],
    screenLabels: ["Fitness product UI"],
    problem:
      "Fitness apps need motivating screens that make workout progress and next actions easy to follow.",
    architecture:
      "Flutter screens organize workout content, progress-style UI, and repeated exercise card patterns.",
    challenges: [
      "Making progress information easy to scan",
      "Keeping workout cards visually consistent",
      "Designing for repeated daily use",
    ],
    optimizations: [
      "Reusable exercise card layouts",
      "Progress-focused visual hierarchy",
      "Mobile-first spacing and action placement",
    ],
    responsiveness:
      "Designed for handheld use with compact cards, clear headings, and touch-friendly workout flow controls.",
    gitUrl: "https://github.com/Awais-Chandio/Workout-Application",
    liveUrl: "",
  },
];

export const socials = [
  {
    label: "GitHub",
    href: personalInfo.githubUrl,
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedinUrl,
  },
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
  },
];
