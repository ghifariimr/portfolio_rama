import { useId } from "react";
import MediaImage from "./MediaImage.jsx";

export const MEDIA_LABELS = ["PROJECT OVERVIEW", "INTERFACE / WORKFLOW", "PROJECT PROCESS", "PROJECT OUTPUT", "DOCUMENTATION"];
const TH = {
  transtrack: { t: "TRANSTRACK", s: "RALLY SAFETY PROJECT", k: "board" },
  mindemy: { t: "MINDEMY", s: "MOBILE APPLICATION", k: "app" },
  kingkos: { t: "KINGKOS", s: "COSTUME BOOKING SYSTEM", k: "web" },
};
const R = "#E50914", C = "#F4F1EA", K = "#0b0b0b";

/* Original CSS/SVG mockup. Always tagged "MOCKUP" so it can never pass as real evidence. */
export function Mock({ slug, v = 0 }) {
  const T = TH[slug] || TH.transtrack;
  const uid = "h" + useId().replace(/:/g, "");
  let body;
  if (v === 0) body = (
    <>
      <polygon points="170,0 400,0 400,300 120,300" fill={R} />
      <text x="22" y="118" fontFamily="Anton,Impact,sans-serif" fontSize="62" fill={C} stroke="#000" strokeWidth="3" paintOrder="stroke">{T.t}</text>
      <text x="24" y="146" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="13" letterSpacing="3" fill={C}>{T.s}</text>
      <rect x="24" y="170" width="120" height="8" fill={R} /><rect x="24" y="186" width="90" height="8" fill={C} opacity=".6" />
      <polygon points="250,60 370,40 360,150 240,170" fill={K} stroke={C} strokeWidth="2" />
      <polygon points="270,190 380,180 375,260 262,262" fill={C} />
    </>
  );
  else if (v === 1 && T.k === "board") body = (
    <>
      <rect x="30" y="24" width="120" height="10" fill={C} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="30" y={50 + i * 38} width="340" height="1" fill={C} opacity=".25" />
          <rect x={50 + (i * 37) % 90} y={58 + i * 38} width={110 + (i * 53) % 120} height="14" fill={i === 2 ? R : C} />
        </g>
      ))}
      <polygon points="300,40 310,50 300,60 290,50" fill={R} /><polygon points="200,238 210,248 200,258 190,248" fill={R} />
    </>
  );
  else if (v === 1 && T.k === "app") body = (
    <>
      {[60, 220].map((x, i) => (
        <g key={i}>
          <rect x={x} y={30 + i * 14} width="120" height="220" fill={K} stroke={C} strokeWidth="3" />
          <rect x={x + 40} y={30 + i * 14} width="40" height="8" fill={C} />
          <rect x={x + 14} y={60 + i * 14} width="92" height="46" fill={i ? C : R} />
          <rect x={x + 14} y={116 + i * 14} width="92" height="10" fill={C} opacity=".7" />
          <rect x={x + 14} y={134 + i * 14} width="64" height="10" fill={C} opacity=".4" />
          <polygon points={`${x + 14},${170 + i * 14} ${x + 106},${164 + i * 14} ${x + 106},${200 + i * 14} ${x + 14},${206 + i * 14}`} fill={R} />
        </g>
      ))}
    </>
  );
  else if (v === 1) body = (
    <>
      <rect x="24" y="24" width="352" height="252" fill={K} stroke={C} strokeWidth="3" />
      <rect x="24" y="24" width="352" height="22" fill={C} /><rect x="34" y="31" width="40" height="8" fill={R} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={44 + (i % 3) * 108} y={68 + Math.floor(i / 3) * 96} width="96" height="84" fill={i === 1 ? R : "#1a1a1a"} stroke={C} strokeWidth="1.5" />)}
    </>
  );
  else if (v === 2) body = (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <polygon points={`${24 + i * 92},90 ${104 + i * 92},84 ${104 + i * 92},170 ${24 + i * 92},176`} fill={i === 3 ? R : K} stroke={C} strokeWidth="2.5" />
          <text x={50 + i * 92} y="146" fontFamily="Anton,Impact,sans-serif" fontSize="44" fill={C}>{i + 1}</text>
          {i < 3 && <polygon points={`${106 + i * 92},124 ${114 + i * 92},130 ${106 + i * 92},136`} fill={R} />}
          <rect x={24 + i * 92} y="190" width="70" height="7" fill={C} opacity=".5" />
        </g>
      ))}
    </>
  );
  else if (v === 3) body = (
    <>
      <rect x="24" y="24" width="352" height="26" fill={C} /><rect x="34" y="33" width="60" height="8" fill={R} />
      {[0, 1, 2].map((i) => <rect key={i} x={24 + i * 120} y="66" width="112" height="70" fill={i === 0 ? R : "#1a1a1a"} stroke={C} strokeWidth="1.5" />)}
      <rect x="24" y="150" width="352" height="110" fill="#141414" stroke={C} strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="40" y={166 + i * 22} width={220 - i * 30} height="8" fill={C} opacity=".5" />)}
    </>
  );
  else body = (
    <>
      <polygon points="110,24 300,18 306,278 104,284" fill={C} />
      <rect x="130" y="40" width="110" height="14" fill={R} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x="130" y={70 + i * 24} width={i % 3 === 2 ? 90 : 150} height="8" fill={K} opacity=".7" />)}
      <polygon points="250,200 292,196 296,236 254,240" fill="none" stroke={R} strokeWidth="4" />
    </>
  );
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${T.t} placeholder mockup`}>
      <defs><pattern id={uid} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill={R} opacity=".5" /></pattern></defs>
      <rect width="400" height="300" fill={K} /><rect width="400" height="300" fill={`url(#${uid})`} opacity=".35" />
      {body}
      <rect x="0" y="278" width="250" height="22" fill="#000" />
      <text x="8" y="293" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="9" letterSpacing="1.5" fill={C}>PLACEHOLDER · MEDIA NOT AVAILABLE</text>
    </svg>
  );
}

export function ProjectVisual({ slug, src, alt, v = 0, eager = false }) {
  return <MediaImage src={src} alt={alt} eager={eager} fallback={<Mock slug={slug} v={v} />} />;
}
