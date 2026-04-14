import { useState, useEffect, useRef } from 'react';

/* ─── Plate data ─────────────────────────────────────────────── */
const PLATES = [
  {
    name: 'PIZZA TRADIZIONALE',
    sub: 'Authentisch & Frisch',
    img: '/images/1.png',
    tags: ['Napoletana', 'Frisch', 'Leicht'],
  },
  {
    name: 'PIZZA SPECIALE',
    sub: 'Hausgemachte Spezialität',
    img: '/images/2.png',
    tags: ['Knusprig', 'Herzhaft', 'Goldgelb'],
  },
  {
    name: 'PIZZA DA LEONE',
    sub: 'Unser Signature Gericht',
    img: '/images/3.png',
    tags: ['Premium', 'Exklusiv', 'Genuss'],
  },
];

/* ─── Spinning Ring ──────────────────────────────────────────── */
function Ring({ active }) {
  return (
    <>
      <div style={{
        position: 'absolute',
        inset: active ? -14 : -8,
        borderRadius: '50%',
        border: '2.5px solid transparent',
        borderTopColor: '#C8960A',
        borderRightColor: '#C8960A',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s, inset 0.4s',
        animation: active ? 'ringCW 4s linear infinite' : 'none',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: active ? -24 : -12,
        borderRadius: '50%',
        border: '1.5px solid transparent',
        borderBottomColor: 'rgba(200,150,10,0.35)',
        borderLeftColor: 'rgba(200,150,10,0.35)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s, inset 0.4s',
        animation: active ? 'ringCCW 7s linear infinite' : 'none',
        pointerEvents: 'none',
      }} />
    </>
  );
}

/* ─── Single plate card ─────────────────────────────────────── */
function PlateCard({ plate, isActive, onClick }) {
  const size = isActive
    ? 'clamp(220px, 26vw, 360px)'
    : 'clamp(140px, 18vw, 240px)';

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        flexShrink: 0,
        cursor: 'pointer',
        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(44px) scale(0.8)',
        transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: isActive ? 2 : 1,
      }}
    >
      {/* Tooltip above active plate */}
      <div style={{
        position: 'absolute',
        top: isActive ? '-3.8rem' : '-3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#C8960A',
        color: '#1A0A06',
        fontWeight: 800,
        fontSize: '0.78rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '0.38rem 1.1rem',
        borderRadius: '7px',
        whiteSpace: 'nowrap',
        border: '2px solid #1A0A06',
        boxShadow: '2px 2px 0 #1A0A06',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.35s, top 0.35s',
        pointerEvents: 'none',
        zIndex: 20,
      }}>
        {plate.name}
        {/* Tooltip arrow */}
        <span style={{
          position: 'absolute',
          bottom: -9,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '9px solid #1A0A06',
        }} />
      </div>

      {/* Spinning rings */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Ring active={isActive} />

        {/* Circle image */}
        <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: isActive
            ? '3px solid #C8960A'
            : '2px solid rgba(26,10,6,0.12)',
          boxShadow: isActive
            ? '0 0 50px rgba(200,150,10,0.25), 0 24px 48px rgba(26,10,6,0.35)'
            : '0 12px 28px rgba(26,10,6,0.2)',
          transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1), height 0.55s cubic-bezier(0.22,1,0.36,1), border 0.4s, box-shadow 0.4s',
          flexShrink: 0,
        }}>
          <img
            src={plate.img}
            alt={plate.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: isActive ? 'plateRotate 28s linear infinite' : 'none',
              transform: isActive ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Gallery component ────────────────────────────────── */
export default function Gallery() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  function goTo(idx) {
    setActive(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % PLATES.length);
    }, 4000);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % PLATES.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const plate = PLATES[active];

  return (
    <section
      id="galerie"
      style={{
        background: '#110D0A',
        padding: '0 0 5rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Keyframe styles injected as a style tag */}
      <style>{`
        @keyframes ringCW  { to { transform: rotate(360deg);  } }
        @keyframes ringCCW { to { transform: rotate(-360deg); } }
        @keyframes plateRotate {
          from { transform: scale(1.06) rotate(0deg); }
          to   { transform: scale(1.06) rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .plate-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 0.28rem 0.85rem;
          border-radius: 99px;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
      `}</style>

      {/* Blurred ambient background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${plate.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(48px) brightness(0.18) saturate(1.6)',
        transform: 'scale(1.15)',
        transition: 'background-image 1.2s ease',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(192,50,42,0.1) 0%, transparent 65%)',
      }} />

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        padding: '4rem 5% 2rem',
      }}>
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '5px',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          
        </p>
        <h2 style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 0.95,
          letterSpacing: '-1px',
        }}>
          Unsere Highlights<br />
          <span style={{ color: '#C8960A' }}></span>
        </h2>
        <div style={{ width: 40, height: 3, background: '#C0322A', borderRadius: 2, margin: '1rem auto 0' }} />
      </div>

      {/* Plates row */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 'clamp(1rem, 3vw, 3.5rem)',
        padding: '2rem 4vw 1rem',
      }}>
        {PLATES.map((p, i) => (
          <PlateCard
            key={p.name}
            plate={p}
            isActive={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Tag chips + sub label */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        marginTop: '1.6rem',
        animation: 'fadeUp 0.5s ease forwards',
        key: active, /* force re-render animation */
      }}>
        {plate.tags.map((tag, i) => (
          <span
            key={tag}
            className="plate-tag"
            style={{
              background: i === 0 ? 'rgba(192,50,42,0.18)' : 'transparent',
              border: i === 0 ? '1px solid #C0322A' : '1px solid rgba(255,255,255,0.15)',
              color: i === 0 ? '#E05050' : 'rgba(255,255,255,0.5)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Sub-title from active plate */}
      <p style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        marginTop: '0.7rem',
        fontSize: '0.82rem',
        fontWeight: 600,
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
      }}>
        {plate.sub}
      </p>

      {/* Dot indicators */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', gap: '0.6rem',
        marginTop: '2rem',
      }}>
        {PLATES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background: i === active ? '#C8960A' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.35s, background 0.35s',
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        marginTop: '2.2rem',
      }}>
        <a
          href="#menu"
          style={{
            display: 'inline-block',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '0.82rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#C8960A',
            border: '2px solid #C8960A',
            borderRadius: '6px',
            padding: '0.65rem 1.8rem',
            textDecoration: 'none',
            boxShadow: '3px 3px 0 #C8960A',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #C8960A'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0 #C8960A'; }}
        >
          Jetzt bestellen →
        </a>
      </div>
    </section>
  );
}

/* ─── Helpers re-exported for other components ─────────────── */
export function SectionLabel({ children }) {
  return <p style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#C8960A', marginBottom:'0.5rem' }}>{children}</p>;
}
export function SectionTitle({ children }) {
  return <h2 style={{ fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#1A0A06', marginBottom:'0.8rem' }}>{children}</h2>;
}
export function Divider() {
  return <div style={{ width:40, height:3, background:'#C0322A', borderRadius:2, margin:'0.8rem 0 2.5rem' }} />;
}
