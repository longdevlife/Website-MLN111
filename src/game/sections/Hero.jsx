// Hero section – landing banner
export default function Hero() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 7}s`,
    duration: `${6 + Math.random() * 6}s`,
  }));

  return (
    <section className="hero" id="hero">
      {/* Floating particles */}
      <div className="hero-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </div>

      <span className="hero-tag">📚 Triết học Mác – Lê-nin &nbsp;|&nbsp; Tiết 46 – 48</span>

      <h1 className="hero-title">
        Tồn tại xã hội &amp;<br />
        <span className="gold-text">Ý thức xã hội</span>
      </h1>

      <p className="hero-subtitle">
        "Không phải ý thức của con người quyết định tồn tại của họ, mà ngược lại,
        chính tồn tại xã hội của họ quyết định ý thức của họ."
        <br />— <em>C. Mác</em>
      </p>

      <div className="hero-chapters">
        <a href="#ton-tai" className="hero-chapter-pill">📖 Tiết 46 – Tồn tại XH</a>
        <a href="#y-thuc" className="hero-chapter-pill">🧠 Tiết 47 – Ý thức XH</a>
        <a href="#bien-chung" className="hero-chapter-pill">⚡ Tiết 48 – Biện chứng</a>
      </div>

      <a href="#ton-tai" className="hero-cta">
        Khám phá ngay ↓
      </a>
    </section>
  );
}
