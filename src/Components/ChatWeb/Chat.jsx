import { useEffect, useState, useRef } from "react";
import {
  getDatabase,
  ref,
  onChildAdded,
  push,
  set,
  remove,
  onValue,
  update,
  off
} from "firebase/database";
import db from "../../Configuration/Firebase/FirebaseConfig";
import {
  Calendar,
  CircleMinus,
  CircleSlash,
  DollarSign,
  EllipsisVertical,
  Info,
  MapPin,
  Phone,
  Trash,
} from "lucide-react";

import RightSideImage1_2 from "../../assets/Icons/RightSideImage1.2.png";
import { Menu } from "@headlessui/react";
import UnkownUser from "../../assets/fallback/UnknowUser.png";
import axios from "axios";
import ReportUserModal from "../ReportModal/ReportModal";
// other imports...

function getChatId(userId1, userId2) {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
}

export default function PrivateChat({
  currentUser,
  chatUser,
  setChatUser,
  setUsers,
}) {
  const [messages, setMessages] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatUserOnline, setIsChatUserOnline] = useState();
  const [text, setText] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  const chatId = getChatId(currentUser.id, chatUser.id);
  const messagesEndRef = useRef(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `messages/${chatId}`);
    setMessages([]);
    const handleNewMessage = (snapshot) => {
      setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
    };
    onChildAdded(messagesRef, handleNewMessage);
    return () => {
      off(messagesRef, "child_added", handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsgRef = push(ref(db, `messages/${chatId}`));
    await set(newMsgRef, {
      from: currentUser.id,
      to: chatUser.id,
      text: text.trim(),
      timestamp: Date.now(),
      read: false,
    });

    setText("");
  };

  const clearChat = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear this chat?"
    );
    if (!confirmClear) return;

    try {
      await remove(ref(db, `messages/${chatId}`));
      setMessages([]);
    } catch (error) {
    }
  };
  const deteleUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user and remove the chat?"
    );
    if (!confirmDelete) return;

    try {
      // 1. Call API to remove connection
      await axios.get(`${ApiKey}/network/remove-connection/${chatUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Delete messages in Firebase
      await remove(ref(db, `messages/${chatId}`));

      // 3. Update user list in UI immediately
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== chatUser.id)
      );

      // 4. Clear current chat user
      setChatUser(null);
    } catch (error) {
      alert("Failed to remove user.");
    }
  };

  useEffect(() => {
    const statusRef = ref(getDatabase(), `onlineUsers/${chatUser.id}`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      setIsChatUserOnline(snapshot.val() === true);
    });

    return () => unsubscribe();
  }, [chatUser.id]);

  function formatDaySeparator(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours >= 24) {
      return date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }

    return null;
  }

  // UPDATE READ ESSAGE
  useEffect(() => {
    if (!currentUser || !chatUser) return;

    const chatRef = ref(getDatabase(), `messages/${chatId}`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const updates = {};

      snapshot.forEach((childSnapshot) => {
        const msg = childSnapshot.val();

        if (msg.to === currentUser.id && msg.read === false) {
          updates[childSnapshot.key] = { ...msg, read: true };
        }
      });

      if (Object.keys(updates).length > 0) {
        update(chatRef, updates);
      }
    });

    return () => unsubscribe();
  }, [chatUser.id, currentUser.id]);

  const formatJoinDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `Joined ${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="sm:w-[75%] fixed sm:relative sm:h-[80vh] w-full  top-0 left-0 bg-white flex flex-col rounded-[10px] sm:border border-[#B9B9B9] justify-between overflow-hidden h-full">
        {/* Header */}
        <div className="flex justify-between border-b border-[#B9B9B9] py-3.5 lg:py-5 px-5">
          <div className="flex gap-3 items-center relative">
            <div
              onClick={() => setChatUser(null)}
              className="  rounded-full py-2 cursor-pointer sm:hidden"
            >
              <img className="z-10 relative" src={RightSideImage1_2} alt="" />
            </div>
            <div className="relative">
              <img
                className="h-11 w-11 rounded-full object-cover border border-[#e6e6e6]"
                src={
                  chatUser.headshot
                    ? import.meta.env.VITE_IMAGE_KEY + chatUser.headshot
                    : UnkownUser
                }
                alt=""
              />
              <span
                className={`absolute bottom-0.5 right-0 w-3 h-3 border-2 border-white rounded-full ${isChatUserOnline ? "bg-green-500" : "bg-red-600"
                  }`}
              ></span>
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="font-Urbanist font-[600] text-[#000] text-[18px]">
                {chatUser.first_name + " " + chatUser.last_name}
              </h1>
              <h5 className="font-Urbanist font-[600] text-[#000] text-[13.5px]  -mt-1 ">
                {isChatUserOnline ? "Online" : "Offline"}
              </h5>
            </div>
          </div>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center rounded-full focus:outline-none">
                <span className="sr-only">Open options</span>
                <EllipsisVertical className="size-5.5 cursor-pointer" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-[#f7f7f7]  border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-20">
                <div className="py-1">
                  <Menu.Item>
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className={`hover:bg-gray-200 flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer font-Urbanist font-[600] border-b-[1px] border-[#c9c9c9]`}
                    >
                      <Info className="size-[17px]" />
                      Contact Info
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => clearChat()}
                      className={`hover:bg-gray-200 flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer font-Urbanist font-[600] border-b-[1px] border-[#c9c9c9]`}
                    >
                      <CircleMinus className="size-[17px]" />
                      Clear Chat
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => deteleUser()}
                      className={`hover:bg-gray-200 flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer font-Urbanist font-[600] border-b-[1px] border-[#c9c9c9]`}
                    >
                      <Trash className="size-[17px]" />
                      Remove User
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className={`hover:bg-gray-200 flex gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 cursor-pointer font-Urbanist font-[600]`}
                    >
                      <CircleSlash className="size-[17px]" />
                      Report User
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-6 flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {(() => {
            let lastDateGroup = null;
            return messages.map((msg, index) => {
              const currentDate = new Date(msg.timestamp);
              const currentDateGroup = currentDate.toDateString();

              const daySeparator = formatDaySeparator(msg.timestamp);
              const showSeparator =
                daySeparator && currentDateGroup !== lastDateGroup;
              lastDateGroup = currentDateGroup;

              return (
                <div key={index}>
                  {showSeparator && (
                    <div className="separator-line text-center my-4 text-gray-500 font-semibold text-sm">
                      {daySeparator}
                    </div>
                  )}

                  <div
                    className={`flex ${msg.from === currentUser.id
                        ? "justify-end"
                        : "justify-start"
                      } gap-2 relative`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Fix: Show avatar only if NOT current user */}
                    {msg.from !== currentUser.id && (
                      <img
                        className="w-7 h-7 mt-6 rounded-full"
                        src={
                          chatUser.headshot
                            ? import.meta.env.VITE_IMAGE_KEY + chatUser.headshot
                            : UnkownUser
                        }
                        alt="User"
                      />
                    )}
                    <div
                      className={`relative max-w-[80%] py-3 px-4 border-gray-200 leading-1.5 ${msg.from === currentUser.id
                          ? "bg-[#4880FF] text-white rounded-t-xl rounded-l-xl"
                          : "bg-gray-100 text-gray-900 rounded-t-xl rounded-r-xl"
                        }`}
                    >
                      <p className="text-sm font-[500] font-Urbanist text-[13.5px] break-words whitespace-pre-wrap">
                        {msg.text}
                      </p>

                      {/* Hover time */}
                      {hoveredIndex === index && (
                        <span
                          className={`absolute text-xs text-gray-500 select-none pointer-events-none font-Urbanist w-max ${msg.from === currentUser.id
                              ? "right-full top-[35%] mr-2"
                              : "left-full ml-2"
                            }`}
                        >
                          {currentDate.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={sendMessage}
          className="relative flex items-center gap-5 p-4 border-t border-[#d8d8d8]"
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            placeholder="Type a message..."
            rows={1}
            className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px]
    placeholder:text-[12.5px] sm:placeholder:text-[14px]
    w-full px-4 py-4 rounded-[6px] outline-none resize-none
    overflow-y-auto break-words whitespace-pre-wrap
    xl:h-[48px] !max-h-[180px] leading-[20px]"
          />

          <button
            type="submit"
            className="bg-PurpleColor text-white px-6 sm:px-9 py-2 xl:py-2.5 rounded-[6px] hover:bg-blue-700 text-[14px] sm:text-[17px] font-Urbanist font-[600] transition cursor-pointer"
          >
            Send
          </button>
        </form>

        {isProfileOpen && (
          <>
            {" "}
            <div
              className="absolute flex justify-end items-end inset-0 z-40 overflow-y-auto no-scrollbar w-full bg-[#b4b4b462] transition-opacity duration-500 ease-in-out opacity-100"
              onClick={() => setIsProfileOpen(false)}
            >
              {" "}
              <div
                className="absolute inset-0 z-40 bg-[#b4b4b462] flex justify-end"
                onClick={() => setIsProfileOpen(false)}
              >
                {" "}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={` bg-white shadow-xl sm:max-w-md md:max-w-lg 2xl:max-w-xl w-[90%] sm:w-[50%] min-[380px]:rounded-lg overflow-y-auto no-scrollbar relative transform transition-transform duration-500 ease-in ${isProfileOpen ? "translate-x-0" : "translate-x-full"
                    } `}
                >
                  {" "}
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="absolute top-5 right-5 text-[14px] font-semibold cursor-pointer text-black z-50 hover:text-black bg-[#f0f0f0] rounded-full px-1.5 py-0.5 transform transition-transform duration-1000 ease-in-out"
                  >
                    {" "}
                    ✕{" "}
                  </button>{" "}
                  <div className="bg-gray-100 h-36 flex justify-center items-center relative rounded-t-[10px] cursor-pointer ">
                    {" "}
                    <div className="absolute left-6 bottom-[-40px] w-[105px] h-[105px] bg-gray-300 rounded-full border-4 border-PurpleColor shadow-md overflow-hidden">
                      {" "}
                      <img
                        className="rounded-full w-full h-[120%] object-cover absolute -mt-1.5"
                        src={
                          chatUser.headshot
                            ? import.meta.env.VITE_IMAGE_KEY + chatUser.headshot
                            : UnkownUser
                        }
                        alt=""
                      />{" "}
                    </div>{" "}
                    {chatUser.banner ? (
                      <div className="overflow-hidden h-36">
                        {" "}
                        <img
                          className="object-cover"
                          src={import.meta.env.VITE_IMAGE_KEY + chatUser.banner}
                          alt=""
                        />{" "}
                      </div>
                    ) : (
                      <div className="text-gray-400">📷</div>
                    )}{" "}
                  </div>{" "}
                  {/* Content */}{" "}
                  <div className="px-6 pt-16 pb-6">
                    {" "}
                    <h1 className="font-Urbanist text-[23px] mb-3 font-semibold">
                      {" "}
                      Profile Details{" "}
                    </h1>{" "}
                    <h2 className="text-2xl font-bold font-Urbanist">
                      {" "}
                      {chatUser.first_name + " " + chatUser.last_name}{" "}
                    </h2>{" "}
                    <p className="text-gray-600 font-Urbanist font-[500]">
                      {" "}
                      {chatUser.title}{" "}
                    </p>{" "}
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      {" "}
                      {/* <div className="flex items-center gap-2">
                        {" "}
                        <Phone className="size-5 text-PurpleColor" />{" "}
                        <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                          {" "}
                          {chatUser.phone}{" "}
                        </span>{" "}
                      </div>{" "} */}
                      <div className="flex items-center gap-2">
                        {" "}
                        <Calendar className="size-5 text-PurpleColor" />{" "}
                        <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                          {" "}
                          {formatJoinDate(chatUser.created_at)}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <MapPin className="size-5 text-PurpleColor" />{" "}
                        <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                          {" "}
                          {chatUser.address}{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <DollarSign className="size-5 text-PurpleColor" />{" "}
                        <span className="font-Urbanist font-semibold text-[16px] text-Paracolor">
                          {" "}
                          {chatUser.preferred_investment_range}{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="mt-4 pt-4 border-t border-[#dfdfdf]">
                      {" "}
                      <h3 className="text-[20px] font-bold font-Urbanist">
                        {" "}
                        About Us{" "}
                      </h3>{" "}
                      <p className="text-Paracolor break-all font-Urbanist font-[500] text-[15px] mt-1">
                        {" "}
                        {chatUser.bio}{" "}
                      </p>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h3 className="text-[18px] font-bold mt-3 font-Urbanist">
                        {" "}
                        Property Interests{" "}
                      </h3>{" "}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {" "}
                        {chatUser.property_interests.map((items) => {
                          return (
                            <span className="bg-[#E3E3E3] text-Paracolor font-semibold font-Inter px-3 py-1 text-[12.5px] rounded-full w-max">
                              {" "}
                              {items}{" "}
                            </span>
                          );
                        })}{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </>
        )}
      </div>

      {/* Move this OUTSIDE Dialog */}
      {showReportModal && (
        <ReportUserModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          userId={chatUser.id}
          from="From Chat:"
        />
      )}
    </>
  );
}
