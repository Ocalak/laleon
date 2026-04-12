import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories } from '../data/menu';
import { SectionLabel, SectionTitle, Divider } from './Gallery';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find(c => c.id === active);
  const { addItem } = useCart();

  return (
    <section id="speisekarte" style={{ padding: '80px 5%', background: 'var(--bg)' }}>
      <span className="planetono-kicker" style={{ textAlign: 'center' }}>Speisekarte</span>
      <h2 className="planetono-headline" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', textAlign: 'center', marginBottom: '1.5rem', textShadow: '3px 3px 0 var(--secondary)' }}>
        WAS WIR <span style={{ color: 'var(--primary)' }}>ANBIETEN</span>
      </h2>
      <div style={{ width: 60, height: 4, background: 'var(--primary)', borderRadius: 2, margin: '0 auto 3rem' }} />

      {/* Category tabs — GDK style pill tabs */}
      <motion.div
        initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
        style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'2.5rem' }}
      >
        {menuCategories.map(cat => (
          <Tab key={cat.id} active={active===cat.id} onClick={()=>setActive(cat.id)}>{cat.label}</Tab>
        ))}
      </motion.div>

      {/* Menu grid — card-based like GDK product grid */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-10 }}
          transition={{ duration:0.32, ease:[0.16,1,0.3,1] }}
        >
          <motion.div
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.04 } } }}
            initial="hidden" animate="show"
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}
          >
            {category.items.map(item => (
              <MenuItem
                key={item.name+item.price}
                item={item}
                onAdd={() => addItem({ id: `${active}-${item.name}`, name: item.name, price: item.price })}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Tab({ children, active, onClick }) {
  return (
    <motion.button onClick={onClick}
      whileHover={{ scale: 1.05, transform: 'translate(-2px, -2px)', boxShadow: '4px 4px 0 var(--black)' }}
      whileTap={{ scale: 0.95 }}
      animate={{
        background: active ? 'var(--primary)' : 'var(--white)',
        color: active ? 'var(--white)' : 'var(--black)',
        borderColor: active ? 'var(--black)' : 'var(--black)',
        boxShadow: active ? '4px 4px 0 var(--black)' : '2px 2px 0 var(--black)',
      }}
      transition={{ duration:0.15 }}
      style={{
        border:'2px solid var(--black)',
        padding:'0.6rem 1.4rem',
        borderRadius:8,
        fontSize:'0.85rem',
        fontWeight:700,
        cursor:'pointer',
        fontFamily:'var(--head)',
        letterSpacing:'2px',
        textTransform: 'uppercase'
      }}
    >{children}</motion.button>
  );
}

function MenuItem({ item, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <motion.div
      variants={{ hidden:{ opacity:0, y:8 }, show:{ opacity:1, y:0, transition:{ duration:0.3, ease:[0.16,1,0.3,1] } } }}
      whileHover={{ transform: 'translate(-3px, -3px)', boxShadow: '6px 6px 0 var(--black)' }}
      style={{
        background:'var(--white)',
        padding:'1.25rem 1.5rem',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        gap:'1rem',
        border: 'var(--border)',
        boxShadow: 'var(--shadow)',
        borderRadius: 12,
        transition: 'all 0.15s'
      }}
    >
      <div style={{ flex:1 }}>
        <div style={{ fontFamily: 'var(--head)', fontWeight:700, color:'var(--black)', fontSize:'1.2rem', marginBottom:'0.2rem', letterSpacing: '0.5px' }}>{item.name}</div>
        {item.desc && <div style={{ fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.45 }}>{item.desc}</div>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexShrink:0 }}>
        <div style={{ fontFamily: 'var(--head)', fontWeight:700, color:'var(--primary)', fontSize:'1.3rem', textShadow: '1px 1px 0 var(--black)' }}>{item.price}</div>
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          animate={{
            background: added ? '#2E7D32' : 'var(--primary)',
            boxShadow: added ? '0 0 0 transparent' : '2px 2px 0 var(--black)'
          }}
          transition={{ duration: 0.2 }}
          style={{
            border:'1.5px solid var(--black)',
            borderRadius:8,
            width:32,
            height:32,
            cursor:'pointer',
            color:'#fff',
            fontWeight:900,
            fontSize:'1.2rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            fontFamily:'inherit',
            flexShrink:0,
          }}
        >
          {added ? '✓' : '+'}
        </motion.button>
      </div>
    </motion.div>
  );
}
