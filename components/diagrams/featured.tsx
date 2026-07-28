import { VB } from "./defs";

/**
 * The seven marquee drawings.
 *
 * Each one shows the single mechanism that makes the project interesting, and
 * the accent is spent on exactly that: the gate, the veto, the copy that
 * vanished, the merged block. `d-flow` paths plot themselves in as the card
 * arrives; `d-pop` is the thing the drawing is about.
 */

const A = "url(#arw)";
const AA = "url(#arw-a)";
const AD = "url(#arw-dim)";

/* ── Periscope — one port surfaces ─────────────────────────────────────── */
export function Periscope() {
  return (
    <svg viewBox={VB} role="img" aria-label="Visitors reach a VPN exit node, never the home IP">
      <rect className="d-box-soft" x="4" y="18" width="76" height="26" rx="2" />
      <text className="d-t-sm" x="42" y="35" textAnchor="middle">visitor</text>
      <path className="d-line d-flow" pathLength={1} d="M 82 31 L 104 31" markerEnd={A} />

      <rect className="d-box" x="106" y="18" width="86" height="26" rx="2" />
      <text className="d-t-sm" x="149" y="35" textAnchor="middle">Cloudflare</text>
      <path className="d-line d-flow" pathLength={1} d="M 194 31 L 216 31" markerEnd={A} />

      <rect className="d-box" x="218" y="18" width="138" height="26" rx="2" />
      <text className="d-t-sm" x="287" y="35" textAnchor="middle">AirVPN exit :41945</text>

      <path className="d-line d-flow" pathLength={1} d="M 287 44 L 287 62 L 180 62 L 180 74" markerEnd={A} />

      <rect className="d-accent-box d-pop" x="26" y="76" width="308" height="62" rx="3" />
      <text className="d-t-accent" x="180" y="95" textAnchor="middle">GLUETUN — KILL-SWITCH NETNS</text>
      <rect className="d-box" x="60" y="102" width="240" height="26" rx="2" />
      <text className="d-t-sm d-beat" x="180" y="119" textAnchor="middle">NPM :443 — the only open port</text>

      <path className="d-line d-flow" pathLength={1} d="M 180 138 L 180 160" markerEnd={A} />
      <rect className="d-box-soft" x="76" y="162" width="208" height="28" rx="2" />
      <text className="d-t-sm" x="180" y="176" textAnchor="middle">webapp · static IP</text>
      <text className="d-t-sm" x="180" y="186" textAnchor="middle">no internet, no ports</text>

      <text className="d-t-accent" x="180" y="209" textAnchor="middle">the home IP appears nowhere in this path</text>
    </svg>
  );
}

/* ── Sentinel — the dry-run gate ───────────────────────────────────────── */
export function Sentinel() {
  return (
    <svg viewBox={VB} role="img" aria-label="Every state change passes a dry-run gate">
      <rect className="d-box-soft" x="72" y="12" width="216" height="24" rx="2" />
      <text className="d-t-sm" x="180" y="28" textAnchor="middle">&quot;expose 5432 on the docker host&quot;</text>
      <path className="d-line d-flow" pathLength={1} d="M 180 36 L 180 54" markerEnd={A} />

      <rect className="d-box" x="60" y="56" width="240" height="26" rx="2" />
      <text className="d-t-sm" x="180" y="73" textAnchor="middle">agent works out the tool calls</text>
      <path className="d-line d-flow" pathLength={1} d="M 180 82 L 180 100" markerEnd={A} />

      <rect className="d-accent-box d-pop" x="42" y="102" width="276" height="38" rx="3" />
      <text className="d-t-accent d-beat" x="180" y="118" textAnchor="middle">DRY-RUN GATE</text>
      <text className="d-t-sm" x="180" y="132" textAnchor="middle">state change ⇒ needs confirm=true</text>

      <path className="d-line-dim d-flow d-dash" pathLength={1} d="M 110 140 L 110 158 L 76 158 L 76 168" markerEnd={AD} />
      <path className="d-accent-line d-flow" pathLength={1} d="M 250 140 L 250 158 L 271 158 L 271 168" markerEnd={AA} />

      <rect className="d-box-soft" x="4" y="168" width="144" height="34" rx="2" />
      <text className="d-t-sm" x="76" y="184" textAnchor="middle">prints the plan,</text>
      <text className="d-t-sm" x="76" y="196" textAnchor="middle">then stops</text>

      <rect className="d-box" x="190" y="168" width="166" height="34" rx="2" />
      <text className="d-t-sm" x="273" y="184" textAnchor="middle">Proxmox · OPNsense</text>
      <text className="d-t-sm" x="273" y="196" textAnchor="middle">Docker host</text>

      <text className="d-t-sm" x="76" y="213" textAnchor="middle">confirm=false</text>
      <text className="d-t-accent" x="273" y="213" textAnchor="middle">confirm=true</text>
    </svg>
  );
}

/* ── Trading agent — research, veto, clamp ─────────────────────────────── */
export function Trading() {
  const names = ["Nova", "Warren", "Atlas", "Maverick"];
  return (
    <svg viewBox={VB} role="img" aria-label="Four personas research, a committee vetoes, guardrails clamp">
      <text className="d-t-head" x="4" y="12">overnight · one model, time-sliced</text>
      {names.map((n, i) => (
        <g key={n}>
          <rect className="d-box" x={4 + i * 89} width="83" y="18" height="24" rx="2" />
          <text className="d-t-sm" x={45.5 + i * 89} y="34" textAnchor="middle">{n}</text>
        </g>
      ))}
      <path className="d-line d-flow" pathLength={1} d="M 180 42 L 180 58" markerEnd={A} />

      <rect className="d-accent-box d-pop" x="40" y="60" width="280" height="38" rx="3" />
      <text className="d-t-accent" x="180" y="76" textAnchor="middle">RISK COMMITTEE</text>
      <text className="d-t-sm d-beat" x="180" y="90" textAnchor="middle">approve · reduce · VETO</text>
      <path className="d-line d-flow" pathLength={1} d="M 180 98 L 180 114" markerEnd={A} />

      <rect className="d-box" x="40" y="116" width="280" height="38" rx="3" />
      <text className="d-t-sm" x="180" y="132" textAnchor="middle">guardrails.py — pure, unit-tested</text>
      <text className="d-t-accent" x="180" y="146" textAnchor="middle">the model&apos;s sizes and stops get clamped</text>
      <path className="d-line d-flow" pathLength={1} d="M 180 154 L 180 168" markerEnd={A} />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className="d-box-soft" x={4 + i * 89} y="170" width="83" height="26" rx="2" />
          <text className="d-t-sm" x={45.5 + i * 89} y="187" textAnchor="middle">book {i + 1}</text>
        </g>
      ))}
      <text className="d-t-sm" x="180" y="213" textAnchor="middle">separate accounts, so the personas stay comparable</text>
    </svg>
  );
}

/* ── GPT-2 CUDA — where the working set lives ──────────────────────────── */
export function Cuda() {
  const bands = [
    { l: "registers", y: 34, h: 20 },
    { l: "shared mem", y: 56, h: 24 },
    { l: "L2", y: 82, h: 18 },
    { l: "HBM", y: 102, h: 26 },
  ];
  return (
    <svg viewBox={VB} role="img" aria-label="Naive attention crosses HBM every step; tiling keeps it resident">
      <text className="d-t-head" x="4" y="14">naive</text>
      <text className="d-t-head" x="190" y="14">io-aware tiling</text>

      {[4, 190].map((x) => (
        <g key={x}>
          {bands.map((b) => (
            <g key={b.l}>
              <rect
                className={x === 190 && b.l === "shared mem" ? "d-accent-box" : "d-box-soft"}
                x={x}
                y={b.y}
                width="166"
                height={b.h}
                rx="2"
              />
              <text className="d-t-sm" x={x + 6} y={b.y + b.h / 2 + 3.5}>{b.l}</text>
            </g>
          ))}
        </g>
      ))}

      {/* naive: every step makes the whole trip */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          className="d-accent-line d-flow"
          pathLength={1}
          x1={96 + i * 21}
          y1="42"
          x2={96 + i * 21}
          y2="116"
          markerEnd={AA}
          markerStart={AA}
        />
      ))}

      {/* tiled: the loop is fenced into the top of the hierarchy */}
      <rect className="d-line d-dash d-pop" x="186" y="30" width="174" height="54" rx="3" />
      <line className="d-accent-line d-flow" pathLength={1} x1="320" y1="80" x2="320" y2="116" markerEnd={AA} markerStart={AA} />

      <text className="d-t-accent" x="4" y="150">every step crosses HBM</text>
      <text className="d-t-sm" x="4" y="163">the whole working set, each time</text>
      <text className="d-t" x="184" y="150">the loop never leaves</text>
      <text className="d-t-sm" x="184" y="163">shared mem and registers</text>
      <text className="d-t-accent d-beat" x="184" y="178">one trip to HBM per tile</text>
      <text className="d-t-sm" x="4" y="204">249.8 ms → 10.3 ms on one A40</text>
    </svg>
  );
}

/* ── FPGA — the copy that vanished ─────────────────────────────────────── */
export function Fpga() {
  return (
    <svg viewBox={VB} role="img" aria-label="The same buffer crossed PCIe twice; one shared region removed both copies">
      <text className="d-t-head" x="4" y="12">before</text>
      <rect className="d-box" x="4" y="18" width="104" height="42" rx="2" />
      <text className="d-t-sm" x="56" y="36" textAnchor="middle">host RAM</text>
      <text className="d-t-sm" x="56" y="48" textAnchor="middle">buffer</text>

      <rect className="d-box-soft" x="126" y="18" width="108" height="42" rx="2" />
      <text className="d-t-sm" x="180" y="43" textAnchor="middle">PCIe</text>

      <rect className="d-box" x="252" y="18" width="104" height="42" rx="2" />
      <text className="d-t-sm" x="304" y="36" textAnchor="middle">FPGA RAM</text>
      <text className="d-t-sm" x="304" y="48" textAnchor="middle">same bytes again</text>

      <line className="d-accent-line d-flow" pathLength={1} x1="110" y1="30" x2="248" y2="30" markerEnd={AA} />
      <line className="d-accent-line d-flow" pathLength={1} x1="248" y1="50" x2="110" y2="50" markerEnd={AA} />
      <text className="d-t-accent d-beat" x="180" y="76" textAnchor="middle">the same bytes cross the bus twice</text>

      <line className="d-line-dim d-dash" x1="4" y1="92" x2="356" y2="92" />

      <text className="d-t-head" x="4" y="112">after</text>
      <rect className="d-box" x="4" y="118" width="88" height="42" rx="2" />
      <text className="d-t-sm" x="48" y="143" textAnchor="middle">host</text>

      <rect className="d-accent-box d-pop" x="106" y="118" width="148" height="42" rx="3" />
      <text className="d-t-accent" x="180" y="136" textAnchor="middle">ONE PHYSICAL REGION</text>
      <text className="d-t-sm" x="180" y="149" textAnchor="middle">mapped into both</text>

      <rect className="d-box" x="268" y="118" width="88" height="42" rx="2" />
      <text className="d-t-sm" x="312" y="143" textAnchor="middle">FPGA</text>

      <line className="d-line d-flow" pathLength={1} x1="94" y1="139" x2="104" y2="139" markerEnd={A} markerStart={A} />
      <line className="d-line d-flow" pathLength={1} x1="256" y1="139" x2="266" y2="139" markerEnd={A} markerStart={A} />
      <text className="d-t" x="180" y="180" textAnchor="middle">no transfer left to make</text>
      <text className="d-t-sm" x="180" y="204" textAnchor="middle">throughput doubled on that alone</text>
    </svg>
  );
}

/* ── Media stack — no route but the tunnel ─────────────────────────────── */
export function MediaStack() {
  const live = "M 216 62 L 268 62";
  return (
    <svg viewBox={VB} role="img" aria-label="Two routes out: the tunnel, and one that is cut">
      {/* a compose key, so it can't take the uppercase of d-t-head */}
      <text className="d-t-sm" x="4" y="13">network_mode: service:gluetun</text>

      {/* everything that downloads lives inside one namespace */}
      <rect className="d-accent-box d-pop" x="4" y="20" width="212" height="100" rx="3" />
      <text className="d-t-accent" x="110" y="38" textAnchor="middle">GLUETUN — KILL-SWITCH</text>
      <rect className="d-box" x="18" y="48" width="184" height="28" rx="2" />
      <text className="d-t-sm" x="110" y="66" textAnchor="middle">qBittorrent</text>
      <rect className="d-box" x="18" y="82" width="184" height="28" rx="2" />
      <text className="d-t-sm" x="110" y="100" textAnchor="middle">*arr automation</text>

      {/* the one route that exists */}
      <path className="d-accent-line d-flow" pathLength={1} d={live} markerEnd={AA} />
      <circle className="d-fill-accent d-travel" r="3.4" style={{ offsetPath: `path("${live}")` }} />
      <rect className="d-box" x="270" y="44" width="86" height="36" rx="2" />
      <text className="d-t-sm" x="313" y="61" textAnchor="middle">wireguard</text>
      <text className="d-t-sm" x="313" y="73" textAnchor="middle">exit</text>

      {/* and the one that doesn't */}
      <path className="d-line-dim d-dash" d="M 216 96 L 268 96" />
      <path className="d-accent-line d-cut" pathLength={1} d="M 233 85 L 251 107" />
      <path className="d-accent-line d-cut" pathLength={1} d="M 251 85 L 233 107" />
      <rect className="d-box-soft" x="270" y="80" width="86" height="32" rx="2" />
      <text className="d-t-sm" x="313" y="100" textAnchor="middle">home WAN</text>

      <line className="d-line-dim d-dash" x1="4" y1="138" x2="356" y2="138" />
      <text className="d-t-accent d-late d-beat" x="180" y="162" textAnchor="middle">no interface of their own</text>
      <text className="d-t-sm" x="180" y="184" textAnchor="middle">the tunnel is the only one in the namespace —</text>
      <text className="d-t-sm" x="180" y="202" textAnchor="middle">it drops, and there is nothing left to route over</text>
    </svg>
  );
}

/* ── malloc — O(1) coalescing ──────────────────────────────────────────── */
export function Malloc() {
  const before = [
    { x: 22, w: 62, s: "used" },
    { x: 84, w: 54, s: "free" },
    { x: 138, w: 76, s: "free(p)" },
    { x: 214, w: 58, s: "free" },
    { x: 272, w: 66, s: "used" },
  ];
  return (
    <svg viewBox={VB} role="img" aria-label="An address-ordered free list merges a freed block with both neighbours in constant time">
      <text className="d-t-accent" x="180" y="16" textAnchor="middle">free(p) reads both physical neighbours</text>
      <path className="d-accent-line d-flow" pathLength={1} d="M 176 40 L 176 26 L 111 26 L 111 38" markerEnd={AA} />
      <path className="d-accent-line d-flow" pathLength={1} d="M 176 26 L 243 26 L 243 38" markerEnd={AA} />

      <text className="d-t-head" x="4" y="36">before</text>
      {before.map((b) => (
        <g key={b.x}>
          <rect className={b.s === "free(p)" ? "d-accent-box" : "d-box"} x={b.x} y="40" width={b.w} height="34" rx="2" />
          <rect className="d-box-soft" x={b.x} y="40" width="8" height="34" />
          <text className="d-t-sm" x={b.x + b.w / 2 + 4} y="61" textAnchor="middle">{b.s}</text>
        </g>
      ))}
      <text className="d-t-sm" x="22" y="88">↑ header sits before the payload</text>

      <path className="d-line d-flow" pathLength={1} d="M 180 96 L 180 116" markerEnd={A} />
      <text className="d-t-sm" x="190" y="110">merge in place</text>

      <text className="d-t-head" x="4" y="116">after</text>
      <rect className="d-box" x="22" y="120" width="62" height="34" rx="2" />
      <rect className="d-box-soft" x="22" y="120" width="8" height="34" />
      <text className="d-t-sm" x="57" y="141" textAnchor="middle">used</text>

      <rect className="d-accent-box d-pop" x="84" y="120" width="188" height="34" rx="2" />
      <rect className="d-box-soft" x="84" y="120" width="8" height="34" />
      <text className="d-t-accent d-beat" x="182" y="136" textAnchor="middle">ONE FREE BLOCK</text>
      <text className="d-t-sm" x="182" y="148" textAnchor="middle">three blocks, one header</text>

      <rect className="d-box" x="272" y="120" width="66" height="34" rx="2" />
      <rect className="d-box-soft" x="272" y="120" width="8" height="34" />
      <text className="d-t-sm" x="309" y="141" textAnchor="middle">used</text>

      <text className="d-t" x="180" y="180" textAnchor="middle">the neighbours are already known</text>
      <text className="d-t-accent" x="180" y="202" textAnchor="middle">so coalescing never walks the list</text>
    </svg>
  );
}
