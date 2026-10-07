// Optional helper: turns a normal photo into a transparent-background PNG.
// 1) npm i -D @imgly/background-removal-node   (needs internet; downloads an AI model on first run)
// 2) node scripts/cutout.mjs path/to/photo.jpg public/images/ghifarii.png
import fs from "node:fs";
import path from "node:path";
import { removeBackground } from "@imgly/background-removal-node";
const [, , input, output = "public/images/ghifarii.png"] = process.argv;
if (!input) { console.log("Usage: node scripts/cutout.mjs <photo.jpg> [out.png]"); process.exit(1); }
const ext = path.extname(input).slice(1).toLowerCase().replace("jpg", "jpeg");
const blob = new Blob([fs.readFileSync(input)], { type: `image/${ext}` });
const out = await removeBackground(blob, { output: { format: "image/png" } });
fs.writeFileSync(output, Buffer.from(await out.arrayBuffer()));
console.log("Saved", output);
