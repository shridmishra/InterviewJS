import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  onClose: () => void;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 68.2C297.4 97.2 274.2 88 248 88c-73.2 0-132.3 59.2-132.3 132S174.8 384 248 384c79.2 0 119-58.3 123.4-89.6H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
  </svg>
);

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const _auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isLoginView) {
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          result = { success: false, message: signInResult.error };
        } else {
          result = { success: true };
        }
      } else {
        const registerRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        const registerData = await registerRes.json();
        result = { success: registerRes.ok, message: registerData.message };
      }

      if (!result.success) {
        setError(result.message || 'An error occurred.');
        return;
      }

      onClose();
    } catch (err: unknown) {
      setError((err instanceof Error) ? err.message : 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (_error) {
      console.error(_error);
      setError('Failed to sign in with Google');
    }  };

  return (
    <Modal title={isLoginView ? 'Welcome Back' : 'Create Account'} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700" onClick={handleGoogleSignIn}>
          <GoogleIcon />
          Sign in with Google
        </Button>

        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
          <hr className="grow border-gray-300 dark:border-gray-700" />
          <span className="px-2">OR</span>
          <hr className="grow border-gray-300 dark:border-gray-700" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">Username</label>
              <Input id="username" type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} required className="mt-1" />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">{isLoginView ? 'Email or Username' : 'Email'}</label>
            <Input id="email" type={isLoginView ? 'text' : 'email'} placeholder={isLoginView ? 'you@example.com or username' : 'you@example.com'} value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1" />
          </div>

          {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 ml-1">
            {isLoginView ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
