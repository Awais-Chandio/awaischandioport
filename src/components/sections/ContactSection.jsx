"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { personalInfo, socials } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);

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

    toast.success("Opening your email client", {
      description: "Your message is drafted and ready to send.",
    });
    event.currentTarget.reset();
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const targets = gsap.utils.toArray("[data-contact-reveal]", sectionRef.current);
      if (!targets.length) return undefined;

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return undefined;
      }

      gsap.set(targets, { opacity: 0, y: 32 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
        onEnter: () =>
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
          }),
      });

      return () => trigger.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-spacing grid min-w-0 gap-12 overflow-hidden lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      id="contact"
    >
      <div data-contact-reveal className="min-w-0 space-y-8">
        <SectionIntro
          eyebrow="Contact"
          title="Have a role, project, or collaboration in mind?"
          description="Reach out for product work, app feature delivery, or collaboration. I am available by email, LinkedIn, and GitHub."
        />

        <div className="border-t border-line/10">
          <div className="border-b border-line/10 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Availability
            </p>
            <p className="mt-3 text-lg font-semibold leading-snug text-fg sm:text-xl">
              {personalInfo.availability}
            </p>
            <p className="mt-3 text-sm leading-7 text-fg-muted">
              Based in {personalInfo.location}. Comfortable working with teams that value
              clear communication, practical delivery, and polished interfaces.
            </p>
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-4 border-b border-line/10 py-6 transition duration-300 hover:border-accent/30"
          >
            <EnvelopeIcon className="h-5 w-5 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="text-sm text-fg-muted">Email</p>
              <p className="mt-1 break-words font-medium text-fg">{personalInfo.email}</p>
            </div>
          </a>

          <a
            href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-4 border-b border-line/10 py-6 transition duration-300 hover:border-accent/30"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm text-fg-muted">Phone</p>
              <p className="mt-1 font-medium text-fg">{personalInfo.phone}</p>
            </div>
          </a>

          <div className="py-6">
            <div className="flex items-center gap-2 text-fg">
              <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-full border border-line/10 px-4 py-2 text-sm font-medium text-fg-muted transition hover:border-accent/40 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-contact-reveal className="min-w-0">
        <Card className="relative overflow-hidden p-5 sm:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <form className="relative space-y-5" onSubmit={handleSubmit}>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-fg-dim">
                Start a conversation
              </p>
              <p className="mt-2 text-xl font-semibold text-fg sm:text-2xl">
                Tell me about the product, role, or collaboration.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-fg-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-line/10 bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-fg-dim focus:border-accent/60"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-fg-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-line/10 bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-fg-dim focus:border-accent/60"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-fg-muted">Subject</span>
              <input
                type="text"
                name="subject"
                required
                placeholder="React Native role, freelance app, product collaboration"
                className="w-full rounded-2xl border border-line/10 bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-fg-dim focus:border-accent/60"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-fg-muted">Message</span>
              <textarea
                name="message"
                rows="6"
                required
                placeholder="Share the scope, goals, and what kind of mobile support you need."
                className="w-full rounded-[24px] border border-line/10 bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-fg-dim focus:border-accent/60"
              />
            </label>

            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Draft Email Message
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
