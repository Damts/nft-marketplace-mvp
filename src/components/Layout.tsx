import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">KURIO</Link>
          <nav className="hidden md:flex gap-6 text-sm text-zinc-300">
            <Link to="/" className={loc.pathname === '/' ? 'text-white font-medium' : 'hover:text-white'}>Início</Link>
            <Link to="/" className="hover:text-white">Mercado</Link>
            <Link to="/" className="hover:text-white">Criadores</Link>
            <Link to="/" className="hover:text-white">Aprenda</Link>
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <Link to="/cart" className="relative text-sm flex items-center gap-1">
              <span>Carrinho</span>
              {count > 0 && <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-orange-500 font-bold">{count}</span>}
            </Link>
            {user ? (
              <>
                <Link to="/account/profile" className="text-sm text-zinc-300 hover:text-white">{user.username}</Link>
                <button onClick={logout} className="text-sm text-zinc-400 hover:text-white">Sair</button>
              </>
            ) : (
              <Link to="/login" className="text-sm bg-orange-500 px-4 py-1.5 rounded-lg hover:bg-orange-400 font-medium">Entrar</Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3 text-sm">Meu perfil</h4>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                <li><Link to="/account/profile" className="hover:text-white">Meu perfil</Link></li>
                <li><span className="cursor-pointer hover:text-white">Minha coleção</span></li>
                <li><span className="cursor-pointer hover:text-white">Atividade</span></li>
                <li><span className="cursor-pointer hover:text-white">Estúdio do criador</span></li>
                <li><Link to="/favorites" className="hover:text-white">Lista de interesse</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Central de ajuda</h4>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                <li><span className="cursor-pointer hover:text-white">Central de ajuda</span></li>
                <li><span className="cursor-pointer hover:text-white">Como comprar NFTs</span></li>
                <li><span className="cursor-pointer hover:text-white">Carteira e segurança</span></li>
                <li><span className="cursor-pointer hover:text-white">Política do mercado</span></li>
                <li><span className="cursor-pointer hover:text-white">Denunciar item</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Coleções</h4>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                <li><a href="/?categories=arte-digital" className="hover:text-white">Arte digital</a></li>
                <li><a href="/?categories=fotografia" className="hover:text-white">Fotografia</a></li>
                <li><a href="/?categories=musica" className="hover:text-white">Música</a></li>
                <li><a href="/?categories=arte-3d" className="hover:text-white">Arte 3D</a></li>
                <li><a href="/?categories=utilidade" className="hover:text-white">Utilidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Redes sociais</h4>
              <div className="flex gap-3 text-zinc-400 mb-4">
                <span className="cursor-pointer hover:text-white">𝕏</span>
                <span className="cursor-pointer hover:text-white">IG</span>
                <span className="cursor-pointer hover:text-white">DC</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Carteiras compatíveis</h4>
              <div className="text-xs text-zinc-500">METAMASK • WALLETCONNECT • COINBASE</div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div>
              <div className="font-bold text-zinc-300 mb-1">KURIO</div>
              <div>Feito para colecionadores, criadores e cultura</div>
              <div className="mt-1">contato@email.com • +55 11 4002 8922</div>
            </div>
            <div>© 2026 Kurio. Propriedade digital para todos.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}