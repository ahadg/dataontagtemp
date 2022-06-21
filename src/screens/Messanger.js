import React, { useState, useEffect, forwardRef, useRef } from "react";
import FlipMove from "react-flip-move";
import { MessengerSendIcon, MessengerFileIcon } from "../svg";
import { ToastContainer, toast } from 'react-toastify';
function Messenger(props) {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Mubashir");
  const [messages, setMessages] = useState([
    {
      username: "johan",
      title: "Calibiration Issue",
      subject: "Calibiration Not Work",
      msg: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took.",
      stemp: "12:12:02",
    },
  ]);

  const dummy = useRef();

  const sendMessages = () => {
    setMessages([
      ...messages,
      { username: username, msg: input, stemp: "12:15:00" },
    ]);
    setInput("");
    dummy.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
      alignToTop: false,
    });
  };

  //console.log(messages)

  /* Messages */
  const Messages = forwardRef(({ message }, ref) => {
    const isUser = message.username === "Mubashir";

    return (
      <div className={`message-blk flex aic amim ${isUser ? "user" : "frd"}`}>
        <div
          ref={ref}
          className={`item flex flex-col ${isUser && "user-item"}`}
        >
          {message.title && (
            <div className="row flex aic">
              <div className="lbl font">Title:</div>
              <div className="txt font">{message.title}</div>
            </div>
          )}
          {message.subject && (
            <div className="row flex aic">
              <div className="lbl font upc">Subject:</div>
              <div className="txt font">{message.subject}</div>
            </div>
          )}
          {message.msg && (
            <div className="msg font s14 c333">{message.msg}</div>
          )}
          {message.stemp && (
            <div className="stemp font s13 flex">{message.stemp}</div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="messenger flex flex-col rel">
      <React.Fragment>
        <div className="wrap flex flex-col">
          <FlipMove>
            {messages.map((data, index) => (
              <Messages key={index} message={data} />
            ))}
          </FlipMove>
          <div ref={dummy}></div>
        </div>
        <div className="msf-ftr flex aic">
          <div className="feild flex aic">
            <button
              onClick={sendMessages}
              className={`cleanbtn btn-file s22 cfff flex aic`}
            >
              <MessengerFileIcon />
            </button>
            <input
              type="text"
              className={`cleanbtn iput _input font s15 c000 anim`}
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessages();
                }
              }}
            />
            <button
              onClick={sendMessages}
              className={`cleanbtn btn-send s22 cfff flex aic`}
            >
              <MessengerSendIcon />
            </button>
          </div>
        </div>
        <div className="cleanftr" />
      </React.Fragment>
    </div>
  );
}

export default Messenger;
