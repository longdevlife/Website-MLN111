/**
 * Generate all book page textures as ultra-minimalist line-art style
 * Run: node generate-textures.mjs
 */
import { createCanvas } from 'canvas';
import fs from 'fs';

const W = 1024;
const H = 1365;

const C = {
  bg: '#FAFAF8', text: '#1A1A1A', accent: '#C5272D',
  olive: '#4A6741', gray: '#8B8680', light: '#d4ccc4',
};

function save(name, drawFn) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  drawFn(ctx);
  fs.writeFileSync(`public/textures/${name}.jpg`, canvas.toBuffer('image/jpeg', { quality: 0.92 }));
  console.log(`✅ ${name}.jpg`);
}

function line(ctx, x1, y1, x2, y2, c = C.text, w = 2) {
  ctx.strokeStyle = c; ctx.lineWidth = w;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}

function factory(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
  ctx.strokeRect(-80, -60, 160, 80);
  ctx.strokeRect(-60, -100, 25, 40);
  ctx.strokeRect(20, -90, 20, 30);
  ctx.beginPath(); ctx.arc(-48, -115, 8, 0, Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(-40, -130, 12, 0, Math.PI*2); ctx.stroke();
  for (let i = 0; i < 3; i++) ctx.strokeRect(-55+i*45, -35, 25, 30);
  ctx.strokeRect(-12, -5, 24, 25);
  ctx.restore();
}

function person(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(0, -45, 12, 0, Math.PI*2); ctx.stroke();
  line(ctx, 0, -33, 0, 0, C.text, 2.5);
  line(ctx, 0, -20, -20, -5, C.text, 2.5);
  line(ctx, 0, -20, 20, -5, C.text, 2.5);
  line(ctx, 0, 0, -15, 25, C.text, 2.5);
  line(ctx, 0, 0, 15, 25, C.text, 2.5);
  ctx.restore();
}

function university(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
  ctx.strokeRect(-70, -30, 140, 60);
  for (let i = 0; i < 4; i++) line(ctx, -50+i*33, -30, -50+i*33, 30, C.text, 3);
  ctx.beginPath(); ctx.moveTo(-80, -30); ctx.lineTo(0, -65); ctx.lineTo(80, -30); ctx.closePath(); ctx.stroke();
  ctx.strokeRect(-60, 30, 120, 10);
  ctx.restore();
}

function building(ctx, x, y, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
  ctx.strokeRect(-35, -100, 70, 130);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) ctx.strokeRect(-25+c*20, -90+r*25, 12, 15);
  ctx.strokeRect(-10, 10, 20, 20);
  ctx.restore();
}

function chart(ctx, x, y, w, h, data, color = C.accent) {
  line(ctx, x, y, x, y+h, C.text, 2);
  line(ctx, x, y+h, x+w, y+h, C.text, 2);
  const bw = w / (data.length * 2);
  data.forEach((v, i) => {
    const bh = (v/100)*h, bx = x+bw+i*(bw*1.5);
    ctx.fillStyle = i === 0 ? color : C.light;
    ctx.fillRect(bx, y+h-bh, bw*0.8, bh);
    ctx.strokeStyle = C.text; ctx.lineWidth = 1;
    ctx.strokeRect(bx, y+h-bh, bw*0.8, bh);
  });
}

// ==================== PAGES ====================

// COVER
save('book-cover', (ctx) => {
  ctx.strokeStyle = C.text; ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, W-100, H-100);
  ctx.strokeRect(60, 60, W-120, H-120);
  line(ctx, 100, 250, W-100, 250, C.accent, 4);

  ctx.fillStyle = C.text; ctx.font = 'bold 52px Times New Roman'; ctx.textAlign = 'center';
  ctx.fillText('TỒN TẠI XÃ HỘI', W/2, 370);
  ctx.fillText('&', W/2, 440);
  ctx.fillText('Ý THỨC XÃ HỘI', W/2, 510);

  line(ctx, 200, 555, W-200, 555, C.accent, 3);

  ctx.font = 'italic 24px Times New Roman'; ctx.fillStyle = C.gray;
  ctx.fillText('"Không phải ý thức quyết định đời sống', W/2, 630);
  ctx.fillText('mà chính đời sống quyết định ý thức"', W/2, 670);

  ctx.font = 'bold 28px Times New Roman'; ctx.fillStyle = C.accent;
  ctx.fillText('— KARL MARX —', W/2, 750);

  ctx.font = '18px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('CHƯƠNG III • TRIẾT HỌC MÁC-LÊNIN', W/2, 840);

  factory(ctx, W/2-120, 1020, 1.2);
  person(ctx, W/2+20, 1040, 1);
  university(ctx, W/2+160, 1020, 0.6);

  ctx.font = '14px Arial'; ctx.fillStyle = C.light;
  ctx.fillText('Interactive Pop-up Book • 2025', W/2, H-80);
});

// PAGE 1 INTRO
save('page1-intro', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'right';
  ctx.fillText('01', W-60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('GIỚI THIỆU', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.accent, 2);

  ctx.font = 'bold 36px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Mối quan hệ giữa', W/2, 210);
  ctx.fillText('Tồn tại Xã hội', W/2, 265);
  ctx.fillText('và Ý thức Xã hội', W/2, 320);

  ctx.strokeStyle = C.light; ctx.lineWidth = 1;
  ctx.strokeRect(80, 380, W-160, 350);

  ctx.textAlign = 'left'; ctx.font = '22px Arial'; ctx.fillStyle = C.text;
  const lines = [
    'Karl Marx (1818-1883) đã đặt ra',
    'một trong những luận điểm quan trọng',
    'nhất của chủ nghĩa duy vật lịch sử:',
    '',
    '"It is not the consciousness of men',
    'that determines their existence, but',
    'their social existence that determines',
    'their consciousness."',
    '',
    '— Lời tựa Góp phần phê phán',
    '   Kinh tế chính trị học, 1859',
  ];
  lines.forEach((l, i) => {
    ctx.font = (i >= 4 && i <= 7) ? 'italic 22px Times New Roman' : '22px Arial';
    ctx.fillStyle = (i >= 4 && i <= 7) ? C.accent : C.text;
    ctx.fillText(l, 110, 430 + i * 30);
  });

  person(ctx, W/2-100, 920, 1.5);
  person(ctx, W/2, 920, 1.5);
  person(ctx, W/2+100, 920, 1.5);

  ctx.font = 'italic 18px Times New Roman'; ctx.fillStyle = C.gray; ctx.textAlign = 'center';
  ctx.fillText('Lật trang để khám phá →', W/2, 1100);
});

// PAGE 2 THEORY 1
save('page2-theory1', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'left';
  ctx.fillText('02', 60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('LÝ THUYẾT', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.accent, 2);

  ctx.font = 'bold 34px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Tồn tại Xã hội là gì?', W/2, 200);

  // Definition box
  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 260, W-160, 220);
  line(ctx, 80, 260, 80, 480, C.accent, 3);
  ctx.textAlign = 'left'; ctx.font = '22px Arial'; ctx.fillStyle = C.text;
  ['Tồn tại xã hội là toàn bộ sinh hoạt',
   'vật chất và các điều kiện sinh hoạt',
   'vật chất của xã hội, bao gồm:',
   '',
   '• Phương thức sản xuất vật chất',
   '• Điều kiện tự nhiên — môi trường',
   '• Dân số và mật độ dân số'
  ].forEach((l, i) => {
    ctx.font = i >= 4 ? 'bold 22px Arial' : '22px Arial';
    ctx.fillText(l, 110, 310 + i * 30);
  });

  // 3 pillars
  [['Phương thức', 'sản xuất'], ['Điều kiện', 'tự nhiên'], ['Dân số']].forEach((p, i) => {
    const px = 180 + i * 260;
    ctx.strokeStyle = C.text; ctx.lineWidth = 2;
    ctx.strokeRect(px-80, 540, 160, 150);
    ctx.font = 'bold 16px Arial'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
    p.forEach((l, li) => ctx.fillText(l, px, 640 + li * 22));
  });

  factory(ctx, 180, 590, 0.6);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(440, 590, 18, 0, Math.PI*2); ctx.stroke();
  line(ctx, 440, 608, 440, 640, C.text, 2.5);
  person(ctx, 690, 600, 0.55);
  person(ctx, 720, 600, 0.55);

  ctx.font = 'italic 16px Times New Roman'; ctx.fillStyle = C.gray; ctx.textAlign = 'center';
  ctx.fillText('Marx nhấn mạnh: phương thức sản xuất', W/2, 760);
  ctx.fillText('là yếu tố quyết định nhất.', W/2, 785);
});

// PAGE 3 THEORY 2
save('page3-theory2', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'right';
  ctx.fillText('03', W-60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('LÝ THUYẾT', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.accent, 2);

  ctx.font = 'bold 34px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Ý thức Xã hội là gì?', W/2, 200);

  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 260, W-160, 150);
  line(ctx, 80, 260, 80, 410, C.accent, 3);
  ctx.textAlign = 'left'; ctx.font = '22px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Ý thức xã hội là mặt tinh thần của', 110, 305);
  ctx.fillText('đời sống xã hội, phản ánh tồn tại', 110, 335);
  ctx.fillText('xã hội trong các giai đoạn phát triển.', 110, 365);

  // Diagram: TTXH -> YTXH
  ctx.fillStyle = '#f0ece6'; ctx.fillRect(100, 470, 300, 70);
  ctx.strokeStyle = C.text; ctx.lineWidth = 2; ctx.strokeRect(100, 470, 300, 70);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
  ctx.fillText('TỒN TẠI XÃ HỘI', 250, 512);

  // Arrow
  ctx.strokeStyle = C.accent; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(400, 505); ctx.lineTo(580, 505);
  ctx.lineTo(565, 492); ctx.moveTo(580, 505); ctx.lineTo(565, 518); ctx.stroke();
  ctx.font = 'bold 14px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('Quyết định', 490, 490);

  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(580, 470, 300, 70);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.strokeRect(580, 470, 300, 70);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('Ý THỨC XÃ HỘI', 730, 512);

  // Reverse arrow
  ctx.strokeStyle = C.olive; ctx.lineWidth = 1.5; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.moveTo(580, 555); ctx.lineTo(400, 555);
  ctx.lineTo(415, 545); ctx.moveTo(400, 555); ctx.lineTo(415, 565); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '14px Arial'; ctx.fillStyle = C.olive;
  ctx.fillText('Tác động ngược', 490, 580);

  // Key insight
  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(80, 640, W-160, 180);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 1; ctx.strokeRect(80, 640, W-160, 180);
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent; ctx.textAlign = 'center';
  ctx.fillText('💡 LUẬN ĐIỂM CỐT LÕI', W/2, 680);
  ctx.font = 'italic 20px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Tồn tại xã hội QUYẾT ĐỊNH ý thức xã hội,', W/2, 725);
  ctx.fillText('nhưng ý thức xã hội có tính', W/2, 755);
  ctx.fillText('ĐỘC LẬP TƯƠNG ĐỐI và TÁC ĐỘNG NGƯỢC.', W/2, 785);

  ctx.font = '14px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('→ Lật trang để xem các tình huống thực tế', W/2, 890);
});

// PAGE 4 SCENARIO 1
save('page4-scenario1', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'left';
  ctx.fillText('04', 60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('TÌNH HUỐNG 1', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.accent, 2);

  ctx.font = 'bold 38px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Người Công nhân', W/2, 205);
  ctx.font = '22px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('KCN Bình Dương, Việt Nam — 2025', W/2, 250);

  factory(ctx, W/2, 380, 2);
  person(ctx, W/2-160, 440, 1.2);
  person(ctx, W/2+160, 440, 1.2);

  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 510, W-160, 250);
  line(ctx, 80, 510, 80, 760, C.accent, 3);
  ctx.textAlign = 'left'; ctx.font = '21px Arial'; ctx.fillStyle = C.text;
  ['Anh Minh, 32 tuổi, công nhân may mặc.',
   'Lương cơ bản: 6 triệu/tháng. Vợ bán',
   'hàng online, thu nhập bấp bênh.',
   'Hai con nhỏ đang tuổi đi học.',
   '',
   'Nhà máy thông báo: tăng ca thêm 4h/ngày',
   'sẽ được thêm 3 triệu/tháng.',
   '',
   'Anh Minh phải đưa ra lựa chọn...'
  ].forEach((l, i) => {
    ctx.font = i === 8 ? 'bold italic 21px Times New Roman' : '21px Arial';
    ctx.fillStyle = i === 8 ? C.accent : C.text;
    ctx.fillText(l, 110, 555 + i * 27);
  });

  // Choice A
  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(80, 810, 400, 100);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.strokeRect(80, 810, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.accent; ctx.textAlign = 'center';
  ctx.fillText('A', 280, 855);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Tăng ca thêm 4 tiếng / ngày', 280, 890);

  // Choice B
  ctx.fillStyle = '#f0f5ee'; ctx.fillRect(520, 810, 400, 100);
  ctx.strokeStyle = C.olive; ctx.lineWidth = 2; ctx.strokeRect(520, 810, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.olive;
  ctx.fillText('B', 720, 855);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Về nhà nghỉ ngơi bên gia đình', 720, 890);

  ctx.font = 'bold italic 20px Times New Roman'; ctx.fillStyle = C.accent;
  ctx.fillText('Bạn nghĩ anh Minh sẽ chọn gì?', W/2, 980);
  ctx.font = '16px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('Lật trang để xem kết quả thực tế →', W/2, 1020);
});

// PAGE 5 RESULT 1
save('page5-result1', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'right';
  ctx.fillText('05', W-60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('KẾT QUẢ TÌNH HUỐNG 1', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.accent, 2);

  ctx.font = 'bold 120px Times New Roman'; ctx.fillStyle = C.accent;
  ctx.fillText('78%', W/2, 290);
  ctx.font = '24px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('công nhân Việt Nam chọn TĂNG CA', W/2, 340);
  ctx.font = 'italic 16px Times New Roman'; ctx.fillStyle = C.gray;
  ctx.fillText('Nguồn: Khảo sát Viện Công nhân & Công đoàn, 2024', W/2, 380);

  chart(ctx, 150, 420, 700, 180, [78, 15, 7]);
  ctx.font = '14px Arial'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
  ctx.fillText('Tăng ca', 255, 625); ctx.fillText('Giữ nguyên', 420, 625); ctx.fillText('Nghỉ việc', 570, 625);

  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(80, 660, W-160, 240);
  line(ctx, 80, 660, 80, 900, C.accent, 3);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = C.accent; ctx.textAlign = 'left';
  ctx.fillText('📌 PHÂN TÍCH THEO MARX:', 110, 700);
  ctx.font = '19px Arial'; ctx.fillStyle = C.text;
  ['Tồn tại vật chất (lương thấp, gia đình cần',
   'chi tiêu) QUYẾT ĐỊNH ý thức (phải làm thêm',
   'giờ dù biết ảnh hưởng sức khỏe).',
   '',
   'Đây là minh chứng rõ ràng: điều kiện',
   'kinh tế — xã hội chi phối mọi quyết định',
   'của con người.'
  ].forEach((l, i) => {
    ctx.font = i === 4 ? 'bold 19px Arial' : '19px Arial';
    ctx.fillText(l, 110, 740 + i * 27);
  });

  ctx.font = 'bold italic 18px Times New Roman'; ctx.fillStyle = C.accent; ctx.textAlign = 'center';
  ctx.fillText('Tồn tại XH → Quyết định → Ý thức XH', W/2, 960);
});

// PAGE 6 SCENARIO 2
save('page6-scenario2', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'left';
  ctx.fillText('06', 60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.olive;
  ctx.fillText('TÌNH HUỐNG 2', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.olive, 2);

  ctx.font = 'bold 38px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Sinh viên Đại học', W/2, 205);
  ctx.font = '22px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('TP. Hồ Chí Minh — 2025', W/2, 250);

  university(ctx, W/2, 380, 1.8);
  person(ctx, W/2-100, 440, 0.9);
  person(ctx, W/2+100, 440, 0.9);

  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 490, W-160, 240);
  line(ctx, 80, 490, 80, 730, C.olive, 3);
  ctx.textAlign = 'left'; ctx.font = '21px Arial'; ctx.fillStyle = C.text;
  ['Lan, SV năm 2, ngành CNTT. Gia đình ở',
   'Quảng Ngãi, bố mẹ làm nông. Tiền gửi',
   'hàng tháng: 3 triệu, chi phí sống tại',
   'TPHCM: 5-6 triệu/tháng.',
   '',
   'Lan đứng trước lựa chọn quan trọng',
   'cho tương lai...'
  ].forEach((l, i) => {
    ctx.font = i === 6 ? 'bold italic 21px Times New Roman' : '21px Arial';
    ctx.fillStyle = i === 6 ? C.olive : C.text;
    ctx.fillText(l, 110, 535 + i * 27);
  });

  ctx.fillStyle = '#f0f5ee'; ctx.fillRect(80, 790, 400, 100);
  ctx.strokeStyle = C.olive; ctx.lineWidth = 2; ctx.strokeRect(80, 790, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.olive; ctx.textAlign = 'center';
  ctx.fillText('A', 280, 835);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Học full-time, tập trung GPA', 280, 870);

  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(520, 790, 400, 100);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.strokeRect(520, 790, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('B', 720, 835);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Đi làm part-time để trang trải', 720, 870);

  ctx.font = 'bold italic 20px Times New Roman'; ctx.fillStyle = C.olive; ctx.textAlign = 'center';
  ctx.fillText('Hoàn cảnh nào quyết định lựa chọn?', W/2, 960);
});

// PAGE 7 RESULT 2
save('page7-result2', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'right';
  ctx.fillText('07', W-60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.olive;
  ctx.fillText('KẾT QUẢ TÌNH HUỐNG 2', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.olive, 2);

  ctx.font = 'bold 120px Times New Roman'; ctx.fillStyle = C.olive;
  ctx.fillText('65%', W/2, 290);
  ctx.font = '24px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('sinh viên VN phải ĐI LÀM THÊM', W/2, 340);
  ctx.font = 'italic 16px Times New Roman'; ctx.fillStyle = C.gray;
  ctx.fillText('Nguồn: Bộ GD&ĐT, Khảo sát sinh viên 2024', W/2, 380);

  chart(ctx, 150, 420, 700, 180, [65, 25, 10], C.olive);
  ctx.font = '14px Arial'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
  ctx.fillText('Làm thêm', 255, 625); ctx.fillText('Học thuần', 420, 625); ctx.fillText('Bỏ học', 570, 625);

  ctx.fillStyle = '#f0f5ee'; ctx.fillRect(80, 660, W-160, 240);
  line(ctx, 80, 660, 80, 900, C.olive, 3);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = C.olive; ctx.textAlign = 'left';
  ctx.fillText('📌 PHÂN TÍCH THEO MARX:', 110, 700);
  ctx.font = '19px Arial'; ctx.fillStyle = C.text;
  ['Hoàn cảnh kinh tế (gia đình khó khăn,',
   'chi phí sống cao) → quyết định ý thức',
   'về giáo dục (ưu tiên kiếm tiền trước).',
   '',
   'SV giàu vs SV nghèo có quan điểm khác nhau',
   'về vai trò của bằng đại học — vì tồn tại',
   'xã hội khác nhau.'
  ].forEach((l, i) => {
    ctx.font = i === 4 ? 'bold 19px Arial' : '19px Arial';
    ctx.fillText(l, 110, 740 + i * 27);
  });
});

// PAGE 8 SCENARIO 3
save('page8-scenario3', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'left';
  ctx.fillText('08', 60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('TÌNH HUỐNG 3', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.text, 2);

  ctx.font = 'bold 38px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Doanh nhân & Đạo đức', W/2, 205);
  ctx.font = '22px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('Startup Việt Nam — 2025', W/2, 250);

  building(ctx, W/2, 380, 1.5);

  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 490, W-160, 230);
  line(ctx, 80, 490, 80, 720, C.text, 3);
  ctx.textAlign = 'left'; ctx.font = '21px Arial'; ctx.fillStyle = C.text;
  ['Tuấn, CEO startup công nghệ 50 nhân viên.',
   'Áp lực từ nhà đầu tư: phải có lãi trong',
   '6 tháng tới hoặc bị cắt vốn.',
   '',
   'Cơ hội: hợp đồng lớn, nhưng phải cắt giảm',
   'chi phí xử lý rác thải để đủ giá',
   'cạnh tranh.'
  ].forEach((l, i) => ctx.fillText(l, 110, 535 + i * 27));

  ctx.fillStyle = '#fdf2f2'; ctx.fillRect(80, 780, 400, 100);
  ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.strokeRect(80, 780, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.accent; ctx.textAlign = 'center';
  ctx.fillText('A', 280, 825);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Cắt chi phí môi trường', 280, 860);

  ctx.fillStyle = '#f0f5ee'; ctx.fillRect(520, 780, 400, 100);
  ctx.strokeStyle = C.olive; ctx.lineWidth = 2; ctx.strokeRect(520, 780, 400, 100);
  ctx.font = 'bold 28px Arial'; ctx.fillStyle = C.olive;
  ctx.fillText('B', 720, 825);
  ctx.font = '18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Đầu tư bền vững dài hạn', 720, 860);

  ctx.font = 'bold italic 20px Times New Roman'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
  ctx.fillText('Áp lực tài chính có thay đổi đạo đức?', W/2, 950);
});

// PAGE 9 RESULT 3
save('page9-result3', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'right';
  ctx.fillText('09', W-60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('KẾT QUẢ TÌNH HUỐNG 3', W/2, 100);
  line(ctx, 200, 120, W-200, 120, C.text, 2);

  ctx.font = 'bold 44px Times New Roman'; ctx.fillStyle = C.accent;
  ctx.fillText('Thực trạng CSR tại Việt Nam', W/2, 210);

  // Stats
  [['70%', 'DN nhỏ KHÔNG có\nchính sách CSR', C.accent],
   ['45%', 'DN cắt giảm môi trường\nkhi khó khăn', C.olive],
   ['3x', 'DN FDI ưu tiên CSR\nhơn DN nội', C.text]
  ].forEach((s, i) => {
    const sx = 120 + i * 290;
    ctx.strokeStyle = C.light; ctx.lineWidth = 1;
    ctx.strokeRect(sx, 280, 240, 170);
    ctx.font = 'bold 56px Times New Roman'; ctx.fillStyle = s[2]; ctx.textAlign = 'center';
    ctx.fillText(s[0], sx+120, 360);
    ctx.font = '15px Arial'; ctx.fillStyle = C.text;
    s[1].split('\n').forEach((l, li) => ctx.fillText(l, sx+120, 400 + li * 20));
  });

  ctx.fillStyle = '#f0ece6'; ctx.fillRect(80, 500, W-160, 260);
  line(ctx, 80, 500, 80, 760, C.accent, 3);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = C.accent; ctx.textAlign = 'left';
  ctx.fillText('📌 PHÂN TÍCH THEO MARX:', 110, 540);
  ctx.font = '19px Arial'; ctx.fillStyle = C.text;
  ['Khi tồn tại vật chất (áp lực tài chính,',
   'cạnh tranh) thay đổi → ý thức đạo đức',
   'cũng biến đổi theo.',
   '',
   'DN giàu có → ý thức CSR cao.',
   'DN khó khăn → "đạo đức là xa xỉ".',
   '',
   'Một lần nữa: ĐỜI SỐNG quyết định Ý THỨC.'
  ].forEach((l, i) => {
    ctx.font = i === 7 ? 'bold italic 19px Times New Roman' : '19px Arial';
    ctx.fillStyle = i === 7 ? C.accent : C.text;
    ctx.fillText(l, 110, 580 + i * 27);
  });
});

// PAGE 10 CONCLUSION
save('page10-conclusion', (ctx) => {
  ctx.font = '14px Arial'; ctx.fillStyle = C.light; ctx.textAlign = 'left';
  ctx.fillText('10', 60, 60);
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('TỔNG KẾT', W/2, 100);
  line(ctx, 100, 120, W-100, 120, C.accent, 2);

  ctx.font = 'italic 28px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('"Không phải ý thức quyết định đời sống', W/2, 205);
  ctx.fillText('mà chính đời sống quyết định ý thức"', W/2, 250);
  ctx.font = 'bold 18px Arial'; ctx.fillStyle = C.accent;
  ctx.fillText('— Karl Marx, Hệ tư tưởng Đức (1846)', W/2, 300);

  line(ctx, 200, 340, W-200, 340, C.light, 1);

  ctx.font = 'bold 26px Times New Roman'; ctx.fillStyle = C.text;
  ctx.fillText('Qua 3 tình huống thực tế:', W/2, 400);

  [['🏭', 'Công nhân', 'Áp lực kinh tế → chọn tăng ca'],
   ['🎓', 'Sinh viên', 'Hoàn cảnh gia đình → bỏ học đi làm'],
   ['💼', 'Doanh nhân', 'Áp lực tài chính → hạ chuẩn đạo đức']
  ].forEach((s, i) => {
    const sy = 440 + i * 95;
    ctx.fillStyle = '#f0ece6'; ctx.fillRect(100, sy, W-200, 75);
    ctx.font = '30px Arial'; ctx.textAlign = 'left';
    ctx.fillText(s[0], 120, sy+48);
    ctx.font = 'bold 22px Arial'; ctx.fillStyle = C.text;
    ctx.fillText(s[1], 170, sy+35);
    ctx.font = '17px Arial'; ctx.fillStyle = C.gray;
    ctx.fillText(s[2], 170, sy+60);
  });

  // Red conclusion bar
  ctx.fillStyle = C.accent; ctx.fillRect(80, 760, W-160, 80);
  ctx.font = 'bold 22px Arial'; ctx.fillStyle = '#FAFAF8'; ctx.textAlign = 'center';
  ctx.fillText('TỒN TẠI XÃ HỘI  →  QUYẾT ĐỊNH  →  Ý THỨC XÃ HỘI', W/2, 810);

  ctx.font = '17px Arial'; ctx.fillStyle = C.text;
  ctx.fillText('Liên hệ thực tiễn Việt Nam 2025:', W/2, 900);
  ctx.font = '15px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('• Kinh tế phát triển → ý thức môi trường, nhân quyền tăng', W/2, 935);
  ctx.fillText('• Đô thị hóa → thay đổi lối sống, giá trị gia đình', W/2, 960);
  ctx.fillText('• Công nghệ số → biến đổi nhận thức về lao động & giáo dục', W/2, 985);
});

// BACK COVER
save('book-back', (ctx) => {
  ctx.strokeStyle = C.text; ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, W-100, H-100);
  ctx.strokeRect(60, 60, W-120, H-120);

  ctx.fillStyle = C.accent; ctx.fillRect(100, 350, W-200, 4);
  ctx.font = 'bold 36px Times New Roman'; ctx.fillStyle = C.text; ctx.textAlign = 'center';
  ctx.fillText('Cảm ơn đã theo dõi!', W/2, 450);
  ctx.font = 'italic 24px Times New Roman'; ctx.fillStyle = C.gray;
  ctx.fillText('Interactive Pop-up Book', W/2, 510);
  ctx.fillText('Triết học Mác-Lênin • Chương III', W/2, 550);

  line(ctx, 300, 600, W-300, 600, C.light, 1);

  ctx.font = '18px Arial'; ctx.fillStyle = C.gray;
  ctx.fillText('Nhóm thực hiện: [Tên nhóm]', W/2, 670);
  ctx.fillText('Giảng viên: [Tên GV]', W/2, 710);
  ctx.fillText('Năm học: 2024 - 2025', W/2, 750);

  factory(ctx, 300, 950, 0.7);
  university(ctx, W/2, 950, 0.7);
  building(ctx, 724, 950, 0.5);

  ctx.fillStyle = C.accent; ctx.fillRect(100, H-120, W-200, 3);
  ctx.font = '14px Arial'; ctx.fillStyle = C.light;
  ctx.fillText('Made with Three.js & React Three Fiber', W/2, H-80);
});

console.log('\n🎉 All textures generated!');
