import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn';
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from '@tabler/icons-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password }, { withCredentials: true });
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900"> {/* Changed bg-white to bg-neutral-900 for dark mode */}
      <h2 className="font-bold text-xl text-white">Welcome to Book Swapping Platform</h2>
      <p className="text-neutral-300 text-sm mt-2">
          Register to start trading books on our platform.
        </p>
      
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email"> Email Address: </Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password"> Password: </Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
        </LabelInputContainer>

        <button className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Login
        </div>
      </button>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      </form>
    </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="block absolute bottom-px inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      <span className="block absolute bottom-px inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent sm:w-1/2 w-full mx-auto blur-sm opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>;
};

export default LoginPage;