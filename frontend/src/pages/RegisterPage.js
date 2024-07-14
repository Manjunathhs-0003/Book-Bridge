import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn'; // Ensure the correct path
import { BackgroundBeams } from '../components/ui/background-beams';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', { username, email, password }, { withCredentials: true });
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <BackgroundBeams className="fixed inset-0 h-full w-full" />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-10 shadow-input bg-neutral-900 relative z-10">
        <h1 className="font-bold text-xl text-white yatra-one-regular">Welcome to Book Bridge Platform</h1>
        <p className="text-neutral-300 text-sm mt-2 yatra-one-regular">
          Register here to start trading the books.
        </p>
        <form className="my-8 yatra-one-regular" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username:</Label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Yoda" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="mb-8">
            <Label htmlFor="password">Password:</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <div className="flex justify-center">
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-20 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Register
              </span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-neutral-300 text-sm yatra-one-regular text-center">
          Already a user? Login below
        </div>

        <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-20 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Login
              </span>
            </button>
          </div>

      </div>
    </div>
  );
};

export default RegisterPage;