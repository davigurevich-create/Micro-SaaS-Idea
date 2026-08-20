export interface TripInfo {
  title: string;
  travelers: string[];
  startDate: string | null; // ISO date (YYYY-MM-DD), null enquanto não definido
  endDate: string | null;
  durationDays: number | null; // referência de duração enquanto as datas exatas não fecham
  entryCity: string | null;
  exitCity: string | null;
  notes?: string;
}

export interface ItineraryDay {
  id: string;
  date: string | null;
  location: string;
  accommodation?: string;
  summary?: string;
  activityIds: string[];
}

export type ActivityCategory = "passeio" | "restaurante" | "trilha" | "outro";
export type Priority = "essencial" | "opcional";

export interface Activity {
  id: string;
  name: string;
  location: string;
  category: ActivityCategory;
  priority: Priority;
  estimatedCost?: string;
  notes?: string;
  link?: string;
}

export type TransportType = "voo" | "onibus" | "carro" | "balsa" | "outro";

export interface TransportLeg {
  id: string;
  type: TransportType;
  from: string;
  to: string;
  date: string | null;
  departureTime?: string;
  arrivalTime?: string;
  company?: string;
  confirmationCode?: string;
  notes?: string;
}

export interface ClimateInfo {
  region: string;
  month: string;
  avgHigh: string;
  avgLow: string;
  notes: string;
}

export type Owner = "Davi" | "Nitzi" | "Ambos";

export interface PackingItem {
  id: string;
  category: string;
  item: string;
  owner: Owner;
  packed: boolean;
}

export type DocumentType = "passaporte" | "seguro" | "voucher" | "reserva" | "outro";

export interface TripDocument {
  id: string;
  title: string;
  type: DocumentType;
  owner: Owner;
  notes?: string;
}

export type Currency = "BRL" | "ARS" | "CLP" | "USD";

export interface BudgetCategory {
  id: string;
  name: string;
  plannedBRL: number;
}

export type ExpenseStatus = "planejado" | "pago";

export interface Expense {
  id: string;
  categoryId: string;
  description: string;
  amount: number; // valor na moeda original (o que de fato foi/será pago)
  currency: Currency;
  amountBRL: number; // equivalente em reais, informado manualmente
  date: string | null;
  paidBy: Owner;
  status: ExpenseStatus;
  notes?: string;
}
