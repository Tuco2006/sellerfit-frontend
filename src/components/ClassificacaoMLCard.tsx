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

export function ClassificacaoMLCard({ classificacao }: { classificacao: ClassificacaoML }) {
  const ordem: SinalNegocio[] = ["ALERTA_CHURN", "OPORTUNIDADE_UPSELL", "NEUTRO"];

  return (
    <div className="card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">
          Classificacao por Machine Learning
        </h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">
          TF-IDF + Regressao Logistica
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Modelo estatistico treinado nos dados reais do desafio de Data Science da equipe, rodando
        em paralelo com a IA generativa.{" "}
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

      <p className="mt-4 text-xs italic text-slate-500">
        Esse modelo classico tem recall limitado (validado no notebook do desafio) e pode
        divergir da regra de negocio acima — os dois rodam de propósito em paralelo pra comparar
        abordagens diferentes.
      </p>
    </div>
  );
}
