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
  RifdManageIcon,
} from "../svg";

import axios from "axios";
import Loader from "../components/Loader";
import moment from "moment";
import CustomDateRangeInputs from "../components/CustomDateRangeInputs";
import AddNewRfid from "../components/AddNewRfid";
import EditRfid from "../components/EditRfid";
import AssignRFID from "../components/AssignRFID";
import { useDispatch, useSelector } from "react-redux"; 
import { ToastContainer, toast } from 'react-toastify';
const RfidManagment = () => {
  const [open, setOpen] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [rfidlist, setrfidlist] = useState([]);
  const [filteredrfidlist, setfilteredrfidlist] = useState([]);
  const [selectedCompany, setselectedcompany] = useState();
  const [selectedCompany2, setselectedcompany2] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "History" },
    { id: 2, title: "Realtime" },
  ]);
  const {socket,rfid} = useSelector((state) => state.generalReducers);
  const [companyfilter, setcompanyfilter] = useState([]);
  const [itemtobemodified,setrfidtobemodified] = useState({})
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(undefined);

  const [userList,setuserList] = useState([
    {
      img: "./images/user55.png",
      name: "Muddasir Nazir",
      copmany: "Newbiz.srl",
      mail: "muddasirnazir92@gmail.com",
      numb: "+92 306 9089531",
      Role: "Super Admin",
    }
  ])

  useEffect(() => {
    if(search == "" || search == " "){
      setfilteredrfidlist([...rfidlist])
    }
    else if (search != undefined) {
      const searchedids = rfidlist.filter((item) => {
        if (
          item.deviceName.search(search) > -1
        ) {
          return true;
        }
      });
      setfilteredrfidlist([...searchedids]);
    }
  }, [search]);

  const getusers = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getallusers`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
        // setfamilies(res.data.families);
        // setOpen(false);
        setloading(false);
        setuserList(res.data.users)
        // setfilteruserList(res.data.users)
        setcompanyfilter(res.data.companies)
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

  const getrfids = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getrfids`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
       setrfidlist(res.data.rfids)
       setloading(false);
       setfilteredrfidlist(res.data.rfids)
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
  const [deleteloading, setdeleteloading] = useState(false);
  const [rfidtobedelete, setrfidtobedelete] = useState({});
  const deleteuser = async (id) => {
    try {
      setdeleteloading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_END_URL}api/deleterfid/${rfidtobedelete._id}`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        getrfids();
        setdeleteloading(false);
        setOpen3(false);
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

  
  const Confirm = () => {
    return (
      <>
        <div className="confirm-delte flex aic flex-col">
          {deleteloading ? (
            <Loader />
          ) : (
            <>
              <div className="heading-tag flex aic jc s16 font b6">
                <div>Delete RFID</div>
              </div>
              <div className="desc flex aic jc s14 font b5">
                Do You Want To Delete RFID?
              </div>
              <div className="actions-row flex aic">
                <button
                  className="btn-cancle button cleanbtn"
                  onClick={(e) => setOpen3(false)}
                >
                  No! Cancel
                </button>
                <button
                  onClick={() => deleteuser()}
                  className="btn-create button cleanbtn"
                >
                  Yes! Delete
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    getusers()
    getrfids()
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);

  return (
    <div className="users-page">
      <Header title="RFID Managment" rightbarIcon="setting" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="rfid-management-p flex rel sidebar-gap">
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
                                  ? selectedCompany.title
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
                                setselectedcompany(item);
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
                    {/* <div className="dropDown flex aic jc flex-col rel">
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
                                placeholder="RFID"
                              >
                                {selectedCompany2
                                  ? selectedCompany2.title
                                  : "RFID"}
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
                          {statusData.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide2(!hide2);
                                setselectedcompany2(item);
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
                    </div> */}
                    {/* Search Box */}
                    <div className="search-by flex">
                      <div className="search-box flex aic">
                        <input
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                          type="text"
                          placeholder="Search RFID"
                          className="txt cleanbtn s16"
                        />
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rit flex aix">
                <button
                  className="cleanbtn creat-btn  flex aic"
                  onClick={(e) => setOpen2(true)}
                >
                  <div className="ico">
                    <MultiUserIcon />
                  </div>
                  <div className="txt s12 b6 cfff">Assign RFID To User</div>
                </button>
                <button
                  className="cleanbtn add-btn  flex aic"
                  onClick={(e) => setOpen(true)}
                >
                  <div className="ico">
                    <RifdManageIcon />
                  </div>
                  <div className="txt s12 b6 cfff">Create New RFID</div>
                </button>
              </div>
            </div>
            <div className="table-sec flex flex-col">
              <div className="tbl-row flex aic">
                <div className="row-item">
                  <FilterIcon />
                </div>
                <div className="row-item">Name</div>
                <div className="row-item">RFID</div>
                <div className="row-item">Assign to</div>
                <div className="row-item">Company Name</div>
                <div className="row-item">Manufacturing</div>
                <div className="row-item">Expiry</div>
                <div className="row-item flex aic jc">Action</div>
              </div>
              {filteredrfidlist.map((item, index) => (
                <div className="tbl-row flex aic" key={index}>
                  <div className="row-item">
                    <div className="ico-bg flex aic jc">
                    <img  
                    style={{borderRadius : '50px'}}
                    src={`${process.env.REACT_APP_END_URL}${item.image}`} className="img" />
                    </div>
                  </div>
                  <div className="row-item font">{item.deviceName}</div>
                  <div className="row-item font">{item.rfid}</div>
                  <div className="row-item font">{item.assignedTo?.userName ? item.assignedTo?.userName : "Not assigned yet"}</div>
                  <div className="row-item font">{item.companyRef?.companyName}</div>
                  <div className="row-item font">{item.manufacturingdate}</div>
                  <div className="row-item font">{item.expirydate}</div>
                  <div className="row-item font flex aic jc">
                    <div 
                      onClick={() => {
                        setOpen4(true)
                        setrfidtobemodified(item)
                      }}
                    className="ico-edit pointer flex aic jc">
                      <EditIcon />
                    </div>
                    <div 
                    onClick={() => {
                      setOpen3(true)
                      setrfidtobedelete(item)
                    }}
                    className="icon-del flex aic">
                      <DeleteIcon />
                    </div>
                    <div className="icon-del flex aic">
                      <ActionIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={open3} onClose={() => setOpen3(false)}>
        <Confirm />
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNewRfid setOpen={setOpen} getrfids={getrfids} companyfilter={companyfilter}/>
      </Modal>

      <Modal open={open4} onClose={() => setOpen4(false)}>
        <EditRfid setOpen={setOpen4} getrfids={getrfids} companyfilter={companyfilter} itemtobemodified={itemtobemodified}/>
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)}>
        <AssignRFID setOpen2={setOpen2} userList={userList} rfidlist={rfidlist} getrfids={getrfids}/>
      </Modal>
    </div>
  );
};

export default RfidManagment;
