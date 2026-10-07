import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Sil, Scr } from "./shared.jsx";

export default function Intro({ onEnter, onDone }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState("in"); // in -> cover -> out
  const btn = useRef(null);
  useEffect(() => { btn.current?.focus({ preventScroll: true }); }, []);
  const go = () => {
    if (phase !== "in") return;
    if (reduce) { setPhase("out"); onEnter(); setTimeout(onDone, 300); return; }
    setPhase("cover");
    setTimeout(() => { setPhase("out"); onEnter(); }, 520);
    setTimeout(onDone, 1150);
  };
  return (
    <div className={`intro ${phase}`} role="dialog" aria-label="Portfolio intro">
      <div className="i-dots" />
      <i className="i-rp a" /><i className="i-rp b" /><i className="i-slash" />
      <Sil className="i-sil" v="stand" />
      <i className="i-dm d1" /><i className="i-dm d2" /><i className="i-dm d3" /><i className="i-dm d4" />
      <svg className="i-scr" viewBox="0 0 320 90" aria-hidden="true"><path d="M8 70 C60 40 110 84 170 56 S270 70 312 30" /><path d="M262 8 L300 24 L270 44" /></svg>
      <Scr className="i-note">PLAN. BUILD. LEAD.</Scr>
      <i className="i-sweep" />
      <div className="i-core">
        <h1 className="in-name"><span className="in-mask"><b className="gh">GHIFARII</b></span></h1>
        <p className="in-sub">MUHAMMAD <em>RAMADHAN</em></p>
        <p className="i-lab i-el" style={{ "--dl": "1.6s" }}>PERSONAL PORTFOLIO</p>
        <button ref={btn} className="in-btn i-el" style={{ "--dl": "1.85s" }} onClick={go}><span>VIEW PORTFOLIO <b>→</b></span></button>
      </div>
      <i className="i-wipe" /><i className="i-wipe2" />
    </div>
  );
}
