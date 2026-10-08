/* ====== EDIT CONTENT HERE ====== */
export const NAV = ["home", "about", "experience", "organization", "projects", "certification", "contact"];
// Experience proof media. Put files in /public/images/experience/<folder>/ and reference them from the site root ("/images/..." - never "/public/...").
// proof-1.jpg and proof-01.jpg are both found automatically (also .jpeg/.png/.webp). Missing entries are skipped; if none exist a placeholder is shown.
// Add/remove items freely; use media: [] to hide the proof area. Keep captions neutral unless you are sure what the image shows.
export const EXP = [
  { no: "03", org: "TRANSTRACK", role: "ASSOCIATE PROJECT MANAGER", proj: "RALLY SAFETY PROJECT", date: "MAR 2026 — JUL 2026", scr: "DELIVER.", lead: true,
    desc: "Supported project planning, progress monitoring, task tracking, documentation, and coordination throughout the Rally Safety Project.",
    pts: ["Project coordination", "Timeline monitoring", "Progress & task tracking", "RTM", "Documentation", "Project visualization"],
    media: [{ src: "/images/experience/transtrack/proof-1.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/transtrack/proof-2.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/transtrack/proof-3.jpg", caption: "PROJECT MEDIA" }] },
  { no: "02", org: "TELKOM UNIVERSITY", role: "PRACTICUM ASSISTANT", date: "SEP 2025 — JAN 2026", scr: "COORDINATE.",
    desc: "Assisted practical learning sessions, supported students during technical exercises, and helped coordinate laboratory activities.", pts: [],
    media: [{ src: "/images/experience/practicum/proof-1.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/practicum/proof-2.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/practicum/proof-3.jpg", caption: "PROJECT MEDIA" }] },
  { no: "01", org: "PERTAMINA CEPU — ZONA III", role: "MLBB COACH", date: "JUL 2025 — AUG 2025", scr: "ANALYZE.",
    desc: "Coached and analyzed Mobile Legends teams in a competitive environment, focusing on strategy, team coordination, performance analysis, and match preparation.", pts: [],
    media: [{ src: "/images/experience/mlbb/proof-1.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/mlbb/proof-2.jpg", caption: "PROJECT MEDIA" }, { src: "/images/experience/mlbb/proof-3.jpg", caption: "PROJECT MEDIA" }] },
];
export const ORG = [
  { n: "01", t: "YOUNG STAFF", d: "Joined Nippon Bunka-Bu as a staff member, contributing to the organization's programs and activities." },
  { n: "02", t: "HEAD OF INTERNAL", d: "Headed the organization's internal division, supporting member coordination and internal communication." },
  { n: "03", t: "VICE CHAIR", d: "Currently supports the chair in leading the organization and coordinating its divisions and activities." },
];
// Project media: files live in /public/images/projects/<slug>/ (main.jpg + media-01..04.jpg). If a file is missing, a clearly-labelled MOCKUP graphic is shown instead.
// Optional extra types: Types: "image" | "video" | "pdf" | "link".
// e.g. { type: "image", src: "/projects/transtrack/shot-1.png", caption: "Timeline board" }
//      { type: "video", src: "/projects/mindemy/demo.mp4" }  or an embed URL (YouTube/Vimeo embed link)
//      { type: "pdf", src: "/projects/transtrack/rtm.pdf", caption: "RTM" }
// links: [{ label: "GITHUB", href: "https://..." }, { label: "FIGMA", href: "..." }, { label: "LIVE DEMO", href: "..." }]
export const PROJECTS = [
  { slug: "transtrack", objective: "Translate official rally safety guidelines into clear, actionable technical requirement specifications for the development team, Design functional logic workflows for emergency communication protocols and speed-restricted area rules (Slow Zone), Organize and manage task backlogs to ensure structured cross-team coordination. ", process: ["Regulation Analysis: Analyzed official FIA rally safety guidelines to extract functional system requirements.", "RTM Compilation: Built a Requirements Traceability Matrix (RTM) to map safety rules directly to technical feature deliverables.", "Workflow & Logic Design: Created flowchart diagrams in FigJam for emergency communication scenarios (Mesh Relay) and Slow Zone parameter rules.", "Interaction Concepting: Mapped functional alert display rules for cockpit devices (RTD) as reference material for developer handoff.", "Backlog Governance: Structured task tickets, prioritized work items, and maintained the project backlog using Notion and FigJam. "], n: "01", t: "TRANSTRACK", sub: "RALLY SAFETY PROJECT", role: "ASSOCIATE PROJECT MANAGER INTERN", type: "IT PROJECT MANAGEMENT",
    lab: "FOCUS", mainImage: "/images/projects/transtrack/main.jpg",
    items: ["Project coordination", "Timeline monitoring", "Progress & task tracking", "RTM", "Documentation", "Visualization"],
    tools: ["Notion", "FigJam", "Hybrid", "Backlog Management", "Canva", "Flowcharting", "RTM"],
    overview: "An internship project at TransTRACK focused on preparing system requirement documentation, mapping functional workflows, and managing task backlogs for rally safety software (Rally Control Software and car-to-car communication).",
    myRole: "Associate Project Manager, supporting day-to-day coordination, tracking and documentation of the project.",
    resp: ["Regulation Mapping: Authored the RTM document connecting FIA rally safety guidelines to system requirement specifications.", "Emergency Logic Flow: Designed functional flowcharts for vehicle-to-vehicle emergency communication scenarios (Mesh Relay) during signal dead-zones.", "Slow Zone Rule Formulation: Defined functional parameters linking route geometry data (KML/CSV) with speed limit enforcement rules.", "Task Governance: Organized product backlogs and task tickets in Notion/FigJam to prepare clear deliverables for the engineering team."],
    outcome: "Delivered a complete RTM document and system flowchart suite ready for developer handoff, Clarified functional system logic for rally safety features, reducing technical ambiguity during execution, Established a clean, well-structured backlog repository in Notion.", 
    conclusion: "This experience strengthened my ability to translate complex operational guidelines into structured technical requirements (RTM), design system logic workflows, and manage project backlogs using Agile practices.",
    media: [
      { src: "/images/projects/transtrack/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/transtrack/media-02.jpg", label: "MEDIA_02", caption: "INTERFACE / WORKFLOW" },
      { src: "/images/projects/transtrack/media-03.jpg", label: "MEDIA_03", caption: "PROJECT PROCESS" },
      { src: "/images/projects/transtrack/media-04.jpg", label: "MEDIA_04", caption: "PROJECT OUTPUT" },
    ], links: [] },
  { slug: "mindemy", objective: "Translate a mental-health product concept into a working mobile application experience.", process: ["Interface design in Figma", "Implementation in Flutter and Dart", "Multiple user flows: sessions, tests, meditation, booking, payment, chat and filtering"], n: "02", t: "MINDEMY", sub: "MENTAL HEALTH MOBILE APP", role: "MOBILE DEVELOPER", type: "MOBILE APP · ACADEMIC PROJECT",
    lab: "TECH", mainImage: "/images/projects/mindemy/main.jpg", items: ["Flutter", "Dart", "Figma"], tools: ["Flutter", "Dart", "Figma"], techLabel: "TECHNOLOGY",
    d: "Mental-health mobile app concept: psychologist sessions, early detection tests, meditation, booking, payment, chat and filtering. Demo not deployed.",
    overview: "Mindemy is an academic mobile-app concept in the mental-health space. It brings together psychologist sessions, early detection tests, meditation, booking, payment flow, chat and filtering. The project was not deployed publicly.",
    myRole: "Mobile Developer, working with Flutter and Dart and using Figma for interface design.",
    resp: ["Psychologist sessions", "Early detection testing", "Meditation", "Booking", "Payment flow", "Chat", "Filtering"],
    respNote: "[Edit: refine this list to your specific contributions.]",
    outcome: "A concept covering multiple user flows and interface components. It was built as project work and was not deployed or used by real users.",
    conclusion: "The project demonstrated the ability to translate a product concept into a mobile application experience, including multiple user flows and interface components.",
    media: [
      { src: "/images/projects/mindemy/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/mindemy/media-02.jpg", label: "MEDIA_02", caption: "INTERFACE / WORKFLOW" },
      { src: "/images/projects/mindemy/media-03.jpg", label: "MEDIA_03", caption: "PROJECT PROCESS" },
      { src: "/images/projects/mindemy/media-04.jpg", label: "MEDIA_04", caption: "PROJECT OUTPUT" },
    ], links: [] },
  { slug: "kingkos", objective: "Build an end-to-end costume booking web application.", process: ["Backend and database with Laravel, PHP and MySQL", "Frontend with HTML/CSS", "Customer flows: authentication, catalog, booking, payment (no gateway) and shipping", "Admin dashboard with CRUD and filtering"], n: "03", t: "KINGKOS", sub: "COSTUME BOOKING WEB APP", role: "FULL-STACK DEVELOPER", type: "WEB APPLICATION",
    lab: "TECH", mainImage: "/images/projects/kingkos/main.jpg", items: ["Laravel", "PHP", "MySQL", "HTML/CSS"], tools: ["Laravel", "PHP", "MySQL", "HTML/CSS"], techLabel: "TECHNOLOGY",
    d: "Costume booking web app with authentication, catalog, booking and payment flow, admin dashboard, CRUD, filtering and shipping.",
    overview: "Kingkos is a costume booking web application with login and registration, a costume catalog, booking, a payment flow (without a payment gateway), an admin dashboard, CRUD management, filtering and a shipping flow.",
    myRole: "Full-Stack Developer across frontend, backend and database using Laravel, PHP, MySQL and HTML/CSS.",
    resp: ["Authentication (login / register)", "Costume catalog", "Booking", "Payment flow (no payment gateway)", "Admin dashboard", "CRUD", "Filtering", "Shipping flow"],
    respNote: "[Edit: refine this list to your specific contributions.]",
    outcome: "A complete booking application covering both customer-facing and administrative functionality.",
    conclusion: "The project demonstrated the ability to develop a web application across frontend, backend, database, authentication, booking and administrative functionality.",
    media: [
      { src: "/images/projects/kingkos/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/kingkos/media-02.jpg", label: "MEDIA_02", caption: "INTERFACE / WORKFLOW" },
      { src: "/images/projects/kingkos/media-03.jpg", label: "MEDIA_03", caption: "PROJECT PROCESS" },
      { src: "/images/projects/kingkos/media-04.jpg", label: "MEDIA_04", caption: "PROJECT OUTPUT" },
    ], links: [] },
];
// Fill in real data. Leave href "#" until you have a link.
// Replace the placeholder Google Drive URLs with your real certificate links.
export const CERTS = [
  { label: "PROJECT MANAGEMENT", name: "SCRUM FUNDAMENTALS CERTIFIED", by: "SCRUMstudy", year: "2026", scr: "EXECUTE.",
    certificateUrl: "https://drive.google.com/PLACEHOLDER_SCRUM_CERTIFICATE" },
  { label: "ENGLISH PROFICIENCY", name: "EPRT — ENGLISH PROFICIENCY TEST", by: "Telkom University Language Center", year: "2026", valid: "2028", scr: "FOCUS.",
    certificateUrl: "https://drive.google.com/PLACEHOLDER_EPRT_CERTIFICATE" },
];
export const EMAIL = "ghifariimr@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/ghifariimr/";
export const PHONE_DISPLAY = "+62 858-9215-7416";
export const PHONE_TEL = "+6285892157416";
