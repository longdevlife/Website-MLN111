import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: 'Trang chủ' },
  { href: '#quiz', label: 'Quiz Game' },
  { href: '#ton-tai', label: 'Tồn tại XH' },
  { href: '#book', label: '3D Book' },
  
 
];

export default function Navbar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(pct, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar-theory">
      <a href="#hero" className="navbar-brand">
        <span className="brand-icon">🏛️</span>
        <span>Triết Mác – Lê-nin</span>
      </a>

      <ul className="navbar-nav">
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={active === l.href ? 'active' : ''}
              onClick={() => setActive(l.href)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-progress" title="Tiến độ đọc">
        <div className="navbar-progress-bar" style={{ width: `${scrollPct}%` }} />
      </div>
    </nav>
  );
}
