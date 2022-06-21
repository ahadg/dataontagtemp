import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Dialog from "@mui/material/Dialog";
import Modal from "../components/Modal";
import {
  SearchIcon,
  PlusIcon,
  BinBoxIcon,
  FamilyTreeIcon,
  ArrowDownIcon,
  FilterIcon,
  RoundAdd,
  EditIcon,
  FireCaylinder,
  DeleteIcon,
  CameraIcon,
} from "../svg";
import axios from "axios";
import AddNewControlPoint from "../components/CreateControlpoint_Template";
import EditFamily from "../components/EditFamily";
import EditSubFmaily from "../components/EditSubFamily";
import EditControlPoint from "../components/EditControlPoint";
import AddNewFamilySubFmaily from "../components/AddNewFamilySubFmaily";
import FamilyItems from "../components/FamilyItems";
import CreateCheckPoint from "../components/CreateCheckPoint";
import { ToastContainer, toast } from "react-toastify";
const Checkpoint = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [openEditFamily, setOpenEditFamily] = useState(false);
  const [openEditSubFamily, setOpenEditSubFamily] = useState(false);
  const [openEditCtrlPoint, setOpenEditCtrlPoint] = useState(false);
  const [selectedFamily, setselectedFamily] = useState();
  const [selectedFamilyIndex, setselectedFamilyIndex] = useState();

  const [selectedSubfamily, setSelectedSubfamily] = useState();
  const [selectedControlpoint, setSelectedControlpoint] = useState();
  //console.log("selectedFamily_all", selectedFamily, selectedSubfamily, selectedControlpoint);
  console.log("selectedFamily", selectedFamily);
  console.log("selectedSubfamily", selectedSubfamily);
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [checklist, setchecklist] = useState({
    maintaineradmin: {},
    maintaineruser: {},
    companyadmin: {},
    companyuser: {},
  });
  console.log("checklist", checklist);
  const [maintaineradminchecklist, setmaintaineradminchecklist] = useState([]);
  const [maintaineruserchecklist, setmaintaineruserchecklist] = useState([]);
  const [companyadminchecklist, setcompanyadminchecklist] = useState([]);
  const [companyuserchecklist, setcompanyuserchecklist] = useState([]);

  console.log("maintaineradminchecklist", maintaineradminchecklist);
  console.log("maintaineruserchecklist", maintaineruserchecklist);
  console.log("selectedControlpoint", selectedControlpoint);
  const [controlpoint, setcontrolpoint] = useState("");
  const [controlList, setControlList] = useState([
    { lbl: "ControlPoint Sub-Family" },
    { lbl: "Controlpoint Sub-Family" },
    { lbl: "Controlpoint Sub-Family" },
    { lbl: "Controlpoint Sub-Family" },
  ]);
  const [checklisttype, setchecklisttype] = useState("");

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };
  const [families, setfamilies] = useState([]);

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      //setHide2(false);
      //setHide3(false);
    });
  }, []);

  console.log("maintainer_controlpoint", controlpoint);

  useEffect(() => {
    if (selectedControlpoint) {
      let maintaineradminlist = [];
      let maintaineruserlist = [];
      let companyadminlist = [];
      let companyuserlist = [];
      selectedControlpoint.checkList.map((item) => {
        if (item.maintainedBy == "maintaineradmin") {
          maintaineradminlist.push(item);
        } else if (item.maintainedBy == "maintaineruser") {
          maintaineruserlist.push(item);
        } else if (item.maintainedBy == "companyadmin") {
          companyadminlist.push(item);
        } else if (item.maintainedBy == "companyuser") {
          companyuserlist.push(item);
        }
      });
      setmaintaineradminchecklist(maintaineradminlist);
      setmaintaineruserchecklist(maintaineruserlist);
      setcompanyadminchecklist(companyadminlist);
      setcompanyuserchecklist(companyuserlist);
    }
  }, [selectedControlpoint]);

  const getfamilies = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/getuserallfamilies`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setfamilies(res.data.families);
        if (!selectedFamily) {
          setselectedFamily(res.data.families[0]);
        } else {
          let the_item = "";
          res.data.families.map((item) => {
            if (item.id == selectedFamily.id) {
              the_item = item;
            }
          });
          setselectedFamily(the_item);
          let the_subfamily = {};
          if (selectedSubfamily) {
            console.log("the_subfamily", selectedSubfamily);
            the_item.subfamilies.map((item) => {
              console.log("the_subfamily", item._id, selectedSubfamily._id);
              if (item._id == selectedSubfamily._id) {
                the_subfamily = item;
              }
            });
            console.log("the_subfamily", the_subfamily);
            setSelectedSubfamily(the_subfamily);
          }
          if (selectedControlpoint) {
            let the_controlpoint = "";
            the_subfamily.controlpoints.map((item) => {
              if (item.id == selectedControlpoint._id) {
                the_controlpoint = item;
              }
              setSelectedControlpoint(the_controlpoint);
            });
          }
        }
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
    getfamilies();
  }, []);

  const modify_checlist = async (type, checkName, checkDesc, expiry,problemnotifications) => {
    if (type == "maintaineradmin") {
      setmaintaineradminchecklist([
        ...maintaineradminchecklist,
        {
          maintainedBy: "maintaineradmin",
          checkName: checkName,
          checkDesc: checkDesc,
          expiry,
          problemnotifications
        },
      ]);
    }
    if (type == "companyadmin") {
      setcompanyadminchecklist([
        ...companyadminchecklist,
        {
          maintainedBy: "companyadmin",
          checkName: checkName,
          checkDesc: checkDesc,
          expiry,
          problemnotifications
        },
      ]);
    }
    if (type == "companyuser") {
      setcompanyuserchecklist([
        ...companyuserchecklist,
        {
          maintainedBy: "companyuser",
          checkName: checkName,
          checkDesc: checkDesc,
          expiry,
          problemnotifications
        },
      ]);
    }
    if (type == "maintaineruser") {
      setmaintaineruserchecklist([
        ...maintaineruserchecklist,
        {
          maintainedBy: "maintaineruser",
          checkName: checkName,
          checkDesc: checkDesc,
          expiry,
          problemnotifications
        },
      ]);
    }
    setchecksupdates(Math.random());
  };

  // component to list subfamilies

  console.log("selectedControlpoint", selectedControlpoint);

  const HandleTextField = ({
    item,
    myindex,
    subfamilydata,
    setsubfamilydata,
    deleteonclickingminus,
    setsubfamiliesdeletedindex,
    subfamiliesdeletedindex,
    deleteasubfamily
  }) => {
    console.log("hello there");
    const updatesubfamily = async (subfamilies) => {
      console.log("updatesubfamily");
      try {
        let res2 = await axios.post(
          `${process.env.REACT_APP_END_URL}api/updateubfamily`,
          { familyid: selectedFamily.id, subfamilies }
        );
        console.log(res2);
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
    return (
      <div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Sub Family</div>
          <div className="flex aic">
            <div className="extra-field flex aic">
              <input
                type="text"
                className="txt-box cleanbtn s14 b4 font"
                placeholder="Sub-Family Name"
                value={item.subfamilyname}
                onChange={(e) => {
                  let mod_familydata = [...subfamilydata];
                  mod_familydata[myindex] = {
                    ...mod_familydata[myindex],
                    subfamilyname: e.target.value,
                  };
                  setsubfamilydata(mod_familydata);
                }}
              />
              <div
                onClick={() => {
                  let mod_familydata = [...subfamilydata];
                  //delete mod_familydata[myindex]
                  let mod_data = mod_familydata.splice(myindex, 1);
                  console.log("myindex", myindex);
                  console.log("mod_data", mod_data);
                  if (deleteonclickingminus) {
                    //updatesubfamily(mod_familydata);
                    deleteasubfamily(myindex)
                  }

                  setsubfamilydata(mod_familydata);
                  // if(setsubfamiliesdeletedindex){
                  //   console.log('subfamiliesdeletedindexcalled')
                  //   setsubfamiliesdeletedindex([...subfamiliesdeletedindex,myindex])
                  // }
                }}
                className="del-ico flex aic jc"
              >
                -
              </div>
            </div>
            <div
              className="select-img flex flex-col aic jc"
              onClick={() =>
                document.getElementById(`upload_img-${myindex}`).click()
              }
            >
              <div className="icon-camera">
                {item.image ? (
                  typeof item.image == "string" ? (
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={`${process.env.REACT_APP_END_URL}${item?.image}`}
                      className="img"
                    />
                  ) : (
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={URL.createObjectURL(item.image)}
                      className="img"
                    />
                  )
                ) : (
                  <CameraIcon />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                title=""
                id={`upload_img-${myindex}`}
                className="select-file cleanbtn"
                onChange={(e) => {
                  //setfile(e.target.files[0])
                  let mod_familydata = [...subfamilydata];
                  mod_familydata[myindex] = {
                    ...mod_familydata[myindex],
                    image: e.target.files[0],
                  };
                  console.log(mod_familydata, myindex);
                  setsubfamilydata(mod_familydata);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [checksupdates, setchecksupdates] = useState("");

  const manageheckincontrolpoint = async () => {
    try {
      // send whole list of check with maintained by
      let the_checklists = [
        ...maintaineradminchecklist,
        ...maintaineruserchecklist,
        ...companyadminchecklist,
        ...companyuserchecklist,
      ];
      console.log("the_checklists", the_checklists);
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createcontrolpointschecks`,
        {
          id: selectedControlpoint.id,
          checklist: the_checklists,
        }
      );
      console.log("response_checks", res.data);
      // if (res.data) {

      // }
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
    if (checksupdates) {
      manageheckincontrolpoint();
    }
  }, [
    checksupdates,
    // maintaineradminchecklist,
    // maintaineruserchecklist,
    // companyadminchecklist,
    // companyuserchecklist,
  ]);

  // const familyselection = (item) => {
  //  if(item.subfamilies.length > 0){
  //      selectedFamily.subfamilies.append({subfamilyname : 'no subfamily'})
       
  //  }
  //  else if(item.subfamilies) {

  //  }
  // }

  return (
    <>
      <Header title="Controlpoint Templates" hideRightbar={true} />
      <div className="users-p sidebar-gap">
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
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setHide(!hide);
                      // }}
                    >
                      <div className="d-img flex aic jc">
                        <img
                          src={`${process.env.REACT_APP_END_URL}${selectedFamily?.image}`}
                          className="img"
                        />
                      </div>
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Select Family"
                          >
                            {selectedFamily
                              ? selectedFamily.deviceName
                              : "Select Family"}
                          </span>
                        </div>
                      </div>
                      <div className="icons flex aic">
                        <div
                          className="edit-icon flex aic jc pointer"
                          onClick={() => {
                            setOpenEditFamily(true);
                          }}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="dropDown-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide(!hide);
                          }}
                        >
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {families.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide(!hide);
                            setselectedFamily(item);
                            setselectedFamilyIndex(index);
                            setSelectedSubfamily();
                            setSelectedControlpoint();

                            setHide2(!hide2);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <span className="unit-eng flex aic font s14 b4">
                              {item.deviceName}
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
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setHide(!hide);
                      // }}
                    >
                      <div className="d-img flex aic jc">
                        {selectedSubfamily?.image ? (
                          <img
                            src={`${process.env.REACT_APP_END_URL}${selectedSubfamily?.image}`}
                            className="img"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Select Subfamily"
                          >
                            {selectedSubfamily
                              ? selectedSubfamily.subfamilyname
                              : "Select Subfamily"}
                          </span>
                        </div>
                      </div>
                      <div className="icons flex aic">
                        <div
                          className="edit-icon flex aic jc pointer"
                          onClick={(e) => {
                            setOpenEditSubFamily(true);
                          }}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="dropDown-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (selectedFamily) {
                              setHide2(!hide2);
                            }
                          }}
                        >
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {selectedFamily && [...selectedFamily?.subfamilies,{subfamilyname : 'no subfamily'}].map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide3(!hide3);
                            setSelectedSubfamily(item);
                            setHide2(!hide2);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <span className="unit-eng flex aic font s14 b4">
                              {item.subfamilyname}
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
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setHide(!hide);
                      // }}
                    >
                      <div className="d-img flex aic jc">
                        {selectedControlpoint?.image ? (
                          <img
                            src={`${process.env.REACT_APP_END_URL}${selectedControlpoint?.image}`}
                            className="img"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Select checkpoint"
                          >
                            {selectedControlpoint
                              ? selectedControlpoint?.controlpointname
                              : "Select Template"}
                          </span>
                        </div>
                      </div>
                      <div className="icons flex aic">
                        {selectedControlpoint && (
                          <div
                            className="edit-icon flex aic jc pointer"
                            onClick={(e) => setOpenEditCtrlPoint(true)}
                          >
                            <EditIcon />
                          </div>
                        )}
                        <div
                          className="dropDown-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (selectedSubfamily) {
                              setHide3(!hide3);
                            }
                          }}
                        >
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide3 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {
                      selectedSubfamily?.subfamilyname == "no subfamily" ?
                      selectedFamily?.nonsubfamilycontrolpoints?.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide3(!hide3);
                            setSelectedControlpoint(item?.controlpoint);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <span className="unit-eng flex aic font s14 b4">
                              {item?.controlpoint?.controlpointname}
                            </span>
                          </div>
                        </div>
                      ))
                      :
                      selectedSubfamily?.controlpoints?.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide3(!hide3);
                            setSelectedControlpoint(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <span className="unit-eng flex aic font s14 b4">
                              {item.controlpointname}
                            </span>
                          </div>
                        </div>
                      ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rit flex aix">
            <button
              className="cleanbtn add-btn btn-2 flex aic"
              onClick={(e) => setOpen(true)}
            >
              <div className="ico">
                <FamilyTreeIcon />
              </div>
              <div className="txt  b6 cfff">Create a Family or Sub-Family</div>
            </button>

            <button
              className="cleanbtn add-btn  flex aic"
              onClick={(e) => setOpen2(true)}
            >
              <div className="ico">
                <RoundAdd />
              </div>
              <div className="txt s12 b6 cfff">Create a New Template</div>
            </button>
          </div>
        </div>
        <div className="tbl-block flex">
          {/* {selectedSubfamily ? (
            selectedControlpoint ? (
              <div className="family-block flex flex-col aic">
                <div className="family-haeder flex aic jc">
                  <div className="family-heading s14 b6 font flex aic jc">
                    {selectedSubfamily.deviceName}
                  </div>
                  <div className="ico pointer flex aic jc">
                    <EditIcon />
                  </div>
                </div>
                <div className="list flex flex-col">
                  <FamilyItems data={selectedControlpoint} />
                </div>
              </div>
            ) : (
              <div className="family-block flex flex-col aic">
                <div className="family-haeder flex aic jc">
                  <div className="icon-cyc pointer flex aic jc">
                    <img
                      style={{ width: 18, height: 18 }}
                      src={`${process.env.REACT_APP_END_URL}${selectedSubfamily.image}`}
                      className="img"
                    />
                  </div>
                  <div className="family-heading s14 b6 font flex aic jc">
                    {selectedSubfamily.deviceName}
                  </div>
                  <div className="ico pointer flex aic jc">
                    <EditIcon />
                  </div>
                </div>
                <div className="list flex flex-col">
                  {selectedSubfamily?.subfamilies.map((item, index) => (
                    <FamilyItems data={item} />
                  ))}
                </div>
              </div>
            )
          ) : (
            ""
          )} */}
          <div className="checklist-control flex flex-col aic">
            {selectedControlpoint ? (
              <>
                <div className="checklist-heading s14 b6 font flex aic jc">
                  CheckList Of{" "}
                  {controlpoint
                    ? controlpoint?.controlpointname
                    : "Selected Control Point"}
                </div>
                {/* start of checks */}
                <div className="checklist-blocks flex">
                  <div className="block flex flex-col">
                    <div className="block-heading s13 b5 font flex aic jc">
                      Maintainer Admin Checklist
                    </div>
                    <div className="items">
                      {maintaineradminchecklist.map((item, index) => {
                        return (
                          <div className="meta flex flex-col">
                            <div className="txt-fields flex flex-col">
                              <div className="icon-action flex aic">
                                <div className="icon-edit flex aic">
                                  <EditIcon />
                                </div>
                                <div
                                  onClick={() => {
                                    maintaineradminchecklist.splice(index, 1);
                                    setmaintaineradminchecklist([
                                      ...maintaineradminchecklist,
                                    ]);
                                    setchecksupdates(Math.random());
                                  }}
                                  className="icon-del flex aic"
                                >
                                  <BinBoxIcon />
                                </div>
                              </div>
                              <input
                                type="text"
                                placeholder="Check Title..."
                                className="txt txt-1 cleanbtn"
                                value={item.checkName}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.name = e.target.value
                                //   setchecklist({...checklist})
                                // }}
                                disabled
                              />
                              <input
                                type="text"
                                placeholder="Check Description..."
                                className="desc cleanbtn"
                                value={item.checkDesc}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.description = e.target.value
                                //   setchecklist(checklist)
                                // }}
                                disabled
                              />
                            </div>
                          </div>
                        );
                      })}

                      {/* <div className="meta flex flex-col">
                        <div className="txt-fields flex flex-col">
                          
                          <input
                            type="text"
                            placeholder="Check Title..."
                            className="txt txt-1 cleanbtn s14 b4 font"
                            value={checklist.maintaineradmin.checkName}
                            onChange={(e) => {
                              checklist.maintaineradmin.checkName =
                                e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Check Description..."
                            className="txt cleanbtn s14 b4 font"
                            value={checklist.maintaineradmin.checkDesc}
                            onChange={(e) => {
                              checklist.maintaineradmin.checkDesc =
                                e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                        </div>
                      </div> */}
                      <div className="btn-block flex aic jc">
                        <button
                          onClick={() => {
                            setOpen3(true);
                            setchecklisttype("maintaineradmin");
                            // setmaintaineradminchecklist([
                            //   ...maintaineradminchecklist,
                            //   {
                            //     maintainedBy: "maintaineradmin",
                            //     checkName: checklist.maintaineradmin.checkName,
                            //     checkDesc: checklist.maintaineradmin.checkDesc,
                            //   },
                            // ]);
                            // checklist.maintaineradmin.checkName = "";
                            // checklist.maintaineradmin.checkDesc = "";
                            // setchecksupdates(Math.random());
                          }}
                          className="cleanbtn button add-new-btn flex aic"
                        >
                          <div className="ico s24 b4">+</div>
                          <div className="txt s12 b6">Add More</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="block flex flex-col">
                    <div className="block-heading s13 b5 font flex aic jc">
                      Maintainer User Checklist
                    </div>
                    <div className="items">
                      {maintaineruserchecklist.map((item, index) => {
                        return (
                          <div className="meta flex flex-col">
                            <div className="txt-fields flex flex-col">
                              <div
                                onClick={() => {
                                  maintaineruserchecklist.splice(index, 1);
                                  setmaintaineruserchecklist([
                                    ...maintaineruserchecklist,
                                  ]);
                                  setchecksupdates(Math.random());
                                }}
                                className="icon-del flex aic"
                              >
                                <BinBoxIcon />
                              </div>
                              <input
                                type="text"
                                placeholder="Check Title..."
                                className="txt txt-1 cleanbtn s14 b4 font"
                                value={item.checkName}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.name = e.target.value
                                //   setchecklist({...checklist})
                                // }}
                                disabled
                              />
                              <input
                                type="text"
                                placeholder="Check Description..."
                                className="txt cleanbtn s14 b4 font"
                                value={item.checkDesc}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.description = e.target.value
                                //   setchecklist(checklist)
                                // }}
                                disabled
                              />
                            </div>
                          </div>
                        );
                      })}
                      {/* <div className="meta flex flex-col">
                        <div className="txt-fields flex flex-col">
                         
                          <input
                            type="text"
                            placeholder="Check Title..."
                            className="txt txt-1 cleanbtn s14 b4 font"
                            value={checklist.maintaineruser.checkName}
                            onChange={(e) => {
                              checklist.maintaineruser.checkName =
                                e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Check Description..."
                            className="txt cleanbtn s14 b4 font"
                            value={checklist.maintaineruser.checkDesc}
                            onChange={(e) => {
                              checklist.maintaineruser.checkDesc =
                                e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                        </div>
                      </div> */}
                      <div className="btn-block flex aic jc">
                        <button
                          onClick={() => {
                            setOpen3(true);
                            setchecklisttype("maintaineruser");
                            // setmaintaineruserchecklist([
                            //   ...maintaineruserchecklist,
                            //   {
                            //     maintainedBy: "maintaineruser",
                            //     checkName: checklist.maintaineruser.checkName,
                            //     checkDesc: checklist.maintaineruser.checkDesc,
                            //   },
                            // ]);
                            // checklist.maintaineruser.checkName = "";
                            // checklist.maintaineruser.checkDesc = "";
                            // setchecksupdates(Math.random());
                          }}
                          className="cleanbtn add-new-btn flex aic"
                        >
                          <div className="ico s24 b4">+</div>
                          <div className="txt s12 b6">Add More</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="block flex flex-col">
                    <div className="block-heading s13 b5 font flex aic jc">
                      Company Admin Checklist
                    </div>
                    <div className="items">
                      {companyadminchecklist.map((item, index) => {
                        return (
                          <div className="meta flex flex-col">
                            <div className="txt-fields flex flex-col">
                              <div
                                onClick={() => {
                                  companyadminchecklist.splice(index, 1);
                                  setcompanyadminchecklist([
                                    ...companyadminchecklist,
                                  ]);
                                  setchecksupdates(Math.random());
                                }}
                                className="icon-del flex aic"
                              >
                                <BinBoxIcon />
                              </div>
                              <input
                                type="text"
                                placeholder="Check Title..."
                                className="txt txt-1 cleanbtn s14 b4 font"
                                value={item.checkName}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.name = e.target.value
                                //   setchecklist({...checklist})
                                // }}
                                disabled
                              />
                              <input
                                type="text"
                                placeholder="Check Description..."
                                className="txt cleanbtn s14 b4 font"
                                value={item.checkDesc}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.description = e.target.value
                                //   setchecklist(checklist)
                                // }}
                                disabled
                              />
                            </div>
                          </div>
                        );
                      })}
                      {/* <div className="meta flex flex-col">
                        <div className="txt-fields flex flex-col">
                        
                          <input
                            type="text"
                            placeholder="Check Title..."
                            className="txt txt-1 cleanbtn s14 b4 font"
                            value={checklist.companyadmin.checkName}
                            onChange={(e) => {
                              checklist.companyadmin.checkName = e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Check Description..."
                            className="txt cleanbtn s14 b4 font"
                            value={checklist.companyadmin.checkDesc}
                            onChange={(e) => {
                              checklist.companyadmin.checkDesc = e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                        </div>
                      </div> */}
                      <div className="btn-block flex aic jc">
                        <button
                          onClick={() => {
                            setOpen3(true);
                            setchecklisttype("companyadmin");
                            // setcompanyadminchecklist([
                            //   ...companyadminchecklist,
                            //   {
                            //     maintainedBy: "companyadmin",
                            //     checkName: checklist.companyadmin.checkName,
                            //     checkDesc: checklist.companyadmin.checkDesc,
                            //   },
                            // ]);
                            // checklist.companyadmin.checkName = "";
                            // checklist.companyadmin.checkDesc = "";
                            // setchecksupdates(Math.random());
                          }}
                          className="cleanbtn add-new-btn flex aic"
                        >
                          <div className="ico s24 b4">+</div>
                          <div className="txt s12 b6">Add More</div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="block flex flex-col">
                    <div className="block-heading s13 b5 font flex aic jc">
                      Company User Checklist
                    </div>
                    <div className="items">
                      {companyuserchecklist.map((item, index) => {
                        return (
                          <div className="meta flex flex-col">
                            <div className="txt-fields flex flex-col">
                              <div
                                onClick={() => {
                                  companyuserchecklist.splice(index, 1);
                                  setcompanyuserchecklist([
                                    ...companyuserchecklist,
                                  ]);
                                  setchecksupdates(Math.random());
                                }}
                                className="icon-del flex aic"
                              >
                                <BinBoxIcon />
                              </div>
                              <input
                                type="text"
                                placeholder="Check Title..."
                                className="txt txt-1 cleanbtn s14 b4 font"
                                value={item.checkName}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.name = e.target.value
                                //   setchecklist({...checklist})
                                // }}
                                disabled
                              />
                              <input
                                type="text"
                                placeholder="Check Description..."
                                className="txt cleanbtn s14 b4 font"
                                value={item.checkDesc}
                                // onChange={(e) => {
                                //   checklist.maintaineradmin.description = e.target.value
                                //   setchecklist(checklist)
                                // }}
                                disabled
                              />
                            </div>
                          </div>
                        );
                      })}
                      {/* <div className="meta flex flex-col">
                        <div className="txt-fields flex flex-col">
                        
                          <input
                            type="text"
                            placeholder="Check Title..."
                            className="txt txt-1 cleanbtn s14 b4 font"
                            value={checklist.companyuser.checkName}
                            onChange={(e) => {
                              checklist.companyuser.checkName = e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Check Description..."
                            className="txt cleanbtn s14 b4 font"
                            value={checklist.companyuser.checkDesc}
                            onChange={(e) => {
                              checklist.companyuser.checkDesc = e.target.value;
                              setchecklist({ ...checklist });
                            }}
                          />
                        </div>
                      </div> */}
                      <div className="btn-block flex aic jc">
                        <button
                          onClick={() => {
                            setOpen3(true);
                            setchecklisttype("companyuser");
                            // setcompanyuserchecklist([
                            //   ...companyuserchecklist,
                            //   {
                            //     maintainedBy: "companyuser",
                            //     checkName: checklist.companyuser.checkName,
                            //     checkDesc: checklist.companyuser.checkDesc,
                            //   },
                            // ]);
                            // checklist.companyuser.checkName = "";
                            // checklist.companyuser.checkDesc = "";
                            // setchecksupdates(Math.random());
                          }}
                          className="cleanbtn add-new-btn flex aic"
                        >
                          <div className="ico s24 b4">+</div>
                          <div className="txt s12 b6">Add More</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h3 className="flex aic jc" style={{ height: "100%" }}>
                {!selectedFamily
                  ? "Please select a family"
                  : !selectedSubfamily
                  ? "Please select a subfamily"
                  : !selectedControlpoint
                  ? "Please select a Template"
                  : ""}
              </h3>
            )}
            {/* end of checkpoints */}
          </div>
        </div>
      </div>

      {/* Create family or subFmaily */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-box">
          <AddNewFamilySubFmaily
            getfamilies={getfamilies}
            setOpen={setOpen}
            families={families}
            HandleTextField={HandleTextField}
          />
        </div>
      </Dialog> */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNewFamilySubFmaily
          getfamilies={getfamilies}
          setOpen={setOpen}
          families={families}
          HandleTextField={HandleTextField}
        />
      </Modal>

      {/* CREATE NEW CONTROLPOINT */}
      <Modal open={open2} onClose={() => setOpen2(false)}>
        <AddNewControlPoint
          getfamilies={getfamilies}
          families={families}
          setOpen2={setOpen2}
        />
      </Modal>
      {/* <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-box">
          <AddNewControlPoint
            getfamilies={getfamilies}
            families={families}
            setOpen2={setOpen2}
          />
        </div>
      </Dialog> */}

      {/* Create CheckPoint */}
      {/* <Dialog
        open={open3}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CreateCheckPoint
          setOpen3={setOpen3}
          checklisttype={checklisttype}
          modify_checlist={modify_checlist}
        />
      </Dialog> */}
      <Modal open={open3} onClose={() => setOpen3(false)}>
        <CreateCheckPoint
          setOpen3={setOpen3}
          checklisttype={checklisttype}
          modify_checlist={modify_checlist}
        />
      </Modal>

      <Modal open={openEditFamily} onClose={() => setOpenEditFamily(false)}>
        <EditFamily
          getfamilies={getfamilies}
          setOpenEditFamily={setOpenEditFamily}
          selectedFamily={selectedFamily}
        />
      </Modal>

      <Modal
        open={openEditSubFamily}
        onClose={() => setOpenEditSubFamily(false)}
      >
        <EditSubFmaily
          setOpenEditSubFamily={setOpenEditSubFamily}
          HandleTextField={HandleTextField}
          selectedSubfamily={selectedSubfamily}
          setSelectedSubfamily={setSelectedSubfamily}
          selectedFamily={selectedFamily}
          getfamilies={getfamilies}
        />
      </Modal>

      <Modal
        open={openEditCtrlPoint}
        onClose={() => setOpenEditCtrlPoint(false)}
      >
        <EditControlPoint
          getfamilies={getfamilies}
          selectedControlpoint={selectedControlpoint}
          setOpenEditCtrlPoint={setOpenEditCtrlPoint}
          selectedFamily={selectedFamily}
          selectedSubfamily={selectedSubfamily}
        />
      </Modal>
    </>
  );
};

export default Checkpoint;
