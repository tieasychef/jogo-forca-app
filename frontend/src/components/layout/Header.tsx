import { NavLink } from 'react-router-dom';
import { Gamepad2, History, Trophy, BarChart3 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { to: '/ranking', label: 'Ranking', icone: Trophy },
  { to: '/historico', label: 'Historico', icone: History },
  { to: '/estatisticas', label: 'Estatisticas', icone: BarChart3 },
];

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4">
      <NavLink to="/" className="flex items-center gap-2 font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <Gamepad2 size={18} />
        </span>
        <span className="hidden sm:inline">Jogo da Forca</span>
      </NavLink>

      <nav className="flex items-center gap-1">
        {LINKS.map(({ to, label, icone: Icone }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icone size={15} />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
