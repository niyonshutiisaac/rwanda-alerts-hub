import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon: LucideIcon;
  accent?: string; // css color
}

export function StatCard({ label, value, delta, trend = "flat", icon: Icon, accent = "var(--primary)" }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
          {delta && (
            <div className={cn(
              "mt-1 text-xs",
              trend === "up" && "text-[var(--risk-high)]",
              trend === "down" && "text-[var(--risk-low)]",
              trend === "flat" && "text-muted-foreground",
            )}>{delta}</div>
          )}
        </div>
        <div className="size-10 rounded-lg grid place-items-center" style={{ background: `color-mix(in oklab, ${accent} 18%, transparent)` }}>
          <Icon className="size-5" style={{ color: accent }} />
        </div>
      </div>
    </div>
  );
}
