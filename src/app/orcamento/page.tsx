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
  PaymentType,
} from "@/lib/types";

const currencies: Currency[] = ["BRL", "ARS", "CLP", "USD"];
const currencySymbols: Record<Currency, string> = {
  BRL: "R$",
  ARS: "AR$",
  CLP: "CL$",
  USD: "US$",
};
const owners: Owner[] = ["Davi", "Nitzi", "Ambos"];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function paymentLabel(exp: Expense) {
  if (exp.paymentType === "parcelado" && exp.installments && exp.installments > 1) {
    return `${exp.installments}x de ${formatBRL(exp.amountBRL / exp.installments)}`;
  }
  return "à vista";
}

// Despesas salvas antes desse campo existir não têm splitBetween — assume
// "Ambos" nesse caso (maioria dos custos de viagem de casal é compartilhada).
function effectiveSplit(exp: Expense): Owner {
  return exp.splitBetween ?? "Ambos";
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
  const [splitBetween, setSplitBetween] = useState<Owner>("Ambos");
  const [status, setStatus] = useState<ExpenseStatus>("planejado");
  const [paymentType, setPaymentType] = useState<PaymentType>("avista");
  const [installments, setInstallments] = useState("2");
  const [editingId, setEditingId] = useState<string | null>(null);

  function resetForm() {
    setDescription("");
    setCategoryId(seedCategories[0]?.id ?? "");
    setAmount("");
    setCurrency("BRL");
    setAmountBRL("");
    setDate("");
    setPaidBy("Ambos");
    setSplitBetween("Ambos");
    setStatus("planejado");
    setPaymentType("avista");
    setInstallments("2");
    setEditingId(null);
  }

  function startEdit(exp: Expense) {
    setEditingId(exp.id);
    setDescription(exp.description);
    setCategoryId(exp.categoryId);
    setAmount(exp.amount.toString());
    setCurrency(exp.currency);
    setAmountBRL(exp.amountBRL.toString());
    setDate(exp.date ?? "");
    setPaidBy(exp.paidBy);
    setSplitBetween(effectiveSplit(exp));
    setStatus(exp.status);
    setPaymentType(exp.paymentType);
    setInstallments(exp.installments ? exp.installments.toString() : "2");
  }

  function submitExpense(e: FormEvent) {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    const amountBRLNum = currency === "BRL" ? amountNum : parseFloat(amountBRL);
    if (!description.trim() || Number.isNaN(amountNum) || Number.isNaN(amountBRLNum)) {
      return;
    }
    const installmentsNum = parseInt(installments, 10);
    const payload = {
      categoryId,
      description: description.trim(),
      amount: amountNum,
      currency,
      amountBRL: amountBRLNum,
      date: date || null,
      paidBy,
      splitBetween,
      status,
      paymentType,
      installments:
        paymentType === "parcelado" && installmentsNum > 1 ? installmentsNum : undefined,
    };
    if (editingId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingId ? { ...i, ...payload } : i))
      );
    } else {
      setItems((prev) => [...prev, { id: crypto.randomUUID(), ...payload }]);
    }
    resetForm();
  }

  function removeExpense(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (editingId === id) resetForm();
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
  const totalGasto = totalPago + totalReservado;

  const people = owners.filter((o): o is Exclude<Owner, "Ambos"> => o !== "Ambos");

  // Gasto por Pessoa: cota justa de cada um, baseada em "Despesa de"
  // (splitBetween) — não em quem pagou. Um gasto "Ambos" é dividido ao meio.
  const sharedSplitTotal = items
    .filter((i) => effectiveSplit(i) === "Ambos")
    .reduce((sum, i) => sum + i.amountBRL, 0);
  const perPersonShare = people.map((person) => {
    const direct = items
      .filter((i) => effectiveSplit(i) === person)
      .reduce((sum, i) => sum + i.amountBRL, 0);
    const share = sharedSplitTotal / 2;
    return { person, direct, share, total: direct + share };
  });
  const davi = perPersonShare[0];
  const nitzi = perPersonShare[1];
  const splitPct =
    davi && nitzi && davi.total + nitzi.total > 0
      ? (davi.total / (davi.total + nitzi.total)) * 100
      : 50;

  // Acerto de Contas: quanto cada um desembolsou de fato (paidBy) vs. sua
  // cota justa (perPersonShare) — a diferença é quem deve pra quem.
  const sharedPaidTotal = items
    .filter((i) => i.paidBy === "Ambos")
    .reduce((sum, i) => sum + i.amountBRL, 0);
  const settleUp = people.map((person) => {
    const paidDirect = items
      .filter((i) => i.paidBy === person)
      .reduce((sum, i) => sum + i.amountBRL, 0);
    const paidTotal = paidDirect + sharedPaidTotal / 2;
    const fairShare = perPersonShare.find((p) => p.person === person)?.total ?? 0;
    return { person, paidTotal, fairShare, balance: paidTotal - fairShare };
  });
  const [daviSettle, nitziSettle] = settleUp;
  const settleAmount = daviSettle ? Math.abs(daviSettle.balance) : 0;
  const settleCreditor =
    daviSettle && daviSettle.balance > 0 ? daviSettle.person : nitziSettle?.person;
  const settleDebtor =
    daviSettle && daviSettle.balance > 0 ? nitziSettle?.person : daviSettle?.person;

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

      <section>
        <h2 className="font-semibold mb-3">Gastos Totais da Viagem</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-1">Gasto por Pessoa</h2>
        <p className="text-xs text-black/60 dark:text-white/60 mb-3">
          Cota justa de cada um, baseada em &quot;Despesa de&quot; — não em
          quem pagou. Um gasto marcado como &quot;Ambos&quot; é dividido ao meio.
        </p>
        <Card className="text-center mb-3">
          <p className="text-2xl font-semibold">{formatBRL(totalGasto)}</p>
          <p className="text-xs text-black/60 dark:text-white/60">
            gasto total da viagem (pago + reservado)
          </p>
        </Card>

        {davi && nitzi && (
          <div className="h-2 rounded-full overflow-hidden flex mb-3">
            <div
              className="h-full bg-foreground"
              style={{ width: `${splitPct}%` }}
            />
            <div
              className="h-full bg-orange-400"
              style={{ width: `${100 - splitPct}%` }}
            />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          {perPersonShare.map(({ person, direct, share, total }) => (
            <Card key={person}>
              <p className="font-medium mb-1">{person}</p>
              <p className="text-xl font-semibold">{formatBRL(total)}</p>
              <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                {formatBRL(direct)} de despesas individuais
                {sharedSplitTotal > 0 &&
                  ` + ${formatBRL(share)} (metade das despesas de "Ambos")`}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-1">Acerto de Contas</h2>
        <p className="text-xs text-black/60 dark:text-white/60 mb-3">
          Compara quanto cada um desembolsou de fato (&quot;Pago por&quot;)
          com sua cota justa acima — a diferença é quem deve pra quem.
        </p>
        <Card className="text-center mb-3">
          {settleAmount < 0.01 ? (
            <p className="text-lg font-semibold">Contas equilibradas 🎉</p>
          ) : (
            <p className="text-lg font-semibold">
              {settleDebtor} deve {formatBRL(settleAmount)} para {settleCreditor}
            </p>
          )}
        </Card>
        <div className="grid sm:grid-cols-2 gap-3">
          {settleUp.map(({ person, paidTotal, fairShare }) => (
            <Card key={person}>
              <p className="font-medium mb-1">{person}</p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Pagou de fato: {formatBRL(paidTotal)}
              </p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Cota justa: {formatBRL(fairShare)}
              </p>
            </Card>
          ))}
        </div>
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
                            pago por {exp.paidBy}
                            {" · "}
                            despesa de {effectiveSplit(exp)}
                            {" · "}
                            {exp.status === "pago" ? "pago" : "reservado"}
                            {" · "}
                            {paymentLabel(exp)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs shrink-0">
                          <button onClick={() => startEdit(exp)} className="underline">
                            Editar
                          </button>
                          <button
                            onClick={() => removeExpense(exp.id)}
                            aria-label="Remover despesa"
                            className="text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-400"
                          >
                            ✕
                          </button>
                        </div>
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
        <h2 className="font-semibold mb-3">
          Todas as despesas {items.length > 0 && `(${items.length})`}
        </h2>
        {items.length === 0 ? (
          <Card>
            <p className="text-black/60 dark:text-white/60">
              Nenhuma despesa registrada ainda. Adicione a primeira no formulário abaixo.
            </p>
          </Card>
        ) : (
          <Card>
            <ul className="flex flex-col gap-2">
              {[...items]
                .reverse()
                .map((exp) => {
                  const cat = categories.find((c) => c.id === exp.categoryId);
                  return (
                    <li
                      key={exp.id}
                      className="flex items-center justify-between gap-2 text-sm border-b border-black/5 dark:border-white/10 pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <span className="font-medium">{exp.description}</span>
                        <span className="text-black/50 dark:text-white/50 ml-2">
                          {cat?.name ?? "Sem categoria"}
                          {" · "}
                          {currencySymbols[exp.currency]} {exp.amount.toLocaleString("pt-BR")}
                          {exp.currency !== "BRL" && ` (${formatBRL(exp.amountBRL)})`}
                          {" · "}
                          pago por {exp.paidBy}
                          {" · "}
                          despesa de {effectiveSplit(exp)}
                          {" · "}
                          {exp.status === "pago" ? "pago" : "reservado"}
                          {" · "}
                          {paymentLabel(exp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs shrink-0">
                        <button onClick={() => startEdit(exp)} className="underline">
                          Editar
                        </button>
                        <button
                          onClick={() => removeExpense(exp.id)}
                          aria-label="Remover despesa"
                          className="text-black/40 hover:text-red-600 dark:text-white/40 dark:hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Card>
        )}
      </section>

      <section>
        <h2 className="font-semibold mb-3">
          {editingId ? "Editar despesa" : "Adicionar despesa"}
        </h2>
        <Card>
          <form
            onSubmit={submitExpense}
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
            {currency !== "BRL" && (
              <input
                type="number"
                step="0.01"
                placeholder="Equivalente em R$"
                value={amountBRL}
                onChange={(e) => setAmountBRL(e.target.value)}
                className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                required
              />
            )}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            />
            <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
              Pago por
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
            </label>
            <label className="text-xs text-black/60 dark:text-white/60 flex flex-col gap-1">
              Despesa de
              <select
                value={splitBetween}
                onChange={(e) => setSplitBetween(e.target.value as Owner)}
                className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
              >
                {owners.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ExpenseStatus)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              <option value="planejado">Reservado / planejado</option>
              <option value="pago">Pago</option>
            </select>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as PaymentType)}
              className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
            >
              <option value="avista">À vista</option>
              <option value="parcelado">Parcelado</option>
            </select>
            {paymentType === "parcelado" && (
              <input
                type="number"
                min={2}
                step="1"
                placeholder="Número de parcelas"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
                className="rounded border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm"
                required
              />
            )}
            <div className="col-span-2 sm:col-span-4 flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {editingId ? "Salvar alterações" : "Adicionar"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
