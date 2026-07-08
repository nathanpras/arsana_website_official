import { REPO, ASSETS, sharp, cream, gold, espresso, muted, T, wrap, esc } from './lib-v2.mjs';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const W=1080, H=1350, px=72, m=42;
const DIR = ASSETS + '/portfolio';
mkdirSync(DIR,{recursive:true});

const projects = [
  ['01','Rumah Tinggal PIK Gold Coast','Bangun Baru','PIK, Jakarta Utara','12 bulan','2023','/projects/Arsana%20Foto%20Recreate/GoldCoast/This_image_is_already_correct_202606212117.jpeg'],
  ['02','Rumah Tinggal Bangka Mampang','Bangun Baru','Mampang, Jakarta Selatan','10 bulan','2024','/projects/Arsana%20Foto%20Recreate/Bangka%20Mampang/Recreate_this_photograph_at_professional_202606212111.jpeg'],
  ['03','Rumah Tinggal Nava Park','Bangun Baru','BSD, Tangerang','7 bulan','2022','/projects/Arsana%20Foto%20Recreate/NavaPark%20BSD/This_image_is_already_correct_202606212123.jpeg'],
  ['04','Rumah Tinggal Puri Metland','Bangun Baru','Tangerang','8 bulan','2023','/projects/Arsana%20Foto%20Recreate/Puri%20Metland/Recreate_this_photograph_at_professional_202606221033.jpeg'],
  ['05','Rumah Tinggal Citra2','Bangun Baru','Citra 2, Jakarta Barat','7 bulan','2023','/projects/Arsana%20Foto%20Recreate/Citra%202%20Ext/Correct_the_perspective_and_viewing_202606212147.jpeg'],
  ['06','Rumah Tinggal Chiara7','Bangun Baru','Cikupa, Tangerang','9 bulan','2023','/projects/Arsana%20Foto%20Recreate/Cikupa%20Chiara7/Recreate_this_photograph_at_professional_202606212133.jpeg'],
  ['07','Rumah Tinggal Bintaro','Bangun Baru','Bintaro, Tangerang','6 bulan','2020','/projects/Arsana%20Foto%20Recreate/Bintaro/Recreate_this_photograph_at_professional_202606221026.jpeg'],
  ['08','Rumah Tinggal Suvarna Sutra Andara','Bangun Baru','Cikupa, Tangerang','9 bulan','2018','/projects/Arsana%20Foto%20Recreate/Suvarna%20Sutra%20Andara/01_Suvarna-Sutra-Andara_fasad-malam_2018.jpeg_202606212116.jpeg'],
  ['09','Rumah Tinggal Suvarna Sutra Flavio','Bangun Baru','Cikupa, Tangerang','9 bulan','2023','/projects/Arsana%20Foto%20Recreate/Suvarna%20Sutra%20Flavio/Recreate_this_photograph_at_professional_202606221024.jpeg'],
  ['10','Rumah Tinggal Taman Kencana','Bangun Baru','Tangerang','8 bulan','2022','/projects/Arsana%20Foto%20Recreate/Taman%20Kencana/Recreate_this_photograph_at_professional_202606221030.jpeg'],
  ['11','Renovasi Cafe Coffee Grounds','Renovasi Komersial','Sunter, Jakarta Utara','3 bulan','2018','/projects/Arsana%20Foto%20Recreate/Coffee%20Ground%20Cafe/Recreate_this_photograph_at_professional_202606212155.jpeg'],
  ['12','Showroom Marmer Cipondoh','Renovasi Komersial','Cipondoh, Tangerang','2 bulan','2023','/projects/Arsana%20Foto%20Recreate/Cipondoh%20Showroom%20Marmer/Recreate_this_photograph_at_professional_202606221029.jpeg'],
  ['13','Bozz Billiard Citra 8','Renovasi Komersial','Citra Garden, Jakarta Barat','4 bulan','2024','/projects/Arsana%20Foto%20Recreate/Bozz%20Billiard%20Citra%208/Recreate_this_photograph_at_professional_202606212158.jpeg'],
];

const slug = t => t.toLowerCase().replace(/&/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const CW = '#F7F1E8'; // cream-white for text on photo

function cornerTicksLight(){
  const t=20;
  const c=(cx,cy,sx,sy)=>`<line x1="${cx}" y1="${cy}" x2="${cx+sx*t}" y2="${cy}" stroke="${gold}" stroke-width="2.2"/><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy+sy*t}" stroke="${gold}" stroke-width="2.2"/>`;
  return c(m,m,1,1)+c(W-m,m,-1,1)+c(m,H-m,1,-1)+c(W-m,H-m,-1,-1);
}

function overlay([num,title,cat,loc,dur,year]){
  const tl=wrap(title,24);
  const titleBase = 1198;                         // bottom baseline of last title line
  const t0 = titleBase-(tl.length-1)*66;          // first title line y
  const eyebrowY = t0-70;
  let titleTxt=''; tl.forEach((ln,k)=> titleTxt+=T(px,t0+k*66,ln,{size:56,family:'Georgia',fill:CW,anchor:'start'}));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bot" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#100a06" stop-opacity="0.9"/>
        <stop offset="0.45" stop-color="#100a06" stop-opacity="0.35"/>
        <stop offset="0.72" stop-color="#100a06" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#100a06" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#100a06" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bot)"/>
    <rect width="${W}" height="260" fill="url(#top)"/>
    <rect x="${m}" y="${m}" width="${W-2*m}" height="${H-2*m}" fill="none" stroke="${gold}" stroke-width="1.4" opacity="0.6"/>
    ${cornerTicksLight()}
    ${T(px,96,'A R S A N A',{size:28,fill:gold,family:'Georgia',weight:'bold',anchor:'start',ls:5})}
    ${T(W-px,94,'ARSANA.ID',{size:20,fill:CW,anchor:'end',ls:3,opacity:0.8})}
    ${T(W-px,1150,num,{size:300,family:'Georgia',fill:'#ffffff',anchor:'end',opacity:0.08,weight:'bold'})}
    ${T(px,eyebrowY,cat.toUpperCase(),{size:22,fill:gold,anchor:'start',ls:5})}
    ${titleTxt}
    ${T(px,titleBase+52,`${loc}   ·   ${dur}   ·   ${year}`,{size:26,fill:CW,anchor:'start',opacity:0.75,ls:1})}
  </svg>`;
}

console.log('Portfolio (V2) — 13 posts:');
for(const p of projects){
  const imgPath = REPO + '/public' + decodeURIComponent(p[6]);
  const out = `${DIR}/${p[0]}-${slug(p[1])}.jpg`;
  if(!existsSync(imgPath)){ console.log('  ✗ MISSING', p[0], imgPath); continue; }
  const base = await sharp(imgPath).resize(W,H,{fit:'cover',position:'attention'}).toBuffer();
  await sharp(base).composite([{input:Buffer.from(overlay(p))}]).jpeg({quality:90}).toFile(out);
  console.log('  ✓', p[0], slug(p[1]));
}
console.log('DONE');
