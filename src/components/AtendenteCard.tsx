import { Atendente } from "@/lib/types";

const disponibilidadeCor: Record<Atendente["disponibilidade"], string> = {
  Disponivel: "bg-emerald-400",
  "Em atendimento": "bg-amber-400",
  Ausente: "bg-slate-500",
};

export function AtendenteCard({ atendente }: { atendente: Atendente }) {
  return (
    <div className="card flex flex-col gap-4 rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundColor: atendente.avatarCor }}
          >
            {atendente.iniciais}
          </div>
          <div>
            <p className="font-semibold text-white">{atendente.nome}</p>
            <p className="text-sm text-slate-400">{atendente.cargo}</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className={`h-2 w-2 rounded-full ${disponibilidadeCor[atendente.disponibilidade]}`} />
          {atendente.disponibilidade}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{atendente.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {atendente.tracos.map((traco) => (
          <span
            key={traco}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
          >
            {traco}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {atendente.segmentos.map((segmento) => (
          <span
            key={segmento}
            className="rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs text-brand-400"
          >
            {segmento}
          </span>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
        <div>
          <p className="text-lg font-bold text-white">{atendente.notaMedia.toFixed(1)}</p>
          <p className="text-xs text-slate-500">nota media</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{atendente.casesResolvidos}</p>
          <p className="text-xs text-slate-500">atendimentos</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{atendente.anosExperiencia}</p>
          <p className="text-xs text-slate-500">anos totvs</p>
        </div>
      </div>
    </div>
  );
}
