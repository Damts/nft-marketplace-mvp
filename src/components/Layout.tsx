import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#140D0A] text-[#F5EDE4]">
      <header className="sticky top-0 z-40 border-b border-[#3A2A1F] bg-[#140D0A]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">KURIO</Link>
          <nav className="hidden md:flex gap-6 text-sm text-[#F5EDE4]">
            <Link to="/" className={loc.pathname === '/' ? 'text-[#F5EDE4] font-medium' : 'hover:text-[#F5EDE4]'}>Início</Link>
            <Link to="/" className="hover:text-[#F5EDE4]">Mercado</Link>
            <Link to="/" className="hover:text-[#F5EDE4]">Criadores</Link>
            <Link to="/" className="hover:text-[#F5EDE4]">Aprenda</Link>
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <Link to="/cart" className="relative text-sm flex items-center gap-1">
              <span>Carrinho</span>
              {count > 0 && <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#D28A4C] font-bold">{count}</span>}
            </Link>
            {user ? (
              <>
                <Link to="/account/profile" className="text-sm text-[#F5EDE4] hover:text-[#F5EDE4]">{user.username}</Link>
                <button onClick={logout} className="text-sm text-[#B8A99A] hover:text-[#F5EDE4]">Sair</button>
              </>
            ) : (
              <Link to="/login" className="text-sm bg-[#D28A4C] px-4 py-1.5 rounded-lg hover:bg-[#E0A060] font-medium">Entrar</Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#3A2A1F] mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3 text-sm">Meu perfil</h4>
              <ul className="space-y-1.5 text-sm text-[#B8A99A]">
                <li><Link to="/account/profile" className="hover:text-[#F5EDE4]">Meu perfil</Link></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Minha coleção</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Atividade</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Estúdio do criador</span></li>
                <li><Link to="/favorites" className="hover:text-[#F5EDE4]">Lista de interesse</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Central de ajuda</h4>
              <ul className="space-y-1.5 text-sm text-[#B8A99A]">
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Central de ajuda</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Como comprar NFTs</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Carteira e segurança</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Política do mercado</span></li>
                <li><span className="cursor-pointer hover:text-[#F5EDE4]">Denunciar item</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Coleções</h4>
              <ul className="space-y-1.5 text-sm text-[#B8A99A]">
                <li><a href="/?categories=arte-digital" className="hover:text-[#F5EDE4]">Arte digital</a></li>
                <li><a href="/?categories=fotografia" className="hover:text-[#F5EDE4]">Fotografia</a></li>
                <li><a href="/?categories=musica" className="hover:text-[#F5EDE4]">Música</a></li>
                <li><a href="/?categories=arte-3d" className="hover:text-[#F5EDE4]">Arte 3D</a></li>
                <li><a href="/?categories=utilidade" className="hover:text-[#F5EDE4]">Utilidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Redes sociais</h4>
              <div className="flex gap-3 text-[#B8A99A] mb-4">
                <span className="cursor-pointer hover:text-[#F5EDE4]">𝕏</span>
                <span className="cursor-pointer hover:text-[#F5EDE4]">IG</span>
                <span className="cursor-pointer hover:text-[#F5EDE4]">DC</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Carteiras compatíveis</h4>
              <div className="text-xs text-[#B8A99A]">METAMASK • WALLETCONNECT • COINBASE</div>
            </div>
          </div>

          <div className="border-t border-[#3A2A1F] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B8A99A]">
            <div>
              <div className="font-bold text-[#F5EDE4] mb-1">KURIO</div>
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