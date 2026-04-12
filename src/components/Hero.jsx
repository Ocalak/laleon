import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEOS = [
  { src: '/images/dks1.mp4', label: 'Video 1' },
  { src: '/images/hero.mp4', label: 'Video 2' },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function switchVideo(index) {
    if (index === activeVideo) return;
    setActiveVideo(index);
    setMuted(true);
  }

  return (
    <section id="home" style={{ position: 'relative', width: '100%', marginTop: 80, overflow: 'hidden' }}>

      {/* Full-width video background */}
      <div className="hero-video-wrap" style={{ position: 'relative', aspectRatio: '16/7', minHeight: 420 }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={VIDEOS[activeVideo].src}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', position: 'absolute', inset: 0 }}
          >
            <source src={VIDEOS[activeVideo].src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(26,10,6,0.82) 0%, rgba(26,10,6,0.55) 50%, rgba(26,10,6,0.2) 100%)',
        }} />

        {/* Video switcher */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: '1.2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '0.5rem', zIndex: 10,
          }}
        >
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => switchVideo(i)}
              title={`${VIDEOS[i].label} anzeigen`}
              style={{
                width: activeVideo === i ? 28 : 10,
                height: 10,
                borderRadius: 5,
                border: 'none',
                background: activeVideo === i ? '#C8960A' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </motion.div>

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
              className="planetono-kicker"
              style={{ marginBottom: '0.8rem' }}
            >
              Duisburg · Atroper Str. 16
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="planetono-headline"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                marginBottom: '1.2rem',
                textShadow: '3px 3px 0 var(--secondary)'
              }}
            >
              ECHT. FRISCH.<br />
              <span style={{ color: 'var(--primary)', textShadow: '3px 3px 0 var(--black)' }}>UNVERGESSLICH.</span>
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
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <motion.a href="#speisekarte"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="brutal-btn"
              >Online bestellen</motion.a>
              <motion.a href="#kontakt"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="brutal-btn secondary"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
              >Kontakt</motion.a>
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
      style={{ background: 'var(--primary)', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, borderBottom: 'var(--border)' }}
    >
      {items.map(({ label, value }, i) => (
        <motion.div key={label}
          className="infobar-item"
          variants={{ hidden:{ opacity:0, y:10 }, show:{ opacity:1, y:0, transition:{ duration:0.45, ease:[0.16,1,0.3,1] } } }}
          style={{
            padding: '1.5rem 3rem', textAlign: 'center',
            borderRight: i < items.length-1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
          }}
        >
          <div style={{ fontFamily: 'var(--head)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '0.4rem' }}>{label}</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{value}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
