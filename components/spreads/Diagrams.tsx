/**
 * Technical diagrams, one per headline project.
 *
 * House style: 1.4px ink strokes on white, mono labels, and the accent used
 * only where it carries meaning — the gate that blocks, the copy that was
 * removed, the tile that stays resident. Nothing here is decorative.
 *
 * Every diagram is a plain viewBox'd SVG that scales with its container, so
 * there is no measurement, no layout effect and nothing to get stuck.
 */

/** Arrowheads have to be per-diagram: marker ids are document-global. */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-a`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink)" />
      </marker>
      <marker
        id={`${id}-b`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
      </marker>
    </defs>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SENTINEL — the dry-run gate
   ══════════════════════════════════════════════════════════════════════════ */
export function SentinelDiagram() {
  const m = "url(#sn-a)";
  const ma = "url(#sn-b)";
  return (
    <svg viewBox="0 0 560 404" role="img" aria-label="Every Sentinel tool call passes through a dry-run gate before reaching a provider">
      <Defs id="sn" />
      <text className="d-head" x="0" y="10">request</text>

      <rect className="d-box-soft" x="170" y="18" width="220" height="30" rx="2" />
      <text className="d-t" x="280" y="37" textAnchor="middle">&quot;expose 5432 on the docker host&quot;</text>
      <line className="d-line" x1="280" y1="48" x2="280" y2="64" markerEnd={m} />

      <rect className="d-box" x="150" y="66" width="260" height="34" rx="2" />
      <text className="d-t" x="280" y="87" textAnchor="middle">agent — works out the tool calls</text>
      <line className="d-line" x1="280" y1="100" x2="280" y2="116" markerEnd={m} />

      <rect className="d-box" x="150" y="118" width="260" height="34" rx="2" />
      <text className="d-t" x="280" y="139" textAnchor="middle">tools.py — one definition each</text>
      <line className="d-line" x1="280" y1="152" x2="280" y2="174" markerEnd={m} />

      {/* the gate */}
      <rect className="d-accent-box" x="120" y="176" width="320" height="50" rx="2" />
      <text className="d-t-accent" x="280" y="197" textAnchor="middle">DRY-RUN GATE</text>
      <text className="d-t-sm" x="280" y="213" textAnchor="middle">anything that changes state needs confirm=true</text>

      {/* refused path */}
      <path className="d-line-dim d-dash" d="M 180 226 L 180 266 L 95 266 L 95 282" markerEnd={m} />
      <text className="d-t-sm" x="118" y="258">confirm=false</text>
      <rect className="d-box-soft" x="20" y="284" width="150" height="44" rx="2" />
      <text className="d-t" x="95" y="303" textAnchor="middle">prints the plan</text>
      <text className="d-t-sm" x="95" y="317" textAnchor="middle">and stops</text>

      {/* applied path */}
      <path className="d-accent-line" d="M 380 226 L 380 264" markerEnd={ma} />
      <text className="d-t-sm" x="390" y="250">confirm=true</text>
      <path className="d-line" d="M 245 264 L 485 264" />
      <line className="d-line" x1="245" y1="264" x2="245" y2="282" markerEnd={m} />
      <line className="d-line" x1="365" y1="264" x2="365" y2="282" markerEnd={m} />
      <line className="d-line" x1="485" y1="264" x2="485" y2="282" markerEnd={m} />

      <rect className="d-box" x="190" y="284" width="110" height="44" rx="2" />
      <text className="d-t" x="245" y="303" textAnchor="middle">Proxmox</text>
      <text className="d-t-sm" x="245" y="317" textAnchor="middle">VMs · LXC</text>

      <rect className="d-box" x="310" y="284" width="110" height="44" rx="2" />
      <text className="d-t" x="365" y="303" textAnchor="middle">OPNsense</text>
      <text className="d-t-sm" x="365" y="317" textAnchor="middle">configctl only</text>

      <rect className="d-box" x="430" y="284" width="110" height="44" rx="2" />
      <text className="d-t" x="485" y="303" textAnchor="middle">Docker host</text>
      <text className="d-t-sm" x="485" y="317" textAnchor="middle">containers</text>

      {/* audit log takes both */}
      <path className="d-line-dim d-dash" d="M 95 328 L 95 356" />
      <path className="d-line-dim d-dash" d="M 365 328 L 365 356" />
      <rect className="d-box-soft" x="20" y="358" width="520" height="32" rx="2" />
      <text className="d-t" x="280" y="378" textAnchor="middle">audit log — every call, planned or applied</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TRADING AGENT — the nightly pipeline
   ══════════════════════════════════════════════════════════════════════════ */
export function TradingDiagram() {
  const m = "url(#tr-a)";
  const personas = ["Nova", "Warren-lite", "Atlas", "Maverick"];
  return (
    <svg viewBox="0 0 560 400" role="img" aria-label="Four personas research overnight, a risk committee vetoes, then guardrails size the orders">
      <Defs id="tr" />

      <text className="d-head" x="0" y="10">overnight</text>
      <line className="d-line-dim" x1="20" y1="26" x2="540" y2="26" />
      {[
        { x: 22, t: "23:55" },
        { x: 232, t: "03:30" },
      ].map((k) => (
        <g key={k.t}>
          <line className="d-line-dim" x1={k.x} y1="22" x2={k.x} y2="30" />
          <text className="d-t-sm" x={k.x} y="19" textAnchor="middle">{k.t}</text>
        </g>
      ))}

      {/* one model, time-sliced */}
      {personas.map((p, i) => {
        const x = 20 + i * 108;
        return (
          <g key={p}>
            <rect className="d-box" x={x} y="38" width="100" height="30" rx="2" />
            <text className="d-t" x={x + 50} y="57" textAnchor="middle">{p}</text>
          </g>
        );
      })}
      <text className="d-t-sm" x="22" y="88">one model, one at a time — unused budget rolls over to whoever is left</text>

      <line className="d-accent-line" x1="452" y1="16" x2="452" y2="76" />
      <text className="d-t-accent" x="458" y="46">HARD STOP</text>
      <text className="d-t-sm" x="458" y="58">07:00</text>

      <path className="d-line" d="M 280 96 L 280 112" markerEnd={m} />
      <rect className="d-box-soft" x="180" y="114" width="200" height="28" rx="2" />
      <text className="d-t" x="280" y="132" textAnchor="middle">theses → JSON on disk</text>
      <path className="d-line" d="M 280 142 L 280 160" markerEnd={m} />

      {/* committee */}
      <rect className="d-accent-box" x="130" y="162" width="300" height="56" rx="2" />
      <text className="d-t-accent" x="280" y="180" textAnchor="middle">RISK COMMITTEE</text>
      <text className="d-t-sm" x="280" y="194" textAnchor="middle">reviews the whole book, per-pick verdict</text>
      <text className="d-t-accent" x="280" y="210" textAnchor="middle">APPROVE · REDUCE · VETO</text>
      <path className="d-line" d="M 280 218 L 280 232" markerEnd={m} />

      {/* guardrails */}
      <rect className="d-box" x="130" y="234" width="300" height="52" rx="2" />
      <text className="d-t" x="280" y="253" textAnchor="middle">guardrails.py — pure, unit-tested</text>
      <text className="d-t-sm" x="280" y="268" textAnchor="middle">dedupe · per-day caps · sizing · buying power</text>
      <text className="d-t-accent" x="280" y="281" textAnchor="middle">the model&apos;s stops and sizes are clamped here</text>

      <path className="d-line" d="M 280 286 L 280 304" markerEnd={m} />
      <path className="d-line" d="M 95 304 L 465 304" />
      {[95, 218, 342, 465].map((x, i) => (
        <g key={x}>
          <line className="d-line" x1={x} y1="304" x2={x} y2="322" markerEnd={m} />
          <rect className="d-box-soft" x={x - 52} y="324" width="104" height="34" rx="2" />
          <text className="d-t" x={x} y="341" textAnchor="middle">paper acct {i + 1}</text>
          <text className="d-t-sm" x={x} y="353" textAnchor="middle">GTC bracket</text>
        </g>
      ))}
      <text className="d-t-sm" x="280" y="378" textAnchor="middle">separate books, so the personas stay comparable · 08:30, gated on the broker clock</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   GPT-2 CUDA — where the working set lives
   ══════════════════════════════════════════════════════════════════════════ */
export function CudaDiagram() {
  const ma = "url(#cu-b)";
  const bands = [
    { label: "registers", y: 44, h: 22 },
    { label: "shared memory", y: 70, h: 28 },
    { label: "L2", y: 102, h: 24 },
    { label: "HBM", y: 130, h: 36 },
  ];
  return (
    <svg viewBox="0 0 560 320" role="img" aria-label="Naive attention streams through HBM every step; tiling keeps the working set in shared memory">
      <Defs id="cu" />

      {[
        { x: 20, w: 245, title: "naive" },
        { x: 295, w: 245, title: "IO-aware tiling" },
      ].map((col) => (
        <g key={col.title}>
          <text className="d-head" x={col.x} y="10">{col.title}</text>
          {bands.map((b) => (
            <g key={b.label}>
              <rect
                className={b.label === "shared memory" && col.title !== "naive" ? "d-accent-box" : "d-box-soft"}
                x={col.x}
                y={b.y}
                width={col.w}
                height={b.h}
                rx="2"
              />
              <text className="d-t-sm" x={col.x + 8} y={b.y + b.h / 2 + 3}>{b.label}</text>
            </g>
          ))}
        </g>
      ))}

      {/* naive: every step makes the full trip down to HBM and back */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          className="d-accent-line"
          x1={142 + i * 24}
          y1="54"
          x2={142 + i * 24}
          y2="148"
          markerEnd={ma}
          markerStart={ma}
        />
      ))}
      <text className="d-t-accent" x="20" y="186">every step crosses HBM</text>
      <text className="d-t-sm" x="20" y="199">the whole working set, every time</text>

      {/* tiled: the loop is fenced into the top of the hierarchy */}
      <rect className="d-line d-dash" x="299" y="40" width="237" height="62" rx="3" />
      <line className="d-accent-line" x1="470" y1="102" x2="470" y2="148" markerEnd={ma} markerStart={ma} />
      <text className="d-t" x="295" y="186">the inner loop never leaves</text>
      <text className="d-t-sm" x="295" y="199">shared memory and registers</text>
      <text className="d-t-accent" x="295" y="214">one trip to HBM per tile</text>

      {/* the result */}
      <line className="d-line-dim" x1="20" y1="236" x2="540" y2="236" />
      <text className="d-head" x="20" y="254">forward pass, one A40 — bars to scale</text>

      <rect className="d-box-soft" x="20" y="264" width="520" height="20" rx="2" />
      <text className="d-t" x="28" y="278">249.8 ms — naive port</text>

      <rect className="d-accent-box" x="20" y="292" width="21.4" height="20" rx="2" />
      <text className="d-t" x="50" y="306">10.3 ms — hand-written kernels</text>
      <text className="d-t-accent" x="540" y="306" textAnchor="end">24.2× faster</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FPGA — the copy that was removed
   ══════════════════════════════════════════════════════════════════════════ */
export function FpgaDiagram() {
  const m = "url(#fp-a)";
  return (
    <svg viewBox="0 0 560 342" role="img" aria-label="Before, the same buffer crossed PCIe twice; after, one physical region is mapped into both address spaces">
      <Defs id="fp" />

      {/* before */}
      <text className="d-head" x="0" y="10">before</text>
      <rect className="d-box" x="20" y="22" width="150" height="58" rx="2" />
      <text className="d-t" x="95" y="46" textAnchor="middle">host RAM</text>
      <text className="d-t-sm" x="95" y="61" textAnchor="middle">buffer</text>

      <rect className="d-box" x="390" y="22" width="150" height="58" rx="2" />
      <text className="d-t" x="465" y="46" textAnchor="middle">FPGA RAM</text>
      <text className="d-t-sm" x="465" y="61" textAnchor="middle">copy of the same bytes</text>

      <rect className="d-box-soft" x="200" y="22" width="150" height="58" rx="2" />
      <text className="d-t-sm" x="275" y="44" textAnchor="middle">PCIe</text>

      <line className="d-accent-line" x1="176" y1="40" x2="384" y2="40" markerEnd="url(#fp-b)" />
      <line className="d-accent-line" x1="384" y1="64" x2="176" y2="64" markerEnd="url(#fp-b)" />
      <text className="d-t-accent" x="275" y="98" textAnchor="middle">the same bytes cross the bus twice</text>
      <text className="d-t-sm" x="275" y="111" textAnchor="middle">the host spends its cycles moving data it already had</text>

      <line className="d-line-dim d-dash" x1="20" y1="132" x2="540" y2="132" />

      {/* after */}
      <text className="d-head" x="0" y="158">after</text>
      <rect className="d-box" x="20" y="170" width="130" height="58" rx="2" />
      <text className="d-t" x="85" y="194" textAnchor="middle">host</text>
      <text className="d-t-sm" x="85" y="209" textAnchor="middle">reads / writes</text>

      <rect className="d-accent-box" x="180" y="170" width="200" height="58" rx="2" />
      <text className="d-t-accent" x="280" y="194" textAnchor="middle">ONE PHYSICAL REGION</text>
      <text className="d-t-sm" x="280" y="209" textAnchor="middle">mapped into both address spaces</text>

      <rect className="d-box" x="410" y="170" width="130" height="58" rx="2" />
      <text className="d-t" x="475" y="194" textAnchor="middle">FPGA kernels</text>
      <text className="d-t-sm" x="475" y="209" textAnchor="middle">reads / writes</text>

      <line className="d-line" x1="152" y1="199" x2="176" y2="199" markerEnd={m} markerStart={m} />
      <line className="d-line" x1="384" y1="199" x2="408" y2="199" markerEnd={m} markerStart={m} />
      <text className="d-t" x="280" y="250" textAnchor="middle">no transfer left to make</text>

      <line className="d-line-dim" x1="20" y1="272" x2="540" y2="272" />
      <text className="d-t" x="20" y="294">throughput, same workload</text>
      <rect className="d-box-soft" x="20" y="304" width="230" height="18" rx="2" />
      <text className="d-t-sm" x="28" y="317">CPU baseline</text>
      <rect className="d-accent-box" x="270" y="304" width="270" height="18" rx="2" />
      <text className="d-t-accent" x="278" y="317">2× — scheduler on the FPGA</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MALLOC — O(1) coalescing
   ══════════════════════════════════════════════════════════════════════════ */
export function MallocDiagram() {
  const m = "url(#ml-a)";
  const H = 10; // header cell width

  // Strip is inset from the left so the before/after labels have their own gutter.
  const before = [
    { x: 52, w: 90, state: "used" },
    { x: 142, w: 80, state: "free" },
    { x: 222, w: 110, state: "freeing" },
    { x: 332, w: 85, state: "free" },
    { x: 417, w: 139, state: "used" },
  ];

  return (
    <svg viewBox="0 0 560 292" role="img" aria-label="An address-sorted free list lets a freed block merge with both physical neighbours in constant time">
      <Defs id="ml" />

      {/* the two lookups, annotated above the strip */}
      <text className="d-t-accent" x="279" y="12" textAnchor="middle">free(p) looks at both physical neighbours</text>
      <path className="d-accent-line" d="M 277 34 L 277 22 L 182 22 L 182 32" markerEnd="url(#ml-b)" />
      <path className="d-accent-line" d="M 277 22 L 374 22 L 374 32" markerEnd="url(#ml-b)" />

      {/* before */}
      <text className="d-t-sm" x="0" y="58">before</text>
      {before.map((b) => (
        <g key={b.x}>
          <rect
            className={b.state === "freeing" ? "d-accent-box" : "d-box"}
            x={b.x}
            y="34"
            width={b.w}
            height="40"
            rx="2"
          />
          <rect className="d-box-soft" x={b.x} y="34" width={H} height="40" />
          <text className="d-t-sm" x={b.x + b.w / 2 + 4} y="59" textAnchor="middle">
            {b.state === "freeing" ? "free(p)" : b.state}
          </text>
        </g>
      ))}
      <text className="d-t-sm" x="52" y="92">↑ the header sits immediately before the payload, so the list walks without a separate index</text>

      <line className="d-line" x1="279" y1="104" x2="279" y2="126" markerEnd={m} />
      <text className="d-t-sm" x="289" y="119">merge in place — no scan, no rebuild</text>

      {/* after */}
      <text className="d-t-sm" x="0" y="158">after</text>
      <rect className="d-box" x="52" y="134" width="90" height="40" rx="2" />
      <rect className="d-box-soft" x="52" y="134" width={H} height="40" />
      <text className="d-t-sm" x="101" y="159" textAnchor="middle">used</text>

      <rect className="d-accent-box" x="142" y="134" width="275" height="40" rx="2" />
      <rect className="d-box-soft" x="142" y="134" width={H} height="40" />
      <text className="d-t-accent" x="284" y="153" textAnchor="middle">ONE FREE BLOCK</text>
      <text className="d-t-sm" x="284" y="166" textAnchor="middle">three blocks, one header, one entry</text>

      <rect className="d-box" x="417" y="134" width="139" height="40" rx="2" />
      <rect className="d-box-soft" x="417" y="134" width={H} height="40" />
      <text className="d-t-sm" x="491" y="159" textAnchor="middle">used</text>

      <line className="d-line-dim" x1="0" y1="204" x2="560" y2="204" />
      <text className="d-t" x="0" y="226">Because the list is kept in address order, the neighbours are already known.</text>
      <text className="d-t-accent" x="0" y="246">Coalescing is O(1) — it never walks the list.</text>
      <text className="d-t-sm" x="0" y="266">Splitting prefers a useful-sized remainder; realloc grows in place</text>
      <text className="d-t-sm" x="0" y="280">when the block to its right is already free.</text>
    </svg>
  );
}

export const DIAGRAMS = {
  sentinel: SentinelDiagram,
  trading: TradingDiagram,
  cuda: CudaDiagram,
  fpga: FpgaDiagram,
  malloc: MallocDiagram,
} as const;
