"use client";

import { useEffect, useRef, useState } from "react";

type SectionMeshBackdropProps = {
  className?: string;
  intensity?: number;
};

export function SectionMeshBackdrop({
  className,
  intensity = 1,
}: SectionMeshBackdropProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const vh = Math.max(1, window.innerHeight);
      const progress = Math.min(1, Math.max(0, 1 - rect.top / vh));

      const y = progress * -18 * intensity;
      const s = 1 + progress * 0.05 * intensity;
      el.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        background:
          "radial-gradient(760px circle at 18% 32%, rgba(232,39,44,0.24), transparent 58%), radial-gradient(560px circle at 72% 22%, rgba(255,255,255,0.72), transparent 60%), radial-gradient(820px circle at 82% 86%, rgba(232,39,44,0.20), transparent 62%), radial-gradient(680px circle at 45% 70%, rgba(255,80,110,0.18), transparent 62%)",
        filter: "blur(14px)",
        opacity: 0.9,
        mixBlendMode: "multiply",
        animation: reducedMotion
          ? undefined
          : "softlien-mesh-float 12s ease-in-out infinite",
      }}
    />
  );
}
