import { AnaliseTranscricao } from "@/lib/types";

const config: Record<
  AnaliseTranscricao["sinalNegocio"],
  { titulo: string; acao: string; icone: string; classe: string }
> = {
  ALERTA_CHURN: {
    titulo: "Risco de Churn",
    acao: "Encaminhar para o time de Retenção",
    icone: "⚠️",
    classe: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  },
  OPORTUNIDADE_UPSELL: {
    titulo: "Oportunidade de Upsell",
    acao: "Encaminhar para o time de Cross-sell",
    icone: "💰",
    classe: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
  NEUTRO: {
    titulo: "Sem sinal crítico de negócio",
    acao: "Seguir o atendimento normalmente",
    icone: "🟢",
    classe: "border-white/10 bg-white/5 text-slate-300",
  },
};

export function SinalNegocioBanner({ analise }: { analise: AnaliseTranscricao }) {
  const c = config[analise.sinalNegocio] ?? config.NEUTRO;

  return (
    <div className={`rounded-2xl border p-5 ${c.classe}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{c.icone}</span>
        <div>
          <p className="font-semibold">{c.titulo}</p>
          <p className="text-sm opacity-90">{c.acao}</p>
          {analise.justificativaSinal && (
            <p className="mt-2 text-xs opacity-75">{analise.justificativaSinal}</p>
          )}
        </div>
      </div>
    </div>
  );
}
