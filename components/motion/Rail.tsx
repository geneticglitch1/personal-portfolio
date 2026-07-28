/**
 * The ruled edge down the left margin.
 *
 * Deliberately a server component with no state: the ticks are a background,
 * and the ink that fills them is a CSS scroll-timeline animation. The version
 * this replaces drove a spring from `useScroll` every frame to move a 1px
 * hairline and a dot, which cost a render loop and read as a stray mark.
 *
 * Positioning and the hide-on-narrow rule live in globals.css (`.rail`).
 */
export default function Rail() {
  return (
    <div className="rail" aria-hidden="true">
      <i>
        <b />
      </i>
    </div>
  );
}
