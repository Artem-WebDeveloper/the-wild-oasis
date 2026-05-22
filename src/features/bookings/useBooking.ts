import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/api.bookings';

function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,

    enabled: !!bookingId, // запрос только если bookingId !== undefined
  });

  return { booking, isLoading, error };
}

export default useBooking;
