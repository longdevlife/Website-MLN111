import { useState, useEffect, useRef } from 'react';

/* ═══ CHARACTER PORTRAITS ════════════════════════════ */
const PORTRAITS = {
  mechanic: '/images/char-mechanic.png',
  qa: '/images/char-qa.png',
  marketing: '/images/char-marketing.png',
  chairman: '/images/char-chairman.png',
  coo: '/images/char-coo.png',
};

const SCENARIOS = [
  {
    id: 1, act: 'Kịch bản I', title: 'Sự kháng cự của "Ma Cũ"', tag: '⚙️ Quản lý nhân sự',
    image: '/gearx-workshop.png',
    context: 'Hệ thống AI mới yêu cầu thợ máy chụp đúng 15 góc ảnh để phân tích độ mòn. Bác thợ cả 15 năm kinh nghiệm nổi đóa vì cho rằng máy móc không bằng mắt thợ.',
    character: { name: 'Bác Thợ Cả', portrait: 'mechanic', side: 'left' },
    dialogue: '"Ừ, tôi nhìn lướt qua là biết xe ngon hay tã. Bắt chụp chẹt thế này rườm rà lắm — máy móc sao tinh bằng mắt thợ được!"',
    choices: [
      { label: 'A', icon: '🤝', text: 'Tôn trọng kinh nghiệm. Cho phép thợ lâu năm bỏ qua chụp ảnh.', isCorrect: false, resultTitle: '💥 Khủng hoảng truyền thông!', result: 'Tháng sau, một lô xe hỏng bị khách bóc phốt vì không có ảnh đối chứng. Cổ phiếu lao dốc 18%.', lessonEmoji: '⚠️', concept: 'Ý thức lạc hậu so với Tồn tại', lesson: 'Phương thức sản xuất tiến bộ nhưng ý thức lạc hậu sẽ níu chân sự phát triển.', score: -30 },
      { label: 'B', icon: '⚡', text: 'Đình chỉ thợ cả 3 ngày, bắt buộc 100% tuân thủ quy trình.', isCorrect: true, resultTitle: '🚀 Văn hóa dữ liệu hình thành!', result: 'Sau 1 tháng, năng suất tăng 34%. Văn hóa "Data-driven" chuyên nghiệp lan tỏa khắp xưởng.', lessonEmoji: '✅', concept: 'Tồn tại quyết định Ý thức', lesson: 'Khi tồn tại xã hội (công nghệ) thay đổi, bạn phải buộc ý thức xã hội thay đổi theo.', score: 50 },
    ],
  },
  {
    id: 2, act: 'Kịch bản II', title: 'Khi nhân viên "hack" hệ thống', tag: '🕵️ Kiểm soát nội bộ',
    image: '/gearx-qa.png',
    context: 'Sau 2 tháng, bộ phận QA phát hiện 12% ảnh kiểm định là ảnh cũ chụp sẵn để qua mặt AI. Hệ thống vẫn chấp nhận vì đúng góc.',
    character: { name: 'Trưởng phòng QA', portrait: 'qa', side: 'right' },
    dialogue: '"Anh COO ơi, em phát hiện một số thợ dùng ảnh cũ để qua mặt AI. Hệ thống vẫn pass vì ảnh đúng góc. Giờ xử lý thế nào ạ?"',
    choices: [
      { label: 'A', icon: '🤫', text: 'Nhắc nhở nội bộ nhẹ nhàng, không kỷ luật để tránh mất lòng.', isCorrect: false, resultTitle: '📰 Scandal lan khắp MXH!', result: 'Khách hàng phát hiện gian lận. Doanh thu giảm 42%. GearX mất điểm trầm trọng về tính minh bạch.', lessonEmoji: '⚠️', concept: 'Thượng tầng phải bảo vệ Hạ tầng', lesson: 'Thượng tầng kiến trúc (kỷ luật) phải tương thích và bảo vệ cơ sở hạ tầng kinh tế.', score: -35 },
      { label: 'B', icon: '⚖️', text: 'Sa thải ngay 12 nhân viên vi phạm, công bộ nội bộ răn đe.', isCorrect: true, resultTitle: '🛡️ Hệ thống tự làm sạch!', result: 'Hành động quyết đoán giúp tỉ lệ gian lận giảm về 0.1%. Đối tác tin tưởng ký hợp đồng $2M.', lessonEmoji: '✅', concept: 'Ý thức tác động trở lại Tồn tại', lesson: 'Thượng tầng kiến trúc đúng đắn sẽ củng cố cơ sở hạ tầng kinh tế.', score: 55 },
    ],
  },
  {
    id: 3, act: 'Kịch bản III', title: 'Định hình niềm tin khách hàng', tag: '📢 Marketing chiến lược',
    image: '/gearx-marketing-office.png',
    context: 'Độ chính xác kiểm định đạt 99%. Giám đốc Marketing đề xuất thông điệp quảng cáo tập trung vào cảm xúc thay vì dữ liệu AI.',
    character: { name: 'GĐ Marketing', portrait: 'marketing', side: 'right' },
    dialogue: '"Boss ơi, em soạn xong chiến dịch rồi: GearX – Uy tín làm nên thương hiệu, chất lượng từ tâm người thợ. Nghe hay không?"',
    choices: [
      { label: 'A', icon: '❤️', text: 'Duyệt thông điệp này — nghe tình cảm và dễ lọt tai.', isCorrect: false, resultTitle: '😴 Gen Z quay lưng!', result: 'CTR chỉ 0.8%. Khách hàng cho rằng GearX chẳng khác gì tiệm xe cũ truyền thống dù có AI.', lessonEmoji: '⚠️', concept: 'Ý thức không phản ánh Tồn tại', lesson: 'Công nghệ đã hiện đại nhưng tư duy vẫn lỗi thời sẽ lãng phí sức mạnh của nền tảng mới.', score: -25 },
      { label: 'B', icon: '🤖', text: 'Sửa thành: "GearX – Minh bạch 100%. AI kiểm chứng, Blockchain bảo hành."', isCorrect: true, resultTitle: '🎉 Viral toàn mạng xã hội!', result: 'Video đạt 2M view. GearX trở thành tiêu chuẩn mới của thị trường xe đạp cũ.', lessonEmoji: '✅', concept: 'Ý thức thúc đẩy Tồn tại', lesson: 'Ý thức đi kịp tiến bộ của tồn tại sẽ tạo ra làn sóng thay đổi toàn thị trường.', score: 50 },
    ],
  },
  {
    id: 4, act: 'Kịch bản IV', title: 'Chia sẻ lợi nhuận từ AI', tag: '💰 Quản trị nhân văn',
    image: '/gearx-boardroom.png',
    context: 'Doanh thu tăng 180% nhờ AI. HĐQT họp khẩn để quyết định dùng toàn bộ tiền mua máy mới thay vì tăng lương thợ.',
    character: { name: 'Chủ tịch HĐQT', portrait: 'chairman', side: 'left' },
    dialogue: '"COO ơi, lợi nhuận quý này tăng vọt nhờ AI. Ta nên dùng toàn bộ mua thêm server hay tăng lương cho anh em thợ đây?"',
    choices: [
      { label: 'A', icon: '🖥️', text: 'Dồn toàn bộ vào công nghệ. Thợ máy chỉ là người vận hành.', isCorrect: false, resultTitle: '🔥 Đình công bùng nổ!', result: 'Nhân viên đình công vì cảm thấy bị bóc lột. Hệ thống vận hành tê liệt.', lessonEmoji: '⚠️', concept: 'Quan hệ SX mâu thuẫn Lực lượng SX', lesson: 'Quan hệ sản xuất không tương thích với lực lượng sản xuất sẽ gây bùng nổ mâu thuẫn.', score: -40 },
      { label: 'B', icon: '🤲', text: '50% tái đầu tư + 50% tăng lương thưởng gắn with kết quả AI.', isCorrect: true, resultTitle: '🏆 Mô hình kiểu mẫu quốc gia!', result: 'Năng suất tăng vọt. GearX được đề cử là "Mô hình quản trị nhân văn nhất 2026".', lessonEmoji: '✅', concept: 'Quan hệ SX tiến bộ giải phóng SX', lesson: 'Quan hệ sản xuất công bằng giải phóng tối đa tiềm năng lao động.', score: 60 },
    ],
  },
];

/* ═══ CANVAS SMART TRANSPARENCY ══════════════════════ */
function TransparentSprite({ portraitKey, side, speaking, emotion }) {
  const src = PORTRAITS[portraitKey];
  const canvasRef = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext('2d'); canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        const isWhite = r > 235 && g > 235 && b > 235;
        const isBlack = r < 45 && g < 45 && b < 45;
        if (isWhite || isBlack) { data[i + 3] = 0; }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  const positioning = side === 'left' 
    ? { left: '0%', transform: speaking ? 'scale(1.05)' : 'scale(1)' } 
    : { right: '0%', transform: speaking ? 'scale(1.05)' : 'scale(1)' };

  return (
    <div style={{
      position: 'absolute', bottom: 0, height: '80vh', width: 'auto', zIndex: speaking ? 10 : 5,
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      filter: speaking ? 'brightness(1.1) drop-shadow(0 0 30px rgba(250,204,21,0.2))' : 'brightness(0.4) grayscale(0.7)',
      ...positioning
    }}>
      <canvas ref={canvasRef} style={{ height: '100%', width: 'auto' }} />
    </div>
  );
}

/* ═══ STARFIELD UNIVERSE EFFECT ═══════════════════════ */
function StarField() {
  const stars = useRef(Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2, dur: 5 + Math.random() * 10, delay: Math.random() * 5
  })));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {stars.current.map(s => (
        <div key={s.id} style={{
          position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
          background: 'rgba(255,255,255,0.7)', borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255,255,255,0.5)',
          animation: `twinkle ${s.dur}s ${s.delay}s infinite alternate`
        }} />
      ))}
      <div style={{
        position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(30, 0, 80, 0.2) 0%, transparent 60%)',
        animation: 'pulse-bg 20s infinite alternate'
      }} />
    </div>
  );
}

/* ═══ MAIN APP ════════════════════════════════════════ */
export default function GearOfEra() {
  const [phase, setPhase] = useState('cinematic');
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [emotion, setEmotion] = useState(null); 
  const [animKey, setAnimKey] = useState(0);

  const scenario = SCENARIOS[idx];

  const restart = () => {
    setPhase('cinematic');
    setIdx(0);
    setPicked(null);
    setScore(0);
    setCombo(0);
    setEmotion(null);
    setAnimKey(prev => prev + 1);
  };

  const handleChoice = (i) => {
    const c = scenario.choices[i]; setPicked(i);
    setEmotion(c.isCorrect ? 'correct' : 'wrong');
    const bonus = (c.isCorrect && combo >= 1) ? 15 : 0;
    setScore(s => s + c.score + bonus);
    setCombo(c.isCorrect ? combo + 1 : 0);
    setTimeout(() => { setAnimKey(k => k + 1); setPhase('result'); setEmotion(null); }, 1400);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#000', color: '#fff', overflow: 'clip' }}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.1 } to { opacity: 1 } }
        @keyframes pulse-bg { from { opacity: 0.2 } to { opacity: 0.5 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        
        /* CORRECT EFFECT */
        @keyframes celebrate-correct {
          0% { transform: scale(1); filter: brightness(1) }
          20% { transform: scale(1.02); filter: brightness(1.5) }
          100% { transform: scale(1); filter: brightness(1) }
        }
        .celebrate-correct { animation: celebrate-correct 0.6s ease; }
        .success-overlay { position: absolute; inset: 0; background: radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%); z-index: 60; pointer-events: none; }

        /* MEGA SHAKE EFFECT */
        @keyframes mega-shake {
          0% { transform: translate(0, 0) }
          10% { transform: translate(-8px, -8px) }
          20% { transform: translate(8px, 8px) }
          30% { transform: translate(-8px, 8px) }
          40% { transform: translate(8px, -8px) }
          100% { transform: translate(0, 0) }
        }
        .mega-shake { animation: mega-shake 0.1s linear 4; }
        .fail-overlay { position: absolute; inset: 0; background: rgba(220, 38, 38, 0.2); z-index: 60; pointer-events: none; }

        .vn-text-shadow { text-shadow: 0 4px 12px rgba(0,0,0,1); }
        .choice-btn:hover { background: rgba(255,255,255,0.1) !important; border-color: gold !important; transform: scale(1.02); }
      `}</style>

      <StarField />
      
      <div key={animKey} 
        style={{ height: '100%', position: 'relative', transition: 'transform 0.3s ease' }} 
        className={emotion === 'wrong' ? 'mega-shake' : emotion === 'correct' ? 'celebrate-correct' : ''}>
        
        {emotion === 'correct' && <div className="success-overlay" />}
        {emotion === 'wrong' && <div className="fail-overlay" />}
        
        {phase === 'cinematic' && <Cinematic onDone={() => setPhase('rules')} />}
        {phase === 'rules' && <RulesScreen onStart={() => setPhase('game')} />}
        {phase === 'game' && <GameScreen scenario={scenario} onChoice={handleChoice} emotion={emotion} />}
        {phase === 'result' && <ResultScreen choice={scenario.choices[picked]} onNext={() => setPhase('lesson')} />}
        {phase === 'lesson' && <LessonScreen choice={scenario.choices[picked]} 
          onNext={() => {
            if (idx + 1 < SCENARIOS.length) { setIdx(idx + 1); setPicked(null); setPhase('game'); }
            else setPhase('end');
          }} isLast={idx === SCENARIOS.length - 1} />}
        {phase === 'end' && <EndScreen score={score} onRestart={restart} />}
      </div>
    </div>
  );
}

function Cinematic({ onDone }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Năm 2026... GearX — startup tiên phong ứng dụng AI & Blockchain vào kiểm định. Một cuộc cách mạng trong phương thức sản xuất đang diễn ra. Và bạn, trong vai trò COO, chính là người cầm lái định hình tương lai.";
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++; setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) { clearInterval(t); setComplete(true); }
    }, 40);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, background: 'transparent' }}>
      <div style={{ maxWidth: 800 }}>
        <h1 style={{ fontSize: 28, color: 'gold', marginBottom: 30, letterSpacing: 4, animation: 'fadeUp 1s ease both' }}>GEAR X: VÒNG QUAY THỜI ĐẠI</h1>
        <p style={{ fontSize: 18, lineHeight: 1.8, color: '#d1d5db', minHeight: '6em' }} className="vn-text-shadow">{displayText}</p>
        {complete && <button onClick={onDone} style={{ marginTop: 40, padding: '16px 50px', background: 'gold', border: 'none', borderRadius: 50, color: '#000', fontWeight: 900, cursor: 'pointer', animation: 'fadeUp 0.5s ease both', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}>BẮT ĐẦU CHƠI →</button>}
      </div>
    </div>
  );
}

function RulesScreen({ onStart }) {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ maxWidth: 500, width: '100%', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: 'gold', marginBottom: 20 }}>LUẬT CHƠI</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 35 }}>
          {[{ icon: '🎮', title: 'Visual Novel', desc: '4 kịch bản thực tế, quyết định tương lai GearX.' }, { icon: '🧠', title: 'Tư duy Triết học', desc: 'Quyết định phản ánh lý thuyết Mác–Lênin.' }, { icon: '⚡', title: 'Điểm số', desc: 'Đúng +50, Sai -30. Combo thưởng thêm điểm.' }, { icon: '🏆', title: 'Xếp hạng', desc: 'Tính toán kỹ lưỡng để đạt hạng S.' }].map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, textAlign: 'left' }}>
               <span style={{ fontSize: 24 }}>{r.icon}</span>
               <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, margin: '8px 0' }}>{r.title}</p>
               <p style={{ color: '#9ca3af', fontSize: 11, lineHeight: 1.4 }}>{r.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={onStart} style={{ width: '100%', padding: '18px', background: 'gold', border: 'none', borderRadius: 15, color: '#000', fontWeight: 900, cursor: 'pointer', boxShadow: '0 5px 15px rgba(212,175,55,0.3)' }}>TIẾP TỤC</button>
      </div>
    </div>
  );
}

function GameScreen({ scenario, onChoice, emotion }) {
  const [step, setStep] = useState('context');
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    if (step === 'dialogue') {
      let i = 0;
      const t = setInterval(() => {
        i++; setDisplayText(scenario.dialogue.slice(0, i));
        if (i >= scenario.dialogue.length) { clearInterval(t); setTimeout(() => setStep('choices'), 800); }
      }, 30);
      return () => clearInterval(t);
    }
  }, [step]);

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${scenario.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)' }} />
      {step === 'context' && (
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, background: 'rgba(0,0,0,0.6)' }}>
          <div style={{ maxWidth: 600, textAlign: 'center', padding: 35, animation: 'fadeUp 0.8s ease both' }}>
            <p style={{ color: 'gold', fontSize: 13, fontWeight: 900, marginBottom: 15, letterSpacing: 2 }}>{scenario.act}</p>
            <h2 style={{ fontSize: 32, marginBottom: 25, fontWeight: 800 }}>{scenario.title}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d1d5db', marginBottom: 40 }} className="vn-text-shadow">{scenario.context}</p>
            <button onClick={() => setStep('dialogue')} style={{ padding: '14px 45px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 15px rgba(212,175,55,0.4)' }}>TIẾP TỤC →</button>
          </div>
        </div>
      )}
      {(step === 'dialogue' || step === 'choices') && (
        <>
          <TransparentSprite portraitKey={scenario.character.portrait} side={scenario.character.side} speaking={step === 'dialogue'} emotion={emotion} />
          <TransparentSprite portraitKey="coo" side={scenario.character.side === 'left' ? 'right' : 'left'} speaking={step === 'choices'} emotion={emotion} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '0 10%' }}>
            {emotion === 'correct' && <div style={{ position: 'absolute', top: '25%', fontSize: 55, fontWeight: 900, color: 'gold', textShadow: '0 0 25px gold', animation: 'fadeUp 0.5s ease' }}>SÁNG SUỐT!</div>}
            {emotion === 'wrong' && <div style={{ position: 'absolute', top: '25%', fontSize: 55, fontWeight: 900, color: '#f87171', textShadow: '0 0 25px #f87171', animation: 'fadeUp 0.5s ease' }}>SAI LẦM!</div>}
            
            <div style={{ maxWidth: 700, textAlign: 'center', marginBottom: step === 'choices' ? 40 : 60 }}><p className="vn-text-shadow" style={{ fontSize: 26, fontWeight: 600, color: '#fff', lineHeight: 1.6 }}>{displayText}</p></div>
            {step === 'choices' && !emotion && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 550, animation: 'fadeUp 0.4s ease both' }}>
                <p style={{ color: 'gold', fontSize: 12, fontWeight: 900, textAlign: 'center', marginBottom: 8, letterSpacing: 1 }}>ĐƯA RA QUYẾT ĐỊNH CHIẾN LƯỢC:</p>
                {scenario.choices.map((c, i) => (
                  <button key={i} onClick={() => onChoice(i)} className="choice-btn" style={{ padding: '18px 25px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 15, color: '#fff', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}>{c.text}</button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ResultScreen({ choice, onNext }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: choice.isCorrect ? 'rgba(6, 32, 22, 0.9)' : 'rgba(45, 10, 10, 0.9)' }}>
      <div style={{ maxWidth: 550, padding: 40, animation: 'fadeUp 0.5s ease both' }}>
        <h2 style={{ fontSize: 32, color: choice.isCorrect ? '#4ade80' : '#f87171', marginBottom: 25, fontWeight: 800 }}>{choice.resultTitle}</h2>
        <p style={{ fontSize: 19, lineHeight: 1.7, marginBottom: 45, color: '#e5e7eb' }}>{choice.result}</p>
        <button onClick={onNext} style={{ padding: '15px 45px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>BÀI HỌC TRIẾT HỌC →</button>
      </div>
    </div>
  );
}

function LessonScreen({ choice, onNext, isLast }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'rgba(10, 13, 20, 0.95)' }}>
      <div style={{ maxWidth: 550, padding: 45, background: 'rgba(255,255,255,0.03)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', animation: 'fadeUp 0.5s ease both' }}>
        <p style={{ color: 'gold', fontSize: 14, fontWeight: 900, marginBottom: 15, letterSpacing: 1.5 }}>{choice.concept}</p>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#d1d5db', marginBottom: 45 }}>{choice.lesson}</p>
        <button onClick={onNext} style={{ padding: '15px 45px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>{isLast ? 'KẾT THÚC' : 'TIẾP TỤC'}</button>
      </div>
    </div>
  );
}

function EndScreen({ score, onRestart }) {
  let rank = 'C';
  let remark = 'Bạn cần trau dồi thêm về thế giới quan duy vật biện chứng để quản trị doanh nghiệp hiệu quả hơn.';
  let color = '#f87171';
  if (score >= 200) { rank = 'S'; remark = 'Tuyệt vời! Bạn là một bậc thầy tư duy duy vật biện chứng. GearX chắc chắn sẽ thống trị kỷ nguyên AI dưới sự dẫn dắt của bạn!'; color = 'gold'; }
  else if (score >= 150) { rank = 'A'; remark = 'Rất tốt! Quyết định của bạn cho thấy sự nhạy bén và thấu hiểu sâu sắc mối quan hệ giữa công nghệ và con người.'; color = '#4ade80'; }
  else if (score >= 80) { rank = 'B'; remark = 'Khá tốt. Bạn đã nắm được những nguyên lý cơ bản, nhưng cần quyết đoán hơn trong những tình huống mâu thuẫn phức tạp.'; color = '#60a5fa'; }

  return (
     <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ animation: 'fadeUp 1s ease both', maxWidth: 600, padding: 30 }}>
        <h2 style={{ fontSize: 24, color: '#9ca3af', marginBottom: 15, letterSpacing: 3 }}>KẾT THÚC HÀNH TRÌNH</h2>
        <div style={{ fontSize: 120, fontWeight: 900, color: color, textShadow: `0 0 40px ${color}44`, lineHeight: 1, marginBottom: 15 }}>{rank}</div>
        <p style={{ fontSize: 32, marginBottom: 25, fontWeight: 800 }}>{score} ĐIỂM CHIẾN LƯỢC</p>
        <p style={{ fontSize: 19, lineHeight: 1.7, color: '#d1d5db', marginBottom: 50, fontStyle: 'italic' }}>"{remark}"</p>
        <button onClick={onRestart} style={{ padding: '18px 70px', background: '#fff', color: '#000', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 30px rgba(255,255,255,0.2)' }}>CHƠI LẠI</button>
      </div>
    </div>
  );
}