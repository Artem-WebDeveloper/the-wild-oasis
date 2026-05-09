import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUpdateCabin as updateCabinApi } from '../../services/api.cabins';
import type { CabinPayload } from '../../types/cabin.types';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ data, id }: { data: CabinPayload; id: number | undefined }) => {
      if (!id) throw new Error('No cabin id');
      return updateCabinApi(data, id);
    },
    onSuccess: () => {
      toast.success('New cabin successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { updateCabin, isEditing };
}
