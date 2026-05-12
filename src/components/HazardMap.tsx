import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from "react-leaflet";
import { RISK_ZONES, riskColor, type RiskZone } from "@/lib/mockData";

interface Props {
  height?: number | string;
  showSensors?: boolean;
}

export function HazardMap({ height = 480, showSensors = true }: Props) {
  // react-leaflet requires window — defer to client mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div style={{ height }} className="w-full rounded-xl bg-muted/30 grid place-items-center text-muted-foreground text-sm">
        Loading map…
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ height }}>
      <MapContainer center={[-1.94, 29.87]} zoom={8} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap, &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {RISK_ZONES.map((z: RiskZone) => (
          <Circle key={z.id} center={[z.lat, z.lng]} radius={z.score * 250}
            pathOptions={{ color: riskColor(z.level), fillColor: riskColor(z.level), fillOpacity: 0.25, weight: 1.5 }}
          />
        ))}
        {showSensors && RISK_ZONES.map((z) => (
          <CircleMarker key={`m-${z.id}`} center={[z.lat, z.lng]} radius={6}
            pathOptions={{ color: riskColor(z.level), fillColor: riskColor(z.level), fillOpacity: 1 }}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{z.district}</div>
                <div>Hazard: {z.hazard}</div>
                <div>Risk: <b style={{ color: riskColor(z.level) }}>{z.level}</b> ({z.score}/100)</div>
                <div>Population: {z.population.toLocaleString()}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export function MapLegend() {
  const items: { label: string; color: string }[] = [
    { label: "Low",      color: "var(--risk-low)" },
    { label: "Medium",   color: "var(--risk-medium)" },
    { label: "High",     color: "var(--risk-high)" },
    { label: "Critical", color: "var(--risk-critical)" },
  ];
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5">
          <span className="size-3 rounded-full" style={{ background: i.color }} />
          {i.label}
        </div>
      ))}
    </div>
  );
}
