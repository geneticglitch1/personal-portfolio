/**
 * The drawing beside the name: the stack, cut in half by a red rule.
 *
 * Three faint dashed layers above the line, three inked ones below it. It sits
 * behind the hero copy as texture rather than as a diagram to be studied — the
 * one line under the name is what explains it, not a caption here.
 */
const ABOVE = ["your app", "framework", "libc · runtime"];
const BELOW = ["kernel · scheduler", "allocator · memory", "silicon"];

const BAND_H = 26;
const STEP = 32;
const DIV_Y = 100;

export default function HeroFigure() {
  return (
    <svg
      viewBox="0 0 280 206"
      role="img"
      aria-label="A software stack: application, framework and runtime above a red line; kernel, allocator and silicon below it"
    >
      {ABOVE.map((label, i) => {
        const y = i * STEP;
        return (
          <g key={label}>
            <rect className="hf-up" x="0" y={y} width="280" height={BAND_H} rx="2" />
            <text className="hf-t" x="12" y={y + BAND_H / 2 + 3.5}>
              {label}
            </text>
          </g>
        );
      })}

      {/* The boundary. Everything the site is about happens below it. */}
      <text className="hf-cap" x="0" y={DIV_Y - 4}>
        ABSTRACTION
      </text>
      <line className="hf-div" x1="86" y1={DIV_Y - 8} x2="280" y2={DIV_Y - 8} />

      {BELOW.map((label, i) => {
        const y = DIV_Y + 8 + i * STEP;
        return (
          <g key={label}>
            <rect className="hf-down" x="0" y={y} width="280" height={BAND_H} rx="2" />
            <text className="hf-t hf-t-down" x="12" y={y + BAND_H / 2 + 3.5}>
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
