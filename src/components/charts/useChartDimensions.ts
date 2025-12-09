'use client';

import { useEffect, useRef, useState } from "react";

type Size = { width: number; height: number };

/**
 * Tracks the rendered size of a chart container so we can position
 * overlays (e.g. tooltips) relative to it.
 */
export const useChartDimensions = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) {
        setSize({ width: rect.width, height: rect.height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
};

