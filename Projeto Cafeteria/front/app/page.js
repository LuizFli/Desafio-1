'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Login() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


 const verificarPermissao = async () => {
  try {
      const res = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password
      });

      console.log("✅ Login bem-sucedido:", res.data);
      return true;
    } catch (erro) {
      console.error("❌ Erro:", erro);
      return false;
    }
  };

  const handleClick = async (e) => {

    e.preventDefault();
    const status = await verificarPermissao();

    if (!status) {
      alert("Acesso negado!");
    } else {
      router.push('/home');
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-16 px-6 bg-white dark:bg-black sm:items-center">
        <h1 className="mb-8 text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 sm:text-6xl">
          Cafeteria Login
        </h1>
        <div className="mb-8 flex w-full flex-col items-center sm:items-center">
          <label className="mb-4 w-full max-w-sm">
            <span className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </span>
            <input
              value={email}
              
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="block w-full rounded-md border-0 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-600 dark:placeholder:text-zinc-500"
              placeholder="Enter your username"
            />
          </label>
          <label className="mb-6 w-full max-w-sm">
            <span className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 shadow-sm ring-1 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-600 dark:placeholder:text-zinc-500"
              placeholder="Enter your password"
            />
          </label>
          <button onClick={handleClick} className="w-full max-w-sm rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-black">
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
