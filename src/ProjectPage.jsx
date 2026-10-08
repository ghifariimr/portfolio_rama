import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "./data.js";
import { Link, useMotion, Sil } from "./shared.jsx";
import { Mock, ProjectVisual } from "./mock.jsx";
import MediaImage from "./MediaImage.jsx";
import Lightbox from "./Lightbox.jsx";

/* Reusable gallery. media: [{ src, label, caption, type? }]. Missing files fall back to a labelled placeholder graphic. */
export function ProjectMediaGallery({ media = [], slug }) {
  const [o, setO] = useState(-1);
  if (!media.length) return null;
  const mock = (i) => <Mock slug={slug} v={i % 5} />;
  return (
    <>
      <div className="gal">
        {media.map((x, i) => (
          <div className="gi" key={i}>
            <i className="gi-off" />
            <button type="button" className="gt" onClick={() => setO(i)} aria-label={`Open ${x.label || "media"}: ${x.caption || ""}`}>
              <span className="gt-v">
                {(x.type || "image") === "image"
                  ? <MediaImage src={x.src} alt={x.caption || x.label || ""} label={x.label} caption={x.caption} fallback={mock(i)} />
                  : <span className="gk">{x.type.toUpperCase()}</span>}
              </span>
              <span className="gt-l">{x.label}</span>
              <span className="gt-c">{x.caption}</span>
            </button>
          </div>
        ))}
      </div>
      {o >= 0 && <Lightbox items={media} index={o} onIndex={setO} onClose={() => setO(-1)} fallback={mock} />}
    </>
  );
}

function Block({ n, t, children }) {
  const { up } = useMotion();
  return <motion.section className="pb" {...up()}><h2><b>{n}</b>{t}</h2>{children}</motion.section>;
}

export default function ProjectPage({ p }) {
  const [hero, setHero] = useState(false);
  const i = PROJECTS.findIndex((x) => x.slug === p.slug), prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
  useEffect(() => { window.scrollTo(0, 0); }, [p.slug]);
  return (
    <main className="pp">
      <section className="pp-hero">
        <Sil className="s-p" v="coat" /><i className="pp-poly" /><i className="pp-slash" />
        <Link to="/#projects" tkind="back" className="back">← PROJECTS</Link>
        <span className="pp-num">PROJECT {p.n}</span>
        <h1>{p.t}</h1>
        <p className="psub">{p.sub}</p><p className="chip">{p.role}</p>
        <button type="button" className="pp-media" onClick={() => setHero(true)} aria-label={`Open large image: ${p.t}, ${p.sub}`}>
          <ProjectVisual slug={p.slug} src={p.mainImage} alt={`${p.t} — ${p.sub}`} v={0} eager />
        </button>
        {hero && <Lightbox items={[{ src: p.mainImage, label: `PROJECT ${p.n}`, caption: `${p.t} — ${p.sub}` }]} index={0} onIndex={() => {}} onClose={() => setHero(false)} fallback={() => <Mock slug={p.slug} v={0} />} />}
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
          <Block n="06" t="PROJECT MEDIA">
            <ProjectMediaGallery key={p.slug} media={p.media} slug={p.slug} />
            {p.links && p.links.length > 0 && <div className="plinks">{p.links.map((l) => <a key={l.label} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <b>↗</b></a>)}</div>}
          </Block>
          <Block n="07" t="CONCLUSION"><p>{p.conclusion}</p></Block>
        </div>
      </div>
      <nav className="pnav" aria-label="Project navigation">
        {prev ? <Link to={`/projects/${prev.slug}`} tkind="prev">← PREVIOUS<strong>{prev.t}</strong></Link> : <Link to="/#projects" tkind="back">← PROJECTS<strong>BACK</strong></Link>}
        <Link to="/#projects" tkind="back" className="mid">BACK TO PROJECTS</Link>
        {next ? <Link to={`/projects/${next.slug}`} tkind="next" className="r">NEXT →<strong>{next.t}</strong></Link> : <Link to="/#projects" tkind="back" className="r">PROJECTS →<strong>BACK</strong></Link>}
      </nav>
    </main>
  );
}
