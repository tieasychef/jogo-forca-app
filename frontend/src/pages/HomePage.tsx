import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCriarUsuario } from '../hooks/useCriarUsuario';
import { ThemeToggle } from '../components/layout/ThemeToggle';

const homeSchema = z.object({
  nome: z.string().trim().min(2, 'Digite ao menos 2 caracteres').max(60, 'Nome muito longo'),
});

type HomeFormData = z.infer<typeof homeSchema>;

export function HomePage() {
  const navigate = useNavigate();
  const criarUsuario = useCriarUsuario();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeFormData>({
    resolver: zodResolver(homeSchema),
  });

  async function onSubmit(data: HomeFormData) {
    try {
      const usuario = await criarUsuario.mutateAsync({ nome: data.nome });
      localStorage.setItem('jogoForca.usuarioId', usuario.id);
      localStorage.setItem('jogoForca.nome', usuario.nome);
      navigate('/jogo');
    } catch {
      toast.error('Nao foi possivel iniciar o jogo. Tente novamente.');
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <NavLink
          to="/ranking"
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Ranking
        </NavLink>
        <NavLink
          to="/estatisticas"
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Estatisticas
        </NavLink>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <Gamepad2 size={28} />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Jogo da Forca</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Digite seu nome para começar a jogar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Como podemos te chamar?"
              autoComplete="off"
              autoFocus
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800"
              {...register('nome')}
            />
            {errors.nome && <p className="mt-1.5 text-sm text-red-500">{errors.nome.message}</p>}
          </div>

          <button
            type="submit"
            disabled={criarUsuario.isPending}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {criarUsuario.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Preparando jogo...
              </>
            ) : (
              'Jogar'
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
