import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { navigate, releaseLock, Scr } from "./shared.jsx";

/* One reusable Persona-style transition: black cover -> red angular wipe -> reveal (~0.8s).
   Trigger it with go(to, kind) / <Link tkind="enter|next|prev|back"> from shared.jsx. */
export default function PageTransition() {
  const reduce = useReducedMotion();
  const [st, setSt] = useState(null);
  useEffect(() => {
    let timers = [];
    const on = (e) => {
      const { to, meta } = e.detail;
      const T = reduce ? [10, 40, 80, 150, 260] : [20, 240, 290, 470, 740];
      setSt({ stage: 0, meta });
      timers = [
        setTimeout(() => setSt((s) => s && { ...s, stage: 1 }), T[0]),
        setTimeout(() => setSt((s) => s && { ...s, stage: 2 }), T[1]),
        setTimeout(() => navigate(to), T[2]),
        setTimeout(() => setSt((s) => s && { ...s, stage: 3 }), T[3]),
        setTimeout(() => { setSt(null); releaseLock(); }, T[4]),
      ];
    };
    window.addEventListener("pt:start", on);
    return () => { window.removeEventListener("pt:start", on); timers.forEach(clearTimeout); releaseLock(); };
  }, [reduce]);
  if (!st) return null;
  const m = st.meta;
  return (
    <div className={`pt s${st.stage} ${reduce ? "rd" : ""}`} aria-hidden="true">
      <i className="pt-k" /><i className="pt-r" /><i className="pt-d" />
      <div className="pt-a">
        {m.aBig ? <span className="pt-n pt-big">{m.aBig}</span> : <span className="pt-n">{m.aNum}</span>}
        <span className="pt-tag">{m.aLab}</span>
      </div>
      <div className="pt-b">
        <span className="pt-n">{m.bNum}</span>
        <span className="pt-t">{m.bTitle}</span>
        <span className="pt-tag dark">{m.bSub}</span>
        <Scr className="pt-scr">{m.scr}</Scr>
      </div>
    </div>
  );
}
