import { ASSETS, cream, gold, espresso, muted, T, sharp, render } from './lib-v2.mjs';
import { readdirSync, unlinkSync, readFileSync } from 'fs';

const W=1080, H=1920, cx=540, cy=960;
const DIR = ASSETS + '/highlights';

// medallion tones
const discLight = '#ECE1CF';   // warm parchment disc
const discDark  = espresso;    // dramatic dark disc
const R = 344;                 // medallion radius (inside IG circular crop)

// ---- compass bezel: double ring + graduated ticks (surveyor DNA) ----
function bezel(stroke){
  const rO=R, rI=R-16;
  let s=`<circle cx="${cx}" cy="${cy}" r="${rO}" fill="none" stroke="${stroke}" stroke-width="2.4"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="${rI}" fill="none" stroke="${stroke}" stroke-width="1.1" opacity="0.85"/>`;
  for(let i=0;i<48;i++){
    const a=(i/48)*Math.PI*2, ca=Math.cos(a), sa=Math.sin(a);
    const card = i%12===0;
    const t1=rO+4, t2=rO+(card?18:10);
    s+=`<line x1="${(cx+ca*t1).toFixed(1)}" y1="${(cy+sa*t1).toFixed(1)}" x2="${(cx+ca*t2).toFixed(1)}" y2="${(cy+sa*t2).toFixed(1)}" stroke="${stroke}" stroke-width="${card?2.2:1.2}" opacity="${card?1:0.7}"/>`;
  }
  return s;
}

function ghost(){
  let g=''; const step=108;
  for(let x=step;x<W;x+=step) g+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${gold}" stroke-width="1" opacity="0.035"/>`;
  for(let y=step;y<H;y+=step) g+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${gold}" stroke-width="1" opacity="0.035"/>`;
  return g;
}

// ---- professional construction icons (Phosphor Icons, MIT) loaded from _build/icons ----
// blueprint→cara-kerja · toolbox→layanan · buildings→tentang · question→faq · phone-call→kontak · armchair→inspirasi
function loadIcon(key){
  const svg = readFileSync(new URL(`./icons/${key}.svg`, import.meta.url),'utf8');
  return svg.replace(/^[\s\S]*?<svg[^>]*>/,'').replace(/<\/svg>\s*$/,''); // strip outer <svg>
}
function iconBlock(key,fill){
  const size=270, s=size/256, ix=cx-128*s, iy=cy-128*s;   // Phosphor viewBox 256, centered in disc
  return `<g transform="translate(${ix},${iy}) scale(${s})" fill="${fill}">${loadIcon(key)}</g>`;
}

// icon-only — Instagram supplies the highlight name beneath the cover
function cover(key,label,theme){
  const dark = theme==='dark';
  const disc = dark ? discDark : discLight;
  const iconFill = dark ? '#C69A3A' : gold;   // brighter gold reads cleaner on espresso
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${cream}"/>
    ${ghost()}
    <circle cx="${cx}" cy="${cy}" r="${R-2}" fill="${disc}"/>
    ${bezel(gold)}
    ${iconBlock(key,iconFill)}
  </svg>`;
}

const COVERS = [
  ['01-cara-kerja','cara-kerja','CARA KERJA'],
  ['02-layanan',   'layanan',   'LAYANAN'],
  ['03-tentang',   'tentang',   'TENTANG'],
  ['04-faq',       'faq',       'FAQ'],
  ['05-kontak',    'kontak',    'KONTAK'],
  ['06-inspirasi', 'inspirasi', 'INSPIRASI'],
];

const THEME = process.argv[2]==='light' ? 'light' : 'dark';

console.log(`Highlight covers V4 — Phosphor construction icons (${THEME}):`);
for(const f of readdirSync(DIR)) { try{ unlinkSync(`${DIR}/${f}`);}catch{} }
for(const [file,key,label] of COVERS) await render(DIR,file,cover(key,label,THEME));
if(THEME==='light') await render(DIR+'/_ab','layanan-DARK',cover('layanan','LAYANAN','dark'));

// ---- review contact sheet ----
const items = COVERS.map(([f])=>`${DIR}/${f}.png`);
if(THEME==='light') items.push(`${DIR}/_ab/layanan-DARK.png`);
const tw=300, th=Math.round(tw*H/W), cols=4, gap=18, pad=28;
const rows=Math.ceil(items.length/cols);
const comps=[];
for(let i=0;i<items.length;i++){
  const buf=await sharp(items[i]).resize(tw,th).toBuffer();
  comps.push({input:buf,left:pad+(i%cols)*(tw+gap),top:pad+Math.floor(i/cols)*(th+gap)});
}
await sharp({create:{width:pad*2+cols*tw+(cols-1)*gap,height:pad*2+rows*th+(rows-1)*gap,channels:3,background:'#3a3a3a'}})
  .composite(comps).png().toFile(`${DIR}/_preview.png`);
console.log('DONE — preview at highlights/_preview.png');
