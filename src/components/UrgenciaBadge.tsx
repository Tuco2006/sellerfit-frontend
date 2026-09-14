import { Urgencia } from "@/lib/types";

const estilos: Record<Urgencia, string> = {
  BAIXA: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  MEDIA: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  ALTA: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export function UrgenciaBadge({ urgencia }: { urgencia: Urgencia }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${estilos[urgencia]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      Urgencia {urgencia}
    </span>
  );
}
