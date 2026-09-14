const distribuicao = [
  { classe: "Neutro", quantidade: 136, cor: "bg-slate-500" },
  { classe: "Oportunidade Upsell", quantidade: 115, cor: "bg-accent-500" },
  { classe: "Alerta Churn", quantidade: 39, cor: "bg-rose-500" },
];

const maxQuantidade = Math.max(...distribuicao.map((d) => d.quantidade));

const metricas = [
  { modelo: "Regressao Logistica", accuracy: "0.44", recallChurn: "Maior recall na classe Alerta Churn" },
  { modelo: "Random Forest", accuracy: "mais alta", recallChurn: "Nao identificou nenhum caso de Alerta Churn no teste" },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
          Metodologia
        </span>
        <h1 className="text-3xl font-bold text-white">De onde vem a inteligencia do SellerFit</h1>
        <p className="mt-3 text-slate-400">
          A logica de identificacao de churn e upsell usada aqui no site nao foi inventada do zero:
          ela reproduz a regra de negocio validada no desafio de Data Science &amp; Statistical
          Computing feito pela mesma equipe, usando uma base real de 1.674 transcricoes de
          reunioes da TOTVS.
        </p>
      </div>

      <section className="card mb-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">O problema</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          A base de reunioes nao tinha um rotulo pronto de "esse cliente vai cancelar" ou "esse
          cliente quer comprar mais". Por isso, o time construiu a variavel-alvo{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">sinal_negocio</code> cruzando
          tres fontes: a nota de NPS do cliente, mencoes a concorrentes (SAP, Oracle, Linx,
          Alterdata, Sankhya, Salesforce) e palavras-chave de problema ou de interesse comercial
          encontradas na propria transcricao.
        </p>
      </section>

      <section className="card mb-8 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white">Distribuicao das classes na base tratada</h2>
        <p className="mt-2 text-sm text-slate-400">
          Depois de remover duplicatas e transcricoes com rotulos conflitantes, restaram 290
          registros validos pra treinar os modelos:
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
        <h2 className="text-lg font-semibold text-white">Regressao Logistica vs Random Forest</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Os textos foram vetorizados com TF-IDF e usados pra treinar dois classificadores. Apesar
          do Random Forest ter tido a Accuracy geral mais alta, ele nao identificou corretamente
          nenhum caso de <strong className="text-rose-400">Alerta Churn</strong> no conjunto de
          teste. Como deixar passar um cliente insatisfeito (falso negativo) custa muito mais caro
          pro negocio do que gerar um alerta a mais, a equipe escolheu priorizar o modelo com maior{" "}
          <strong className="text-white">Recall</strong> na classe de churn: a Regressao Logistica
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
            A mesma regra de negocio (NPS + mencao a concorrente + termos de problema/oportunidade)
            roda de forma deterministica no backend, sem depender de chamada externa.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            Reunioes marcadas como <strong className="text-rose-400">Alerta Churn</strong> sao
            direcionadas pra atendentes com foco em retencao de clientes.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            Reunioes marcadas como <strong className="text-emerald-400">Oportunidade Upsell</strong>{" "}
            sao direcionadas pra atendentes com foco em cross-sell e expansao de contrato.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-400">●</span>
            A IA (OpenAI) complementa essa camada de regras identificando dores implicitas, o
            perfil comportamental do cliente e o traco ideal do atendente.
          </li>
        </ul>
      </section>
    </div>
  );
}
