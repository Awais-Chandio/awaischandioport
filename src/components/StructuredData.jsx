import { personalInfo } from "@/data/portfolio";
import { services } from "@/data/services";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/**
 * schema.org graph for the home page. Every value is read from existing site
 * data rather than restated, so the markup cannot contradict the visible page —
 * which is the thing search engines penalise.
 */
const StructuredData = () => {
  const personId = `${siteUrl}/#person`;

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: personalInfo.name,
      jobTitle: personalInfo.role,
      description: personalInfo.headline,
      email: `mailto:${personalInfo.email}`,
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      sameAs: [personalInfo.githubUrl, personalInfo.linkedinUrl],
      knowsAbout: [
        "React Native",
        "Flutter",
        "Mobile App Development",
        "Supabase",
        "REST API Integration",
      ],
      worksFor: { "@type": "Organization", name: personalInfo.currentCompany },
      alumniOf: { "@type": "CollegeOrUniversity", name: personalInfo.university },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressCountry: "PK",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${personalInfo.name} — Mobile App Engineering`,
      description:
        "Freelance mobile app engineering: cross-platform builds, startup MVPs, API and backend integration, and ongoing app maintenance.",
      url: `${siteUrl}/services`,
      provider: { "@id": personId },
      areaServed: "Worldwide",
      availableLanguage: "English",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: personalInfo.name,
      publisher: { "@id": personId },
      inLanguage: "en-US",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Values come from local data files, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
};

export default StructuredData;
