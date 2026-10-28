import { Link } from 'react-router-dom';
import type { Nft } from '../lib/types';

export default function NftCard({ nft }: { nft: Nft }) {
  return (
    <Link to={`/nfts/${nft.id}`} className="group block rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-violet-600 transition">
      <div className="aspect-square overflow-hidden">
        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {nft.rare && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">RARO</span>}
          <span className="text-xs text-zinc-500">{nft.collection}</span>
        </div>
        <h3 className="font-semibold text-sm truncate">{nft.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-violet-400 font-bold">{nft.price} ETH</span>
          {nft.available < 5 && <span className="text-[10px] text-red-400">Últimas unidades</span>}
        </div>
      </div>
    </Link>
  );
}