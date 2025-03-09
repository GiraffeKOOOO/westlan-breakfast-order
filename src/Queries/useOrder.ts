// libraries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_ADDRESS;

const fetchOrder = async (userName: string) => {
  const response = await fetch(`${apiUrl}/Order/${userName}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error occurred fetching user's order`);
  }

  const data = await response.json();
  return data;
};

const fetchAllOrders = async () => {
  const response = await fetch(`${apiUrl}/Order`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error occurred fetching user's order`);
  }

  const data = await response.json();
  return data;
};

const createOrder = async (orderData: { userName: string; orderType: string }) => {
  const response = await fetch(`${apiUrl}/Order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Error occurred creating order`);
  }

  return response.json();
};

const updateOrder = async (orderData: {
  orderId: number;
  userName: string;
  orderType: string;
  completed: boolean;
}) => {
  const response = await fetch(`${apiUrl}/Order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Error occurred updating order`);
  }

  return response.json();
};

const useOrder = (userName: string) => {
  const queryClient = useQueryClient();

  const {
    data: userOrderData,
    error: userOrderError,
    isLoading: isLoadingUserOrder,
    refetch: refetchUserOrder,
  } = useQuery({
    queryKey: ['userOrder', userName],
    queryFn: () => fetchOrder(userName),
  });

  const {
    data: allOrdersData,
    error: allOrdersError,
    isLoading: isLoadingAllOrders,
  } = useQuery({
    queryKey: ['allOrders'],
    queryFn: fetchAllOrders,
  });

  const forceInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['userOrder', userName] });
    refetchUserOrder();
  };

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      forceInvalidate();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      forceInvalidate();
    },
  });

  return {
    userOrderData,
    userOrderError,
    isLoadingUserOrder,
    allOrdersData,
    allOrdersError,
    isLoadingAllOrders,
    createOrder: createMutation.mutate,
    createPending: createMutation.isPending,
    updateOrder: updateMutation.mutate,
    updatePending: updateMutation.isPending,
    forceInvalidate,
  };
};

export default useOrder;
