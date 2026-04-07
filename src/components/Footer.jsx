import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6 }}
      style={{ background:'#1A0A06', padding:'3rem 5% 2rem' }}
    >
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'2rem', paddingBottom:'2rem', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        {/* Brand */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <Logo variant="nav" />
          <div>
            <div style={{ fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", fontSize:'1.1rem', fontWeight:700, color:'#F5EDD8' }}>First Kebap</div>
            <div style={{ fontSize:'0.78rem', color:'#C8960A', letterSpacing:'0.1em', textTransform:'uppercase', fontWeight:600, marginTop:2 }}>Duisburg</div>
          </div>
        </div>

        {/* Quick info */}
        <div style={{ display:'flex', gap:'3rem', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8A6A52', marginBottom:'0.6rem' }}>Adresse</p>
            <p style={{ fontSize:'0.9rem', color:'#D4C4A8', lineHeight:1.6 }}>Atroper Str. 16<br />47226 Duisburg</p>
          </div>
          <div>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8A6A52', marginBottom:'0.6rem' }}>Öffnungszeiten</p>
            <p style={{ fontSize:'0.9rem', color:'#D4C4A8', lineHeight:1.6 }}>Mo – Sa: 11:00 – 22:00<br />So: 12:00 – 21:00</p>
          </div>
          <div>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8A6A52', marginBottom:'0.6rem' }}>Telefon</p>
            <a href="tel:01632364246" style={{ fontSize:'0.9rem', color:'#C8960A', textDecoration:'none', fontWeight:600 }}>0163 2364246</a>
          </div>
        </div>
      </div>

      <p style={{ marginTop:'1.5rem', textAlign:'center', color:'#3D1E12', fontSize:'0.78rem' }}>
        © 2025 First Kebap · Alle Rechte vorbehalten
      </p>
    </motion.footer>
  );
}
