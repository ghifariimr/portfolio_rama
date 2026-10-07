import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "./data.js";
import { Link, useMotion, Sil } from "./shared.jsx";

const kindOf = (m) => m.type || "image";

export function ProjectMediaGallery({ media = [], slots = [], slug }) {
  const [o, setO] = useState(-1), ts = useRef(0), n = media.length, open = o >= 0;
  useEffect(() => {
    if (!open) return;
    const k = (e) => {
      if (e.key === "Escape") setO(-1);
      if (e.key === "ArrowRight") setO((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setO((x) => (x - 1 + n) % n);
    };
    addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, n]);
  if (!n) return (
    <div className="gal">
      {slots.map((s, i) => <div key={i} className="slot"><span>[ {s} ]</span><small>Add files to /public/projects/{slug}/ and list them in data.js → media</small></div>)}
    </div>
  );
  const m = media[o];
  const step = (d) => setO((x) => (x + d + n) % n);
  return (
    <>
      <div className="gal">
        {media.map((x, i) => (
          <button key={i} className="gt" onClick={() => setO(i)}>
            {kindOf(x) === "image" ? <img loading="lazy" src={x.src} alt={x.caption || ""} /> : <span className="gk">{kindOf(x).toUpperCase()}</span>}
            {x.caption && <em>{x.caption}</em>}
          </button>
        ))}
      </div>
      {open && (
        <div className="lb" onClick={(e) => e.target === e.currentTarget && setO(-1)}
          onTouchStart={(e) => (ts.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - ts.current; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); }}>
          <div className="lb-stage">
            {kindOf(m) === "image" && <img src={m.src} alt={m.caption || ""} />}
            {kindOf(m) === "video" && (/\.(mp4|webm)$/i.test(m.src) ? <video src={m.src} controls /> : <iframe src={m.src} title={m.caption || "video"} allowFullScreen />)}
            {kindOf(m) === "pdf" && <><iframe src={m.src} title={m.caption || "document"} /><a className="lb-open" href={m.src} target="_blank" rel="noreferrer">OPEN PDF ↗</a></>}
            {kindOf(m) === "link" && <a className="lb-open big" href={m.src} target="_blank" rel="noreferrer">{m.caption || "OPEN LINK"} ↗</a>}
          </div>
          <div className="lb-bar">
            <button onClick={() => step(-1)}>← PREV</button>
            <span><b>{String(o + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}{m.caption ? " · " + m.caption : ""}</span>
            <button onClick={() => step(1)}>NEXT →</button>
            <button className="x" onClick={() => setO(-1)} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}

function Block({ n, t, children }) {
  const { up } = useMotion();
  return <motion.section className="pb" {...up()}><h2><b>{n}</b>{t}</h2>{children}</motion.section>;
}

export default function ProjectPage({ p }) {
  const i = PROJECTS.findIndex((x) => x.slug === p.slug), prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
  const hero = p.media?.find((m) => kindOf(m) === "image");
  useEffect(() => { window.scrollTo(0, 0); }, [p.slug]);
  return (
    <main className="pp">
      <section className="pp-hero">
        <Sil className="s-p" /><i className="pp-poly" /><i className="pp-slash" />
        <Link to="/#projects" className="back">← PROJECTS</Link>
        <span className="pp-num">PROJECT {p.n}</span>
        <h1>{p.t}</h1>
        <p className="psub">{p.sub}</p><p className="chip">{p.role}</p>
        <div className="pp-media">{hero ? <img src={hero.src} alt={p.t} /> : <div className="pp-fall"><span>{p.n}</span></div>}</div>
      </section>
      <div className="pp-body">
        <aside className="meta">
          <dl>
            <div><dt>PROJECT</dt><dd>{p.t}</dd></div>
            <div><dt>ROLE</dt><dd>{p.role}</dd></div>
            <div><dt>TYPE</dt><dd>{p.type}</dd></div>
            <div><dt>{p.techLabel || "TOOLS / METHODS"}</dt><dd className="tl">{p.tools.map((x) => <span key={x}>{x}</span>)}</dd></div>
          </dl>
        </aside>
        <div className="pp-main">
          <Block n="01" t="DESCRIPTION"><p>{p.overview}</p></Block>
          <Block n="02" t="OBJECTIVE"><p>{p.objective}</p></Block>
          <Block n="03" t="PROCESS"><ul className="rl">{p.process.map((x) => <li key={x}>{x}</li>)}</ul></Block>
          <Block n="04" t="KEY CONTRIBUTION">
            <p>{p.myRole}</p>
            <ul className="rl" style={{ marginTop: 16 }}>{p.resp.map((x) => <li key={x}>{x}</li>)}</ul>
            {p.respNote && <p className="note">{p.respNote}</p>}
          </Block>
          <Block n="05" t="OUTCOME"><p>{p.outcome}</p></Block>
          <Block n="06" t="CONCLUSION"><p>{p.conclusion}</p></Block>
          <Block n="07" t="MEDIA / PROOF OF WORK">
            <ProjectMediaGallery media={p.media} slots={p.slots} slug={p.slug} />
            {p.links?.length > 0 && <div className="plinks">{p.links.map((l) => <a key={l.label} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label} <b>↗</b></a>)}</div>}
          </Block>
        </div>
      </div>
      <nav className="pnav">
        {prev ? <Link to={`/projects/${prev.slug}`}>← PREVIOUS<strong>{prev.t}</strong></Link> : <Link to="/#projects">← PROJECTS<strong>BACK</strong></Link>}
        <Link to="/#projects" className="mid">BACK TO PROJECTS</Link>
        {next ? <Link to={`/projects/${next.slug}`} className="r">NEXT →<strong>{next.t}</strong></Link> : <Link to="/#projects" className="r">PROJECTS →<strong>BACK</strong></Link>}
      </nav>
    </main>
  );
}
