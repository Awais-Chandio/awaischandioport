import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import SectionDivider from "@/components/ui/SectionDivider";

/**
 * Structural wrapper for standalone routes. It mirrors the home page frame
 * exactly — same `.container-page` gutters and vertical rhythm — so a new page
 * inherits the design system instead of restating it. The background and nav
 * are no longer repeated here: the root layout owns both.
 *
 * Children sit in a flex column with half a section of gap either side of a
 * divider, so every block a page passes in is separated by the same full
 * section spacing the home page uses.
 */
const PageShell = ({ eyebrow, title, headingId, lead, children }) => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-fg">
      <div className="container-page relative flex min-h-[60vh] flex-col gap-section-half pb-section pt-28 lg:pt-36">
        <header className="max-w-3xl">
          <Badge variant="accent" size="sm">
            {eyebrow}
          </Badge>
          <h1 id={headingId} className="text-balance mt-5 text-fg">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 text-sm leading-7 text-fg-muted sm:text-lg sm:leading-8">{lead}</p>
          ) : null}
        </header>

        <SectionDivider />

        {children}
      </div>

      <Footer />
    </main>
  );
};

export default PageShell;
