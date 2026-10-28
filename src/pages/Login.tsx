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
      <p className="text-[#B8A99A] mb-6">Entre para gerenciar sua carteira, coleção e perfil.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="contato@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
        {error && <div className="text-[#ff6b6b] text-sm">{error}</div>}
        <button type="submit" className="w-full py-2.5 bg-[#D28A4C] rounded-lg hover:bg-[#E0A060] font-semibold">Entrar</button>
        <div className="text-center text-sm text-[#B8A99A]">Ou continue com</div>
        <button type="button" className="w-full py-2.5 bg-[#2A1F18] rounded-lg hover:bg-[#3A2A1F]">Continuar com Google</button>
        <button type="button" className="w-full py-2.5 bg-[#2A1F18] rounded-lg hover:bg-[#3A2A1F]">Continuar com Facebook</button>
        <div className="text-center text-sm"><a href="/register" className="text-[#D28A4C]">Novo na Kurio? Crie uma conta</a></div>
      </form>
    </div>
  );
}