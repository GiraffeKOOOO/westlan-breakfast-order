/* eslint-disable @typescript-eslint/no-explicit-any */
// libraries
import { useState, createContext, useEffect } from 'react';
// providers
// files
// styles

const OrderContext = createContext<{
  orderId: number;
  orderUserName: string;
  orderType: string;
  completed: boolean;
}>({
  orderId: -1,
  orderUserName: '',
  orderType: '',
  completed: false,
});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderId, setOrderId] = useState<number>(-1);
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedOrderId = window.localStorage.getItem('orderId');
    if (storedOrderId) {
      setOrderId(Number(storedOrderId));
    }

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
        orderId,
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
