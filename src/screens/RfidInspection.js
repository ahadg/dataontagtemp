import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Modal from "../components/Modal";
import "react-datetime/css/react-datetime.css";
import {
  FamilyTreeIcon,
  MultiUserIcon,
  ArrowDownIcon,
  FilterIcon,
  SigIcon,
  RoundAdd,
  DeleteIcon,
  EditIcon,
  CloneIcon,
  SearchIcon,
  FireCaylinder,
  CameraIcon,
  ActionIcon,
} from "../svg";

import axios from "axios";
import Loader from "../components/Loader";
import moment from "moment";
import CustomDateRangeInputs from "../components/CustomDateRangeInputs";
import InspectionInfo from "../components/InspectionInfo";
import { useDispatch, useSelector } from "react-redux"; 
import momenttz from 'moment-timezone'
import { ToastContainer, toast } from 'react-toastify';

const RfidInspection = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedCompany, setselectedcompany] = useState();
  const [selectedOption, setselectedOption] = useState( { id: 1, title: "Real-time" },);
  const [Filteroption, setFilteroption] = useState([
    { id: 1, title: "Real-time" },
    { id: 2, title: "History" },
  ]);
  const _dipatch = useDispatch()
  const [value, setValue] = useState([null, null]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(undefined);
  const [inspection, setinspection] = useState([]);
  const [mod_inspection, setmod_inspection] = useState([]);
  const [companies,setcompanies] = useState([])
  const {socket,rfid,user} = useSelector((state) => state.generalReducers);
  const {rfidinspectionrealtime} = useSelector((state) => state.rfidReducers);
  const [userlist,setuserlist] = useState([])
  const [rfidlist,setrfidlist] = useState([])
  // const [rfidinspectionrealtime,setrfidinspectionrealtime] = useState([])
  const [rfidremoveid,setrfidremoveid] = useState('')
  console.log('list',userlist)
  //console.log('list',rfidlist)
  console.log('list_rfidinspection',rfidinspectionrealtime)
  const [selectedinspection,setselectedinspection] = useState({})

  const getInspection = async () => {
    try {
      setloading(true)
      let date = "";
      if (value) {
        if (!value.includes(null)) {
          date = value;
        }
      }
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/getrfidinspection`,
        {
          date,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setinspection(res.data.inspections);
        setmod_inspection(res.data.inspections)
        setloading(false);
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
  const updaterealtime = async (rfid) => {
    console.log('callled',rfid)
    console.log('callled',typeof(rfid))
    _dipatch({
      type : "RFID_INSPECTION_REAL_TIME_UPDATE",
      payload : rfid
    })
  }

  const removerealtime = async (rfid) => {
    _dipatch({
      type : "RFID_INSPECTION_REAL_TIME_REMOVE",
      payload : rfid
    })
  }

  const getusers = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getallusers`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setloading(false);
        setuserlist(res.data.users)
        setcompanies(res.data.companies)
        _dipatch({
          type : "USER_LIST_UPDATE",
          payload : res.data.users
        })
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

  

  useEffect(() => {
    getInspection();
    //getusercompanies()
    //getrfids()
    getusers()
  }, []);
  useEffect(() => {
    if(rfid){
      updaterealtime(rfid);
      setTimeout(() => {
        removerealtime(rfid)
      },100000)
    }
    // if(userList.length > 0){
    // setTimeout(() => {
    //   updaterealtime('E2806995000040009170B1E3')
    //   updaterealtime("E28069950000400091240845")
    // }, 5000);
    // setTimeout(() => {
    //   removerealtime('E2806995000040009170B1E3')
    // }, 10000);
    // setTimeout(() => {
    //   removerealtime('E28069950000400091240845')
    // }, 15000);
    // }
  }, [rfid]);
  useEffect(() => {
    if (value) {
      if (!value.includes(null)) {
        setloading(true);
        getInspection();
      }
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);

  const getdevicesnames  = (arr) => {
     let names = ""
     arr.map((item,index) => {
       names += index ? `,${item?.deviceRef?.deviceName}` : `${item?.deviceRef?.deviceName}`
     })
     return names
  }
  const getdetecteddevicesnames  = (arr) => {
    let names = ""
    arr.map((item,index) => {
      if(item.detected){
      names += index ? `,${item?.deviceRef?.deviceName}` : `${item?.deviceRef?.deviceName}`
      }
    })
    return names
 }

 useEffect(() => {
  if(search == "" || search == " "){
    setmod_inspection([...inspection])
  }
  else if (search != undefined) {
    const searchedids = mod_inspection.filter((item) => {
      if (
        item.userRef?.userName?.search(search) > -1 
      ) {
        return true;
      }
    });
    setmod_inspection([...searchedids]);
  }
}, [search]);

  return (
    <div className="users-page">
      <Header title="RFID Inspections" rightbarIcon="setting" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="users-management-p flex rel sidebar-gap">
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
                    {
                    user.userType == "superadmin"
                      &&
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
                                  ? selectedCompany.companyName
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
                                  {item?.companyName}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    }
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
                                placeholder="Historic Data"
                              >
                                {selectedOption
                                  ? selectedOption.title
                                  : "Historic Data"}
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
                          {Filteroption.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide2(!hide2);
                                setselectedOption(item);
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
                    {/* Search Box */}
                    <div className="search-by flex">
                      <div className="search-box flex aic">
                        <input
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                          type="text"
                          placeholder="Search User"
                          className="txt cleanbtn s16"
                        />
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rit flex aix">
                <div className="date-selector flex">
                  <CustomDateRangeInputs value={value} setValue={setValue} />
                </div>
              </div>
            </div>
            <div className="table-sec flex flex-col">
              <div className="tbl-row flex aic">
                <div className="row-item">
                  <FilterIcon />
                </div>
                <div className="row-item">User Name</div>
                <div className="row-item">Company Name</div>
                <div className="row-item">Assigned Devices</div>
                <div className="row-item">Detected</div>
                <div className="row-item">Date & Time</div>
                <div className="row-item flex aic jc">Action</div>
              </div>
              { selectedOption.title == "Real-time" ?  
              rfidinspectionrealtime.map((item, index) => (
                <div className="tbl-row flex aic" key={index}>
                  <div className="row-item">
                    <div className="ico-bg flex aic jc">
                    <img style={{borderRadius : '50px'}}  src={`${process.env.REACT_APP_END_URL}${item?.userRef.image}`} className="img" />
                    </div>
                  </div>
                  <div className="row-item font">{item?.userRef?.userName}</div>
                  <div className="row-item font">{item?.userCreatedBy?.companyName}</div>
                  <div className="row-item font">{getdevicesnames(item?.detectedDevices)}</div>
                  <div className="row-item font">{getdetecteddevicesnames(item?.detectedDevices)}</div>
                  <div className="row-item font">{`${moment(
                       item.createdAt
                      ).format("D")}-${moment(item.createdAt).format(
                        "MM"
                      )}-${moment(item.createdAt).format(
                        "YYYY"
                      )}  ${moment(item.createdAt).format(
                        "h:mm:ss"
                      )}`}</div>
                  <div className="row-item  flex aic jc">
                    <div
                      className="ico-del pointer flex aic jc"
                      onClick={(e) => {
                        setselectedinspection(item)
                        setOpen(true)
                      }}
                    >
                      <ActionIcon />
                    </div>
                    {/* <div className="icon-del flex aic">
                      <DeleteIcon />
                    </div> */}
                  </div>
                </div>
              ))
              : 
              mod_inspection.map((item, index) => (
                <div className="tbl-row flex aic" key={index}>
                  <div className="row-item">
                    <div className="ico-bg flex aic jc">
                    <img style={{borderRadius : '50px'}}  src={`${process.env.REACT_APP_END_URL}${item?.userRef.image}`} className="img" />
                    </div>
                  </div>
                  <div className="row-item font">{item?.userRef?.userName}</div>
                  <div className="row-item font">{item?.userCreatedBy?.companyName}</div>
                  <div className="row-item font">{getdevicesnames(item?.detectedDevices)}</div>
                  <div className="row-item font">{getdetecteddevicesnames(item?.detectedDevices)}</div>
                  <div className="row-item font">{`${moment(
                       item.createdAt
                      ).format("D")}-${moment(item.createdAt).format(
                        "MM"
                      )}-${moment(item.createdAt).format(
                        "YYYY"
                      )}  ${moment(item.createdAt).format(
                        "h:mm:ss"
                      )}`}</div>
                  <div className="row-item  flex aic jc">
                    <div
                      className="ico-del pointer flex aic jc"
                      onClick={(e) => {
                        setselectedinspection(item)
                        setOpen(true)
                      }}
                    >
                      <ActionIcon />
                    </div>
                    {/* <div className="icon-del flex aic">
                      <DeleteIcon />
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <InspectionInfo setOpen={setOpen} selectedinspection={selectedinspection}/>
      </Modal>
    </div>
  );
};

export default RfidInspection;
