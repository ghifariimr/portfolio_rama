import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROJECTS } from "./data.js";

if (typeof history !== "undefined" && "scrollRestoration" in history) history.scrollRestoration = "manual";

export function navigate(to) {
  try { sessionStorage.setItem("rama-y:" + location.pathname, String(window.scrollY)); } catch {}
  history.pushState({}, "", to);
  window.dispatchEvent(new Event("nav"));
}
let busy = false;
export const releaseLock = () => { busy = false; };
const slugOf = (p) => (p.startsWith("/projects/") ? p.split("/")[2] : null);
/* Navigate with the Persona-style transition. kind: enter | next | prev | back (auto when omitted). */
export function go(to, kind) {
  if (busy || to === location.pathname + location.hash) return;
  const here = slugOf(location.pathname), dest = PROJECTS.find((p) => p.slug === slugOf(to)), cur = PROJECTS.find((p) => p.slug === here);
  const k = kind || (dest ? "enter" : here ? "back" : "plain");
  let meta;
  if (k === "back") meta = { aBig: "PROJECT", aLab: "EXITING...", bNum: "04", bTitle: "PROJECTS", bSub: "BACK TO THE CAROUSEL", scr: "KEEP MOVING." };
  else if (dest) meta = { aNum: (k === "enter" ? dest : cur || dest).n, aLab: k === "next" ? "NEXT PROJECT" : k === "prev" ? "PREVIOUS PROJECT" : "ENTERING PROJECT", bNum: dest.n, bTitle: dest.t, bSub: dest.sub, scr: k === "next" ? "NEXT." : k === "prev" ? "BACK." : "LET'S GO." };
  else { navigate(to); return; }
  busy = true;
  setTimeout(releaseLock, 2500); // safety
  window.dispatchEvent(new CustomEvent("pt:start", { detail: { to, meta } }));
}
export function usePath() {
  const [p, setP] = useState(location.pathname);
  useEffect(() => {
    const f = () => setP(location.pathname);
    addEventListener("popstate", f); addEventListener("nav", f);
    return () => { removeEventListener("popstate", f); removeEventListener("nav", f); };
  }, []);
  return p;
}
export function Link({ to, children, tkind, ...r }) {
  const onClick = (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault(); go(to, tkind);
  };
  return <a href={to} onClick={onClick} {...r}>{children}</a>;
}
export function useMotion() {
  const reduce = useReducedMotion();
  const up = (d = 0) => reduce ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.45, delay: d, ease: [0.2, 0.8, 0.2, 1] } };
  const slide = (d = 0) => reduce ? {} : { initial: { opacity: 0, x: -120 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d, ease: [0.2, 0.8, 0.2, 1] } };
  const head = (d = 0) => reduce ? {} : { initial: { opacity: 0, x: -40, skewX: -8 }, whileInView: { opacity: 1, x: 0, skewX: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.5, delay: d, ease: [0.2, 0.8, 0.2, 1] } };
  return { up, slide, head, reduce };
}

export function Img({ src, className = "", alt = "" }) {
  const [ok, setOk] = useState(true);
  return <div className={`img ${className}`}>{ok && <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setOk(false)} />}</div>;
}

const SHAPES = {
  bust: ["0 0 200 300", <><path d="M100 18 L118 40 L142 26 L136 60 L152 72 L140 102 C140 126 120 142 100 142 C80 142 60 126 60 102 L48 72 L64 60 L58 26 L82 40 Z" /><path d="M14 300 C14 218 58 168 100 162 C142 168 186 218 186 300 Z" /></>],
  stand: ["0 0 140 360", <><circle cx="70" cy="42" r="22" /><path d="M46 36 L52 10 L64 22 L74 4 L84 24 L98 14 L94 40 Z" /><path d="M44 68 L96 68 L116 220 L100 224 L94 350 L74 350 L70 240 L66 350 L46 350 L40 224 L24 220 Z" /></>],
  profile: ["0 0 200 300", <path d="M30 130 C30 62 70 22 120 32 L142 22 L132 48 L152 52 L136 68 C150 92 142 122 122 136 L130 152 L110 154 L110 190 C152 200 190 240 190 300 L10 300 C10 240 20 204 30 172 Z" />],
  /* masked thief: long coat, raised hand to the mask */
  thief: ["0 0 220 420", <>
    <path d="M96 34 L104 14 L116 24 L130 10 L134 32 L148 30 L140 50 L144 66 L126 80 L104 80 L92 66 L88 50 L76 44 Z" />
    <path className="ac" d="M96 50 L140 50 L134 64 L102 64 Z" />
    <path d="M100 80 L128 80 L156 118 L184 232 L206 330 L178 316 L170 410 L142 410 L124 270 L106 410 L78 410 L70 316 L40 336 L54 214 L86 116 Z" />
    <path d="M86 116 L52 98 L40 56 L52 52 L66 84 L96 100 Z" />
    <path d="M156 118 L196 156 L184 174 L152 146 Z" />
    <path className="ac" d="M40 56 L52 52 L54 60 L42 64 Z" />
  </>],
  /* red-accented masked acrobat mid-flip with two batons */
  vigilante: ["0 0 300 300", <>
    <circle cx="150" cy="58" r="17" />
    <path d="M134 44 L142 26 L152 38 L162 24 L168 44 Z" />
    <path className="ac" d="M136 54 L166 54 L164 64 L138 64 Z" />
    <path d="M138 80 L168 78 L184 150 L150 172 L130 142 Z" />
    <path d="M138 88 L100 62 L70 32 L82 24 L114 50 L146 78 Z" />
    <path d="M168 86 L214 102 L250 92 L254 104 L218 124 L170 108 Z" />
    <path d="M132 142 L108 192 L84 232 L96 240 L126 208 L152 170 Z" />
    <path d="M150 170 L200 202 L246 264 L232 272 L186 226 L140 188 Z" />
    <path className="ac" d="M70 32 L38 8 L34 14 L66 38 Z" />
    <path className="ac" d="M250 92 L292 70 L296 78 L254 104 Z" />
  </>],
  coat: ["0 0 160 320", <>
    <path d="M46 34 L114 34 L124 44 L36 44 Z" /><path d="M60 14 L100 14 L106 34 L54 34 Z" />
    <path d="M62 44 L98 44 L94 72 L66 72 Z" />
    <path d="M52 72 L108 72 L132 140 L142 310 L18 310 L28 140 Z" />
    <path className="ac" d="M70 50 L90 50 L88 58 L72 58 Z" />
  </>],
  crouch: ["0 0 260 200", <>
    <path d="M40 176 L60 124 L100 92 L150 88 L192 102 L222 152 L236 184 L202 186 L182 152 L150 142 L120 152 L98 186 Z" />
    <path d="M36 104 L48 78 L56 94 L70 80 L78 100 L74 116 L52 124 Z" />
    <path className="ac" d="M52 100 L68 100 L66 108 L54 108 Z" />
  </>],
  lunge: ["0 0 280 300", <>
    <circle cx="120" cy="52" r="16" /><path d="M104 40 L112 20 L122 34 L134 18 L138 42 Z" />
    <path d="M104 70 L136 66 L158 130 L132 160 L108 130 Z" />
    <path d="M136 76 L192 90 L262 80 L266 94 L196 114 L140 100 Z" />
    <path d="M110 140 L150 160 L206 226 L244 296 L222 298 L180 244 L128 196 Z" />
    <path d="M108 138 L84 190 L30 270 L40 290 L98 232 L130 160 Z" />
    <path className="ac" d="M262 80 L276 76 L278 90 L266 94 Z" />
  </>],
  tall: ["0 0 120 360", <>
    <path d="M60 14 L74 6 L78 26 L88 36 L80 64 L64 76 L48 62 L42 36 L52 28 Z" />
    <path d="M56 76 L72 76 L80 190 L66 200 L52 190 Z" />
    <path d="M56 84 L24 150 L8 240 L18 244 L36 170 L60 112 Z" />
    <path d="M74 84 L100 160 L110 250 L100 252 L84 176 L68 112 Z" />
    <path d="M54 190 L46 280 L34 350 L48 352 L64 280 L68 200 Z" />
    <path d="M68 200 L82 280 L90 350 L102 346 L92 276 L80 196 Z" />
    <path className="ac" d="M56 38 L72 36 L72 46 L56 48 Z" />
  </>],
};
export function Sil({ className = "", v = "bust" }) {
  const [vb, body] = SHAPES[v] || SHAPES.bust;
  return <svg className={`sil dk ${className}`} viewBox={vb} aria-hidden="true" focusable="false">{body}</svg>;
}
const DIAMONDS = [[6,12,10,0],[14,58,7,2],[22,30,14,4,1],[31,82,8,1],[44,8,9,3],[52,46,6,5],[63,90,12,2,1],[71,20,8,6],[80,64,10,1],[88,34,14,3,1],[93,80,7,4],[96,10,9,0],[9,40,12,2,2],[48,70,10,5,2],[76,52,12,1,2],[38,26,8,0,2]];
/* sparse starfield = 3 elements total (each uses many box-shadows), animated with opacity only */
function rng(seed) { return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const stars = (n, seed, col) => { const r = rng(seed); return Array.from({ length: n }, () => `${(r() * 100).toFixed(1)}vw ${(r() * 100).toFixed(1)}vh 0 ${r() > 0.8 ? 1 : 0}px ${col(r)}`).join(","); };
const STARS_A = stars(22, 7, (r) => `rgba(244,241,234,${(0.25 + r() * 0.4).toFixed(2)})`);
const STARS_B = stars(14, 23, (r) => `rgba(244,241,234,${(0.2 + r() * 0.35).toFixed(2)})`);
const STARS_C = stars(9, 41, (r) => `rgba(229,9,20,${(0.35 + r() * 0.4).toFixed(2)})`);
export function Bg() {
  return (
    <div className="bg" aria-hidden="true">
      <svg width="0" height="0" style={{ position: "absolute" }} focusable="false"><defs>
        <pattern id="sil-ht" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#1a0000" /><circle cx="3" cy="3" r="1.4" fill="#8B0000" /></pattern>
      </defs></svg>
      <div className="bgl l1"><Sil className="s-l" v="thief" /><Sil className="s-r" v="vigilante" /><Sil className="s-v" v="crouch" /></div>
      <div className="bgl l2">
        <i className="stars a" style={{ boxShadow: STARS_A }} /><i className="stars b" style={{ boxShadow: STARS_B }} /><i className="stars c" style={{ boxShadow: STARS_C }} />
        {DIAMONDS.map(([l, t, z, d, st], i) => (
          <i key={i} className={`dm ${st === 1 ? "st" : st === 2 ? "cr" : ""} ${i % 3 === 0 ? "mv" : ""}`}
            style={{ left: l + "%", top: t + "%", "--s": z * (st ? 2 : 1) + "px", "--dl": d + "s", "--dx": (i % 2 ? 1 : -1) * 14 + "px" }} />
        ))}
      </div>
    </div>
  );
}
export function Scr({ children, className = "" }) {
  return <span className={`scr ${className}`} aria-hidden="true">{children}</span>;
}
export function Wipe({ k }) {
  const { reduce } = useMotion();
  const a = (from) => reduce ? {} : { initial: from, whileInView: { x: 0, opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] } };
  return (
    <div className={`wp ${k}`} aria-hidden="true">
      <motion.i className="w2" {...a({ x: "60%", opacity: 0 })} />
      <motion.i className="w1" {...a({ x: "-60%", opacity: 0 })} />
    </div>
  );
}
