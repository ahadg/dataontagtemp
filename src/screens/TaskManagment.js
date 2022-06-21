import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Modal from "../components/Modal";
import "react-datetime/css/react-datetime.css";
import CreateNewTask from "../components/CreateNewTask";
import {
  FamilyTreeIcon,
  ArrowDownIcon,
  FilterIcon,
  SigIcon,
  NoteListIcon,
  DeleteIcon,
  EditIcon,
  CloneIcon,
  SearchIcon,
  FireCaylinder,
  CameraIcon,
  ActionIcon,
  CalendarIcon,
} from "../svg";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import Loader from "../components/Loader";
import moment from "moment";
import { fi } from "date-fns/locale";

const TaskManagment = () => {
  const [open, setOpen] = useState(false);

  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedCompany, setselectedcompany] = useState();
  const [selectedtaskstatus, setselectedtaskstatus] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "ExtSup s.r.l." },
    //{ id: 2, title: "YES" },
  ]);
  const [taskfilter, settaskfilter] = useState([
    { id: 1, title: "All" },
    { id: 2, title: "Completed" },
    { id: 3, title: "Uncompleted" },
  ]);
  let percentage = (checked,unchecked) => {
    return Math.floor((checked / unchecked) * 100);
  };
  const [loading, setloading] = useState(true);
  const [orgtasks, setorgtasks] = useState([])
  const [tasks, settasks] = useState([
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
    {
      lbl: "fire extinguishers",
      lbl2: "Assigned to Domenico",
      date: "01 Jan - 07 Feb 2022",
    },
  ]);

  const gettasks = async () => {
    // };
    try {
      const res = await axios.get(`${process.env.REACT_APP_END_URL}api/gettasklist`);
      console.log("get_task_response", res.data);
      settasks(res.data.task);
      setorgtasks(res.data.task)
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

  const [userList,setuserList] = useState([])
  const [companies,setcompanies] = useState([])
  const getusers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getallusers`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setuserList(res.data.users)
        setcompanies(res.data.companies)
      }
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      }
      else {
        return toast.error("Error in server");
      }
    }
  };
  const [controlpoints,setcontrolpoints] = useState([])
  const getcontrolpointlist = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getcontrolpointlist`,
      );
      console.log("response_checks-getcontrolpointlist", res.data);
      if (res.data) {
        setcontrolpoints(res.data.controlpoints)
      }
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      }
      else {
        return toast.error("Error in server");
      }
    }
  };
  const filtertasks = async () => {
    if(selectedtaskstatus == "All") {
      settasks(orgtasks)
    }
    else if (selectedtaskstatus == "Completed"){
      let filtered = orgtasks.filter((item,index) => {
         if(item.unchecked == 0){
           return item
         }else {
           return
         }
      })
      console.log('filtered',filtered)
      settasks(filtered)
    }
    else if (selectedtaskstatus == "Uncompleted"){
      let filtered = orgtasks.filter((item,index) => {
         if(item.unchecked != 0){
          return item
         }
      })
      settasks(filtered)
    }

  }
  useEffect(() => {
    if(!loading){
     filtertasks()
    }
  },[selectedtaskstatus])
  useEffect(() => {
    gettasks();
    getusers()
    getcontrolpointlist()
  }, []);

  return (
    <div className="task-managment-page">
      <Header title="Task Managment" rightbarIcon="setting" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="task-managment-p flex rel sidebar-gap">
          <div className="container flex flex-col">
            <div className="title-blk flex">
              <div className="lit flex aic">
                <div className="filter-sec flex flex-col">
                  <div className="f-head flex aic">
                    <div className="menu-icon">
                      <FilterIcon />
                    </div>
                    <div className="lbl font s18 b5">Filters</div>
                  </div>
                  <div className="f-fields flex aic">
                    {/* First */}
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
                                placeholder="Company Filter"
                              >
                                {selectedCompany
                                  ? selectedCompany
                                  : "Company Filter"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {statusData.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide(!hide);
                                setselectedcompany(item.title);
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
                    {/* Second */}
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
                                placeholder="Completed Tasks"
                              >
                                {selectedtaskstatus
                                  ? selectedtaskstatus
                                  : "Filter Tasks"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide2 ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {taskfilter.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide2(!hide2);
                                setselectedtaskstatus(item.title);
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
                </div>
              </div>
              <div className="rit flex aix">
                <button
                  className="cleanbtn add-btn  flex aic"
                  onClick={(e) => setOpen(true)}
                >
                  <div className="ico">
                    <NoteListIcon />
                  </div>
                  <div className="txt s12 b6 cfff">Create New Task</div>
                </button>
              </div>
            </div>
            <div className="task-blk flex flex-col">
              <div className="tag">All Tasks</div>
              <div className="task-wrap">
                {tasks.map((item, index) => (
                  <div className="task-item flex flex-col">
                    <div className="task-action flex aic">
                      <div className="btns flex aic">
                        <div className="ico-edit flex aic jc">
                          <EditIcon />
                        </div>
                        <div className="ico-del flex aic jc pointer">
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                    <div className="item-blk flex jc flex-col">
                      <div className="hdr flex aic">
                        <img  src={`${process.env.REACT_APP_END_URL}${item?.item?.assignedTo?.image}`} className="img" />
                        <div className="about-user flex flex-col">
                          <div className="tag1">{item?.item?.title}</div>
                          <div className="tag2">Assigned to {item?.item?.assignedTo?.userName}</div>
                        </div>
                      </div>
                      <div className="date-sec flex aic">
                        <div className="date flex aic">
                          <div className="icon">
                            <CalendarIcon />
                          </div>
                          <div className="date-lbl">{moment(item?.item?.from).format('YYYY') == moment(item?.item?.to).format('YYYY') ? moment(item?.item?.from).format('MMM Do') : moment(item?.item?.from).format('MMM Do YYYY')} - {moment(item?.item?.to).format('MMM Do YYYY')}</div>
                          <div className="status flex aic jc">
                            <div className="lbl">{item?.item?.priority}</div>
                          </div>
                        </div>
                      </div>
                      <div className="progress flex flex-col">
                        <div className="hdr-pro flex aic">
                          <div className="lbl">Progress</div>
                          <div className="lbl">{percentage(item.checked,item.unchecked)}%</div>
                        </div>
                        <div className="progress-bar flex">
                          <div
                            className="bar flex aic"
                            style={{ width: `${percentage(item.checked,item.unchecked)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CreateNewTask setOpen={setOpen} userList={userList} companies={companies} controlpoints={controlpoints}/>
      </Modal>
    </div>
  );
};

export default TaskManagment;
