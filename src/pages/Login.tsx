import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      const redirect = new URLSearchParams(location.search).get('redirect') || '/';
      navigate(redirect);
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Entrar</h1>
      <p className="text-zinc-400 mb-6">Entre para gerenciar sua carteira, coleção e perfil.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="contato@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button type="submit" className="w-full py-2.5 bg-orange-500 rounded-lg hover:bg-orange-400 font-semibold">Entrar</button>
        <div className="text-center text-sm text-zinc-500">Ou continue com</div>
        <button type="button" className="w-full py-2.5 bg-zinc-800 rounded-lg hover:bg-zinc-700">Continuar com Google</button>
        <button type="button" className="w-full py-2.5 bg-zinc-800 rounded-lg hover:bg-zinc-700">Continuar com Facebook</button>
        <div className="text-center text-sm"><a href="/register" className="text-orange-300">Novo na Kurio? Crie uma conta</a></div>
      </form>
    </div>
  );
}