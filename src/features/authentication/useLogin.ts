import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/api.auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type Login = {
  email: string;
  password: string;
};

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: Login) => loginApi({ email, password }),

    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },

    onError: error => {
      console.log('Error', error);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}

export default useLogin;
