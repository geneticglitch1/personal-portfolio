/**
 * The paper layer behind every card.
 *
 * Four fixed layers under the whole document — two colour washes, the dot
 * grid, and grain. The washes and the grid travel as the page scrolls, which
 * is what gives the background a sense of moving through the site rather than
 * sitting still behind it.
 *
 * A server component with no props and no state: the motion is a CSS scroll
 * timeline (see `.backdrop` in globals.css), so this ships as static markup
 * and costs nothing at runtime. It replaced a provider that wrote a scroll
 * velocity variable onto :root every frame, which invalidated style for the
 * entire document on each one.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <i className="bd-warm" />
      <i className="bd-cool" />
      <i className="bd-dots" />
      <i className="bd-grain" />
    </div>
  );
}
