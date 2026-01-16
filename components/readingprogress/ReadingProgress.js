"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingProgress.module.css";

export default function ReadingProgress({ targetId }) {
  const barRef = useRef(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !barRef.current) return;

    const targetTop = target.offsetTop;
    const targetHeight = target.offsetHeight;

    const update = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const start = targetTop;
      const end = targetTop + targetHeight - viewportHeight;

      if (scrollY <= start) {
        barRef.current.style.transform = "scaleX(0)";
        return;
      }

      if (scrollY >= end) {
        barRef.current.style.transform = "scaleX(1)";
        return;
      }

      const progress = (scrollY - start) / (end - start);
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  return (
    <div className={styles.progressTrack} aria-hidden="true">
      <div ref={barRef} className={styles.progressBar} />
    </div>
  );
}
