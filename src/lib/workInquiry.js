/**
 * Single source of truth for the Work With Me form: the same option lists and
 * the same validation run on the client (for immediate feedback) and again in
 * the route handler (because client-side checks are a convenience, not a
 * guarantee). Shared so the two can never drift apart.
 */

export const PROJECT_TYPES = [
  "Mobile App",
  "MVP / Startup Idea",
  "API / Backend Work",
  "Bug Fix / Maintenance",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $7,000",
  "$7,000 - $15,000",
  "$15,000+",
  "Prefer not to say",
];

export const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Flexible"];

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 2000;
export const EMAIL_MAX = 254;

// Deliberately permissive: the job is to catch typos and obvious junk, not to
// adjudicate RFC 5322. Anything stricter rejects real addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateInquiry = (values) => {
  const errors = {};
  const email = (values.email || "").trim();
  const description = (values.description || "").trim();

  if (!email) {
    errors.email = "Enter the email address I should reply to.";
  } else if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    errors.email = "That email address does not look right.";
  }

  if (!PROJECT_TYPES.includes(values.projectType)) {
    errors.projectType = "Choose the type of project.";
  }

  if (!BUDGET_RANGES.includes(values.budgetRange)) {
    errors.budgetRange = "Choose a budget range, or select prefer not to say.";
  }

  if (!TIMELINES.includes(values.timeline)) {
    errors.timeline = "Choose a timeline.";
  }

  if (!description) {
    errors.description = "Describe the project.";
  } else if (description.length < DESCRIPTION_MIN) {
    errors.description = `Add a little more detail — at least ${DESCRIPTION_MIN} characters.`;
  } else if (description.length > DESCRIPTION_MAX) {
    errors.description = `Keep this under ${DESCRIPTION_MAX} characters.`;
  }

  return errors;
};

/** Field order used for focusing the first invalid control after a failed submit. */
export const FIELD_ORDER = [
  "projectType",
  "budgetRange",
  "timeline",
  "description",
  "email",
];
