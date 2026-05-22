import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/api.settings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { updateSetting, isUpdating };
}
