import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { SectionLabel, SectionTitle, Divider } from './Gallery';

const HOURS = [
  { day:'Montag',     time:'11:00 – 22:00' },
  { day:'Dienstag',   time:'11:00 – 22:00' },
  { day:'Mittwoch',   time:'11:00 – 22:00' },
  { day:'Donnerstag', time:'11:00 – 22:00' },
  { day:'Freitag',    time:'11:00 – 22:00' },
  { day:'Samstag',    time:'11:00 – 22:00' },
  { day:'Sonntag',    time:'12:00 – 21:00' },
];

const jsDay = new Date().getDay();
const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

const cardV = { hidden:{ opacity:0, y:36 }, show:{ opacity:1, y:0, transition:{ duration:0.6, ease:[0.16,1,0.3,1] } } };
const card = { background:'#fff', border:'1px solid #E8D9C0', borderRadius:8, padding:'2rem', boxShadow:'0 2px 16px rgba(26,10,6,0.06)' };

export default function Contact() {
  return (
    <section id="kontakt" style={{ padding:'80px 5%', background:'#F5EDD8' }}>
      <SectionLabel>Kontakt</SectionLabel>
      <SectionTitle>So findest du uns</SectionTitle>
      <Divider />

      <motion.div
        initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.12 } } }}
        style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1.5rem' }}
      >
        {/* Hours */}
        <motion.div variants={cardV} style={card}>
          <CardTitle>Öffnungszeiten</CardTitle>
          {HOURS.map(({ day, time }, i) => {
            const isToday = i === todayIndex;
            return (
              <div key={day} style={{ display:'flex', justifyContent:'space-between', padding:'0.55rem 0', borderBottom: i<HOURS.length-1 ? '1px solid #F0E5D0' : 'none' }}>
                <span style={{ fontSize:'0.88rem', color: isToday ? '#C8960A' : '#8A6A52', fontWeight: isToday ? 700 : 400 }}>{day}</span>
                <span style={{ fontSize:'0.88rem', color: isToday ? '#C8960A' : '#1A0A06', fontWeight: isToday ? 700 : 500 }}>{time}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Info */}
        <motion.div variants={cardV} style={card}>
          <CardTitle>Kontakt & Adresse</CardTitle>
          <Row Icon={MapPin} label="Adresse">Atroper Str. 16<br />47226 Duisburg</Row>
          <Row Icon={Phone} label="Telefon">
            <a href="tel:01632364246" style={{ color:'#C8960A', textDecoration:'none', fontWeight:600 }}>0163 2364246</a>
          </Row>
          <Row Icon={Clock} label="Heute geöffnet">{HOURS[todayIndex].time}</Row>
        </motion.div>

        {/* Map */}
        <motion.div variants={cardV} style={{ ...card, padding:0, overflow:'hidden', gridColumn:'1 / -1' }}>
          <div style={{ padding:'1.5rem 2rem 1rem' }}>
            <CardTitle>Standort</CardTitle>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487!2d6.7317!3d51.4108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c3a1234!2sAtroper+Str.+16%2C+47226+Duisburg!5e0!3m2!1sde!2sde!4v1"
            width="100%" height="320" style={{ display:'block', border:0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="First Kebap Standort"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CardTitle({ children }) {
  return <h3 style={{ fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", fontSize:'1.05rem', fontWeight:700, color:'#C8960A', marginBottom:'1.3rem' }}>{children}</h3>;
}

function Row({ Icon, label, children }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'0.9rem', padding:'0.85rem 0', borderBottom:'1px solid #F0E5D0' }}>
      <Icon size={17} color="#C8960A" strokeWidth={2} style={{ flexShrink:0, marginTop:2 }} />
      <div>
        <div style={{ fontSize:'0.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#B8997A', marginBottom:3 }}>{label}</div>
        <div style={{ fontSize:'0.9rem', color:'#1A0A06', lineHeight:1.5 }}>{children}</div>
      </div>
    </div>
  );
}
