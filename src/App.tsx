import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorksheetsPage from './pages/WorksheetsPage';
import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import WorksheetViewer from './components/WorksheetViewer';
import GamePlayer from './components/GamePlayer';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/worksheets" element={<WorksheetsPage />} />
              <Route path="/worksheets/:id" element={<WorksheetViewer />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/:id" element={<GamePlayer />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;