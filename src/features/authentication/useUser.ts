import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/api.auth';

function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return { user, isLoading, isAuthenticated, error };
}

export default useUser;
