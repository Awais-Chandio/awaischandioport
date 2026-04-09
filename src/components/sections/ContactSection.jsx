"use client";

import { useState } from "react";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import SectionIntro from "@/components/ui/SectionIntro";
import { personalInfo, socials } from "@/data/portfolio";

const ContactSection = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;

    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    setStatus("Your email app is opening with the message draft.");
    event.currentTarget.reset();
  };

  return (
    <section className="section-spacing grid gap-8 lg:grid-cols-[0.9fr_1.1fr]" id="contact">
      <div className="space-y-6">
        <SectionIntro
          eyebrow="Contact"
          title="Let’s build something useful and visually strong."
          description="If you need a Flutter app, a Firebase-connected product, or a cleaner UI layer for an existing project, I’m available to discuss the scope."
        />

        <div className="panel space-y-5 p-6">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.26em] text-accent">
              Availability
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {personalInfo.availability}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Based in {personalInfo.location}. Comfortable with remote collaboration and product-focused delivery.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-brand/60"
            >
              <EnvelopeIcon className="h-5 w-5 text-brand" />
              <p className="mt-4 text-sm text-slate-300">Email</p>
              <p className="mt-1 font-medium text-white">{personalInfo.email}</p>
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:border-brand/60"
            >
              <PhoneIcon className="h-5 w-5 text-brand" />
              <p className="mt-4 text-sm text-slate-300">Phone</p>
              <p className="mt-1 font-medium text-white">{personalInfo.phone}</p>
            </a>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 text-white">
              <MapPinIcon className="h-5 w-5 text-brand" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-accent/60 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="panel p-6 sm:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Muhammad Awais"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-brand/70"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-brand/70"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Subject</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Project discussion"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-brand/70"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Message</span>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="Tell me about the app, features, and timeline."
              className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-brand/70"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand"
          >
            Draft Email Message
          </button>

          {status ? <p className="text-sm text-accent">{status}</p> : null}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
