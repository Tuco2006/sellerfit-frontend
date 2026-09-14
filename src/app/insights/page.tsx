import Link from "next/link";

const distribuicao = [
  { classe: "Neutro", quantidade: 136, cor: "bg-slate-500" },
  { classe: "Oportunidade Upsell", quantidade: 115, cor: "bg-accent-500" },
  { classe: "Alerta Churn", quantidade: 39, cor: "bg-rose-500" },
];

const maxQuantidade = Math.max(...distribuicao.map((d) => d.quantidade));

const metricas = [
  { modelo: "Regressão Logística", accuracy: "0.44", recallChurn: "Maior recall na classe Alerta Churn" },
  { modelo: "Random Forest", accuracy: "mais alta", recallChurn: "Não identificou nenhum caso de Alerta Churn no teste" },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-12">
        <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
          Metodologia
        </span>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">De onde vem a inteligência do SellerFit</h1>
        <p className="mt-3 text-slate-400">
          A lógica de identificação de churn e upsell usada aqui no site não foi inventada do zero:
          ela reproduz a regra de negócio validada no desafio de Data Science &amp; Statistical
          Computing feito pela mesma equipe, usando uma base real de 1.674 transcrições de
          reuniões da TOTVS.
        </p>
      </div>

      <section className="card mb-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">O problema</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          A base de reuniões não tinha um rótulo pronto de "esse cliente vai cancelar" ou "esse
          cliente quer comprar mais". Por isso, o time construiu a variável-alvo{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">sinal_negocio</code> cruzando
          três fontes: a nota de NPS do cliente, menções a concorrentes (SAP, Oracle, Linx,
          Alterdata, Sankhya, Salesforce) e palavras-chave de problema ou de interesse comercial
          encontradas na própria transcrição.
        </p>
      </section>

      <section className="card mb-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Distribuição das classes na base tratada</h2>
        <p className="mt-2 text-sm text-slate-400">
          Depois de remover duplicatas e transcrições com rótulos conflitantes, restaram 290
          registros válidos pra treinar os modelos:
        </p>
        <div className="mt-6 space-y-4">
          {distribuicao.map((d) => (
            <div key={d.classe}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-300">{d.classe}</span>
                <span className="text-slate-500">{d.quantidade} registros</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${d.cor}`}
                  style={{ width: `${(d.quantidade / maxQuantidade) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card mb-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Regressão Logística vs Random Forest</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Os textos foram vetorizados com TF-IDF e usados pra treinar dois classificadores. Apesar
          do Random Forest ter tido a Accuracy geral mais alta, ele não identificou corretamente
          nenhum caso de <strong className="text-rose-400">Alerta Churn</strong> no conjunto de
          teste. Como deixar passar um cliente insatisfeito (falso negativo) custa muito mais caro
          pro negócio do que gerar um alerta a mais, a equipe escolheu priorizar o modelo com maior{" "}
          <strong className="text-white">Recall</strong> na classe de churn: a Regressão Logística
          com <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">class_weight=&apos;balanced&apos;</code>.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {metricas.map((m) => (
            <div key={m.modelo} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">{m.modelo}</p>
              <p className="mt-1 text-xs text-slate-400">{m.recallChurn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Como isso chega no SellerFit</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            A mesma regra de negócio (NPS + menção a concorrente + termos de problema/oportunidade)
            roda de forma determinística no backend, sem depender de chamada externa.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            Reuniões marcadas como <strong className="text-rose-400">Alerta Churn</strong> são
            direcionadas pra atendentes com foco em retenção de clientes.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            Reuniões marcadas como <strong className="text-emerald-400">Oportunidade Upsell</strong>{" "}
            são direcionadas pra atendentes com foco em cross-sell e expansão de contrato.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            A IA (OpenAI) complementa essa camada de regras identificando dores implícitas, o
            perfil comportamental do cliente e o traço ideal do atendente.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            O modelo de Regressão Logística treinado neste notebook (TF-IDF + <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">class_weight=&apos;balanced&apos;</code>)
            foi exportado e roda de verdade, embarcado no backend do site, como um terceiro motor
            de classificação independente da IA generativa.
          </li>
        </ul>
      </section>

      <section className="card mt-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Três abordagens rodando em paralelo</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Na tela de{" "}
          <Link href="/analisar" className="text-brand-400 hover:text-brand-300">
            análise de reunião
          </Link>
          , toda transcrição passa pelas três técnicas ao mesmo tempo, pra dar pra comparar como
          cada uma enxerga o mesmo texto:
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold text-white">1. Regra de negócio</p>
            <p className="mt-1 text-xs text-slate-400">
              Determinística: NPS + menção a concorrente + palavras-chave. Rápida e explicável.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold text-white">2. Machine Learning clássico</p>
            <p className="mt-1 text-xs text-slate-400">
              TF-IDF + Regressão Logística treinada nos dados reais do desafio. Estatística pura,
              sem IA generativa.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold text-white">3. IA generativa</p>
            <p className="mt-1 text-xs text-slate-400">
              OpenAI lê a transcrição e entende nuances, dores implícitas e o perfil do cliente.
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs italic text-slate-500">
          As três nem sempre concordam entre si — e isso é proposital: mostra na prática a
          diferença de recall/limitações entre um modelo estatístico clássico e uma IA generativa.
        </p>
      </section>
    </div>
  );
}
