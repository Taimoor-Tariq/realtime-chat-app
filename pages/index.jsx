import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import MessageContainer from "../components/MessageContainer";

TimeAgo.addDefaultLocale(en);

let socket = io("https://sockets.taimoor.me/");
const timeAgo = new TimeAgo("en-US");

const Page = () => {
  const [user, setUser] = useState({}),
    [message, setMessage] = useState(""),
    [messages, setMessages] = useState([]);

  useEffect(() => {
    const cookie = require("cookie-cutter");

    let saveUser = {
        id: uuidv4(),
        username: `User${Math.floor(Math.random() * 1000) + 100}`,
      },
      oldUserID = cookie.get("userID");

    if (oldUserID)
      setUser({
        id: oldUserID,
        username: cookie.get("userName"),
      });
    else {
      cookie.set("userID", saveUser.id);
      cookie.set("userName", saveUser.username);
      setUser(saveUser);
    }

    socket.on("chat-app-updateMessages", (messagesStore) => {
      setMessages(messagesStore);
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    socket.emit("chat-app-newMsg", {
      sender: user,
      content: message,
      time: new Date(),
    });

    setMessage("");
  }

  return (
    <>
      <div className="h-screen w-screen relative flex">
        <div className="flex flex-col w-5/6 h-5/6 overflow-hidden bg-scheme-secondary text-scheme-dark m-auto shadow-lg shadow-scheme-dark rounded-xl">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((m, key) => {
              return (
                <MessageContainer
                  username={m.sender.username}
                  message={m.content}
                  self={m.sender.id == user.id}
                  time={timeAgo.format(new Date(m.time), "twitter")}
                  key={key}
                />
              );
            })}
          </div>

          <div className="bg-scheme-tertiary p-4">
            <form onSubmit={sendMessage}>
              <input
                className=""
                type="text"
                placeholder="Type your message…"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getInitialProps = async (ctx) => {
  return {
    title: "Chat",
  };
};

export default Page;
