import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { RankingPage } from './pages/RankingPage';
import { HistoricoPage } from './pages/HistoricoPage';
import { EstatisticasPage } from './pages/EstatisticasPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jogo" element={<GamePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/estatisticas" element={<EstatisticasPage />} />
      </Routes>
    </BrowserRouter>
  );
}
