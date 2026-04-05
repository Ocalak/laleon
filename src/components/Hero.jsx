import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <section id="home" style={{ position: 'relative', width: '100%', marginTop: 80, overflow: 'hidden' }}>

      {/* Full-width video background */}
      <div className="hero-video-wrap" style={{ position: 'relative', aspectRatio: '16/7', minHeight: 420 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', position: 'absolute', inset: 0 }}
        >
          <source src="/images/dks1.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(26,10,6,0.82) 0%, rgba(26,10,6,0.55) 50%, rgba(26,10,6,0.2) 100%)',
        }} />

        {/* Sound toggle button */}
        <motion.button
          onClick={toggleSound}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: [0.16,1,0.3,1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          title={muted ? 'Ton einschalten' : 'Ton ausschalten'}
          style={{
            position: 'absolute', bottom: '1.2rem', right: '1.2rem',
            width: 42, height: 42, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </motion.button>

        {/* Text overlay — left aligned like GDK */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 6%' }}>
          <div style={{ maxWidth: 560 }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16,1,0.3,1] }}
              style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8960A', marginBottom: '0.8rem' }}
            >
              Duisburg · Atroper Str. 16
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16,1,0.3,1] }}
              style={{
                fontFamily: "'Playfair Display SC','Playfair Display',Georgia,serif",
                fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 700,
                color: '#FDFAF5', lineHeight: 1.12, marginBottom: '1.2rem',
              }}
            >
              Echt. Frisch.<br />
              <span style={{ color: '#C8960A' }}>Unvergesslich.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16,1,0.3,1] }}
              style={{ fontSize: '1rem', color: 'rgba(253,250,245,0.75)', marginBottom: '2rem', lineHeight: 1.6 }}
            >
              Döner, Pizza, Pide und mehr – täglich frisch zubereitet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.55, ease: [0.16,1,0.3,1] }}
              style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}
            >
              <motion.a href="#speisekarte"
                whileHover={{ scale: 1.04, background: '#9A2420' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{ background: '#C0322A', color: '#fff', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: 4, fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >Online bestellen</motion.a>
              <motion.a href="#kontakt"
                whileHover={{ scale: 1.04, background: 'rgba(253,250,245,0.12)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{ background: 'transparent', border: '1.5px solid rgba(253,250,245,0.6)', color: '#FDFAF5', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: 4, fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
              >Speisekarte</motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info bar — GDK-style strip below hero */}
      <InfoBar />
    </section>
  );
}

function InfoBar() {
  const items = [
    { label: 'Adresse', value: 'Atroper Str. 16, 47226 Duisburg' },
    { label: 'Telefon', value: '0163 2364246' },
    { label: 'Mo – Sa', value: '11:00 – 22:00 Uhr' },
    { label: 'Sonntag', value: '12:00 – 21:00 Uhr' },
  ];
  return (
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true }}
      variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }}
      style={{ background: '#C0322A', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}
    >
      {items.map(({ label, value }, i) => (
        <motion.div key={label}
          className="infobar-item"
          variants={{ hidden:{ opacity:0, y:10 }, show:{ opacity:1, y:0, transition:{ duration:0.45, ease:[0.16,1,0.3,1] } } }}
          style={{
            padding: '1.2rem 2.5rem', textAlign: 'center',
            borderRight: i < items.length-1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
          }}
        >
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '0.2rem' }}>{label}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{value}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
