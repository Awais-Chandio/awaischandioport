"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { swap } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  BUDGET_RANGES,
  DESCRIPTION_MAX,
  FIELD_ORDER,
  PROJECT_TYPES,
  TIMELINES,
  validateInquiry,
} from "@/lib/workInquiry";

// Matches the input treatment already used by the contact form: same radius,
// border, surface tint and focus colour, with py-3 keeping the control above a
// 44px touch target.
const controlStyles =
  "w-full rounded-2xl border bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-fg-dim";

const Field = ({ id, label, error, hint, children }) => (
  <div className="block">
    <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg-muted">
      {label}
    </label>
    {children}
    {hint && !error ? (
      <p id={`${id}-hint`} className="mt-2 text-xs text-fg-dim">
        {hint}
      </p>
    ) : null}
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-medium text-accent">
        {error}
      </p>
    ) : null}
  </div>
);

const InquiryForm = () => {
  const formId = useId();
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const fieldId = (name) => `${formId}-${name}`;

  const describedBy = (name, hint) => {
    if (errors[name]) return `${fieldId(name)}-error`;
    return hint ? `${fieldId(name)}-hint` : undefined;
  };

  const controlClass = (name) =>
    cn(
      controlStyles,
      errors[name] ? "border-accent/60" : "border-line/10 focus:border-accent/60"
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const values = {
      projectType: formData.get("projectType") || "",
      budgetRange: formData.get("budgetRange") || "",
      timeline: formData.get("timeline") || "",
      description: formData.get("description") || "",
      email: formData.get("email") || "",
    };

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      // Move focus to the first problem so keyboard and screen reader users are
      // not left guessing which control the error message belongs to.
      const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      toast.error("Check the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/work-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }

      setIsSent(true);
      setErrors({});
      event.target.reset();
      toast.success("Message sent", {
        description: "I read these myself and reply within a couple of days.",
      });
    } catch {
      toast.error("Could not reach the server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // `mode="wait"` rather than a crossfade: the two panels differ a lot in
  // height, and overlapping them would make the column jump. Only opacity and a
  // 6px rise animate, so neither panel triggers layout while it moves.
  const successPanel = (
    <motion.div key="sent" variants={swap} initial="hidden" animate="visible" exit="exit">
      <Card className="p-6 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent">
          <CheckCircleIcon aria-hidden="true" className="h-7 w-7" />
        </div>
        <h2
          tabIndex={-1}
          ref={(node) => node?.focus()}
          className="mt-6 font-display text-xl font-medium text-fg outline-none sm:text-2xl"
        >
          Thanks — that came through.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-fg-muted">
          I read every enquiry myself and reply within a couple of days. If it is
          urgent, email is the fastest route.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => setIsSent(false)}
        >
          Send another
        </Button>
      </Card>
    </motion.div>
  );

  const formPanel = (
    <motion.div key="form" variants={swap} initial="hidden" animate="visible" exit="exit">
      <Card className="relative overflow-hidden p-5 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
        />

        <form ref={formRef} noValidate onSubmit={handleSubmit} className="relative space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={fieldId("projectType")} label="Project type" error={errors.projectType}>
              <select
                id={fieldId("projectType")}
                name="projectType"
                defaultValue=""
                aria-invalid={Boolean(errors.projectType)}
                aria-describedby={describedBy("projectType")}
                className={controlClass("projectType")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {PROJECT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={fieldId("budgetRange")} label="Rough budget" error={errors.budgetRange}>
              <select
                id={fieldId("budgetRange")}
                name="budgetRange"
                defaultValue=""
                aria-invalid={Boolean(errors.budgetRange)}
                aria-describedby={describedBy("budgetRange")}
                className={controlClass("budgetRange")}
              >
                <option value="" disabled>
                  Select a range
                </option>
                {BUDGET_RANGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id={fieldId("timeline")} label="Timeline" error={errors.timeline}>
            <select
              id={fieldId("timeline")}
              name="timeline"
              defaultValue=""
              aria-invalid={Boolean(errors.timeline)}
              aria-describedby={describedBy("timeline")}
              className={controlClass("timeline")}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {TIMELINES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id={fieldId("description")}
            label="Project description"
            error={errors.description}
            hint="What you are building, what stage it is at, and what you need from me."
          >
            <textarea
              id={fieldId("description")}
              name="description"
              rows={6}
              maxLength={DESCRIPTION_MAX}
              placeholder="A short summary is enough to start."
              aria-invalid={Boolean(errors.description)}
              aria-describedby={describedBy("description", true)}
              className={cn(controlClass("description"), "rounded-[24px]")}
            />
          </Field>

          <Field id={fieldId("email")} label="Your email" error={errors.email}>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={controlClass("email")}
            />
          </Field>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Sending…" : "Send enquiry"}
          </Button>

          <p className="text-xs leading-6 text-fg-dim">
            Goes straight to me. No newsletter, no third-party marketing tools.
          </p>
        </form>
      </Card>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSent ? successPanel : formPanel}
    </AnimatePresence>
  );
};

export default InquiryForm;
