import type React from 'react';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 1. Загрузить Аутентифицированного Юзера
  const { isAuthenticated, isLoading } = useUser();

  // 2. Пока идет загрузка - спиннер
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. Если Аутентифицированного Юзера нет - направляем на страницу /Login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // 4. Если Юзер есть рендерим приложение
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
