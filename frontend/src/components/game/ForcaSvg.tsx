interface ForcaSvgProps {
  erros: number;
}

export function ForcaSvg({ erros }: ForcaSvgProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      className="h-48 w-48 text-slate-700 dark:text-slate-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <line x1="10" y1="210" x2="150" y2="210" />
      <line x1="40" y1="210" x2="40" y2="20" />
      <line x1="40" y1="20" x2="130" y2="20" />
      <line x1="130" y1="20" x2="130" y2="45" />

      {erros >= 1 && <circle cx="130" cy="65" r="20" />}
      {erros >= 2 && <line x1="130" y1="85" x2="130" y2="140" />}
      {erros >= 3 && <line x1="130" y1="100" x2="108" y2="120" />}
      {erros >= 4 && <line x1="130" y1="100" x2="152" y2="120" />}
      {erros >= 5 && <line x1="130" y1="140" x2="112" y2="175" />}
      {erros >= 6 && <line x1="130" y1="140" x2="148" y2="175" />}
    </svg>
  );
}
