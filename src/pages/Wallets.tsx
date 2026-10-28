import { useState } from 'react';

export default function Wallets() {
  const [primary, setPrimary] = useState({ label: '', network: 'Ethereum', address: '', type: 'MetaMask', email: '', ens: '', indication: '' });
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
        <h1 className="text-2xl font-bold">Carteiras</h1>

        <form onSubmit={handleSave} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Carteira principal</h3>
            <button type="submit" className="px-4 py-1.5 bg-orange-500 rounded-lg text-sm hover:bg-orange-400">Salvar carteira</button>
          </div>
          <p className="text-xs text-zinc-500">Estas carteiras ficam disponíveis no pagamento e para receber NFTs comprados.</p>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="Nome de exibição *" value={primary.label} onChange={(e) => setPrimary({ ...primary, label: e.target.value })} />
            <input placeholder="Apelido da carteira *" value={primary.label} onChange={(e) => setPrimary({ ...primary, label: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <select value={primary.network} onChange={(e) => setPrimary({ ...primary, network: e.target.value })}>
              <option>Ethereum</option><option>Polygon</option><option>Solana</option>
            </select>
            <input placeholder="Nome do perfil *" value={primary.label} onChange={(e) => setPrimary({ ...primary, label: e.target.value })} />
          </div>
          <input placeholder="Endereço da carteira *" value={primary.address} onChange={(e) => setPrimary({ ...primary, address: e.target.value })} />
          <div className="grid md:grid-cols-2 gap-3">
            <select value={primary.type} onChange={(e) => setPrimary({ ...primary, type: e.target.value })}>
              <option>MetaMask</option><option>WalletConnect</option><option>Coinbase</option>
            </select>
            <input placeholder="Código de indicação *" value={primary.indication} onChange={(e) => setPrimary({ ...primary, indication: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="E-mail *" type="email" value={primary.email} onChange={(e) => setPrimary({ ...primary, email: e.target.value })} />
            <input placeholder="Nome ENS *" value={primary.ens} onChange={(e) => setPrimary({ ...primary, ens: e.target.value })} />
          </div>
          {saved && <span className="text-green-400 text-sm">Salvo!</span>}
        </form>

        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Carteira secundária</h3>
            <div className="flex gap-2 text-sm">
              <label className="flex items-center gap-1"><input type="checkbox" /> Igual à carteira principal</label>
              <button className="px-3 py-1.5 bg-zinc-700 rounded-lg text-sm hover:bg-zinc-600">Adicionar</button>
            </div>
          </div>
          <p className="text-sm text-zinc-500">Você ainda não adicionou uma carteira secundária.</p>
        </div>
      </div>
    </div>
  );
}