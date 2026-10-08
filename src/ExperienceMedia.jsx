import { useRef, useState } from "react";
import { useMediaList, useSeen } from "./media.js";
import { Scr } from "./shared.jsx";

/* Data: experience.media = [{ src, caption }]. Entries whose file is missing are skipped;
   if none exist a labelled placeholder is shown. Numbering/extension variants are auto-detected. */
export default function ExperienceMedia({ media = [] }) {
  const [rootRef, seen] = useSeen(false, "200px");
  const states = useMediaList(media.map((m) => m.src), seen);
  const [i, setI] = useState(0), [dir, setDir] = useState(1), ts = useRef(0);
  if (!media.length) return null;
  const avail = media.map((m, k) => ({ ...m, url: states[k].url })).filter((_, k) => states[k].status === "ok");
  const loading = !seen || states.some((s) => s.status === "loading");
  const n = avail.length, idx = n ? Math.min(i, n - 1) : 0, m = avail[idx];
  const step = (d) => { setDir(d); setI((idx + d + n) % n); };
  const tag = `PROOF_${String(idx + 1).padStart(2, "0")}`;
  return (
    <div ref={rootRef} className="xm" tabIndex={0} aria-label={n ? `Experience proof, item ${idx + 1} of ${n}` : "Experience proof"}
      onKeyDown={(e) => { if (n > 1 && e.key === "ArrowRight") step(1); if (n > 1 && e.key === "ArrowLeft") step(-1); }}
      onTouchStart={(e) => { ts.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - ts.current; if (n > 1 && Math.abs(d) > 50) step(d < 0 ? 1 : -1); }}>
      <p className="xm-h">EXPERIENCE PROOF</p>
      <div className="xm-frame">
        <i className="xm-off" />
        <div className="xm-ring">
          <div className="xm-img" key={idx} style={{ "--d": dir }}>
            {n > 0 && <img src={m.url} alt={m.caption || "Experience media"} loading="lazy" decoding="async" draggable="false" />}
            {n === 0 && !loading && <div className="xm-ph"><b>{tag}</b><span>PLACEHOLDER · MEDIA NOT AVAILABLE</span></div>}
            {(n > 0 || !loading) && <span className="xm-tag">{tag}</span>}
          </div>
        </div>
        <Scr className="xm-scr">PROOF.</Scr>
      </div>
      <div className="xm-bar">
        {n > 0 && <span className="xm-idx"><b>{String(idx + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}</span>}
        <span className="xm-cap">{(m && m.caption) || "PROJECT MEDIA"}</span>
        {n > 1 && (
          <span className="xm-ctl">
            <button type="button" onClick={() => step(-1)} aria-label="Previous proof image">‹ PREVIOUS</button>
            <button type="button" onClick={() => step(1)} aria-label="Next proof image">NEXT ›</button>
          </span>
        )}
      </div>
    </div>
  );
}
