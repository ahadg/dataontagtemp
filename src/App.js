import React, { useEffect } from "react";
import "./css/App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "react-datetime/css/react-datetime.css";

// Screens
import { loaduser } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Siderbar from "./components/Sidebar";
import DeviceSidebar from "./components/DeviceSidebar";
import Home from "./screens/Home";
import Checkpoint from "./screens/Checkpoint";
import NfcManagment from "./screens/NfcManagment";
import Support from "./screens/Support";
import SupportManagment from "./screens/SupportManagment";
import SmartDevices from "./screens/SmartDevices";
import Companies from "./screens/Companies";
import Download from "./screens/Download";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import UsersManagment from "./screens/UsersManagment";
import RfidManagment from "./screens/RfidManagment";
import RfidInspection from "./screens/RfidInspection";
import UserProfile from "./screens/UserProfile";
import Resetuserinfo from "./screens/Resetuserinfo";
import TaskManagment from "./screens/TaskManagment";
import SyncfusionCalender from "./components/SyncfusionCalender";

import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  //const {apploaded} = useSelector(state => state);
  const apploaded = useSelector((state) => state.generalReducers.apploaded);
  const isAuthenticated = useSelector(
    (state) => state.generalReducers.isAuthenticated
  );
  const user = useSelector((state) => state.generalReducers.user);
  const notifications = useSelector((state) => state.generalReducers.notifications);
  const connectwithsocket = () => {
    //const socket = io.connect(`http://localhost:5000?token=${token}&Id=${uniqueId}`);
    const socket = io.connect(
      `${process.env.REACT_APP_END_URL}?token=${user.token}&usertype=${user.userType}`,
      {
        secure: true,
        reconnection: true,
        reconnectionDelay: 3000,
      }
    );
    dispatch({ type: "UPDATE_WS", payload: socket });
    socket.on("message", function (thedata) {
      console.log("socket_message", thedata);
      if (thedata.type == "rfidevent") {
        dispatch({ type: "RFID_INSPECTION", payload: thedata.message.id });
      } else if (thedata.type == "chat") {
        dispatch({ type: "MESSAGE_UPDATE", payload: thedata });
      } else if (thedata.type == "notification") {
        console.log('notificationss_inside')
        dispatch({ type: "UPDATE_NOTIFICATIONS_SOCKET_UPDATE", payload: {id : thedata.id,type : 'notification',message : thedata.message, createdAt : `${new Date()}`,read: false,details : thedata.details} });
      } else if (thedata.type == "qraccess") {
        console.log('notificationss_inside')
        dispatch({ type: "UPDATE_NOTIFICATIONS_SOCKET_UPDATE", payload: {id : thedata.id,type : 'qraccess',message : thedata.message, createdAt : `${new Date()}`,read: false,details : {senderid : thedata.senderid, touser : thedata.touser}} });
      }
    });
    socket.on("disconnect", () => {
      console.log("socket_diconnected");
      //socket.io.reconnect();
      toast("socket_diconnected.");
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      if (user.token) {
        console.log("got in states", user, isAuthenticated);
        connectwithsocket();
      }
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log("loaduserr");
    const getuser = async () => {
      dispatch(loaduser());
    };
    getuser();
  }, []);
  return (
    <div className="App rel">
      <ToastContainer 
      //autoClose={false} 
      />
      <Toaster />
      {apploaded ? (
        <BrowserRouter>
          {isAuthenticated ? (
            <>
              <Siderbar />
              <DeviceSidebar />
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/checkpoint" component={Checkpoint} />
              <Route exact path="/nfc-managment" component={NfcManagment} />
              <Route exact path="/support" component={Support} />
              <Route exact path="/smartDevices" component={SmartDevices} />
              <Route exact path="/usersManagment" component={UsersManagment} />
              <Route exact path="/RfidManagment" component={RfidManagment} />
              <Route exact path="/RfidInspection" component={RfidInspection} />
              <Route
                exact
                path="/support-managment"
                component={SupportManagment}
              />
              <Route exact path="/task-managment" component={TaskManagment} />
              <Route exact path="/download" component={Download} />
              <Route
                exact
                path="/syncfusion-calender"
                component={SyncfusionCalender}
              />
            </>
          ) : (
            <>
              <Redirect
                to={`${
                  window.location.pathname != "/login" &&
                  window.location.pathname != "/forgot" &&
                  window.location.pathname != "/resetuserinfo"
                    ? "/login"
                    : `${window.location.pathname}${window.location.search}`
                }`}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot" component={ForgotPassword} />
            </>
          )}
          <Route exact path="/resetuserinfo" component={Resetuserinfo} />
        </BrowserRouter>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
