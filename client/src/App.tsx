import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { PageContent } from './components/PageContent/PageContent';

import { HomePage } from './pages/Home/HomePage';
import { CataloguePage } from './pages/Catalogue/CataloguePage';
import { TrendingPage } from './pages/Trending/TrendingPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { SearchPage } from './pages/Search/SearchPage';
import { RecommendationsPage } from './pages/Recommendations/RecommendationsPage';
import { TopRatedPage } from './pages/TopRated/TopRatedPage';
import { FavoritesPage } from './pages/Favorites/FavoritesPage';

import { Theme } from './types/types';

import './App.scss';
import { RegisterPage } from './pages/Register/RegisterPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout theme={Theme.light}>
            <PageContent>{<Outlet />}</PageContent>
          </Layout>
        }
      >
        <Route index element={<HomePage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='trending' element={<TrendingPage />} />
        <Route path='top-rated' element={<TopRatedPage />} />
        <Route path='recommedations' element={<RecommendationsPage />} />
        <Route path='catalogue' element={<CataloguePage />} />
        <Route path='favorites' element={<FavoritesPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
