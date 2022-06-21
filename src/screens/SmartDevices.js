import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AddSmartDevice from "../components/AddSmartDevice";
import { ToastContainer, toast } from "react-toastify";
import {
  FamilyTreeIcon,
  ArrowDownIcon,
  FilterIcon,
  SigIcon,
  RoundAdd,
  DeleteIcon,
  EditIcon,
  FireCaylinder,
  CameraIcon,
  SearchIcon,
  HistoryIcon,
} from "../svg";

const SmartDevices = () => {
  const [date, setDate] = useState(new Date().getTime());
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [selectedCompany, setselectedcompany] = useState();
  const [selectedCompany2, setselectedcompany2] = useState();
  const [selectedCompany3, setselectedcompany3] = useState();
  const [statusData, setStatusData] = useState([{ id: 1, title: "Singapore" }]);
  const [statusData2, setStatusData2] = useState([
    { id: 1, title: "West Region" },
  ]);
  const [statusData3, setStatusData3] = useState([
    { id: 1, title: "Jyourong West" },
  ]);
  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
      setHide3(false);
    });
  }, []);
  const dispatch = useDispatch();
  const { showRightbar } = useSelector((state) => state.generalReducers);
  const [devices, setDevices] = useState([]);
  const [loading, setloading] = useState(true);
  const getdevices = async (id) => {
    try {
      setloading(true);
      let res2 = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getdevices`
      );
      console.log(res2);
      setDevices(res2.data.devices);
      setloading(false);
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
    getdevices();
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <div className="smart-devices">
      <Header title="Smart Devices" rightbarIcon="setting" />
      {loading ? (
        <Loader />
      ) : (
        <div className="smart-devices-p flex rel sidebar-gap">
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
                    <div className="dropDown flex aic jc flex-col rel flex-[0.3]">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel pointer"
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
                    {/* Second  */}
                    <div className="dropDown flex aic jc flex-col rel flex-[0.3]">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide3(!hide3);
                          }}
                        >
                          <div className="slt flex aic">
                            <div className="unit-name flex aic font s14 b4">
                              <span
                                className="unit-eng flex aic font s14 b4"
                                placeholder="Creation Date"
                              >
                                {selectedCompany3
                                  ? selectedCompany3
                                  : "Creation Date"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide3 ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {statusData3.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide3(!hide3);
                                setselectedcompany3(item.title);
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
                          type="text"
                          placeholder="Search Tag Id"
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
                  className="cleanbtn add-btn  flex aic"
                  onClick={(e) => {
                    setOpen(true);
                    // document.body.style.overflowY = "hidden";
                    // dispatch({ type: "SHOW_RIGHT_BAR", payload: true });
                    // e.stopPropagation();
                  }}
                >
                  <div className="ico">
                    <RoundAdd />
                  </div>
                  <div className="txt s12 b6 cfff">Add Smart Device</div>
                </button>
              </div>
            </div>
            <div className="devices-block flex">
              {devices.map((item, index) => (
                <div
                  className="device-card flex flex-col pointer"
                  onClick={(e) => {
                    document.body.style.overflowY = "hidden";
                    dispatch({ type: "SHOW_RIGHT_BAR", payload: true });
                    e.stopPropagation();
                  }}
                >
                  <div className="card-header flex">
                    <div className="device-img flex">
                      <img
                        src={`${process.env.REACT_APP_END_URL}${item.image}`}
                        className="img"
                      />
                    </div>
                    <div className="device-name flex jc flex-col">
                      <div className="name s16 font b6">{item.devicename}</div>
                      <div className="id flex aic s12 font">
                        Plug ID : {item.plugid}
                      </div>
                    </div>
                  </div>
                  <div className="device-info flex flex-col">
                    {/* <div className="info-item flex flex-col">
                      <div className="lbl">IP Address</div>
                      <div className="val">{item.ipaddress}</div>
                    </div> */}
                    <div className="info-item flex flex-col">
                      <div className="lbl">Amperes</div>
                      <div className="val">{item.deviceamperes}</div>
                    </div>
                    <div className="info-item flex flex-col">
                      <div className="lbl">Creation Date</div>
                      <div className="val">{`${moment(
                        Number(item.addingdate)
                      ).format("D")}-${moment(Number(item.addingdate)).format(
                        "MM"
                      )}-${moment(Number(item.addingdate)).format(
                        "YYYY"
                      )}`}</div>
                    </div>
                    <div className="info-item flex flex-col">
                      <div className="lbl">Company Name</div>
                      <div className="val">{item.company?.companyName}</div>
                    </div>
                  </div>
                  <div className="action flex aic jc">
                    <div className="btn-edit button flex aic jc">
                      <EditIcon />
                    </div>
                    <button className="btn button cleanbtn cfff  b6 aic jc">
                      <div className="icon flex aic jc">
                        <HistoryIcon />
                      </div>
                      <div className="lbl">Connect Now</div>
                    </button>
                  </div>
                </div>
              ))}
              <div
                onClick={(e) => {
                  setOpen(true);
                }}
                className="add-device-card flex flex-col pointer aic jc"
              >
                <div className="ico">
                  <RoundAdd />
                </div>
                <div className="lbl">Add New Device</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddSmartDevice
          setOpen={setOpen}
          getdevices={getdevices}
          // setloading={setloading}
        />
      </Modal>
    </div>
  );
};

export default SmartDevices;