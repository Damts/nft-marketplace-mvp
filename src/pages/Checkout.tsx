import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { items, subtotal, discount, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: user?.name || '',
    username: user?.username || '',
    network: 'Ethereum',
    address: '',
    walletType: 'MetaMask',
    email: user?.email || '',
    ens: '',
    note: '',
  });
  const [wallet, setWallet] = useState('MetaMask');
  const [error, setError] = useState('');

  const networkFee = 0.016;
  const total = subtotal - discount + networkFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address) { setError('Endereço da carteira obrigatório.'); return; }
    // simulate order creation
    const order = {
      id: 'ord_' + Date.now(),
      txHash: '0xA91F…E82C',
      date: new Date().toLocaleDateString('pt-BR'),
      total: total.toFixed(3),
      network: form.network,
      wallet,
      items: items.map((i) => ({ nft: i.nft, quantity: i.quantity, price: (parseFloat(i.nft.price) * i.quantity).toFixed(2) })),
    };
    localStorage.setItem('last_order', JSON.stringify(order));
    clear();
    navigate('/confirmation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-zinc-500 mb-4">Início / Mercado / Pagamento</div>
      <h1 className="text-2xl font-bold mb-6">Pagamento</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Perfil do colecionador</h3>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Nome de exibição *" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            <input placeholder="Nome de usuário *" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select value={form.network} onChange={(e) => setForm({ ...form, network: e.target.value })}>
              <option>Ethereum</option><option>Polygon</option><option>Solana</option>
            </select>
            <input placeholder="Nome do perfil *" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <input placeholder="Endereço da carteira *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.walletType} onChange={(e) => setForm({ ...form, walletType: e.target.value })}>
              <option>MetaMask</option><option>WalletConnect</option><option>Coinbase</option>
            </select>
            <input placeholder="Código de indicação *" value="" readOnly />
          </div>
          <input placeholder="E-mail *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Nome ENS *" value={form.ens} onChange={(e) => setForm({ ...form, ens: e.target.value })} />
          <textarea placeholder="Observação do colecionador (opcional)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          {error && <div className="text-red-400 text-sm">{error}</div>}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Seus NFTs</h3>
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900 space-y-2">
            {items.map((i) => (
              <div key={i.nft.id} className="flex justify-between text-sm">
                <span>{i.nft.name} (x{i.quantity})</span>
                <span>{(parseFloat(i.nft.price) * i.quantity).toFixed(2)} ETH</span>
              </div>
            ))}
            <div className="border-t border-zinc-800 pt-2 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(3)} ETH</span></div>
              <div className="flex justify-between"><span>Desconto</span><span>(-) {discount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxa de rede</span><span>{networkFee} ETH</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>{total.toFixed(3)} ETH</span></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Carteira e rede</h3>
            <div className="space-y-2">
              {['MetaMask', 'WalletConnect', 'Coinbase Wallet'].map((w) => (
                <button type="button" key={w} onClick={() => setWallet(w)} className={`w-full text-left p-3 rounded-lg border ${wallet === w ? 'border-violet-500 bg-violet-600/20' : 'border-zinc-700'}`}>{w}</button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-violet-600 rounded-lg hover:bg-violet-500 font-semibold">Confirmar compra</button>
        </div>
      </form>
    </div>
  );
}