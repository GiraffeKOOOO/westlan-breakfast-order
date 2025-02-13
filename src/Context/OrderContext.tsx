/* eslint-disable @typescript-eslint/no-explicit-any */
// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';
// providers
// files
// styles

const OrderContext = createContext<{
  orderUserName: string;
  orderType: string;
  completed: boolean;
}>({
  orderUserName: '',
  orderType: '',
  completed: false,
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedUserName = window.localStorage.getItem('userName');
    if (storedUserName) {
      setOrderUserName(storedUserName);
    }

    const storedOrderType = window.localStorage.getItem('orderType');
    if (storedOrderType) {
      setOrderType(storedOrderType);
    }

    const storedCompleted = window.localStorage.getItem('completed');
    if (storedCompleted) {
      setCompleted(storedCompleted === 'true');
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orderUserName,
        orderType,
        completed,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
