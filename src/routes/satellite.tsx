import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { Brain, Satellite, CloudRain } from "lucide-react";
import { HazardMap, MapLegend } from "@/components/HazardMap";
import { SATELLITE_FUSION } from "@/lib/mockData";

export const Route = createFileRoute("/satellite")({
  head: () => ({
    meta: [
      { title: "Satellite & AI Fusion — Quick Pollination™" },
      { name: "description", content: "TinyML fusion of satellite rainfall and ground-truth sensor data." },
    ],
  }),
  component: SatellitePage,
});

function ConfidenceDial({ label, value, color }: { label: string; value: number; color: string }) {
  const data = [{ name: label, value }];
  return (
    <div className="flex flex-col items-center">
      <div className="size-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270} data={data}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={10} fill={color} background={{ fill: "var(--muted)" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="-mt-20 text-2xl font-bold" style={{ color }}>{value}%</div>
      <div className="mt-12 text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SatellitePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Satellite & AI Fusion</h1>
        <p className="text-sm text-muted-foreground">Edge TinyML model fuses GPM/IMERG satellite rainfall with ground sensors for higher-confidence warnings.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold flex items-center gap-2"><Satellite className="size-4 text-primary" /> Rainfall Accumulation Heatmap</h2>
              <p className="text-xs text-muted-foreground">Last 24h satellite-derived precipitation, projected on hazard zones.</p>
            </div>
            <MapLegend />
          </div>
          <HazardMap height={420} showSensors={false} />
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><Brain className="size-4 text-primary" /> TinyML Confidence</h2>
          <div className="grid grid-cols-2 gap-2">
            <ConfidenceDial label="Satellite" value={87} color="var(--rwanda-blue)" />
            <ConfidenceDial label="Ground"    value={91} color="var(--rwanda-green)" />
          </div>
          <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-3">
            <div className="text-xs text-primary uppercase tracking-wider">Fused Index</div>
            <div className="text-3xl font-bold text-primary">89%</div>
            <div className="text-xs text-muted-foreground mt-1">Model: QP-Fusion v0.4 · 142 KB · runs on ESP32</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="font-semibold mb-3 flex items-center gap-2"><CloudRain className="size-4 text-primary" /> Satellite vs Ground vs Fused — by region</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SATELLITE_FUSION}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="region" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} />
            <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="satellite" fill="var(--rwanda-blue)" name="Satellite" radius={[6, 6, 0, 0]} />
            <Bar dataKey="ground"    fill="var(--rwanda-green)" name="Ground" radius={[6, 6, 0, 0]} />
            <Bar dataKey="fused"     fill="var(--primary)" name="Fused (TinyML)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
