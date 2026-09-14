export function MencoesTags({
  mencoesTotvs,
  mencoesConcorrentes,
}: {
  mencoesTotvs: string[];
  mencoesConcorrentes: string[];
}) {
  if (mencoesTotvs.length === 0 && mencoesConcorrentes.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {mencoesTotvs.map((m) => (
        <span
          key={m}
          className="rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-400"
        >
          TOTVS {m}
        </span>
      ))}
      {mencoesConcorrentes.map((m) => (
        <span
          key={m}
          className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400"
        >
          concorrente: {m}
        </span>
      ))}
    </div>
  );
}
