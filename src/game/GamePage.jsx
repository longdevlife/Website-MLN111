import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';

import useScrollReveal from '../hooks/useScrollReveal';

export const GamePage = () => {
  useScrollReveal();

  return (
    <div className="theory-page-container" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <Navbar />
      <Hero />
    
     
   
      <footer className="footer">
        <p>&copy; 2026 <strong>Triết học Mác – Lê-nin</strong>. Tài liệu học tập Tiết 46 – 48.</p>
      </footer>
    </div>
  );
};
