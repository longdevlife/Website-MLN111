import { useState, useEffect, useRef } from 'react';

/* ═══ ACHIEVEMENTS ════════════════════════════════════ */
const ACHIEVEMENTS = [
  { id: 'first_blood', icon: '⚡', title: 'Quyết đoán!', desc: 'Trả lời đúng lần đầu tiên', trigger: (h) => h.filter(x => x.correct).length === 1 },
  { id: 'combo2', icon: '🔥', title: 'Combo x2!', desc: 'Trả lời đúng 2 lần liên tiếp', trigger: (h, combo) => combo === 2 },
  { id: 'combo3', icon: '💥', title: 'Combo Huyền Thoại!', desc: 'Trả lời đúng 3+ lần liên tiếp', trigger: (h, combo) => combo === 3 },
  { id: 'comeback', icon: '🛡️', title: 'Lội ngược dòng!', desc: 'Đúng ngay sau một lần sai', trigger: (h) => h.length >= 2 && !h[h.length - 2].correct && h[h.length - 1].correct },
  { id: 'perfect', icon: '🏆', title: 'Không tì vết!', desc: 'Đúng tất cả mà không sai lần nào', trigger: (h) => h.length === 4 && h.every(x => x.correct) },
];

const OBJECTIVES = [
  { goal: 'Thiết lập văn hóa dữ liệu', kpi: 'Tăng năng suất ≥30%' },
  { goal: 'Bảo vệ tính toàn vẹn của hệ thống', kpi: 'Tỉ lệ gian lận < 1%' },
  { goal: 'Định vị thương hiệu công nghệ', kpi: 'CTR quảng cáo ≥ 3%' },
  { goal: 'Phân phối lợi nhuận bền vững', kpi: 'Không có đình công' },
];

const SCENARIOS = [
  {
    id: 1, act: 'Kịch bản I', title: 'Sự kháng cự của "Ma Cũ"', tag: '⚙️ Quản lý nhân sự',
    image: '/gearx-workshop.png',
    context: 'Hệ thống AI mới yêu cầu thợ máy chụp đúng 15 góc ảnh để phân tích độ mòn của líp, xích và khung sườn. Bác thợ cả 15 năm kinh nghiệm nổi đóa.',
    character: { name: 'Bác Thợ Cả', icon: '🔧', side: 'left' },
    dialogue: '"Ừ, tôi nhìn lướt qua là biết xe ngon hay tã. Bắt chụp chẹt thế này rườm rà lắm — máy móc sao tinh bằng mắt thợ được!"',
    choices: [
      { label: 'A', icon: '🤝', text: 'Tôn trọng kinh nghiệm. Cho phép thợ lâu năm bỏ qua chụp ảnh, chỉ tick "Đạt".', isCorrect: false, resultTitle: '💥 Khủng hoảng truyền thông!', result: 'Tháng sau, một lô xe hỏng phuộc nén bị khách bóc phốt vì không có ảnh Blockchain đối chứng. Báo chí đưa tin. Cổ phiếu lao dốc 18%.', lessonEmoji: '⚠️', concept: 'Ý thức lạc hậu so với Tồn tại', lesson: 'Phương thức sản xuất đã tiến lên tự động hóa (Tồn tại xã hội mới), nhưng bạn duy trì thói quen cảm tính (Ý thức cũ). Sự lạc hậu của ý thức sẽ níu chân sự phát triển.', score: -30 },
      { label: 'B', icon: '⚡', text: 'Đình chỉ thợ cả 3 ngày, bắt buộc 100% tuân thủ. Thưởng KPI đúng quy trình, phạt sai phạm.', isCorrect: true, resultTitle: '🚀 Văn hóa dữ liệu hình thành!', result: 'Sau 1 tháng, thợ máy thi nhau học chụp ảnh chuẩn để AI nhận diện trúng. Năng suất tăng 34%. Văn hóa "Data-driven" lan tỏa khắp xưởng.', lessonEmoji: '✅', concept: 'Tồn tại quyết định Ý thức', lesson: 'Khi tồn tại xã hội (công nghệ AI) thay đổi, bạn áp dụng kỷ luật buộc ý thức xã hội (thói quen lao động) phải thay đổi theo. Đời sống quyết định ý thức!', score: 50 },
    ],
  },
  {
    id: 2, act: 'Kịch bản II', title: 'Khi nhân viên "hack" hệ thống', tag: '🕵️ Kiểm soát nội bộ',
    image: '/gearx-workshop.png',
    context: 'Sau 2 tháng, bộ phận QA phát hiện 12% ảnh kiểm định là ảnh cũ chụp sẵn từ trước, không phải ảnh thật của xe đang bán. Hệ thống vẫn chấp nhận vì đúng góc.',
    character: { name: 'Trưởng phòng QA', icon: '🕵️', side: 'right' },
    dialogue: '"Anh COO ơi, em phát hiện một số thợ dùng ảnh cũ để qua mặt AI. Hệ thống vẫn pass vì ảnh đúng góc. Giờ xử lý thế nào ạ?"',
    choices: [
      { label: 'A', icon: '🤫', text: 'Nhắc nhở nội bộ nhẹ nhàng, không kỷ luật để tránh mất lòng nhân viên cũ.', isCorrect: false, resultTitle: '📰 Scandal lan khắp MXH!', result: 'Khách hàng thuê bên thứ ba kiểm định, phát hiện gian lận. Báo đăng "Sự thật đen tối sau blockchain GearX" viral 50k share. Doanh thu giảm 42%.', lessonEmoji: '⚠️', concept: 'Thượng tầng phải bảo vệ Hạ tầng', lesson: 'Thượng tầng kiến trúc (quy tắc, kỷ luật) phải phù hợp và bảo vệ cơ sở hạ tầng. Nếu chính sách quản lý không đủ mạnh chống gian lận, cả hệ thống công nghệ sụp đổ.', score: -35 },
      { label: 'B', icon: '⚖️', text: 'Sa thải ngay 12 nhân viên vi phạm, công bố nội bộ. Triển khai AI phát hiện ảnh trùng lặp.', isCorrect: true, resultTitle: '🛡️ Hệ thống tự làm sạch!', result: 'Hành động quyết đoán tạo tiền lệ: vi phạm = sa thải. Tỉ lệ gian lận giảm về 0.1%. Đối tác quốc tế mở hợp đồng xuất khẩu đầu tiên trị giá $2M.', lessonEmoji: '✅', concept: 'Ý thức tác động trở lại Tồn tại', lesson: 'Thượng tầng kiến trúc (pháp lý, kỷ luật, văn hóa) khi xây dựng đúng sẽ củng cố cơ sở hạ tầng kinh tế. Ý thức tích cực có thể thúc đẩy sự phát triển của tồn tại.', score: 55 },
    ],
  },
  {
    id: 3, act: 'Kịch bản III', title: 'Định hình niềm tin khách hàng', tag: '📢 Marketing chiến lược',
    image: '/gearx-marketing.png',
    context: 'Độ chính xác kiểm định nhờ AI đạt 99%. Đây là lợi thế cạnh tranh cực lớn. Giám đốc Marketing đề xuất thông điệp chiến dịch quảng cáo toàn quốc.',
    character: { name: 'GĐ Marketing', icon: '📊', side: 'right' },
    dialogue: '"Boss ơi, em soạn xong chiến dịch rồi: GearX – Uy tín làm nên thương hiệu, chất lượng từ tâm người thợ. Nghe hay không?"',
    choices: [
      { label: 'A', icon: '❤️', text: 'Duyệt thông điệp này — nghe tình cảm và lọt tai để kết nối cảm xúc khách hàng.', isCorrect: false, resultTitle: '😴 Gen Z quay lưng!', result: 'CTR chỉ 0.8%. Gen Z bình luận: "Nghe y chang tiệm xe vỉa hè." Đối thủ tung "Real-time AI inspection" cướp đi 23% thị phần trong 1 quý.', lessonEmoji: '⚠️', concept: 'Ý thức không phản ánh Tồn tại', lesson: 'Công nghệ (tồn tại) đã vươn tầm thế giới nhưng tư duy truyền thông (ý thức) vẫn kẹt ở "con buôn truyền thống". Lãng phí hoàn toàn sức mạnh nền tảng kỹ thuật mới.', score: -25 },
      { label: 'B', icon: '🤖', text: 'Đổi thành: "GearX – Minh bạch 100% từng vết xước. AI kiểm chứng, Blockchain bảo hành."', isCorrect: true, resultTitle: '🎉 Viral toàn mạng xã hội!', result: 'Video unboxing kèm QR quét Blockchain đạt 2M view. Khách hàng tin tuyệt đối vào dữ liệu. GearX trở thành tiêu chuẩn mới của thị trường xe đạp cũ Đông Nam Á.', lessonEmoji: '✅', concept: 'Ý thức thúc đẩy Tồn tại', lesson: 'Ý thức doanh nghiệp đã phản ánh đúng và đi kịp sự tiến bộ của tồn tại (công nghệ). Khi ý thức vươn lên đón đầu, nó tạo ra làn sóng thay đổi toàn thị trường.', score: 50 },
    ],
  },
  {
    id: 4, act: 'Kịch bản IV', title: 'Chia sẻ lợi nhuận từ AI', tag: '💰 Quản trị nhân văn',
    image: '/gearx-marketing.png',
    context: 'Doanh thu tăng 180% nhờ AI. HĐQT họp khẩn để quyết định phân phối lợi nhuận — tái đầu tư công nghệ hay tăng lương cho toàn bộ nhân viên xưởng.',
    character: { name: 'Chủ tịch HĐQT', icon: '💼', side: 'left' },
    dialogue: '"COO ơi, lợi nhuận quý này tăng vọt nhờ AI. Ta nên dùng toàn bộ mua thêm server hay tăng lương cho anh em thợ đây?"',
    choices: [
      { label: 'A', icon: '🖥️', text: 'Dồn toàn bộ vào công nghệ. Thợ máy chỉ là "người vận hành" — không cần tăng lương nhiều.', isCorrect: false, resultTitle: '🔥 Đình công bùng nổ 5 ngày!', result: 'Nhân viên biết lương không đổi dù doanh thu tăng 180%. Cuộc đình công kéo dài 5 ngày, 3 kho hàng tê liệt. Báo: "GearX bóc lột lao động bằng AI."', lessonEmoji: '⚠️', concept: 'Quan hệ SX mâu thuẫn Lực lượng SX', lesson: 'Quan hệ sản xuất (phân phối lợi nhuận) phải tương thích với lực lượng sản xuất (công nghệ). Khi bóc lột người lao động, mâu thuẫn xã hội bùng nổ — đúng như Marx dự báo.', score: -40 },
      { label: 'B', icon: '🤲', text: '50% tái đầu tư công nghệ + 50% tăng lương thưởng KPI gắn với hiệu quả AI.', isCorrect: true, resultTitle: '🏆 Mô hình kiểu mẫu quốc gia!', result: 'Nhân viên hào hứng học AI vì lương gắn với kết quả máy. Năng suất tăng 67% quý tiếp. Forbes Vietnam đề cử GearX là "Mô hình quản trị nhân văn nhất 2026".', lessonEmoji: '✅', concept: 'Quan hệ SX tiến bộ giải phóng SX', lesson: 'Quan hệ sản xuất tiến bộ (phân phối công bằng) tương thích với lực lượng sản xuất mới (AI) sẽ giải phóng toàn bộ tiềm năng sáng tạo người lao động — nền tảng phát triển bền vững.', score: 60 },
    ],
  },
];

const MAX_SCORE = SCENARIOS.reduce((s, sc) => s + Math.max(...sc.choices.map(c => c.score)), 0);

const CHAR_THEME = {
  '🔧': { color: '#f59e0b', bg: 'rgba(146,64,14,0.18)' },
  '🕵️': { color: '#60a5fa', bg: 'rgba(30,58,95,0.25)' },
  '📊': { color: '#34d399', bg: 'rgba(6,95,70,0.2)' },
  '💼': { color: '#a78bfa', bg: 'rgba(76,29,149,0.2)' },
};
const COO_ICON = '👔';
const COO_NAME = 'Bạn (COO)';
const COO_THEME = { color: '#c5a028', bg: 'rgba(197,160,40,0.12)' };

/* ═══ STARFIELD ═══════════════════════════════════════ */
function StarField() {
  const stars = useRef(Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2.5, dur: 3 + Math.random() * 7, delay: Math.random() * 8,
  })));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.current.map(s => (
        <div key={s.id} style={{
          position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)',
          animation: `twinkle ${s.dur}s ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ═══ CONFETTI ════════════════════════════════════════ */
function Confetti({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#facc15','#4ade80','#60a5fa','#f472b6','#fb923c','#a78bfa'];
    const particles = Array.from({ length: 160 }, () => ({
      x: canvas.width * (0.3 + Math.random() * 0.4), y: canvas.height * 0.5,
      vx: (Math.random() - 0.5) * 12, vy: -8 - Math.random() * 10,
      rot: Math.random() * 360, rotV: (Math.random() - 0.5) * 10,
      w: 7 + Math.random() * 8, h: 4 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)], alpha: 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.rot += p.rotV;
        if (p.y > canvas.height * 0.8) p.alpha -= 0.025;
        p.alpha = Math.max(0, p.alpha);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
        ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      if (particles.some(p => p.alpha > 0)) rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }} />;
}

/* ═══ ACHIEVEMENT TOAST ══════════════════════════════ */
function AchievementToast({ achievements, onDismiss }) {
  if (!achievements.length) return null;
  const a = achievements[0];
  return (
    <div onClick={onDismiss} style={{
      position: 'fixed', top: 80, right: 20, zIndex: 200,
      background: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      border: '1px solid #facc15', borderRadius: 12, padding: '12px 16px',
      display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
      boxShadow: '0 0 20px rgba(250,204,21,0.3)', maxWidth: 280,
      animation: 'slideIn 0.4s ease',
    }}>
      <div style={{ fontSize: 28 }}>{a.icon}</div>
      <div>
        <div style={{ color: '#facc15', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>🏅 Huy hiệu mở khoá!</div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{a.title}</div>
        <div style={{ color: '#9ca3af', fontSize: 12 }}>{a.desc}</div>
      </div>
    </div>
  );
}

/* ═══ CHAR AVATAR ════════════════════════════════════ */
function CharAvatar({ icon, name, speaking, side }) {
  const theme = CHAR_THEME[icon] || COO_THEME;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      alignSelf: 'flex-end',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: theme.bg,
        border: `2px solid ${speaking ? theme.color : 'rgba(255,255,255,0.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 32, position: 'relative',
        boxShadow: speaking ? `0 0 16px ${theme.color}66` : 'none',
        transition: 'all 0.3s',
      }}>
        {icon}
        {speaking && (
          <div style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            border: `2px solid ${theme.color}`,
            animation: 'pulse-ring 1.5s infinite',
          }} />
        )}
      </div>
      <div style={{ color: speaking ? theme.color : '#6b7280', fontSize: 11, fontWeight: 600, textAlign: 'center', maxWidth: 80 }}>{name}</div>
      {speaking && (
        <div style={{ display: 'flex', gap: 3 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%', background: theme.color,
              animation: `bounce-dot 1s ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ MAIN APP ════════════════════════════════════════ */
export default function GearOfEra() {
  const [phase, setPhase] = useState('cinematic');
  const [animKey, setAnimKey] = useState(0);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState(new Set());

  const scenario = SCENARIOS[idx];
  const choice = picked !== null ? scenario?.choices[picked] : null;

  function go(nextPhase, delay = 0) {
    setTimeout(() => { setAnimKey(k => k + 1); setPhase(nextPhase); }, delay);
  }

  function handleChoice(i) {
    const c = scenario.choices[i];
    setPicked(i);
    const newCombo = c.isCorrect ? combo + 1 : 0;
    const bonus = c.isCorrect && combo >= 1 ? 15 : 0;
    setScore(s => s + c.score + bonus);
    setCombo(newCombo);
    const newHistory = [...history, { id: scenario.id, act: scenario.act, label: c.label, correct: c.isCorrect, delta: c.score + bonus }];
    setHistory(newHistory);
    const newToasts = ACHIEVEMENTS.filter(a => !unlockedIds.has(a.id) && a.trigger(newHistory, newCombo));
    if (newToasts.length) {
      setUnlockedIds(prev => new Set([...prev, ...newToasts.map(a => a.id)]));
      setToastQueue(q => [...q, ...newToasts]);
      setTimeout(() => setToastQueue(q => q.slice(newToasts.length)), 3500);
    }
    if (c.isCorrect) setConfetti(true);
    else { setShake(true); setTimeout(() => setShake(false), 600); }
    go('result', 100);
  }

  function nextScenario() {
    setConfetti(false);
    if (idx + 1 < SCENARIOS.length) { setIdx(i => i + 1); setPicked(null); go('game', 300); }
    else go('end', 300);
  }

  function restart() {
    setPhase('cinematic'); setIdx(0); setPicked(null); setScore(0); setCombo(0);
    setHistory([]); setConfetti(false); setToastQueue([]); setUnlockedIds(new Set()); setAnimKey(k => k + 1);
  }

  const pct = Math.max(0, Math.min(100, ((score + 75) / (MAX_SCORE + 75)) * 100));

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#080c18', color: '#fff', fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden' }}
      className={shake ? 'shake-anim' : ''}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.2 } to { opacity: 1 } }
        @keyframes pulse-ring { 0%,100% { transform: scale(1); opacity: 0.8 } 50% { transform: scale(1.15); opacity: 0.3 } }
        @keyframes bounce-dot { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
        @keyframes slideIn { from { transform: translateX(120%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes shake-anim { 0%,100% { transform: translateX(0) } 20%,60% { transform: translateX(-8px) } 40%,80% { transform: translateX(8px) } }
        @keyframes pulse-btn { 0%,100% { box-shadow: 0 0 0 0 rgba(197,160,40,0.4) } 50% { box-shadow: 0 0 0 12px rgba(197,160,40,0) } }
        @keyframes glow-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .shake-anim { animation: shake-anim 0.6s ease; }
        * { box-sizing: border-box; }
        button { cursor: pointer; font-family: inherit; }
      `}</style>

      <StarField />
      <Confetti active={confetti && phase === 'result'} />
      <AchievementToast achievements={toastQueue} onDismiss={() => setToastQueue(q => q.slice(1))} />

      {/* HUD */}
      {(phase === 'game' || phase === 'result' || phase === 'lesson') && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(8,12,24,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ color: score >= 0 ? '#facc15' : '#f87171', fontWeight: 800, fontSize: 16, minWidth: 80 }}>
            ⚡ {score >= 0 ? `+${score}` : score}
          </span>
          {combo >= 2 && <span style={{ color: '#fb923c', fontWeight: 700, fontSize: 13 }}>🔥 COMBO ×{combo}</span>}
          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#c5a028,#facc15)', borderRadius: 3, transition: 'width 0.5s' }} />
          </div>
          <span style={{ color: '#9ca3af', fontSize: 13 }}>{scenario?.act} / {SCENARIOS.length}</span>
        </div>
      )}

      <div key={animKey} style={{ paddingTop: (phase === 'game' || phase === 'result' || phase === 'lesson') ? 48 : 0 }}>
        {phase === 'cinematic' && <CinematicScreen onDone={() => go('rules')} />}
        {phase === 'rules' && <RulesScreen onStart={() => go('game')} />}
        {phase === 'game' && scenario && (
          <GameScreen
            key={scenario.id}
            scenario={scenario} onChoice={handleChoice} combo={combo}
            objective={OBJECTIVES[idx]} scenarioIdx={idx} totalScenarios={SCENARIOS.length}
          />
        )}
        {phase === 'result' && choice && <ResultScreen scenario={scenario} choice={choice} onNext={() => go('lesson')} />}
        {phase === 'lesson' && choice && <LessonScreen choice={choice} onNext={nextScenario} isLast={idx === SCENARIOS.length - 1} />}
        {phase === 'end' && <EndScreen score={score} history={history} onRestart={restart} />}
      </div>
    </div>
  );
}

/* ═══ CINEMATIC ══════════════════════════════════════ */
function CinematicScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const lines = [
    { text: 'Năm 2026...', delay: 0 },
    { text: 'GearX — startup xe đạp thể thao cũ hàng đầu Việt Nam', delay: 1400 },
    { text: 'quyết định ứng dụng AI & Blockchain vào kiểm định xe.', delay: 2800 },
    { text: 'Cả công ty sắp thay đổi mãi mãi.', delay: 4200 },
    { text: 'Và bạn là người cầm lái.', delay: 5600 },
  ];
  useEffect(() => {
    const timers = lines.map((l, i) => setTimeout(() => setStep(i + 1), l.delay + 200));
    const end = setTimeout(onDone, 7800);
    return () => { timers.forEach(clearTimeout); clearTimeout(end); };
  }, []);
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#000 0%,#0a0a1a 100%)', position: 'relative',
    }}>
      <div style={{ textAlign: 'center', padding: 40, maxWidth: 600 }}>
        {lines.map((l, i) => (
          <p key={i} style={{
            fontSize: i === 4 ? 28 : 20, fontWeight: i === 4 ? 800 : 400,
            color: i === 4 ? '#facc15' : '#e5e7eb',
            opacity: step > i ? 1 : 0, transform: step > i ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s ease', marginBottom: 16, lineHeight: 1.5,
          }}>{l.text}</p>
        ))}
        <button onClick={onDone} style={{
          marginTop: 32, padding: '10px 24px', background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8,
          color: '#9ca3af', fontSize: 14, transition: 'all 0.2s',
        }}>Bỏ qua →</button>
      </div>
    </div>
  );
}

/* ═══ RULES ══════════════════════════════════════════ */
const RULES = [
  { icon: '🎮', title: 'Visual Novel', desc: 'Bạn sẽ đối mặt với 4 kịch bản thực tế của GearX — mỗi kịch bản có 2 lựa chọn.' },
  { icon: '🧠', title: 'Tư duy Triết học', desc: 'Mỗi quyết định phản ánh khái niệm triết học Mác–Lênin về tồn tại & ý thức xã hội.' },
  { icon: '⚡', title: 'Hệ thống điểm', desc: 'Đúng: +50 điểm. Sai: -25 đến -40 điểm. COMBO 2+ lần thưởng thêm +15 điểm.' },
  { icon: '🔥', title: 'Combo Streak', desc: 'Trả lời đúng liên tiếp sẽ kích hoạt COMBO — tối đa hóa điểm số!' },
  { icon: '📚', title: 'Bài học sau mỗi kịch bản', desc: 'Dù đúng hay sai, bạn sẽ nhận được bài học triết học sâu sắc.' },
  { icon: '🏆', title: 'Xếp hạng cuối game', desc: '215 điểm tối đa. Xuất sắc, Khá giỏi, Cần cải thiện — bạn thuộc nhóm nào?' },
];

function RulesScreen({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        maxWidth: 640, width: '100%', background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 40,
        animation: 'fadeUp 0.5s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(197,160,40,0.15)', border: '1px solid rgba(197,160,40,0.3)', borderRadius: 20, color: '#c5a028', fontSize: 12, marginBottom: 12 }}>📖 Hướng dẫn & Luật chơi</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#facc15', margin: '8px 0' }}>Vòng Quay Thời Đại</h1>
          <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: 14 }}>
            Bạn là <strong style={{ color: '#e5e7eb' }}>COO của GearX</strong> — startup xe đạp đang chuyển đổi số. Mỗi quyết định phản ánh tư duy triết học Mác–Lênin.
          </p>
        </div>

        <div style={{ background: 'rgba(197,160,40,0.08)', border: '1px solid rgba(197,160,40,0.2)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🏭</span>
          <div>
            <p style={{ color: '#facc15', fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>Bối cảnh</p>
            <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.5, margin: 0 }}>GearX vừa triển khai AI kiểm định xe và Blockchain minh bạch hóa bảo dưỡng. Đây là cuộc cách mạng trong phương thức sản xuất — nhưng ý thức con người chưa chắc đã sẵn sàng.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {RULES.map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, margin: '0 0 3px' }}>{r.title}</p>
                <p style={{ color: '#9ca3af', fontSize: 12, margin: 0, lineHeight: 1.4 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onStart} style={{
          width: '100%', padding: '16px 24px',
          background: 'linear-gradient(135deg,#c5a028,#facc15)',
          border: 'none', borderRadius: 12, color: '#000', fontWeight: 800, fontSize: 16,
          animation: 'pulse-btn 2s infinite',
        }}>▶ Bắt đầu hành trình COO</button>
      </div>
    </div>
  );
}

/* ═══ GAME SCREEN ════════════════════════════════════ */
function GameScreen({ scenario, onChoice, combo, objective, scenarioIdx, totalScenarios }) {
  const [displayText, setDisplayText] = useState('');
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [charPhase, setCharPhase] = useState('npc');
  const intervalRef = useRef(null);
  const npcLeft = scenario.character.side === 'left';
  const npcTheme = CHAR_THEME[scenario.character.icon] || { color: '#c5a028', bg: 'rgba(197,160,40,0.12)' };

  useEffect(() => {
    setDisplayText('');
    setChoicesVisible(false);
    setCharPhase('npc');

    const text = scenario.dialogue;
    let i = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(intervalRef.current);
        setTimeout(() => { setChoicesVisible(true); setCharPhase('player'); }, 400);
      }
    }, 16);
    return () => clearInterval(intervalRef.current);
  }, [scenario]);

  function skipTyping() {
    clearInterval(intervalRef.current);
    setDisplayText(scenario.dialogue);
    setChoicesVisible(true);
    setCharPhase('player');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* BG */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `url(${scenario.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.25)',
      }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(8,12,24,0.4) 0%, rgba(8,12,24,0.85) 60%, rgba(8,12,24,0.98) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ padding: '3px 10px', background: 'rgba(197,160,40,0.15)', border: '1px solid rgba(197,160,40,0.3)', borderRadius: 20, color: '#c5a028', fontSize: 12, fontWeight: 600 }}>
              {scenario.act} · {scenario.tag}
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{scenario.title}</h2>
        </div>

        {/* Objective */}
        {objective && (
          <div style={{
            margin: '12px 20px 0', padding: '10px 14px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div>
              <span style={{ color: '#9ca3af', fontSize: 11 }}>🎯 Mục tiêu: </span>
              <span style={{ color: '#e5e7eb', fontSize: 13, fontWeight: 600 }}>{objective.goal}</span>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ color: '#9ca3af', fontSize: 11 }}>KPI: </span>
              <span style={{ color: '#facc15', fontSize: 13, fontWeight: 700 }}>{objective.kpi}</span>
            </div>
            <div style={{ display: 'flex', gap: 5, marginLeft: 12 }}>
              {Array.from({ length: totalScenarios }).map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: i < scenarioIdx ? '#facc15' : i === scenarioIdx ? '#fff' : 'rgba(255,255,255,0.2)',
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Stage */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 40px', minHeight: 140 }}>
          <CharAvatar
            icon={npcLeft ? scenario.character.icon : COO_ICON}
            name={npcLeft ? scenario.character.name : COO_NAME}
            speaking={npcLeft ? charPhase === 'npc' : charPhase === 'player'}
            side="left"
          />
          <CharAvatar
            icon={npcLeft ? COO_ICON : scenario.character.icon}
            name={npcLeft ? COO_NAME : scenario.character.name}
            speaking={npcLeft ? charPhase === 'player' : charPhase === 'npc'}
            side="right"
          />
        </div>

        {/* Dialogue Bar */}
        <div style={{
          background: 'rgba(8,12,24,0.97)', borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '14px 20px 20px',
        }}>
          {/* Context */}
          <div style={{
            background: 'rgba(197,160,40,0.08)', border: '1px solid rgba(197,160,40,0.2)',
            borderRadius: 8, padding: '8px 12px', marginBottom: 12,
            color: '#d1d5db', fontSize: 13, lineHeight: 1.5,
          }}>
            📌 {scenario.context}
          </div>

          {/* Bubble */}
          <div onClick={skipTyping} style={{
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${npcTheme.color}33`,
            borderRadius: 10, padding: '12px 16px', marginBottom: 12, cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span>{scenario.character.icon}</span>
              <span style={{ color: npcTheme.color, fontWeight: 700, fontSize: 13 }}>{scenario.character.name}</span>
            </div>
            <p style={{ color: '#f3f4f6', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              {displayText}
              {displayText.length < scenario.dialogue.length && (
                <span style={{ borderLeft: '2px solid #fff', marginLeft: 2, animation: 'pulse-btn 1s infinite' }}>​</span>
              )}
            </p>
            {displayText.length < scenario.dialogue.length && (
              <span style={{ color: '#6b7280', fontSize: 11, marginTop: 4, display: 'block' }}>[ nhấn để bỏ qua ]</span>
            )}
          </div>

          {/* Choices */}
          {choicesVisible && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600 }}>👔 Bạn trả lời:</span>
                {combo >= 2 && <span style={{ color: '#fb923c', fontWeight: 700, fontSize: 13 }}>🔥 COMBO ×{combo} — +15 bonus!</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {scenario.choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onChoice(i)}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 10, textAlign: 'left',
                      background: hoveredIdx === i ? 'rgba(197,160,40,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${hoveredIdx === i ? 'rgba(197,160,40,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      color: '#fff', transition: 'all 0.2s',
                      transform: hoveredIdx === i ? 'translateX(4px)' : 'none',
                      animation: `fadeUp 0.3s ${i * 0.08}s both ease`,
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(197,160,40,0.2)', border: '1px solid rgba(197,160,40,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#facc15', fontWeight: 800, fontSize: 13,
                    }}>{c.label}</span>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <span style={{ flex: 1, fontSize: 14, lineHeight: 1.4 }}>{c.text}</span>
                    <span style={{ color: '#facc15', fontSize: 16, flexShrink: 0 }}>→</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══ RESULT SCREEN ══════════════════════════════════ */
function ResultScreen({ scenario, choice, onNext }) {
  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const isCorrect = choice.isCorrect;

  useEffect(() => {
    setDisplayText(''); setDone(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++; setDisplayText(choice.result.slice(0, i));
      if (i >= choice.result.length) { clearInterval(intervalRef.current); setDone(true); }
    }, 14);
    return () => clearInterval(intervalRef.current);
  }, [choice]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isCorrect
        ? 'linear-gradient(135deg,rgba(5,46,22,0.97),rgba(8,12,24,0.9))'
        : 'linear-gradient(135deg,rgba(69,10,10,0.97),rgba(8,12,24,0.9))',
      padding: 20,
    }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{isCorrect ? '✅' : '❌'}</div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: isCorrect ? '#4ade80' : '#f87171', margin: '0 0 8px' }}>{choice.resultTitle}</h3>
        <div style={{ display: 'inline-block', padding: '4px 16px', background: (isCorrect ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)'), borderRadius: 20, color: isCorrect ? '#4ade80' : '#f87171', fontWeight: 700, marginBottom: 20 }}>
          {choice.score > 0 ? `+${choice.score}` : choice.score} điểm
        </div>
        <p style={{ color: '#d1d5db', lineHeight: 1.7, fontSize: 15, marginBottom: 24 }}>
          {displayText}
          {!done && <span style={{ borderLeft: '2px solid #fff', marginLeft: 2 }}>​</span>}
        </p>
        {done && (
          <button onClick={onNext} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg,#c5a028,#facc15)',
            border: 'none', borderRadius: 12, color: '#000', fontWeight: 800, fontSize: 15,
          }}>📚 Xem bài học triết học →</button>
        )}
      </div>
    </div>
  );
}

/* ═══ LESSON SCREEN ══════════════════════════════════ */
function LessonScreen({ choice, onNext, isLast }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0a0a1a,#080c18)', padding: 20 }}>
      <div style={{
        maxWidth: 520, width: '100%', textAlign: 'center',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 40,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.5s ease',
      }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{choice.lessonEmoji}</div>
        <div style={{ display: 'inline-block', padding: '4px 14px', background: 'rgba(197,160,40,0.15)', border: '1px solid rgba(197,160,40,0.3)', borderRadius: 20, color: '#facc15', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          {choice.concept}
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>Bài học Triết học Mác–Lênin</h3>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '0 0 16px' }} />
        <p style={{ color: '#d1d5db', lineHeight: 1.7, fontSize: 15, marginBottom: 28 }}>{choice.lesson}</p>
        <button onClick={onNext} style={{
          padding: '14px 32px', background: 'linear-gradient(135deg,#c5a028,#facc15)',
          border: 'none', borderRadius: 12, color: '#000', fontWeight: 800, fontSize: 15,
        }}>
          {isLast ? '🏁 Xem kết quả cuối game' : '▶ Kịch bản tiếp theo →'}
        </button>
      </div>
    </div>
  );
}

/* ═══ END SCREEN ═════════════════════════════════════ */
function EndScreen({ score, history, onRestart }) {
  const [barAnim, setBarAnim] = useState(false);
  useEffect(() => { setTimeout(() => setBarAnim(true), 400); }, []);
  const pct = Math.round((Math.max(0, score) / MAX_SCORE) * 100);
  const correct = history.filter(h => h.correct).length;
  const grade = correct === history.length
    ? { label: '🏆 HOÀN HẢO!', color: '#facc15', msg: 'Tư duy Mác–Lênin sắc bén như dao! Bạn là COO xuất sắc nhất lịch sử GearX.' }
    : score >= 100
      ? { label: '⭐ Xuất sắc', color: '#60a5fa', msg: 'Bạn nắm vững triết học và có bản năng lãnh đạo tốt.' }
      : score >= 50
        ? { label: '💡 Khá giỏi', color: '#fb923c', msg: 'Tiềm năng có nhưng còn điểm mù về tồn tại–ý thức. Thử lại nhé!' }
        : { label: '📖 Cần học lại', color: '#f87171', msg: 'Ý thức chưa bắt kịp tồn tại! Hãy đọc lý thuyết rồi thử lại.' };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0a0a1a,#080c18)', padding: 20 }}>
      <div style={{ maxWidth: 500, width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 40, textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
        <div style={{ fontSize: 32, fontWeight: 900, color: grade.color, marginBottom: 4 }}>{grade.label}</div>
        <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 20 }}>Hành trình COO kết thúc</h2>
        <div style={{ width: 120, height: 120, borderRadius: '50%', border: `3px solid ${grade.color}55`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: grade.color }}>{score}</span>
          <span style={{ color: '#6b7280', fontSize: 13 }}>/ {MAX_SCORE}</span>
        </div>
        <p style={{ color: '#9ca3af', marginBottom: 20, lineHeight: 1.6 }}>{grade.msg}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 20 }}>
          {[{ v: correct, l: 'Đúng', c: '#4ade80' }, { v: history.length - correct, l: 'Sai', c: '#f87171' }, { v: `${Math.round((correct / history.length) * 100)}%`, l: 'Chính xác', c: '#facc15' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          {history.map((h, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 12px', borderRadius: 8, marginBottom: 6,
              background: h.correct ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
              border: `1px solid ${h.correct ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
            }}>
              <span style={{ color: '#d1d5db', fontSize: 13 }}>{h.correct ? '✅' : '❌'} {h.act} – Lựa chọn {h.label}</span>
              <strong style={{ color: h.delta > 0 ? '#4ade80' : '#f87171' }}>{h.delta > 0 ? `+${h.delta}` : h.delta}</strong>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: barAnim ? `${pct}%` : '0%', background: grade.color, borderRadius: 4, transition: 'width 1s ease' }} />
          </div>
          <span style={{ color: grade.color, fontWeight: 700 }}>{pct}%</span>
        </div>
        <button onClick={onRestart} style={{
          width: '100%', padding: '14px', background: 'linear-gradient(135deg,#c5a028,#facc15)',
          border: 'none', borderRadius: 12, color: '#000', fontWeight: 800, fontSize: 15,
        }}>🔄 Chơi lại từ đầu</button>
      </div>
    </div>
  );
}