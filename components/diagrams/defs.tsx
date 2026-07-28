/**
 * Arrowheads, defined once for the whole page.
 *
 * Marker ids are document-global, so 23 diagrams can share one pair rather
 * than each carrying its own <defs>. Rendered from app/page.tsx into a
 * zero-size SVG.
 */
export default function DiagramDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <marker
          id="arw"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)" />
        </marker>
        <marker
          id="arw-a"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
        <marker
          id="arw-dim"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(34,30,24,0.34)" />
        </marker>
      </defs>
    </svg>
  );
}

/** Every diagram draws into the same box, so the grid stays even. */
export const VB = "0 0 360 220";
