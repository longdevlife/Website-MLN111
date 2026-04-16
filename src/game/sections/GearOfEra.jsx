import { useState, useEffect, useRef } from 'react';

/* ═══ CHARACTER PORTRAITS ════════════════════════════ */
const PORTRAITS = {
  minh: '/images/char-minh.png',
  friend_rich: '/images/char-rich.png',
  boss: '/images/char-boss.png',
  friend_hometown: '/images/char-hometown.png',
};

const SCENARIOS = [
  {
    id: 1, act: 'CHƯƠNG 1', title: 'Minh của ngày đầu', tag: '🏠 Ký túc xá - Tuần 1',
    image: '/images/bg-dorm.png',
    context: 'Minh vừa lên thành phố nhập học. Phòng trọ chật hẹp, tiền bạc eo hẹp, nhưng lòng đầy hào hứng. Cậu vẫn còn giữ nguyên nét giản dị, thật thà từ quê nhà.',
    character: { name: 'Thành (Bạn cùng phòng)', portrait: 'friend_rich', side: 'right' },
    dialogue: '"Nay đi cafe "sang chảnh" mừng tuần đầu nhập học đi Minh! Chỗ này mới nổi, view đẹp lắm, chỉ khoảng 100k một ly thôi. Quẩy đi!"',
    choices: [
      { 
        label: 'A', icon: '🍃', text: '"Mình uống nước lọc thôi, tụi bạn cứ đi vui nhé"', 
        type: 'integrity',
        resultTitle: 'Sự kiên định đầu tiên', 
        result: 'Bạn ở lại phòng, ăn gói mì tôm và đọc lại giáo trình. Minh vẫn là Minh, giản dị và trung thực với hoàn cảnh bản thân.', 
        concept: 'Tồn tại xã hội quyết định Ý thức', 
        lesson: 'Lúc này, hoàn cảnh sinh hoạt vật chất còn khó khăn là yếu tố chính chi phối ý thức và sự lựa chọn của Minh.',
        score: 50 
      },
      { 
        label: 'B', icon: '💳', text: 'Quẹt thẻ dù biết sẽ thiếu tiền ăn cuối tháng', 
        type: 'adaptation',
        resultTitle: 'Bước chân vào "thành thị"', 
        result: 'Một buổi cafe hào hứng, nhưng cuối tháng Minh phải nhịn ăn. Những thay đổi đầu tiên về ý thức bắt đầu nảy mầm từ sức ép môi trường mới.', 
        concept: 'Tồn tại xã hội biến đổi', 
        lesson: 'Khi môi trường sống thay đổi, ý thức bắt đầu có những sự điều chỉnh để thích nghi, đôi khi là hy sinh các giá trị cũ.',
        score: 30 
      },
    ],
  },
  {
    id: 2, act: 'CHƯƠNG 2', title: 'Môi trường bắt đầu "thấm"', tag: '💼 Công ty thực tập - 6 tháng sau',
    image: '/images/bg-office.png',
    context: '6 tháng trôi qua, Minh đã vào nhóm bạn "sang" và thực tập tại một công ty lớn. Cậu bắt đầu thấy "lạc lõng" trước những món đồ hiệu và các mối quan hệ xã giao.',
    character: { name: 'Sếp (Giám đốc)', portrait: 'boss', side: 'right' },
    dialogue: '"Minh này, báo cáo này tốt rồi, nhưng em chỉnh số liệu "mượt" hơn chút để gây ấn tượng với khách hàng nhé. Chỉ là cách trình bày thôi mà, ai cũng vậy cả!"',
    choices: [
      { 
        label: 'A', icon: '⚖️', text: 'Từ chối, làm đúng số liệu thật', 
        type: 'integrity',
        resultTitle: 'Giữ vững bản sắc', 
        result: 'Sếp không hài lòng, nhưng bạn thấy thanh thản. Tuy nhiên, sự "lạc lõng" giữa các đồng nghiệp ngày càng rõ rệt hơn.', 
        concept: 'Tính độc lập tương đối của Ý thức', 
        lesson: 'Dù tồn tại xã hội thay đổi, ý thức cũ vẫn có thể kháng cự nhờ vào sự tỉnh thức và nền tảng đạo đức vững vàng.',
        score: 50 
      },
      { 
        label: 'B', icon: '✨', text: 'Sửa một chút — "chỉ là trình bày thôi mà"', 
        type: 'adaptation',
        resultTitle: 'Sự thỏa hiệp âm thầm', 
        result: 'Báo cáo được khen ngợi. Bạn tự nhủ "ai cũng vậy", nhưng trong gương, Minh trông có chút khác lạ, không còn là cậu sinh viên ngày nào.', 
        concept: 'Ý thức thay đổi theo Tồn tại', 
        lesson: 'Điều kiện làm việc và lợi ích vật chất mới đang dần thay đổi thế giới quan và phương châm sống của con người.',
        score: 40 
      },
      { 
        label: 'C', icon: '🤝', text: 'Làm theo hoàn toàn — "ai cũng vậy cả"', 
        type: 'change',
        resultTitle: 'Hòa nhập hoàn toàn', 
        result: 'Minh trở thành "ngôi sao" mới. Cậu nhận ra sự trung thực đôi khi chỉ là rào cản trong môi trường đầy rẫy sự tô vẽ này.', 
        concept: 'Tồn tại xã hội quyết định Ý thức', 
        lesson: 'Khi hoàn cảnh sống thay đổi hoàn toàn, ý thức sẽ biến đổi để tương thích với phương thức sinh hoạt mới.',
        score: 10 
      },
    ],
  },
  {
    id: 3, act: 'CHƯƠNG 2', title: 'Tiếng vọng từ quê nhà', tag: '📱 Tin nhắn chờ',
    image: '/images/bg-cafe.png',
    context: 'Đang ngồi trong quán cafe sang trọng cùng nhóm bạn mới, Minh nhận được tin nhắn từ Tùng - người bạn thuở nhỏ ở quê.',
    character: { name: 'Tùng (Bạn ở quê)', portrait: 'friend_hometown', side: 'left' },
    dialogue: '"Minh ơi, dưới quê mất mùa quá, nhà tớ kẹt tiền học phí. Cậu có thể cho tớ mượn một ít được không? Qua tháng nhà tớ bán lúa tớ gửi lại ngay..."',
    choices: [
      { 
        label: 'A', icon: '🧧', text: 'Gửi ngay dù mình cũng đang cần', 
        type: 'integrity',
        resultTitle: 'Tình quê còn đọng', 
        result: 'Minh chấp nhận rời cuộc vui sớm để chuyển tiền. Một nửa tháng lương thực tập đã đi, nhưng lòng bạn ấm áp vì vẫn giữ được sự chân thành.', 
        concept: 'Ý thức tác động trở lại Tồn tại', 
        lesson: 'Những giá trị đạo đức bền vững có thể giúp con người vượt qua những lôi cuốn vật chất nhất thời.',
        score: 50 
      },
      { 
        label: 'B', icon: '⏳', text: '"Để tháng sau mình có lương rồi tính"', 
        type: 'adaptation',
        resultTitle: 'Sự trì hoãn khéo léo', 
        result: 'Bạn tiếp tục cuộc vui và quên bẵng đi. Tùng sau đó đã mượn được chỗ khác, nhưng sợi dây liên kết giữa hai người đã mờ đi một chút.', 
        concept: 'Sự tha hóa của ý thức', 
        lesson: 'Khi điều kiện sống thay đổi, những mối quan tâm cũ thường bị đẩy lùi phía sau các lợi ích hiện tại.',
        score: 30 
      },
      { 
        label: 'C', icon: '🌫️', text: 'Đọc rồi… không trả lời', 
        type: 'change',
        resultTitle: 'Cắt đứt quá khứ', 
        result: 'Minh cảm thấy phiền vì những rắc rối "nhà quê". Cậu lướt qua tin nhắn để quay lại với những câu chuyện về Stock và Connection.', 
        concept: 'Sự biến đổi bản chất của ý thức', 
        lesson: 'Địa vị xã hội mới đã thay đổi hoàn toàn cách con người nhìn nhận các quan hệ xã hội trong quá khứ.',
        score: 0 
      },
    ],
  },
  {
    id: 4, act: 'CHƯƠNG 3', title: 'Nhìn lại gương', tag: '🏢 Cuối năm thứ 2',
    image: '/images/bg-office.png',
    context: 'Minh giờ đã là một sinh viên "Elite", có việc làm tốt và nằm trong nhóm xuất sắc của trường. Một sinh viên năm nhất vừa từ quê lên đến nhờ bạn giúp đỡ.',
    character: { name: 'Bảo (Sinh viên năm nhất)', portrait: 'friend_hometown', side: 'left' },
    dialogue: '"Anh Minh ơi, em nghe nói công ty anh đang tuyển thực tập. Em cũng từ tỉnh lên, chưa có kinh nghiệm nhưng ham học lắm... Anh giúp em giới thiệu được không?"',
    choices: [
      { 
        label: 'A', icon: '🤝', text: 'Giới thiệu thẳng, nói thật về bạn', 
        type: 'integrity',
        resultTitle: 'Tìm lại chính mình', 
        result: 'Dù sếp không thích "dân tỉnh lẻ", bạn kiên quyết bảo vệ Bảo. Bạn thấy lại hình ảnh mình của năm nhất trong mắt cậu bé ấy.', 
        concept: 'Tỉnh thức trước sự thay đổi', 
        lesson: 'Con người có khả năng tự nhận thức và điều chỉnh ý thức để không bị hoàn cảnh hoàn toàn đồng hóa.',
        score: 60 
      },
      { 
        label: 'B', icon: '☁️', text: '"Để mình hỏi thử" rồi… quên mất', 
        type: 'adaptation',
        resultTitle: 'Sự trôi dạt vô hình', 
        result: 'Bạn không ác ý, nhưng những deadline và tiệc tùng đã xóa nhòa lời hứa. Bảo lặng lẽ rời đi, còn Minh vẫn tiếp tục vòng xoáy của mình.', 
        concept: 'Thích nghi thụ động', 
        lesson: 'Đa số sự thay đổi không đến từ quyết định lớn, mà từ ngàn lần nhỏ buông tay trước đời sống.',
        score: 40 
      },
      { 
        label: 'C', icon: '🚪', text: '"Bạn nên tự nộp CV đi, chỗ này khó lắm"', 
        type: 'change',
        resultTitle: 'Cánh cửa đóng sầm', 
        result: 'Bạn sợ ảnh hưởng hình ảnh "sang chảnh" của mình nếu bảo lãnh cho một cậu bé nghèo. Minh đã hoàn toàn trở thành một con người khác.', 
        concept: 'Hoàn thiện quá trình tha hóa', 
        lesson: 'Khi ý thức bị chiếm hữu hoàn toàn bởi các giá trị vật chất mới, con người có thể quay lưng với chính nguồn cội của mình.',
        score: 10 
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
        {phase === 'result' && <ResultScreen choice={scenario.choices[picked]} onNext={() => setPhase('lesson')} />}
        {phase === 'lesson' && <LessonScreen choice={scenario.choices[picked]} 
          onNext={() => {
            if (idx + 1 < SCENARIOS.length) { setIdx(idx + 1); setPicked(null); setPhase('game'); }
            else setPhase('end');
          }} isLast={idx === SCENARIOS.length - 1} />}
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
        <button onClick={onNext} style={{ padding: '18px 50px', background: '#fff', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', color: '#000' }}>Kiến thức triết học →</button>
      </div>
    </div>
  );
}

function LessonScreen({ choice, onNext, isLast }) {
  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#000' }}>
      <div className="marx-card" style={{ maxWidth: 650, padding: '60px 50px', borderRadius: 0, animation: 'fadeUp 0.6s ease both' }}>
        <h3 style={{ color: 'gold', fontSize: 24, fontWeight: 900, marginBottom: 30, letterSpacing: 4 }}>Kiến thức triết học</h3>
        <p style={{ color: 'gold', fontSize: 13, fontWeight: 900, marginBottom: 15, letterSpacing: 2 }}>"{choice.concept}"</p>
        <p style={{ fontSize: 20, lineHeight: 1.9, color: '#fff', marginBottom: 50, fontStyle: 'italic' }}>
          "{choice.lesson}"
        </p>
        <button onClick={onNext} style={{ padding: '15px 50px', background: 'gold', border: 'none', borderRadius: 0, fontWeight: 900, cursor: 'pointer', color: '#000' }}>
          {isLast ? 'XEM KẾT THÚC' : 'TIẾP TỤC'}
        </button>
      </div>
    </div>
  );
}

function EndScreen({ counts, onRestart }) {
  let title = "Vẫn là Minh";
  let condition = "Giữ vững giá trị";
  let message = "Đời sống đầy rẫy những thử thách, nhưng ý thức có thể kháng cự sự tha hóa nếu ta luôn tỉnh thức và giữ được bản sắc cốt lõi.";
  let color = "#4ade80";

  if (counts.change >= 2 || (counts.change >= 1 && counts.adaptation >= 2)) {
    title = "Minh đã trôi";
    condition = "Thích nghi thụ động";
    message = "Không có quyết định lớn nào làm con người thay đổi, chỉ là ngàn lần nhỏ buông tay trước đời sống. Minh đã trở thành một phần của hệ thống mà cậu từng xa lạ.";
    color = "#f87171";
  } else if (counts.adaptation >= 2 || counts.change >= 1) {
    title = "Minh đang giữa dòng";
    condition = "Lựa chọn lẫn lộn";
    message = "Phần lớn chúng ta đều ở đây — không hoàn toàn mất mình, cũng chưa hoàn toàn tỉnh. Cuộc chiến giữa thực tại và lý tưởng vẫn đang tiếp diễn.";
    color = "gold";
  }

  return (
     <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
      <div style={{ animation: 'fadeUp 1s ease both', maxWidth: 750, padding: 40 }}>
        <h2 style={{ fontSize: 22, color: '#9ca3af', marginBottom: 20, letterSpacing: 4 }}>KẾT THÚC</h2>
        <div style={{ fontSize: 72, fontWeight: 900, color: color, textShadow: `0 0 40px ${color}33`, lineHeight: 1.2, marginBottom: 10 }}>{title}</div>
        <p style={{ color: color, fontWeight: 900, fontSize: 14, marginBottom: 40, letterSpacing: 2 }}>[{condition}]</p>
        <p style={{ fontSize: 22, lineHeight: 1.8, color: '#d1d5db', marginBottom: 60, fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: 30, borderRadius: 20 }}>"{message}"</p>
        <button onClick={onRestart} style={{ padding: '20px 80px', background: 'gold', color: '#000', border: 'none', borderRadius: 50, fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 40px rgba(212,175,55,0.3)', fontSize: 18 }}>CHƠI LẠI</button>
      </div>
    </div>
  );
}