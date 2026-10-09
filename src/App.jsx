import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMotion, Img, Sil, Bg, Scr, Wipe, navigate, usePath, Link } from "./shared.jsx";
import { NAV, EXP, ORG, PROJECTS, CERTS, EMAIL, LINKEDIN, PHONE_DISPLAY, PHONE_TEL, RESUME_FILES, RESUME_DOWNLOAD_NAME } from "./data.js";
import Intro from "./Intro.jsx";
import PageTransition from "./PageTransition.jsx";
import ExperienceMedia from "./ExperienceMedia.jsx";
import MediaImage from "./MediaImage.jsx";
import { resolveMedia } from "./media.js";
import { ProjectVisual } from "./mock.jsx";
import ProjectPage from "./ProjectPage.jsx";

/* =============================== */

function Portrait() {
  const [src, setSrc] = useState("/images/ghifarii.png");
  const [mode, setMode] = useState("load"); // load | cut | flat | none
  useEffect(() => {
    let alive = true;
    resolveMedia("/images/ghifarii.png").then((url) => {
      if (!alive) return;
      if (!url) { setMode("none"); return; }
      setSrc(url);
      const im = new Image();
      im.onload = () => {
        try {
          const c = document.createElement("canvas"); c.width = c.height = 48;
          const x = c.getContext("2d"); x.drawImage(im, 0, 0, 48, 48);
          const t = [[0, 0], [47, 0], [0, 12], [47, 12], [0, 24], [47, 24]].filter(([a, b]) => x.getImageData(a, b, 1, 1).data[3] < 16).length;
          if (t < 4) console.warn("ghifarii image has no transparent background. Use a cutout PNG (see README) for the character-cutout outline.");
          setMode(t >= 4 ? "cut" : "flat");
        } catch { setMode("flat"); }
      };
      im.onerror = () => setMode("none");
      im.src = url;
    });
    return () => { alive = false; };
  }, []);
  if (mode === "load") return null;
  if (mode === "none") return <div className="pfall" />;
  if (mode === "flat") return (
    <div className="pflat" style={{ "--img": `url(${src})` }} role="img" aria-label="Ghifarii Muhammad Ramadhan">
      <i className="fl fk" /><i className="fl fr" /><i className="fl fp" />
    </div>
  );
  return (
    <div className="pstack">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="f-outline" x="-8%" y="-8%" width="116%" height="116%"><feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d" /><feFlood floodColor="#F4F1EA" /><feComposite in2="d" operator="in" /></filter>
        <filter id="f-outline-h" x="-8%" y="-8%" width="116%" height="116%"><feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d" /><feFlood floodColor="#F4F1EA" /><feComposite in2="d" operator="in" /></filter>
        <filter id="f-red" x="-8%" y="-8%" width="116%" height="116%"><feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d" /><feFlood floodColor="#E50914" /><feComposite in2="d" operator="in" /></filter>
        <filter id="f-black" x="-8%" y="-8%" width="116%" height="116%"><feMorphology in="SourceAlpha" operator="dilate" radius="5" result="d" /><feFlood floodColor="#000" /><feComposite in2="d" operator="in" /></filter>
      </svg>
      <img className="pl pr" src={src} alt="" aria-hidden="true" />
      <img className="pl pk" src={src} alt="" aria-hidden="true" />
      <img className="pl po" src={src} alt="" aria-hidden="true" />
      <img className="pl pc" src={src} alt="Ghifarii Muhammad Ramadhan" fetchPriority="high" decoding="async" />
      <i className="pl ph" style={{ "--m": `url(${src})` }} />
    </div>
  );
}

function FlipCard() {
  const [on, setOn] = useState(false);
  const flip = () => setOn((v) => !v);
  return (
    <div className={`flip ${on ? "on" : ""}`} role="button" tabIndex={0} aria-pressed={on} onClick={flip}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}
      aria-label="Photo card. Press to flip. The back reads: New beginnings loading.">
      <span className="fi">
        <span className="ff">
          <span className="fphoto"><MediaImage src="/images/ghifarii-card.jpg" alt="Ghifarii Muhammad Ramadhan in a black suit" eager fallback={<span className="fph" />} /></span>
          <span className="ftag">TAP TO FLIP ↻</span>
        </span>
        <span className="fb"><span className="fbi">
          <i className="fdia" />
          <span className="fhead"><strong>GHIFARII</strong> <span className="fname">MUHAMMAD RAMADHAN</span></span>
          <span className="fquote">New beginnings loading.</span>
          <Scr className="fscr">NEXT.</Scr>
        </span></span>
      </span>
    </div>
  );
}

function ResumeBtn() {
  const [miss, setMiss] = useState(false);
  const click = async (e) => {
    e.preventDefault(); setMiss(false);
    for (const u of RESUME_FILES) {
      try {
        const r = await fetch(u, { method: "HEAD" });
        // a missing file on a dev server / SPA host comes back as index.html (text/html) - skip those
        if (r.ok && !(r.headers.get("content-type") || "").includes("text/html")) {
          const a = document.createElement("a"); a.href = u; a.download = RESUME_DOWNLOAD_NAME;
          document.body.appendChild(a); a.click(); a.remove(); return;
        }
      } catch {}
    }
    setMiss(true);
  };
  return (
    <>
      <a className="btn" href={RESUME_FILES[0]} download={RESUME_DOWNLOAD_NAME} onClick={click}>DOWNLOAD RESUME</a>
      {miss && <span className="rmiss" role="status">Resume PDF not found. Put it at public/resume.pdf</span>}
    </>
  );
}

function Heading({ n, title, note }) {
  const { slide, head } = useMotion();
  return (
    <div className="head">
      <motion.span className="bignum" {...slide()}>{n}</motion.span>
      <motion.h2 className="paper" {...head(0.1)}>{title}</motion.h2>
      {note && <Scr className="hnote">{note}</Scr>}
    </div>
  );
}

function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement, d = dot.current, r = ring.current;
    let shown = false;
    const KIND = [[".pcard", "VIEW"], [".xi", "READ"], [".orow", "SELECT"], [".links a,.giant,.fcon a", "SEND"], [".cc", "OPEN"]];
    let raf = 0, ev;
    const mv = (e) => {
      ev = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const { clientX: x, clientY: y, target: t } = ev, tr = `translate3d(${x}px,${y}px,0)`;
        if (!shown) { shown = true; d.style.display = r.style.display = "block"; }
        d.style.transform = tr; r.style.transform = tr;
        root.style.setProperty("--mx", ((x / innerWidth - 0.5) * 2).toFixed(3));
        root.style.setProperty("--my", ((y / innerHeight - 0.5) * 2).toFixed(3));
        const hit = !!t.closest?.("a,button,.pcard,.cc,.orow,.xi,.flip");
        let k = ""; for (const [sel, l] of KIND) if (t.closest?.(sel)) { k = l; break; }
        r.dataset.k = k; r.classList.toggle("big", hit); d.classList.toggle("big", hit);
      });
    };
    addEventListener("mousemove", mv);
    return () => { removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return <><div className="cur" ref={dot}><i /></div><div className="cur-ring" ref={ring} data-k=""><span /></div></>;
}

function Footer() {
  const { reduce } = useMotion();
  const rise = (d = 0) => reduce ? {} : { initial: { y: 40, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.5, delay: d } };
  const write = reduce ? {} : { initial: { clipPath: "inset(0 100% 0 0)" }, whileInView: { clipPath: "inset(0 -5% 0 0)" }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.35, ease: "easeOut" } };
  const ic = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true };
  return (
    <footer className="ft">
      <motion.i className="spk red" {...rise()} />
      <motion.i className="spk" {...rise(0.08)} />
      <div className="ft-body">
        <div className="ft-sign">
          <motion.span className="mwl" {...write}>MADE WITH LOVE BY <svg className="heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21 3.5 12.5A5 5 0 0 1 12 6a5 5 0 0 1 8.5 6.5Z" /></svg></motion.span>
          <motion.strong {...rise(0.15)}>GHIFARII</motion.strong>
        </div>
        <motion.div className="fcon" {...rise(0.7)}>
          <a href={`mailto:${EMAIL}`} aria-label="Email Ghifarii"><svg {...ic}><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></svg></a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Ghifarii on LinkedIn"><svg {...ic}><rect x="3" y="3" width="18" height="18" /><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" /></svg></a>
          <a href={`tel:${PHONE_TEL}`} aria-label="Call Ghifarii"><svg {...ic}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg></a>
        </motion.div>
        <p className="fc">© 2026 GHIFARII MUHAMMAD RAMADHAN</p>
      </div>
    </footer>
  );
}

function PCard({ p }) {
  const { reduce } = useMotion();
  const mv = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, s = e.currentTarget.style;
    s.setProperty("--mx", (x - 0.5) * 2); s.setProperty("--my", (y - 0.5) * 2); s.setProperty("--gx", x * 100 + "%"); s.setProperty("--gy", y * 100 + "%");
  };
  return (
    <Link to={`/projects/${p.slug}`} className="pcard" draggable={false} onMouseMove={mv} aria-label={`Open project ${p.n}: ${p.t} — ${p.sub}`}>
      <i className="poff" />
      <div className="pin">
        <i className="glow" /><i className="acc" />
        <span className="pno">PROJECT {p.n}</span><span className="sel">SELECT ▸</span>
        <Scr className="pscr-c">{p.n === "01" ? "PLAN." : p.n === "02" ? "BUILD." : "DELIVER."}</Scr>
        <div className="pgrid">
          <div className="shot"><ProjectVisual slug={p.slug} src={p.mainImage} alt="" v={0} eager /></div>
          <div className="cbody">
            <h3>{p.t}</h3><p className="psub">{p.sub}</p>
            <small>ROLE</small><p className="chip">{p.role}</p>
            <small>{p.lab}</small>
            <ul>{p.items.map((x) => <li key={x}>{x}</li>)}</ul>
            {p.d && <p className="pd">{p.d}</p>}
            <span className="more">VIEW PROJECT <b>→</b></span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Carousel() {
  const ref = useRef(null), dr = useRef(null), drag = useRef(false);
  const [i, setI] = useState(0), [dg, setDg] = useState(false);
  const { reduce } = useMotion();
  const step = () => { const el = ref.current; return el.children[0].offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0); };
  const to = (k) => ref.current.scrollTo({ left: Math.max(0, Math.min(PROJECTS.length - 1, k)) * step(), behavior: reduce ? "auto" : "smooth" });
  const down = (e) => { if (e.pointerType !== "mouse" || e.target.closest("a")) return; dr.current = { x: e.clientX, l: ref.current.scrollLeft, on: false }; };
  const move = (e) => {
    const d = dr.current; if (!d) return;
    if (!d.on && Math.abs(e.clientX - d.x) > 6) { d.on = true; setDg(true); e.currentTarget.setPointerCapture(e.pointerId); }
    if (d.on) ref.current.scrollLeft = d.l - (e.clientX - d.x);
  };
  const up = () => { const d = dr.current; dr.current = null; if (d?.on) { drag.current = true; setTimeout(() => (drag.current = false), 0); setDg(false); to(Math.round(ref.current.scrollLeft / step())); } };
  const key = (e) => { if (e.key === "ArrowRight") { e.preventDefault(); to(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); to(i - 1); } };
  return (
    <div className="car" tabIndex={0} onKeyDown={key} aria-label="Projects carousel">
      <div className="ctrl">
        <button onClick={() => to(i - 1)} disabled={i === 0}>← PREV</button>
        <span className="count"><b>{String(i + 1).padStart(2, "0")}</b> / {String(PROJECTS.length).padStart(2, "0")}</span>
        <button onClick={() => to(i + 1)} disabled={i === PROJECTS.length - 1}>NEXT →</button>
      </div>
      <div ref={ref} className={`track ${dg ? "dragging" : ""}`} onClickCapture={(e) => { if (drag.current) { e.preventDefault(); e.stopPropagation(); } }} onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / step()))}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        {PROJECTS.map((p) => <PCard key={p.n} p={p} />)}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const { up, slide, reduce } = useMotion();
  const path = usePath();
  const project = PROJECTS.find((p) => path === "/projects/" + p.slug);
  const seen = () => { try { return sessionStorage.getItem("rama-intro") === "1"; } catch { return false; } };
  const [entered, setEntered] = useState(seen), [introOn, setIntroOn] = useState(() => !seen());
  const enter = () => { try { sessionStorage.setItem("rama-intro", "1"); } catch {} setEntered(true); };
  useEffect(() => {
    if (!entered) return;
    if (project) { window.scrollTo(0, 0); return; }
    const h = location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView(), 60);
    else { try { const y = Number(sessionStorage.getItem("rama-y:/")); sessionStorage.removeItem("rama-y:/"); if (y) requestAnimationFrame(() => window.scrollTo(0, y)); } catch {} }
  }, [path, entered]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, [path, entered]);
  const go = (id) => { if (project) navigate("/#" + id); else document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); };
  const stagger = (i) => reduce ? {} : { initial: { opacity: 0, y: 40, clipPath: "inset(0% 0% 100% 0%)" }, animate: { opacity: 1, y: 0, clipPath: "inset(-12% -12% -12% -12%)" }, transition: { delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } };
  const rise = reduce ? undefined : { h: { opacity: 0, y: 18 }, s: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } } };
  const pop = reduce ? undefined : { h: { scale: 0 }, s: { scale: 1, transition: { duration: 0.35 } } };

  return (
    <>
      <div className="grain" /><Bg /><Cursor />
      <PageTransition />
      {introOn && <Intro onEnter={enter} onDone={() => setIntroOn(false)} />}
      {entered && (
      <div className={`site ${introOn ? "in" : ""}`}>
      <a className="skip" href="#about">Skip to content</a>
      <nav className="nav" aria-label="Primary">
        <button className="logo" onClick={() => go("home")}>RAM<span>Δ</span></button>
        <ul>{NAV.map((id) => <li key={id}><button className={(project ? "projects" : active) === id ? "on" : ""} aria-current={(project ? "projects" : active) === id ? "true" : undefined} onClick={() => go(id)}>{id}</button></li>)}</ul>
      </nav>

      {project ? <ProjectPage p={project} /> : (<>
      {/* HERO */}
      <header id="home" className="hero">
        <Sil className="s-h" v="thief" />
        <i className="slash" />
        <div className="hero-l">
          <h1>
            <motion.span className="gh" {...stagger(0)}>GHIFARII</motion.span>
            <motion.span {...stagger(1)}>MUHAMMAD</motion.span>
            <motion.span className="red" {...stagger(2)}>RAMADHAN</motion.span>
          </h1>
          <motion.div className="label" {...stagger(3)}>ASPIRING PROJECT MANAGER</motion.div>
          <motion.p className="meta" {...stagger(4)}>D3 INFORMATION SYSTEMS · TELKOM UNIVERSITY</motion.p>
          <motion.p className="tag" {...stagger(5)}>Turning ideas into structured,<br />measurable outcomes.</motion.p>
          <motion.div className="btns" {...stagger(9)}>
            <button className="btn red" onClick={() => go("projects")}>VIEW MY PROJECTS <b>→</b></button>
            <ResumeBtn />
          </motion.div>
        </div>
        <div className="hero-r">
          <i className="rpoly" /><i className="blk" />
          <div className="pwrap"><Portrait /></div>
          <Scr className="pscr">LEAD.</Scr><Scr className="pscr2">FOCUS.</Scr>
          <span className="vert">PROJECT LEADER · 2026</span>
        </div>
      </header>

      <Wipe k="red" />
      {/* ABOUT */}
      <section id="about" className="sec"><Sil className="s-a" v="crouch" />
        <Heading n="01" title="ABOUT ME" note="PLAN." />
        <div className="about">
          <motion.div {...up()} className="about-l">
            <h3>WHO IS <em>GHIFARII?</em></h3>
            <span className="chip">FRESH GRADUATE · ASPIRING PROJECT MANAGER</span>
            <p>I’m a fresh D3 Information Systems graduate from Telkom University with a strong interest in project management, technology, and structured execution.</p>
            <p>My background combines technical development experience with project coordination, leadership, and team management. Through academic projects, professional experience, and organizational leadership, I’ve developed an interest in turning ideas into structured plans, coordinating people and tasks, and driving projects toward measurable outcomes.</p>
            <p>I’m currently building my career toward Project Management, where I can combine my technical understanding, communication skills, and leadership experience to help teams deliver projects effectively.</p>
            <dl>
              <div><dt>EDUCATION</dt><dd>D3 INFORMATION SYSTEMS<br />TELKOM UNIVERSITY</dd></div>
              <div><dt>FOCUS</dt><dd>PROJECT MANAGEMENT<br />TECHNOLOGY<br />TEAM COORDINATION</dd></div>
              <div><dt>BACKGROUND</dt><dd>PROJECT COORDINATION<br />TECHNICAL DEVELOPMENT<br />LEADERSHIP</dd></div>
            </dl>
          </motion.div>
          <motion.div {...up(0.15)}><FlipCard /></motion.div>
        </div>
      </section>

      <Wipe k="panel" />
      {/* EXPERIENCE */}
      <section id="experience" className="sec diag"><Sil className="s-x" v="lunge" />
        <Heading n="02" title="EXPERIENCE" note="BUILD." />
        <div className="xps">
          {EXP.map((e, i) => (
            <motion.div key={e.org} className="xi" initial={reduce ? false : "h"} whileInView="s" viewport={{ once: true, margin: "-80px" }}
              variants={reduce ? undefined : { h: {}, s: { transition: { staggerChildren: 0.09 } } }}>
              {i < EXP.length - 1 && <motion.i className="xline" variants={reduce ? undefined : { h: { scaleY: 0 }, s: { scaleY: 1, transition: { duration: 0.7, ease: "easeInOut", delay: 0.2 } } }} />}
              <motion.span className="xn" data-n={e.no} variants={pop} />
              <i className="xred" />
              <article className={`xp ${e.lead ? "lead" : ""}`}>
                <div className="xin">
                  <div className="xh">
                    <motion.span className="xnum" variants={rise}>{e.no}</motion.span>
                    <motion.h3 variants={rise}>{e.role}</motion.h3>
                    <motion.p className="xo" variants={rise}>{e.org}</motion.p>{e.proj && <motion.p className="xproj" variants={rise}>PROJECT: {e.proj}</motion.p>}
                    <motion.p className="xd" variants={rise}>{e.date}</motion.p>
                  </div>
                  <div className="xb">
                    <motion.p className="xdesc" variants={rise}>{e.desc}</motion.p>
                    {e.pts.length > 0 && <ul>{e.pts.map((p) => <li key={p}>{p}</li>)}</ul>}
                  </div>
                  <ExperienceMedia media={e.media} />
                  <Scr className="xscr">{e.scr}</Scr>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <Wipe k="slash" />
      {/* ORGANIZATION */}
      <section id="organization" className="sec"><Sil className="s-o" v="tall" />
        <Heading n="03" title="ORGANIZATION" note="KEEP MOVING." />
        <p className="orgname">NIPPON BUNKA-BU <span>GROWTH → RESPONSIBILITY → LEADERSHIP</span></p>
        <div className="org"><motion.i className="orgline" initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut" }} />
          {ORG.map((o, i) => (
            <motion.div key={o.t} className={`orow ${i === ORG.length - 1 ? "top" : ""}`} tabIndex={0} {...up(0.3 + i * 0.25)}>
              <span className="on">{o.n}</span><i className="osil" />
              <div><div className="otitle"><h3>{o.t}</h3>{i === ORG.length - 1 && <span className="now">NOW HERE</span>}</div>{o.en && <small>{o.en}</small>}{i === ORG.length - 1 && <em className="oorg">NIPPON BUNKA-BU</em>}<p>{o.d}</p></div>
              <b className="oa">▸</b><i className="oline" />
            </motion.div>
          ))}
        </div>
      </section>

      <Wipe k="halftone" />
      {/* PROJECTS */}
      <section id="projects" className="sec diag">
        <Sil className="s-p" v="coat" />
        <Heading n="04" title="PROJECTS" note="DELIVER." />
        <Carousel />
      </section>

      <Wipe k="paper" />
      {/* CERTIFICATION */}
      <section id="certification" className="sec">
        <Heading n="05" title="CERTIFICATION" note="FOCUS." />
        <div className="certs">
          {CERTS.map((c, i) => (
            <motion.a key={c.name} className="cc" href={c.certificateUrl} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${c.name}, ${c.by} (opens in a new tab)`} {...up(i * 0.1)}>
              <i className="ccred" />
              <div className="ccp"><div className="cin">
                <span className="clab">{c.label}</span>
                <h3>{c.name}</h3>
                <p className="cby">{c.by}</p>
                <div className="cmeta"><span>{c.year}</span>{c.valid && <span>VALID UNTIL {c.valid}</span>}</div>
                <span className="cta">VIEW CERTIFICATE <b>↗</b></span>
                <Scr className="cscr2">{c.scr}</Scr>
              </div></div>
            </motion.a>
          ))}
        </div>
      </section>

      <Wipe k="split" />
      {/* CONTACT */}
      <section id="contact" className="sec contact">
        <Sil className="s-c" v="vigilante" />
        <span className="cn">06</span><Scr className="cscr">EXECUTE.</Scr>
        <motion.h2 {...slide()}>LET'S<br /><em>CONNECT.</em></motion.h2>
        <p>Have a project, opportunity, or challenge worth discussing?</p>
        <div className="links">
          <a href={`mailto:${EMAIL}`}><small>EMAIL</small>{EMAIL}<b aria-hidden="true">→</b></a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"><small>LINKEDIN</small>{LINKEDIN}<b aria-hidden="true">↗</b></a>
          <a href={`tel:${PHONE_TEL}`}><small>PHONE</small>{PHONE_DISPLAY}<b aria-hidden="true">→</b></a>
        </div>
        <a className="btn red giant" href={`mailto:${EMAIL}`}>GET IN TOUCH <b>→</b></a>
        
      </section>
</>)}
      <Footer />
      </div>)}
    </>
  );
}
