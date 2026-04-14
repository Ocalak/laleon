import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const links = [
  { href: '#speisekarte', label: 'Speisekarte' },
  { href: '#galerie',     label: 'Galerie' },
  { href: '#kontakt',     label: 'Kontakt' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 80, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 5%',
          background: 'rgba(253,252,240,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: 'var(--border)',
          boxShadow: scrolled ? '0 4px 20px rgba(10,10,10,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo + name */}
        <motion.a href="#home" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={close}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', cursor: 'pointer' }}
        >
          <Logo variant="nav" />
          <div>
            <div style={{ fontFamily:"var(--head)", fontSize: '1.4rem', fontWeight: 700, color: 'var(--black)', lineHeight: 0.9, letterSpacing: '1px' }}>PIZZERIA DA LEONE</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--primary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800 }}>DUISBURG</div>
          </div>
        </motion.a>

        {/* Nav links — desktop only */}
        <ul className="nav-links-desktop" style={{ gap: '2.2rem', listStyle: 'none' }}>
          {links.map((link, i) => (
            <motion.li key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: [0.16,1,0.3,1] }}
            >
              <motion.a href={link.href}
                whileHover={{ color: 'var(--primary)' }}
                transition={{ duration: 0.15 }}
                style={{ color: 'var(--black)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
              >{link.label}</motion.a>
            </motion.li>
          ))}
        </ul>

        {/* CTAs — desktop only */}
        <div className="nav-ctas-desktop" style={{ gap: '0.8rem', alignItems: 'center' }}>
          <motion.a href="tel:020657927735"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="brutal-btn secondary"
            style={{ padding: '0.45rem 1.2rem', fontSize: '0.75rem' }}
          >Anrufen</motion.a>
          <motion.a href="#speisekarte"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="brutal-btn"
            style={{ padding: '0.45rem 1.4rem', fontSize: '0.75rem' }}
          >Bestellen</motion.a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} style={{ background: 'var(--bg)', borderBottom: 'var(--border)' }}>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={close} style={{ fontFamily: 'var(--head)', letterSpacing: '2px' }}>{link.label}</a>
        ))}
        <div className="mobile-ctas" style={{ padding: '1.5rem', gap: '1rem' }}>
          <a href="tel:020657927735" className="brutal-btn secondary" style={{ flex: 1, textAlign: 'center' }}>Anrufen</a>
          <a href="#speisekarte" onClick={close} className="brutal-btn" style={{ flex: 1, textAlign: 'center' }}>Bestellen</a>
        </div>
      </div>
    </>
  );
}
