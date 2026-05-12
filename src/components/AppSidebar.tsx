import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Radio, BellRing, Satellite, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/",          label: "Risk Overview",   icon: Activity },
  { to: "/sensors",   label: "Sensor Network",  icon: Radio },
  { to: "/alerts",    label: "Alert Management",icon: BellRing },
  { to: "/satellite", label: "Satellite & AI",  icon: Satellite },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-[var(--rwanda-green)] flex items-center justify-center shadow-lg">
          <Sprout className="size-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-semibold leading-tight">Quick Pollination<span className="text-primary">™</span></div>
          <div className="text-xs text-muted-foreground">Rwanda EWS · GLOC 2026</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link key={it.to} to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary/15 text-primary border border-primary/30"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}>
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="size-2 rounded-full bg-[var(--risk-low)] pulse-dot" />
          <span className="font-medium">System Online</span>
        </div>
        <div className="text-muted-foreground">142 sensors · 8 districts · live feed</div>
      </div>
    </aside>
  );
}
