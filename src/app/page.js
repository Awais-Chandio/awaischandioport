import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_20%_15%,rgba(99,102,241,0.12),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-sky-500/[0.14] blur-3xl animate-drift" />
        <div className="absolute right-[10%] top-[18rem] h-72 w-72 rounded-full bg-indigo-500/[0.12] blur-3xl animate-drift-delayed" />
        <div className="absolute bottom-[12rem] left-[24%] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl animate-drift" />
      </div>

      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-4 pb-20 pt-28 sm:px-6 lg:gap-28 lg:px-8 lg:pt-32">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
