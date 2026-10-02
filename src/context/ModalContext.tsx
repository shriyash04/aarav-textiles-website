import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProductSpec } from '../types';

interface ModalContextType {
  isQuoteOpen: boolean;
  selectedProduct: ProductSpec | null;
  activeSpecProduct: ProductSpec | null;
  openQuote: (product?: ProductSpec | null) => void;
  closeQuote: () => void;
  openSpec: (product: ProductSpec) => void;
  closeSpec: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductSpec | null>(null);
  const [activeSpecProduct, setActiveSpecProduct] = useState<ProductSpec | null>(null);

  const openQuote = (product?: ProductSpec | null) => {
    if (product) {
      setSelectedProduct(product);
    }
    setIsQuoteOpen(true);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
  };

  const openSpec = (product: ProductSpec) => {
    setActiveSpecProduct(product);
  };

  const closeSpec = () => {
    setActiveSpecProduct(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isQuoteOpen,
        selectedProduct,
        activeSpecProduct,
        openQuote,
        closeQuote,
        openSpec,
        closeSpec,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
