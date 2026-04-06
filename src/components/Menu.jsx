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
    <section id="speisekarte" style={{ padding: '80px 5%', background: '#FDFAF5' }}>
      <SectionLabel>Speisekarte</SectionLabel>
      <SectionTitle>Was wir anbieten</SectionTitle>
      <Divider />

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
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1px', background:'#E8D9C0', border:'1px solid #E8D9C0', borderRadius:8, overflow:'hidden', boxShadow:'0 2px 16px rgba(26,10,6,0.06)' }}
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
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      animate={{
        background: active ? '#C0322A' : '#fff',
        color: active ? '#fff' : '#2E1409',
        borderColor: active ? '#C0322A' : '#E8D9C0',
        boxShadow: active ? '0 2px 8px rgba(192,50,42,0.3)' : '0 1px 4px rgba(26,10,6,0.06)',
      }}
      transition={{ duration:0.18 }}
      style={{ border:'1px solid', padding:'0.5rem 1.1rem', borderRadius:999, fontSize:'0.82rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.02em' }}
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
      whileHover={{ background:'#FDF7EE' }}
      style={{ background:'#fff', padding:'1.15rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', transition:'background 0.15s' }}
    >
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600, color:'#1A0A06', fontSize:'0.92rem', marginBottom:'0.2rem' }}>{item.name}</div>
        {item.desc && <div style={{ fontSize:'0.76rem', color:'#B8997A', lineHeight:1.45 }}>{item.desc}</div>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>
        <div style={{ fontWeight:700, color:'#C8960A', fontSize:'0.95rem', whiteSpace:'nowrap' }}>{item.price}</div>
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ background: added ? '#2E7D32' : '#C0322A' }}
          transition={{ duration: 0.2 }}
          style={{
            border:'none', borderRadius:6, width:28, height:28, cursor:'pointer',
            color:'#fff', fontWeight:800, fontSize:'1rem', display:'flex',
            alignItems:'center', justifyContent:'center', fontFamily:'inherit',
            flexShrink:0,
          }}
        >
          {added ? '✓' : '+'}
        </motion.button>
      </div>
    </motion.div>
  );
}
