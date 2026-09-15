export const themes = {

  light: {
    background: "#F1EFE8",
    backgroundCard: "#ffffff",
    card: "#FFFFFF",
    text: "#111111",
    secondaryText: "#666666",
    primary: "#1a2e4a",
    border: "#E5E5E5",
    success: "#18B663",
    button: "#16213E",
    buttonText: "#FFFFFF",
    input: "#ebe9e9",
    cardBg: "#ffffff",
    borderfilter: "#2A2F6E",
    textBtn: "#FFFFFF",
    error: "#FF4D4D",
    label: "#000000",

  },

  dark: {
    background: "#121212",
    backgroundCard: "#1E1E1E",
    card: "#1E1E1E",
    text: "#FFFFFF",
    secondaryText: "#B0B0B0",
    primary: "#4A90E2",
    border: "#2A2A2A",
    success: "#18B663",
    button: "#16213E",
    buttonText: "#ffffff",
    input: "#2A2A2A",
    cardBg: "#ffffff",
    borderfilter: "#2A2F6E",
    textBtn: "#FFFFFF",
    error: "#FF4D4D",
    label: "#000000",
  },

  ocean: {
    background: "#EAF6FF",
    card: "#FFFFFF",
    text: "#0D1B2A",
    secondaryText: "#415A77",
    primary: "#0077B6",
    border: "#D6E4F0",
    success: "#00B894",
    button: "#0077B6",
    buttonText: "#FFFFFF",
  },

    gray: {
    background: "#EAF6FF",
    card: "#FFFFFF",
    text: "#0D1B2A",
    secondaryText: "#415A77",
    primary: "#0077B6",
    border: "#D6E4F0",
    success: "#00B894",
    button: "#0077B6",
    buttonText: "#FFFFFF",
  },

};

export type Themes = keyof typeof themes;