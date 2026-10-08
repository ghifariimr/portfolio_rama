import { useEffect } from "react";
import { useMedia, useSeen } from "./media.js";

export function Placeholder({ label, caption }) {
  return (
    <span className="mi-ph" role="img" aria-label={`${label || "Media"}: placeholder, media not available`}>
      {label && <b>{label}</b>}
      {caption && <em>{caption}</em>}
      <span>PLACEHOLDER · MEDIA NOT AVAILABLE</span>
    </span>
  );
}

/* Shows the real file when it exists (auto-detects numbering/extension variants),
   otherwise a clearly-labelled placeholder. Never renders a broken-image icon. */
export default function MediaImage({ src, alt = "", eager = false, fallback, label, caption, className = "", onStatus }) {
  const [ref, seen] = useSeen(eager);
  const { status, url } = useMedia(src, seen);
  useEffect(() => { if (onStatus) onStatus(status, url); }, [status, url]);
  return (
    <span ref={ref} className={`mi ${className}`} data-status={status}>
      {status === "ok" && <img src={url} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" draggable="false" />}
      {status === "missing" && (fallback ?? <Placeholder label={label} caption={caption} />)}
    </span>
  );
}
