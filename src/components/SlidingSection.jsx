import CircularGallery from './CircularGallery';

const slidingItems = [
  { image: '/images/unnamed-2.jpg', text: 'Döner Kebab' },
  { image: '/images/unnamed-3.jpg', text: 'Heiß & Lecker' },
  { image: '/images/unnamed-4.jpg', text: 'Spezialität' },
  { image: '/images/unnamed-5.jpg', text: 'Duisburg' },
  { image: '/images/unnamed-6.jpg', text: 'Hausgemacht' },
  { image: '/images/salat.png',     text: 'Frischer Salat' },
  { image: '/images/fk1.png',       text: 'Unser Menü' },
  { image: '/images/fk2.png',       text: 'Qualität' },
  { image: '/images/fk3.png',       text: 'First Kebap' },
  { image: '/images/fk4.png',       text: 'Genuss pur' },
  // Duplicate for density
  { image: '/images/unnamed-2.jpg', text: 'Classic' },
  { image: '/images/unnamed-3.jpg', text: 'Fresh' },
  { image: '/images/unnamed-4.jpg', text: 'Legendary' },
];

export default function SlidingSection() {
  return (
    <section id="social-gallery" style={{ 
      padding: '4rem 0 0', 
      background: 'var(--bg2)', 
      overflow: 'hidden',
      borderTop: 'var(--border)'
    }}>
      <div style={{ padding: '0 5% 1rem', textAlign: 'center' }}>
        <span className="planetono-kicker">Impressionen</span>
        <h2 className="planetono-headline" style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          marginBottom: '2rem'
        }}>
          EINTAUCHEN IN UNSERE <span style={{ color: 'var(--primary)' }}>WELT</span>
        </h2>
      </div>

      <div style={{ width: '100%', height: '500px', cursor: 'grab' }}>
        <CircularGallery
          items={slidingItems}
          bend={2.5}
          textColor="var(--secondary)"
          borderRadius={0.15}
          scrollSpeed={2.5}
          font="bold 24px 'Bebas Neue', sans-serif"
        />
      </div>
      
      {/* Decorative separator */}
      <div style={{ 
        height: '60px', 
        background: 'var(--primary)', 
        borderTop: 'var(--border)',
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          fontFamily: 'var(--head)', 
          color: '#fff', 
          letterSpacing: '10px', 
          fontSize: '1.2rem',
          opacity: 0.8
        }}>
          FIRST KEBAP • FIRST KEBAP • FIRST KEBAP
        </div>
      </div>
    </section>
  );
}
