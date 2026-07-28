import { VB } from "./defs";

/**
 * The compact set — four to six elements each, same visual language as the
 * featured drawings. The goal is that a card is never wordless: you should be
 * able to tell what the project does from the shape alone.
 */

const A = "url(#arw)";
const AA = "url(#arw-a)";

export function CraftDeck() {
  return (
    <svg viewBox={VB} role="img" aria-label="An ops panel drives the game server over RCON">
      <rect className="d-accent-box d-pop" x="70" y="18" width="220" height="38" rx="3" />
      <text className="d-t-accent" x="180" y="35" textAnchor="middle">CRAFTDECK PANEL</text>
      <text className="d-t-sm" x="180" y="48" textAnchor="middle">console · mods · backups · schedules</text>

      <path className="d-line d-flow" pathLength={1} d="M 130 56 L 130 78 L 92 78 L 92 96" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 230 56 L 230 78 L 268 78 L 268 96" markerEnd={A} />
      <text className="d-t-sm" x="150" y="74">RCON</text>

      <rect className="d-box" x="14" y="98" width="156" height="38" rx="2" />
      <text className="d-t-sm" x="92" y="116" textAnchor="middle">Fabric server</text>
      <text className="d-t-sm" x="92" y="128" textAnchor="middle">whitelist + EasyAuth</text>

      <rect className="d-box-soft" x="190" y="98" width="156" height="38" rx="2" />
      <text className="d-t-sm" x="268" y="116" textAnchor="middle">backup sidecar</text>
      <text className="d-t-sm" x="268" y="128" textAnchor="middle">tar + retention</text>

      <text className="d-t-accent d-beat" x="180" y="170" textAnchor="middle">the panel holds the Docker socket</text>
      <text className="d-t-sm" x="180" y="188" textAnchor="middle">so it binds to the LAN and never the internet</text>
    </svg>
  );
}

export function K3s() {
  const nodes = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox={VB} role="img" aria-label="Six cluster nodes reachable only through a tunnel">
      <text className="d-t-head" x="4" y="14">six nodes on proxmox</text>
      {nodes.map((i) => {
        const x = 42 + (i % 3) * 96;
        const y = 24 + Math.floor(i / 3) * 50;
        return (
          <g key={i}>
            <rect className="d-box" x={x} y={y} width="84" height="40" rx="2" />
            <text className="d-t-sm" x={x + 42} y={y + 24} textAnchor="middle">node {i + 1}</text>
          </g>
        );
      })}
      <path className="d-line d-flow" pathLength={1} d="M 180 124 L 180 142" markerEnd={A} />
      <rect className="d-accent-box d-pop" x="52" y="144" width="256" height="34" rx="3" />
      <text className="d-t-accent d-beat" x="180" y="165" textAnchor="middle">CLOUDFLARE mTLS TUNNEL</text>
      <text className="d-t-sm" x="180" y="200" textAnchor="middle">not one public IP among them</text>
    </svg>
  );
}

export function Socratic() {
  const rungs = [
    { l: "question", y: 24, accent: true },
    { l: "a concept to reconsider", y: 62, accent: false },
    { l: "the specific mechanism", y: 100, accent: false },
    { l: "the worked answer", y: 138, accent: false },
  ];
  return (
    <svg viewBox={VB} role="img" aria-label="Support is rationed up a four-rung ladder">
      {rungs.map((r, i) => (
        <g key={r.l}>
          <rect
            className={r.accent ? "d-accent-box d-pop" : "d-box-soft"}
            x={20 + i * 14}
            y={r.y}
            width={320 - i * 28}
            height="30"
            rx="2"
          />
          <text className={r.accent ? "d-t-accent" : "d-t-sm"} x="180" y={r.y + 20} textAnchor="middle">
            {r.l}
          </text>
        </g>
      ))}
      <path className="d-line-dim d-flow d-dash" pathLength={1} d="M 180 54 L 180 60" markerEnd={A} />
      <path className="d-line-dim d-flow d-dash" pathLength={1} d="M 180 92 L 180 98" markerEnd={A} />
      <path className="d-line-dim d-flow d-dash" pathLength={1} d="M 180 130 L 180 136" markerEnd={A} />
      <text className="d-t-accent d-beat" x="180" y="190" textAnchor="middle">the harness advances the rung, not the model</text>
      <text className="d-t-sm" x="180" y="206" textAnchor="middle">so it can never skip to the answer</text>
    </svg>
  );
}

export function Stint() {
  return (
    <svg viewBox={VB} role="img" aria-label="Raw stints stay separate until you assemble a trip by hand">
      <text className="d-t-head" x="4" y="14">inbox — raw stints</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className="d-box" x={6 + i * 88} y="20" width="80" height="34" rx="2" />
          <text className="d-t-sm" x={46 + i * 88} y="41" textAnchor="middle">stint {i + 1}</text>
        </g>
      ))}
      <path className="d-accent-line d-flow" pathLength={1} d="M 180 56 L 180 82" markerEnd={AA} />
      <text className="d-t-accent d-beat" x="192" y="74">you tap assemble</text>

      <rect className="d-accent-box d-pop" x="26" y="86" width="308" height="58" rx="3" />
      <text className="d-t-accent" x="180" y="103" textAnchor="middle">ONE TRIP</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} className="d-box" x={44 + i * 96} y="110" width="88" height="24" rx="2" />
      ))}
      <text className="d-t-sm" x="180" y="176" textAnchor="middle">nothing merges on its own</text>
      <text className="d-t-sm" x="180" y="194" textAnchor="middle">disband the trip and the stints survive it</text>
    </svg>
  );
}

export function EnvSync() {
  return (
    <svg viewBox={VB} role="img" aria-label="Secrets are encrypted on the client; the server only ever holds ciphertext">
      <rect className="d-box" x="4" y="30" width="150" height="92" rx="3" />
      <text className="d-t-head" x="79" y="48" textAnchor="middle">your machine</text>
      <rect className="d-box-soft" x="18" y="56" width="122" height="26" rx="2" />
      <text className="d-t-sm" x="79" y="73" textAnchor="middle">plaintext .env</text>
      <rect className="d-accent-box d-pop" x="18" y="88" width="122" height="26" rx="2" />
      <text className="d-t-accent" x="79" y="105" textAnchor="middle">Argon2id + AES-GCM</text>

      <line className="d-accent-line d-dash" x1="180" y1="20" x2="180" y2="140" />
      <path className="d-line d-flow" pathLength={1} d="M 156 76 L 204 76" markerEnd={A} />
      <text className="d-t-accent d-beat" x="180" y="16" textAnchor="middle">boundary</text>

      <rect className="d-box" x="206" y="30" width="150" height="92" rx="3" />
      <text className="d-t-head" x="281" y="48" textAnchor="middle">the server</text>
      <rect className="d-box-soft" x="220" y="62" width="122" height="40" rx="2" />
      <text className="d-t-sm" x="281" y="79" textAnchor="middle">ciphertext</text>
      <text className="d-t-sm" x="281" y="92" textAnchor="middle">and nothing else</text>

      <text className="d-t-sm" x="180" y="170" textAnchor="middle">no admin override, no password reset</text>
      <text className="d-t-sm" x="180" y="188" textAnchor="middle">lose the passphrase and the vault is gone</text>
    </svg>
  );
}

export function Schema() {
  const steps = ["chunk", "embed", "rerank"];
  return (
    <svg viewBox={VB} role="img" aria-label="PDFs are routed by type, embedded, then reranked so answers cite real passages">
      <rect className="d-box" x="4" y="30" width="76" height="60" rx="2" />
      <text className="d-t-sm" x="42" y="55" textAnchor="middle">PDF</text>
      <text className="d-t-sm" x="42" y="68" textAnchor="middle">in</text>

      <path className="d-line d-flow" pathLength={1} d="M 82 46 L 104 46" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 82 74 L 104 74" markerEnd={A} />
      <rect className="d-box-soft" x="106" y="32" width="94" height="26" rx="2" />
      <text className="d-t-sm" x="153" y="49" textAnchor="middle">typed · PyMuPDF</text>
      <rect className="d-box-soft" x="106" y="62" width="94" height="26" rx="2" />
      <text className="d-t-sm" x="153" y="79" textAnchor="middle">written · TrOCR</text>

      {steps.map((s, i) => (
        <g key={s}>
          <rect className={i === 2 ? "d-accent-box d-pop" : "d-box"} x="228" y={26 + i * 34} width="124" height="28" rx="2" />
          <text className={i === 2 ? "d-t-accent" : "d-t-sm"} x="290" y={44 + i * 34} textAnchor="middle">{s}</text>
        </g>
      ))}
      <path className="d-line d-flow" pathLength={1} d="M 202 60 L 224 46" markerEnd={A} />

      <text className="d-t-accent d-beat" x="180" y="150" textAnchor="middle">retrieval is reranked, not just nearest</text>
      <text className="d-t-sm" x="180" y="172" textAnchor="middle">so what reaches the model is actually relevant</text>
      <text className="d-t-sm" x="180" y="194" textAnchor="middle">and the answer quotes a real passage</text>
    </svg>
  );
}

export function Journaling() {
  const src = ["webcam", "calendar", "mood"];
  return (
    <svg viewBox={VB} role="img" aria-label="Three signals are fused into one reflection prompt">
      {src.map((s, i) => (
        <g key={s}>
          <rect className="d-box" x={6 + i * 118} y="24" width="110" height="32" rx="2" />
          <text className="d-t-sm" x={61 + i * 118} y="44" textAnchor="middle">{s}</text>
          <path className="d-line d-flow" pathLength={1} d={`M ${61 + i * 118} 58 L 180 92`} markerEnd={A} />
        </g>
      ))}
      <rect className="d-accent-box d-pop" x="66" y="94" width="228" height="36" rx="3" />
      <text className="d-t-accent d-beat" x="180" y="117" textAnchor="middle">ONE PROMPT THAT FITS THE DAY</text>
      <text className="d-t-sm" x="180" y="164" textAnchor="middle">vision service stays under 100 ms a frame</text>
      <text className="d-t-sm" x="180" y="186" textAnchor="middle">so the feed reads as live, not laggy</text>
    </svg>
  );
}

export function Urban() {
  return (
    <svg viewBox={VB} role="img" aria-label="Millions of city records train a model that flags underserved blocks">
      <text className="d-t-head" x="4" y="14">city records</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className="d-box-soft" x="4" y={22 + i * 18} width={96 - i * 6} height="12" rx="1" />
      ))}
      <path className="d-line d-flow" pathLength={1} d="M 104 66 L 128 66" markerEnd={A} />

      <rect className="d-box" x="130" y="44" width="96" height="44" rx="2" />
      <text className="d-t-sm" x="178" y="63" textAnchor="middle">XGBoost</text>
      <text className="d-t-sm" x="178" y="76" textAnchor="middle">+ spatial pass</text>
      <path className="d-line d-flow" pathLength={1} d="M 228 66 L 252 66" markerEnd={A} />

      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const hot = i === 3 || i === 7;
        return (
          <rect
            key={i}
            className={hot ? "d-accent-box d-pop" : "d-box-soft"}
            x={254 + (i % 3) * 34}
            y={32 + Math.floor(i / 3) * 34}
            width="30"
            height="30"
            rx="1"
          />
        );
      })}
      <text className="d-t-accent d-beat" x="180" y="164" textAnchor="middle">the blocks that get shorted, on a map</text>
      <text className="d-t-sm" x="180" y="188" textAnchor="middle">so someone allocating services can see the gap</text>
    </svg>
  );
}

export function Epoll() {
  return (
    <svg viewBox={VB} role="img" aria-label="One epoll thread holds every connection, one state machine per socket">
      <rect className="d-accent-box d-pop" x="4" y="60" width="112" height="72" rx="3" />
      <text className="d-t-accent" x="60" y="88" textAnchor="middle">ONE THREAD</text>
      <text className="d-t-sm" x="60" y="102" textAnchor="middle">epoll_wait</text>
      <text className="d-t-sm d-beat" x="60" y="116" textAnchor="middle">no thread per conn</text>

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path className="d-line d-flow" pathLength={1} d={`M 118 96 L 168 ${34 + i * 42}`} markerEnd={A} />
          <rect className="d-box" x="170" y={20 + i * 42} width="186" height="30" rx="2" />
          <text className="d-t-sm" x="182" y={39 + i * 42}>socket {i + 1}</text>
          <text className="d-t-sm" x="262" y={39 + i * 42}>· state machine</text>
        </g>
      ))}
      <text className="d-t-sm" x="180" y="204" textAnchor="middle">a partial read resumes where the last EAGAIN left off</text>
    </svg>
  );
}

export function Make() {
  return (
    <svg viewBox={VB} role="img" aria-label="The Makefile becomes a DAG so independent rules run at once">
      <rect className="d-box" x="140" y="16" width="80" height="30" rx="2" />
      <text className="d-t-sm" x="180" y="35" textAnchor="middle">target</text>

      <path className="d-line d-flow" pathLength={1} d="M 160 46 L 92 78" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 180 46 L 180 78" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 200 46 L 268 78" markerEnd={A} />

      {[52, 140, 228].map((x, i) => (
        <g key={x}>
          <rect className="d-accent-box d-pop" x={x} y="80" width="80" height="30" rx="2" />
          <text className="d-t-accent" x={x + 40} y="99" textAnchor="middle">rule {i + 1}</text>
        </g>
      ))}
      <text className="d-t-accent d-beat" x="180" y="130" textAnchor="middle">nothing waits on anything — all three at once</text>

      <path className="d-line d-flow" pathLength={1} d="M 92 112 L 160 142" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 180 112 L 180 142" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 268 112 L 200 142" markerEnd={A} />
      <rect className="d-box" x="130" y="144" width="100" height="30" rx="2" />
      <text className="d-t-sm" x="180" y="163" textAnchor="middle">leaf deps</text>
      <text className="d-t-sm" x="180" y="200" textAnchor="middle">workers sleep on a condvar until a rule is runnable</text>
    </svg>
  );
}

export function Shell() {
  return (
    <svg viewBox={VB} role="img" aria-label="A hand-written parser builds a pipeline of forked processes">
      <rect className="d-box-soft" x="4" y="22" width="352" height="28" rx="2" />
      <text className="d-t-sm" x="180" y="40" textAnchor="middle">cat f.txt | grep err | wc -l &gt; out</text>
      <path className="d-line d-flow" pathLength={1} d="M 180 50 L 180 68" markerEnd={A} />
      <text className="d-t-accent d-beat" x="356" y="64" textAnchor="end">tokenizer + parser, by hand</text>

      {["cat", "grep", "wc"].map((c, i) => (
        <g key={c}>
          <rect className={i === 1 ? "d-accent-box d-pop" : "d-box"} x={16 + i * 116} y="72" width="94" height="34" rx="2" />
          <text className={i === 1 ? "d-t-accent" : "d-t-sm"} x={63 + i * 116} y="93" textAnchor="middle">{c}</text>
          {i < 2 && (
            <path className="d-accent-line d-flow" pathLength={1} d={`M ${112 + i * 116} 89 L ${130 + i * 116} 89`} markerEnd={AA} />
          )}
        </g>
      ))}
      <text className="d-t-sm" x="180" y="126" textAnchor="middle">pipe(2) between each pair</text>

      <path className="d-line d-flow" pathLength={1} d="M 285 106 L 285 142" markerEnd={A} />
      <rect className="d-box-soft" x="228" y="144" width="116" height="28" rx="2" />
      <text className="d-t-sm" x="286" y="162" textAnchor="middle">out</text>
      <text className="d-t-sm" x="180" y="200" textAnchor="middle">fork · execvp · waitpid, with signals handled</text>
    </svg>
  );
}

export function Ext2() {
  return (
    <svg viewBox={VB} role="img" aria-label="Inode pointers resolve through direct, indirect and double-indirect levels">
      <rect className="d-accent-box d-pop" x="4" y="76" width="94" height="52" rx="3" />
      <text className="d-t-accent" x="51" y="98" textAnchor="middle">INODE</text>
      <text className="d-t-sm" x="51" y="112" textAnchor="middle">read raw</text>

      <path className="d-line d-flow" pathLength={1} d="M 100 90 L 134 46" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 100 102 L 134 102" markerEnd={A} />
      <path className="d-line d-flow" pathLength={1} d="M 100 114 L 134 158" markerEnd={A} />

      {[
        { y: 30, l: "direct" },
        { y: 86, l: "indirect" },
        { y: 142, l: "double indirect" },
      ].map((r) => (
        <g key={r.l}>
          <rect className="d-box" x="136" y={r.y} width="112" height="32" rx="2" />
          <text className="d-t-sm" x="192" y={r.y + 20} textAnchor="middle">{r.l}</text>
        </g>
      ))}

      <path className="d-line d-flow" pathLength={1} d="M 250 102 L 276 102" markerEnd={A} />
      <rect className="d-box-soft" x="278" y="76" width="78" height="52" rx="2" />
      <text className="d-t-sm" x="317" y="98" textAnchor="middle">data</text>
      <text className="d-t-sm" x="317" y="112" textAnchor="middle">blocks</text>
      <text className="d-t-sm d-beat" x="180" y="200" textAnchor="middle">the kernel is never asked — this reads the disk bytes</text>
    </svg>
  );
}

export function Pico() {
  return (
    <svg viewBox={VB} role="img" aria-label="Splitting sensors onto the second core removed the interrupt contention">
      <rect className="d-box" x="4" y="30" width="166" height="94" rx="3" />
      <text className="d-t-head" x="87" y="48" textAnchor="middle">core 0</text>
      <rect className="d-box-soft" x="18" y="58" width="138" height="52" rx="2" />
      <text className="d-t-sm" x="87" y="80" textAnchor="middle">drive loop</text>
      <text className="d-t-sm" x="87" y="94" textAnchor="middle">gyro-closed turns</text>

      <rect className="d-accent-box d-pop" x="190" y="30" width="166" height="94" rx="3" />
      <text className="d-t-accent" x="273" y="48" textAnchor="middle">CORE 1</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect className="d-box" x="204" y={56 + i * 22} width="138" height="18" rx="1" />
          <text className="d-t-sm" x="273" y={69 + i * 22} textAnchor="middle">sensor IRQ {i + 1}</text>
        </g>
      ))}

      <text className="d-t-accent d-beat" x="180" y="158" textAnchor="middle">every sensor got its own core</text>
      <text className="d-t-sm" x="180" y="182" textAnchor="middle">and the crashing under interrupt load stopped</text>
    </svg>
  );
}

export function XRay() {
  return (
    <svg viewBox={VB} role="img" aria-label="Text layers a reader suppresses are pulled back out">
      <rect className="d-box" x="16" y="24" width="130" height="150" rx="3" />
      <text className="d-t-head" x="81" y="42" textAnchor="middle">the page</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} className="d-box-soft" x="30" y={54 + i * 14} width={102 - i * 14} height="7" rx="1" />
      ))}

      {[
        { y: 40, l: "zero-opacity layer" },
        { y: 84, l: "white on white" },
        { y: 128, l: "metadata strings" },
      ].map((r, i) => (
        <g key={r.l}>
          <path className="d-accent-line d-flow d-dash" pathLength={1} d={`M 148 ${100 + (i - 1) * 8} L 194 ${r.y + 16}`} markerEnd={AA} />
          <rect className="d-accent-box d-pop" x="196" y={r.y} width="160" height="32" rx="2" />
          <text className="d-t-accent" x="276" y={r.y + 20} textAnchor="middle">{r.l}</text>
        </g>
      ))}
      <text className="d-t-sm d-beat" x="180" y="198" textAnchor="middle">everything the renderer would quietly skip</text>
    </svg>
  );
}

export function Mtls() {
  return (
    <svg viewBox={VB} role="img" aria-label="Both sides present a certificate on every handshake">
      <rect className="d-box" x="4" y="56" width="130" height="72" rx="3" />
      <text className="d-t-sm" x="69" y="80" textAnchor="middle">Seafile client</text>
      <rect className="d-accent-box d-pop" x="20" y="90" width="98" height="26" rx="2" />
      <text className="d-t-accent" x="69" y="107" textAnchor="middle">client cert</text>

      <rect className="d-box" x="226" y="56" width="130" height="72" rx="3" />
      <text className="d-t-sm" x="291" y="80" textAnchor="middle">the origin</text>
      <rect className="d-box-soft" x="242" y="90" width="98" height="26" rx="2" />
      <text className="d-t-sm" x="291" y="107" textAnchor="middle">server cert</text>

      <path className="d-accent-line d-flow" pathLength={1} d="M 138 80 L 222 80" markerEnd={AA} />
      <path className="d-line d-flow" pathLength={1} d="M 222 104 L 138 104" markerEnd={A} />
      <text className="d-t-accent d-beat" x="180" y="42" textAnchor="middle">both directions, every handshake</text>

      <text className="d-t-sm" x="180" y="166" textAnchor="middle">so it works behind a tunnel that already</text>
      <text className="d-t-sm" x="180" y="186" textAnchor="middle">terminates mTLS at the edge</text>
    </svg>
  );
}

export function Mnist() {
  const cols = [
    { x: 30, n: 5, l: "input" },
    { x: 165, n: 4, l: "hidden" },
    { x: 300, n: 3, l: "output" },
  ];
  return (
    <svg viewBox={VB} role="img" aria-label="Forward and backward passes written out by hand">
      {cols.map((c) => (
        <g key={c.l}>
          <text className="d-t-head" x={c.x} y="24" textAnchor="middle">{c.l}</text>
          {Array.from({ length: c.n }).map((_, i) => (
            <circle key={i} className="d-box" cx={c.x} cy={44 + i * 24} r="8" />
          ))}
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} className="d-line-dim d-flow" pathLength={1} d={`M 40 ${44 + i * 24} L 155 ${44 + i * 24}`} />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={i} className="d-line-dim d-flow" pathLength={1} d={`M 175 ${44 + i * 24} L 290 ${44 + i * 24}`} />
      ))}

      <path className="d-accent-line d-flow" pathLength={1} d="M 300 152 L 30 152" markerEnd={AA} />
      <text className="d-t-accent d-beat" x="180" y="172" textAnchor="middle">backprop, written out by hand</text>
      <text className="d-t-sm" x="180" y="196" textAnchor="middle">no autograd — the gradients had nowhere to hide</text>
    </svg>
  );
}
