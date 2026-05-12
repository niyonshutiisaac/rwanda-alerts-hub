import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Battery, Signal, CloudRain, Droplets, Activity, Cpu } from "lucide-react";
import { SENSORS, type Sensor } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sensors")({
  head: () => ({
    meta: [
      { title: "Sensor Network — Quick Pollination™" },
      { name: "description", content: "ESP32 ground sensor telemetry across Rwanda's western highlands." },
    ],
  }),
  component: SensorsPage,
});

function slopeBadge(s: Sensor["slope"]) {
  if (s === "Stable")   return "bg-[var(--risk-low)]/15 text-[var(--risk-low)] border-[var(--risk-low)]/40";
  if (s === "Minor")    return "bg-[var(--risk-medium)]/15 text-[var(--risk-medium)] border-[var(--risk-medium)]/40";
  return "bg-[var(--risk-critical)]/15 text-[var(--risk-critical)] border-[var(--risk-critical)]/40";
}

function SensorCard({ s }: { s: Sensor }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="size-4 text-primary" />
            <span className="font-semibold">{s.id}</span>
          </div>
          <div className="text-xs text-muted-foreground">{s.district} · {s.lastSeen}</div>
        </div>
        <span className={cn("text-xs px-2 py-0.5 rounded-full border", slopeBadge(s.slope))}>{s.slope}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric icon={CloudRain} label="Rain" value={`${s.rainfall} mm/h`} color="var(--rwanda-blue)" />
        <Metric icon={Droplets} label="Soil" value={`${s.soilMoisture}%`} color="var(--rwanda-yellow)" />
        <Metric icon={Activity} label="Tilt" value={`${s.tilt}°`} color="var(--primary)" />
        <Metric icon={Signal} label="Signal" value={`${s.signal}/5`} color="var(--rwanda-green)" />
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground flex items-center gap-1"><Battery className="size-3.5" /> Battery</span>
          <span>{s.battery}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full"
            style={{ width: `${s.battery}%`, background: s.battery > 60 ? "var(--risk-low)" : s.battery > 30 ? "var(--risk-medium)" : "var(--risk-critical)" }} />
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="size-3.5" style={{ color }} /> {label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function SensorsPage() {
  const [log, setLog] = useState<{ t: string; m: string }[]>([
    { t: "08:42:11", m: "RUB-01 reported tilt change Δ +0.4°" },
    { t: "08:41:55", m: "NYB-01 soil moisture above 80%" },
    { t: "08:41:02", m: "Heartbeat OK — 138/142 nodes" },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      const sensor = SENSORS[Math.floor(Math.random() * SENSORS.length)];
      const events = [
        `${sensor.id} rainfall ${(Math.random() * 20).toFixed(1)} mm/h`,
        `${sensor.id} battery report ${sensor.battery}%`,
        `${sensor.id} tilt sample ${(Math.random() * 5).toFixed(2)}°`,
        `Heartbeat OK — ${137 + Math.floor(Math.random() * 5)}/142 nodes`,
      ];
      const now = new Date();
      const t = now.toTimeString().slice(0, 8);
      setLog((l) => [{ t, m: events[Math.floor(Math.random() * events.length)] }, ...l].slice(0, 12));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sensor Network</h1>
        <p className="text-sm text-muted-foreground">ESP32-class field nodes streaming rainfall, soil moisture, and slope telemetry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SENSORS.map((s) => <SensorCard key={s.id} s={s} />)}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="font-semibold mb-3">Live Event Log</h2>
        <div className="font-mono text-xs space-y-1 max-h-60 overflow-auto">
          {log.map((e, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-muted-foreground">{e.t}</span>
              <span>{e.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
