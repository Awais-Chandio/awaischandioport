import { projects } from "@/data/projects";

/**
 * Services are proof-first: every entry points at a real project record in
 * `projects.js` by id, so titles and links stay in sync with the Work section
 * instead of being restated here. `label` is a display-only shortening of a
 * project title; `note` states only what that project's own record documents.
 */
const projectById = (id) => projects.find((project) => project.id === id);

// The Work section opens case studies in a modal with no per-project URL, so a
// proof link resolves to the project's own canonical artifact — the store
// listing where one exists, otherwise the repository.
export const resolveProof = (proof) => {
  const project = projectById(proof.id);
  if (!project) return null;

  const href = project.liveUrl || project.gitUrl || "/#projects";
  let source = "Work section";
  if (project.liveUrl) source = "Google Play";
  else if (project.gitUrl) source = "GitHub";

  return {
    key: proof.id,
    label: proof.label || project.title,
    status: project.status,
    note: proof.note,
    href,
    source,
  };
};

export const services = [
  {
    id: "mobile-app-development",
    number: "01",
    title: "Mobile App Development",
    stack: "React Native · Flutter",
    description:
      "Cross-platform apps built from the navigation structure and state layer up to the screens people actually use. The work runs through to a release build on Android and iOS, not a prototype that stops at the design file.",
    audience:
      "Teams with a defined product who need it built as a shippable app by someone who will own the structure, not just the screens.",
    proofs: [
      {
        id: "safco-e-credit",
        label: "SAFCO E-Credit",
        note:
          "28 screens and 12 flows across loan, repayment, profile and complaint journeys, published on Google Play as Safco eCredit.",
      },
    ],
  },
  {
    id: "mvp-development",
    number: "02",
    title: "MVP Development for Startups",
    stack: "React Native · TypeScript · Supabase",
    description:
      "A first working version with the core journey complete — authentication, the primary flow, and a real backend behind it. Scope stays on what has to exist before the product can be put in front of users.",
    audience:
      "Founders validating an idea who need something functional to test with, rather than a click-through mock.",
    proofs: [
      {
        id: "queueless",
        label: "QueueLess",
        note:
          "Built to a functional MVP: 13 screens covering service center browsing, booking, appointment tracking and profile, on Supabase auth and tables.",
      },
    ],
  },
  {
    id: "api-integration",
    number: "03",
    title: "API Integration & Backend Connectivity",
    stack: "Supabase · REST APIs",
    description:
      "Connecting an app to the services behind it: REST endpoints, authentication, persisted sessions and third-party gateways. Integrations sit behind a centralized service layer so they stay readable as the API surface grows.",
    audience:
      "Teams with an existing backend or third-party provider that needs to be wired into a mobile client reliably.",
    proofs: [
      {
        id: "safco-e-credit",
        label: "SAFCO E-Credit",
        note:
          "A service layer of 30 methods against the SAFCO APIs, with JazzCash, EasyPaisa, HBL Connect and PayPro payment flows through WebView redirects.",
      },
      {
        id: "queueless",
        label: "QueueLess",
        note:
          "Supabase auth with automatic session restore, over profiles, centers, center_services and appointments tables.",
      },
    ],
  },
  {
    id: "maintenance-performance",
    number: "04",
    title: "App Maintenance, Bug-Fixing & Performance",
    stack: "Debugging · Refactoring · Release upkeep",
    description:
      "Continued work on an app that is already running: fixing defects, tightening slow screens, and reducing the structural mess that makes each change harder than the last.",
    audience:
      "Teams with a live or in-development app that needs steady upkeep and targeted improvement rather than a rebuild.",
    proofs: [
      {
        id: "safco-e-credit",
        label: "SAFCO E-Credit",
        note:
          "Maintained as a live Android release at version 1.16, with reusable form controls and persisted language and theme state.",
      },
      {
        id: "foodapp",
        label: "FoodApp",
        note:
          "Memoized filtered lists, SQLite caching and skeleton and empty states introduced to keep browsing responsive.",
      },
    ],
  },
];
