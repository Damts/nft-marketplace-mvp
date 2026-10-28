import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQty, remove, subtotal, coupon, discount, applyCoupon, removeCoupon } = useCart();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const handleApply = () => {
    if (applyCoupon(code)) {
      setCouponMsg('Cupom aplicado!');
    } else {
      setCouponMsg('Código inválido ou expirado.');
    }
  };

  const networkFee = 0.016;
  const total = subtotal - discount + networkFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-[#B8A99A] mb-4">Início / Mercado / Carrinho</div>
      <h1 className="text-2xl font-bold mb-6">Carrinho de NFTs</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 text-[#B8A99A]">
          <p>Carrinho vazio.</p>
          <button onClick={() => navigate('/')} className="mt-4 text-[#D28A4C]">Continuar explorando</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map((i) => (
              <div key={i.nft.id} className="flex gap-4 p-3 rounded-xl border border-[#3A2A1F] bg-[#1E1510]">
                <img src={i.nft.image} alt={i.nft.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-semibold">{i.nft.name}</div>
                  <div className="text-xs text-[#B8A99A]">ID do token: #{i.nft.id.split('_').pop()}</div>
                  <div className="text-xs text-[#B8A99A]">Edição: {i.edition}</div>
                  <div className="text-[#D28A4C] text-sm mt-1">{i.nft.price} ETH</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(i.nft.id, i.quantity - 1)} className="w-7 h-7 rounded bg-[#2A1F18]">-</button>
                    <span className="w-6 text-center">{i.quantity}</span>
                    <button onClick={() => updateQty(i.nft.id, i.quantity + 1)} className="w-7 h-7 rounded bg-[#2A1F18]">+</button>
                  </div>
                  <div className="font-bold">{(parseFloat(i.nft.price) * i.quantity).toFixed(2)} ETH</div>
                  <button onClick={() => remove(i.nft.id)} className="text-xs text-[#ff6b6b] hover:text-[#ff6b6b]">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-[#3A2A1F] bg-[#1E1510] h-fit space-y-3">
            <h3 className="font-semibold">Resumo da carteira</h3>
            <div className="flex gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Digite o código promocional..." className="flex-1 text-sm" />
              <button onClick={handleApply} className="px-3 py-1.5 bg-[#3A2A1F] rounded-lg text-sm hover:bg-[#3A2A1F]">Aplicar</button>
            </div>
            {couponMsg && <div className={`text-xs ${coupon ? 'text-[#4ade80]' : 'text-[#ff6b6b]'}`}>{couponMsg}</div>}
            {coupon && <div className="text-xs text-[#4ade80]">Cupom: {coupon} <button onClick={() => { removeCoupon(); setCouponMsg(''); }} className="text-[#ff6b6b] ml-2">remover</button></div>}

            <div className="space-y-1 text-sm border-t border-[#3A2A1F] pt-3">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(3)} ETH</span></div>
              <div className="flex justify-between"><span>Desconto do lançamento</span><span>(-) {discount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxa de rede</span><span>{networkFee} ETH</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-[#3A2A1F]"><span>Total</span><span>{total.toFixed(3)} ETH</span></div>
            </div>

            <button onClick={() => navigate('/checkout')} className="w-full py-2.5 bg-[#D28A4C] rounded-lg hover:bg-[#E0A060] font-semibold">Conectar e finalizar</button>
            <button onClick={() => navigate('/')} className="w-full py-2.5 bg-[#2A1F18] rounded-lg hover:bg-[#3A2A1F] text-sm">Continuar explorando</button>
          </div>
        </div>
      )}
    </div>
  );
}