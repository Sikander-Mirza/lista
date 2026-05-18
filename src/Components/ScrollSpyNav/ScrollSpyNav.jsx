import React from "react";

export default function ScrollSpyNav({ sections, activeId, title = "On this page", onItemClick }) {
  const handleClick = (e, id) => {
    // if it is an <a>, stop default hash behavior
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (onItemClick) onItemClick(id);
  };

  return (
    <aside className="col-span-12 sm:hidden lg:block lg:col-span-4 lg:w-[90%] xl:w-full xl:col-span-3">
      <div className="font-Urbanist sticky top-16 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur px-4 py-6 sm:px-5 sm:py-8 shadow-sm">
        <h3 className="mb-3 text-[17px] sm:text-[16px] 2xl:text-[18px] cursor-pointer font-bold uppercase tracking-wide text-black">
          {title}
        </h3>
        <nav className="space-y-0 sm:space-y-2">
          {sections.map((s) => {
            const common =
              "block w-full text-left rounded-lg px-3 text-[15px] sm:text-[16.5px] transition-colors 2xl:text-[18.5px] font-semibold";
            const active =
              "bg-[#723cfa18] text-PurpleColor font-bold py-3 mb-2";
            const idle = "text-black hover:bg-gray-50 py-2";

            return (
              <button
                key={s.id}
                type="button"
                onClick={(e) => handleClick(e, s.id)}
                className={`${common} ${activeId === s.id ? active : idle} cursor-pointer`}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
