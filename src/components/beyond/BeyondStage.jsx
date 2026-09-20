"use client";

import { Component, useState } from "react";
import dynamic from "next/dynamic";
import InterestList from "@/components/beyond/InterestList";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// The whole 3D scene — three, react-three-fiber, drei, postprocessing — is
// behind this dynamic import, so its chunk is fetched the first time a visitor
// opens the panel and never for anyone else. It is also never fetched when
// reduced motion is on, because this line only runs once <BeyondScene> renders.
const BeyondScene = dynamic(() => import("@/components/beyond/BeyondScene"), {
  ssr: false,
  loading: () => <StageSkeleton />,
});

// Holds the stage's footprint while the chunk arrives, so the dialog does not
// resize under the visitor when the scene lands.
function StageSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="night-scope h-[min(30rem,62dvh)] min-h-[22rem] rounded-[28px] border border-line/10 bg-canvas"
    />
  );
}

// A failed chunk load or a WebGL context that dies mid-session should leave the
// visitor with the content, not an empty box.
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <InterestList /> : this.props.children;
  }
}

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * Chooses what the panel shows. Reduced motion, or a browser with no WebGL,
 * gets the static cards: the same four interests and captions, with no
 * animation and no canvas. Everyone else gets the orb scene.
 */
const BeyondStage = () => {
  const reducedMotion = usePrefersReducedMotion();
  // Only ever rendered in the browser (the dialog mounts on open), so this runs
  // once, on the client.
  const [canRender] = useState(hasWebGL);

  if (reducedMotion || !canRender) return <InterestList />;

  return (
    <SceneBoundary>
      <BeyondScene />
    </SceneBoundary>
  );
};

export default BeyondStage;
