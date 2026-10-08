import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { useMedia } from "./media.js";

function ViewerMedia({ item, fallback }) {
  const t = item.type || "image";
  const { status, url } = useMedia(item.src, t === "image");
  if (t === "video") return /\.(mp4|webm)$/i.test(item.src) ? <video className="lbx-img" src={item.src} controls playsInline /> : <div className="lbx-embed"><iframe src={item.src} title={item.caption || "video"} allowFullScreen /></div>;
  if (t === "pdf") return <div className="lbx-embed"><iframe src={item.src} title={item.caption || "document"} /><a className="lbx-link" href={item.src} target="_blank" rel="noopener noreferrer">OPEN PDF ↗</a></div>;
  if (t === "link") return <a className="lbx-link big" href={item.src} target="_blank" rel="noopener noreferrer">{item.caption || "OPEN LINK"} ↗</a>;
  if (status === "ok") return <img className="lbx-img" src={url} alt={item.caption || item.label || ""} draggable="false" />;
  if (status === "missing") return <div className="lbx-mock">{fallback}</div>;
  return <div className="lbx-load" aria-hidden="true" />;
}

/* Full-viewport viewer rendered in a portal (so no parent stacking context / transform can trap it).
   Close: X button, CLOSE button, Escape, click outside the frame, browser Back. Body scroll is locked while open. */
export default function Lightbox({ items, index, onIndex, onClose, fallback }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(false);
  const closing = useRef(false), popped = useRef(false), timer = useRef(0), ts = useRef(0);
  const closeBtn = useRef(null), root = useRef(null);
  const n = items.length, item = items[index];
  const onCloseRef = useRef(onClose); onCloseRef.current = onClose;
  const stepRef = useRef(null);
  stepRef.current = (d) => onIndex((index + d + n) % n);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (reduce) { onCloseRef.current(); return; }
    setOut(true);
    timer.current = setTimeout(() => onCloseRef.current(), 280);
  }, [reduce]);

  useEffect(() => { // lock + restore body scroll, move focus in and back out
    const prev = document.activeElement, body = document.body, ov = body.style.overflow;
    body.style.overflow = "hidden";
    closeBtn.current && closeBtn.current.focus({ preventScroll: true });
    return () => { body.style.overflow = ov; clearTimeout(timer.current); if (prev && prev.focus) prev.focus({ preventScroll: true }); };
  }, []);

  useEffect(() => { // browser Back closes the viewer
    history.pushState({ lb: true }, "", location.href);
    const pop = () => { popped.current = true; closing.current = true; onCloseRef.current(); };
    addEventListener("popstate", pop);
    return () => {
      removeEventListener("popstate", pop);
      if (!popped.current && history.state && history.state.lb) history.back();
    };
  }, []);

  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      else if (n > 1 && e.key === "ArrowRight") stepRef.current(1);
      else if (n > 1 && e.key === "ArrowLeft") stepRef.current(-1);
      else if (e.key === "Tab" && root.current) {
        const f = root.current.querySelectorAll("button,a[href]");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", k, true);
    return () => removeEventListener("keydown", k, true);
  }, [close, n]);

  return createPortal(
    <div ref={root} className={`lbx ${out ? "out" : ""}`} role="dialog" aria-modal="true" aria-label="Image viewer"
      onClick={(e) => { if (!e.target.closest("[data-keep]")) close(); }}
      onTouchStart={(e) => { ts.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - ts.current; if (n > 1 && Math.abs(d) > 60) stepRef.current(d < 0 ? 1 : -1); }}>
      <i className="lbx-dots" />
      <button type="button" ref={closeBtn} className="lbx-x" onClick={close} aria-label="Close image viewer"><span aria-hidden="true">✕</span></button>
      <div className="lbx-stage">
        <figure className="lbx-fig" data-keep>
          <div className="lbx-wrap">
            <i className="lbx-off" />
            <div className="lbx-ring"><ViewerMedia key={index} item={item} fallback={fallback ? fallback(index) : null} /></div>
          </div>
          <figcaption>{item.label && <b>{item.label}</b>}{item.label && item.caption ? " · " : ""}{item.caption}</figcaption>
        </figure>
      </div>
      <div className="lbx-bar" data-keep>
        {n > 1 && <button type="button" onClick={() => stepRef.current(-1)} aria-label="Previous image">← PREV</button>}
        {n > 1 && <span className="lbx-count"><b>{String(index + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}</span>}
        {n > 1 && <button type="button" onClick={() => stepRef.current(1)} aria-label="Next image">NEXT →</button>}
        <button type="button" className="lbx-close" onClick={close} aria-label="Close image viewer">CLOSE</button>
      </div>
    </div>,
    document.body
  );
}
