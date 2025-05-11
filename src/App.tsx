import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <RecipeProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col bg-amber-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoritesProvider>
      </RecipeProvider>
    </Router>
  );
}

export default App;