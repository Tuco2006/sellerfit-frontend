import { buscarAtendentes } from "@/lib/api";
import { AtendenteCard } from "@/components/AtendenteCard";

export const dynamic = "force-dynamic";

export default async function AtendentesPage() {
  let atendentes: Awaited<ReturnType<typeof buscarAtendentes>> = [];
  let erro = "";

  try {
    atendentes = await buscarAtendentes();
  } catch (e) {
    erro = "Nao foi possivel carregar a base de atendentes agora. Verifique se o backend esta no ar.";
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Base de atendentes</h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Time simulado de consultores TOTVS usado pelo SellerFit pra calcular o match com cada
          cliente. Cada atendente tem especialidade, tracos de personalidade e historico proprio.
        </p>
      </div>

      {erro && (
        <div className="card rounded-2xl p-6 text-sm text-rose-400">{erro}</div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {atendentes.map((atendente) => (
          <AtendenteCard key={atendente.id} atendente={atendente} />
        ))}
      </div>
    </div>
  );
}
