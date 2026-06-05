import { useEffect } from "react";
import Routing from "./Configuration/ScreensRouting/Routing";

const App = () => {
  useEffect(() => {
    // ✅ Skip flowbite during react-snap pre-render
    if (typeof window === "undefined") return;
    if (window.navigator.userAgent === "ReactSnap") return;

    import("flowbite")
      .then((module) => {
        if (module.initFlowbite) {
          module.initFlowbite();
        }
      })
      .catch(() => {});
  }, []);

  return <Routing />;
};

export default App;