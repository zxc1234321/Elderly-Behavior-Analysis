import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/container/Header';
import '@/assets/style/global.css';

const Login = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default Login;
