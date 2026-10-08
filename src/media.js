import { useEffect, useRef, useState } from "react";

const EXTS = ["jpg", "jpeg", "png", "webp"];
const isAbs = (s) => /^(https?:)?\/\//i.test(s) || s.startsWith("data:");

/* Files in /public are served from the site root: "/public/images/a.jpg" -> "/images/a.jpg". */
export function normalize(src) {
  if (!src) return "";
  const t = String(src).trim();
  if (isAbs(t)) return t;
  const s = t.replace(/\\/g, "/").replace(/^\.?\/?public\//i, "/");
  return s.startsWith("/") ? s : "/" + s;
}

/* Ordered candidate URLs for one media entry (or an explicit array of entries):
   the exact path first, then zero-padded / unpadded numbering (proof-1 <-> proof-01)
   and the other image extensions (jpg, jpeg, png, webp, plus upper-case). */
export function candidates(src) {
  if (Array.isArray(src)) return [...new Set(src.flatMap(candidates))];
  const s = normalize(src);
  if (!s) return [];
  if (isAbs(s)) return [s];
  const m = s.match(/^(.*?)(?:\.([a-z0-9]+))?$/i);
  const base = m[1], ext = m[2] || "";
  const bases = [base];
  const n = base.match(/^(.*?)(\d+)$/);
  if (n) {
    const alt = n[2].length > 1 && n[2].startsWith("0") ? n[1] + parseInt(n[2], 10) : n[1] + n[2].padStart(2, "0");
    if (alt !== base) bases.push(alt);
  }
  const exts = [...new Set([ext, ...EXTS, ...EXTS.map((e) => e.toUpperCase())].filter(Boolean))];
  return bases.flatMap((b) => exts.map((e) => `${b}.${e}`));
}

const cache = new Map();
const probe = (url) => new Promise((res) => {
  const im = new Image();
  im.onload = () => res(im.naturalWidth > 0);
  im.onerror = () => res(false);
  im.src = url;
});

/* Resolves to the first URL that really loads as an image, or null. Cached per entry. */
export function resolveMedia(src) {
  const list = candidates(src), key = list.join("|");
  if (!key) return Promise.resolve(null);
  if (!cache.has(key)) {
    cache.set(key, (async () => {
      for (const url of list) if (await probe(url)) return url;
      if (import.meta.env && import.meta.env.DEV) console.info("[media] not found. Tried:", list);
      return null;
    })());
  }
  return cache.get(key);
}

export function useMedia(src, enabled = true) {
  const key = candidates(src).join("|");
  const [st, setSt] = useState({ key: "", status: "loading", url: null });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    resolveMedia(src).then((url) => alive && setSt({ key, status: url ? "ok" : "missing", url }));
    return () => { alive = false; };
  }, [key, enabled]);
  return st.key === key ? st : { status: "loading", url: null };
}

export function useMediaList(srcs, enabled = true) {
  const key = JSON.stringify(srcs);
  const [res, setRes] = useState({ key: "", urls: [] });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    Promise.all(srcs.map((s) => resolveMedia(s))).then((urls) => alive && setRes({ key, urls }));
    return () => { alive = false; };
  }, [key, enabled]);
  return res.key === key
    ? res.urls.map((url) => ({ status: url ? "ok" : "missing", url }))
    : srcs.map(() => ({ status: "loading", url: null }));
}

/* true once the element is near the viewport (or immediately when eager) */
export function useSeen(eager = false, margin = "300px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(eager);
  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, margin]);
  return [ref, seen];
}
