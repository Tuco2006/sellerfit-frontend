"use client";

import { FormEvent, useState } from "react";
import { analisarReuniao } from "@/lib/api";
import { ResultadoAnalise } from "@/lib/types";
import { UrgenciaBadge } from "@/components/UrgenciaBadge";
import { MatchCard } from "@/components/MatchCard";
import { SinalNegocioBanner } from "@/components/SinalNegocioBanner";
import { MencoesTags } from "@/components/MencoesTags";
import { ClassificacaoMLCard } from "@/components/ClassificacaoMLCard";

const segmentos = [
  "varejo",
  "industria",
  "saude",
  "logistica",
  "financeiro",
  "agronegocio",
  "educacao",
  "servicos",
  "contabilidade",
];

const exemploTranscricao = `Vendedor: entao, me conta um pouco do que esta acontecendo ai no dia a dia.
Cliente: olha, hoje o nosso sistema esta bem lento, principalmente no fechamento do caixa. Fora que a gente ainda faz o controle de estoque em planilha, o que da bastante retrabalho.
Vendedor: entendi, e sobre o suporte de voces hoje, como funciona?
Cliente: o suporte atual demora muito pra responder e as vezes a gente nem entende direito a explicacao. Ja estamos vendo propostas de outros fornecedores, tipo Linx, por causa disso.`;

export default function AnalisarPage() {
  const [clienteNome, setClienteNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [segmento, setSegmento] = useState(segmentos[0]);
  const [notaNps, setNotaNps] = useState("");
  const [transcricao, setTranscricao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    setResultado(null);

    try {
      const dados = await analisarReuniao({
        clienteNome,
        empresa,
        segmento,
        transcricao,
        notaNps: notaNps === "" ? undefined : Number(notaNps),
      });
      setResultado(dados);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "erro inesperado ao analisar a reuniao");
    } finally {
      setCarregando(false);
    }
  }

  function preencherExemplo() {
    setClienteNome("Marcos Andrade");
    setEmpresa("Rede Boa Compra");
    setSegmento("varejo");
    setNotaNps("4");
    setTranscricao(exemploTranscricao);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Analisar reuniao</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Cole a transcricao da conversa entre o vendedor e o cliente. A IA vai identificar dores,
          calcular a urgencia, apontar sinais de churn/upsell e sugerir o atendente mais compativel.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="card h-fit space-y-4 rounded-2xl p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Nome do cliente</label>
            <input
              required
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
              placeholder="Ex: Marcos Andrade"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Empresa</label>
              <input
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ex: Rede Boa Compra"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                NPS <span className="text-slate-500">(opcional)</span>
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={notaNps}
                onChange={(e) => setNotaNps(e.target.value)}
                placeholder="0 a 10"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Segmento</label>
            <select
              value={segmento}
              onChange={(e) => setSegmento(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
            >
              {segmentos.map((s) => (
                <option key={s} value={s} className="bg-base-900">
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-300">Transcricao da reuniao</label>
              <button
                type="button"
                onClick={preencherExemplo}
                className="text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                usar exemplo
              </button>
            </div>
            <textarea
              required
              minLength={20}
              value={transcricao}
              onChange={(e) => setTranscricao(e.target.value)}
              rows={9}
              placeholder="Cole aqui a conversa entre o vendedor e o cliente..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {carregando ? "Analisando com IA..." : "Analisar com IA"}
          </button>

          {erro && <p className="text-sm text-rose-400">{erro}</p>}
        </form>

        <div className="space-y-6">
          {!resultado && !carregando && (
            <div className="card flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl p-10 text-center">
              <span className="text-4xl">🔍</span>
              <p className="mt-4 max-w-sm text-sm text-slate-400">
                Preencha o formulario e clique em "Analisar com IA" pra ver o perfil do cliente e
                os atendentes recomendados aqui.
              </p>
            </div>
          )}

          {carregando && (
            <div className="card flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl p-10 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-400">A IA esta lendo a transcricao...</p>
            </div>
          )}

          {resultado && (
            <>
              <SinalNegocioBanner analise={resultado.analise} />

              {resultado.classificacaoML && (
                <ClassificacaoMLCard classificacao={resultado.classificacaoML} />
              )}

              <div className="card rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white">Perfil identificado</h2>
                  <div className="flex items-center gap-2">
                    <UrgenciaBadge urgencia={resultado.analise.urgencia} />
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                      {resultado.analise.origemAnalise === "openai" ? "analisado por IA (OpenAI)" : "motor local"}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">{resultado.analise.resumoPerfil}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    segmento: {resultado.analise.segmentoDetectado}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    sentimento: {resultado.analise.sentimentoGeral}
                  </span>
                  {resultado.analise.zonaNps && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      NPS: {resultado.analise.zonaNps}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <MencoesTags
                    mencoesTotvs={resultado.analise.mencoesTotvs}
                    mencoesConcorrentes={resultado.analise.mencoesConcorrentes}
                  />
                </div>

                <h3 className="mt-6 text-sm font-semibold text-white">Dores e necessidades identificadas</h3>
                <ul className="mt-3 space-y-2">
                  {resultado.analise.dores.map((dor, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-0.5 text-accent-400">●</span>
                      {dor}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-semibold text-white">Atendentes recomendados</h2>
                <div className="space-y-4">
                  {resultado.matches.map((match, i) => (
                    <MatchCard key={match.atendente.id} match={match} posicao={i + 1} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
