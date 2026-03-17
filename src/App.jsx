import { useEffect } from "react";
import Routing from "./Configuration/ScreensRouting/Routing";

const App = () => {
  useEffect(() => {
    // Load flowbite async
    import("flowbite")
      .then((module) => {
        if (module.initFlowbite) {
          module.initFlowbite();
        }
      })
      .catch(() => {});

    // ✅ Warm up API connection AFTER render, using requestIdleCallback
    const warmUpConnection = () => {
      const API_URL = import.meta.env.VITE_API_KEY;
      if (API_URL) {
        fetch(`${API_URL}/properties`, {
          method: 'HEAD',
          mode: 'cors',
        }).catch(() => {});
      }
    };

    // Only warm up when browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(warmUpConnection, { timeout: 3000 });
    } else {
      setTimeout(warmUpConnection, 2000);
    }
  }, []);

  return <Routing />;
};

export default App;