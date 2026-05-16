import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/api.bookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export type BreakfastUpdate = {
  hasBreakfast: boolean;
  extrasPrice: number;
  totalPrice: number;
};

type BookingUpdate = {
  bookingId: number;
  breakfast: Partial<BreakfastUpdate>;
};

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: BookingUpdate) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked in`);

      queryClient.invalidateQueries({ type: 'active' });
      navigate('/');
    },

    onError: () => toast.error('There was ad error while checking in'),
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
