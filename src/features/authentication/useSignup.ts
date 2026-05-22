import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/api.auth';
import toast from 'react-hot-toast';

function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account succesfully created! Please verify the new account from user's email address.",
      );
    },
  });

  return { signup, isLoading };
}

export default useSignup;
