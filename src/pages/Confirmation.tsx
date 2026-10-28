import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('last_order');
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  if (!order) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl">Nenhum pedido confirmado.</h2><button onClick={() => navigate('/')} className="mt-4 text-violet-400">Voltar</button></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-zinc-500 mb-4">Início / Mercado / Pagamento</div>
      <h1 className="text-2xl font-bold mb-2">Confirmação de pedido</h1>
      <div className="p-4 rounded-xl border border-green-600/40 bg-green-600/10 mb-6">
        <div className="text-green-400 font-semibold">Transação confirmada na Ethereum.</div>
        <div className="text-sm text-zinc-300 mt-1">A propriedade foi transferida para sua carteira conectada e registrada na rede.</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-2 text-sm">
          <div><span className="text-zinc-500">ID da transação:</span> {order.txHash}</div>
          <div><span className="text-zinc-500">Data:</span> {order.date}</div>
          <div><span className="text-zinc-500">Total:</span> {order.total} ETH</div>
          <div><span className="text-zinc-500">Carteira:</span> {order.wallet}</div>
          <div><span className="text-zinc-500">Rede:</span> {order.network}</div>
          <button className="mt-3 px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700">Ver no Etherscan</button>
        </div>

        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900 space-y-2">
          <h3 className="font-semibold mb-2">Detalhes da transação</h3>
          {order.items.map((it: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{it.nft.name} (x{it.quantity})</span>
              <span>{it.price} ETH</span>
            </div>
          ))}
          <div className="border-t border-zinc-800 pt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{order.total} ETH</span></div>
            <div className="flex justify-between"><span>Taxa de rede</span><span>0.016 ETH</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span>{order.total} ETH</span></div>
          </div>
          <div className="text-xs text-green-400 mt-2">Seus NFTs agora estão na sua carteira.</div>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="mt-6 px-6 py-2.5 bg-violet-600 rounded-lg hover:bg-violet-500">Continuar explorando</button>
    </div>
  );
}