/**
 * Shared OpenGraph image. A page that declares its own `openGraph` block
 * replaces the one inherited from the root layout wholesale, so any page doing
 * that must spread this back in or it silently ships without a preview image.
 */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Muhammad Awais — Mobile App Engineer",
};
