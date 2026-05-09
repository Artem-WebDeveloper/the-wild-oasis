import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as daleteCabinApi } from '../../services/api.cabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id: number) => daleteCabinApi(id),
    // mutationFn: deleteCabinApi, можно и так
    onSuccess: () => {
      toast.success('Cabin deleted successfuly');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
