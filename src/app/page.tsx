import Link from "next/link";

const features = [
  {
    titulo: "Analise de transcricao com IA",
    descricao:
      "A transcricao da reuniao e lida por um modelo de linguagem que identifica dores explicitas e tambem aquelas que o cliente deu a entender nas entrelinhas.",
    icone: "🧠",
  },
  {
    titulo: "Perfil comportamental do cliente",
    descricao:
      "Alem das dores, o sistema gera um resumo do perfil do cliente, o sentimento geral da conversa e o nivel de urgencia do caso.",
    icone: "🎯",
  },
  {
    titulo: "Match multi-criterio",
    descricao:
      "Um algoritmo de score cruza o perfil recomendado com a base de atendentes, considerando traco comportamental, segmento de atuacao e nota media.",
    icone: "🤝",
  },
  {
    titulo: "Base de atendentes TOTVS",
    descricao:
      "Cada atendente tem especialidade, tracos de personalidade e historico proprio, simulando um time real de consultores.",
    icone: "🗂️",
  },
];

const passos = [
  {
    numero: "01",
    titulo: "Cole a transcricao",
    texto: "Copie a conversa do vendedor com o cliente e informe empresa e segmento.",
  },
  {
    numero: "02",
    titulo: "A IA analisa",
    texto: "O SellerFit identifica dores, calcula a urgencia e resume o perfil do cliente.",
  },
  {
    numero: "03",
    titulo: "Veja o match",
    texto: "O sistema recomenda os atendentes mais compativeis, com score e justificativa.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-grid relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-300">
            Solucao para o desafio TOTVS
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">
            Nenhuma dor do cliente
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent"> passa despercebida</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            O SellerFit analisa a transcricao da reuniao comercial com IA, identifica dores e
            necessidades do cliente e faz o match com o atendente TOTVS mais compativel pra
            continuar o atendimento.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/analisar"
              className="rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Analisar uma reuniao
            </Link>
            <Link
              href="/atendentes"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver base de atendentes
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white">Como funciona</h2>
          <p className="mt-2 text-slate-400">Do texto da reuniao ao atendente ideal em 3 passos.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {passos.map((passo) => (
            <div key={passo.numero} className="card rounded-2xl p-8">
              <span className="text-3xl font-bold text-white/10">{passo.numero}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{passo.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{passo.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-base-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-white">O que o SellerFit entrega</h2>
            <p className="mt-2 text-slate-400">Inteligencia artificial aplicada ao pos-reuniao comercial.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.titulo} className="card rounded-2xl p-6">
                <span className="text-3xl">{feature.icone}</span>
                <h3 className="mt-4 font-semibold text-white">{feature.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-white">Pronto pra testar?</h2>
        <p className="mt-3 text-slate-400">
          Cole uma transcricao de reuniao e veja a analise da IA e o match com nossa base de atendentes.
        </p>
        <Link
          href="/analisar"
          className="mt-8 inline-block rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
        >
          Comecar analise
        </Link>
      </section>
    </div>
  );
}
