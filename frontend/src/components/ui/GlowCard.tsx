import { useRef, type MouseEvent, type ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className = '' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(evento: MouseEvent<HTMLDivElement>) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${evento.clientX - rect.left}px`);
    card.style.setProperty('--y', `${evento.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), rgba(99,102,241,0.15), transparent 70%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
