import { ASSETS, cream, gold, espresso, muted, favURI, T, wrap, plate, divider, nodeRow, dots, footerProgressLayout, iconFill, render } from './lib-v2.mjs';

const W=1080, H=1350, cx=W/2, px=90;
const DIR = ASSETS + '/carousel-layanan';
const N = 6;

const svc = [
  { file:'01-konstruksi-renovasi',ic:'svc-konstruksi',title:'Konstruksi & Renovasi',desc:'ARSANA melayani konstruksi dan renovasi untuk rumah maupun bangunan lainnya. Setiap proyek ini akan dikerjakan bertahap dengan kontrol kualitas di setiap fase.' },
  { file:'02-desain-eksterior',  ic:'svc-eksterior',  title:'Desain Eksterior',     desc:'ARSANA merancang eksterior yang mempertegas karakter bangunanmu. Material dan fasad dipilih agar tetap kokoh dan indah meski terus terpapar cuaca tropis.' },
  { file:'03-desain-interior',   ic:'svc-interior',   title:'Desain Interior',      desc:'ARSANA melayani desain interior untuk hunian maupun ruang usaha. Tata letak, pemilihan material, hingga pencahayaan disusun agar ruang terasa nyaman digunakan sehari-hari.' },
  { file:'04-furniture-custom',  ic:'svc-furniture',  title:'Furniture Custom',     desc:'ARSANA juga menyediakan furniture custom, mulai dari kitchen set hingga lemari. Setiap unit dibuat presisi sesuai ukuran ruang dengan finishing premium.' },
  { file:'05-instalasi-listrik', ic:'svc-listrik',    title:'Instalasi Listrik',    desc:'Untuk kebutuhan kelistrikan, ARSANA juga melayani instalasi listrik sesuai standar keamanan. Seluruh pekerjaan melalui inspeksi dan disertai garansi resmi.' },
  { file:'06-instalasi-ac',      ic:'svc-ac',         title:'Instalasi AC',         desc:'ARSANA juga menangani instalasi AC untuk rumah maupun tempat usaha. Pemasangan dilakukan sesuai prosedur teknis agar unit bekerja optimal dan bebas kebocoran.' },
];

// one fixed dot-row position for every card in this carousel — sized to clear the
// longest title ("Konstruksi & Renovasi"), so it's identical on every slide and
// still guaranteed collision-free for the shorter ones.
const FOOTER = footerProgressLayout(W,px,cx, svc.map(s=>s.title.toUpperCase()));

function cover(){
  const inner=`
    <image href="${favURI}" x="${cx-90}" y="250" width="180" height="180"/>
    ${T(cx,540,'SATU TIM, SEMUA BERES',{size:24,fill:gold,ls:8})}
    ${T(cx,680,'Layanan',{size:150,family:'Georgia',fill:espresso})}
    ${divider(cx,755)}
    ${T(cx,835,'Desain, bangun, sampai instalasi —',{size:34,fill:muted})}
    ${T(cx,879,'satu tim, tanpa lempar ke pihak lain.',{size:34,fill:muted})}
    ${nodeRow(cx,1010,6,-2,420)}
    ${T(cx,1120,'GESER  →',{size:26,fill:gold,ls:6})}
  `;
  return plate(W,H,inner,{index:'LY · 00 / 08',eyebrowR:'LAYANAN ARSANA'});
}
function card(s,i){
  const num=String(i+1).padStart(2,'0');
  const lines=wrap(s.desc,40);
  let body=''; lines.forEach((ln,k)=> body+=T(px,750+k*52,ln,{size:36,fill:muted,anchor:'start'}));
  const tl=wrap(s.title,15);
  let title=''; tl.forEach((ln,k)=> title+=T(px,610+k*82,ln,{size:82,family:'Georgia',fill:espresso,anchor:'start'}));
  const ruleY=610+(tl.length-1)*82+50;
  const bodyY0=ruleY+90; let body2=''; lines.forEach((ln,k)=> body2+=T(px,bodyY0+k*52,ln,{size:36,fill:muted,anchor:'start'}));
  const inner=`
    ${T(W-110,1200,num,{size:560,family:'Georgia',fill:gold,anchor:'end',opacity:0.045,weight:'bold'})}
    ${iconFill(s.ic, W-215, 400, 118, gold)}
    ${T(px,320,'LAYANAN',{size:24,fill:gold,ls:8,anchor:'start'})}
    ${T(px,490,num,{size:200,family:'Georgia',fill:gold,anchor:'start',weight:'bold'})}
    ${title}
    <line x1="${px}" y1="${ruleY}" x2="${px+110}" y2="${ruleY}" stroke="${gold}" stroke-width="3"/>
    ${body2}
    ${nodeRow(FOOTER.center, H-110, N, i, FOOTER.span)}
  `;
  return plate(W,H,inner,{index:`LY · ${num} / 08`,eyebrowR:s.title.toUpperCase()});
}
function cta(){
  const inner=`
    <image href="${favURI}" x="${cx-80}" y="270" width="160" height="160"/>
    ${T(cx,540,'SATU PINTU, TUNTAS',{size:24,fill:gold,ls:6})}
    ${T(cx,680,'Ngobrol, Yuk.',{size:132,family:'Georgia',fill:espresso})}
    ${divider(cx,755)}
    ${T(cx,835,'Cerita kebutuhan proyekmu ke kami —',{size:34,fill:muted})}
    ${T(cx,879,'konsultasi & estimasi awal gratis.',{size:34,fill:muted})}
    <rect x="${cx-160}" y="980" width="320" height="70" rx="35" fill="none" stroke="${gold}" stroke-width="2"/>
    ${T(cx,1025,'DM  @arsana.idn',{size:28,fill:gold,ls:3})}
    ${nodeRow(cx,1130,6,-1,420)}
  `;
  return plate(W,H,inner,{index:'LY · 08 / 08',eyebrowR:'HUBUNGI KAMI'});
}

console.log('Carousel Layanan (V2):');
await render(DIR,'00-cover',cover());
for(let i=0;i<svc.length;i++) await render(DIR,svc[i].file,card(svc[i],i));
await render(DIR,'07-cta',cta());
console.log('DONE — 8 slides');
