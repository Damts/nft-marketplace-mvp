import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NFTS } from '../data/mockNfts';
import { useCart } from '../context/CartContext';

export default function NftDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const nft = NFTS.find((n) => n.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [edition, setEdition] = useState(nft?.edition || '1/50');
  const [fav, setFav] = useState(false);

  if (!nft) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl">NFT não encontrado</h2><button onClick={() => navigate('/')} className="mt-4 text-orange-300">Voltar</button></div>;
  }

  const handleBuy = () => {
    add(nft, qty, edition);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-zinc-500 mb-4">Início / Mercado</div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden border border-zinc-800">
          <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{nft.name}</h1>
          <div className="text-2xl text-orange-300 font-bold mb-2">{nft.price} ETH</div>
          <div className="text-sm text-zinc-500 mb-4">{nft.editions} avaliações de colecionadores</div>
          <p className="text-zinc-300 mb-4">{nft.description}</p>

          <div className="mb-4">
            <div className="text-sm font-semibold mb-2">Edição:</div>
            <div className="flex gap-2">
              {['1/1', '1/10', '1/50'].map((e) => (
                <button key={e} onClick={() => setEdition(e)} className={`px-3 py-1.5 rounded-lg border ${edition === e ? 'border-orange-500 bg-orange-500/20' : 'border-zinc-700'}`}>{e}</button>
              ))}
              <span className="px-3 py-1.5 rounded-lg bg-green-600/20 text-green-300 text-sm">ABERTA</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm">Qtd.</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded bg-zinc-800">-</button>
              <span className="w-8 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded bg-zinc-800">+</button>
            </div>
            <span className="text-lg font-bold">{(parseFloat(nft.price) * qty).toFixed(2)} ETH</span>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleBuy} className="px-6 py-2.5 bg-orange-500 rounded-lg hover:bg-orange-400 font-semibold">COMPRAR</button>
            <button onClick={() => setFav(!fav)} className={`px-4 py-2.5 rounded-lg border ${fav ? 'border-pink-500 text-pink-400' : 'border-zinc-700'}`}>{fav ? '♥ Favoritado' : '♡ Favoritar'}</button>
          </div>

          <div className="text-sm text-zinc-400 space-y-1">
            <div>ID do token: #{nft.id.split('_').pop()}</div>
            <div>Coleção: {nft.collection}</div>
            <div>Atributos: {nft.attributes.join(', ')}</div>
            <div>Rede: {nft.network}</div>
            <div>Disponível: {nft.available} edições</div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3">Mais desta coleção</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {NFTS.filter((n) => n.id !== nft.id).slice(0, 5).map((n) => (
            <a key={n.id} href={`/nfts/${n.id}`} className="block rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
              <img src={n.image} alt={n.name} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="p-2 text-xs">
                <div className="truncate">{n.name}</div>
                <div className="text-orange-300">{n.price} ETH</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}