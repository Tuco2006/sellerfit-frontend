import { RecomendacaoIA } from "@/lib/types";

export function RecomendacaoIACard({ recomendacao }: { recomendacao: RecomendacaoIA }) {
  const { atendente, justificativa } = recomendacao;

  return (
    <div className="card relative rounded-2xl border-brand-500/30 p-6">
      <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 text-xs font-bold text-white shadow-glow">
        ESCOLHA DA IA
      </span>

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Recomendacao direta da IA
      </p>

      <div className="mt-3 flex items-center gap-3">
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

      <p className="mt-4 text-sm leading-relaxed text-slate-200">{justificativa}</p>

      <p className="mt-4 text-xs italic text-slate-500">
        Diferente do ranking por score abaixo, essa escolha vem do proprio modelo de linguagem
        lendo a bio e o perfil de cada atendente do catalogo, nao de uma formula fixa.
      </p>
    </div>
  );
}
