import { motion } from 'framer-motion';

const HERO_IMAGE = '/src/assets/hero.png';

export default function Hero() {
  return (
    <section id="home" style={{ position: 'relative', width: '100%', marginTop: 80, overflow: 'hidden' }}>

      {/* Hero background image */}
      <div className="hero-video-wrap" style={{ position: 'relative', aspectRatio: '16/7', minHeight: 420 }}>
        <img
          src={HERO_IMAGE}
          alt="Premium Pizza Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', position: 'absolute', inset: 0 }}
        />
        
        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(26,10,6,0.85) 0%, rgba(26,10,6,0.6) 50%, rgba(26,10,6,0.2) 100%)',
        }} />

        {/* Text overlay */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 6%' }}>
          <div style={{ maxWidth: 650 }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16,1,0.3,1] }}
              className="planetono-kicker"
              style={{ marginBottom: '0.8rem', color: 'var(--secondary)' }}
            >
              Duisburg · Friedrich-Alfred-Straße 94
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="planetono-headline"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                marginBottom: '1.2rem',
                textShadow: '3px 3px 0 var(--secondary)',
                color: 'var(--white)'
              }}
            >
              PIZZERIA<br />
              <span style={{ color: 'var(--primary)', textShadow: '3px 3px 0 var(--black)' }}>DA LEONE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16,1,0.3,1] }}
              style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.6, fontWeight: 500 }}
            >
              Authentische italienische Pizza & Pasta. <br />Frisch, traditionell und mit Liebe zubereitet.
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
              >Speisekarte</motion.a>
              <motion.a href="#kontakt"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="brutal-btn secondary"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}
              >Kontakt</motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      <InfoBar />
    </section>
  );
}

function InfoBar() {
  const items = [
    { label: 'Adresse', value: 'Fr.-Alfred-Str. 94, 47226 DU' },
    { label: 'Telefon', value: '02065 7927735' },
    { label: 'Di – So', value: '12:00 – 22:00 Uhr' },
    { label: 'Montag', value: 'Geschlossen' },
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
