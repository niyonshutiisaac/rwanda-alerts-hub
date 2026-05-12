// Simulated telemetry data for Quick Pollination™ early warning system.
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface RiskZone {
  id: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
  hazard: "Flood" | "Landslide" | "Both";
  level: RiskLevel;
  score: number; // 0-100
  population: number;
}

export interface Sensor {
  id: string;
  district: string;
  lat: number;
  lng: number;
  battery: number;
  signal: number;
  rainfall: number; // mm/h
  soilMoisture: number; // %
  tilt: number; // degrees
  slope: "Stable" | "Minor" | "Unstable";
  lastSeen: string;
}

export interface AlertItem {
  id: string;
  time: string;
  district: string;
  hazard: "Flood" | "Landslide";
  level: RiskLevel;
  message_en: string;
  message_rw: string;
  channel: "SMS" | "Radio" | "USSD";
  status: "Sent" | "Pending" | "Acknowledged";
}

export const RISK_ZONES: RiskZone[] = [
  { id: "z1", district: "Rubavu", province: "West", lat: -1.6777, lng: 29.2602, hazard: "Both", level: "Critical", score: 88, population: 149209 },
  { id: "z2", district: "Nyabihu", province: "West", lat: -1.6531, lng: 29.5108, hazard: "Landslide", level: "High", score: 76, population: 119253 },
  { id: "z3", district: "Karongi", province: "West", lat: -2.0667, lng: 29.3833, hazard: "Landslide", level: "High", score: 71, population: 132686 },
  { id: "z4", district: "Rusizi", province: "West", lat: -2.4847, lng: 28.9075, hazard: "Flood", level: "Medium", score: 58, population: 154862 },
  { id: "z5", district: "Musanze", province: "North", lat: -1.4995, lng: 29.6347, hazard: "Landslide", level: "Medium", score: 54, population: 98261 },
  { id: "z6", district: "Ngororero", province: "West", lat: -1.8728, lng: 29.6275, hazard: "Landslide", level: "High", score: 69, population: 110823 },
  { id: "z7", district: "Nyamasheke", province: "West", lat: -2.3556, lng: 29.1247, hazard: "Both", level: "Medium", score: 49, population: 121642 },
  { id: "z8", district: "Gakenke", province: "North", lat: -1.6939, lng: 29.7711, hazard: "Landslide", level: "Medium", score: 47, population: 89412 },
  { id: "z9", district: "Kigali", province: "Kigali", lat: -1.9536, lng: 30.0606, hazard: "Flood", level: "Low", score: 28, population: 1132686 },
];

export const SENSORS: Sensor[] = [
  { id: "RUB-01", district: "Rubavu", lat: -1.68, lng: 29.26, battery: 92, signal: 4, rainfall: 18.4, soilMoisture: 87, tilt: 4.2, slope: "Unstable", lastSeen: "12s ago" },
  { id: "RUB-02", district: "Rubavu", lat: -1.69, lng: 29.27, battery: 78, signal: 3, rainfall: 14.1, soilMoisture: 72, tilt: 1.8, slope: "Minor",    lastSeen: "8s ago"  },
  { id: "NYB-01", district: "Nyabihu", lat: -1.65, lng: 29.51, battery: 64, signal: 4, rainfall: 11.6, soilMoisture: 81, tilt: 3.1, slope: "Minor",    lastSeen: "20s ago" },
  { id: "KAR-01", district: "Karongi", lat: -2.06, lng: 29.38, battery: 88, signal: 3, rainfall:  9.3, soilMoisture: 76, tilt: 2.4, slope: "Minor",    lastSeen: "5s ago"  },
  { id: "RUS-01", district: "Rusizi",  lat: -2.48, lng: 28.91, battery: 41, signal: 2, rainfall: 22.7, soilMoisture: 64, tilt: 0.6, slope: "Stable",   lastSeen: "31s ago" },
  { id: "MUS-01", district: "Musanze", lat: -1.50, lng: 29.63, battery: 95, signal: 5, rainfall:  6.8, soilMoisture: 58, tilt: 1.2, slope: "Stable",   lastSeen: "3s ago"  },
  { id: "NGR-01", district: "Ngororero", lat: -1.87, lng: 29.62, battery: 72, signal: 3, rainfall: 12.9, soilMoisture: 79, tilt: 2.9, slope: "Minor", lastSeen: "14s ago" },
  { id: "GAK-01", district: "Gakenke", lat: -1.69, lng: 29.77, battery: 83, signal: 4, rainfall:  8.2, soilMoisture: 68, tilt: 1.5, slope: "Stable",   lastSeen: "9s ago"  },
];

export const ALERTS: AlertItem[] = [
  { id: "a1", time: "08:42", district: "Rubavu", hazard: "Landslide", level: "Critical",
    message_en: "URGENT: Landslide imminent in Rubavu hills. Evacuate to higher ground immediately.",
    message_rw: "BYIHUTIRWA: Inkangu yegereje mu misozi ya Rubavu. Vana hejuru y'umutekano nonaha.",
    channel: "SMS", status: "Sent" },
  { id: "a2", time: "08:30", district: "Nyabihu", hazard: "Landslide", level: "High",
    message_en: "WARNING: Saturated soil detected. Avoid steep slopes for next 12 hours.",
    message_rw: "IMPUGUKURO: Ubutaka bwuzuye amazi. Wirinde imisozi y'amanga mu masaha 12 ari imbere.",
    channel: "SMS", status: "Acknowledged" },
  { id: "a3", time: "08:15", district: "Rusizi", hazard: "Flood", level: "Medium",
    message_en: "ALERT: Rising water levels at Rusizi River. Move livestock to higher ground.",
    message_rw: "MENYA: Amazi ariyongera mu ruzi rwa Rusizi. Jyana inka hejuru.",
    channel: "Radio", status: "Sent" },
  { id: "a4", time: "07:58", district: "Karongi", hazard: "Landslide", level: "High",
    message_en: "WARNING: Slope instability detected near Lake Kivu shore. Stay alert.",
    message_rw: "IMPUGUKURO: Umusozi uradoga hafi y'inyanja Kivu. Komeza witondere.",
    channel: "SMS", status: "Sent" },
  { id: "a5", time: "07:30", district: "Musanze", hazard: "Flood", level: "Low",
    message_en: "Notice: Heavy rain expected. Monitor local streams.",
    message_rw: "Itangazo: Imvura nyinshi iteganijwe. Reba imigezi yo hafi.",
    channel: "USSD", status: "Pending" },
];

// Time series for charts
export const RAINFALL_24H = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  rainfall: Math.round((Math.sin(i / 3) * 8 + 10 + Math.random() * 6) * 10) / 10,
  forecast: Math.round((Math.sin(i / 3 + 1) * 9 + 12 + Math.random() * 5) * 10) / 10,
}));

export const SOIL_7D = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  moisture: Math.round(55 + i * 4 + Math.random() * 6),
  threshold: 75,
}));

export const SATELLITE_FUSION = [
  { region: "Rubavu", satellite: 92, ground: 88, fused: 91 },
  { region: "Nyabihu", satellite: 78, ground: 81, fused: 80 },
  { region: "Karongi", satellite: 74, ground: 71, fused: 73 },
  { region: "Rusizi",  satellite: 61, ground: 58, fused: 60 },
  { region: "Musanze", satellite: 52, ground: 54, fused: 53 },
  { region: "Kigali",  satellite: 31, ground: 28, fused: 30 },
];

export const riskColor = (level: RiskLevel) => {
  switch (level) {
    case "Low": return "var(--risk-low)";
    case "Medium": return "var(--risk-medium)";
    case "High": return "var(--risk-high)";
    case "Critical": return "var(--risk-critical)";
  }
};

export const riskBadgeClass = (level: RiskLevel) => {
  switch (level) {
    case "Low": return "bg-[var(--risk-low)]/15 text-[var(--risk-low)] border-[var(--risk-low)]/40";
    case "Medium": return "bg-[var(--risk-medium)]/15 text-[var(--risk-medium)] border-[var(--risk-medium)]/40";
    case "High": return "bg-[var(--risk-high)]/15 text-[var(--risk-high)] border-[var(--risk-high)]/40";
    case "Critical": return "bg-[var(--risk-critical)]/15 text-[var(--risk-critical)] border-[var(--risk-critical)]/40";
  }
};
