import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BellIcon,
  ArrowDownIcon,
  MenuIcon,
  SettingIcon,
  ChatIcon,
  PLogout,
  PUser,
  Filter2Icon,
  Ball2Icon,
} from "../svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Header = ({ title, hideRightbar, rightbarIcon }) => {
  const dispatch = useDispatch();
  const [notiTab, setNotiTab] = useState("all");
  const [show, setShow] = useState(false);
  //const [notifications, setnotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const {
    showRightbar,
    showSidebar,
    user,
    notifications,
    socket_notification,
  } = useSelector((state) => state.generalReducers);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("dataontag12344H");
    window.location.href = "/login";
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setShow(false);
      setShowNotification(false);
    });
  }, []);
  const getnotifications = async () => {
    try {
      //setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getusernotifications`
      );
      console.log("getnotifications", res.data);
      if (res.data) {
        //setnotifications(res.data.notifcations);
        dispatch({
          type: "UPDATE_NOTIFICATIONS",
          payload: res.data.notifcations,
        });
      }
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      } else {
        return toast.error("Error in server");
      }
    }
  };
  console.log("notificationss", notifications);
  useEffect(() => {
    if (socket_notification) {
      console.log("socket_notification", socket_notification);
      dispatch({
        type: "UPDATE_NOTIFICATIONS",
        payload: [socket_notification, ...notifications],
      });
    }
  }, [socket_notification]);
  const updatereadstatus = async (id) => {
    try {
      //setloading(true);
      await axios.post(`${process.env.REACT_APP_END_URL}api/updatereadstatus`, {
        id,
      });
      let theindex = notifications.findIndex((item) => item._id == id);
      notifications[theindex]["read"] = true;
      //setnotifications([...notifications]);
      dispatch({ type: "UPDATE_NOTIFICATIONS", payload: [...notifications] });
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      } else {
        return toast.error("Error in server");
      }
    }
  };
  useEffect(() => {
    getnotifications();
  }, []);

  return (
    <div className="header sticky flex aic">
      <div className="wrap flex aic">
        <div className="left flex aic">
          <Link to="/" className="logo flex aic">
            <img src="/images/logo-small.svg" className="img" />
          </Link>
          {/* <button
            className="cleanbtn sidebar-menu-ico flex aic"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "SHOW_SIDE_BAR", payload: !showSidebar });
            }}
          >
            <MenuIcon />
          </button> */}
          <div className="title font s22 b6 c000 upc">{title}</div>
        </div>
        <div className="right flex aic">
          <button
            className="cleanbtn bell-ico rel"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotification(!showNotification);
            }}
          >
            <BellIcon />
            {notifications.filter((item) => item.read == false).length == 0 ? (
              ""
            ) : (
              <div className="numb abs s9 cfff flex aic jc b5">
                {notifications.filter((item) => item.read == false).length}
              </div>
            )}
          </button>
          <div
            className={`manue-notifications flex flex-col ${
              showNotification ? "show" : "hide"
            }`}
          >
            <div className="menue-tag">Notifications</div>
            <div className="notification-filter flex aic">
              <div className="left flex aic">
                <div
                  className={`left-tab flex ${
                    notiTab == "all" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotiTab("all");
                  }}
                >
                  All
                </div>
                <div
                  className={`left-tab flex ${
                    notiTab == "Unread" ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotiTab("Unread");
                  }}
                >
                  Unread
                </div>
              </div>
              <div className="right flex aic">
                <Filter2Icon />
              </div>
            </div>
            <div className="notifiaction-list flex flex-col">
              {/* <div className="list-item flex flex-col jc"> */}
              {notifications.map((item) => {
                if (notiTab == "Unread" && item.read == false) {
                  return (
                    <div
                      onClick={() => {
                        console.log("clicked");
                        if (!item.read) {
                          updatereadstatus(item._id);
                        }
                      }}
                      className="list-item flex flex-col jc"
                    >
                      <div className="meta flex flex aic">
                        <div className="le flex aic jc">
                          <div className="icon flex aic jc rel">
                            <div className="ico flex aic jc">
                              <Ball2Icon />
                            </div>
                            <div className="dot"></div>
                          </div>
                        </div>
                        <div className="ri flex flex-col">
                          <div className="ri-tag">{item.message}.</div>
                          <div className="ri-date">
                            {`${moment(item.createdAt).format("D")}-${moment(
                              item.createdAt
                            ).format("MM")}-${moment(item.createdAt).format(
                              "YYYY"
                            )}`}
                            {" at "}
                            {`${moment(item.createdAt).format("HH")}:${moment(
                              item.createdAt
                            ).format("mm")}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (notiTab == "all") {
                  return (
                    <div
                      onClick={() => {
                        if (item?.details?.checkid) {
                          history.push(
                            `/?checkid=${
                              item?.details?.checkid
                            }&random=${Math.random()}`
                          );
                        }
                      }}
                      className="list-item flex flex-col jc"
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="meta flex flex aic"
                      >
                        <div className="le flex aic jc">
                          <div className="icon flex aic jc rel">
                            <div className="ico flex aic jc">
                              <Ball2Icon />
                            </div>
                            {/* <div className="dot"></div> */}
                          </div>
                        </div>
                        <div className="ri flex flex-col">
                          <div className="ri-tag">{item.message}.</div>
                          <div className="ri-date">
                            {`${moment(item.createdAt).format("D")}-${moment(
                              item.createdAt
                            ).format("MM")}-${moment(item.createdAt).format(
                              "YYYY"
                            )}`}
                            {" at "}
                            {`${moment(item.createdAt).format("HH")}:${moment(
                              item.createdAt
                            ).format("mm")}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {/* <div className="meta flex flex aic">
                  <div className="le flex aic jc">
                    <div className="icon flex aic jc rel">
                      <div className="ico flex aic jc">
                        <Ball2Icon />
                      </div>
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="ri flex flex-col">
                    <div className="ri-tag">Domenico Wants Qr Permission.</div>
                    <div className="ri-date">10 Feb 2021 at 22:41</div>
                  </div>
                </div>
                <div className="action flex aic">
                  <div className="btn button">Cancel</div>
                  <div className="btn button">Allow (30s)</div>
                </div>
              </div> */}
              {/* <div className="list-item flex flex-col jc">
                <div className="meta flex flex aic">
                  <div className="le flex aic jc">
                    <div className="icon flex aic jc rel">
                      <div className="ico flex aic jc">
                        <Ball2Icon />
                      </div>
                      <div className="dot"></div>
                    </div>
                  </div>
                  <div className="ri flex flex-col">
                    <div className="ri-tag">Domenico Wants Qr Permission.</div>
                    <div className="ri-date">10 Feb 2021 at 22:41</div>
                  </div>
                </div>
              </ div> */}
              {/* </div> */}
            </div>
          </div>
          <div className="user-img">
            <img
              style={{ borderRadius: "50px" }}
              src={`${process.env.REACT_APP_END_URL}${user.image}`}
              className="img"
            />
          </div>
          <div className="user-name s12 b6">{user.userName}</div>
          <div
            className="menu-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
          >
            <ArrowDownIcon />
          </div>
          <div
            className={`manue-profile flex flex-col ${show ? "show" : "hide"}`}
          >
            <Link to={"/profile"} className="tag flex aic cfff s12 b4 font">
              <PUser /> Profile
            </Link>
            <div
              className="tag flex aic cleanbtn cfff s12 b4 font"
              onClick={(e) => logout()}
            >
              <PLogout /> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
