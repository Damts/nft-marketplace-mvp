import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NftDetail from './pages/NftDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wallets from './pages/Wallets';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('nft_user');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nfts/:id" element={<NftDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/confirmation" element={<RequireAuth><Confirmation /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/account/wallets" element={<RequireAuth><Wallets /></RequireAuth>} />
              <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl">Página não encontrada</h2></div>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}