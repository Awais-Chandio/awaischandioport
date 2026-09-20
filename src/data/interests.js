/**
 * "Beyond the Code" — the four interests behind the quiet orb panel that opens
 * from the footer link and the command palette (components/beyond).
 *
 * To change a caption: edit the `caption` string. To add or remove an interest:
 * add or delete an object. The scene is laid out for exactly four orbs
 * (components/beyond/BeyondScene.jsx), so keep it at four unless that is
 * updated with it.
 *
 * `status` says how much of a caption is settled, mirroring data/faq.js:
 *   "placeholder" — a draft caption. The wording is a stand-in Awais should
 *                   tighten; nothing beyond it has been invented.
 *
 * REVIEW: every caption below is `placeholder`. `review` says what to decide.
 * In `npm run dev` the panel shows a "Draft" marker on each; it never renders in
 * production.
 */
export const interests = [
  {
    id: "space",
    label: "Space & Astronomy",
    caption:
      "Always curious about the universe — from black holes to the latest space exploration news.",
    status: "placeholder",
    review: "PLACEHOLDER caption. Tighten the wording, or add a specific favourite topic.",
  },
  {
    id: "gaming",
    label: "Gaming",
    caption: "Enjoys gaming in downtime.",
    status: "placeholder",
    review: "PLACEHOLDER caption. Very short on purpose; name a genre or favourite game if you like.",
  },
  {
    id: "reading",
    label: "Reading",
    caption: "Reads books and articles outside of tech.",
    status: "placeholder",
    review: "PLACEHOLDER caption. Add a favourite author, book or subject if you want it to feel personal.",
  },
  {
    id: "watching",
    label: "Movies, TV & Anime",
    caption: "Enjoys watching in free time.",
    status: "placeholder",
    review: "PLACEHOLDER caption. Very short on purpose; a favourite show or film would help.",
  },
];
