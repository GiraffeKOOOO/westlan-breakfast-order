// libraries
import { useState, createContext, useEffect } from 'react';
// providers
// files
// styles

const OrderContext = createContext({
  orderId: -1,
  orderUserName: '',
  orderType: '',
  completed: false,
});

export function OrderProvider({ children }) {
  const [orderId, setOrderId] = useState<number>();
  const [orderUserName, setOrderUserName] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [completed, setCompleted] = useState<boolean>();

  useEffect(() => {
    const orderId = window.localStorage.getItem('orderId');
    if (orderId && typeof orderId === 'number') {
      setOrderId(orderId);
    }

    const orderUserName = window.localStorage.getItem('userName');
    if (orderUserName && typeof orderUserName === 'string') {
      setOrderUserName(orderUserName);
    }

    const orderType = window.localStorage.getItem('orderType');
    if (orderType && typeof orderType === 'string') {
      setOrderType(orderType);
    }

    const completed = window.localStorage.getItem('completed');
    if (completed && typeof completed === 'boolean') {
      setCompleted(completed);
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
