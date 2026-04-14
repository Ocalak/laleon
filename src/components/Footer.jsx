import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }}
      style={{ background:'var(--black)', padding:'4rem 5% 3rem' }}
    >
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'2rem', paddingBottom:'2rem', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        {/* Brand */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <Logo variant="nav" />
          <div>
            <div style={{ fontFamily:"var(--head)", fontSize:'1.6rem', fontWeight:700, color:'var(--white)', lineHeight: 0.9 }}>PIZZERIA DA LEONE</div>
            <div style={{ fontSize:'0.75rem', color:'var(--primary)', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:800, marginTop:4 }}>DUISBURG</div>
          </div>
        </div>

        {/* Quick info */}
        <div style={{ display:'flex', gap:'4rem', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--head)', fontSize:'0.9rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'0.6rem' }}>ADRESSE</p>
            <p style={{ fontSize:'0.95rem', color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>Friedrich-Alfred-Straße 94<br />47226 Duisburg</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--head)', fontSize:'0.9rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'0.6rem' }}>ÖFFNUNGSZEITEN</p>
            <p style={{ fontSize:'0.95rem', color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>Di – So: 12:00 – 22:00<br />Mo: Geschlossen</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--head)', fontSize:'0.9rem', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'0.6rem' }}>TELEFON</p>
            <a href="tel:020657927735" style={{ fontSize:'1.1rem', color:'var(--secondary)', textDecoration:'none', fontWeight:700, fontFamily: 'var(--head)', letterSpacing: '1px' }}>02065 7927735</a>
          </div>
        </div>
      </div>

      <p style={{ marginTop:'2rem', textAlign:'center', color:'rgba(255,255,255,0.2)', fontSize:'0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
        © 2026 Pizzeria Da Leone · Alle Rechte vorbehalten
      </p>
      <p style={{ marginTop:'0.5rem', textAlign:'center', color:'rgba(255,255,255,0.3)', fontSize:'0.7rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Designed by <a href="mailto:email@ocalkaptan.de" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>Ocal Kaptan</a>
      </p>
    </motion.footer>
  );
}
