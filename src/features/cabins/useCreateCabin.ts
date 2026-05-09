import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin as createCabinApi } from '../../services/api.cabins';
import type { CabinPayload } from '../../types/cabin.types';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (data: CabinPayload) => createCabinApi(data),
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { createCabin, isCreating };
}
