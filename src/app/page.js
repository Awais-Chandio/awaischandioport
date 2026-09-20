import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import EducationSection from "@/components/sections/EducationSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import NowExploring from "@/components/now/NowExploring";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import SectionDivider from "@/components/ui/SectionDivider";
import StructuredData from "@/components/StructuredData";
import { getPostsByProject } from "@/lib/writing";

export const metadata = {
  // Home keeps the full descriptive title, so it opts out of the "%s | Muhammad
  // Awais" template the child routes use.
  title: { absolute: "Muhammad Awais | React Native Developer" },
  description:
    "Portfolio of Muhammad Awais, a React Native developer building cross-platform mobile apps in React Native and Flutter for Android and iOS.",
  alternates: { canonical: "/" },
};

export default function Home() {
  // Published posts only; drafts never appear as a case-study cross-link.
  const postsByProject = getPostsByProject();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-fg">
      <StructuredData />

      {/* Sections are separated by `--space-section` (globals.css), split as half a
          section of gap either side of a hairline divider, so the page reads as
          one continuous flow instead of stacked blocks. */}
      <div className="container-page relative flex flex-col gap-section-half pb-section pt-28 lg:pt-36">
        <HeroSection />
        {/* Half a section of gap from the hero, so it reads as attached to it. */}
        <NowExploring />
        <SectionDivider />
        {/* Work sits directly under the hero: a visiting client's first
            question is what I have built, not who I am. */}
        <ProjectsSection postsByProject={postsByProject} />
        <SectionDivider />
        {/* Capabilities follow the proof directly. About and Experience are the
            longer narrative reads, so they come after both. */}
        <SkillsSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
