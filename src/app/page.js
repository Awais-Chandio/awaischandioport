import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
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
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-white">
      <AnimatedBackground />
      <Navbar />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-20 pt-28 sm:px-6 md:gap-24 lg:gap-28 lg:px-8 lg:pt-32">
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
