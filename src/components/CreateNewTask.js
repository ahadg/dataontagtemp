import React, { useState, useEffect } from "react";
import { ArrowDownIcon, SearchIcon, RoundRemoveIcon, RoundAdd } from "../svg";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
const CreateNewTask = ({userList,companies,controlpoints}) => {
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [selectedCompany, setselectedcompany] = useState();
  const [selecteduser, setselecteduser] = useState();
  const [selectedpriority, setselectedpriority] = useState();
  const [priorities, setpriorities] = useState([
    { id: 1, title: "High" },
    { id: 2, title: "Medium" },
    { id: 3, title: "Low" },
  ]);
  const createtask = async () => {
    const mod_tasklist = selectedcontrolpoints.map((item) => {
      return {
        deviceId : item._id,
        //location : item,
        datetime : Date.now()
      }
    })
    try {
      const res = await axios.post(`${process.env.REACT_APP_END_URL}api/gettasklist`,{
        // assignedTo : selecteduser._id,
        // deviceId,
        // tasksList,
        // from,
        // to,
        // assignedBy : req.user._id,
        // title,
        // priority
      });
      console.log("get_task_response", res.data);
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
  const [showList, setShowList] = useState(true);
  const [selectedcontrolpoints, setselectedcontrolpoints] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    document.addEventListener("click", () => {
      setShowList(false);
    });
  }, []);
  const findindex = (controlp) => {
   let index = selectedcontrolpoints.findIndex((item2) => {
    return item2._id == controlp?._id;
   });
   console.log('index',index)
   return index

  }
  return (
    <div className="create-new-task flex flex-col">
      <div className="task-warp flex flex-col">
        <div className="title">CREATE NEW TASK</div>
        <div className="row flex flex-col">
          <div className="lbl">Task Title</div>
          <input
            type="text"
            className="txt cleanbtn"
            placeholder="Task Title"
          />
        </div>
        <div className="row flex flex-col">
          <div className="lbl">Select Company</div>
          <div className="dropDown flex aic jc flex-col rel">
            <div className="category flex aic">
              <div
                className="cbox cleanbtn flex aic rel"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide(!hide);
                }}
              >
                <div className="slt flex aic">
                  <div className="unit-name flex aic font s14 b4">
                    <span
                      className="unit-eng flex aic font s14 b4"
                      placeholder="Select Company"
                    >
                      {selectedCompany ? selectedCompany.companyName : "Select Company"}
                    </span>
                  </div>
                </div>

                <div>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className={`block flex aic abs ${hide ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {companies.map((item, index) => (
                  <div
                    key={index}
                    className="slt flex aic"
                    onClick={(e) => {
                      setHide(!hide);
                      setselectedcompany(item);
                    }}
                  >
                    <div className="unit-name flex aic font s14 b4">
                      <span className="unit-eng flex aic font s14 b4">
                        {item.companyName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row flex flex-col">
          <div className="lbl">Select User</div>
          <div className="dropDown flex aic jc flex-col rel">
            <div className="category flex aic">
              <div
                className="cbox cleanbtn flex aic rel"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide2(!hide2);
                }}
              >
                <div className="slt flex aic">
                  <div className="unit-name flex aic font s14 b4">
                    <span
                      className="unit-eng flex aic font s14 b4"
                      placeholder="Select User"
                    >
                      {selecteduser ? selecteduser.userName : "Select User"}
                    </span>
                  </div>
                </div>

                <div>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {userList.map((item, index) => (
                  <div
                    key={index}
                    className="slt flex aic"
                    onClick={(e) => {
                      setHide2(!hide2);
                      setselecteduser(item);
                    }}
                  >
                    <div className="unit-name flex aic font s14 b4">
                      <span className="unit-eng flex aic font s14 b4">
                        {item.userName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row flex flex-col">
          <div className="lbl">Select Available ControlPoints</div>
          <div
            className="search-box txt  flex flex-col rel pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowList(!showList);
            }}
          >
            <div className="txt-box flex aic">
              <div
                // type="text"
                className="flex aic txt-b s12 cleanbtn flex-wrap"
                // value={selectedUser}
              >
                {selectedcontrolpoints.map((item, index) => (
                  <div className="flex s12">
                    {item.controlpointname}, {""}
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
              className={`list-box flex flex-col abs ${showList ? "show" : ""}`}
            >
              <div
                className="txt-search flex aic"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  className="txt-s cleanbtn"
                  onChange={(e) => setsearch(e.target.value)}
                />
                <div className="icon flex aic jc">
                  <SearchIcon />
                </div>
              </div>
              <div className="user-list flex flex-col">
                {controlpoints.map((item, index) =>
                  search ? (
                    item.controlpointname.search(search) > -1 && (
                      <div className="list-item flex aic">
                        <div className="name s13 font b5">{item?.controlpointname}</div>
                        {findindex(item) > -1 ? (
                          <div
                            className="action-ico pointer"
                            onClick={(e) => {
                              const index = selectedcontrolpoints.findIndex((item2) => item2._id == item._id)
                              selectedcontrolpoints.splice(index, 1);
                              setselectedcontrolpoints([...selectedcontrolpoints]);
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
                              setselectedcontrolpoints([...selectedcontrolpoints, item]);
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
                      <div className="name s13 font b5">{item?.controlpointname}</div>
                      {findindex(item) > -1 ? (
                        <div
                          className="action-ico pointer"
                          onClick={(e) => {
                            const index = selectedcontrolpoints.findIndex(item2 => item2?._id == item?._id)
                            const mod_selector = selectedcontrolpoints.splice(index, 1);
                            setselectedcontrolpoints([...selectedcontrolpoints]);
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
                            setselectedcontrolpoints([...selectedcontrolpoints, item]);
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
        </div>
        <div className="row flex flex-col">
          <div className="lbl">Priority</div>
          <div className="dropDown flex aic jc flex-col rel">
            <div className="category flex aic">
              <div
                className="cbox cleanbtn flex aic rel"
                onClick={(e) => {
                  e.stopPropagation();
                  setHide4(!hide4);
                }}
              >
                <div className="slt flex aic">
                  <div className="unit-name flex aic font s14 b4">
                    <span
                      className="unit-eng flex aic font s14 b4"
                      placeholder="Priority"
                    >
                      {selectedpriority ? selectedpriority : "Priority"}
                    </span>
                  </div>
                </div>

                <div>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className={`block flex aic abs ${hide4 ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {priorities.map((item, index) => (
                  <div
                    key={index}
                    className="slt flex aic"
                    onClick={(e) => {
                      setHide4(!hide4);
                      setselectedpriority(item.title);
                    }}
                  >
                    <div className="unit-name flex aic font s14 b4">
                      <span className="unit-eng flex aic font s14 b4">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row flex flex-col">
          <div className="title">Start And End Date</div>
          <div className="dates-sec">
            <div className="row flex flex-col">
              <div className="lbl">Start Date</div>
              <div className="date-picker flex aic jc">
                <Datetime
                  closeOnSelect={true}
                  value={endDate ? endDate : new Date().getTime()}
                  onChange={(value) => {
                    setEndDate(new Date(value).getTime());
                  }}
                  timeFormat={false}
                  dateFormat="DD-MM-YYYY"
                  className="start-date cleanbtn"
                />
                <CalendarTodayIcon className="calender-icon" />
              </div>
            </div>
            <div className="row flex flex-col">
              <div className="lbl">End Date</div>
              <div className="date-picker flex aic jc">
                <Datetime
                  closeOnSelect={true}
                  value={endDate ? endDate : new Date().getTime()}
                  onChange={(value) => {
                    setEndDate(new Date(value).getTime());
                  }}
                  timeFormat={false}
                  dateFormat="DD-MM-YYYY"
                  className="start-date cleanbtn"
                />
                <CalendarTodayIcon className="calender-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="actions flex aic">
          <div className="btn button ">Cancle</div>
          <div className="btn button ">Create Task</div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;
