import { useState, useMemo } from 'react';
import { NFTS, COLLECTIONS, NETWORKS } from '../data/mockNfts';
import NftCard from '../components/NftCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('Todos os NFTs');
  const [priceMin, setPriceMin] = useState(0.02);
  const [priceMax, setPriceMax] = useState(12.30);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = [...NFTS];
    if (query) list = list.filter((n) => n.name.toLowerCase().includes(query.toLowerCase()));
    if (collection) list = list.filter((n) => n.collection === collection);
    if (network) list = list.filter((n) => n.network === network);
    if (tab === 'Novos lançamentos') list = list.filter((n) => n.rare);
    list = list.filter((n) => {
      const p = parseFloat(n.price);
      return p >= priceMin && p <= priceMax;
    });
    if (sort === 'price-asc') list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sort === 'price-desc') list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    return list;
  }, [query, collection, network, sort, tab, priceMin, priceMax]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const featured = NFTS.find((n) => n.id === 'nft_sage_nomad_009')!;

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#B8A99A] mb-2">Bem-vindo à Kurio</div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">SEJA DONO DO FUTURO DA ARTE DIGITAL</h1>
          <p className="text-[#B8A99A] max-w-md mb-6">Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet.</p>
          <button className="px-6 py-2.5 bg-[#D28A4C] rounded-lg hover:bg-[#E0A060] font-semibold text-[#000000]">EXPLORAR</button>
        </div>
        <div className="relative">
          <img src={featured.image} alt={featured.name} className="w-full max-w-md mx-auto rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* Mobile hero alt */}
      <section className="md:hidden max-w-7xl mx-auto px-4 pb-8 text-center">
        <div className="text-xs uppercase tracking-widest text-[#B8A99A] mb-1">Bem-vindo à Kurio</div>
        <h2 className="text-2xl font-bold mb-2">SEJA DONO DA CULTURA DIGITAL</h2>
        <p className="text-[#B8A99A] text-sm mb-4">Descubra NFTs selecionados de criadores do mundo todo.</p>
        <button className="px-5 py-2 bg-[#D28A4C] rounded-lg text-sm text-[#000000]">EXPLORAR</button>
      </section>

      {/* Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 shrink-0 space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm">Buscar</h3>
              <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Buscar NFTs" className="w-full text-sm" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Coleções</h3>
              <ul className="space-y-1 text-sm">
                {COLLECTIONS.slice(0, 6).map((c) => (
                  <li key={c} className="flex items-center justify-between">
                    <button onClick={() => { setCollection(collection === c ? null : c); setPage(1); }} className={`text-left ${collection === c ? 'text-[#F5EDE4] font-medium' : 'text-[#B8A99A] hover:text-[#F5EDE4]'}`}>
                      {c}
                    </button>
                    <span className="text-xs text-[#B8A99A]">({Math.floor(Math.random() * 40 + 3)})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Faixa de preço</h3>
              <div className="text-xs text-[#B8A99A] mb-2">Preço: {priceMin.toFixed(2)} - {priceMax.toFixed(2)} ETH</div>
              <div className="relative h-6 mb-2">
                <input type="range" min="0.02" max="12.30" step="0.01" value={priceMin}
                  onChange={(e) => setPriceMin(Math.min(parseFloat(e.target.value), priceMax - 0.01))}
                  className="absolute w-full h-1 appearance-none bg-[#3A2A1F] rounded-lg accent-[#D28A4C]" />
                <input type="range" min="0.02" max="12.30" step="0.01" value={priceMax}
                  onChange={(e) => setPriceMax(Math.max(parseFloat(e.target.value), priceMin + 0.01))}
                  className="absolute w-full h-1 appearance-none bg-transparent rounded-lg accent-[#D28A4C]" />
              </div>
              <div className="flex justify-between text-xs text-[#B8A99A]">
                <span>{priceMin.toFixed(2)}</span>
                <span>{priceMax.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Rede</h3>
              <ul className="space-y-1 text-sm">
                {NETWORKS.map((n) => (
                  <li key={n} className="flex items-center justify-between">
                    <button onClick={() => { setNetwork(network === n ? null : n); setPage(1); }} className={`text-left ${network === n ? 'text-[#F5EDE4] font-medium' : 'text-[#B8A99A] hover:text-[#F5EDE4]'}`}>
                      {n}
                    </button>
                    <span className="text-xs text-[#B8A99A]">({Math.floor(Math.random() * 100 + 70)})</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex gap-6 text-sm border-b border-[#3A2A1F] mb-4">
                {['Todos os NFTs', 'Novos lançamentos', 'Em alta'].map((t) => (
                  <button key={t} onClick={() => { setTab(t); setPage(1); }} className={`pb-2 border-b-2 transition ${tab === t ? 'border-[#D28A4C] text-[#D28A4C]' : 'border-transparent text-[#F5EDE4] hover:text-[#D28A4C]'}`}>{t}</button>
                ))}
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm">
                <option value="recent">Listados recentemente</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </div>

            <p className="text-sm text-[#B8A99A] mb-3">{filtered.length} NFTs encontrados</p>

            {/* Featured NFT highlight */}
            <div className="mb-6 p-4 rounded-xl border border-[#3A2A1F] bg-[#1E1510] flex items-center gap-4">
              <div className="text-xs uppercase text-[#D28A4C] font-bold">NFT EM DESTAQUE<br/>OFERTA LIMITADA</div>
              <img src={featured.image} alt={featured.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{featured.name}</div>
                <div className="text-[#D28A4C] text-sm">{featured.price} ETH</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageItems.map((n) => <NftCard key={n.id} nft={n} />)}
            </div>

            {totalPages > 1 && (
              <div className="flex gap-2 mt-6 justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 rounded ${p === page ? 'bg-[#D28A4C]' : 'bg-[#2A1F18] hover:bg-[#3A2A1F]'}`}>{p}</button>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      {/* Promo cards */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D28A4C]/30 to-[#1E1510] border border-[#3A2A1F]">
          <h3 className="text-xl font-bold mb-2">Lançamentos gênesis<br/>de edição limitada</h3>
          <p className="text-[#B8A99A] text-sm mb-4">Colecione edições escassas diretamente dos criadores antes da revelação pública.</p>
          <button className="px-4 py-2 bg-[#D28A4C] rounded-lg text-sm hover:bg-[#E0A060] text-[#000000]">Explorar</button>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D28A4C]/20 to-[#1E1510] border border-[#3A2A1F]">
          <h3 className="text-xl font-bold mb-2">Arte digital selecionada<br/>e muito mais</h3>
          <p className="text-[#B8A99A] text-sm mb-4">Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.</p>
          <button className="px-4 py-2 bg-[#3A2A1F] rounded-lg text-sm hover:bg-[#3A2A1F]">Explorar</button>
        </div>
      </section>

      {/* Editorial */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Diário da Cunhagem</h2>
        <p className="text-[#B8A99A] text-sm mb-6">Histórias, guias e insights para colecionadores sobre o universo da propriedade digital.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Como funciona a propriedade de NFTs', date: '12 de setembro', read: '6 min' },
            { title: '10 artistas digitais para acompanhar', date: '13 de setembro', read: '2 min' },
            { title: 'Raridade, atributos e procedência', date: '15 de setembro', read: '3 min' },
            { title: 'Como proteger sua carteira', date: '15 de setembro', read: '2 min' },
          ].map((a) => (
            <div key={a.title} className="rounded-xl overflow-hidden border border-[#3A2A1F] bg-[#1E1510]">
              <div className="aspect-video bg-[#2A1F18]" />
              <div className="p-3">
                <div className="text-xs text-[#B8A99A] mb-1">{a.date} | Leitura de {a.read}</div>
                <div className="font-semibold text-sm">{a.title}</div>
                <div className="text-xs text-[#D28A4C] mt-2">Ler mais →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer editorial */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 border-t border-[#3A2A1F]">
        <div className="p-5 rounded-xl bg-[#1E1510] border border-[#3A2A1F]">
          <div className="w-8 h-8 rounded-full bg-[#D28A4C]/30 flex items-center justify-center mb-3 text-[#D28A4C] font-bold">W</div>
          <h3 className="font-semibold mb-1">Segurança da carteira</h3>
          <p className="text-sm text-[#B8A99A]">Proteja sua carteira e colecione arte digital verificada com confiança.</p>
        </div>
        <div className="p-5 rounded-xl bg-[#1E1510] border border-[#3A2A1F]">
          <div className="w-8 h-8 rounded-full bg-[#D28A4C]/30 flex items-center justify-center mb-3 text-[#D28A4C] font-bold">C</div>
          <h3 className="font-semibold mb-1">Criadores em destaque</h3>
          <p className="text-sm text-[#B8A99A]">Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.</p>
        </div>
        <div className="p-5 rounded-xl bg-[#1E1510] border border-[#3A2A1F]">
          <div className="w-8 h-8 rounded-full bg-[#D28A4C]/30 flex items-center justify-center mb-3 text-[#D28A4C] font-bold">D</div>
          <h3 className="font-semibold mb-1">Alertas de lançamentos</h3>
          <p className="text-sm text-[#B8A99A] mb-3">Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.</p>
          <div className="flex gap-2">
            <input placeholder="digite seu e-mail..." className="flex-1 text-sm" />
            <button className="px-3 py-1.5 bg-[#D28A4C] rounded-lg text-sm hover:bg-[#E0A060]">Enviar</button>
          </div>
        </div>
      </section>
    </div>
  );
}