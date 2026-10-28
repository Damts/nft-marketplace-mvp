import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          <Link to="/" className="text-xl font-bold tracking-tight">KURIO</Link>
          <nav className="hidden md:flex gap-4 text-sm text-zinc-300">
            <Link to="/" className={loc.pathname === '/' ? 'text-white' : ''}>Início</Link>
            <Link to="/" className="">Mercado</Link>
            <Link to="/" className="">Criadores</Link>
            <Link to="/" className="">Aprenda</Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/cart" className="relative text-sm">
              Carrinho
              {count > 0 && <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-violet-600">{count}</span>}
            </Link>
            {user ? (
              <>
                <Link to="/account/profile" className="text-sm text-zinc-300">{user.username}</Link>
                <button onClick={logout} className="text-sm text-zinc-400 hover:text-white">Sair</button>
              </>
            ) : (
              <Link to="/login" className="text-sm bg-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-500">Entrar</Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-800 mt-12 py-8 text-center text-xs text-zinc-500">
        © 2026 Kurio MVP. Propriedade digital para todos.
      </footer>
    </div>
  );
}