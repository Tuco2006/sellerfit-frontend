import { MatchAtendente } from "@/lib/types";
import { ScoreBar } from "./ScoreBar";

export function MatchCard({ match, posicao }: { match: MatchAtendente; posicao: number }) {
  const { atendente, score, motivo } = match;

  return (
    <div className="card relative flex flex-col gap-3 rounded-2xl p-6">
      {posicao === 1 && (
        <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-xs font-bold text-white shadow-glow">
          MELHOR MATCH
        </span>
      )}

      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: atendente.avatarCor }}
        >
          {atendente.iniciais}
        </div>
        <div>
          <p className="font-semibold text-white">
            {posicao}. {atendente.nome}
          </p>
          <p className="text-sm text-slate-400">{atendente.cargo}</p>
        </div>
      </div>

      <ScoreBar score={score} />

      <p className="text-sm leading-relaxed text-slate-300">{motivo}</p>

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
    </div>
  );
}
