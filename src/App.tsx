import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets';
import { HomePage } from '@/pages/home';
import { LoginPage, RegisterPage } from '@/pages/auth';
import { ExplorePage } from '@/pages/explore';
import { FavoritesPage } from '@/pages/favorites';
import { ReadLaterPage } from '@/pages/read-later';
import { ProtectedRoute } from '@/app/providers/router/ProtectedRoute';
import { SearchPage } from '@/pages/search';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Защищенные маршруты */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/read-later" element={<ReadLaterPage />} />
        <Route path="/regions" element={
          <ProtectedRoute>
            <div>Regions Page (Coming Soon)</div>
          </ProtectedRoute>
        } />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
