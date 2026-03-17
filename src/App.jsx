import { useEffect } from "react";
import Routing from "./Configuration/ScreensRouting/Routing";

const App = () => {
  useEffect(() => {
    // Load flowbite async — but don't break app if it fails
    import("flowbite")
      .then((module) => {
        if (module.initFlowbite) {
          module.initFlowbite();
        }
      })
      .catch(() => {
        // Flowbite failed to load — app still works
      });
  }, []);

  return <Routing />;
};

export default App;