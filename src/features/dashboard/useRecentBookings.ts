import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { getBookingsAfterDate } from '../../services/api.bookings';

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));

  const { isPending: isLoading, data: bookings } = useQuery({
    queryFn: () => {
      const queryDate = subDays(new Date(), numDays).toISOString();
      return getBookingsAfterDate(queryDate);
    },
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { isLoading, bookings };
}

export default useRecentBookings;
