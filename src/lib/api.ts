import { Atendente, EntradaAnalise, ResultadoAnalise } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export async function buscarAtendentes(): Promise<Atendente[]> {
  const resposta = await fetch(`${API_URL}/api/atendentes`, { cache: "no-store" });

  if (!resposta.ok) {
    throw new Error("nao foi possivel carregar os atendentes");
  }

  return resposta.json();
}

export async function analisarReuniao(entrada: EntradaAnalise): Promise<ResultadoAnalise> {
  const resposta = await fetch(`${API_URL}/api/analises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrada),
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);
    throw new Error(erro?.erro || "falha ao analisar a transcricao");
  }

  return resposta.json();
}
