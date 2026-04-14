export default function Logo({ variant = 'nav', style = {} }) {
  const sizes = { nav: 56, hero: 130, footer: 64 };
  const size = sizes[variant] ?? 56;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
      border: '2px solid var(--black)',
      boxShadow: 'var(--shadow)',
      background: '#fff',
      ...style,
    }}>
      <img src="/images/logo.png" alt="Pizzeria Da Leone"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
    </div>
  );
}
