import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function GamePage() {
  const navigate = useNavigate();
  const nome = localStorage.getItem('jogoForca.nome');

  useEffect(() => {
    if (!nome) navigate('/', { replace: true });
  }, [nome, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">Ola, {nome}!</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          A tela do jogo sera implementada na proxima etapa.
        </p>
      </div>
    </main>
  );
}
