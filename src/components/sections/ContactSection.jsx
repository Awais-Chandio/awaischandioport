"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import SectionIntro from "@/components/ui/SectionIntro";
import Reveal from "@/components/ui/Reveal";
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
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    setStatus("Your email client is opening with a drafted message.");
    event.currentTarget.reset();
  };

  return (
    <section className="section-spacing grid min-w-0 gap-8 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]" id="contact">
      <Reveal className="space-y-6">
        <SectionIntro
          eyebrow="Contact"
          title="Open to meaningful product work, mobile opportunities, and strong engineering conversations."
          description="If you are hiring for a mobile role, reviewing candidates, or planning a new application, I would be glad to discuss the scope and how I can contribute."
        />

        <div className="panel-strong overflow-hidden p-6 sm:p-7">
          <div className="relative space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-200">Availability</p>
              <p className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
                {personalInfo.availability}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Based in {personalInfo.location}. Comfortable working with teams that value clean delivery, strong communication, and polished mobile products.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="min-w-0 rounded-[24px] border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40"
              >
                <EnvelopeIcon className="h-5 w-5 text-sky-300" />
                <p className="mt-4 text-sm text-slate-400">Email</p>
                <p className="mt-2 break-words font-medium text-white">{personalInfo.email}</p>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                className="min-w-0 rounded-[24px] border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/40"
              >
                <PhoneIcon className="h-5 w-5 text-sky-300" />
                <p className="mt-4 text-sm text-slate-400">Phone</p>
                <p className="mt-2 font-medium text-white">{personalInfo.phone}</p>
              </a>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 text-white">
                <MapPinIcon className="h-5 w-5 text-teal-300" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-teal-300/40 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="panel relative overflow-hidden p-6 sm:p-8">
        <motion.div
          className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl"
          animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <form className="relative space-y-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
                Start a conversation
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                Tell me about the product, role, or collaboration.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/60"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/60"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Subject</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="React Native role, freelance app, product collaboration"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/60"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Message</span>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="Share the scope, goals, and what kind of mobile support you need."
              className="w-full rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/60"
            />
          </label>

          <button type="submit" className="button-primary magnetic">
            Draft Email Message
          </button>

          {status ? <p className="text-sm text-sky-200">{status}</p> : null}
        </form>
      </Reveal>
    </section>
  );
};

export default ContactSection;
