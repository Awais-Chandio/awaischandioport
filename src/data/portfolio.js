export const personalInfo = {
  name: "Muhammad Awais",
  shortName: "Awais",
  // Exact title as it appears on the resume. Rendered verbatim in the hero.
  title: "React Native Developer | Mobile & Web Engineer",
  // Short form of the same title, for the places a full two-part title will not
  // fit: the nav, the footer, the About meta line, and the JSON-LD jobTitle.
  role: "React Native Developer",
  location: "Karachi, Pakistan",
  availability:
    "Open to relocation and remote work (UTC+5), for React Native, Next.js and full-stack product roles.",
  email: "awaischandio827@gmail.com",
  phone: "+92 316 3461656",
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
    "I build and maintain production apps in React Native and Flutter, now shipping web with Next.js, on Supabase and Firebase.",
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
  { title: "Experience", href: "/#experience", sectionId: "experience" },
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
  "I'm a software engineer with 2 years of professional experience building cross-platform apps in React Native and Flutter, for both Android and iOS, and now shipping web with Next.js. The work I care about is the unglamorous part: features that hold up after release.",
  "I maintain Safco eCredit, a live fintech app with 5,000+ Google Play downloads, and built MediQ, a multi-clinic SaaS on Supabase and PostgreSQL, on my own. I work with Supabase and Firebase for authentication, real-time data, and offline-capable storage. Owning a feature end to end comes naturally to me — from API integration through debugging to production release.",
];

// Categorisation is taken verbatim from the resume so the site and the PDF can
// never disagree about what is claimed. Order and grouping are the resume's.
export const skillGroups = [
  {
    title: "Mobile & Web",
    description: "The platforms and languages I build products with.",
    skills: [
      "React Native (CLI)",
      "TypeScript",
      "JavaScript",
      "Next.js (App Router)",
      "React",
      "Android",
      "iOS",
      "Tailwind CSS",
      "Flutter (Dart)",
    ],
  },
  {
    title: "State & UI",
    description: "How I structure state, data fetching, forms, navigation and motion.",
    skills: [
      "Redux Toolkit",
      "Zustand",
      "TanStack React Query",
      "React Hook Form",
      "Zod",
      "React Navigation",
      "Reanimated",
    ],
  },
  {
    title: "Backend & Data",
    description: "The services and storage layers I connect apps to.",
    skills: [
      "Supabase (Auth, RLS, RPC, Realtime, pg_cron)",
      "PostgreSQL",
      "Firebase (Auth, Firestore, FCM)",
      "SQLite",
      "REST APIs",
    ],
  },
  {
    title: "Testing & Delivery",
    description: "Tests, version control, and getting builds out the door.",
    skills: [
      "Jest",
      "Playwright",
      "pgTAP",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Google Play Console",
      "Agile/Scrum",
    ],
  },
  {
    title: "Currently Learning",
    description: "What I'm adding next, on the backend and infrastructure side.",
    skills: ["Node.js", "Express.js", "Prisma ORM", "Docker", "DevOps"],
  },
  {
    // From the resume's summary rather than its skills list.
    title: "AI-Assisted Development",
    description: "Tools I use to ship faster, reviewing every change that ships.",
    skills: ["Claude Code", "Cursor", "Codex", "Antigravity"],
  },
];

// Roles, employers, locations, dates and bullets exactly as the resume states
// them, so the site and the PDF never disagree.
export const experience = [
  {
    title: "Software Engineer (React Native)",
    company: "Verge Systems (WebHR)",
    location: "Karachi",
    period: "Sep 2025 – Present",
    bullets: [
      "Ship and maintain Safco eCredit (5,000+ downloads), Safco Support Foundation's loan-servicing app on Google Play.",
      "Own the Redux Toolkit state layer and REST API integration that connect app screens to backend loan logic.",
      "Built offline-first loan forms and field-level case-revert logic on SQLite, so work continues without internet.",
      "Own Google Play Console rollouts and fix Android/Gradle build failures to keep production releases stable.",
    ],
  },
  {
    title: "Software Engineer (React Native & Flutter)",
    company: "Algorithms Consulting",
    location: "Karachi",
    period: "Jan 2025 – Aug 2025",
    bullets: [
      "Built client app features in React Native and Flutter, turning requirements and UI designs into reusable components.",
      "Integrated REST APIs and state management, fixed device-specific Android/iOS bugs, and validated builds through CI/CD.",
    ],
  },
  {
    title: "Flutter Developer (Contract)",
    company: "Bidbuyy",
    location: "Jamshoro",
    period: "Dec 2023 – Jan 2024",
    bullets: [
      "Built a bidding app with Firebase Auth, real-time Firestore data, FCM push notifications, GetX state and REST APIs.",
    ],
  },
];

export const education = [
  {
    degree: "B.E. Software Engineering",
    institution: "Mehran University of Engineering and Technology (MUET)",
    period: "Nov 2020 – Nov 2024",
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
