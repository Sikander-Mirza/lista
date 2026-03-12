import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronsDown, ExternalLink, ChartNoAxesCombined, Edit, Trash2, Lock, Eye, TextSearch } from "lucide-react";
import Spinner from "../../Spinner/Spinner";
import TruncatedText from "../../TruncatedText/TruncatedText";
import clsx from "clsx";

export default function ListingMobileTable({
    loading,
    items = [],
    navigate,
    Islocked,
    onEdit,
    onDelete,
}) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);

    const openSheet = (item) => {
        setActive(item);
        setOpen(true);
    };
    const closeSheet = () => setOpen(false);

    // prevent background scroll when sheet is open
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = open ? "hidden" : prev || "";
        return () => (document.body.style.overflow = prev || "");
    }, [open]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner style={"w-12 h-14 text-PurpleColor"} />
            </div>
        );
    }

    if (!items.length) {
        return (
            <div className="flex h-40 items-center justify-center text-gray-500 font-semibold">
                No listings found.
            </div>
        );
    }

    return (
        <section className="flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="bg-black w-full flex justify-between rounded-t-[13px] items-center px-3.5 py-3.5">
                <h1 className="text-white font-Urbanist text-[16px] sm:text-[17px] font-bold">
                    Property Name
                </h1>
                <div className="flex items-center gap-3">
                    <h1 className="text-white hidden pr-8 sm:block font-Urbanist text-[16px] sm:text-[17px] font-bold">
                        Status
                    </h1>
                    <h1 onClick={() =>
                        setSortByViews((prev) => (prev === "desc" ? "asc" : "desc"))
                    } className="text-white  font-Urbanist text-[16px] px-1 sm:text-[17px] lg:text-[19px] font-bold">
                        View
                    </h1>
                    <TextSearch className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>

            {/* List */}
            <ul className="divide-y divide-gray-200 bg-white min-h-[60vh]  rounded-b-[13px]">
                {items.map((item) => (
                    <li key={item.id} className="border-b border-[#dadada]">
                        <button
                            onClick={() => openSheet(item)}
                            className="w-full flex items-center justify-between px-3.5 py-4 md:py-4.5 active:bg-gray-50"
                        >
                            <div className="text-left w-[74%] sm:w-[60%] pr-2">
                                <div className="text-[15px] sm:text-[17px] leading-[19px] font-[800] text-[#2c2a2a] font-Urbanist sm:w-[100%]">
                                    <TruncatedText text={item.property_name || "—"} maxLength={48} />
                                </div>
                                <div className="mt-0.5 text-[12.5px] text-gray-500 font-Urbanist sm:w-[100%]">
                                    <TruncatedText text={item.property_type || "—"} maxLength={24} />
                                </div>
                            </div>

                            <div className="flex gap-1">
                                <div className="hidden sm:block">
                                    <StatusPill status={item.listing_status} />
                                </div>
                                <div className="pr-5 sm:px-6 md:px-7 font-Urbanist font-semibold">
                                    {item.views_count}
                                </div>

                                <ChevronsDown className="w-6 h-6 text-black" />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Bottom Sheet */}
            <div className={`fixed inset-0 z-[70] justify-center flex flex-col items-center ${open ? "" : "pointer-events-none"}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
                    onClick={closeSheet}
                />
                {/* Panel */}
                <div
                    className={`absolute sm:w-[70%] left-0 sm:left-24 md:left-30 min-[890px]:!w-[50%] min-[890px]:!left-[40%] right-0 bottom-0 max-h-[85vh] min-h-[50vh] bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
                >
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3" />
                    <div className="p-4">
                        {active && (
                            <SheetContent
                                item={active}
                                Islocked={Islocked}
                                navigate={navigate}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onClose={closeSheet}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- Helpers ---------- */

function StatusPill({ status }) {
    const pill = statusToPill(status);
    return (
        <span
            className={clsx(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold",
                pill.className
            )}
        >
            {/* <span className={clsx("h-2 w-2 rounded-full", pill.dot)} /> */}
            {status || "—"}
        </span>
    );
}

function statusToPill(status) {
    // Mirrors your desktop dot colors: Available (green), Loss (red), else blue
    if (status === "Available") {
        return { className: "bg-green-100 text-green-700", dot: "bg-[#02E327]" };
    }
    if (status === "Loss") {
        return { className: "bg-red-100 text-red-700", dot: "bg-[#E31D1C]" };
    }
    return { className: "bg-blue-100 text-blue-700", dot: "bg-[#4379EE]" };
}

function formatPrice(item) {
    if (item.listing_type === "For Sale") return item.sale_price ?? "—";
    if (item.listing_type === "For Lease") return item.lease_rate ?? "—";
    if (item.listing_type === "Both (For Sale & For Lease)") {
        const sale = item.sale_price ?? "—";
        const lease = item.lease_rate ?? "—";
        return `${sale} / sale · ${lease} / lease`;
    }
    return "—";
}

/* ---------- Bottom Sheet Content ---------- */

function SheetContent({ item, Islocked, navigate, onEdit, onDelete, onClose }) {
    return (
        <div>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-[20px] md:text-[24px] leading-[26px] font-Urbanist font-[800] text-gray-900">
                        {item.property_name || "—"}
                    </h3>
                    <p className="text-[13.5px] text-gray-500 font-Urbanist">
                        
                    </p>
                </div>
                <button onClick={onClose} aria-label="Close">
                    <XMarkIcon className="w-6 h-6 text-gray-400" />
                </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-3">
                <div className="font-Urbanist text-[17px] font-bold">
                    Type: <span>{item.property_type || "—"}</span>
                </div>
                <div className="font-Urbanist text-[17px] font-bold">
                    Amount: <span>$<TruncatedText text={formatPrice(item)} maxLength={26} /></span>
                </div>
                 
                <div className="font-Urbanist text-[17px] font-bold">
                    Date:{" "}
                    <span>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
                <div className="font-Urbanist text-[17px] font-bold mt-1">
                    Status:{" "}
                    <StatusPill status={item.listing_status} />
                </div>
                <div className="font-Urbanist text-[17px] flex gap-2 mt-1 items-center font-bold">
                    Action Url:
                    <button
                        onClick={() => {
                            navigate(`/properties/${item.id}`);
                            onClose();
                        }}
                        className="text-indigo-600 underline font-[500] text-[14px] flex items-center gap-1"
                    >
                        <ExternalLink className="w-4 h-4" /> Property page
                    </button>
                </div>


            </div>

            {/* Actions */}
            <div className="mt-5 grid grid-cols-3 gap-3">
                {/* Analytics (locked if Islocked) */}
                {Islocked ? (
                    <button
                        disabled
                        className="flex items-center justify-center  bg-gray-200 text-gray-600 py-1 font-semibold text-[14.5px] cursor-not-allowed rounded-full relative"
                    >
                        <Lock className="w-4.5 h-4.5 text-red-600 absolute -top-0.5 bg-white rounded-full px-1 -right-1 " />
                        Analytics
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate(`/admin/analytics/${item.id}`);
                            onClose();
                        }}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-[14.5px] text-white py-1 rounded-full font-semibold"
                    >
                        Analytics
                    </button>
                )}

                {/* Edit */}
                <button
                    onClick={async () => {
                        await onEdit?.(item.id);
                        onClose();
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-full text-[14.5px] font-semibold col-span-1"
                >
                    Edit
                </button>

                {/* Delete */}
                <button
                    onClick={async () => {
                        await onDelete?.(item.id);
                        onClose();
                    }}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-[8px] rounded-full text-[14.5px] font-semibold col-span-1"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
