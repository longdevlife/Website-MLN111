import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import TonTai from './sections/TonTaiXaHoi';
import GearOfEra from './sections/GearOfEra';

import useScrollReveal from '../hooks/useScrollReveal';

export const GamePage = () => {
  useScrollReveal();

  return (
    <div className="theory-page-container" style={{ width: '100%', minHeight: '100vh', scrollBehavior: 'smooth' }}>
      <Hero />


      <TonTai />
       <section id="quiz">

      
      <GearOfEra />
       </section>

      <footer className="footer">
        <p>&copy; 2026 <strong>Triết học Mác – Lê-nin</strong>. Tài liệu học tập.</p>
      </footer>
    </div>
  );
};

