import React, { useState, useRef, useEffect } from "react";
import TruncatedText from "../../../Components/TruncatedText/TruncatedText";
import UnkownUser from "../../../assets/fallback/UnknowUser.png";
import axios from "axios";
import Spinner from "../../../Components/Spinner/Spinner";
import { ChevronLeft, RotateCcw } from "lucide-react";

const Inquiry = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);

  const [loadingChat, setLoadingChat] = useState(false);

  const token = localStorage.getItem("token");

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.status) {
        const convs = response.data.conversations;

        const unreadMap = {};
        convs.forEach((conv, idx) => {
          const unread = conv.messages.filter(
            (msg) => msg.type === "receive" && msg.is_read === false
          ).length;
          unreadMap[idx] = unread;
        });

        setConversations(convs);
        setUnreadCounts(unreadMap);
      } else {
        setConversations([]);
        setUnreadCounts({});
      }
    } catch (error) {
      setConversations([]);
      setUnreadCounts({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatIndex, conversations]);

  const markMessagesAsRead = async (idx) => {
    setLoadingChat(true);
    const conv = conversations[idx];
    try {
      await axios.post(
        `${import.meta.env.VITE_API_KEY}/messages/mark-as-read`,
        {
          property_id: conv.property.id,
          sender_id: conv.with_user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = [...conversations];
      updated[idx].messages = updated[idx].messages.map((msg) =>
        msg.type === "receive" ? { ...msg, is_read: true } : msg
      );

      setConversations(updated);
      setUnreadCounts((prev) => ({
        ...prev,
        [idx]: 0,
      }));
      setSelectedChatIndex(idx);
    } catch (err) {
    } finally {
      setLoadingChat(false); // Stop loader
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || selectedChatIndex === null) return;

    setSending(true);

    const selectedConversation = conversations[selectedChatIndex];

    const newMessage = {
      user_id: selectedConversation.with_user.id,
      property_id: selectedConversation.property.id,
      property_url: `${window.location.origin}/properties/${selectedConversation.property.id}`,
      message: text.trim(),
      action_url: `${window.location.origin}/admin/inquiry`,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/messages/send`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.status) {
        const updated = [...conversations];
        updated[selectedChatIndex].messages.push({
          id: Date.now(),
          message: text,
          created_at: new Date().toISOString(),
          type: "send",
          is_read: true,
        });
        setConversations(updated);
        setText("");
      }
    } catch (error) {
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex gap-4 md:gap-8 h-[76vh] rounded-[10px] overflow-hidden my-5 2xl:h-[80vh]">
      {/* Left: Conversation List */}
      <div className="w-[100%] mx-3 sm:w-[33%] xl:w-[25%] bg-white flex flex-col rounded-[10px] py-2 ">
        <div className="flex items-center px-6 sm:px-5 justify-between">
          <h1 className="text-[27px] xl:text-3xl font-bold  pt-9 pb-7 text-gray-800">
            Inquiries
          </h1>
          <button onClick={fetchConversations}>
            <RotateCcw className="mt-3 text-red-500 size-5 cursor-pointer" />
          </button>
        </div>
        <div className="flex flex-col overflow-auto no-scrollbar flex-grow px-2 sm:px-0">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500 font-semibold">
              <h1 className="-mt-12">No inquiries found.</h1>
            </div>
          ) : (
            conversations.map((conv, idx) => (
              <button
                key={idx}
                onClick={() => markMessagesAsRead(idx)}
                className={`flex items-center py-3.5 px-4 justify-between text-[#222222] border-b border-[#BBBBBB] cursor-pointer gap-3 hover:bg-[#D1BFFF] outline-none ${
                  selectedChatIndex === idx ? "bg-[#efe9ff]" : ""
                }`}
              >
                <div className="flex gap-2.5 items-center w-full">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={
                      conv.with_user.image
                        ? import.meta.env.VITE_IMAGE_KEY +
                          "/" +
                          conv.with_user.image
                        : UnkownUser
                    }
                    alt="User"
                  />
                  <div className="flex flex-col text-start flex-grow">
                    <h1 className="font-Urbanist text-[#222222] font-[500] text-[15px]">
                      <TruncatedText
                        text={`${conv.with_user.first_name} ${conv.with_user.last_name}`}
                        maxLength={15}
                      />
                    </h1>
                    <p className="text-sm text-gray-500">
                      <TruncatedText text={conv.property.name} maxLength={18} />
                    </p>
                  </div>
                  {(unreadCounts[idx] ?? 0) > 0 && (
                    <span className="min-w-[20px] h-[20px] bg-green-500 text-white rounded-full text-xs font-bold flex items-center justify-center px-1">
                      {unreadCounts[idx]}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right: Chat Window */}
      <div className="flex-1 fixed top-0 left-0 max-[550px]:min-h-screen  sm:relative  flex flex-col justify-between bg-white rounded-[10px]  sm:w-[70%] ">
        {selectedChatIndex === null ? (
          <div className="hidden sm:flex justify-center items-center h-full text-gray-400 font-semibold">
            Select User To Check Inquiry
          </div>
        ) : loadingChat ? (
          <div className="flex justify-center items-center h-full">
            <Spinner style="w-14 h-20 text-PurpleColor z-50" />
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="flex items-center sm:gap-4 px-3 py-4 sm:p-5 border-b border-[#B9B9B9] ">

              <div className="lg:hidden" onClick={()=>(setSelectedChatIndex(null))}>
                <ChevronLeft />
              </div>
              <img
                className="w-11 h-11 ml-1 sm:ml-0 sm:h-13 sm:w-13 rounded-full object-cover border border-[#e6e6e6]"
                src={
                  conversations[selectedChatIndex].with_user.image
                    ? import.meta.env.VITE_IMAGE_KEY +
                      "/" +
                      conversations[selectedChatIndex].with_user.image
                    : UnkownUser
                }
                alt="User"
              />
              <div>
                <h1 className="font-Urbanist font-[600] ml-3 sm:ml-0 text-[#000] text-[17px] sm:text-[19px]">
                  {`${conversations[selectedChatIndex].with_user.first_name} ${conversations[selectedChatIndex].with_user.last_name}`}
                </h1>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 flex flex-col gap-3 overflow-y-auto no-scrollbar relative overflow-hidden">
              {conversations[selectedChatIndex]?.messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "send" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-[80%] py-3 px-4 leading-1.5 break-words whitespace-pre-wrap ${
                      msg.type === "send"
                        ? "bg-[#4880FF] text-white rounded-t-xl rounded-l-xl"
                        : "bg-gray-100 text-gray-900 rounded-t-xl rounded-r-xl"
                    }`}
                  >
                    <p className="text-sm font-[500] font-Urbanist text-[13.5px]">
                      {msg.message}
                    </p>
                    <span
                      className={`block mt-1.5 text-[10px] text-right ${
                        msg.type === "send" ? "text-gray-100" : "text-gray-400"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-5 p-4 border-t border-[#d8d8d8]"
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                placeholder="Type a message..."
                disabled={sending}
                className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] placeholder:text-[12.5px] sm:placeholder:text-[14px] w-full px-4 py-3.5 h-[48px] rounded-[6px] outline-none resize-none max-h-[110px] overflow-hidden break-words whitespace-pre-wrap leading-[20px] disabled:opacity-50 no-scrollbar"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-purple-600 text-white px-7 sm:px-9 py-2.5 rounded-[6px] hover:bg-purple-700 text-[15px] sm:text-[17px] font-Urbanist font-[600] transition cursor-pointer disabled:cursor-not-allowed disabled:bg-purple-400"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Inquiry;
