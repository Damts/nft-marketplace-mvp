import { Link } from 'react-router-dom';
import type { Nft } from '../lib/types';

export default function NftCard({ nft }: { nft: Nft }) {
  const oldPrice = (parseFloat(nft.price) * 1.15).toFixed(2);
  return (
    <Link to={`/nfts/${nft.id}`} className="group block rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-violet-600 transition">
      <div className="aspect-square overflow-hidden relative">
        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
        {nft.rare && <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded bg-amber-500/90 text-black font-bold">RARO</span>}
      </div>
      <div className="p-3">
        <div className="text-xs text-zinc-500 mb-1">{nft.collection}</div>
        <h3 className="font-semibold text-sm truncate">{nft.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-violet-400 font-bold">{nft.price} ETH</span>
          {nft.rare && <span className="text-xs text-zinc-500 line-through">{oldPrice} ETH</span>}
        </div>
        {nft.available < 5 && <div className="text-[10px] text-red-400 mt-1">Últimas unidades</div>}
      </div>
    </Link>
  );
}