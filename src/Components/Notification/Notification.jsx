import axios from "axios";
import { BellIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useAxiosWithErrorHandler } from "../../utils/axiosInstance";



const Notification = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token")
    const ApiKey = import.meta.env.VITE_API_KEY;
    const ImageKey = import.meta.env.VITE_IMAGE_KEY;
    const Axios = useAxiosWithErrorHandler();

    // STATES 
    const [totalCount, setTotalCount] = useState(0); // total from server


    const [unreadCount, setunreadCount] = useState()
    const [OpenPopup, setOpenPopup] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);
    const [NotificationData, setNotificatiomData] = useState([])
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const GetNotifications = async (count = visibleCount) => {
        try {
            const response = await Axios.get(`${ApiKey}/notifications?per_page=${count}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const Vel = response.data.data;
            const Count = response.data.meta.unread_count;
            const total = response.data.meta.total_count;

            setNotificatiomData(Vel);
            setunreadCount(Count);
            setTotalCount(total);
        } catch (error) {
        }
    };



    useEffect(() => {
        GetNotifications();
    }, [location.pathname]);



    function getTimeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);

        if (diffInSeconds < 60) {
            return "Just now";
        } else if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
    }


    const MarkAllUsRead = async () => {
        try {
            const response = await Axios.post(`${ApiKey}/notifications/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const Vel = response.data.data
            setNotificatiomData((prev) =>
                prev.map((item) => ({ ...item, is_read: true }))
            );
            setunreadCount(0);
        } catch (error) {
        }
    }

    const MarkUsRead = async (id) => {
        try {
            const response = await Axios.post(`${ApiKey}/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            const Vel = response.data.data
            setNotificatiomData((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, is_read: true } : item
                )
            );
            setunreadCount((prev) => (prev > 0 ? prev - 1 : 0));
        } catch (error) {
        }
    }

    return (
        <>
            <button
                onClick={() => setOpenPopup((prev) => !prev)}
                className="p-2 mx-1 cursor-pointer bg-[#f2f2f2] relative text-[#000] rounded-lg"
            >
                <span className="sr-only">View notifications</span>
                <BellIcon className="max-[380px]:w-5.5 h-6 w-6" aria-hidden="true" />
                {unreadCount > 0 && (
                    <span className="absolute font-Inter bg-[#ea7d39] rounded-full text-white text-[9px] top-1 right-1.5 flex items-center justify-center h-4 w-4 leading-none">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {OpenPopup && (
                <div
                    className="
                           absolute right-17 sm:right-26 min-[1780px]:right-[10%] top-29
                           w-60 sm:w-68 bg-white shadow-xl rounded-lg px-5 pt-5 pb-3 z-50
                           origin-top-right animate-[pop_180ms_cubic-bezier(0.2,0.7,0.3,1)_both]"
                >
                    {/* little pointer */}
                    <div className="bg-white w-4 h-6 -z-10 rotate-45 absolute right-8 sm:right-5 shadow-2xl -top-2" />
                    <div className="flex items-center justify-between mb-2 relative">
                        <p className="font-semibold text-[18px] sm:text-lg font-Poppins">Notifications</p>
                        <div className="!relative" ref={menuRef}>
                            <Popover className={"relative"}>
                                <PopoverButton className="block text-sm/6 font-semibold text-black focus:outline-none data-active:text-black data-focus:outline data-focus:outline-black">
                                    <button className="text-xl font-bold px-2 cursor-pointer">
                                        ⋮
                                    </button>
                                </PopoverButton>
                                <PopoverPanel
                                    transition
                                    anchor="bottom"
                                    className="divide-y z-50 rounded-[6px] cursor-pointer bg-[#f6f6f6]  transition duration-200 ease-in-out [--anchor-gap:--spacing(2)] data-closed:-translate-y-1 data-closed:opacity-0"
                                >
                                    <div className="p-3">
                                        <button
                                            onClick={() => {
                                                MarkAllUsRead();
                                                setOpenPopup(false);
                                            }}
                                            className="block w-full cursor-pointer   text-[13.5px] hover:bg-gray-100  text-Paracolor font-[600] underline"
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                </PopoverPanel>
                            </Popover>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-10">

                                </div>
                            )}
                        </div>
                    </div>
                    <ul className="h-[260px] sm:h-[345px] overflow-y-auto mt-4 custom-scrollbar">
                        {[...NotificationData]
                            .sort((a, b) => Number(a.is_read) - Number(b.is_read))
                            .slice(0, visibleCount)
                            .map((item, i) => (
                                <li
                                    key={item.id}
                                    onClick={() => { MarkUsRead(item.id) }}
                                    className="flex items-center cursor-pointer pt-2 pb-3.5 gap-2 mb-2 border-b border-[#e8e8e8] animate-[rowIn_220ms_ease-out_both]"
                                    style={{ animationDelay: `${60 + i * 40}ms` }}
                                >
                                    <div className="relative w-[65px]">
                                        <img
                                            src={ImageKey + item.data.first_image}
                                            alt={item.name}
                                            className="w-9 h-9 sm:w-12 sm:h-12 rounded-[5px] object-cover"
                                        />
                                        {!item.is_read && <span className="absolute font-Inter bg-[#ea7d39] rounded-full text-white text-[9px] -top-1 border-white border-[2px] left-10 flex items-center justify-center h-3 w-3 leading-none">
                                        </span>}

                                    </div>
                                    <div className="flex flex-col w-[240px]" >
                                        <span onClick={() => { navigate(`/properties/${item.data.property_id}`) }} className="text-[14px] sm:text-[14px] sm:leading-[17px] font-Urbanist font-semibold">{item.data.property_type === "Other" ? item.data.property_name + " " + item.data.city + "," + " " + item.data.state : item.title}</span>
                                        <span className="text-[10px] sm:text-[11px] mt-1 font-Inter text-gray-500">{getTimeAgo(item.created_at)}</span>
                                    </div>
                                </li>
                            ))}
                        {NotificationData.length < 1 && <div className="w-[100%] text-[#232323] font-Inter text-[14px] -mt-7 flex justify-center h-full items-center">No Notification Found</div>}
                    </ul>


                    {NotificationData.length < totalCount && (
                        <p
                            className="font-semibold cursor-pointer text-PurpleColor text-[15px] sm:text-[13px] underline font-Poppins text-center mt-2"
                            onClick={() => {
                                const newCount = visibleCount + 10;
                                setVisibleCount(newCount);
                                GetNotifications(newCount);
                            }}
                        >
                            See More
                        </p>
                    )}


                </div>
            )}

            <style>{`
                @keyframes pop {
                  0% { opacity: 0; transform: scale(0.95) translateY(6px); }
                  100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes rowIn {
                  0% { opacity: 0; transform: translateY(6px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default Notification;
