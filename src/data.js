/* ====== EDIT CONTENT HERE ====== */
export const NAV = ["home", "about", "experience", "organization", "projects", "certification", "contact"];

// Experience proof media. Put files in /public/images/experience/<folder>/ and reference them from the site root ("/images/..." - never "/public/...").
export const EXP = [
  { 
    no: "03", 
    org: "TRANSTRACK", 
    role: "ASSOCIATE PROJECT MANAGER", 
    proj: "RALLY SAFETY PROJECT", 
    date: "MAR 2026 — JUL 2026", 
    scr: "DELIVER.", 
    lead: true,
    desc: "Supported project planning, requirements mapping (RTM), workflow flowcharting, and cross-functional backlog management throughout the Rally Safety Project.",
    pts: ["Regulation Mapping (FIA)", "Requirements Traceability Matrix (RTM)", "Emergency Workflow Logic (Mesh Relay)", "Slow Zone Parameter Design", "Backlog Governance (Notion/FigJam)"],
    media: [
      { src: "/images/experience/transtrack/proof-1.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/transtrack/proof-2.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/transtrack/proof-3.jpg", caption: "PROJECT MEDIA" }
    ] 
  },
  { 
    no: "02", 
    org: "TELKOM UNIVERSITY", 
    role: "LABORATORY TEACHING ASSISTANT", 
    date: "SEP 2025 — JAN 2026", 
    scr: "COORDINATE.",
    desc: "Mentored undergraduate students in practical laboratory sessions, assisting with system modeling, database queries, and technical troubleshooting.", 
    pts: ["Lab session guidance", "System modeling assistance", "Database query support", "Technical troubleshooting"],
    media: [
      { src: "/images/experience/practicum/proof-1.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/practicum/proof-2.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/practicum/proof-3.jpg", caption: "PROJECT MEDIA" }
    ] 
  },
  { 
    no: "01", 
    org: "PERTAMINA CEPU — ZONA III", 
    role: "MLBB COACH", 
    date: "JUL 2025 — AUG 2025", 
    scr: "ANALYZE.",
    desc: "Coached and analyzed Mobile Legends teams in a competitive environment, focusing on strategy, team coordination, performance analysis, and match preparation.", 
    pts: ["Match analysis", "Drafting strategy", "Team coordination"],
    media: [
      { src: "/images/experience/mlbb/proof-1.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/mlbb/proof-2.jpg", caption: "PROJECT MEDIA" }, 
      { src: "/images/experience/mlbb/proof-3.jpg", caption: "PROJECT MEDIA" }
    ] 
  },
];

export const ORG = [
  { n: "01", t: "YOUNG STAFF", d: "Joined Nippon Bunka-Bu as a staff member, contributing to organizational programs and event operations." },
  { n: "02", t: "HEAD OF INTERNAL", d: "Headed the internal division, supporting member coordination and internal communication across sub-teams." },
  { n: "03", t: "VICE CHAIR", d: "Supported the chair in leading organizational governance, cross-divisional alignment, and cultural event planning." },
];

export const PROJECTS = [
  { 
    slug: "transtrack", 
    n: "01", 
    t: "TRANSTRACK", 
    sub: "RALLY CONTROL SOFTWARE & TELEMATICS", 
    role: "ASSOCIATE PROJECT MANAGER INTERN", 
    type: "IT PROJECT MANAGEMENT",
    lab: "FOCUS", 
    mainImage: "/images/projects/transtrack/main.jpg",
    items: ["Requirements Gathering", "RTM Documentation", "Workflow Mapping", "Backlog Management", "Agile Execution"],
    tools: ["Notion", "FigJam", "Agile / Scrum", "RTM", "Flowcharting"],
    objective: "Translate official FIA rally safety guidelines into clear technical specifications, design functional workflows for emergency communication (Mesh Relay) and speed limit enforcement (Slow Zone), and manage task backlogs for engineering handoff.", 
    process: [
      "Regulation Analysis: Analyzed official FIA rally safety guidelines to extract functional system requirements.",
      "RTM Compilation: Built a Requirements Traceability Matrix (RTM) to map safety rules directly to technical deliverables.",
      "Workflow & Logic Design: Created flowchart diagrams in FigJam for emergency communication scenarios (Mesh Relay) and Slow Zone parameter rules.",
      "Interaction Concepting: Mapped functional alert display rules for cockpit devices (RTD) as reference material for developer handoff.",
      "Backlog Governance: Structured task tickets, prioritized work items, and maintained product backlogs in Notion and FigJam."
    ],
    overview: "An internship project at TransTRACK focused on preparing system requirement documentation, mapping functional workflows, and managing task backlogs for rally safety software (Rally Control Software and vehicle-to-vehicle communication).",
    myRole: "Associate Project Manager Intern, responsible for converting FIA regulations into structured RTMs, designing functional logic flowcharts, and managing project backlogs.",
    resp: [
      "Regulation Mapping: Authored the RTM document connecting FIA rally safety guidelines to system requirement specifications.",
      "Emergency Logic Flow: Designed functional flowcharts for vehicle-to-vehicle emergency communication scenarios (Mesh Relay) during signal dead-zones.",
      "Slow Zone Rule Formulation: Defined functional parameters linking route geometry data (KML/CSV) with speed limit enforcement rules.",
      "Task Governance: Organized product backlogs and task tickets in Notion/FigJam to prepare clear deliverables for the engineering team."
    ],
    outcome: "Delivered a complete RTM document and system flowchart suite ready for developer handoff, clarified functional system logic for rally safety features, and established a well-structured backlog repository in Notion.", 
    conclusion: "This experience strengthened my ability to translate complex operational guidelines into structured technical requirements (RTM), design system logic workflows, and manage project backlogs using Agile practices.",
    media: [
      { src: "/images/projects/transtrack/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/transtrack/media-02.jpg", label: "MEDIA_02", caption: "MASTER PLAN" },
      { src: "/images/projects/transtrack/media-03.jpg", label: "MEDIA_03", caption: "PROJECT PROCESS" },
      { src: "/images/projects/transtrack/media-04.jpg", label: "MEDIA_04", caption: "PROJECT OUTPUT" },
    ], 
    links: [] 
  },
  { 
    slug: "mindemy", 
    n: "02", 
    t: "MINDEMY", 
    sub: "STUDENT ACADEMIC STRESS & MOTIVATION MONITORING SYSTEM", 
    role: "LEAD BACK-END & WEB DASHBOARD DEVELOPER", 
    type: "WEB APPLICATION · FINAL DEGREE PROJECT",
    lab: "TECH", 
    mainImage: "/images/projects/mindemy/main.jpg", 
    items: ["React.js", "Python (Flask)", "MySQL", "RESTful API", "JWT", "Chart.js"], 
    tools: ["React.js", "Python", "Flask", "MySQL", "RESTful API", "Chart.js", "Bootstrap", "React", "Vite"], 
    techLabel: "TECHNOLOGY",
    d: "A web-based managerial Decision Support System (DSS) developed as a Final Degree Project at Telkom University to integrate student mental health and academic motivation screening results.",
    objective: "Build a centralized web platform to eliminate manual, reactive academic counseling workflows, ingest and store automated ML classification outputs (Low, Medium, High) via REST APIs, and deliver role-based visualization dashboards to support early intervention.", 
    process: [
      "Requirements & Waterfall SDLC: Executed problem analysis and system specifications using the sequential Waterfall methodology.",
      "Back-End Engineering & API Design: Built server-side services using Flask (Python) with SQLAlchemy ORM and defined JSON RESTful API contracts for ML module integration.",
      "Database Architecture: Designed a relational MySQL database schema (7 core entities) to manage screening histories, user access, and counseling logs.",
      "Front-End & Analytics Integration: Developed responsive web dashboards using React.js, Vite, and Chart.js, implementing role-based access control (RBAC) with JWT authentication.",
      "Testing & Validation: Conducted Black Box testing across all functional scenarios and integration testing across React.js, Flask, MySQL, and ML API endpoints."
    ], 
    overview: "A web-based managerial monitoring system developed as a Final Degree Project at Telkom University to centrally integrate student stress and motivation screening results. The system processes classification data from an external Machine Learning module via RESTful APIs, providing interactive dashboards, risk priority tracking, and counseling documentation for Academic Advisors (Dosen Wali) and Heads of Study Programs (Kaprodi).",
    myRole: "Lead Back-End & Web Dashboard Developer, responsible for designing the server architecture, MySQL database, RESTful API integration layers, and interactive React.js dashboards.",
    resp: [
      "Back-End Architecture & REST APIs: Developed the entire server-side architecture using Flask, creating secure API endpoints to receive ML classification results and manage database transactions.",
      "Priority Matrix Logic: Implemented backend business logic for the Early Warning System (EWS) to automatically flag students needing attention based on stress/motivation levels and screening score spikes (>=30 points).",
      "Role-Based Access Control (RBAC): Implemented JWT authentication ensuring strict data isolation (Dosen Wali views assigned advisees; Kaprodi views aggregated program-level analytics).",
      "Automated Narrative & Export Engine: Integrated template-based individual trend summaries and structured PDF/Excel report export features."
    ],
    outcome: "Delivered a fully integrated web monitoring system validated through 100% successful Black Box and Integration Testing scenarios, enabling real-time psychological risk profiling across class units and study programs.",
    conclusion: "This final project demonstrated my ability to architect robust back-end systems using Python/Flask, design normalized SQL databases, engineer RESTful API integration layers, and build data-driven web dashboards using React.js.",
    media: [
      { src: "/images/projects/mindemy/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/mindemy/media-02.jpg", label: "MEDIA_02", caption: "ARCHITECTURE SYSTEM" },
      { src: "/images/projects/mindemy/media-03.jpg", label: "MEDIA_03", caption: "INTERFACE" },
      { src: "/images/projects/mindemy/media-04.jpg", label: "MEDIA_04", caption: "PROJECT OUTPUT" },
    ], 
    links: [] 
  },
  { 
    slug: "kingkos", 
    n: "03", 
    t: "KINGKOS", 
    sub: "COSTUME RENTAL & BOOKING PLATFORM", 
    role: "FULL-STACK DEVELOPER", 
    type: "WEB APPLICATION",
    lab: "TECH", 
    mainImage: "/images/projects/kingkos/main.jpg", 
    items: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML/CSS"], 
    tools: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML5", "CSS3"], 
    techLabel: "TECHNOLOGY",
    d: "Web-based e-commerce and booking platform designed to streamline costume rentals with catalog search, dynamic filtering, address management, and checkout flows.",
    objective: "Transition traditional manual costume rental inquiries into an automated online booking workflow, implement dynamic filtering by category/size/availability, and build an end-to-end web system covering database design, server logic, and responsive UI.", 
    process: [
      "Requirements Gathering & Schema Design: Analyzed costume rental workflows and designed relational database schemas in MySQL to manage categories, inventories, rental durations, and booking statuses.",
      "Back-End Development: Constructed server-side logic using Laravel (PHP), defining routes, controllers, and Eloquent ORM models to process search requests, address validation, and checkout flows.",
      "Front-End Implementation: Built user-facing interfaces using Blade templates, HTML5, CSS3, and JavaScript to deliver responsive catalog views and filter panels.",
      "Checkout & Order Logic: Integrated form state handling to capture delivery addresses, calculate total rental costs based on rental duration, and process order submission.",
      "System Testing: Conducted end-to-end functional testing to ensure accurate data persistence from user input to MySQL database records."
    ], 
    overview: "Kingkos is a costume booking web application featuring login and registration, costume catalog search, multi-parameter filtering, address management, rental checkout logic, and an administrative CRUD dashboard.",
    myRole: "Full-Stack Developer, building both front-end interface components and back-end Laravel logic across major system modules.",
    resp: [
      "Full-Stack Architecture: Engineered both front-end interface components and back-end Laravel logic across major system modules.",
      "Search & Dynamic Filtering: Developed search query logic and database filtering for costume categories, inventory status, and attributes.",
      "Booking & Checkout Pipeline: Implemented end-to-end checkout functionality, incorporating customer address selection, rental scheduling, and order status updates.",
      "Database Management: Designed normalized MySQL tables and relationships ensuring relational integrity between users, products, categories, and bookings."
    ],
    outcome: "Successfully delivered a fully functional costume booking web prototype featuring search, filtering, inventory management, and checkout operations.",
    conclusion: "Working on Kingkos as a Full-Stack Developer provided fundamental experience in end-to-end web development, strengthening my capabilities in MVC architecture using Laravel, MySQL database design, dynamic UI manipulation, and structured web application logic.",
    media: [
      { src: "/images/projects/kingkos/media-01.jpg", label: "MEDIA_01", caption: "PROJECT OVERVIEW" },
      { src: "/images/projects/kingkos/media-02.jpg", label: "MEDIA_02", caption: "PROJECT PROCESS" },
      { src: "/images/projects/kingkos/media-03.jpg", label: "MEDIA_03", caption: "IMPLEMENTATION" },
    ], 
    links: [] 
  },
];

export const CERTS = [
  { 
    label: "PROJECT MANAGEMENT", 
    name: "SCRUM FUNDAMENTALS CERTIFIED (SFC™)", 
    by: "SCRUMstudy", 
    year: "2026", 
    scr: "EXECUTE.",
    certificateUrl: "https://drive.google.com/file/d/1uR6y670-ZXWiNGTw_b3xzbV2Zh1HZImt/view?usp=drive_link" 
  },
  { 
    label: "ENGLISH PROFICIENCY", 
    name: "EPRT — ENGLISH PROFICIENCY TEST (SCORE: 490 / CEFR B1)", 
    by: "Telkom University Language Center", 
    year: "2026", 
    valid: "2028", 
    scr: "FOCUS.",
    certificateUrl: "https://drive.google.com/file/d/1W8U3qn4LVitI4nRt-CW8J4E8uT2SAuWr/view?usp=drive_link" 
  },
];

export const EMAIL = "ghifariimr@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/ghifariimr/";
export const PHONE_DISPLAY = "+62 858-9215-7416";
export const PHONE_TEL = "+6285892157416";

// Resume file candidates (served from /public). The first one that exists is downloaded.
// Put your PDF at public/resume.pdf (or any name below); it is always saved for the visitor as Ghifarii_Muhammad_Ramadhan_Resume.pdf
export const RESUME_FILES = [
  "/resume.pdf",
  "/Resume.pdf",
  "/Ghifarii_Muhammad_Ramadhan_Resume.pdf",
  "/Ghifarii-Muhammad-Ramadhan-Resume.pdf",
  "/Ghifarii_Muhammad_Ramadhan_CV.pdf",
  "/cv.pdf",
];
export const RESUME_DOWNLOAD_NAME = "Ghifarii_Muhammad_Ramadhan_Resume.pdf";
