import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/api.auth';
import toast from 'react-hot-toast';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      // queryClient.setQueryData(['user'], data?.user);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success('User account successfully updated');
    },
    onError: error => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
