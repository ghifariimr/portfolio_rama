/* ====== EDIT CONTENT HERE ====== */
export const NAV = ["home", "about", "experience", "organization", "projects", "certification", "contact"];
export const EXP = [
  { no: "03", org: "TRANSTRACK", role: "ASSOCIATE PROJECT MANAGER", proj: "RALLY SAFETY PROJECT", date: "MAR 2026 — JUL 2026", scr: "DELIVER.", lead: true,
    desc: "Supported project planning, progress monitoring, task tracking, documentation, and coordination throughout the Rally Safety Project.",
    pts: ["Project coordination", "Timeline monitoring", "Progress & task tracking", "RTM", "Documentation", "Project visualization"] },
  { no: "02", org: "TELKOM UNIVERSITY", role: "PRACTICUM ASSISTANT", date: "SEP 2025 — JAN 2026", scr: "COORDINATE.",
    desc: "Assisted practical learning sessions, supported students during technical exercises, and helped coordinate laboratory activities.", pts: [] },
  { no: "01", org: "PERTAMINA CEPU — ZONA III", role: "MLBB COACH", date: "JUL 2025 — AUG 2025", scr: "ANALYZE.",
    desc: "Coached and analyzed Mobile Legends teams in a competitive environment, focusing on strategy, team coordination, performance analysis, and match preparation.", pts: [] },
];
export const ORG = [
  { n: "01", t: "YOUNG STAFF", d: "Joined Nippon Bunka-Bu as a staff member, contributing to the organization's programs and activities." },
  { n: "02", t: "HEAD OF INTERNAL", d: "Headed the organization's internal division, supporting member coordination and internal communication." },
  { n: "03", t: "VICE CHAIR", d: "Currently supports the chair in leading the organization and coordinating its divisions and activities." },
];
// Media: list real files you add under /public/projects/<slug>/ . Types: "image" | "video" | "pdf" | "link".
// e.g. { type: "image", src: "/projects/transtrack/shot-1.png", caption: "Timeline board" }
//      { type: "video", src: "/projects/mindemy/demo.mp4" }  or an embed URL (YouTube/Vimeo embed link)
//      { type: "pdf", src: "/projects/transtrack/rtm.pdf", caption: "RTM" }
// links: [{ label: "GITHUB", href: "https://..." }, { label: "FIGMA", href: "..." }, { label: "LIVE DEMO", href: "..." }]
export const PROJECTS = [
  { slug: "transtrack", objective: "Support the Rally Safety Project (Red Flag Management) with structured planning, tracking and documentation.", process: ["Planning and scheduling support", "Timeline and progress monitoring", "Task tracking", "Requirements traceability (RTM)", "Documentation and progress reporting"], n: "01", t: "TRANSTRACK", sub: "RALLY SAFETY PROJECT", role: "ASSOCIATE PROJECT MANAGER", type: "PROJECT MANAGEMENT",
    lab: "FOCUS", img: "/images/project-1.png",
    items: ["Project coordination", "Timeline monitoring", "Progress & task tracking", "RTM", "Documentation", "Visualization"],
    tools: ["Timeline Tracking", "RTM", "Documentation", "Progress Monitoring"],
    overview: "Rally Safety Project — Red Flag Management was delivered under the TransTrack project. [Edit: add 2–3 sentences on the project goal, context and timeline.]",
    myRole: "Associate Project Manager, supporting day-to-day coordination, tracking and documentation of the project.",
    resp: ["Project coordination", "Timeline monitoring", "Progress tracking", "Task tracking", "Requirements Traceability Matrix (RTM)", "Documentation", "Project visualization", "Progress reporting"],
    outcome: "Contributed to structured project delivery through consistent tracking of timelines, tasks and requirements, supported by clear documentation and progress reporting.",
    conclusion: "The project gave me practical experience in project coordination, timeline tracking, documentation and requirements traceability, the fundamentals of supporting structured project delivery.",
    slots: ["ADD PROJECT SCREENSHOT", "ADD PROJECT SCREENSHOT", "ADD PROJECT DOCUMENT"], media: [], links: [] },
  { slug: "mindemy", objective: "Translate a mental-health product concept into a working mobile application experience.", process: ["Interface design in Figma", "Implementation in Flutter and Dart", "Multiple user flows: sessions, tests, meditation, booking, payment, chat and filtering"], n: "02", t: "MINDEMY", sub: "MENTAL HEALTH MOBILE APP", role: "MOBILE DEVELOPER", type: "MOBILE APP · ACADEMIC PROJECT",
    lab: "TECH", img: "/images/project-2.png", items: ["Flutter", "Dart", "Figma"], tools: ["Flutter", "Dart", "Figma"], techLabel: "TECHNOLOGY",
    d: "Mental-health mobile app concept: psychologist sessions, early detection tests, meditation, booking, payment, chat and filtering. Demo not deployed.",
    overview: "Mindemy is an academic mobile-app concept in the mental-health space. It brings together psychologist sessions, early detection tests, meditation, booking, payment flow, chat and filtering. The project was not deployed publicly.",
    myRole: "Mobile Developer, working with Flutter and Dart and using Figma for interface design.",
    resp: ["Psychologist sessions", "Early detection testing", "Meditation", "Booking", "Payment flow", "Chat", "Filtering"],
    respNote: "[Edit: refine this list to your specific contributions.]",
    outcome: "A concept covering multiple user flows and interface components. It was built as project work and was not deployed or used by real users.",
    conclusion: "The project demonstrated the ability to translate a product concept into a mobile application experience, including multiple user flows and interface components.",
    slots: ["ADD PROJECT SCREENSHOT", "ADD PROJECT SCREENSHOT", "ADD FIGMA / DEMO LINK"], media: [], links: [] },
  { slug: "kingkos", objective: "Build an end-to-end costume booking web application.", process: ["Backend and database with Laravel, PHP and MySQL", "Frontend with HTML/CSS", "Customer flows: authentication, catalog, booking, payment (no gateway) and shipping", "Admin dashboard with CRUD and filtering"], n: "03", t: "KINGKOS", sub: "COSTUME BOOKING WEB APP", role: "FULL-STACK DEVELOPER", type: "WEB APPLICATION",
    lab: "TECH", img: "/images/project-3.png", items: ["Laravel", "PHP", "MySQL", "HTML/CSS"], tools: ["Laravel", "PHP", "MySQL", "HTML/CSS"], techLabel: "TECHNOLOGY",
    d: "Costume booking web app with authentication, catalog, booking and payment flow, admin dashboard, CRUD, filtering and shipping.",
    overview: "Kingkos is a costume booking web application with login and registration, a costume catalog, booking, a payment flow (without a payment gateway), an admin dashboard, CRUD management, filtering and a shipping flow.",
    myRole: "Full-Stack Developer across frontend, backend and database using Laravel, PHP, MySQL and HTML/CSS.",
    resp: ["Authentication (login / register)", "Costume catalog", "Booking", "Payment flow (no payment gateway)", "Admin dashboard", "CRUD", "Filtering", "Shipping flow"],
    respNote: "[Edit: refine this list to your specific contributions.]",
    outcome: "A complete booking application covering both customer-facing and administrative functionality.",
    conclusion: "The project demonstrated the ability to develop a web application across frontend, backend, database, authentication, booking and administrative functionality.",
    slots: ["ADD PROJECT SCREENSHOT", "ADD PROJECT SCREENSHOT", "ADD GITHUB / DEMO LINK"], media: [], links: [] },
];
// Fill in real data. Leave href "#" until you have a link.
export const CERTS = [
  { label: "PROJECT MANAGEMENT", name: "SCRUM FUNDAMENTALS CERTIFIED", by: "SCRUMstudy", year: "2026", scr: "EXECUTE.", href: "" },
  { label: "ENGLISH PROFICIENCY", name: "EPRT — ENGLISH PROFICIENCY TEST", by: "Telkom University Language Center", year: "2026", valid: "2028", scr: "FOCUS.", href: "" },
];
export const EMAIL = "ghifariimr@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/ghifariimr/";
export const PHONE_DISPLAY = "+62 858-9215-7416";
export const PHONE_TEL = "+6285892157416";
