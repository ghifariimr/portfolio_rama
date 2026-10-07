PORTFOLIO RAMA
1) Install Node.js (nodejs.org), buka terminal di folder ini
2) npm install
3) npm run dev     -> buka http://localhost:5173
Gambar (taruh di public/images/): ghifarii.png, ghifarii-bw.png, project-1.png ... project-3.png
Resume: public/resume.pdf
Edit konten: bagian "EDIT CONTENT HERE" di src/App.jsx

V4: routes /projects/transtrack, /projects/mindemy, /projects/kingkos
Project media: put files in public/projects/<slug>/ then list them in src/data.js (media: [...]).

V5: Resume -> put your PDF at public/Ghifarii-Muhammad-Ramadhan-Resume.pdf (exact name). Without it the Download button has no file to serve.
Vercel: framework preset "Vite"; add a vercel.json rewrite so /projects/* works on refresh (included).

V6 PORTRAIT: save a TRANSPARENT-background cutout (half-body, PNG) as public/images/ghifarii.png
 -> outline (cream), red offset, black shadow, halftone and hover effects are generated automatically from the PNG's alpha edge.
 -> the same file is reused in the About section.

V8
- Hero portrait: public/images/ghifarii.png MUST have a transparent background (cutout). If it does not, the site falls back to an angular poster cut
  without the silhouette outline. To make a cutout: remove.bg / Photoshop, or: npm i -D @imgly/background-removal-node, then
  node scripts/cutout.mjs your-photo.jpg public/images/ghifarii.png
- Second photo (About flip card): public/images/ghifarii-card.jpg  (back side shows 16.08.25)
- Resume: public/Ghifarii_Muhammad_Ramadhan_Resume.pdf (the old hyphenated name also works)
