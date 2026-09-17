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

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-canvas text-fg">
      <AnimatedBackground />
      <Navbar />

      <div className="container-page relative flex flex-col gap-14 pb-16 pt-24 sm:gap-20 sm:pb-20 md:gap-24 lg:gap-28 lg:pt-32">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
