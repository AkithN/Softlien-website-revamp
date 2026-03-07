"use client";

import { useMemo, useRef } from "react";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  scale?: number;
};

export function Tilt({
  children,
  className,
  maxTiltDeg = 10,
  scale = 1.03,
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const baseStyle = useMemo(
    () => ({
      transformStyle: "preserve-3d" as const,
      willChange: "transform" as const,
      transition: "transform 180ms ease-out",
    }),
    []
  );

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const tiltX = (py - 0.5) * -2 * maxTiltDeg;
    const tiltY = (px - 0.5) * 2 * maxTiltDeg;

    el.style.transition = "transform 0ms";
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 220ms ease-out";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={baseStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
