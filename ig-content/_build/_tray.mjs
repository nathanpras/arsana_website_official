// simulate the Instagram profile highlights tray (circular crop + labels)
import { ASSETS, cream, espresso, muted, sharp, T } from './lib-v2.mjs';
const DIR = ASSETS + '/highlights';
const covers = [
  ['01-cara-kerja','Cara Kerja'],['02-layanan','Layanan'],['03-tentang','Tentang'],
  ['04-faq','FAQ'],['05-kontak','Kontak'],['06-inspirasi','Inspirasi'],
];
const D=200, gap=52, padX=60, padTop=60, labelH=54;
const W=padX*2 + covers.length*D + (covers.length-1)*gap;
const H=padTop + D + labelH + 30;

// circular alpha mask
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D/2}" cy="${D/2}" r="${D/2}" fill="#fff"/></svg>`);

const comps=[]; let labelsSvg='';
for(let i=0;i<covers.length;i++){
  const [file,label]=covers[i];
  const circle = await sharp(`${DIR}/${file}.png`)
    .extract({left:0,top:420,width:1080,height:1080})   // center square
    .resize(D,D)
    .composite([{input:mask,blend:'dest-in'}])
    .png().toBuffer();
  const left=padX+i*(D+gap), top=padTop;
  // subtle grey ring behind (IG story-ring placeholder)
  comps.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D+16}" height="${D+16}"><circle cx="${(D+16)/2}" cy="${(D+16)/2}" r="${D/2+6}" fill="none" stroke="#D9CDBB" stroke-width="2"/></svg>`),left:left-8,top:top-8});
  comps.push({input:circle,left,top});
  labelsSvg+=T(left+D/2, top+D+34, label, {size:22,fill:muted,family:'Arial',anchor:'middle'});
}
comps.push({input:Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labelsSvg}</svg>`),left:0,top:0});

await sharp({create:{width:W,height:H,channels:3,background:cream}}).composite(comps).png().toFile(`${DIR}/_tray-mockup.png`);
console.log('tray mockup ->', `${DIR}/_tray-mockup.png`);
