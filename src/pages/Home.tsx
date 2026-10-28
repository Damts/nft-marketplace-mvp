import { useState, useMemo } from 'react';
import { NFTS, COLLECTIONS, NETWORKS } from '../data/mockNfts';
import NftCard from '../components/NftCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = [...NFTS];
    if (query) list = list.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()));
    if (collection) list = list.filter((n) => n.collection === collection);
    if (network) list = list.filter((n) => n.network === network);
    if (sort === 'price-asc') list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sort === 'price-desc') list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    return list;
  }, [query, collection, network, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="mb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-3">SEJA DONO DO FUTURO DA ARTE DIGITAL</h1>
        <p className="text-zinc-400 max-w-2xl">Descubra NFTs selecionados de criadores emergentes e consagrados.</p>
        <button className="mt-4 px-6 py-2.5 bg-violet-600 rounded-lg hover:bg-violet-500">EXPLORAR</button>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Buscar</h3>
            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Buscar NFTs" className="w-full" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Coleções</h3>
            <ul className="space-y-1 text-sm">
              {COLLECTIONS.slice(0, 6).map((c) => (
                <li key={c}>
                  <button onClick={() => { setCollection(collection === c ? null : c); setPage(1); }} className={`w-full text-left px-2 py-1 rounded ${collection === c ? 'bg-violet-600/30 text-white' : 'text-zinc-400 hover:text-white'}`}>
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Rede</h3>
            <ul className="space-y-1 text-sm">
              {NETWORKS.map((n) => (
                <li key={n}>
                  <button onClick={() => { setNetwork(network === n ? null : n); setPage(1); }} className={`w-full text-left px-2 py-1 rounded ${network === n ? 'bg-violet-600/30 text-white' : 'text-zinc-400 hover:text-white'}`}>
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex gap-2 text-sm">
              {['Todos os NFTs', 'Novos lançamentos', 'Em alta'].map((t) => (
                <button key={t} className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700">{t}</button>
              ))}
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm">
              <option value="recent">Listados recentemente</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>

          <p className="text-sm text-zinc-500 mb-3">{filtered.length} NFTs encontrados</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((n) => <NftCard key={n.id} nft={n} />)}
          </div>

          {totalPages > 1 && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 rounded ${p === page ? 'bg-violet-600' : 'bg-zinc-800 hover:bg-zinc-700'}`}>{p}</button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}