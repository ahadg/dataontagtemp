import React, { useState, useEffect,useRef } from "react";
import { Header, Rightbar } from "../components";
import Modal from "../components/Modal";
import ChatRequest from "../components/ChatRequest";
import {
  MessengerUserIcon,
  MessengerSendIcon,
  MessengerFileIcon,
  AllMailIcon,
  UnReadMailIcon,
  DoubleTickIcon,
  SingleTickIcon,
  SearchIcon,
  SentIcon,
  AttachIcon,
  ImgIcon,
  CnrIcon,
} from "../svg";
import {useSelector} from 'react-redux'
import Messanger from "./Messanger";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
const Users = () => {
  const [admin, setAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const [openDetail, setOpenDetail] = useState(true);
  const [selectedchat, setselectedchat] = useState({});
  const [selectedchatuser, setselectedchatuser] = useState({});
  const [selectedchatuserindex, setselectedchatuserindex] = useState();
  const [selectReq, setSelectReq] = useState("All Requests");
  const [selectReq2, setSelectReq2] = useState("My Requests");
  const [loading,setloading] = useState(true)
  const {user,socket_message} = useSelector(state => state.generalReducers)
  const [filteredchats,setfilteredchats] = useState([])
  const [search,setsearch] = useState('')
  const [masgTypes, setMasgTypes] = useState([
    { lbl: "All Requests", icon: <AllMailIcon />, numb: "28" },
    { lbl: "UnRead Requests", icon: <UnReadMailIcon />, numb: "28" },
    { lbl: "Readed Requests", icon: <DoubleTickIcon />, numb: "" },
    { lbl: "Resolved Issues", icon: <SingleTickIcon />, numb: "" },
  ]);
  const [masgTypes2, setMasgTypes2] = useState([
    { lbl: "My Requests", icon: <AllMailIcon />, numb: "28" },
    { lbl: "My Resolved Issues", icon: <SingleTickIcon />, numb: "" },
  ]);
  console.log('selectReq',selectReq)
  const [usersChat, setUsersChat] = useState([
    {
      name: "Monal Wilden",
      mail: "Monal78646@gmail.com",
      time: "9 Min Ago",
      numb: "5",
      img: "./images/chat_user.png",
      masg: "This is My Request How to Change The Password of an...",
    },
  ]);
  const [resolvedchats,setresolvedchats] = useState([])
  const [message,setmessage] = useState("")
  const sendmessage = async () => {
    usersChat[selectedchatuserindex]['messages'] = [...usersChat[selectedchatuserindex]['messages'],{
    created: Date.now(),
    message: message,
    //unread: true
    user: user._id}]
    let sendto = ''
    console.log('selectedchat.senderid',selectedchat.senderid,user._id)
    if(selectedchat.senderid._id == user._id){
      sendto = selectedchat.recieverid._id
    }
    else {
      sendto = selectedchat.senderid._id
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_END_URL}api/sendmessage`,{
        id : selectedchat._id,
        senderid : user._id,
        message,
        recieverid : sendto
      });
      console.log("get_task_response", res.data);
      // setUsersChat(res.data.chat)
      // setloading(false)
    } catch (error) {
      console.log("error1", error);
      console.log("error", error.response);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
        }
      }
    }
  }
  const [allemessages,setallmessages] = useState([])
  const [filteredmessages,setfilteredmessages] = useState([])
  const getusermessages = async () => {
    console.log("calledd");
    try {
      setloading(true)
      const res = await axios.get(`${process.env.REACT_APP_END_URL}api/getusermessages`);
      console.log("get_task_response", res.data);
      setallmessages(res.data.chat)
      setfilteredmessages(res.data.chat)
      getmessagescount(res.data.chat)
      setloading(false)
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

  const updatechatissuestatus = async (id) => {
    console.log("calledd updatechatissuestatus");
    try {
      //setloading(true)
      await axios.post(`${process.env.REACT_APP_END_URL}api/markasresolved`,{
        id
      });
      getusermessages()
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
        }
      }
    }
  };

  useEffect(() => {
    getusermessages()
  },[])

  const readrequestcount = useRef(0)
  const unreadrequestscount = useRef(0)
  const resolvedissuescount = useRef(0)
  const getmessagescount = (themessages) => {
    themessages.map((item) => {
         if(item.response == true){
          readrequestcount.current = readrequestcount.current + 1
         }
         if(item.response == false){
          unreadrequestscount.current = unreadrequestscount.current + 1
         }
         if(item.resolved == true){
          resolvedissuescount.current = resolvedissuescount.current + 1
         }
      })
  }

  console.log('usersChat',usersChat)
  useEffect(() => {
    if(socket_message){
      let the_index = usersChat.findIndex((item) => item._id == socket_message.chatid)
      console.log('the_index',the_index)
      if(the_index > -1){
      usersChat[the_index]['messages'] = [...usersChat[the_index]['messages'],{
        unread : true,
        created: Date.now(),
        message: socket_message.message,
        //unread: true
        user: socket_message.senderid}]
      console.log('usersChatupdated',usersChat)
      setUsersChat([...usersChat])
    }
    else {
      getusermessages()
    }
  }
  },[socket_message])

  console.log("openDetail", openDetail);

  const UsersChatList = ({data,index,resolved} ) => {
    const [activeChat, setActiveChat] = useState(false);
    console.log('data',data)
    let theuser = data?.recieverid?._id == user._id ? data.senderid : data.recieverid
    console.log('theuser',theuser)
    const findunreadmessages = (messages) => {
     let count = 0
     messages.map((item) => {
       if(item.unread == true) {
         count++
       }
     })
     return count
    }
    return (
      <div
        className={`chat-item flex aic ${activeChat ? "bg" : ""}`}
        onClick={async (e) => {
          setActiveChat(!activeChat);
          setOpenDetail(false);
          if(!data.response){
            await axios.post(`${process.env.REACT_APP_END_URL}api/chatresponded`,{
              id : data._id
            });
          }
          setselectedchat(data)
          setselectedchatuser(theuser)
          setselectedchatuserindex(index)
        }}
      >
        <div className="chat-box-left flex flex-col">
          <div className="about-user flex aic">
          <img  src={`${process.env.REACT_APP_END_URL}${theuser?.image}`} className="usrimg" />
            <div className="user-info flex flex-col">
              <div className="user-name">{theuser?.userName}</div>
              <div className="user-mail">{theuser?.email}</div>
            </div>
          </div>
          <div className="short-masg">{data?.messages[0]?.message}</div>
        </div>
        <div className="chat-box-right flex flex-col">
          <div className="time-lbl">{moment(data?.messages[0]?.created).calendar()}</div>
          {findunreadmessages(data.messages) > 0 && (
            <div className="masg-numb flex aic jc">
              <div className="numb">{findunreadmessages(data.messages)}</div>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Header title="Support Managment" rightbarIcon="support" />
      {loading ? (
        <Loader loader_color={true} />
      ) :
      <div className="support-managment-p flex sidebar-gap">
        {user.userType == "superadmin" || user.userType == "admin" ? (
          <div className="container flex flex-col">
            <div className="chat-container flex">
              <div className="left-box flex flex-col">
                <div className="left-hdr flex aic">
                  <div className="left-tag">Requests</div>
                  <div className="masg-numb flex aic jc">
                    <div className="numb">{allemessages.length}</div>
                  </div>
                </div>
                <div className="lists flex flex-col">
                  {masgTypes.map((item, index) => (
                    <div
                      className={`item flex aic ${
                        selectReq === item?.lbl ? "active" : ""
                      }`}
                      onClick={(e) => {
                        setSelectReq(item?.lbl)
                        //updatemessagesSelected(item?.lbl)
                      }}
                    >
                      <div
                        className={`icon  ${
                          selectReq === item?.lbl ? "active" : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={`lbl  ${
                          selectReq === item?.lbl ? "active" : ""
                        }`}
                      >
                        {item.lbl}
                      </div>
                      {/* {item.numb && ( */}
                        <div className="masg-numb flex aic jc">
                          <div className="numb">{
                          item.lbl == 'All Requests' ? allemessages.length
                          : item.lbl == 'UnRead Requests' ? unreadrequestscount.current
                          : item.lbl == 'Readed Requests' ? readrequestcount.current
                          : item.lbl == 'Resolved Issues' ? resolvedissuescount.current
                          : item.lbl == 'My Requests' ? allemessages.length 
                          : item.lbl == 'My Resolved Issues' ? resolvedissuescount.current
                          : ''
                          }</div>
                        </div>
                      {/* )} */}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`center-box flex flex-col ${
                  openDetail ? "flex-1" : ""
                }`}
              >
                <div className="search-box flex aic">
                  <input
                    type="text"
                    className="txt cleanbtn"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <div className="icon">
                    <SearchIcon />
                  </div>
                </div>
                <div className={`chats-list flex flex-col `}>
                {
                    allemessages?.map((item, index) => {
                      if(selectReq == 'All Requests') {
                        if(search) {
                          if((item.senderid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                      }
                      else if (selectReq == "UnRead Requests" && item.response == false) {
                         if(search) {
                          if((item.senderid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                      } 
                      else if (selectReq == "Readed Requests" && item.response == true) {
                         if(search) {
                          if((item.senderid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                      } 
                      else if (selectReq == "Resolved Issues" && item.resolved == true) {
                         if(search) {
                          if((item.senderid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                    }
                })
              }
                </div>
              </div>
              {openDetail == false && (
                <div className={`right-box flex flex-col`}>
                  <div className={`selected-user-chat flex aic`}>
                    <div className="chat-box-left flex flex-col">
                      <div className="about-user flex aic">
                      <img  src={`${process.env.REACT_APP_END_URL}${selectedchatuser?.image}`} className="usrimg" />
                        <div className="user-info flex flex-col">
                          <div className="user-name">{selectedchatuser?.userName}</div>
                          <div className="user-mail">{selectedchatuser?.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-box-right flex flex-col aic jc">
                      <button 
                      onClick={() => updatechatissuestatus(selectedchat._id)}
                      className="btn button">
                        <div className="icon">
                          <SingleTickIcon />
                        </div>
                        Mark As Resolved
                      </button>
                    </div>
                  </div>
                  <div className="users-chatting flex-col">
                    <div className="chat-date flex aic jc">
                      <div className="date-tag">April 29, 2022</div>
                    </div>
                    <div className="chat-text flex flex-col">
                      {
                        selectedchat.messages.map((item) => {
                          console.log('theuserr',item)
                          if(item.user == user._id){
                           return <div className="sender-side flex">
                           <div className="sender-text flex">
                             {item.message}
                           </div>
                           <div className="sender-time">{moment(item.created).format('h:mm:ss')}</div>
                         </div>
                          }
                          else {
                            return <div className="reciver-side flex">
                            <div className="recive-text flex">
                            {item.message}
                            </div>
                            <div className="recive-time">23:23</div>
                          </div> 
                          }
                        })
                      }
                    </div>
                  </div>
                  <div className="chat-input-box flex aic">
                    <div className="attch flex aic">
                      <div
                        className="ico flex aic jc"
                        onClick={() =>
                          document.getElementById("upload_img").click()
                        }
                      >
                        {!img && <AttachIcon />}
                        <input
                          type="file"
                          accept="*"
                          title=""
                          id="upload_img"
                          className="select-file cleanbtn"
                          onChange={(e) => {
                            let file = e.target.files[0];
                            //setImg(e.target.files[0]);
                            setImg(file);
                          }}
                        />
                        {img && (
                          <img src={URL.createObjectURL(img)} className="img" />
                        )}
                      </div>
                      {/* <div className="ico flex aic jc">
                      <ImgIcon />
                    </div> */}
                    </div>
                    <input
                      type="text"
                      className="txt-box cleanbtn"
                      placeholder="Type a Message"
                    />
                    <div className="btn-sent flex aic jc">
                      <SentIcon />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container flex flex-col">
            <div className="chat-container flex">
              <div className="left-box flex flex-col">
                <div className="left-hdr flex aic">
                  <div className="left-tag">Requests</div>
                  <div className="masg-numb flex aic jc">
                    <div className="numb">28</div>
                  </div>
                </div>
                <div className="lists flex flex-col">
                  {masgTypes2.map((item, index) => (
                    <div
                      className={`item flex aic ${
                        selectReq2 === item?.lbl ? "active" : ""
                      }`}
                      onClick={(e) => setSelectReq2(item?.lbl)}
                    >
                      <div
                        className={`icon  ${
                          selectReq2 === item?.lbl ? "active" : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={`lbl  ${
                          selectReq2 === item?.lbl ? "active" : ""
                        }`}
                      >
                        {item.lbl}
                      </div>
                      {item.numb && (
                        <div className="masg-numb flex aic jc">
                          <div className="numb">{
                             item.lbl == 'My Requests' ? allemessages.length 
                             : item.lbl == 'My Resolved Issues' ? resolvedissuescount.current
                             : ''
                          }</div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="btn button aic jc"
                    onClick={(e) => setOpen(true)}
                  >
                    <div className="icon">
                      <CnrIcon />
                    </div>
                    Create New Request
                  </div>
                </div>
              </div>
              <div
                className={`center-box flex flex-col ${
                  openDetail ? "flex-1" : ""
                }`}
              >
                <div className="search-box flex aic">
                  <input
                    type="text"
                    className="txt cleanbtn"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <div className="icon">
                    <SearchIcon />
                  </div>
                </div>
                <div className={`chats-list flex flex-col `}>
                  {
                     allemessages?.map((item, index) => {
                      if(selectReq2 == 'My Requests') {
                        if(search) {
                          if((item.recieverid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                      }
                      else if (selectReq2 == "My Resolved Issues" && item.resolved == true) {
                         if(search) {
                          if((item.recieverid?.userName).toLowerCase().search(search.toLowerCase()) > -1){
                            return <UsersChatList data={item} index={index}/>
                          }
                        } else {
                          return <UsersChatList data={item} index={index}/>
                        }
                      } 
                    })
                  }
                </div>
              </div>
              {openDetail == false && (
                <div className={`right-box flex flex-col`}>
                  <div className={`selected-user-chat flex aic`}>
                    <div className="chat-box-left flex flex-col">
                      <div className="about-user flex aic">
                      <img  src={`${process.env.REACT_APP_END_URL}${selectedchatuser?.image}`} className="usrimg" />
                        <div className="user-info flex flex-col">
                          <div className="user-name">{selectedchatuser?.userName}</div>
                          <div className="user-mail">{selectedchatuser?.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-box-right flex flex-col aic jc">
                      <button 
                      onClick={() => updatechatissuestatus(selectedchat._id)}
                      className="btn button">
                        <div className="icon">
                          <SingleTickIcon />
                        </div>
                        Mark As Resolved
                      </button>
                    </div>
                  </div>
                  <div className="users-chatting flex-col">
                    <div className="chat-date flex aic jc">
                      <div className="date-tag">April 29, 2022</div>
                    </div>
                    <div className="chat-text flex flex-col">
                      {
                        selectedchat.messages.map((item) => {
                          console.log('theuserr',item)
                          if(item.user == user._id){
                           return <div className="sender-side flex">
                           <div className="sender-text flex">
                             {item.message}
                           </div>
                           <div className="sender-time">{moment(item.created).format('h:mm:ss')}</div>
                         </div>
                          }
                          else {
                            return <div className="reciver-side flex">
                            <div className="recive-text flex">
                            {item.message}
                            </div>
                            <div className="recive-time">23:23</div>
                          </div> 
                          }
                        })
                      }
                      {/* <div className="sender-side flex">
                        <div className="sender-text flex">
                          This is My Request How to Change The Password of an...
                        </div>
                        <div className="sender-time">23:23</div>
                      </div>
                      <div className="reciver-side flex">
                        <div className="recive-text flex">
                          Let Me Allow 15 min to resolve your Issue Please Wait
                          a While.
                        </div>
                        <div className="recive-time">23:23</div>
                      </div> */}
                    </div>
                  </div>
                  {
                  selectReq2 == "My Requests"
                  &&
                  <div className="chat-input-box flex aic">
                    <div className="attch flex aic">
                      <div
                        className="ico flex aic jc"
                        onClick={() =>
                          document.getElementById("upload_img").click()
                        }
                      >
                        {!img && <AttachIcon />}
                        <input
                          type="file"
                          accept="*"
                          title=""
                          id="upload_img"
                          className="select-file cleanbtn"
                          onChange={(e) => {
                            let file = e.target.files[0];
                            //setImg(e.target.files[0]);
                            setImg(file);
                          }}
                        />
                        {img && (
                          <img src={URL.createObjectURL(img)} className="img" />
                        )}
                      </div>
                      {/* <div className="ico flex aic jc">
                      <ImgIcon />
                    </div> */}
                    </div>
                    <input
                      type="text"
                      className="txt-box cleanbtn"
                      placeholder="Type a Message"
                      onChange={(e) => {
                          setmessage(e.target.value)
                      }}
                    />
                    <div 
                    onClick={sendmessage}
                    className="btn-sent flex aic jc">
                      <SentIcon />
                    </div>
                  </div>
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      }
      <Modal open={open} onClose={() => setOpen(false)}>
        <ChatRequest setOpen={setOpen} getusermessages={getusermessages}/>
      </Modal>
    </>
  );
};

export default Users;
