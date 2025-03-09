// libraries
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LockedStatusRequest } from '../Context/Types';

const apiUrl = import.meta.env.VITE_API_ADDRESS;

const fetchLockedStatus = async () => {
  const response = await fetch(`${apiUrl}/LockedStatus`);
  if (!response.ok) {
    throw new Error('Error occurred fetching locked status');
  }
  return response.json();
};

const updateLockedStatus = async (prevValue: boolean) => {
  const requestBody: LockedStatusRequest = {
    lockStatus: 'locked',
    value: !prevValue,
  };

  const response = await fetch(`${apiUrl}/LockedStatus`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Error occurred updating order`);
  }

  return response.json();
};

const useLockedStatus = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['lockedStatus'],
    queryFn: fetchLockedStatus,
  });

  const forceInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['lockedStatus'] });
    refetch();
  };

  const updateMutation = useMutation({
    mutationFn: updateLockedStatus,
    onSuccess: () => {
      forceInvalidate();
    },
  });

  return { data, error, isLoading, updateLockedStatus: updateMutation.mutate, forceInvalidate };
};

export default useLockedStatus;
