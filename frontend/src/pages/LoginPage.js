import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { cn } from '../utils/cn';
import { BackgroundBeams } from '../components/ui/background-beams';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';

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

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <BackgroundBeams className="fixed inset-0 h-full w-full" />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-neutral-900 relative z-10">
        <h2 className="font-bold text-xl text-white">Welcome to Book Swapping Platform</h2>
        <p className="text-neutral-300 text-sm mt-2">
          Register to start trading books on our platform.
        </p>
        
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email"> Email Address: </Label>
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => setEmail(e.target.value)}
              onSubmit={handleSubmit}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password"> Password: </Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </LabelInputContainer>

          <div className="flex justify-center">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-20 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Login
        </span>
      </button>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        </form>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>;
};

export default LoginPage;