import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/api.bookings';
import toast from 'react-hot-toast';

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully checked out`);

      queryClient.invalidateQueries({ type: 'active' });
    },

    onError: () => toast.error('There was ad error while checking out'),
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
