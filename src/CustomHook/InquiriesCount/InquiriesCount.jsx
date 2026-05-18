import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useUnreadMessageCount = (refreshTrigger = 0) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");

  const fetchUnreadMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_KEY}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.conversations) {
        const total = res.data.conversations.reduce((count, conv) => {
          const unreadMsgs = conv.messages.filter((msg) => msg.type === "receive" && !msg.is_read).length;
          return count + unreadMsgs;
        }, 0);

        setUnreadCount(total);
      }
    } catch (err) {
      setUnreadCount(0);
    }
  }, [token]);

  useEffect(() => {
    fetchUnreadMessages();
  }, [fetchUnreadMessages, refreshTrigger]);

  return unreadCount;
};

export default useUnreadMessageCount;
