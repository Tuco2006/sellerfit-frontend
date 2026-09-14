import Link from "next/link";
import { ClassificacaoML, SinalNegocio } from "@/lib/types";

const labels: Record<SinalNegocio, string> = {
  ALERTA_CHURN: "Alerta Churn",
  OPORTUNIDADE_UPSELL: "Oportunidade Upsell",
  NEUTRO: "Neutro",
};

const cores: Record<SinalNegocio, string> = {
  ALERTA_CHURN: "bg-rose-500",
  OPORTUNIDADE_UPSELL: "bg-accent-500",
  NEUTRO: "bg-slate-500",
};

const corTermo: Record<SinalNegocio, string> = {
  ALERTA_CHURN: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  OPORTUNIDADE_UPSELL: "border-accent-500/30 bg-accent-500/10 text-accent-300",
  NEUTRO: "border-white/10 bg-white/5 text-slate-300",
};

const iconePorSinal: Record<SinalNegocio, string> = {
  ALERTA_CHURN: "⚠️",
  OPORTUNIDADE_UPSELL: "💰",
  NEUTRO: "📊",
};

export function ClassificacaoMLCard({
  classificacao,
  destaque = false,
}: {
  classificacao: ClassificacaoML;
  destaque?: boolean;
}) {
  const ordem: SinalNegocio[] = ["ALERTA_CHURN", "OPORTUNIDADE_UPSELL", "NEUTRO"];

  return (
    <div className={`card rounded-2xl ${destaque ? "p-7" : "p-6"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {destaque && <span className="text-2xl">{iconePorSinal[classificacao.sinal]}</span>}
          <h3 className={destaque ? "text-lg font-semibold text-white" : "text-sm font-semibold text-white"}>
            {destaque ? `Previsao do modelo: ${labels[classificacao.sinal]}` : "Classificacao por Machine Learning"}
          </h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">
          TF-IDF + Regressao Logistica
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Modelo estatistico treinado nos dados reais do desafio de Data Science da equipe — uma
        segunda forma de analisar a reuniao, sem depender de IA generativa.{" "}
        <Link href="/insights" className="text-brand-400 hover:text-brand-300">
          Entenda como
        </Link>
        .
      </p>

      <div className="mt-4 space-y-3">
        {ordem.map((classe) => (
          <div key={classe}>
            <div className="mb-1 flex justify-between text-xs">
              <span className={classe === classificacao.sinal ? "font-semibold text-white" : "text-slate-400"}>
                {labels[classe]}
                {classe === classificacao.sinal && " (previsto)"}
              </span>
              <span className="text-slate-500">{Math.round(classificacao.probabilidades[classe] * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${cores[classe]}`}
                style={{ width: `${classificacao.probabilidades[classe] * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {classificacao.termosChave.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Palavras-chave que pesaram nessa decisao
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {classificacao.termosChave.map((termo) => (
              <span
                key={termo}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${corTermo[classificacao.sinal]}`}
              >
                {termo}
              </span>
            ))}
          </div>
        </div>
      )}

      {classificacao.motivo && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Por que esse sinal</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{classificacao.motivo}</p>
        </div>
      )}

      {classificacao.janelasDeOportunidade.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Janelas de oportunidade e como aproveitar
          </p>
          <ul className="mt-2 space-y-2">
            {classificacao.janelasDeOportunidade.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 text-accent-400">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs italic text-slate-500">
        Esse modelo classico tem recall limitado (validado no notebook do desafio) e pode
        divergir da analise por IA — os dois rodam de proposito em paralelo pra comparar
        abordagens diferentes.
      </p>
    </div>
  );
}
