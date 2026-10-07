import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function navigate(to) { history.pushState({}, "", to); window.dispatchEvent(new Event("nav")); }
export function usePath() {
  const [p, setP] = useState(location.pathname);
  useEffect(() => {
    const f = () => setP(location.pathname);
    addEventListener("popstate", f); addEventListener("nav", f);
    return () => { removeEventListener("popstate", f); removeEventListener("nav", f); };
  }, []);
  return p;
}
export function Link({ to, children, ...r }) {
  return <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }} {...r}>{children}</a>;
}
export function useMotion() {
  const reduce = useReducedMotion();
  const up = (d = 0) => reduce ? {} : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5, delay: d, ease: [0.2, 0.8, 0.2, 1] } };
  const slide = (d = 0) => reduce ? {} : { initial: { opacity: 0, x: -120 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d, ease: [0.2, 0.8, 0.2, 1] } };
  return { up, slide, reduce };
}

export function Img({ src, className = "", alt = "" }) {
  const [ok, setOk] = useState(true);
  return <div className={`img ${className}`}>{ok && <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setOk(false)} />}</div>;
}

const SHAPES = {
  bust: ["0 0 200 300", <><path d="M100 18 L118 40 L142 26 L136 60 L152 72 L140 102 C140 126 120 142 100 142 C80 142 60 126 60 102 L48 72 L64 60 L58 26 L82 40 Z" /><path d="M14 300 C14 218 58 168 100 162 C142 168 186 218 186 300 Z" /></>],
  stand: ["0 0 140 360", <><circle cx="70" cy="42" r="22" /><path d="M46 36 L52 10 L64 22 L74 4 L84 24 L98 14 L94 40 Z" /><path d="M44 68 L96 68 L116 220 L100 224 L94 350 L74 350 L70 240 L66 350 L46 350 L40 224 L24 220 Z" /><path d="M44 70 L18 150 L30 154 L50 100 Z" /><path d="M96 70 L122 150 L110 154 L90 100 Z" /></>],
  profile: ["0 0 200 300", <path d="M30 130 C30 62 70 22 120 32 L142 22 L132 48 L152 52 L136 68 C150 92 142 122 122 136 L130 152 L110 154 L110 190 C152 200 190 240 190 300 L10 300 C10 240 20 204 30 172 Z" />],
};
export function Sil({ className = "", v = "bust" }) {
  const [vb, body] = SHAPES[v] || SHAPES.bust;
  return <svg className={`sil ${className}`} viewBox={vb} aria-hidden="true">{body}</svg>;
}
const DIAMONDS = [[6,12,10,0],[14,58,7,2],[22,30,14,4,1],[31,82,8,1],[44,8,9,3],[52,46,6,5],[63,90,12,2,1],[71,20,8,6],[80,64,10,1],[88,34,14,3,1],[93,80,7,4],[96,10,9,0],[9,40,12,2,2],[48,70,10,5,2],[76,52,12,1,2],[38,26,8,0,2]];
export function Bg() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bgl l1"><Sil className="s-l" v="stand" /><Sil className="s-r" v="profile" /></div>
      <div className="bgl l2">
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
