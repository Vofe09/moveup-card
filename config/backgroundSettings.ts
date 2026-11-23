import type { BackgroundSettings } from "@/components/InteractiveBackground";

/** Общие настройки интерактивного фона для всех страниц сайта. */
export const backgroundSettings: BackgroundSettings = {
  enabled: true,
  intensity: "high", // "low" | "medium" | "high"

  interaction: {
    cursor: true,
    touch: true,
    clickRipples: true,
  },

  layers: {
    neuralNetwork: true,
    matrixRain: true,
    aurora: true,
    holographicGrid: true,
  },

  neuralNetwork: {
    particleCount: 88,
    connectionDistance: 142,
    speed: 1,
    cursorRadius: 190,
  },

  matrixRain: {
    opacity: 0.13,
    fontSize: 15,
    speed: 0.8,
  },

  aurora: {
    opacity: 0.27,
    duration: 32,
  },

  holographicGrid: {
    opacity: 0.12,
    spacing: 58,
  },
};
