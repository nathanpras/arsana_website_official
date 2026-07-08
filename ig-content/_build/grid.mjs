import { ASSETS, REPO, sharp, cream, gold, espresso, muted, favURI, T } from './lib-v2.mjs';

const A = ASSETS;
// posting order (interleave cream + commercial among residences)
const tiles = [
  {t:'cover', f:A+'/carousel-cara-kerja/00-cover.png'},
  {t:'p', f:A+'/portfolio/01-rumah-tinggal-pik-gold-coast.jpg'},
  {t:'p', f:A+'/portfolio/11-renovasi-cafe-coffee-grounds.jpg'},
  {t:'p', f:A+'/portfolio/02-rumah-tinggal-bangka-mampang.jpg'},
  {t:'p', f:A+'/portfolio/03-rumah-tinggal-nava-park.jpg'},
  {t:'p', f:A+'/portfolio/12-showroom-marmer-cipondoh.jpg'},
  {t:'p', f:A+'/portfolio/04-rumah-tinggal-puri-metland.jpg'},
  {t:'cover', f:A+'/carousel-layanan/00-cover.png'},
  {t:'p', f:A+'/portfolio/13-bozz-billiard-citra-8.jpg'},
  {t:'p', f:A+'/portfolio/05-rumah-tinggal-citra2.jpg'},
  {t:'p', f:A+'/portfolio/06-rumah-tinggal-chiara7.jpg'},
  {t:'p', f:A+'/portfolio/08-rumah-tinggal-suvarna-sutra-andara.jpg'},
  {t:'p', f:A+'/portfolio/07-rumah-tinggal-bintaro.jpg'},
  {t:'p', f:A+'/portfolio/09-rumah-tinggal-suvarna-sutra-flavio.jpg'},
  {t:'p', f:A+'/portfolio/10-rumah-tinggal-taman-kencana.jpg'},
];

const TS=360, GAP=6, COLS=3;

function brandTile(){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
    <rect width="1080" height="1080" fill="${cream}"/>
    <rect x="40" y="40" width="1000" height="1000" fill="none" stroke="${gold}" stroke-width="2" opacity="0.5"/>
    <image href="${favURI}" x="420" y="330" width="240" height="240"/>
    ${T(540,700,'A R S A N A',{size:52,fill:gold,family:'Georgia',weight:'bold',ls:8})}
    ${T(540,760,'Design · Build · Elevate',{size:26,fill:muted,ls:2})}
    ${T(540,860,'arsana.id',{size:24,fill:muted,ls:3})}
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

const comps=[]; let i=0;
for(const tile of tiles){
  const buf = tile.t==='brand'
    ? await sharp(await brandTile()).resize(TS,TS).toBuffer()
    : await sharp(tile.f).resize(TS,TS,{fit:'cover',position:'centre'}).toBuffer();
  comps.push({input:buf, left:(i%COLS)*(TS+GAP), top:Math.floor(i/COLS)*(TS+GAP)});
  i++;
}
const rows=Math.ceil(tiles.length/COLS);
const Wt=COLS*TS+(COLS-1)*GAP, Ht=rows*TS+(rows-1)*GAP;
const dest=`${ASSETS}/_build/feed-grid-preview.png`;
await sharp({create:{width:Wt,height:Ht,channels:3,background:'#e8e8e8'}}).composite(comps).png().toFile(dest);
console.log('grid done',tiles.length,'tiles ->',dest);
