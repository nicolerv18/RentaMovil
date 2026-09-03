import { DiDigitalOcean } from "react-icons/di";

export interface ThemeColors {
  background: string;
  backgroundCard: string;
  card: string;
  text: string;
  secondaryText: string;
  primary: string;
  border: string;
  success: string;
  button: string;
  buttonText: string;
  input: string;
  cardBg: string;
  borderfilter: string;
  textBtn: string;
  error: string;
  label: string;
}

export const themes: Record<"light" | "dark" | "Ocean" | "gray", ThemeColors> = {
  light: {
    background: "#FAFAFA",
    backgroundCard: "#FFFFFF",
    card: "#FFFFFF",
    text: "#1F2937",
    secondaryText: "#9CA3AF",
    primary: "#006241",
    border: "#E5E7EB",
    success: "#006241",
    button: "#C59B27",
    buttonText: "#121212",
    input: "#F3F4F6",
    cardBg: "#FFFFFF",
    borderfilter: "#BBF7D0",
    textBtn: "#121212",
    error: "#EF4444",
    label: "#1F2937",
  },
  dark: {
    background: "#030712",
    backgroundCard: "#070F22",
    card: "#070F22",
    text: "#F8FAFC",
    secondaryText: "#94A3B8",
    primary: "#C59B27",
    border: "rgba(255, 255, 255, 0.04)",
    success: "#10B981",
    button: "#C59B27",
    buttonText: "#030712",
    input: "#0B1528",
    cardBg: "#070F22",
    borderfilter: "#C59B27",
    textBtn: "#030712",
    error: "#EF4444",
    label: "#F8FAFC",
  },
  Ocean: {
    background: "#070F1E",
    backgroundCard: "#0D1B2A",
    card: "#0D1B2A",
    text: "#F8F9FA",
    secondaryText: "#A0AEC0",
    primary: "#3B82F6",
    border: "#334155",
    success: "#16A34A",
    button: "#C59B27",
    buttonText: "#070F1E",
    input: "#152238",
    cardBg: "#0D1B2A",
    borderfilter: "#223147",
    textBtn: "#070F1E",
    error: "#EF4444",
    label: "#F8F9FA",
  },
  gray: {
    background: "#0B0F19",
    backgroundCard: "#111827",
    card: "#111827",
    text: "#F3F4F6",
    secondaryText: "#9CA3AF",
    primary: "#3B82F6",
    border: "#374151",
    success: "#34D399",
    button: "#3B82F6",
    buttonText: "#FFFFFF",
    input: "#1F2937",
    cardBg: "#111827",
    borderfilter: "#60A5FA",
    textBtn: "#FFFFFF",
    error: "#F87171",
    label: "#F3F4F6",
  }
};
