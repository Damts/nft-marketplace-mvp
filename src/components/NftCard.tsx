import { Link } from 'react-router-dom';
import type { Nft } from '../lib/types';

export default function NftCard({ nft }: { nft: Nft }) {
  const oldPrice = (parseFloat(nft.price) * 1.15).toFixed(2);
  return (
    <Link to={`/nfts/${nft.id}`} className="group block rounded-xl overflow-hidden border border-[#3A2A1F] bg-[#1E1510] hover:border-[#D28A4C] transition">
      <div className="aspect-square overflow-hidden relative">
        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
        {nft.rare && <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded bg-[#D28A4C] text-[#000000] font-bold">RARO</span>}
      </div>
      <div className="p-3">
        <div className="text-xs text-[#B8A99A] mb-1">{nft.collection}</div>
        <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[#D28A4C] font-bold text-xl">{nft.price} ETH</span>
          {nft.rare && <span className="text-xs text-[#B8A99A] line-through">{oldPrice} ETH</span>}
        </div>
        {nft.available < 5 && <div className="text-[10px] text-[#ff6b6b] mt-1">Últimas unidades</div>}
      </div>
    </Link>
  );
}