import { BudgetCategory, Expense } from "@/lib/types";

// Metas em reais por categoria — ajustar conforme formos definindo o roteiro.
export const budgetCategories: BudgetCategory[] = [
  { id: "passagens", name: "Passagens Aéreas", plannedBRL: 0 },
  { id: "hospedagem", name: "Hospedagem", plannedBRL: 0 },
  { id: "transporte-local", name: "Transporte Local", plannedBRL: 0 },
  { id: "passeios", name: "Passeios & Atividades", plannedBRL: 0 },
  { id: "alimentacao", name: "Alimentação", plannedBRL: 0 },
  { id: "seguro", name: "Seguro Viagem", plannedBRL: 0 },
  { id: "outros", name: "Outros", plannedBRL: 0 },
];

// TODO: registrar despesas reais/planejadas conforme forem reservando e gastando.
export const expenses: Expense[] = [];
