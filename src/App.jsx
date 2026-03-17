import { lazy, Suspense, useEffect } from "react";
import Routing from "./Configuration/ScreensRouting/Routing";

const App = () => {
  useEffect(() => {
    // Load flowbite JS only when needed, asynchronously
    // This removes ~50KB+ from your initial bundle
    import("flowbite").then((flowbite) => {
      flowbite.initFlowbite?.();
    });
  }, []);

  return <Routing />;
};

export default App;