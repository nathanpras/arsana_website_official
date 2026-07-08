import { ASSETS, cream, gold, espresso, muted, favURI, T, wrap, plate, divider, nodeRow, dots, footerProgressLayout, icon, render } from './lib-v2.mjs';

const W=1080, H=1350, cx=W/2, px=90;
const DIR = ASSETS + '/carousel-cara-kerja';
const N = 7;

const steps = [
  { file:'01-konsultasi',     ic:'speech',  title:'Konsultasi',      desc:'Cek kebutuhan, lokasi, tipe proyek, dan prioritas Anda. Konsultasi ini gratis dan bisa dilakukan via WhatsApp atau tatap muka.' },
  { file:'02-survey-lokasi',  ic:'survey',  title:'Survey Lokasi',   desc:'Tim kami turun langsung ke lokasi untuk mengukur dan mencatat detail teknis sebelum masuk tahap desain.' },
  { file:'03-rab-desain',     ic:'doc',     title:'RAB & Desain',    desc:'Estimasi biaya rinci, lingkup pekerjaan, spesifikasi material, dan timeline disusun secara tertulis.' },
  { file:'04-kesepakatan',    ic:'pen',     title:'Kesepakatan',     desc:'Kontrak kerja ditandatangani kedua pihak. Jadwal, termin pembayaran, dan garansi semua tercantum.' },
  { file:'05-pengerjaan',     ic:'hardhat', title:'Pengerjaan',      desc:'Eksekusi bertahap sesuai jadwal yang disepakati dengan quality control dan dokumentasi di setiap fase.' },
  { file:'06-laporan-progres',ic:'bars',    title:'Laporan Progres', desc:'Progres pekerjaan kami dokumentasikan lewat foto dan video, dan dikirim rutin kepada Anda.' },
  { file:'07-serah-terima',   ic:'key',     title:'Serah Terima',    desc:'Pengecekan hasil bersama, catatan perbaikan jika ada, dan garansi resmi sesuai kesepakatan kontrak.' },
];

// one fixed dot-row position for every step in this carousel — sized to clear the
// longest title, identical on every slide, still collision-free for shorter ones.
const FOOTER = footerProgressLayout(W,px,cx, steps.map(s=>s.title.toUpperCase()));

// ---- COVER ----
function cover(){
  const inner=`
    <image href="${favURI}" x="${cx-90}" y="250" width="180" height="180"/>
    ${T(cx,540,'TUJUH LANGKAH JELAS',{size:24,fill:gold,ls:8})}
    ${T(cx,680,'Cara Kerja',{size:150,family:'Georgia',fill:espresso})}
    ${divider(cx,755)}
    ${T(cx,835,'Dari obrolan pertama sampai kamu',{size:34,fill:muted})}
    ${T(cx,879,'pegang kunci, dikawal tiap tahap.',{size:34,fill:muted})}
    ${nodeRow(cx,1010,7,-2,440)}
    ${T(cx,1120,'GESER  →',{size:26,fill:gold,ls:6})}
  `;
  return plate(W,H,inner,{index:'PL · 00 / 08',eyebrowR:'PANDUAN PROSES'});
}

// ---- STEP ----
function step(s,i){
  const num=String(i+1).padStart(2,'0');
  const lines=wrap(s.desc,40);
  let body=''; lines.forEach((ln,k)=> body+=T(px,750+k*52,ln,{size:36,fill:muted,anchor:'start'}));
  const inner=`
    ${T(W-110,1200,num,{size:560,family:'Georgia',fill:gold,anchor:'end',opacity:0.045,weight:'bold'})}
    ${icon(s.ic, W-215, 400, 130)}
    ${T(px,320,'TAHAP',{size:24,fill:gold,ls:8,anchor:'start'})}
    ${T(px,490,num,{size:200,family:'Georgia',fill:gold,anchor:'start',weight:'bold'})}
    ${T(px,610,s.title,{size:92,family:'Georgia',fill:espresso,anchor:'start'})}
    <line x1="${px}" y1="660" x2="${px+110}" y2="660" stroke="${gold}" stroke-width="3"/>
    ${body}
    ${nodeRow(FOOTER.center, H-110, N, i, FOOTER.span)}
  `;
  return plate(W,H,inner,{index:`PL · ${num} / 08`,eyebrowR:s.title.toUpperCase()});
}

// ---- CTA ----
function cta(){
  const inner=`
    <image href="${favURI}" x="${cx-80}" y="270" width="160" height="160"/>
    ${T(cx,540,'GILIRAN KAMU',{size:24,fill:gold,ls:8})}
    ${T(cx,680,'Mulai, Yuk.',{size:150,family:'Georgia',fill:espresso})}
    ${divider(cx,755)}
    ${T(cx,835,'Konsultasi awal gratis, cukup DM.',{size:34,fill:muted})}
    ${T(cx,879,'Cerita rencana rumahmu ke kami.',{size:34,fill:muted})}
    <rect x="${cx-160}" y="980" width="320" height="70" rx="35" fill="none" stroke="${gold}" stroke-width="2"/>
    ${T(cx,1025,'DM  @arsana.idn',{size:28,fill:gold,ls:3})}
    ${nodeRow(cx,1130,7,-1,440)}
  `;
  return plate(W,H,inner,{index:'PL · 08 / 08',eyebrowR:'HUBUNGI KAMI'});
}

console.log('Carousel Cara Kerja (V2):');
await render(DIR,'00-cover',cover());
for(let i=0;i<steps.length;i++) await render(DIR,steps[i].file,step(steps[i],i));
await render(DIR,'08-cta',cta());
console.log('DONE — 9 slides');
