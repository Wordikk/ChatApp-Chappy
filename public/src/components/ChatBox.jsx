import React, { useEffect, useRef, useState } from "react";
import ChatBoxContainer from "../pages/containers/ChatBoxContainer";
import Logout from "./logoutbuttons/Logout";
import axios from "axios";
import { ChatInput } from "./index";
import { sendMessageRoute, getMessagesRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

const ChatBox = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData().catch(console.error);
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log({ msg });
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavoiur: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <ChatBoxContainer>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data: image/svg+xml;base64, ${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            ;
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </ChatBoxContainer>
      )}
    </>
  );
};

export default ChatBox;
