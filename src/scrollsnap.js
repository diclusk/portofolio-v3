import { useEffect, useRef } from 'react';

export function useScrollSnap() {
  const containerRef = useRef(null);
  const currentIdx = useRef(0);
  const isScrolling = useRef(false);
  const accumulatedDelta = useRef(0);
  const lastWheelTime = useRef(0);
  const lockTimeout = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll('section');
    const totalSections = sections.length;

    document.documentElement.style.scrollBehavior = 'auto';

    const scrollToSection = (index) => {
      if (index < 0 || index >= totalSections) return;
      isScrolling.current = true;
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (lockTimeout.current) clearTimeout(lockTimeout.current);
      lockTimeout.current = setTimeout(() => { isScrolling.current = false; }, 1200);
    };

    const handleWheel = (e) => {
      const now = Date.now();

      // Hard lock while a smooth scroll is in progress
      if (isScrolling.current) { e.preventDefault(); return; }

      // Reset accumulation if there's a pause between wheel spikes
      if (now - lastWheelTime.current > 250) {
        accumulatedDelta.current = 0;
      }
      lastWheelTime.current = now;

      // Accumulate delta across rapid events
      accumulatedDelta.current += e.deltaY;

      // Only navigate once accumulated delta crosses a threshold
      if (Math.abs(accumulatedDelta.current) < 50) return;

      const direction = accumulatedDelta.current > 0 ? 1 : -1;
      accumulatedDelta.current = 0;

      if (direction > 0) {
        if (currentIdx.current < totalSections - 1) {
          e.preventDefault();
          currentIdx.current++;
          scrollToSection(currentIdx.current);
        }
      } else {
        if (currentIdx.current > 0) {
          e.preventDefault();
          currentIdx.current--;
          scrollToSection(currentIdx.current);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (lockTimeout.current) clearTimeout(lockTimeout.current);
    };
  }, []);

  return containerRef;
}
