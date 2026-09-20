import PageShell from "@/components/layout/PageShell";
import ProcessSection from "@/components/process/ProcessSection";
import ServicesSection from "@/components/services/ServicesSection";

export const metadata = {
  title: "Services",
  description:
    "Mobile app development, MVP builds, API integration, and app maintenance — each backed by a project from the Work section.",
};

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Services"
      title="Services"
      headingId="services-heading"
      lead="Four areas I take on, each one tied to a project already in the Work section so you can check the result before starting a conversation."
    >
      <ServicesSection>
        <ProcessSection />
      </ServicesSection>
    </PageShell>
  );
}
