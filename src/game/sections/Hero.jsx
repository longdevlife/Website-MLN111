// Hero section – redesigned to match reference layout
export default function Hero() {
  return (
    <section className="hero-v2" id="hero">
      {/* Background painting */}
      <div className="hero-v2-bg" />

      {/* Dark gradient overlay (stronger on left for readability) */}
      <div className="hero-v2-overlay" />

      {/* Portrait image on the right */}
      <div className="hero-v2-portrait-wrap">
        <img
          src="https://i.pinimg.com/736x/c2/3d/91/c23d912b44b8ead2e34d1aa7608d12a5.jpg"
          alt="Karl Marx portrait"
          className="hero-v2-portrait"
        />
        <div className="hero-v2-portrait-fade" />
      </div>

      {/* Left content */}
      <div className="hero-v2-content">
        {/* Top badge */}
        <div className="hero-v2-badge">
          <span>3W_MLN111_07</span>
          <span className="badge-dot">·</span>
          <span>NHÓM 6</span>
        </div>

        {/* Headline */}
        <h1 className="hero-v2-title">
          <span className="hero-v2-title-sm">Triết học</span>
          <span className="hero-v2-title-lg">Mác–Lênin</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-v2-subtitle">Tồn tại xã hội &amp; Ý thức xã hội</p>

        {/* Description */}
        <p className="hero-v2-desc">
          Phân tích toàn bộ sinh hoạt vật chất và điều kiện sinh hoạt của xã
          hội, mối quan hệ biện chứng giữa tồn tại xã hội và ý thức xã hội
          trong chủ nghĩa Mác – Lênin.
        </p>

        {/* CTA */}
        <div className="hero-v2-actions">
          <a href="#quiz" className="hero-v2-btn primary">
            Chơi Quiz ngay <span className="btn-arrow">→</span>
          </a>
          <a href="#ton-tai" className="hero-v2-btn secondary">
            Khám phá lý thuyết
          </a>
        </div>

        {/* Chapter pills */}
        <div className="hero-v2-pills">
          <a href="#ton-tai" className="hero-v2-pill">📖 Tiết 46 – Tồn tại XH</a>
          <a href="#y-thuc" className="hero-v2-pill">🧠 Tiết 47 – Ý thức XH</a>
          <a href="#bien-chung" className="hero-v2-pill">⚡ Tiết 48 – Biện chứng</a>
        </div>
      </div>
    </section>
  );
}
