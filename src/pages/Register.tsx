import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Senhas não conferem.'); return; }
    const ok = await register(username, email, password);
    if (ok) navigate('/');
    else setError('Dados inválidos ou conflito de cadastro.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Criar perfil de colecionador</h1>
      <p className="text-[#B8A99A] mb-6">Crie seu perfil e conecte uma carteira quando quiser.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full" />
        <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
        <input type="password" placeholder="Confirmar senha" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full" />
        {error && <div className="text-[#ff6b6b] text-sm">{error}</div>}
        <button type="submit" className="w-full py-2.5 bg-[#D28A4C] rounded-lg hover:bg-[#E0A060] font-semibold">Criar perfil</button>
        <div className="text-center text-sm text-[#B8A99A]">Ou continue com</div>
        <button type="button" className="w-full py-2.5 bg-[#2A1F18] rounded-lg hover:bg-[#3A2A1F]">Continuar com Google</button>
        <button type="button" className="w-full py-2.5 bg-[#2A1F18] rounded-lg hover:bg-[#3A2A1F]">Continuar com Facebook</button>
        <div className="text-center text-sm"><a href="/login" className="text-[#D28A4C]">Já tem uma conta? Entre</a></div>
      </form>
    </div>
  );
}