/**
 * "How I work" steps, shown on /services.
 *
 * REVIEW: this whole file is a DRAFT. It describes a standard client process in
 * general terms and is not a record of how Awais actually runs a project. Every
 * description below should be read, corrected or replaced before this is treated
 * as final. In `npm run dev` each step carries a visible "Draft" marker whose
 * note says what to check; the marker never renders in production.
 *
 * Wording deliberately stays close to claims the site already makes elsewhere
 * (the /work-with-me "We scope it properly" step, the Services descriptions, and
 * the resume's Git, code review, Play Console and testing lines) and states no
 * durations, deliverables or guarantees.
 */
export const processSteps = [
  {
    title: "Discovery & Scope",
    description:
      "We agree what is being built, in what order, and what is out of scope, so both sides are working from the same picture.",
    review:
      "Confirm this matches your real first step. Add a written scope or estimate here only if you actually provide one.",
  },
  {
    title: "Planning & Architecture",
    description:
      "Navigation structure, state layer and the way the app talks to its backend are settled before screens are built, so the foundations do not need reworking later.",
    review: "Confirm you plan up front like this, and whether you share the plan with the client.",
  },
  {
    title: "Build",
    description:
      "Built in small, reviewable steps in Git, with progress shared as it lands so feedback arrives while changes are still cheap.",
    review:
      "Confirm how often, and in what form (builds, demos, updates), a client actually sees progress.",
  },
  {
    title: "Test & QA",
    description:
      "Checked on Android and iOS, with defects fixed and the loading, empty and error states covered before anything is released.",
    review: "Confirm the platforms and kinds of testing you really do (devices, emulators, automated tests).",
  },
  {
    title: "Deploy & Handover",
    description:
      "A release build goes out through the store, then the code and the context needed to keep working on it are handed over.",
    review:
      "Confirm what handover includes (repo access, documentation, walkthrough) and whether you submit to the stores yourself.",
  },
];
