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
          <p style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', opacity: 0.8 }}>
            Khái niệm và các yếu tố cơ bản cấu thành nên nền tảng vật chất của đời sống xã hội. Không có tồn tại xã hội thì không thể phát sinh ý thức.
          </p>
        </div>

        {/* Definition */}
        <div className="def-box reveal delay-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
             <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Định Nghĩa Nền Tảng</h3>
          </div>
          <p style={{ textAlign: 'left' }}>
            Tồn tại xã hội là khái niệm triết học dùng để chỉ{' '}
            <strong>toàn bộ những sinh hoạt vật chất và những điều kiện sinh hoạt vật chất
            của xã hội</strong> trong những giai đoạn lịch sử nhất định.
          </p>
        </div>

        {/* Expand cards grid */}
        <p className="reveal" style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Tuyển Tập Phân Tích
        </p>

        <div className="card-grid reveal delay-1">
          <ExpandCard title="A. Bản Chất Hiện Tượng">
            <p>
              Tồn tại xã hội = tất cả những gì có <em>thật</em>, <em>vật chất</em> trong đời sống
              cộng đồng: điều kiện địa lý, dân số, cách thức sản xuất... Đây là hiện thực khách quan mà ý thức buộc phải phản ánh.
            </p>
          </ExpandCard>

          <ExpandCard title="B. Tính Quyết Định">
            <ul>
              <li>Quyết định sự sinh tồn và phát triển (tạo tư liệu sinh hoạt).</li>
              <li>Làm phát sinh cấu trúc quan hệ xã hội trong cộng đồng.</li>
              <li>Lao động sản xuất cải biến tự nhiên và cả bản thân con người.</li>
              <li>Biến đổi xã hội luôn bắt nguồn từ lực lượng sản xuất.</li>
            </ul>
          </ExpandCard>

          <ExpandCard title="C. Thực Tiễn Đời Sống">
            <ul>
              <li>Nền nông nghiệp định cư → Cấu trúc làng xã, văn hóa cộng đồng.</li>
              <li>Công nghiệp hóa → Đô thị hóa, gia đình hạt nhân, tư duy thực chứng.</li>
              <li>Công nghệ số → Thay đổi hoàn toàn không gian làm việc và giao tiếp.</li>
            </ul>
          </ExpandCard>

          <ExpandCard title="D. Giá Trị Triết Học">
            <ul>
              <li>Lý giải nguồn gốc biến đổi của quy luật tinh thần.</li>
              <li>Cơ sở khoa học cho phân tích chính sách vĩ mô.</li>
              <li>Là điểm tựa hạt nhân của Chủ nghĩa Duy vật lịch sử.</li>
            </ul>
          </ExpandCard>
        </div>

        {/* 3 factors feature cards */}
        <div className="section-header reveal" style={{ marginTop: '5rem', marginBottom: '2.5rem' }}>
          <span className="section-label">Cấu trúc cốt lõi</span>
          <h2 style={{ fontSize: '2rem' }}>Ba Hệ Trụ Cột</h2>
          <div className="section-divider" />
        </div>

        <div className="feature-grid">
          <div className="feature-card reveal delay-1">
            <div className="fc-num">I</div>
            <h4>Điều Kiện Tự Nhiên</h4>
            <p>
              Hoàn cảnh địa lý tạo thành điều kiện khách quan ban đầu. Giới tự nhiên là
              <em> "thân thể vô cơ"</em> của con người, nền tảng trao đổi chất.
            </p>
          </div>

          <div className="feature-card reveal delay-2">
            <div className="fc-num">II</div>
            <h4>Cấu Trúc Dân Cư</h4>
            <p>
              Số lượng, cơ cấu, và mật độ phân bố định hình quy mô cộng đồng. Dân số tổ chức thành một cỗ máy sinh học tinh vi.
            </p>
          </div>

          <div className="feature-card reveal delay-3">
            <div className="fc-num">III</div>
            <h4>Phương Thức Sản Xuất</h4>
            <p>
              Yếu tố trực tiếp nhất quy định sự tiến hóa. Bao gồm mặt vật chất – kỹ thuật và mặt kinh tế – xã hội của thời đại.
            </p>
          </div>
        </div>

        {/* Icon cards row */}
        <div className="card-grid reveal" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { n: '01', t: 'Sinh Thái', s: 'Vị trí địa lý, khí hậu, tài nguyên' },
            { n: '02', t: 'Nhân Khẩu', s: 'Mật độ, phân bổ, quy mô cư dân' },
            { n: '03', t: 'Kỹ Thuật', s: 'Công cụ lao động, vận hành cơ khí' },
            { n: '04', t: 'Quan Hệ', s: 'Hình thức sở hữu, năng lực phân phối' },
          ].map((item) => (
            <div className="icon-card" key={item.t}>
               <span className="icon-number" style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', color: 'rgba(212, 175, 55, 0.5)' }}>{item.n}</span>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>{item.t}</h4>
              <p>{item.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="phan-separator" />
    </section>
  );
}
