import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import { Layout } from './components/Layout/Layout';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

import { HomePage } from './pages/Home/HomePage';
import { CataloguePage } from './pages/Catalogue/CataloguePage';
import { TrendingPage } from './pages/Trending/TrendingPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { SearchPage } from './pages/Search/SearchPage';
import { RecommendationsPage } from './pages/Recommendations/RecommendationsPage';
import { TopRatedPage } from './pages/TopRated/TopRatedPage';
import { FavoritesPage } from './pages/Favorites/FavoritesPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { AddProductPage } from './pages/AddProduct/AddProductPage';
import { ProductPage } from './pages/Product/ProductPage';
import { AddPersonPage } from './pages/AddPerson/AddPersonPage';
import { PersonPage } from './pages/Person/PersonPage';

import { Theme } from './types/types';

import './App.scss';

const App = (): JSX.Element => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Layout user={user} navigate={navigate} theme={Theme.light}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path='favorites' element={<FavoritesPage />} />
        </Route>
        <Route path='search' element={<SearchPage />} />
        <Route path='trending' element={<TrendingPage />} />
        <Route path='top-rated' element={<TopRatedPage />} />
        <Route path='recommedations' element={<RecommendationsPage />} />
        <Route path='catalogue' element={<CataloguePage />} />
        <Route element={<ProtectedRoute isAllowed={!user} />}>
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='add-product' element={<AddProductPage />} />
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='add-person' element={<AddPersonPage />} />
        <Route path='person/:id' element={<PersonPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
