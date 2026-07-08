import { readdirSync } from 'fs';
import { ASSETS, sharp } from './lib-v2.mjs';

const A = ASSETS;
const OUT = `${ASSETS}/_build`;
const cats=['stories-layanan','stories-faq','stories-testimoni','stories-estimasi-garansi'];

for(const cat of cats){
  const files=readdirSync(`${A}/${cat}`).filter(f=>f.endsWith('.png')).sort();
  const tw=540, th=960, cols=2; const rows=Math.ceil(files.length/cols);
  const comps=[]; let i=0;
  for(const f of files){ const buf=await sharp(`${A}/${cat}/${f}`).resize(tw,th).toBuffer();
    comps.push({input:buf,left:(i%cols)*tw,top:Math.floor(i/cols)*th}); i++; }
  await sharp({create:{width:cols*tw,height:rows*th,channels:3,background:'#cccccc'}}).composite(comps).png().toFile(`${OUT}/m-${cat}.png`);
  console.log('sheet',cat,files.length);
}
