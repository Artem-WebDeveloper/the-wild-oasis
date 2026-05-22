import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/api.bookings';

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });

  return { isLoading, activities };
}

export default useTodayActivity;
