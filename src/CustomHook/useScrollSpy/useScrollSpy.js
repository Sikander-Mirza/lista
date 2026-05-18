import { useEffect, useState } from "react";


export default function useScrollSpy(sectionIds, options = { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }) {
  const [active, setActive] = useState(sectionIds?.[0] ?? null);

  useEffect(() => {
    if (!sectionIds?.length) return;
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(id);
        });
      }, options);
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [JSON.stringify(sectionIds)]); 

  return active;
}
