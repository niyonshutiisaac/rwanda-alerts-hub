import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, MessageSquare, Radio, Smartphone, X } from "lucide-react";
import { ALERTS, type AlertItem, type RiskLevel, riskBadgeClass } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Management — Quick Pollination™" },
      { name: "description", content: "Bilingual SMS, radio, and USSD alerts for Rwandan communities." },
    ],
  }),
  component: AlertsPage,
});

function ChannelIcon({ c }: { c: AlertItem["channel"] }) {
  if (c === "SMS") return <MessageSquare className="size-3.5" />;
  if (c === "Radio") return <Radio className="size-3.5" />;
  return <Smartphone className="size-3.5" />;
}

function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ district: "Rubavu", hazard: "Landslide" as "Landslide" | "Flood", level: "High" as RiskLevel });

  const sendTest = () => {
    const now = new Date().toTimeString().slice(0, 5);
    const id = `a${Date.now()}`;
    const next: AlertItem = {
      id, time: now, district: form.district, hazard: form.hazard, level: form.level,
      message_en: `TEST ${form.level.toUpperCase()}: ${form.hazard} risk in ${form.district}. Take precaution.`,
      message_rw: `IGERAGEZA ${form.level.toUpperCase()}: Ibyago bya ${form.hazard === "Flood" ? "umwuzure" : "inkangu"} muri ${form.district}. Witondere.`,
      channel: "SMS", status: "Sent",
    };
    setAlerts((a) => [next, ...a]);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alert Management</h1>
          <p className="text-sm text-muted-foreground">Bilingual (Kinyarwanda / English) early warnings via SMS, radio and USSD.</p>
        </div>
        <button onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">
          <Send className="size-4" /> Send Test Alert
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="text-left px-3 py-2.5">Time</th>
                <th className="text-left px-3 py-2.5">District</th>
                <th className="text-left px-3 py-2.5">Hazard</th>
                <th className="text-left px-3 py-2.5">Level</th>
                <th className="text-left px-3 py-2.5">Channel</th>
                <th className="text-left px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} className="border-t border-border hover:bg-muted/20">
                  <td className="px-3 py-2.5 font-mono text-xs">{a.time}</td>
                  <td className="px-3 py-2.5 font-medium">{a.district}</td>
                  <td className="px-3 py-2.5">{a.hazard}</td>
                  <td className="px-3 py-2.5"><span className={cn("text-xs px-2 py-0.5 rounded-full border", riskBadgeClass(a.level))}>{a.level}</span></td>
                  <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><ChannelIcon c={a.channel} /> {a.channel}</span></td>
                  <td className="px-3 py-2.5 text-xs">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full border",
                      a.status === "Sent" && "border-[var(--risk-low)]/40 text-[var(--risk-low)] bg-[var(--risk-low)]/10",
                      a.status === "Pending" && "border-[var(--risk-medium)]/40 text-[var(--risk-medium)] bg-[var(--risk-medium)]/10",
                      a.status === "Acknowledged" && "border-primary/40 text-primary bg-primary/10",
                    )}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Smartphone className="size-4 text-primary" /> SMS Simulator</h2>
          <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
            {alerts.slice(0, 6).map((a) => (
              <div key={a.id} className="rounded-2xl bg-background/60 border border-border p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>+250 78x · {a.district}</span><span>{a.time}</span>
                </div>
                <div className="rounded-xl bg-primary/15 border border-primary/30 px-3 py-2 text-sm">
                  <div className="font-medium mb-1">{a.message_rw}</div>
                  <div className="text-xs text-muted-foreground">{a.message_en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Send Test Alert</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <Field label="District">
                <select className="w-full rounded-md bg-background border border-border px-3 py-2"
                  value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })}>
                  {["Rubavu","Nyabihu","Karongi","Rusizi","Musanze","Ngororero","Gakenke","Kigali"].map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Hazard">
                <select className="w-full rounded-md bg-background border border-border px-3 py-2"
                  value={form.hazard} onChange={(e) => setForm({ ...form, hazard: e.target.value as "Flood" | "Landslide" })}>
                  <option>Flood</option><option>Landslide</option>
                </select>
              </Field>
              <Field label="Level">
                <select className="w-full rounded-md bg-background border border-border px-3 py-2"
                  value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as RiskLevel })}>
                  <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
              </Field>
              <button onClick={sendTest} className="w-full mt-2 rounded-md bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90">
                Inject Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  );
}
