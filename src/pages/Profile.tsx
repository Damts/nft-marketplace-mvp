import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    displayName: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    ens: '',
  });
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
      <aside className="w-48 shrink-0 space-y-2 text-sm">
        {['Meu perfil', 'Carteiras', 'Atividade', 'Lista de interesse', 'Ofertas', 'Arquivos baixados', 'Suporte', 'Sair'].map((l) => (
          <div key={l} className="px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 cursor-pointer">{l}</div>
        ))}
      </aside>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Perfil do colecionador</h1>
        <form onSubmit={handleSave} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-3">
          <h3 className="font-semibold">Dados do perfil</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="Nome de exibição *" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            <input placeholder="Nome de usuário *" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="E-mail *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Nome ENS *" value={form.ens} onChange={(e) => setForm({ ...form, ens: e.target.value })} />
          </div>
          <div>
            <div className="text-sm mb-1">Avatar</div>
            <div className="flex gap-2">
              <button type="button" className="px-3 py-1.5 bg-zinc-700 rounded-lg text-sm">Alterar</button>
              <button type="button" className="px-3 py-1.5 bg-zinc-700 rounded-lg text-sm">Remover</button>
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-violet-600 rounded-lg hover:bg-violet-500 font-semibold">Salvar</button>
          {saved && <span className="text-green-400 text-sm ml-3">Salvo!</span>}
        </form>

        <form onSubmit={handleSave} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-3">
          <h3 className="font-semibold">Alterar senha</h3>
          <input type="password" placeholder="Senha atual" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className="w-full" />
          <input type="password" placeholder="Nova senha" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className="w-full" />
          <input type="password" placeholder="Confirmar nova senha" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className="w-full" />
          <button type="submit" className="px-6 py-2.5 bg-violet-600 rounded-lg hover:bg-violet-500 font-semibold">Salvar</button>
        </form>
      </div>
    </div>
  );
}