import CircularGallery from './CircularGallery';

const items = [
  { image: '/images/unnamed-2.jpg', text: 'Döner Gerichte' },
  { image: '/images/unnamed-3.jpg', text: 'Frisch zubereitet' },
  { image: '/images/unnamed-4.jpg', text: 'Spezialitäten' },
  { image: '/images/unnamed-5.jpg', text: 'Unsere Küche' },
  { image: '/images/unnamed-6.jpg', text: 'First Kebap' },
  { image: '/images/salat.png',     text: 'Frischer Salat' },
];

export default function Gallery() {
  return (
    <section id="galerie" style={{ padding: '80px 0 0', background: '#F5EDD8' }}>
      <div style={{ padding: '0 5% 2.5rem' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#1A0A06', marginBottom: '0.5rem' }}>
          Eure Fotos bei uns
        </h2>
        <div style={{ width: 40, height: 3, background: '#C0322A', borderRadius: 2, margin: '0.8rem 0 0' }} />
      </div>
      <div style={{ width: '100%', height: '600px' }}>
        <CircularGallery
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
        />
      </div>
    </section>
  );
}

export function SectionLabel({ children }) {
  return <p style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#C8960A', marginBottom:'0.5rem' }}>{children}</p>;
}

export function SectionTitle({ children }) {
  return <h2 style={{ fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#1A0A06', marginBottom:'0.8rem' }}>{children}</h2>;
}

export function Divider() {
  return <div style={{ width:40, height:3, background:'#C0322A', borderRadius:2, margin:'0.8rem 0 2.5rem' }} />;
}
