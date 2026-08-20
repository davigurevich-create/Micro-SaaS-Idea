"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import {
  budgetCategories as seedCategories,
  expenses as seedExpenses,
} from "@/data/budget";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import {
  BudgetCategory,
  Currency,
  Expense,
  ExpenseStatus,
  Owner,
} from "@/lib/types";

const currencies: Currency[] = ["BRL", "ARS", "CLP", "USD"];
const currencySymbols: Record<Currency, string> = {
  BRL: "R$",
  ARS: "AR$",
  CLP: "CL$",
  USD: "US$",
};
const owners: Owner[] = ["Rubens", "Vitória", "Ambos"];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function OrcamentoPage() {
  const [categories, setCategories] = useLocalStorageState<BudgetCategory[]>(
    `${STORAGE_KEYS.budget}.categories`,
    seedCategories
  );
  const [items, setItems] = useLocalStorageState<Expense[]>(
    `${STORAGE_KEYS.budget}.items`,
    seedExpenses
  );

  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(seedCategories[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("BRL");
  const [amountBRL, setAmountBRL] = useState("");
  const [date, setDate] = useState("");
  const [paidBy, setPaidBy] = useState<Owner>("Ambos");
  const [status, setStatus] = useState<ExpenseStatus>("planejado");

  function addExpense(e: FormEvent) {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    const amountBRLNum = parseFloat(amountBRL);
    if (!description.trim() || Number.isNaN(amountNum) || Number.isNaN(amountBRLNum)) {
      return;
    }
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      categoryId,
      description: description.trim(),
      amount: amountNum,
      currency,
      amountBRL: amountBRLNum,
      date: date || null,
      paidBy,
      status,
    };
    setItems((prev) => [...prev, newExpense]);
    setDescription("");
    setAmount("");
    setAmountBRL("");
    setDate("");
  }

  function removeExpense(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updatePlanned(id: string, value: string) {
    const num = parseFloat(value);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, plannedBRL: Number.isNaN(num) ? 0 : num } : c
      )
    );
  }

  const totalPlanned = categories.reduce((sum, c) => sum + c.plannedBRL, 0);
  const totalPago = items
    .filter((i) => i.status === "pago")
    .reduce((sum, i) => sum + i.amountBRL, 0);
  const totalReservado = items
    .filter((i) => i.status === "planejado")
    .reduce((sum, i) => sum + i.amountBRL, 0);
  const saldo = totalPlanned - totalPago - totalReservado;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Orçamento</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          Cada gasto é registrado na moeda em que foi pago (real, peso
          argentino, peso chileno ou dólar), com um equivalente em reais
          informado à mão — sem conversão automática, já que o câmbio do
          peso argentino varia demais pra confiar em taxa fixa.
        </p>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="text-center">
          <p className="text-lg font-semibold">{formatBRL(totalPlanned)}</p>
          <p className="text-xs text-black/60 dark:text-white/60">planejado</p>
        </Card>
        <Card className="text-center">
          <p className="text-lg font-semibold">{formatBRL(totalPago)}</p>
          <p className="text-xs text-black/60 dark:text-white/60">pago</p>
        </Card>
        <Card className="text-center">
          <p className="text-lg font-semibold">{formatBRL(totalReservado)}</p>
          <p className="text-xs text-black/60 dark:text-white/60">reservado</p>
        </Card>
        <Card className="text-center">
          <p
            className={`text-lg font-semibold ${
              saldo < 0 ? "text-red-600 dark:text-red-400" : ""
            }`}
          >
            {formatBRL(saldo)}
          </p>
          <p className="text-xs text-black/60 dark:text-white/60">saldo</p>
        </Card>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Por categoria</h2>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const catItems = items.filter((i) => i.categoryId === cat.id);
            const gasto = catItems.reduce((sum, i) => sum + i.amountBRL, 0);
            const pct =
              cat.plannedBRL > 0
                ? Math.min(100, Math.round((gasto / cat.plannedBRL) * 100))
                : 0;
            return (
              <Card key={cat.id}>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-medium">{cat.name}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-black/60 dark:text-white/60">
                      Meta R$
                    </span>
                    <input
                      type="number"
                      value={cat.plannedBRL || ""}
                      onChange={(e) => updatePlanned(cat.id, e.target.value)}
                      placeholder="0"
                      className="w-24 rounded border border-black/10 dark:border-white/10 bg-transparent px-2 py-1 text-right"
                    />
                  </div>
                </div>
                {cat.plannedBRL > 0 && (
                  <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        gasto > cat.plannedBRL ? "bg-red-500" : "bg-foreground"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
                <p className="text-xs text-black/60 dark:text-white/60 mb-2">
                  {formatBRL(gasto)} registrado
                  {cat.plannedBRL > 0 && ` de ${formatBRL(cat.plannedBRL)}`}
                </p>
                {catItems.length > 0 && (
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {catItems.map((exp) => (
                      <li
                        key={exp.id}
                        className="flex items-center justify-between gap-2 border-t border-black/5 dark:border-white/10 pt-1.5"
                      >
                        <div>
                          <span>{exp.description}</span>
                          <span className="text-black/50 dark:text-white/50 ml-2">
                            {currencySymbols[exp.currency]} {exp.amount.toLocaleString("pt-BR")}
                            {" · "}
                            {formatBRL(exp.amountBRL)}
                            {" · "}
                            {exp.paidBy}
                            {" · "}
                            {exp.status === "pago" ? "pago" : "reservado"}
                          </span>
                        </div>
                        <button
                          onClick={() => removeExpense(exp.id)}
                          aria-label="Remover despesa"
                          className="text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-400"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Adicionar despesa</h2>
        <Card>
          <form
            onSubmit={addExpense}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-2 sm:col-span-4 rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              placeholder={`Valor em ${currency}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Equivalente em R$"
              value={amountBRL}
              onChange={(e) => setAmountBRL(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value as Owner)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              {owners.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ExpenseStatus)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              <option value="planejado">Reservado / planejado</option>
              <option value="pago">Pago</option>
            </select>
            <button
              type="submit"
              className="col-span-2 sm:col-span-4 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              Adicionar
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}
