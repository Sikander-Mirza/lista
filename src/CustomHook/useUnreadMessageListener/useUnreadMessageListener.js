// src/hooks/useUnreadMessageListener.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { setTotalUnreadCount } from "../../Reducers/UnreadCount/UnreadCountSlice";

const useUnreadMessageListener = (currentUser) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;

    const db = getDatabase();
    const messagesRef = ref(db, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const allMens = snapshot.val() || {};
      const counts = {};

      Object.entries(allMens).forEach(([chatId, msgGroup]) => {
        Object.entries(msgGroup).forEach(([msgId, msg]) => {
          if (msg.to === currentUser.id && msg.read === false && msg.from) {
            counts[msg.from] = (counts[msg.from] || 0) + 1;
          }
        });
      });

      const totalUnread = Object.values(counts).reduce((sum, count) => sum + count, 0);
      dispatch(setTotalUnreadCount(totalUnread));
    });

    return () => unsubscribe();
  }, [currentUser, dispatch]);
};

export default useUnreadMessageListener;
