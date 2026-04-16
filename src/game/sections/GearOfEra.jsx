import { useState, useEffect, useRef } from 'react';

/* ═══ CHARACTER PORTRAITS ════════════════════════════ */
const PORTRAITS = {
  minh: '/images/char-minh.png',
  friend_rich: '/images/char-rich.png',
  boss: '/images/char-boss.png',
  friend_hometown: '/images/char-hometown.png',
  boy_que: '/images/boy_que.png',
};

const SCENARIOS = [
  {
    id: 1, act: 'CHƯƠNG 1', title: 'Minh của ngày đầu', tag: '🏠 Ký túc xá - Tuần 1',
    image: '/images/bg-dorm.png',
    context: 'Ký túc xá, tuần đầu nhập học. Tiếng xe cộ ồn ào ngoài cửa sổ. Minh vừa lên thành phố. Phòng trọ chật, tiền ít, nhưng lòng đầy hào hứng với cuộc sống sinh viên.',
    character: { name: 'Thành (Bạn cùng phòng)', portrait: 'friend_rich', side: 'right' },
    dialogue: '"Nay đi quán cà phê "hot trend" đắt tiền để check-in đi Minh! Chỗ này mới nổi, chỉ khoảng 100k một ly thôi. Quẩy đi!"',
    choices: [
      { 
        label: 'A', text: '"Mình gọi nước lọc thôi, tụi bạn cứ uống vui vẻ nhé."', 
        type: 'integrity',
        resultTitle: 'Minh vẫn là Minh', 
        result: 'Bạn cười xòa, sống đúng với hoàn cảnh của mình. Lòng nhẹ nhõm dù ví tiền eo hẹp.', 
        concept: 'Tồn tại xã hội quyết định Ý thức', 
        lesson: 'Lúc này, Minh vẫn giữ được bản ngã chân phương của mình.',
        score: 50 
      },
      { 
        label: 'B', text: 'Mở app vay tạm tiền mua ly nước đắt nhất để chụp ảnh cùng mọi người', 
        type: 'change',
        resultTitle: 'Bắt đầu chạy theo hình thức', 
        result: 'Ly nước lung linh trên ảnh, nhưng gánh nặng nợ nần bắt đầu nhen nhóm. Minh bắt đầu bị cuốn vào lối sống thành thị.', 
        concept: 'Thay đổi Tồn tại xã hội', 
        lesson: 'Khi môi trường sống thay đổi, ý thức bắt đầu có những sự biến chuyển đầu tiên.',
        score: 10 
      },
    ],
  },
  {
    id: 2, act: 'CHƯƠNG 2', title: 'Môi trường bắt đầu "thấm"', tag: '💼 Công ty thực tập - 6 tháng sau',
    image: '/images/bg-office.png',
    context: '6 tháng sau. Minh lọt vào nhóm bạn "rich kid" và thực tập tại một công ty lớn. Ánh đèn văn phòng sáng chói. Xung quanh toàn đồ hiệu và những câu chuyện về "vốn liếng", "quan hệ".',
    character: { name: 'Sếp (Giám đốc)', portrait: 'boss', side: 'right' },
    dialogue: '"Minh này, em chỉnh sửa báo cáo doanh thu "đẹp" hơn thực tế một chút nhé. Để dễ lùa khách hàng ký hợp đồng lớn ấy mà. Sếp bảo kê rồi, không ai phát hiện đâu!"',
    choices: [
      { 
        label: 'A', text: 'Từ chối khéo, nộp đúng số liệu thật', 
        type: 'integrity',
        resultTitle: 'Giữ vững lương tâm', 
        result: 'Sếp không hài lòng, nhưng bạn thấy thanh thản vì không làm trái lương tâm. Minh vẫn đang cố gắng giữ mình.', 
        concept: 'Tính độc lập tương đối của Ý thức', 
        lesson: 'Ý thức cũ vẫn có sức mạnh kháng cự sự tác động tiêu cực từ hoàn cảnh vật chất mới.',
        score: 50 
      },
      { 
        label: 'B', text: 'Tặc lưỡi sửa một chút — "Chỉ là cách trình bày thôi mà"', 
        type: 'adaptation',
        resultTitle: 'Sự thỏa hiệp', 
        result: 'Bạn tự nhủ chỉ là một chút thôi. Nhưng sự trung thực bắt đầu bị lung lay trước áp lực công việc.', 
        concept: 'Sự đồng hóa của ý thức', 
        lesson: 'Đời sống vật chất đang từ từ thấm vào từng lựa chọn nhỏ nhất.',
        score: 30 
      },
      { 
        label: 'C',  text: 'Chủ động "vẽ" thêm số liệu cho mượt', 
        type: 'change',
        resultTitle: 'Thương trường là chiến trường', 
        result: 'Bạn nhận được lời khen từ sếp. Minh đã bắt đầu chấp nhận luật chơi thực dụng của xã hội mới.', 
        concept: 'Tồn tại xã hội quyết định Ý thức', 
        lesson: 'Hoàn cảnh vật chất đã hoàn toàn thay đổi cách nhìn nhận đạo đức của Minh.',
        score: 10 
      },
    ],
  },
  {
    id: 3, act: 'CHƯƠNG 2', title: 'Tiếng vọng từ quá khứ', tag: '📱 Tin nhắn từ quê nhà',
    image: '/images/bg-cafe.png',
    context: 'Tối đó về nhà, người bạn thân cởi trần tắm mưa ngày xưa ở quê nhắn tin mượn một ít tiền đóng học phí gấp vì gia đình gặp chuyện.',
    character: { name: 'Tùng (Bạn ở quê)', portrait: 'boy_que', side: 'left' },
    dialogue: '"Minh ơi, nhà tớ kẹt quá. Cậu cho tớ mượn một ít nộp học phí được không? Tớ sẽ cố gắng trả sớm..."',
    choices: [
      { 
        label: 'A', text: 'Chuyển khoản ngay phần lớn số tiền mình có', 
        type: 'integrity',
        resultTitle: 'Tình bạn xuyên thời gian', 
        result: 'Dù bản thân cũng đang kẹt tiền nhà, bạn vẫn ưu tiên người bạn cũ. Minh vẫn còn đó nét chân thành ngày nào.', 
        concept: 'Bản chất con người', 
        lesson: 'Những giá trị tinh thần vẫn có thể vượt qua áp lực vật chất.',
        score: 50 
      },
      { 
        label: 'B',  text: '"Để cuối tháng mình có lương rồi tính nhé"', 
        type: 'adaptation',
        resultTitle: 'Sự ưu tiên mới', 
        result: 'Trong tài khoản vẫn dư dả, nhưng bạn chọn cách trì hoãn. Minh đã bắt đầu tính toán hơn cho lợi ích cá nhân.', 
        concept: 'Sự tha hóa nhẹ', 
        lesson: 'Ý thức bắt đầu bị chi phối bởi lợi ích vật chất cá nhân trước mắt.',
        score: 30 
      },
      { 
        label: 'C',  text: 'Đọc tin nhắn (Seen) nhưng… lờ đi không trả lời', 
        type: 'change',
        resultTitle: 'Quen với hào nhoáng', 
        result: 'Bạn tiếp tục lướt xem ảnh du lịch của đồng nghiệp và quên hẳn tin nhắn. Minh đã thực sự đổi thay.', 
        concept: 'Hoàn thiện tha hóa', 
        lesson: 'Địa vị xã hội mới đã xóa nhòa những sợi dây liên kết trong sáng cũ.',
        score: 0 
      },
    ],
  },
  {
    id: 4, act: 'CHƯƠNG 3', title: 'Nhìn lại gương', tag: '🏢 Cuối năm thứ 2',
    image: '/images/bg-office.png',
    context: 'Cuối năm 2. Minh nay đã có mức thu nhập tốt, khoác lên người những bộ đồ đắt tiền, chính thức hòa nhập vào nhóm "elite" của trường.',
    character: { name: 'Bảo (Người bạn cũ)', portrait: 'friend_hometown', side: 'left' },
    dialogue: '"Anh Minh ơi, sếp bảo không thích dân tỉnh lẻ lúa lúa, đưa em vào sẽ làm thấp giá trị kỳ thực tập của anh. Anh có thể nói đỡ giúp em được không?"',
    choices: [
      { 
        label: 'A', text: 'Dõng dạc bảo vệ bạn mình và rút đơn nếu cần', 
        type: 'integrity',
        resultTitle: 'Thức tỉnh', 
        result: 'Bạn dám bước ra để xây dựng một con đường mới tôn trọng giá trị con người. Ý thức đã chiến thắng hoàn cảnh.', 
        concept: 'Sự giác ngộ ý thức', 
        lesson: 'Ý thức xã hội có khả năng tác động ngược lại và cải tạo tồn tại xã hội.',
        score: 60 
      },
      { 
        label: 'B',  text: '"Để mình hỏi thử sếp xem sao" rồi… im lặng phớt lờ', 
        type: 'adaptation',
        resultTitle: 'Sự hèn nhát thầm lặng', 
        result: 'Bạn sợ hỏng tiền đồ cá nhân nên đã chọn cách im lặng. Minh nay đã hoàn toàn thỏa hiệp với thực tại.', 
        concept: 'Sự giằng xé', 
        lesson: 'Ý thức đã dần bị đồng hóa hoàn toàn bởi môi trường thực dụng.',
        score: 20 
      },
      { 
        label: 'C',  text: '"Bạn nên tự nộp CV đi, chỗ này chỉ tuyển người profile đẹp thôi"', 
        type: 'change',
        resultTitle: 'Sự trôi dạt hoàn toàn', 
        result: 'Bạn nhìn người bạn cũ bằng ánh mắt kẻ cả. Minh trong gương giờ đã là một người hoàn toàn khác.', 
        concept: 'Tha hóa hoàn toàn', 
        lesson: 'Tồn tại xã hội mới đã hoàn toàn tái cấu trúc lại ý thức con người.',
        score: 0 
      },
    ],
  },
];

/* ═══ CANVAS SMART TRANSPARENCY ══════════════════════ */
function TransparentSprite({ portraitKey, side, speaking, emotion }) {
  const src = PORTRAITS[portraitKey];
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample background from the top corner (usually empty in portraits)
      const br = data[0], bg = data[1], bb = data[2];
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        
        // Calculate color distance from the sampled background pixel (black)
        const dist = Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);
        
        // With black bg, we can focus on removing dark/pure black pixels to avoid "white edges"
        const isPureBlack = r < 20 && g < 20 && b < 20;

        if (dist < 35 || isPureBlack) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src]);

  const positioning = side === 'left' 
    ? { left: '1%', transform: speaking ? 'scale(1.1)' : 'scale(1)' } 
    : { right: '1%', transform: speaking ? 'scale(1.1)' : 'scale(1)' };

  return (
    <div style={{
      position: 'absolute', bottom: 0, height: '75vh', width: 'auto', zIndex: speaking ? 10 : 5,
      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      filter: speaking ? 'brightness(1.1) drop-shadow(0 0 30px rgba(255,255,255,0.2))' : 'brightness(0.4) grayscale(0.5)',
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
  const [counts, setCounts] = useState({ integrity: 0, adaptation: 0, change: 0 });
  const [emotion, setEmotion] = useState(null); 
  const [animKey, setAnimKey] = useState(0);

  const scenario = SCENARIOS[idx];

  const restart = () => {
    setPhase('cinematic');
    setIdx(0);
    setPicked(null);
    setScore(0);
    setCounts({ integrity: 0, adaptation: 0, change: 0 });
    setEmotion(null);
    setAnimKey(prev => prev + 1);
  };

  const handleChoice = (i) => {
    const c = scenario.choices[i]; 
    setPicked(i);
    setCounts(prev => ({ ...prev, [c.type]: prev[c.type] + 1 }));
    setScore(s => s + (c.score || 0));
    setEmotion(c.type === 'integrity' ? 'correct' : 'adaptation');
    setTimeout(() => { 
      setAnimKey(k => k + 1); 
      setPhase('result'); 
      setEmotion(null); 
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#050505', color: '#fff', overflow: 'clip', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.1 } to { opacity: 1 } }
        @keyframes pulse-bg { from { opacity: 0.2 } to { opacity: 0.5 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
        
        .vn-text-shadow { text-shadow: 0 4px 12px rgba(0,0,0,1); }
        .choice-btn:hover { background: rgba(255,255,255,0.15) !important; border-color: gold !important; transform: scale(1.02); }
        .marx-card { background: rgba(20, 20, 20, 0.95); border: 2px solid gold; box-shadow: 0 0 30px rgba(212, 175, 55, 0.2); }
      `}</style>

      <StarField />
      
      <div key={animKey} style={{ height: '100%', position: 'relative' }}>
        {phase === 'cinematic' && <Cinematic onDone={() => setPhase('rules')} />}
        {phase === 'rules' && <RulesScreen onStart={() => setPhase('game')} />}
        {phase === 'game' && <GameScreen scenario={scenario} onChoice={handleChoice} emotion={emotion} />}
        {phase === 'result' && <ResultScreen choice={scenario.choices[picked]} 
          onNext={() => {
            if (idx + 1 < SCENARIOS.length) { 
              setIdx(idx + 1); 
              setPicked(null); 
              setPhase('game'); 
            } else {
              setPhase('end');
            }
          }} 
        />}
        {phase === 'end' && <EndScreen counts={counts} onRestart={restart} />}
      </div>
    </div>
  );
}

function Cinematic({ onDone }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "DRIFT — Khi đời sống đổi thay. Minh, một sinh viên tỉnh lẻ lên thành phố với trái tim chân phương. Nhưng giữa dòng xoáy hào nhoáng của vật chất và danh vọng, liệu Minh có giữ được chính mình? Bạn sẽ là người đưa ra các lựa chọn định hình ý thức của Minh.";
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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div style={{ maxWidth: 850 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: 'gold', marginBottom: 30, letterSpacing: 8, animation: 'fadeUp 1s ease both' }}>DRIFT</h1>
        <p style={{ fontSize: 20, lineHeight: 1.8, color: '#e5e7eb', minHeight: '6em', fontStyle: 'italic' }}>{displayText}</p>
        {complete && <button onClick={onDone} style={{ marginTop: 40, padding: '18px 60px', background: 'gold', border: 'none', borderRadius: 50, color: '#000', fontWeight: 900, cursor: 'pointer', animation: 'fadeUp 0.5s ease both', boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>BƯỚC VÀO DÒNG CHẢY →</button>}
      </div>
    </div>
  );
}

function RulesScreen({ onStart }) {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ maxWidth: 600, width: '100%', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, padding: '50px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: 'gold', marginBottom: 30 }}>KỊCH BẢN GAME</h2>
        <div style={{ textAlign: 'left', marginBottom: 40, color: '#d1d5db', lineHeight: 1.8 }}>
          <p>• <b>Nhân vật:</b> Minh - Sinh viên hiền lành, trung thực.</p>
          <p>• <b>Nhiệm vụ:</b> Đưa ra các quyết định trước những cám dỗ và thay đổi của đời sống.</p>
          <p>• <b>Kết quả:</b> Mỗi lựa chọn sẽ định hình tương lai và ý thức của Minh theo quy luật của triết học Mác - Lênin.</p>
        </div>
        <button onClick={onStart} style={{ width: '100%', padding: '20px', background: 'gold', border: 'none', borderRadius: 20, color: '#000', fontWeight: 900, cursor: 'pointer', fontSize: 18 }}>BẮT ĐẦU HÀNH TRÌNH</button>
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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${scenario.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25)' }} />
      {step === 'context' && (
        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, background: 'rgba(0,0,0,0.7)' }}>
          <div style={{ maxWidth: 650, textAlign: 'center', padding: 40, animation: 'fadeUp 0.8s ease both' }}>
            <p style={{ color: 'gold', fontSize: 14, fontWeight: 900, marginBottom: 15, letterSpacing: 3 }}>{scenario.act}: {scenario.tag}</p>
            <h2 style={{ fontSize: 36, marginBottom: 25, fontWeight: 900 }}>{scenario.title}</h2>
            <p style={{ fontSize: 19, lineHeight: 1.8, color: '#d1d5db', marginBottom: 45 }}>{scenario.context}</p>
            <button onClick={() => setStep('dialogue')} style={{ padding: '16px 50px', background: 'gold', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer' }}>TIẾP TỤC →</button>
          </div>
        </div>
      )}
      {(step === 'dialogue' || step === 'choices') && (
        <>
          <TransparentSprite portraitKey={scenario.character.portrait} side={scenario.character.side} speaking={step === 'dialogue'} />
          <TransparentSprite portraitKey="minh" side={scenario.character.side === 'left' ? 'right' : 'left'} speaking={step === 'choices'} />
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '0 12%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)' }}>
            <div style={{ maxWidth: 800, textAlign: 'center', marginBottom: step === 'choices' ? 40 : 80 }}>
              <p style={{ color: 'gold', fontSize: 12, fontWeight: 900, marginBottom: 10, letterSpacing: 2 }}>{scenario.character.name}:</p>
              <p className="vn-text-shadow" style={{ fontSize: 28, fontWeight: 600, color: '#fff', lineHeight: 1.6 }}>{displayText}</p>
            </div>
            
            {step === 'choices' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%', maxWidth: 600, animation: 'fadeUp 0.4s ease both' }}>
                <p style={{ color: 'gold', fontSize: 13, fontWeight: 900, textAlign: 'center', marginBottom: 5 }}>LỰA CHỌN CỦA MINH:</p>
                {scenario.choices.map((c, i) => (
                  <button key={i} onClick={() => onChoice(i)} className="choice-btn" style={{ padding: '22px 30px', background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, color: '#fff', fontWeight: 600, cursor: 'pointer', transition: '0.3s', textAlign: 'left', fontSize: 17 }}>
                    <span style={{ marginRight: 15 }}>{c.icon}</span> {c.text}
                  </button>
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
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'rgba(0,0,0,0.9)' }}>
      <div style={{ maxWidth: 600, padding: 50, animation: 'fadeUp 0.5s ease both', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 32, background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: 36, color: 'gold', marginBottom: 30, fontWeight: 900 }}>{choice.resultTitle}</h2>
        <p style={{ fontSize: 20, lineHeight: 1.8, marginBottom: 50, color: '#e5e7eb' }}>{choice.result}</p>
        <button onClick={onNext} style={{ padding: '18px 50px', background: '#fff', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', color: '#000' }}>TIẾP TỤC →</button>
      </div>
    </div>
  );
}

/* LessonScreen removed as requested */

function EndScreen({ counts, onRestart }) {
  let title = "🌟 KẾT CỤC 1: VẪN LÀ MÌNH";
  let message = "Nhận diện được sự độc hại của môi trường, Minh không chỉ giữ được bản ngã mà còn dám bước ra để xây dựng một con đường mới. Ý thức đã chiến thắng hoàn cảnh.";
  let card = "Ý thức xã hội có tính độc lập tương đối. Sự giác ngộ giúp con người không đầu hàng hoàn cảnh vật chất, mà quay lại hành động để cải tạo thực tại.";
  let color = "#4ade80";

  if (counts.adaptation + counts.change >= 3) {
    title = "🥀 KẾT CỤC 3: MINH ĐÃ TRÔI";
    message = "Không có quyết định sinh tử nào đánh gục ta — chỉ là ngàn lần ta tự động buông tay trước mãnh lực của đồng tiền và danh vọng. Minh trong gương giờ đã là một người khác.";
    card = "Không phải ý thức quyết định đời sống mà chính đời sống quyết định ý thức. Ý thức xã hội thường lạc hậu hơn tồn tại xã hội. Ta dễ dàng tha hóa bản ngã trước khi kịp nhận ra môi trường vật chất xung quanh đã hoàn toàn đổi thay.";
    color = "#f87171";
  } else if (counts.integrity < 3) {
    title = "⚖️ KẾT CỤC 2: MINH ĐANG GIỮA DÒNG";
    message = "Phần lớn chúng ta đều ở đây — không hoàn toàn mất đi bản ngã trong sáng cũ, nhưng cũng đã dần thỏa hiệp và quen thuật với sự thực dụng của thực tại mới.";
    card = "Sự giằng xé giữa tàn dư của tư duy cũ và hoàn cảnh vật chất mới. Ý thức chưa hoàn toàn bị đồng hóa, nhưng cũng chưa đủ sức mạnh để thay đổi tồn tại xã hội.";
    color = "gold";
  }

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
      <div style={{ animation: 'fadeUp 1s ease both', maxWidth: 800, padding: 40 }}>
        <h2 style={{ fontSize: 22, color: '#9ca3af', marginBottom: 20, letterSpacing: 4 }}>KẾT THÚC HÀNH TRÌNH</h2>
        <div style={{ fontSize: 48, fontWeight: 900, color: color, textShadow: `0 0 40px ${color}33`, lineHeight: 1.2, marginBottom: 30 }}>{title}</div>
        <p style={{ fontSize: 22, lineHeight: 1.8, color: '#d1d5db', marginBottom: 50, fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: 30, borderRadius: 20 }}>"{message}"</p>
        
        <div className="marx-card" style={{ padding: '30px', textAlign: 'left', borderLeft: `8px solid ${color}`, background: 'rgba(0,0,0,0.5)', marginBottom: 50 }}>
          <p style={{ color: 'gold', fontWeight: 900, fontSize: 13, marginBottom: 15, letterSpacing: 2 }}>🃏 GÓC NHÌN CỦA MARX</p>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#fff' }}>"{card}"</p>
        </div>

        <button onClick={onRestart} style={{ padding: '18px 70px', background: 'gold', color: '#000', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 40px rgba(212,175,55,0.3)', fontSize: 18 }}>CHƠI LẠI</button>
      </div>
    </div>
  );
}