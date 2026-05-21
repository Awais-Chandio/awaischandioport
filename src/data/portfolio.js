export const personalInfo = {
  name: "Muhammad Awais",
  shortName: "Awais",
  role: "Mobile App Engineer",
  specialization: "React Native",
  location: "Hyderabad, Pakistan",
  availability:
    "Open to mobile product teams, React Native roles, and focused app feature work.",
  email: "awaischandio827@gmail.com",
  phone: "+92 3163461656",
  resumeUrl: "/cv.pdf",
  githubUrl: "https://github.com/Awais-Chandio",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-awais45",
  heroImage: "/images/profile2.webp",
  aboutImage: "/images/profile2.webp",
  currentCompany: "Verge Systems",
  degree: "BE in Software Engineering",
  university: "Mehran University of Engineering and Technology",
  headline: "Mobile App Engineer building practical cross-platform products.",
  subheadline:
    "I turn product ideas into polished app flows, reliable integrations, and maintainable interfaces.",
  intro:
    "My toolkit includes React Native, Flutter, Supabase, Firebase, SQLite, API work, and push notifications.",
};

export const navLinks = [
  { title: "Home", path: "#home" },
  { title: "About", path: "#about" },
  { title: "Skills", path: "#skills" },
  { title: "Projects", path: "#projects" },
  { title: "Journey", path: "#experience" },
  { title: "Contact", path: "#contact" },
];

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

export const aboutParagraphs = [
  "I build mobile product interfaces with an eye for structure, usability, and steady delivery. I like turning rough feature ideas into screens that feel clear and work reliably.",
  "My background combines current product work at Verge Systems with hands-on projects across commerce, healthcare, auctions, and fitness. I am comfortable with APIs, auth, local storage, notifications, and backend-connected app features.",
];

export const aboutPoints = [
  "Shipping clear navigation, reusable UI pieces, and product-ready feature flows.",
  "Handling auth, API responses, local data, cloud services, and notification paths.",
  "Improving interface polish through debugging, responsive layouts, and simpler component structure.",
];

export const skillGroups = [
  {
    title: "App Architecture",
    description:
      "The foundation I use to organize screens, state, navigation, and reusable building blocks.",
    skills: ["React Native", "JavaScript", "TypeScript", "Components", "Navigation"],
  },
  {
    title: "Interface Craft",
    description:
      "Practical UI skills for readable layouts, smooth flows, and consistent product behavior.",
    skills: ["Mobile UI", "Cross-platform", "App Screens", "State Handling", "Responsive Layouts"],
  },
  {
    title: "Data & Services",
    description:
      "Service integration skills for sign-in, synced data, persistence, and user updates.",
    skills: ["Supabase", "Firebase", "SQLite", "Firebase FCM", "APIs", "Auth"],
  },
  {
    title: "Delivery Tools",
    description:
      "Daily tooling and extra cross-platform practice that help move features from idea to handoff.",
    skills: ["Flutter", "Git", "GitHub", "VS Code", "Debugging"],
  },
];

export const experience = [
  {
    title: "Mobile App Engineer",
    company: "Verge Systems",
    period: "Current",
    summary:
      "Building product features with attention to usable interfaces, connected workflows, and code that stays easy to work with.",
    bullets: [
      "Translating requirements into organized screens, interactions, and reusable pieces.",
      "Wiring product behavior to APIs and real application data.",
      "Polishing layouts, fixing edge cases, and simplifying components during implementation.",
    ],
  },
  {
    title: "Learning & Building Journey",
    company: "Personal Projects and Practice",
    period: "Ongoing",
    summary:
      "Growing through hands-on products that cover commerce, healthcare, auction, and fitness use cases.",
    bullets: [
      "Built feature sets around product browsing, bidding states, appointments, and workout progress.",
      "Practiced service-backed data flows, authentication, persistence, and notification behavior.",
      "Currently improving architecture decisions, screen polish, and reliability in app workflows.",
    ],
  },
];

export const education = [
  {
    degree: "BE in Software Engineering",
    institution: "Mehran University of Engineering and Technology",
    description:
      "Academic foundation in software engineering, application development, and structured problem solving.",
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
