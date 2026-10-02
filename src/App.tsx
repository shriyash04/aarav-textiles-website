import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Products from './components/Products/Products';
import Manufacturing from './components/Manufacturing/Manufacturing';
import Quality from './components/Quality/Quality';
import Industries from './components/Industries/Industries';
import GlobalSupply from './components/GlobalSupply/GlobalSupply';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import ProductModal from './components/Modals/ProductModal';
import QuoteModal from './components/Modals/QuoteModal';

export default function App() {
  return (
    <ModalProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Manufacturing />
        <Quality />
        <Industries />
        <GlobalSupply />
        <CTA />
      </main>
      <Footer />
      <ProductModal />
      <QuoteModal />
    </ModalProvider>
  );
}
