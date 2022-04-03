import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ContactIcon from "../components/ContactIcon";
import ContactHero from "../components/ContactHero";
import ContactSlideSection from "../components/ContactSlideSection";
import { ContactSection } from "../context/ContactSection";
import Footer from "../components/Footer";
import CommentIcon from "@mui/icons-material/Comment";

const colors = [
  { color: "placeholder-red-500" },
  { color: "placeholder-amber-500" },
  { color: "placeholder-lime-500" },
  { color: "placeholder-teal-500" },
  { color: "placeholder-sky-500" },
  { color: "placeholder-purple-500" },
  { color: "placeholder-rose-500" },
];

const randomizeColor = () => {
  const idx = Math.floor(Math.random() * colors.length);
  return colors[idx].color;
};

function contact() {
  const [section, setSection] = useState("");
  const [username, setUsername] = useState("");
  const [begin, setBegin] = useState(false);
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [ws, setWs] = useState(undefined);
  const msg = `${username} : ${chat}`;

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    // OPEN
    socket.onopen = () => {
      console.log("Successfully Connected");
      console.log("Hi From The Client");
    };

    // RECIEVING DATA
    socket.onmessage = (data) => {
      console.log(data.data);
      const message = { chat: data.data };
      setChats((chat) => [...chat, message]);
    };

    // CLOSED
    socket.onclose = (event) => {
      console.log("Socket Closed Connection: ", event);
      socket.send("Client Closed!");
    };

    socket.onerror = (error) => {
      console.log("Socket Error: ", error);
    };

    setWs(socket);
  }, []);

  const makeRequest = () => {
    ws.send(msg);
  };

  const initiateChat = () => {
    setBegin(true);
  };

  // useEffect(() => {
  //   makeRequest();
  // }, []);

  return (
    <ContactSection.Provider value={{ section, setSection }}>
      <Navbar />
      <ContactHero />
      <div className="flex justify-center bottom-[30px] relative">
        <ContactIcon />
      </div>
      {/* <ContactSlideSection /> */}

      <div className="bg-black w-full h-[800px] mt-16">
        {/* TITLE */}
        <div className="flex justify-center top-4 relative">
          <h1 className="text-white md:text-6xl text-3xl">Fabrzy Chat Room</h1>
        </div>

        {/* CHAT BODY */}
        <div className="flex justify-center w-full h-[80%] relative">
          <div className="bg-white w-[90%] h-[100%] top-12 relative flex flex-col justify-end">
            <div
              className={`absolute z-10 h-full w-full bg-white flex flex-col justify-center items-center gap-10 ${
                begin ? "hidden" : "block"
              }`}
            >
              <CommentIcon className="h-[200px] w-[200px] animate-bounce" />
              <button
                className="bg-black w-[100px] text-white h-[30px] hover:scale-125 transition-all duration-300 ease-in-out"
                onClick={initiateChat}
              >
                Connect
              </button>
            </div>
            {/* OUTPUT */}
            <div className="w-[100%] h-[100%] bg-emerald-300 flex flex-col overflow-y-scroll justify-end my-4">
              {chats.map((chat) => {
                return (
                  <input
                    placeholder={chat.chat}
                    className={`h-10 ${randomizeColor()} bg-white outline-none my-4 inline rounded-full px-4 py-3 mx-5`}
                    disabled
                  />
                );
              })}
            </div>
            {/* USERNAME */}
            <label
              htmlFor="username"
              className="md:text-[30px] text-[20px] text-center"
            >
              Username
            </label>
            <input
              name="username"
              className="h-10 outline w-[100%] px-20 text-center hover:bg-emerald-500"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />

            {/* CHAT */}
            <label
              htmlFor="chat"
              className="md:text-[30px] text-[20px] text-center"
            >
              Chat
            </label>
            <input
              name="chat"
              className="h-10 outline text-center mb-10 hover:bg-emerald-500"
              onChange={(e) => setChat(e.currentTarget.value)}
            />

            {/* SEND BUTTON */}
            <button
              className="bg-green-600 text-center relative ml-auto mr-auto hover:scale-125 duration-300 transition-all ease-in-out bottom-5 text-white py-3 px-5 rounded-full hover:scale-125 duration-300 transition-all"
              onClick={makeRequest}
            >
              SEND
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </ContactSection.Provider>
  );
}

export default contact;
