import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'jogoForca.theme';

function obterThemeInicial(): Theme {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo === 'light' || salvo === 'dark') return salvo;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(obterThemeInicial);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((atual) => (atual === 'dark' ? 'light' : 'dark'));
  }

  return { theme, toggleTheme };
}
