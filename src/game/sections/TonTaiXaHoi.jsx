import ExpandCard from '../../components/ExpandCard';

export default function TonTaiXaHoi() {
  return (
    <section id="ton-tai">
      <div className="page-section">
        {/* Header */}
        <div className="section-header reveal">
          <span className="section-label">Tiết 46 – Phần 3.4.1</span>
          <h2>Tồn tại xã hội</h2>
          <div className="section-divider" />
          <p>
            Khái niệm và các yếu tố cơ bản cấu thành nên nền tảng vật chất của đời sống xã hội
          </p>
        </div>

        {/* Definition */}
        <div className="def-box reveal delay-1">
          <h3>📌 Khái niệm Tồn tại xã hội</h3>
          <p>
            Tồn tại xã hội là khái niệm triết học dùng để chỉ{' '}
            <strong>toàn bộ những sinh hoạt vật chất và những điều kiện sinh hoạt vật chất
            của xã hội</strong> trong những giai đoạn lịch sử nhất định.
          </p>
        </div>

        {/* Expand cards grid */}
        <p className="reveal" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          Click vào từng yếu tố để khám phá chi tiết
        </p>

        <div className="card-grid reveal delay-1">
          <ExpandCard title="A. Khái niệm (dễ hiểu)" defaultOpen>
            <p>
              Tồn tại xã hội = tất cả những gì có <em>thật</em>, <em>vật chất</em> trong đời sống
              cộng đồng: điều kiện địa lý, số lượng dân số, cách thức sản xuất ra của
              cải... Đây là nền tảng khách quan mà ý thức phải phản ánh.
            </p>
          </ExpandCard>

          <ExpandCard title="B. Vì sao là cơ sở của xã hội?" defaultOpen>
            <ul>
              <li>Quyết định sự sinh tồn và phát triển (tao tự liệu sinh hoạt).</li>
              <li>Làm phát sinh và phát triển các quan hệ xã hội (ai làm gì, phân công ra sao).</li>
              <li>Lao động sản xuất giúp cải biến tự nhiên, xã hội và chính bản thân con người.</li>
              <li>Mọi biến đổi xã hội xét đến cùng bắt nguồn từ lực lượng sản xuất vật chất.</li>
            </ul>
          </ExpandCard>

          <ExpandCard title="C. Ví dụ đời sống">
            <ul>
              <li>🌾 Nền kinh tế nông nghiệp lúa nước → làng xã ổn định, văn hóa tập thể.</li>
              <li>🏭 Công nghiệp hóa → đô thị hóa, gia đình hạt nhân, lối sống cá nhân.</li>
              <li>💻 Công nghệ số → thay đổi cách làm việc, học tập, giao tiếp.</li>
            </ul>
          </ExpandCard>

          <ExpandCard title="D. Ý nghĩa nghiên cứu">
            <ul>
              <li>Giúp hiểu đúng nguồn gốc vật chất của đời sống tinh thần.</li>
              <li>Cơ sở để phân tích chính sách kinh tế – xã hội.</li>
              <li>Nền tảng của chủ nghĩa duy vật lịch sử (CNDVLS).</li>
            </ul>
          </ExpandCard>
        </div>

        {/* 3 factors feature cards */}
        <div className="section-header reveal" style={{ marginTop: '4rem', marginBottom: '1.5rem' }}>
          <span className="section-label">Ba yếu tố cơ bản</span>
          <h2 style={{ fontSize: '1.8rem' }}>Cấu thành Tồn tại xã hội</h2>
          <div className="section-divider" />
        </div>

        <div className="feature-grid">
          <div className="feature-card reveal delay-1">
            <div className="fc-num">01</div>
            <h4>🌍 Điều kiện tự nhiên – Hoàn cảnh địa lý</h4>
            <p>
              Toàn bộ những điều kiện vật chất tự nhiên tạo thành điều kiện khách quan cho
              sự sinh tồn và phát triển của cộng đồng người. Giới tự nhiên được ví như
              <em> "thân thể vô cơ"</em> của con người, cung cấp điều kiện để trao đổi
              chất và tiến hành sản xuất.
            </p>
          </div>

          <div className="feature-card reveal delay-2">
            <div className="fc-num">02</div>
            <h4>👥 Điều kiện dân số (dân cư)</h4>
            <p>
              Bao gồm toàn bộ các phương diện về <strong>số lượng, cơ cấu, mật độ phân bố,
              cấu trúc tổ chức dân cư</strong>. Ví dụ: Cấu trúc cư dân nông nghiệp lúa
              nước ở Việt Nam có tổ chức làng xã ổn định.
            </p>
          </div>

          <div className="feature-card reveal delay-3">
            <div className="fc-num">03</div>
            <h4>⚙️ Phương thức sản xuất</h4>
            <p>
              Yếu tố <strong>cơ bản và trực tiếp nhất</strong> quy định sự sinh tồn, phát
              triển của con người và xã hội. Bao gồm: mặt vật chất – kĩ thuật (trình độ
              công nghệ) và mặt kinh tế – xã hội (quan hệ sản xuất).
            </p>
          </div>
        </div>

        {/* Icon cards row */}
        <div className="card-grid reveal" style={{ marginTop: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {[
            { e: '🌱', t: 'Tự nhiên', s: 'Địa lý, khí hậu, tài nguyên' },
            { e: '🏘️', t: 'Dân cư', s: 'Số lượng, mật độ, cơ cấu' },
            { e: '🔧', t: 'Sản xuất', s: 'Công cụ, kỹ năng, quan hệ' },
            { e: '🤝', t: 'Quan hệ SX', s: 'Sở hữu, quản lý, phân phối' },
          ].map((item) => (
            <div className="icon-card" key={item.t}>
              <span className="icon-emoji">{item.e}</span>
              <h4>{item.t}</h4>
              <p>{item.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="phan-separator" />
    </section>
  );
}
