import React, { useState, useEffect } from "react";
import { Header, Rightbar } from "../components";
import Dialog from "@mui/material/Dialog";
import Lottie from "react-lottie";
import LoadPage from "../components/LoadPage.json";

import {
  FilterIcon,
  ArrowDownIcon,
  SigIcon,
  CloseIcon,
  CloseSmall,
  CheckSmall,
  DownloadIcon,
  ActionIcon,
  LogoutIcon,
} from "../svg";

import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import CustomDateRangeInputs from "../components/CustomDateRangeInputs";
import ControlPointInfo from "../components/ControlPointInfo";
// import CheckPointStatus from "../components/CheckPointStatus";
// import DownloadImg from "../components/DownloadImg";
import { ToastContainer, toast } from "react-toastify";
const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadPage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [selectedState4, setSelectedState4] = useState();
  const [companies, setcompanies] = useState([]);
  const [selectedcompany, setselectedcompany] = useState("");
  const [buildings, setbuildings] = useState([]);
  // const [allbuildings,setallbuilding] = useState('')
  // const [allbuildings,setallbuilding] = useState('')
  console.log("buildings", buildings);
  const [selectedbuilding, setselectedbuilding] = useState();
  const [floors, setfloors] = useState([]);
  const [selectedfloor, setselectedfloor] = useState("");
  const [statusData, setStatusData] = useState([
    { id: 1, title: "ExtSup s.r.l." },
  ]);
  const [the_checklists, setthe_checklists] = useState([]);
  const [the_buildingcheck, setthe_buildingcheck] = useState([]);
  const [checklists, setchecklists] = useState([]);
  const [theinspection, settheinspections] = useState({});
  const [selectedcontrolpoint, setselectedcontrolpoint] = useState({});
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };
  const [issueimage, setissueimage] = useState("");
  const [loading, setloading] = useState(true);
  const [value, setValue] = React.useState([null, null]);
  console.log("date", value);
  const [tblData, settblData] = useState([
    {
      id: "3F10065769234",
      inspector: "Muddasir Nazir",
      dataTime: "21 Jan 2021 at 2:31pm",
      desc: "CO2 fire extinguisher n.1 – 2kg",
      compName: "ShiningStarMedia.AI",
      buildName: "Building No.1",
      floor: "7",
      location: "Main Door",
      dateManuFect: "01 Jan 2019",
      dateExpiry: "01 Jan 2023",
      status: "No Issue",
    },
  ]);
  console.log("tblData", tblData);
  const filterdatabycompany = () => {
    const data = tblData.filter(
      (item) => item?.controlpointId?.createdBy?.companyName == selectedcompany
    );
    let mod_building = [];
    data.map((item, index) => {
      item?.controlpointId.tagIds.map((item2) => {
        console.log("item2", item2);
        if (!mod_building.includes(item2.location.buildingname)) {
          mod_building.push(item2.location.buildingname);
        }
      });
    });
    console.log("mod_building", mod_building);
    if (mod_building.length > 0) {
      setbuildings(["None", ...mod_building]);
    }
  };
  useEffect(() => {
    if (selectedcompany) {
      filterdatabycompany();
    }
  }, [selectedcompany]);
  const filterdatabybuilding = () => {
    let mod_data = [];
    the_checklists.map((item, index) => {
      const tagindex = item?.controlpointId?.tagIds?.findIndex(
        (item2) => item2.tagId == item.tagId
      );
      if (
        item?.controlpointId?.tagIds[tagindex]?.location?.buildingname ==
        selectedbuilding
      ) {
        mod_data.push(item);
      }
    });

    let mod_floor = [];
    mod_data.map((item, index) => {
      item?.controlpointId.tagIds.map((item2) => {
        console.log("item2", item2);
        if (!mod_floor.includes(item2.location.floor)) {
          mod_floor.push(item2.location.floor);
        }
      });
    });
    console.log("mod_data", mod_data);
    console.log("mod_building", mod_floor);
    if (mod_floor.length > 0) {
      setfloors(["None", ...mod_floor]);
    }

    settblData([...mod_data]);
    setthe_buildingcheck([...mod_data]);
  };
  // filter by building
  useEffect(() => {
    if (selectedbuilding) {
      filterdatabybuilding();
    } else if (the_checklists) {
      settblData(the_checklists);
    }
  }, [selectedbuilding]);
  // filter by floor
  useEffect(() => {
    if (selectedfloor) {
      let mod_data = [];
      the_buildingcheck.map((item, index) => {
        const tagindex = item?.controlpointId?.tagIds?.findIndex(
          (item2) => item2.tagId == item.tagId
        );
        if (
          item?.controlpointId?.tagIds[tagindex]?.location?.floor ==
          selectedfloor
        ) {
          mod_data.push(item);
        }
      });

      settblData([...mod_data]);
    } else if (the_checklists) {
      filterdatabybuilding();
    }
  }, [selectedfloor]);
  const getallchecks = async () => {
    setloading(true);
    try {
      let date = "";
      if (value) {
        if (!value.includes(null)) {
          date = value;
        }
      }
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/getuserchecksbydate`,
        {
          date,
        }
      );
      console.log("response_checks", res.data);
      if (res.data.success == "true") {
        settblData(res.data.checks);
        setthe_checklists(res.data.checks);
        // let mod_companies = [];
        // res.data.checks.map((item, index) => {
        //   if (
        //     !mod_companies.includes(
        //       item?.controlpointId?.createdBy?.companyName
        //     )
        //   ) {
        //     mod_companies.push(item?.controlpointId?.createdBy?.companyName);
        //   }
        // });
        // console.log("mod_companies", mod_companies);
        setcompanies(res.data.companies);
        setloading(false);
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
  useEffect(() => {
    getallchecks();
  }, []);
  useEffect(() => {
    if (value) {
      if (!value.includes(null)) {
        getallchecks();
      }
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      //setHide2(false);
      //setHide3(false);
      //setHide4(false);
    });
  }, []);

  console.log("checklist", checklists);

  const CheckPointStatus = () => {
    console.log("selectedcontrolpoint", selectedcontrolpoint);

    return (
      <div className="check-point flex flex-col">
        <div className="check-point-header flex jc">
          <div className="box-h flex aic jc">
            <div className="lbl b7 flex jc aic font">Control Point Status</div>
          </div>
          <div
            className="cross-icon pointer"
            onClick={(e) => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </div>
        </div>
        {/* <div className="mini-info flex aic">
          <div className="info-item flex flex-col">
            <div className="lbl s16 b6 font">Company Name</div>
            <div className="tag s14 font">
              {selectedcontrolpoint.checkedby.companyName}
            </div>
          </div>
          <div className="info-item flex flex-col">
            <div className="lbl s16 b6 font">Date Of Manufacture</div>
            <div className="tag s14 font">
              {`${moment(Number(theinspection?.manufacturingdate)).format(
                "D"
              )}-${moment(Number(theinspection?.manufacturingdate)).format(
                "MM"
              )}-${moment(Number(theinspection?.manufacturingdate)).format(
                "YYYY"
              )}`}
            </div>
          </div>
          <div className="info-item flex flex-col">
            <div className="lbl s16 b6 font">Date Of Expiry</div>
            <div className="tag cred s14 font">
              {`${moment(Number(theinspection?.expirydate)).format(
                "D"
              )}-${moment(Number(theinspection?.expirydate)).format(
                "MM"
              )}-${moment(Number(theinspection?.expirydate)).format("YYYY")}`}
            </div>
          </div>
        </div> */}
        {/* <div className="lbl b7 flex jc aic font">Control Point Status</div> */}
        <div className="check-list flex flex-col">
          {checklists.map((item, index) => {
            return item.status == "normal" ? (
              <div className="check-item flex flex-col">
                <div className="item-header flex aic">
                  <div className="header-left flex flex-col">
                    <div className="tag b6 font">Check {index + 1}</div>
                    <div className="des s12 b5 font">CO2 fire extinguisher</div>
                  </div>
                  <div className="header-right flex aic">
                    <div className="status-icon flex aic jc green">
                      <CheckSmall />
                    </div>
                    <div className="status-tag b7">Normal</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="check-item flex flex-col">
                <div className="item-header flex aic">
                  <div className="header-left flex flex-col">
                    <div className="tag b6 font">Check {index + 1}</div>
                    <div className="des s12 b5 font">CO2 fire extinguisher</div>
                  </div>
                  <div className="header-right flex aic">
                    <div className="status-icon flex aic jc red">
                      <CloseSmall />
                    </div>
                    <div className="status-tag b7">Abnormal</div>
                  </div>
                </div>
                <div className="item-detail flex aic">
                  <div className="detail-left flex flex-col">
                    <div className="flex flex-col">
                      <div className="warning-tag s12 font b5">Issue</div>
                      <div className="warning-desc s12 b5 font">
                        {item.issue}
                      </div>
                    </div>
                    <div className="issue-action flex aic">
                      <div className="btn-fix button">Fix Now</div>
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
                                  placeholder="Search Requirments"
                                >
                                  {selectedState4
                                    ? selectedState4.title
                                    : "Assign User to fix"}
                                </span>
                              </div>
                            </div>
                            <div className="flex aic jc">
                              <ArrowDownIcon />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`block flex aic abs ${
                            hide4 ? "show" : ""
                          }`}
                        >
                          <div className="manue flex aic col anim">
                            {statusData.map((item, index) => (
                              <div
                                key={index}
                                className="slt flex aic"
                                onClick={(e) => {
                                  setHide4(!hide4);
                                  setSelectedState4(item);
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
                  <div className="detail-right flex">
                    <div
                      className="pointer"
                      onClick={(e) => {
                        setOpen(false);
                        setOpen2(true);
                        setissueimage(item.image);
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_END_URL}${item.image}.jpeg`}
                        className="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const DownloadImg = () => {
    return (
      <div
        className="download-img flex"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_END_URL}${issueimage}.jpeg)`,
        }}
      >
        <div className="download-btn flex">
          <button className="btn cleanbtn">
            <DownloadIcon />
            <div className="lbl s12 font ">Download</div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title="Inspections" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="home-p flex rel sidebar-gap">
          <div className="container flex flex-col">
            <div className="filter-sec flex flex-col">
              <div className="f-head flex aic">
                <div className="menu-icon">
                  <FilterIcon />
                </div>
                <div className="lbl font s18 b5">Filters</div>
              </div>
              <div className="f-fields flex aic">
                <div className="dialog-fields flex aic">
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
                              {selectedcompany
                                ? selectedcompany
                                : "Company Filter"}
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
                        {["All", ...companies].map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide(!hide);
                              if (item == "All") {
                                setselectedcompany(null);
                              } else {
                                setselectedcompany(item);
                                setHide2(!hide2);
                              }
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item}
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
                              placeholder="Building Filter"
                            >
                              {selectedbuilding
                                ? selectedbuilding
                                : "Building Filter"}
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
                        {buildings.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide2(!hide2);
                              if (item == "None") {
                                setselectedbuilding(null);
                              } else {
                                setselectedbuilding(item);
                                setHide3(!hide3);
                              }
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Third */}
                  <div className="dropDown flex aic jc flex-col rel">
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
                              placeholder="Floor Filter"
                            >
                              {selectedfloor ? selectedfloor : "Floor Filter"}
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
                        {floors.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide3(!hide3);

                              if (item == "None") {
                                setselectedfloor(null);
                              } else {
                                setselectedfloor(item);
                              }
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Fourth */}
                  {/* <div className="dropDown flex aic jc flex-col rel">
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
                              placeholder="Search Requirments"
                            >
                              {selectedState4
                                ? selectedState4.title
                                : "Search Requirments"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide4 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {statusData.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide4(!hide4);
                              setSelectedState4(item);
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
                </div>
                <div className="date-selector flex">
                  <CustomDateRangeInputs value={value} setValue={setValue} />
                </div>
              </div>
            </div>
            {!loading && (
              <div className="table-sec flex flex-col">
                <div className="tbl-row flex aic">
                  <div className="row-item">
                    <FilterIcon />
                  </div>
                  <div className="row-item">Description</div>
                  {/* <div className="row-item">Checkpoint ID</div> */}
                  <div className="row-item">Inspector</div>
                  <div className="row-item">Date & Time</div>

                  <div className="row-item">Issue Fixed By</div>
                  <div className="row-item">Building Name</div>
                  <div className="row-item">Floor</div>
                  <div className="row-item">Location</div>
                  {/* <div className="row-item">Date Of Manufacture</div> */}
                  {/* <div className="row-item">Date Of Expiry</div> */}
                  <div className="row-item">Status</div>
                  <div className="row-item">Action</div>
                </div>
                {tblData.map((item, index) => {
                  const tagindex = item?.controlpointId?.tagIds?.findIndex(
                    (item2) => item2.tagId == item.tagId
                  );
                  return (
                    <div className="tbl-row flex aic" key={index}>
                      <div className="row-item">
                        <div className="ico-bg flex aic jc">
                          {/* <SigIcon /> */}
                          <img
                            style={{ borderRadius: "50px" }}
                            src={`${process.env.REACT_APP_END_URL}${item?.controlpointId?.image}`}
                            className="img"
                          />
                        </div>
                      </div>
                      <div className="row-item font">
                        {item?.controlpointId?.controlpointname}
                      </div>
                      {/* <div className="row-item font">{item.tagId}</div> */}
                      <div className="row-item font">
                        {item.checkedby.userName}
                      </div>
                      <div
                        className="row-item font"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {`${moment(item.createdAt).format("D")}-${moment(
                          item.createdAt
                        ).format("MM")}-${moment(item.createdAt).format(
                          "YYYY"
                        )}`}
                        <div>
                          {`${moment(item.createdAt).format("HH")}:${moment(
                            item.createdAt
                          ).format("mm")}`}
                        </div>
                      </div>

                      <div className="row-item font">{"Muddasir Nazir"}</div>
                      <div className="row-item font">
                        {
                          item?.controlpointId?.tagIds[tagindex]?.location
                            ?.buildingname
                        }
                      </div>
                      <div className="row-item font">
                        {
                          item?.controlpointId?.tagIds[tagindex]?.location
                            ?.floor
                        }
                      </div>
                      <div className="row-item font">
                        {
                          item?.controlpointId?.tagIds[tagindex]?.location
                            ?.location
                        }
                      </div>
                      <div
                        className="row-item font"
                        onClick={(e) => {
                          setOpen(true);
                          setchecklists(item?.checklists);
                          settheinspections(
                            item?.controlpointId?.tagIds[tagindex]
                          );
                          setselectedcontrolpoint(item);
                        }}
                      >
                        <div
                          className={`btn cleanbtn font ${
                            item.devicecondition != "abnormal"
                              ? "green bg-green"
                              : "red bg-red bd-red"
                          }`}
                        >
                          {item.devicecondition}
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          setOpen3(true);
                          settheinspections(
                            item?.controlpointId?.tagIds[tagindex]
                          );
                          setselectedcontrolpoint(item);
                        }}
                        className="row-item font"
                      >
                        <ActionIcon />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-box">
          <CheckPointStatus data={checklists} />
        </div>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-box">
          <DownloadImg />
        </div>
      </Dialog>
      {/* <Dialog
        open={open3}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ControlPointInfo
          setOpen3={setOpen3}
          selectedcontrolpoint={selectedcontrolpoint}
          theinspection={theinspection}
        />
      </Dialog> */}
      <Modal open={open3} onClose={() => setOpen3(false)}>
        <ControlPointInfo
          setOpen3={setOpen3}
          selectedcontrolpoint={selectedcontrolpoint}
          theinspection={theinspection}
        />
      </Modal>
    </>
  );
};

export default Home;
