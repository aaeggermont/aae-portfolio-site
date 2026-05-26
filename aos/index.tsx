'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";

export function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();

    /* Responsive components (`useResponsive`) only render their real DOM after the provider's
       mount effect runs (after AOS init), and images/fonts can shift layout later still. Run a
       few catch-up refreshes plus a `ResizeObserver` on `<body>` so AOS positions stay accurate. */
    const refreshHardSoon = () => AOS.refreshHard();

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(refreshHardSoon);
    });
    const t1 = window.setTimeout(refreshHardSoon, 250);
    const t2 = window.setTimeout(refreshHardSoon, 1000);

    /* Debounced resize observer — refreshes AOS whenever document body height changes
       (e.g. responsive sub-trees mount, lazy images load). */
    let resizeRaf = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(refreshHardSoon);
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      resizeObserver.disconnect();
    };
  }, []);

  return <></>
}