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
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl">Nenhum pedido confirmado.</h2><button onClick={() => navigate('/')} className="mt-4 text-[#D28A4C]">Voltar</button></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-[#B8A99A] mb-4">Início / Mercado / Pagamento</div>
      <h1 className="text-2xl font-bold mb-2">Confirmação de pedido</h1>
      <div className="p-4 rounded-xl border border-[#4ade80]/40 bg-[#4ade80]/10 mb-6">
        <div className="text-[#4ade80] font-semibold">Transação confirmada na Ethereum.</div>
        <div className="text-sm text-[#F5EDE4] mt-1">A propriedade foi transferida para sua carteira conectada e registrada na rede.</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-[#3A2A1F] bg-[#1E1510] space-y-2 text-sm">
          <div><span className="text-[#B8A99A]">ID da transação:</span> {order.txHash}</div>
          <div><span className="text-[#B8A99A]">Data:</span> {order.date}</div>
          <div><span className="text-[#B8A99A]">Total:</span> {order.total} ETH</div>
          <div><span className="text-[#B8A99A]">Carteira:</span> {order.wallet}</div>
          <div><span className="text-[#B8A99A]">Rede:</span> {order.network}</div>
          <button className="mt-3 px-4 py-2 bg-[#2A1F18] rounded-lg text-sm hover:bg-[#3A2A1F]">Ver no Etherscan</button>
        </div>

        <div className="p-4 rounded-xl border border-[#3A2A1F] bg-[#1E1510] space-y-2">
          <h3 className="font-semibold mb-2">Detalhes da transação</h3>
          {order.items.map((it: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{it.nft.name} (x{it.quantity})</span>
              <span>{it.price} ETH</span>
            </div>
          ))}
          <div className="border-t border-[#3A2A1F] pt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{order.total} ETH</span></div>
            <div className="flex justify-between"><span>Taxa de rede</span><span>0.016 ETH</span></div>
            <div className="flex justify-between font-bold"><span>Total</span><span>{order.total} ETH</span></div>
          </div>
          <div className="text-xs text-[#4ade80] mt-2">Seus NFTs agora estão na sua carteira.</div>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="mt-6 px-6 py-2.5 bg-[#D28A4C] rounded-lg hover:bg-[#E0A060]">Continuar explorando</button>
    </div>
  );
}