/**
 * FAQ shown on /work-with-me, under the enquiry form.
 *
 * "How do we get started?" is intentionally absent: the "What happens next"
 * list beside the form already answers it, and repeating it would put the same
 * three steps on one screen twice.
 *
 * `status` says how much of an answer is fact:
 *   "fact"        — taken from the resume or the Skills section; safe as written.
 *   "placeholder" — deliberately commits to nothing. Awais should replace it with
 *                   the real answer (a number, a term, a policy).
 *
 * REVIEW: every `placeholder` answer is a stand-in, not a commitment, and no
 * number, price, payment term or support window has been invented. `review`
 * says what to fill in. In `npm run dev` both statuses show a "Draft" marker on
 * the question; it never renders in production.
 */
export const faqItems = [
  {
    question: "What is your typical turnaround time?",
    answer:
      "It depends on the scope, so I would rather not quote a number before I understand what is being built. Once we have talked it through I will give you a realistic estimate, and tell you if the timeline you have in mind does not look workable.",
    status: "placeholder",
    review:
      "PLACEHOLDER. Replace with your real turnaround, e.g. typical ranges for an MVP vs a feature. Left number-free on purpose.",
  },
  {
    question: "Do you work with clients in different timezones?",
    answer:
      "Yes. I am based in Hyderabad, Pakistan (Asia/Karachi, UTC+5). Most of the work happens asynchronously, and for calls we can find a time that suits both of us.",
    status: "fact",
    review:
      "Timezone is factual. Confirm the async-first line and add overlap hours if you want to promise any.",
  },
  {
    question: "What is your tech stack, and can you work in an existing codebase?",
    answer:
      "Mobile apps in React Native and Flutter for Android and iOS, in TypeScript, JavaScript and Dart, with Supabase, Firebase, SQLite and REST APIs behind them. Working inside an existing codebase is normal for me: I ship and maintain a live production app for my current employer.",
    status: "fact",
    review:
      "Stack is from the Skills section and the resume. Confirm you are comfortable saying you take on existing codebases from outside clients.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Ongoing maintenance and bug-fixing is one of the services I offer. How long support runs after handover, and on what terms, is agreed per project.",
    status: "placeholder",
    review:
      "PLACEHOLDER. Replace with your real policy, e.g. any free fix window after launch and how ongoing support is billed.",
  },
  {
    question: "How do you price projects?",
    answer:
      "There is no flat rate, because it depends on the scope. The enquiry form asks for a budget range and timeline so I can tell you honestly whether it is a fit. Pricing and payment terms are agreed once the scope is.",
    status: "placeholder",
    review:
      "PLACEHOLDER. Replace with your real model (fixed price, hourly, milestones), deposit and payment terms.",
  },
];
