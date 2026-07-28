const AA = "url(#arw-a)";

/**
 * The Experience strip: what actually changed at UIC.
 *
 * Same viewBox width as the card diagrams (362) so the type lands at the same
 * size on a phone; `.offload` caps the width on desktop so it can't scale up
 * into a billboard.
 *
 * The slots are colour-coded rather than labelled — twelve tiny words in a
 * row is noise, and the legend carries it in one line. `x-slot` is the second
 * lane arriving a slot at a time; each one gets its own animation-range
 * inline, because a scroll timeline staggers by range, not by delay.
 */
export default function Offload() {
  const N = 8;
  const at = (i: number) => 8 + i * 44;
  const sched = [0, 2, 4, 6];

  return (
    <svg viewBox="0 0 362 228" role="img" aria-label="Half the CPU's slots were scheduling; once the FPGA owned the queue, all of them ran work">
      <text className="d-t-head" x="4" y="13">host cpu — before</text>
      <text className="d-t-accent" x="358" y="13" textAnchor="end">red = scheduling</text>

      {Array.from({ length: N }).map((_, i) => (
        <rect
          key={i}
          className={sched.includes(i) ? "d-accent-box" : "d-box"}
          x={at(i)}
          y="20"
          width="38"
          height="30"
          rx="2"
        />
      ))}

      {/* scheduling leaves the host */}
      {sched.map((i, k) => (
        <path
          key={i}
          className="d-accent-line d-flow"
          pathLength={1}
          d={`M ${at(i) + 19} 50 L ${at(i) + 19} 72`}
          markerEnd={AA}
          style={{ animationRange: `entry ${16 + k * 4}% cover ${34 + k * 4}%` }}
        />
      ))}

      <rect className="d-accent-box d-pop" x="8" y="76" width="346" height="40" rx="3" />
      <text className="d-t-accent" x="181" y="95" textAnchor="middle">XILINX ALVEO U55C</text>
      <text className="d-t-sm" x="181" y="109" textAnchor="middle">the scheduler, in hardware</text>

      <text className="d-t-head" x="4" y="137">host cpu — after</text>
      {Array.from({ length: N }).map((_, i) => (
        <rect
          key={i}
          className="d-box x-slot"
          x={at(i)}
          y="144"
          width="38"
          height="30"
          rx="2"
          style={{ animationRange: `entry ${30 + i * 3}% cover ${50 + i * 3}%` }}
        />
      ))}

      <text className="d-t-accent d-late" x="181" y="198" textAnchor="middle">every slot that was scheduling</text>
      <text className="d-t-sm" x="181" y="216" textAnchor="middle">is running work instead</text>
    </svg>
  );
}
