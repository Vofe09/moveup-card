"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export type BackgroundSettings = {
  enabled: boolean;
  intensity: "low" | "medium" | "high";
  interaction: {
    cursor: boolean;
    touch: boolean;
    clickRipples: boolean;
  };
  layers: {
    neuralNetwork: boolean;
    matrixRain: boolean;
    aurora: boolean;
    holographicGrid: boolean;
  };
  neuralNetwork: {
    particleCount: number;
    connectionDistance: number;
    speed: number;
    cursorRadius: number;
  };
  matrixRain: {
    opacity: number;
    fontSize: number;
    speed: number;
  };
  aurora: {
    opacity: number;
    duration: number;
  };
  holographicGrid: {
    opacity: number;
    spacing: number;
  };
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type MatrixColumn = {
  x: number;
  y: number;
  speed: number;
  length: number;
};

type PointerPoint = {
  x: number;
  y: number;
  active: boolean;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  life: number;
};

const matrixGlyphs = "01アイウエオカキクケコサシスセソ<>/{}[]+-=MOVEUP";

const intensityScale = {
  low: 0.58,
  medium: 0.82,
  high: 1,
} as const;

export default function InteractiveBackground({
  settings,
}: {
  settings: BackgroundSettings;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context || !settings.enabled) return;

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const intensity = intensityScale[settings.intensity];
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const particleCount = Math.max(
      12,
      Math.round(
        settings.neuralNetwork.particleCount *
          intensity *
          (isTouchDevice ? 0.72 : 1),
      ),
    );

    const pointer: PointerPoint = { x: -1000, y: -1000, active: false };
    const ripples: Ripple[] = [];
    let particles: Particle[] = [];
    let matrixColumns: MatrixColumn[] = [];
    let matrixFontSize = Math.max(10, settings.matrixRain.fontSize);

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.22, 0.22) * settings.neuralNetwork.speed,
        vy: random(-0.22, 0.22) * settings.neuralNetwork.speed,
        radius: random(0.8, 1.8) * intensity,
      }));
    };

    const createMatrix = () => {
      const columnCount = Math.ceil(width / matrixFontSize);
      matrixColumns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * matrixFontSize,
        y: random(-height, 0),
        speed: random(0.35, 1.15) * settings.matrixRain.speed,
        length: Math.round(random(3, 9)),
      }));
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
      createMatrix();
      drawFrame(0, true);
    };

    const drawNeuralNetwork = (delta: number) => {
      const connectionDistance =
        settings.neuralNetwork.connectionDistance *
        (isTouchDevice ? 0.86 : 1);
      const connectionDistanceSquared = connectionDistance ** 2;
      const cursorRadius = settings.neuralNetwork.cursorRadius;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        if (pointer.active) {
          const deltaX = pointer.x - particle.x;
          const deltaY = pointer.y - particle.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance > 1 && distance < cursorRadius) {
            const influence = (1 - distance / cursorRadius) * 0.012;
            particle.vx += deltaX * influence * delta;
            particle.vy += deltaY * influence * delta;
          }
        }

        particle.vx *= 0.999;
        particle.vy *= 0.999;

        for (const ripple of ripples) {
          const deltaX = particle.x - ripple.x;
          const deltaY = particle.y - ripple.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const ringDistance = Math.abs(distance - ripple.radius);

          if (ringDistance < 34 && distance > 0) {
            const force = (1 - ringDistance / 34) * 0.045 * ripple.life;
            particle.vx += (deltaX / distance) * force * delta;
            particle.vy += (deltaY / distance) * force * delta;
          }
        }

        const pointDistanceToCursor = pointer.active
          ? Math.hypot(pointer.x - particle.x, pointer.y - particle.y)
          : cursorRadius + 1;
        const pointGlow = Math.max(
          0,
          1 - pointDistanceToCursor / cursorRadius,
        );

        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.radius + pointGlow * 1.5,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(132, 177, 255, ${0.38 + pointGlow * 0.55})`;
        context.shadowColor = "rgba(91, 151, 255, 0.8)";
        context.shadowBlur = 5 + pointGlow * 13;
        context.fill();
        context.shadowBlur = 0;

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const nextParticle = particles[nextIndex];
          const deltaX = particle.x - nextParticle.x;
          const deltaY = particle.y - nextParticle.y;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared < connectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = (1 - distance / connectionDistance) * 0.22 * intensity;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(109, 159, 255, ${opacity})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }
    };

    const drawMatrixRain = (delta: number) => {
      context.font = `${matrixFontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textAlign = "center";

      for (const column of matrixColumns) {
        column.y += column.speed * delta * 0.65;

        for (let trailIndex = 0; trailIndex < column.length; trailIndex += 1) {
          const glyphY = column.y - trailIndex * matrixFontSize;
          if (glyphY < -matrixFontSize || glyphY > height + matrixFontSize) continue;

          const glyph = matrixGlyphs[
            Math.floor(Math.random() * matrixGlyphs.length)
          ];
          const trailOpacity =
            (1 - trailIndex / column.length) *
            settings.matrixRain.opacity *
            intensity;

          context.fillStyle =
            trailIndex === 0
              ? `rgba(190, 220, 255, ${trailOpacity * 1.5})`
              : `rgba(65, 145, 255, ${trailOpacity})`;
          context.fillText(glyph, column.x, glyphY);
        }

        if (column.y - column.length * matrixFontSize > height) {
          column.y = random(-height * 0.7, -matrixFontSize);
          column.speed = random(0.35, 1.15) * settings.matrixRain.speed;
        }
      }
    };

    const drawRipples = (delta: number) => {
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.radius += 2.4 * delta;
        ripple.life -= 0.012 * delta;

        if (ripple.life <= 0) {
          ripples.splice(index, 1);
          continue;
        }

        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(123, 174, 255, ${ripple.life * 0.3})`;
        context.lineWidth = 1.2;
        context.stroke();
      }
    };

    const drawFrame = (timestamp: number, isInitial = false) => {
      context.clearRect(0, 0, width, height);
      const delta = isInitial ? 0 : Math.min(timestamp || 16, 32) / 16.67;

      if (settings.layers.neuralNetwork) drawNeuralNetwork(delta);
      if (settings.layers.matrixRain) drawMatrixRain(delta);
      drawRipples(delta);
    };

    const animate = (timestamp: number) => {
      drawFrame(16.67);
      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const isTouch = event.pointerType === "touch";
      const interactionEnabled = isTouch
        ? settings.interaction.touch
        : settings.interaction.cursor;

      if (!interactionEnabled) return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const isTouch = event.pointerType === "touch";
      const interactionEnabled = isTouch
        ? settings.interaction.touch
        : settings.interaction.cursor;

      if (!interactionEnabled) return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (settings.interaction.clickRipples) {
        ripples.push({
          x: event.clientX,
          y: event.clientY,
          radius: 4,
          life: 1,
        });
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(animationFrame);
      if (reducedMotion) {
        drawFrame(0, true);
      } else {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerLeave, { passive: true });
    window.addEventListener("pointercancel", handlePointerLeave, { passive: true });
    motionQuery.addEventListener("change", handleMotionPreference);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerLeave);
      window.removeEventListener("pointercancel", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionPreference);
    };
  }, [settings]);

  if (!settings.enabled) return null;

  const auroraStyle = {
    "--aurora-opacity": settings.aurora.opacity,
    "--aurora-duration": `${settings.aurora.duration}s`,
  } as CSSProperties;

  const gridStyle = {
    "--grid-opacity": settings.holographicGrid.opacity,
    "--grid-spacing": `${settings.holographicGrid.spacing}px`,
  } as CSSProperties;

  return (
    <div className="interactiveBackground" aria-hidden="true">
      {settings.layers.aurora && (
        <div className="auroraLayer" style={auroraStyle}>
          <div className="auroraBlob auroraBlobOne" />
          <div className="auroraBlob auroraBlobTwo" />
          <div className="auroraBlob auroraBlobThree" />
        </div>
      )}

      {settings.layers.holographicGrid && (
        <div className="holographicGrid" style={gridStyle} />
      )}

      {(settings.layers.neuralNetwork || settings.layers.matrixRain) && (
        <canvas ref={canvasRef} className="backgroundCanvas" />
      )}
    </div>
  );
}
