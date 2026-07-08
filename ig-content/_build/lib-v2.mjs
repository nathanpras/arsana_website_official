// Arsana IG — V2 design-language shared library
// Run scripts via: node <script>.mjs  (lives at <repo>/ig-content/_build — sharp
// resolves via the website repo's node_modules since this folder is nested inside it)
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';
import sharpLib from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));   // .../ig-content/_build
const toPosix = p => p.replace(/\\/g, '/').replace(/\/$/, '');
export const ASSETS = toPosix(join(__dirname, '..'));               // .../ig-content
export const REPO = toPosix(join(__dirname, '..', '..'));           // website repo root
export const sharp = sharpLib;

// ---- brand tokens (LOCKED) ----
export const cream='#F5EEE5', gold='#A37510', espresso='#271810', muted='#6B5A47';

const favB64 = readFileSync(REPO + '/public/favicon.svg').toString('base64');
export const favURI = `data:image/svg+xml;base64,${favB64}`;

export const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

export function T(x,y,str,{size=32,fill=espresso,family='Arial',weight='normal',anchor='middle',ls=0,italic=false,opacity=1}={}){
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}" ${italic?'font-style="italic"':''} opacity="${opacity}">${esc(str)}</text>`;
}

// greedy word-wrap by char budget
export function wrap(str,max){
  const words=str.split(' '); const lines=[]; let cur='';
  for(const w of words){
    if((cur+' '+w).trim().length>max){ if(cur) lines.push(cur); cur=w; }
    else cur=(cur+' '+w).trim();
  }
  if(cur) lines.push(cur);
  return lines;
}

// ---- structural pieces (parametric on canvas W,H) ----
export function ghostGrid(W,H,op=0.04){
  let g=''; const step=108;
  for(let x=step;x<W;x+=step) g+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${gold}" stroke-width="1" opacity="${op}"/>`;
  for(let y=step;y<H;y+=step) g+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${gold}" stroke-width="1" opacity="${op}"/>`;
  return g;
}
export function cornerTicks(W,H,m){
  const t=22;
  const c=(cx,cy,sx,sy)=>`<line x1="${cx}" y1="${cy}" x2="${cx+sx*t}" y2="${cy}" stroke="${gold}" stroke-width="1.6"/><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy+sy*t}" stroke="${gold}" stroke-width="1.6"/>`;
  return c(m,m,1,1)+c(W-m,m,-1,1)+c(m,H-m,1,-1)+c(W-m,H-m,-1,-1);
}
// full architectural plate: bg + grid + border + ticks + header + footer
export function plate(W,H,inner,{index='',eyebrowR='',brand='A R S A N A',footL='@arsana.idn',m=54,px=90}={}){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${cream}"/>
    ${ghostGrid(W,H)}
    <rect x="${m}" y="${m}" width="${W-2*m}" height="${H-2*m}" fill="none" stroke="${gold}" stroke-width="1.2" opacity="0.5"/>
    ${cornerTicks(W,H,m)}
    ${T(px,116,brand,{size:30,fill:gold,family:'Georgia',weight:'bold',anchor:'start',ls:6})}
    ${T(W-px,112,index,{size:22,fill:muted,anchor:'end',ls:4})}
    <line x1="${px}" y1="140" x2="${W-px}" y2="140" stroke="${gold}" stroke-width="1.2" opacity="0.55"/>
    ${inner}
    <line x1="${px}" y1="${H-150}" x2="${W-px}" y2="${H-150}" stroke="${gold}" stroke-width="1.2" opacity="0.55"/>
    ${T(px,H-110,footL,{size:22,fill:muted,anchor:'start',ls:4})}
    ${T(W-px,H-110,eyebrowR,{size:22,fill:muted,anchor:'end',ls:4})}
  </svg>`;
}

export function divider(cx,cy,w=120){
  return `<line x1="${cx-w/2}" y1="${cy}" x2="${cx+w/2}" y2="${cy}" stroke="${gold}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="4" fill="${gold}"/>`;
}
// active: index filled up-to (0-based). -1 = all filled. use -2 = none filled but first solid
export function nodeRow(cx,cy,n,active,span){
  const gap=span/(n-1); const x0=cx-span/2;
  let s=`<line x1="${x0}" y1="${cy}" x2="${x0+span}" y2="${cy}" stroke="${gold}" stroke-width="1.6" opacity="0.7"/>`;
  for(let i=0;i<n;i++){ const x=x0+i*gap;
    const filled = active===-1 ? true : i<=active;
    s+= filled
      ? `<circle cx="${x}" cy="${cy}" r="9" fill="${gold}"/>`
      : `<circle cx="${x}" cy="${cy}" r="8" fill="${cream}" stroke="${gold}" stroke-width="1.6" opacity="0.85"/>`;
  }
  return s;
}

// approx Arial/Helvetica glyph widths (per 1000 em units) — enough coverage for
// brand handle + uppercase labels used in footers. Unknown chars fall back to 600.
const GLYPH_W = {
  A:667,B:667,C:722,D:722,E:667,F:611,G:778,H:722,I:278,J:500,K:667,L:556,M:833,N:722,O:778,P:667,Q:778,R:722,S:667,T:611,U:722,V:667,W:944,X:667,Y:667,Z:611,
  a:556,b:556,c:500,d:556,e:556,f:278,g:556,h:556,i:222,j:222,k:500,l:222,m:833,n:556,o:556,p:556,q:556,r:333,s:500,t:278,u:556,v:500,w:722,x:500,y:500,z:500,
  '0':556,'1':556,'2':556,'3':556,'4':556,'5':556,'6':556,'7':556,'8':556,'9':556,
  ' ':278,'&':722,'.':278,',':278,'-':333,'/':278,'@':1015,':':278,
};
// estimated rendered width in px — deliberately overestimates (counts letter-spacing
// after every glyph incl. the last) so layout math always errs toward more clearance.
export function textWidth(str,{size=22,ls=4}={}){
  const s=String(str); let w=0;
  for(const ch of s) w += (GLYPH_W[ch] ?? 600)*size/1000;
  return w + ls*s.length;
}

// compute ONE fixed dot-row center/span for a whole carousel, sized to clear the
// single longest footer label used across all its slides. Every slide then draws
// the row at this same {center,span} — identical position on every page, and
// collision-safe by construction (the worst-case label defines the safe zone, so
// every shorter label has even more clearance). Call once per carousel script,
// reuse the result for every card/step — do NOT recompute per-slide, or the row
// drifts from page to page (that was the previous bug's replacement bug).
export function footerProgressLayout(W,px,cx,labels,{footL='@arsana.idn',size=22,ls=4,gap=36,idealSpan=380,minSpan=150}={}){
  const leftLimit = px + textWidth(footL,{size,ls}) + gap;
  const worstLabelW = Math.max(...labels.map(l=>textWidth(l,{size,ls})));
  const rightLimit = (W-px) - worstLabelW - gap;
  let span=idealSpan, center=cx;
  if(center+span/2 > rightLimit){
    center = rightLimit - span/2;
    if(center-span/2 < leftLimit){
      span = Math.max(minSpan, rightLimit-leftLimit);
      center = (leftLimit+rightLimit)/2;
    }
  }
  return {center,span};
}
export function dots(cx,cy,n,active,gap=42){
  const x0=cx-(n-1)*gap/2; let s='';
  for(let i=0;i<n;i++){ const x=x0+i*gap;
    s+= i===active ? `<circle cx="${x}" cy="${cy}" r="7" fill="${gold}"/>`
                   : `<circle cx="${x}" cy="${cy}" r="6" fill="none" stroke="${gold}" stroke-width="1.5" opacity="0.6"/>`; }
  return s;
}

// ---- technical-drawing hairline icon set (100x100 local, centered) ----
const IC = {
  speech:  `<rect x="20" y="24" width="60" height="42" rx="8"/><path d="M34 66 L34 82 L52 66"/>`,
  survey:  `<circle cx="50" cy="50" r="22"/><line x1="50" y1="16" x2="50" y2="30"/><line x1="50" y1="70" x2="50" y2="84"/><line x1="16" y1="50" x2="30" y2="50"/><line x1="70" y1="50" x2="84" y2="50"/><circle cx="50" cy="50" r="3.5" fill="${gold}" stroke="none"/>`,
  doc:     `<path d="M30 18 h30 l14 14 v50 h-44 z"/><path d="M60 18 v14 h14"/><line x1="38" y1="46" x2="66" y2="46"/><line x1="38" y1="58" x2="66" y2="58"/><line x1="38" y1="70" x2="56" y2="70"/>`,
  pen:     `<line x1="22" y1="80" x2="78" y2="80"/><path d="M38 74 L64 40 L72 48 L46 82 Z"/><line x1="64" y1="40" x2="72" y2="48"/>`,
  hardhat: `<path d="M22 66 a28 28 0 0 1 56 0"/><line x1="16" y1="66" x2="84" y2="66"/><path d="M42 40 v-6 a8 8 0 0 1 16 0 v6"/>`,
  bars:    `<line x1="22" y1="80" x2="80" y2="80"/><rect x="28" y="56" width="11" height="24"/><rect x="45" y="44" width="11" height="36"/><rect x="62" y="30" width="11" height="50"/>`,
  key:     `<circle cx="36" cy="50" r="13"/><line x1="49" y1="50" x2="82" y2="50"/><line x1="72" y1="50" x2="72" y2="61"/><line x1="82" y1="50" x2="82" y2="63"/>`,
  // service icons
  sofa:    `<path d="M24 46 v-6 a8 8 0 0 1 8-8 h36 a8 8 0 0 1 8 8 v6"/><path d="M20 46 a6 6 0 0 1 6 6 v10 h48 v-10 a6 6 0 0 1 6-6 a6 6 0 0 1 6 6 v14 h-72 v-14 a6 6 0 0 1 6-6 z"/><line x1="24" y1="76" x2="24" y2="82"/><line x1="76" y1="76" x2="76" y2="82"/>`,
  building:`<rect x="30" y="24" width="40" height="60"/><line x1="30" y1="84" x2="70" y2="84"/><line x1="38" y1="34" x2="46" y2="34"/><line x1="54" y1="34" x2="62" y2="34"/><line x1="38" y1="46" x2="46" y2="46"/><line x1="54" y1="46" x2="62" y2="46"/><line x1="38" y1="58" x2="46" y2="58"/><line x1="54" y1="58" x2="62" y2="58"/><rect x="46" y="70" width="8" height="14"/>`,
  crane:   `<path d="M28 82 h44"/><path d="M40 82 v-52 h-8 l8 -8 8 8 h-8"/><path d="M40 30 h34"/><line x1="74" y1="30" x2="74" y2="44"/><path d="M60 30 v10"/>`,
  bolt:    `<path d="M54 20 L34 54 h16 l-6 26 22 -38 h-16 z"/>`,
  ac:      `<rect x="22" y="34" width="56" height="24" rx="5"/><line x1="22" y1="50" x2="78" y2="50"/><path d="M34 66 q0 6 6 6"/><path d="M50 66 q0 6 6 6"/><path d="M66 66 q0 6 6 6"/>`,
  ruler:   `<rect x="24" y="40" width="52" height="20" transform="rotate(-45 50 50)"/><line x1="40" y1="40" x2="45" y2="45"/><line x1="48" y1="48" x2="53" y2="53"/><line x1="56" y1="56" x2="61" y2="61"/>`,
  house:   `<path d="M20 52 L50 24 L80 52"/><rect x="30" y="52" width="40" height="36"/><rect x="44" y="66" width="12" height="22"/>`,
  cabinet: `<rect x="28" y="22" width="44" height="64"/><line x1="28" y1="43" x2="72" y2="43"/><line x1="28" y1="64" x2="72" y2="64"/><line x1="48" y1="30" x2="52" y2="30"/><line x1="48" y1="51" x2="52" y2="51"/><line x1="48" y1="72" x2="52" y2="72"/>`,
};
export function icon(name,cx,cy,size=110,sw=3){
  const s=size/100;
  return `<g transform="translate(${cx-size/2},${cy-size/2}) scale(${s})" stroke="${gold}" stroke-width="${sw/s}" fill="none" stroke-linejoin="round" stroke-linecap="round">${IC[name]||''}</g>`;
}

// filled professional icon (Phosphor, 256 viewBox) loaded from _build/icons/<key>.svg
export function iconFill(key,cx,cy,size,fill=gold){
  const svg=readFileSync(new URL(`./icons/${key}.svg`,import.meta.url),'utf8');
  const inner=svg.replace(/^[\s\S]*?<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  const s=size/256, ix=cx-128*s, iy=cy-128*s;
  return `<g transform="translate(${ix},${iy}) scale(${s})" fill="${fill}">${inner}</g>`;
}

export async function render(dir,name,svg){
  mkdirSync(dir,{recursive:true});
  await sharp(Buffer.from(svg)).png().toFile(`${dir}/${name}.png`);   // PNG only — IG needs PNG
  console.log('  ✓',name);
}
