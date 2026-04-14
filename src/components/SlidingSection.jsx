import CircularGallery from './CircularGallery';

const slidingItems = [
  { image: '/images/Screenshot 2026-04-14 at 10.21.08 PM.png', text: 'Authentisch' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.13 PM.png', text: 'Frisch gebacken' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.28 PM.png', text: 'Pizza Napoletana' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.35 PM.png', text: 'Handgemacht' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.42 PM.png', text: 'Gourmet' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.47 PM.png', text: 'Da Leone' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.54 PM.png', text: 'Genuss pur' },
  // Duplicate for density
  { image: '/images/Screenshot 2026-04-14 at 10.21.08 PM.png', text: 'Classic' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.13 PM.png', text: 'Fresco' },
  { image: '/images/Screenshot 2026-04-14 at 10.21.28 PM.png', text: 'Qualitá' },
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
          font="bold 24px 'Playfair Display SC', serif"
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
          PIZZERIA DA LEONE • PIZZERIA DA LEONE • PIZZERIA DA LEONE
        </div>
      </div>
    </section>
  );
}
