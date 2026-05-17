import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/api.bookings';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBookingApi(id),

    onSuccess: (_, id) => {
      toast.success(`Booking #${id} successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: () => toast.error('There was an error while deleting'),
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
