import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ defaultValue = 'krw', children }) {
  const [currency, setCurrency] = useState(defaultValue);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('CurrencyProvider 안에서 사용해주세요');
  }

  return context.currency;
}

export function useSetCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('CurrencyProvider 안에서 사용해주세요');
  }

  return context.setCurrency;
}
