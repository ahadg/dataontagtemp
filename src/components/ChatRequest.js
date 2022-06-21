import React, { useState, useEffect } from "react";
import { CloseIcon } from "../svg";
import MyStatefulEditor from "./MyStatefulEditor";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const ChatRequest = ({ setOpen,getusermessages }) => {
  const [title,settitle] = useState()
  const [message,setmessage] = useState()
  const {user} = useSelector(state => state.generalReducers)
  const createrequest = async () => {
    console.log("calledd");
    try {
      const res = await axios.post(`${process.env.REACT_APP_END_URL}api/createrequest`,{
        title,
        message,
        senderid : user._id,
        recieverid : user.createdBy
      });
      console.log("get_task_response", res.data);
      getusermessages()
      setOpen(false)
    } catch (error) {
      console.log("error1", error);
      console.log("error", error.response);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
        }
      }
    }
  };
  return (
    <div className="chat-request flex flex-col">
      <div className="chat-wrap flex flex-col">
        <div className="create-chat-hdr flex aic">
          <div className="title flex aic jc">Create A Request</div>
          <div className="icon pointer" onClick={(e) => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="row flex flex-col">
          <div className="tag">Title Of Request</div>
          <input 
          onChange={(e) => settitle(e.target.value)}
          type="text" className="txt" placeholder="Title Of Request" />
        </div>
        <div className="row flex flex-col">
          <div className="tag">Message</div>
          {/* <MyStatefulEditor /> */}
          <textarea 
          onChange={(e) => setmessage(e.target.value)}
          type="text" className="txt" placeholder="Message" />
        </div>
        <div className="action flex aic">
          <div className="btn button">Cancel</div>
          <div 
          onClick={createrequest}
          className="btn button">Send Request</div>
        </div>
      </div>
    </div>
  );
};

export default ChatRequest;
