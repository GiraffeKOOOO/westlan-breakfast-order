import { useQuery } from '@tanstack/react-query';

const apiUrl = import.meta.env.VITE_API_ADDRESS;

const fetchLockedStatus = async () => {
  const response = await fetch(`${apiUrl}/LockedStatus`);
  if (!response.ok) {
    throw new Error('Error occurred fetching locked status');
  }
  return response.json();
};

const useLockedStatus = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['lockedStatus'],
    queryFn: fetchLockedStatus,
  });

  return { data, error, isLoading };
};

export default useLockedStatus;
