import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import {
  ArrowDownIcon,
  SearchIcon,
  RoundAdd,
  RoundRemoveIcon,
} from "../svg/index";
import axios from "axios";
// import DatePicker from '../components/CustomDatePicker'

const CreateCheckPoint = ({ checklisttype, modify_checlist, setOpen3 }) => {
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [startDate2, setStartDate2] = useState(new Date().getTime());
  const [selection, setSelection] = useState("user");
  const [selection2, setSelection2] = useState(true);
  const [selection3, setSelection3] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const [selectedUser2, setSelectedUser2] = useState([]);
  //const [showList, setShowList] = useState(true);
  const [showList2, setShowList2] = useState(true);
  const [user, setUser] = useState([
    { id: 1, user: "Muddasir Nazir" },
    { id: 2, user: "Ar" },
    { id: 3, user: "Ahad" },
    { id: 4, user: "Abc" },
    { id: 5, user: "Xyz" },
  ]);
  const [groups, setgroups] = useState([]);
  const getadminusersandgroups = async (id) => {
    try {
      let res2 = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getadminusersandgroups`
      );
      console.log(res2);
      setUser(res2.data.users);
      setgroups(res2.data.groups);
      //setloading(false)
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
    //})
  };
  useEffect(() => {
    getadminusersandgroups();
  }, []);
  const [alerts, setAlerts] = useState([
    {
      label: "Notification 1",
      type: "user",
      users: [],
      expiry: "",
    },
  ]);
  const [problemnotifications, setproblemnotifications] = useState([
    {
      //label: "Notification 1",
      type: "user",
      users: [],
      groups: [],
      expiry: "",
      showList: false,
      date: new Date().getTime(),
    },
  ]);
  console.log("problemnotifications", problemnotifications);
  // useEffect(() => {
  //   document.addEventListener("click", () => {
  //     setShowList(false);
  //   });
  // }, []);
  useEffect(() => {
    if (setOpen3) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);
  const [checkName, setcheckName] = useState("");
  const [checkDesc, setcheckDesc] = useState("");
  const [search, setsearch] = useState("");
  const [search2, setsearch2] = useState("");
  console.log("alters....", alerts);
  console.log("selected user...", selectedUser);
  console.log("groups", groups);
  const findindex = (theusers, item) => {
    let index = theusers?.findIndex((item2) => {
      return item2._id == item?._id;
    });
    console.log("index", index);
    return index;
  };
  const checktype = (item) => {
    if (item.type == "user") {
      return user;
    } else if (item.type == "group") {
      return groups;
    }
  };

  return (
    <div className="create-checkpoint flex flex-col">
      <div className="checkpoint-hdr flex flex-col aic">
        <div className="heading s14 font b6">Create CheckPoint</div>
        <div className="text-fields flex aic">
          <div className="hdr-left flex flex-col">
            <div className="lbl s13 font ">Checkpoint Title</div>
            <textarea
              className="txt-title s13 font cleanbtn"
              placeholder="Write Something........"
              onChange={(e) => setcheckName(e.target.value)}
              value={checkName}
            />
          </div>
          <div className="hdr-right flex flex-col">
            <div className="lbl s13 font ">Checkpoint Description</div>
            <textarea
              className="txt-title s13 font cleanbtn"
              placeholder="Write Something........"
              onChange={(e) => setcheckDesc(e.target.value)}
              value={checkDesc}
            />
          </div>
        </div>
      </div>
      <div className="checkpoint-notifi flex flex-col aic">
        <div className="heading s14 font b6">Create Notification</div>
        <div className="add-notifi flex aic">
          {/* <div className="alert-side flex flex-col">
            <div className="notifi-tag s15 b6">Alert Notifications</div>
            {alerts.map((item, index) => (
              <div className="notifi-item flex flex-col">
                <div className="item-lbl s15 font b6">Notification 1</div>
                <div className="select-item flex aic">
                  <div className="radito-select flex je">
                    <div className="c555 s13 b4 font lbl">Individual User</div>
                    <button
                      onClick={(e) =>
                        setAlerts((prevAlerts) => [
                          ...prevAlerts,
                          {
                            type: "user",
                          },
                        ])
                      }
                      className={`cleanbtn radio-btn rel ${
                        item.type === "user" ? "on" : ""
                      }`}
                    />
                  </div>
                  <div className="radito-select flex je">
                    <div className="c555 s13 b4 font lbl">Group</div>
                    <button
                      disabled
                      onClick={(e) =>
                        setAlerts((prevAlerts) => [
                          ...prevAlerts,
                          {
                            type: "group",
                          },
                        ])
                      }
                      className={`cleanbtn radio-btn rel ${
                        item.type === "group" ? "on" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="search-box flex flex-col rel">
                  <div className="txt-box flex aic">
                    <div className="flex aic txt s12 cleanbtn flex-wrap">
                      {selectedUser.map((item, index) => (
                        <div className="flex s12">
                          {item}, {""}
                        </div>
                      ))}
                    </div>
                    <div
                      className="icon flex aic jc pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowList(!showList);
                      }}
                    >
                      <ArrowDownIcon />
                    </div>
                  </div>
                  <div
                    className={`list-box flex flex-col abs ${
                      showList ? "show" : ""
                    }`}
                  >
                    <div
                      className="txt-search flex aic"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        className="txt cleanbtn"
                        onChange={(e) => setsearch(e.target.value)}
                      />
                      <div className="icon flex aic jc">
                        <SearchIcon />
                      </div>
                    </div>
                    <div className="user-list flex flex-col">
                      {user.map((item, index) =>
                        search ? (
                          item.userName.search(search) > -1 && (
                            <div className="list-item flex aic">
                              <div className="name s13 font b5">
                                {item.userName}
                              </div>
                              {selectedUser.includes(item.userName) ? (
                                <div
                                  className="action-ico pointer"
                                  onClick={(e) => {
                                    const index = selectedUser.findIndex(
                                      (item2) => {
                                        return item2 == item.userName;
                                      }
                                    );
                                    console.log("mod_selector", index);
                                    const mod_selector = selectedUser.splice(
                                      index,
                                      1
                                    );
                                    console.log("mod_selector", mod_selector);
                                    console.log("mod_selector", selectedUser);
                                    setSelectedUser([...selectedUser]);
                                  }}
                                >
                                  <div className="action-icon">
                                    <RoundRemoveIcon />
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="action-ico pointer"
                                  onClick={(e) => {
                                    setSelectedUser([
                                      ...selectedUser,
                                      item.userName,
                                    ]);
                                  }}
                                >
                                  <div className="action-icon">
                                    <RoundAdd />
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        ) : (
                          <div className="list-item flex aic">
                            <div className="name s13 font b5">
                              {item.userName}
                            </div>
                            {selectedUser.includes(item.userName) ? (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  const index = selectedUser.findIndex(
                                    (item2) => {
                                      return item2 == item.userName;
                                    }
                                  );
                                  console.log("mod_selector", index);
                                  const mod_selector = selectedUser.splice(
                                    index,
                                    1
                                  );
                                  console.log("mod_selector", mod_selector);
                                  console.log("mod_selector", selectedUser);
                                  setSelectedUser([...selectedUser]);
                                }}
                              >
                                <div className="action-ico">
                                  <RoundRemoveIcon />
                                </div>
                              </div>
                            ) : (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  setSelectedUser([
                                    ...selectedUser,
                                    item.userName,
                                  ]);
                                }}
                              >
                                <div className="action-icon">
                                  <RoundAdd />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="date-picker flex aic jc pointer">
                  <Datetime
                    closeOnSelect={true}
                    value={startDate ? startDate : new Date().getTime()}
                    onChange={(value) => {
                      setStartDate(new Date(value).getTime());
                    }}
                    timeFormat={false}
                    dateFormat="DD-MM-YYYY"
                    className="start-date cleanbtn pointer"
                  />
                  <CalendarTodayIcon className="calender-icon" />
                </div>
              </div>
            ))}
            <div className="action flex aic">
              <button
                className="flex aic jc btn cleanbtn s14 font b4"
                onClick={(e) =>
                  setAlerts([
                    ...alerts,
                    {
                      label: "Notification 1",
                      type: "user",
                      users: [],
                      expiry: "",
                    },
                  ])
                }
              >
                <span className="s22 font b4 ico">+ </span>Add More
              </button>
            </div>
          </div> */}
          <div className="center-line"></div>
          <div className="problem-side flex flex-col">
            <div className="notifi-tag s15 b6">Problem Notifications</div>
            {problemnotifications.map((item, index) => (
              <div className="notifi-item flex flex-col">
                {/* <div className="item-lbl s15 font b6">Notification 1</div> */}
                <div className="select-item flex aic">
                  <div className="radito-select flex je">
                    <div className="c555 s13 b4 font lbl">Individual User</div>
                    <button
                      onClick={(e) => {
                        problemnotifications[index]["type"] = "user";
                        problemnotifications[index]["users"] = [];
                        problemnotifications[index]["groups"] = [];
                        setproblemnotifications([...problemnotifications]);
                      }}
                      className={`cleanbtn radio-btn rel ${
                        item.type === "user" ? "on" : ""
                      }`}
                    />
                  </div>
                  <div className="radito-select flex je">
                    <div className="c555 s13 b4 font lbl">Group</div>
                    <button
                      //disabled
                      onClick={(e) => {
                        problemnotifications[index]["type"] = "group";
                        problemnotifications[index]["users"] = [];
                        problemnotifications[index]["groups"] = [];
                        setproblemnotifications([...problemnotifications]);
                      }}
                      className={`cleanbtn radio-btn rel ${
                        item.type === "group" ? "on" : ""
                      }`}
                    />
                  </div>
                </div>
                {/* Starting */}
                <div className="Options">
                <div className="search-box flex flex-col rel">
                  <div className="txt-box flex aic">
                    <div
                      // type="text"
                      className="flex aic txt s12 cleanbtn flex-wrap"
                      // value={selectedUser}
                    >
                      {item.type == "user"
                        ? problemnotifications[index]["users"].map(
                            (item, index) => (
                              <div className="flex s12">
                                {item.userName}, {""}
                              </div>
                            )
                          )
                        : problemnotifications[index]["groups"].map(
                            (item, index) => (
                              <div className="flex s12">
                                {item.groupname}, {""}
                              </div>
                            )
                          )}
                    </div>
                    <div
                      className="icon flex aic jc pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        problemnotifications[index].showList =
                          !problemnotifications[index].showList;
                        setproblemnotifications([...problemnotifications]);
                      }}
                    >
                      <ArrowDownIcon />
                    </div>
                  </div>
                  <div
                    className={`list-box flex flex-col abs ${
                      problemnotifications[index]["showList"] ? "show" : ""
                    }`}
                  >
                    <div
                      className="txt-search flex aic"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        className="txt cleanbtn"
                        placeholder="Search users"
                        onChange={(e) => setsearch2(e.target.value)}
                      />
                      <div className="icon flex aic jc">
                        <SearchIcon />
                      </div>
                    </div>
                    <div className="user-list flex flex-col">
                      {checktype(item).map((item2, index2) =>
                        search2 ? (
                          item.type == "user" ? (
                            item2?.userName?.search(search2) > -1 && (
                              <div className="list-item flex aic">
                                <div className="name s13 font b5">
                                  {item2?.userName}
                                </div>
                                {findindex(
                                  problemnotifications[index2]?.users,
                                  item2
                                ) > -1 ? (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      const index2 = findindex(
                                        problemnotifications[index]?.users,
                                        item2
                                      );
                                      problemnotifications[index]?.users.splice(
                                        index2,
                                        1
                                      );
                                      setproblemnotifications([
                                        ...problemnotifications,
                                      ]);
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundRemoveIcon />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      problemnotifications[index]["users"] = [
                                        ...problemnotifications[index]?.users,
                                        item2,
                                      ];
                                      setproblemnotifications([
                                        ...problemnotifications,
                                      ]);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundAdd />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          ) : (
                            item?.groupname?.search(search2) > -1 && (
                              <div className="list-item flex aic">
                                <div className="name s13 font b5">
                                  {item?.groupname}
                                </div>
                                {findindex(
                                  problemnotifications[index2]?.groups,
                                  item2
                                ) > -1 ? (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      const index2 = findindex(
                                        problemnotifications[index]?.groups,
                                        item2
                                      );
                                      problemnotifications[
                                        index
                                      ]?.groups.splice(index2, 1);
                                      setproblemnotifications([
                                        ...problemnotifications,
                                      ]);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundRemoveIcon />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      problemnotifications[index]["groups"] = [
                                        ...problemnotifications[index]?.groups,
                                        item2,
                                      ];
                                      setproblemnotifications([
                                        ...problemnotifications,
                                      ]);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundAdd />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          )
                        ) : item.type == "user" ? (
                          <div className="list-item flex aic">
                            <div className="name s13 font b5">
                              {console.log("itetete", item)}
                              {item2?.userName}
                            </div>
                            {findindex(
                              problemnotifications[index]?.users,
                              item2
                            ) > -1 ? (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  const index2 = findindex(
                                    problemnotifications[index]?.users,
                                    item2
                                  );
                                  problemnotifications[index]?.users.splice(
                                    index2,
                                    1
                                  );
                                  setproblemnotifications([
                                    ...problemnotifications,
                                  ]);
                                  e.stopPropagation();
                                }}
                              >
                                <div className="action-icon">
                                  <RoundRemoveIcon />
                                </div>
                              </div>
                            ) : (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  console.log(
                                    "problemnotifications[",
                                    problemnotifications[index]
                                  );
                                  problemnotifications[index]["users"] = [
                                    ...problemnotifications[index]?.users,
                                    item2,
                                  ];
                                  setproblemnotifications([
                                    ...problemnotifications,
                                  ]);
                                  e.stopPropagation();
                                }}
                              >
                                <div className="action-icon">
                                  <RoundAdd />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="list-item flex aic">
                            <div className="name s13 font b5">
                              {item2?.groupname}
                            </div>
                            {findindex(
                              problemnotifications[index]?.groups,
                              item2
                            ) > -1 ? (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const index2 = findindex(
                                    problemnotifications[index]?.groups,
                                    item2
                                  );
                                  problemnotifications[index]?.groups.splice(
                                    index2,
                                    1
                                  );
                                  setproblemnotifications([
                                    ...problemnotifications,
                                  ]);
                                }}
                              >
                                <div className="action-icon">
                                  <RoundRemoveIcon />
                                </div>
                              </div>
                            ) : (
                              <div
                                className="action-ico pointer"
                                onClick={(e) => {
                                  console.log(
                                    "problemnotifications[",
                                    problemnotifications[index]
                                  );
                                  e.stopPropagation();
                                  problemnotifications[index]["groups"] = [
                                    ...problemnotifications[index]?.groups,
                                    item2,
                                  ];
                                  setproblemnotifications([
                                    ...problemnotifications,
                                  ]);
                                }}
                              >
                                <div className="action-icon">
                                  <RoundAdd />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="date-picker flex aic jc pointer">
                  <input
                    type="number"
                    className="txt cleanbtn s14 b4 font h-full w-full"
                    placeholder="Days"
                    onChange={(e) => {
                      problemnotifications[index]["days"] = e.target.value;
                      setproblemnotifications([...problemnotifications]);
                      //setStartDate2(new Date(value).getTime());
                    }}
                    value={problemnotifications[index]["days"]}
                  />
                  {/* <Datetime
                    closeOnSelect={true}
                    value={problemnotifications[index]['date'] ? problemnotifications[index]['date'] : new Date().getTime()}
                    onChange={(value) => {
                      problemnotifications[index]['date'] = new Date(value).getTime() 
                      setproblemnotifications([...problemnotifications]);
                      //setStartDate2(new Date(value).getTime());
                    }}
                    timeFormat={false}
                    dateFormat="DD-MM-YYYY"
                    className="start-date cleanbtn pointer"
                  />
                  <CalendarTodayIcon className="calender-icon" /> */}
                </div>
                {/* Ending */}
                </div>
              </div>
            ))}
            <div className="action flex aic">
              <button
                className="flex aic jc btn cleanbtn s14 font b4"
                onClick={(e) =>
                  setproblemnotifications([
                    ...problemnotifications,
                    {
                      //label: "Notification 1",
                      type: "user",
                      users: [],
                      groups: [],
                      showList: false,
                      expiry: "",
                      date: new Date().getTime(),
                    },
                  ])
                }
              >
                <span className="s22 font b4 ico">+ </span>Add More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="btns-action flex aic">
        <button
          onClick={() => {
            setOpen3(false);
          }}
          className="btn button s14 font b4"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log('the_dataaa',{checklisttype,
              checkName,
              checkDesc,
              startDate,
              problemnotifications})
            let foundemptyuser = false
            let foundemptydaysval = false
            if(!checkDesc || !checkName) {
              return toast.error("Please Input all fields")
            }
            problemnotifications.map((item) => {
              if(item.users.length < 1 && item.groups.length < 1){
                foundemptyuser = true
              }
              else if(!item.days){
                foundemptydaysval = true
              }
            })
            if(foundemptyuser) {
              return toast.error("Please select a user")
            }
            else if(foundemptydaysval) {
              return toast.error("Please Input all fields")
            }
           
            modify_checlist(
              checklisttype,
              checkName,
              checkDesc,
              startDate,
              problemnotifications
            );
            setOpen3(false);
          }}
          className="btn button s14 font b4 cfff"
        >
          Save CheckItem
        </button>
      </div>
    </div>
  );
};

export default CreateCheckPoint;
