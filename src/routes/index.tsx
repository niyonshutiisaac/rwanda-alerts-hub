import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { CloudRain, Droplets, Mountain, AlertTriangle } from "lucide-react";
import { HazardMap, MapLegend } from "@/components/HazardMap";
import { StatCard } from "@/components/StatCard";
import { RAINFALL_24H, RISK_ZONES, SOIL_7D, riskBadgeClass } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Risk Overview — Quick Pollination™" },
      { name: "description", content: "National flood and landslide risk overview for Rwanda." },
    ],
  }),
  component: RiskOverview,
});

function RiskGauge({ value }: { value: number }) {
  const r = 70, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c * 0.75; // 270deg arc
  const color = value > 75 ? "var(--risk-critical)" : value > 50 ? "var(--risk-high)" : value > 25 ? "var(--risk-medium)" : "var(--risk-low)";
  return (
    <div className="relative size-44 mx-auto">
      <svg viewBox="0 0 180 180" className="-rotate-[135deg]">
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--muted)" strokeWidth="14" strokeDasharray={`${c * 0.75} ${c}`} strokeLinecap="round" />
        <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={`${c * 0.75} ${c}`} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .8s ease, stroke .4s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold" style={{ color }}>{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">National Risk</div>
      </div>
    </div>
  );
}

function RiskOverview() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 8000);
    return () => clearInterval(id);
  }, []);

  const nationalRisk = useMemo(() => {
    const base = Math.round(RISK_ZONES.reduce((s, z) => s + z.score, 0) / RISK_ZONES.length);
    return Math.max(20, Math.min(95, base + ((tick % 5) - 2) * 2));
  }, [tick]);

  const stats = [
    { label: "Active Alerts", value: 5, delta: "+2 last hr", trend: "up" as const, icon: AlertTriangle, accent: "var(--risk-high)" },
    { label: "Sensors Online", value: "138 / 142", delta: "97% uptime", trend: "flat" as const, icon: Mountain, accent: "var(--primary)" },
    { label: "Avg Rainfall (24h)", value: "12.4 mm", delta: "+3.1 vs yesterday", trend: "up" as const, icon: CloudRain, accent: "var(--rwanda-blue)" },
    { label: "Soil Saturation", value: "78%", delta: "Threshold 75%", trend: "up" as const, icon: Droplets, accent: "var(--rwanda-yellow)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Risk Overview</h1>
        <p className="text-sm text-muted-foreground">Live national hazard picture across {RISK_ZONES.length} monitored districts.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold">Hazard Map — Rwanda</h2>
              <p className="text-xs text-muted-foreground">Risk circles sized by exposure score.</p>
            </div>
            <MapLegend />
          </div>
          <HazardMap height={460} />
        </div>

        <div className="rounded-xl border border-border bg-card p-4 flex flex-col">
          <h2 className="font-semibold mb-2">National Risk Gauge</h2>
          <RiskGauge value={nationalRisk} />
          <div className="mt-4 space-y-2 text-sm flex-1 overflow-auto">
            {RISK_ZONES.slice(0, 6).map((z) => (
              <div key={z.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <div className="font-medium">{z.district}</div>
                  <div className="text-xs text-muted-foreground">{z.hazard} · {z.province}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${riskBadgeClass(z.level)}`}>{z.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold mb-3">Rainfall — last 24h vs forecast (mm)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={RAINFALL_24H}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Area type="monotone" dataKey="rainfall" stroke="var(--primary)" fill="url(#g1)" name="Observed" />
              <Line type="monotone" dataKey="forecast" stroke="var(--rwanda-yellow)" strokeDasharray="4 4" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold mb-3">Soil moisture — 7 days (%)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={SOIL_7D}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} domain={[40, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="moisture" stroke="var(--rwanda-blue)" strokeWidth={2.5} name="Moisture" />
              <Line type="monotone" dataKey="threshold" stroke="var(--risk-critical)" strokeDasharray="5 5" name="Threshold" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
