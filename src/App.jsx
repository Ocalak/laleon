import Nav from './components/Nav';
import Hero from './components/Hero';
import InfoStrip from './components/InfoStrip';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <Hero />
      <InfoStrip />
      <Gallery />
      <Menu />
      <Contact />
      <Footer />
      <Cart />
    </CartProvider>
  );
}
