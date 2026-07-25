"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS } from "@/content/projects";
import { PROFILE } from "@/content/profile";
import {
  LAYERS,
  SPANS,
  EMPLOYMENT,
  MARKERS,
  T_START,
  T_END,
  formatTime,
  packLane,
} from "@/content/trace";
import DetailPanel from "./DetailPanel";
import InfoOverlay, { type InfoSection } from "./InfoOverlay";
import MobileList from "./MobileList";

const ROW_H = 30;
const SPAN_TOP = 4;

/** Decimal year → percentage across the plot. */
const pct = (t: number) => ((t - T_START) / (T_END - T_START)) * 100;

const bySlug = new Map(PROJECTS.map((p) => [p.slug, p]));

export default function TraceApp() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoSection | null>(null);
  // Both the time under the cursor and its pixel offset within .trace —
  // positioning it in CSS would need a percentage times a length, which calc()
  // can't do.
  const [playhead, setPlayhead] = useState<{ t: number; x: number } | null>(null);
  const [narrow, setNarrow] = useState(false);
  const traceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Per-layer packed rows, so overlapping spans never draw on top of each other. */
  const lanes = useMemo(
    () =>
      LAYERS.map((layer, depth) => {
        const spans = SPANS.filter((s) => s.depth === depth);
        const { rows, count } = packLane(spans);
        return { layer, depth, spans, rows, count };
      }),
    []
  );

  /** Chronological order drives prev/next in the panel. */
  const order = useMemo(
    () => [...SPANS].sort((a, b) => a.start - b.start).map((s) => s.slug),
    []
  );

  const step = useCallback(
    (delta: number) => {
      setActive((cur) => {
        if (cur === null) return cur;
        const i = order.indexOf(cur);
        return order[(i + delta + order.length) % order.length];
      });
    },
    [order]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (info) setInfo(null);
        else setActive(null);
      }
      if (active === null) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, info, step]);

  const onMove = (e: React.MouseEvent) => {
    const el = traceRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gutter = parseFloat(getComputedStyle(el).gridTemplateColumns.split(" ")[0]) || 232;
    const x = e.clientX - r.left - gutter;
    const w = r.width - gutter;
    if (x < 0 || x > w) {
      setPlayhead(null);
      return;
    }
    setPlayhead({ t: T_START + (x / w) * (T_END - T_START), x: gutter + x });
  };

  const hoveredProject = hovered ? bySlug.get(hovered) : null;
  const hoveredSpan = hovered ? SPANS.find((s) => s.slug === hovered) : null;

  return (
    <div className="app">
      <header className="topbar">
        <span className="name">
          {PROFILE.name.first} {PROFILE.name.last}
        </span>
        <span className="role">{PROFILE.role}</span>
        <span className="spacer" />
        <nav>
          {(["experience", "skills", "about", "contact"] as InfoSection[]).map((s) => (
            <button
              key={s}
              onClick={() => setInfo(s)}
              aria-pressed={info === s}
            >
              {s}
            </button>
          ))}
        </nav>
      </header>

      {narrow ? (
        <MobileList lanes={lanes} onOpen={setActive} />
      ) : (
        <div
          className="trace"
          ref={traceRef}
          onMouseMove={onMove}
          onMouseLeave={() => setPlayhead(null)}
        >
          {/* ── ruler ── */}
          <div className="trow ruler-row">
          <div className="cell-label">
            <span className="l-depth">Depth ↓ / Time →</span>
          </div>
          <div className="cell-plot ruler">
            {ticks().map((t) => (
              <i
                key={t.at}
                className={`tick${t.major ? "" : " minor"}`}
                style={{ left: `${pct(t.at)}%` }}
              >
                <span className="t">{t.label}</span>
              </i>
            ))}
            {MARKERS.map((m) => (
              <span className="marker" key={m.label} style={{ left: `${pct(m.at)}%` }}>
                <span>{m.label}</span>
                <i />
              </span>
            ))}
          </div>
          </div>

          {/* ── employment track ── */}
          <div className="trow">
          <div className="cell-label">
            <span className="l-name">Employment</span>
            <span className="l-sub">roles held</span>
          </div>
          <div className="cell-plot track">
            <LaneGrid />
            {EMPLOYMENT.map((e) => (
              <div
                key={e.org}
                className="emp"
                style={{ left: `${pct(e.start)}%`, width: `${pct(e.end) - pct(e.start)}%` }}
              >
                <b>{e.role}</b>
                <span>{e.org}</span>
              </div>
            ))}
          </div>
          </div>

          {/* ── stack lanes ── */}
          {lanes.map(({ layer, depth, spans, rows, count }) => (
            <Lane
              key={layer.id}
              layer={layer}
              depth={depth}
              spans={spans}
              rows={rows}
              count={count}
              active={active}
              hovered={hovered}
              onHover={setHovered}
              onOpen={setActive}
            />
          ))}

          {playhead !== null && (
            <div className="playhead" style={{ left: playhead.x }}>
              <b>{formatTime(playhead.t)}</b>
            </div>
          )}
        </div>
      )}

      <footer className="statusbar">
        {hoveredProject && hoveredSpan ? (
          <>
            <span className="k">{LAYERS[hoveredSpan.depth].label}</span>
            <span className="v">{hoveredProject.name}</span>
            <span className="sep">·</span>
            <span>
              {formatTime(hoveredSpan.start)} → {formatTime(hoveredSpan.end)}
            </span>
            <span className="sep">·</span>
            <span>{hoveredProject.tags.join(" / ")}</span>
          </>
        ) : (
          <>
            <span className="k">{SPANS.length} projects</span>
            <span className="sep">·</span>
            <span>
              {formatTime(T_START)} → {formatTime(T_END)}
            </span>
            <span className="sep">·</span>
            <span>{LAYERS.length} layers, product down to silicon</span>
          </>
        )}
        <span className="hint">click a span to open · ← → to page · esc to close</span>
      </footer>

      {active && (
        <>
          <div className="scrim" onClick={() => setActive(null)} />
          <DetailPanel slug={active} onClose={() => setActive(null)} onStep={step} />
        </>
      )}
      {info && <InfoOverlay section={info} onClose={() => setInfo(null)} />}
    </div>
  );
}

function LaneGrid() {
  return (
    <div className="lane-grid">
      {ticks().map((t) => (
        <i key={t.at} style={{ left: `${pct(t.at)}%` }} />
      ))}
    </div>
  );
}

interface LaneProps {
  layer: (typeof LAYERS)[number];
  depth: number;
  spans: typeof SPANS;
  rows: Map<string, number>;
  count: number;
  active: string | null;
  hovered: string | null;
  onHover: (s: string | null) => void;
  onOpen: (s: string) => void;
}

function Lane({ layer, depth, spans, rows, count, active, hovered, onHover, onOpen }: LaneProps) {
  const minH = count * ROW_H + 12;
  return (
    <div className="trow lane" style={{ minHeight: minH }}>
      <div className="cell-label">
        <div className="l-row">
          <i className="swatch" style={{ background: layer.color }} />
          <span className="l-name">{layer.label}</span>
        </div>
        <span className="l-sub">{layer.sub}</span>
        <span className="l-depth" style={{ marginTop: 4 }}>depth {depth}</span>
      </div>
      <div className="cell-plot">
        <LaneGrid />
        <div className="rows-box" style={{ height: count * ROW_H }}>
        {spans.map((s) => {
          const p = bySlug.get(s.slug);
          if (!p) return null;
          const row = rows.get(s.slug) ?? 0;
          const isActive = active === s.slug;
          const isDim = hovered !== null && hovered !== s.slug;
          return (
            <button
              key={s.slug}
              className={`span${isActive ? " active" : ""}${isDim ? " dim" : ""}`}
              style={{
                left: `${pct(s.start)}%`,
                width: `${Math.max(pct(s.end) - pct(s.start), 1.2)}%`,
                top: row * ROW_H + SPAN_TOP,
                background: layer.color,
              }}
              onMouseEnter={() => onHover(s.slug)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(s.slug)}
              onBlur={() => onHover(null)}
              onClick={() => onOpen(s.slug)}
              title={`${p.name} · ${formatTime(s.start)} → ${formatTime(s.end)}`}
            >
              <span>{p.name}</span>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}

/** Year majors plus quarter minors across the trace window. */
function ticks() {
  const out: { at: number; label: string; major: boolean }[] = [];
  for (let y = Math.ceil(T_START); y <= Math.floor(T_END); y++) {
    out.push({ at: y, label: String(y), major: true });
    for (const q of [0.25, 0.5, 0.75]) {
      const at = y + q;
      if (at < T_END) out.push({ at, label: `Q${q * 4 + 1}`, major: false });
    }
  }
  return out;
}
