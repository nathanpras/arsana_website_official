import { ASSETS, cream, gold, espresso, muted, T, wrap, ghostGrid, cornerTicks, divider, dots, iconFill, render } from './lib-v2.mjs';

const W=1080, H=1920, cx=540, px=90, m=54;

// vertical story frame with IG safe zones (header pushed down, footer raised)
function storyFrame(inner, eyebrowR){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${cream}"/>
    ${ghostGrid(W,H)}
    <rect x="${m}" y="${m}" width="${W-2*m}" height="${H-2*m}" fill="none" stroke="${gold}" stroke-width="1.2" opacity="0.5"/>
    ${cornerTicks(W,H,m)}
    ${T(px,246,'A R S A N A',{size:28,fill:gold,family:'Georgia',weight:'bold',anchor:'start',ls:6})}
    ${T(W-px,244,eyebrowR,{size:21,fill:muted,anchor:'end',ls:3})}
    <line x1="${px}" y1="272" x2="${W-px}" y2="272" stroke="${gold}" stroke-width="1.2" opacity="0.55"/>
    ${inner}
    <line x1="${px}" y1="${H-262}" x2="${W-px}" y2="${H-262}" stroke="${gold}" stroke-width="1.2" opacity="0.55"/>
    ${T(cx,H-218,'@arsana.idn',{size:22,fill:muted,ls:4})}
  </svg>`;
}
// centered wrapped text block
function block(y0,lines,lh,opt){ return lines.map((ln,k)=>T(cx,y0+k*lh,ln,opt)).join(''); }
const pad2 = n => String(n).padStart(2,'0');

// ---------- LAYANAN ----------
const layanan = [
  ['01-desain-interior','Desain Interior','svc-interior','Ruang yang nyaman dan enak dilihat — tata letak, material, dan cahaya diracik pas.'],
  ['02-desain-eksterior','Desain Eksterior','svc-eksterior','Tampak depan yang bikin rumahmu beda dari yang lain, dan tahan segala cuaca.'],
  ['03-konstruksi-renovasi','Konstruksi & Renovasi','svc-konstruksi','Bangun dari nol atau rombak total — bertahap, dengan kontrol kualitas tiap fase.'],
  ['04-instalasi-listrik','Instalasi Listrik','svc-listrik','Instalasi aman sesuai standar, lengkap dengan inspeksi dan garansi resmi.'],
  ['05-instalasi-ac','Instalasi AC','svc-ac','Pemasangan rapi dan hemat energi, untuk rumah maupun tempat usaha.'],
  ['06-furniture-custom','Furniture Custom','svc-furniture','Kitchen set sampai lemari — dibuat pas ukuran ruang, finishing premium.'],
];
function svcCard([file,title,ic,desc],i){
  const tl=wrap(title,16), dl=wrap(desc,34);
  const tY=820, dvY=tY+(tl.length-1)*84+70, dY=dvY+80;
  const inner=`
    ${T(cx,1120,pad2(i+1),{size:720,family:'Georgia',fill:gold,opacity:0.05,weight:'bold'})}
    ${iconFill(ic,cx,560,140,gold)}
    ${block(tY,tl,84,{size:76,family:'Georgia',fill:espresso})}
    ${divider(cx,dvY)}
    ${block(dY,dl,52,{size:36,fill:muted})}
    ${dots(cx,1560,6,i)}
  `;
  return { file, svg: storyFrame(inner, `LAYANAN ${pad2(i+1)} / 06`) };
}

// ---------- FAQ ----------
const faq = [
  ['Gimana cara mulai proyek bareng Arsana?','Chat kami di WhatsApp atau klik Konsultasi Gratis. Kami atur jadwal ngobrol buat paham kebutuhan, budget, dan gaya yang kamu mau — lalu siapkan desain dan rincian biaya dalam 3–5 hari kerja. Tanpa kewajiban apa pun.'],
  ['Survei lokasi bayar, nggak?','Nggak. Survei lokasi dan konsultasi awal 100% gratis. Tim kami datang, ukur, dan cek kondisi asli di lapangan — tanpa biaya, tanpa komitmen apa pun.'],
  ['Sistem bayarnya gimana?','Bertahap sesuai progres, bukan lunas di depan. Umumnya 3–4 termin: DP saat kontrak, cicil selama pengerjaan, dan pelunasan setelah serah terima. Semua tertulis di kontrak.'],
  ['Ada RAB dan kontrak tertulis?','Selalu. Sebelum kerja dimulai, kamu terima rincian biaya lengkap per item. Kontrak resmi diteken dua pihak: lingkup, jadwal, pembayaran, dan garansi. Semua jelas.'],
  ['Berapa lama pengerjaannya?','Tergantung skala. Renovasi ringan 2–4 minggu, renovasi total 2–4 bulan, bangun baru 4–8 bulan. Jadwal disepakati di awal, dan kami pegang komitmen itu.'],
  ['Gimana cara pantau progres?','Laporan rutin masuk ke WhatsApp-mu — foto dan update kondisi lapangan. Mau mampir ke lokasi kapan aja juga boleh. Buat kami, transparan itu wajib.'],
  ['Ada garansi setelah selesai?','Ada. Tiap pekerjaan dijamin garansi resmi di kontrak — perbaikan cacat material dan pengerjaan tanpa biaya tambahan, sampai 2 tahun tergantung lingkup.'],
  ['Area mana aja yang dilayani?','Basis kami Jabodetabek untuk proyek skala apa pun. Luar kota seperti Bali dan lainnya terbuka, terutama proyek besar — chat kami buat diskusi.'],
];
function faqCard([q,a],i){
  const ql=wrap(q,24), al=wrap(a,36);
  const qY=620, dvY=qY+(ql.length-1)*74+66, aY=dvY+74;
  const inner=`
    ${T(cx,1250,'?',{size:600,family:'Georgia',fill:gold,opacity:0.05,weight:'bold'})}
    ${T(cx,510,'?',{size:170,family:'Georgia',fill:gold,weight:'bold'})}
    ${T(cx,600,`PERTANYAAN ${pad2(i+1)}`,{size:22,fill:gold,ls:6})}
    ${block(qY+40,ql,74,{size:58,family:'Georgia',fill:espresso})}
    ${divider(cx,dvY+40)}
    ${block(aY+40,al,50,{size:34,fill:muted})}
    ${dots(cx,1560,8,i)}
  `;
  return { file: pad2(i+1), svg: storyFrame(inner, `FAQ · ${pad2(i+1)} / 08`) };
}

const jobs = [
  ['stories-layanan', layanan.map(svcCard)],
  ['stories-faq', faq.map(faqCard)],
];
for(const [folder,cards] of jobs){
  console.log(folder+':');
  for(const c of cards) await render(ASSETS+'/'+folder, c.file, c.svg);
}
console.log('DONE — 14 stories');
