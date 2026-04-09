export const personalInfo = {
  name: "Muhammad Awais",
  shortName: "Awais",
  role: "Flutter Developer",
  location: "Jamshoro, Pakistan",
  availability: "Open for freelance and full-time opportunities",
  email: "awaischandio827@gmail.com",
  phone: "+92 3163461656",
  resumeUrl: "/cv.pdf",
  githubUrl: "https://github.com/Awais-Chandio",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-awais45",
  heroImage: "/images/hero-image.jpeg",
  aboutImage: "/images/about-image.png",
  intro:
    "I build clean, high-performing Flutter products with thoughtful UI, solid Firebase architecture, and delivery that stays focused on user outcomes.",
};

export const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

export const heroHighlights = [
  "Cross-platform mobile apps",
  "Firebase and REST API integrations",
  "Responsive UI with production-ready polish",
];

export const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Projects shipped",
    description: "Portfolio, mobile commerce, medical and fitness products.",
  },
  {
    value: 1000,
    prefix: "~",
    suffix: "+",
    label: "Users reached",
    description: "Apps built with focus on usability and repeat engagement.",
  },
  {
    value: 5,
    suffix: "+",
    label: "Awards and wins",
    description: "Academic and internship milestones across software work.",
  },
  {
    value: 2,
    suffix: "+",
    label: "Years building",
    description: "Hands-on Flutter, Firebase, UI implementation, and delivery.",
  },
];

export const expertiseCards = [
  {
    title: "Mobile UI systems",
    description: "Pixel-aware interfaces that stay smooth on both Android and iOS.",
  },
  {
    title: "Backend connectivity",
    description: "Firebase auth, realtime data, REST APIs, and practical app flows.",
  },
  {
    title: "Shipping mindset",
    description: "Fast iteration, clean structure, and a strong eye for delivery quality.",
  },
];

export const aboutTabs = [
  {
    id: "skills",
    label: "Skills",
    items: [
      "Flutter",
      "Dart",
      "FlutterFlow",
      "Firebase",
      "REST API integration",
      "HTML, CSS, JavaScript",
      "WordPress",
      "Content writing",
      "MS Office",
      "Canva",
      "Java",
      "C++",
      "Database systems",
    ],
  },
  {
    id: "education",
    label: "Education",
    entries: [
      {
        title: "Bachelor of Software Engineering",
        subtitle: "Mehran University, Jamshoro",
        meta: "GPA 3.1 / 4.0",
      },
      {
        title: "Intermediate in Pre-Engineering",
        subtitle: "UB Degree College, Dadu",
        meta: "Grade A, 2018 to 2020",
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    entries: [
      {
        title: "Flutter Developer Intern",
        subtitle: "Internship Alerts",
        meta: "Nov 2022 to Dec 2022",
        description:
          "Built frontends for mobile applications and led work on a complete learning management system experience for students.",
      },
      {
        title: "Content Writer Intern",
        subtitle: "National Freelancing Program, Jamshoro",
        meta: "May 2022 to Jul 2022",
        description:
          "Worked in a collaborative setting, refined content execution, and improved adaptability for fast-changing project requirements.",
      },
      {
        title: "Flutter Developer",
        subtitle: "BidBuy Startup",
        meta: "Jun 2021 to Jul 2021",
        description:
          "Created a cross-platform bidding app with Flutter, Firebase-backed realtime features, and responsive mobile UI patterns.",
      },
    ],
  },
];

export const projectCategories = ["All", "Flutter", "Firebase", "UI/UX"];

export const projects = [
  {
    id: 1,
    title: "ShopEase Commerce",
    description:
      "An e-commerce mobile app focused on smooth browsing, product discovery, and conversion-driven purchase flows.",
    image: "/images/projects/1.png",
    categories: ["All", "Flutter", "Firebase", "UI/UX"],
    stack: ["Flutter", "Firebase", "Commerce"],
    gitUrl: "https://github.com/Awais-Chandio/ShopEase",
    liveUrl: "https://github.com/Awais-Chandio/ShopEase",
  },
  {
    id: 2,
    title: "Medical Care App",
    description:
      "A healthcare interface with practical navigation, mobile-first layouts, and user-friendly feature access.",
    image: "/images/projects/5.png",
    categories: ["All", "Flutter", "UI/UX"],
    stack: ["Flutter", "Healthcare", "UX"],
    gitUrl: "https://github.com/Awais-Chandio/MadProject",
    liveUrl: "https://github.com/Awais-Chandio/MadProject",
  },
  {
    id: 3,
    title: "BidBuyy Auction",
    description:
      "A realtime bidding platform built for digital auctions with scalable Flutter UI and Firebase-backed interactions.",
    image: "/images/projects/7.jpeg",
    categories: ["All", "Flutter", "Firebase"],
    stack: ["Flutter", "Firebase", "Realtime"],
    gitUrl: "https://github.com/Awais-Chandio/BidBuyy",
    liveUrl: "https://github.com/Awais-Chandio/BidBuyy",
  },
  {
    id: 4,
    title: "Workout Companion",
    description:
      "A fitness app designed around workout flows, daily progress, and a clear mobile interaction model.",
    image: "/images/projects/9.jpeg",
    categories: ["All", "Flutter", "UI/UX"],
    stack: ["Flutter", "Fitness", "Mobile UI"],
    gitUrl: "https://github.com/Awais-Chandio/Workout-Application",
    liveUrl: "https://github.com/Awais-Chandio/Workout-Application",
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
