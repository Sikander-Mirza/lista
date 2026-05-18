import { useEffect } from "react";
import Routing from "./Configuration/ScreensRouting/Routing";

const App = () => {
  useEffect(() => {
    // ✅ Only load flowbite — NO API calls here
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