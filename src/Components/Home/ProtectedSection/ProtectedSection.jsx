import React, { useEffect, useRef } from "react";

const ProtectedSection = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    const blockEvent = (e) => e.preventDefault();

    if (el) {
      el.addEventListener("contextmenu", blockEvent);
      el.addEventListener("copy", blockEvent);
      el.addEventListener("selectstart", blockEvent);
      el.addEventListener("dragstart", blockEvent);
      el.addEventListener("click", blockEvent, true);
    }

    return () => {
      if (el) {
        el.removeEventListener("contextmenu", blockEvent);
        el.removeEventListener("copy", blockEvent);
        el.removeEventListener("selectstart", blockEvent);
        el.removeEventListener("dragstart", blockEvent);
        el.removeEventListener("click", blockEvent, true);
      }
    };
  }, []);

  return (
    <div 
    className="!w-[100%]  gap-7"
      ref={sectionRef}
      style={{
        userSelect: "none",
        pointerEvents: "none", 
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {/* images inside should not be draggable */}
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { draggable: false });
      })}
    </div>
  );
};

export default ProtectedSection;
