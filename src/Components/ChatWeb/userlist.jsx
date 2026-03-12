  import React, { useEffect, useState } from "react";
  import { getDatabase, ref, onValue } from "firebase/database";
  import TruncatedText from "../TruncatedText/TruncatedText";

  import UnkownUser from "../../assets/fallback/UnknowUser.png";

  export default function UserList({
    users,
    onSelect,
    unreadCounts = {},
    latestMessages = {},
  }) {
    const [onlineUsers, setOnlineUsers] = useState({});

    useEffect(() => {
      const db = getDatabase();
      const onlineRef = ref(db, "onlineUsers");

      const unsubscribe = onValue(onlineRef, (snapshot) => {
        const data = snapshot.val() || {};
        setOnlineUsers(data);
      });

      return () => unsubscribe();
    }, []);

    const sortedUsers = [...users].sort((a, b) => {
      const timeA = latestMessages[a.id] || 0;
      const timeB = latestMessages[b.id] || 0;
      return timeB - timeA;
    });
    

    return (
      
      <div className="w-[96%] sm:w-[35%] md:w-[30%] lg:w-[30%] xl:w-[25%] overflow-auto no-scrollbar">
        <div className="pt-10 sm:pt-7 pb-29 sm:py-10 bg-white rounded-[20px]">
          <h1
            id={"connection"}
            className="font-Urbanist px-6 pb-3 sm:pb-4 text-[#222222] max-[340px]:text-[28px] text-[32px]  sm:text-[23px] font-[700]"
          >
            Connections
          </h1>
          <div className="flex flex-col overflow-auto no-scrollbar h-[55vh] px-1.5">
            {sortedUsers.map((user, index) => {
              const isOnline = onlineUsers[user.id] === true;
              const unread = unreadCounts[user.id] || 0;
              return (
                <button
                  key={index}
                  onClick={() => onSelect(user)}
                  className="flex items-center py-4 pl-4 pr-5 justify-between text-[#222222] border-b border-[#BBBBBB] cursor-pointer group gap-3 hover:bg-[#D1BFFF] outline-none"
                >
                  <div className="flex gap-2.5 items-center">
                    <div className="relative">
                      <img
                        className="h-12 w-12 sm:h-10 sm:w-10 rounded-full object-cover"
                        src={ user.headshot ? import.meta.env.VITE_IMAGE_KEY + user.headshot : UnkownUser}
                        alt=""
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                          isOnline ? "bg-green-500" : "bg-red-600"
                        }`}
                      ></span>
                    </div>
                    <div className="relative flex flex-col ">
                      <h1 className="flex flex-col font-Urbanist text-[#222222] font-[500] mt-1 text-[17px] sm:text-[15px]">
                        <TruncatedText
                          text={user.first_name + " " + user.last_name}
                          maxLength={15}
                        />
                      </h1>
                    </div>
                  </div>

                  <div className="relative ">
                    {unread > 0 && (
                      <span className="absolute -top-2 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-green-500 text-white text-[10px] px-1.5 rounded-full font-semibold font-Inter leading-none">
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
