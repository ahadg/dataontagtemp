import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Modal from "../components/Modal";
import "react-datetime/css/react-datetime.css";
import {
  FamilyTreeIcon,
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
  CloseIcon,
} from "../svg";
import { ToastContainer, toast } from "react-toastify";
import AddNewNFCTag from "../components/AddNewNFCTag_Controlpoint";
import EditNFCTag from "../components/EditNFCTag";
import axios from "axios";
import Loader from "../components/Loader";
import moment from "moment";
import CloneNFCTag from "../components/CloneNFCTag_Controlpoint";
import CustomDateRangeInputs from "../components/CustomDateRangeInputs";
import NfcControlPointInfo from "../components/NfcControlPointInfo";
import SyncfusionCalender from "../components/SyncfusionCalender";

const NfcManagment = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [value, setValue] = React.useState([null, null]);
  const [opennfctag, setopennfctag] = useState(false);
  const [edittagdata, setedittagdata] = useState("");
  const [syncfusionselected,setsyncfusionselected] = useState("")
  const [cloneddata, setcloneddata] = useState("");
  const [hide, setHide] = useState(false);
  const [date, setDate] = useState();
  const [selectedCompany, setselectedcompany] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [theinspection, settheinspections] = useState({});
  const [selectedcontrolpoint, setselectedcontrolpoint] = useState({});
  const [loading, setloading] = useState(true);
  const [families, setfamilies] = useState([]);
  const [mod_tagids, setmod_tagids] = useState([]);
  const [org_tagids, setorg_tagids] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [search, setsearch] = useState(undefined);
  const [deleteloading, setdeleteloading] = useState(false);
  const [userList, setuserList] = useState([]);

  const getusers = async () => {
    try {
      //setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getallusers`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        // setfamilies(res.data.families);
        setuserList(res.data.users);
        // setfilteruserList(res.data.users)
        //setcompanyfilter(res.data.companies)
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
    let temp_tagids = [];
    if (families) {
      let mod_companies = [];
      families.map((item, index3) => {
        item.subfamilies.map((item2, index2) => {
          console.log("item2", item2);
          item2.controlpoints.map((item3, index3) => {
            console.log("item3", item3);
            item3?.tagIds?.reverse().map((item4, index4) => {
              // getting companies
              if (!mod_companies.includes(item?.createdBy?.companyName)) {
                mod_companies.push(item?.createdBy?.companyName);
              }
              // abstracting the data
              temp_tagids.push({
                family: item,
                subfamily: item2,
                controlpoint: item3,
                tagIds: item4,
              });
            });
          });
        });
        // get nosubfamilies controlpoints
        item.nonsubfamilycontrolpoints?.map((item2, index2) => {
          console.log("item2", item2);
          //item2?.controlpoint?.map((item3, index3) => {
          //console.log("item3", item3);
          item2?.controlpoint?.tagIds?.reverse()?.map((item4, index4) => {
            // getting companies
            if (!mod_companies.includes(item?.createdBy?.companyName)) {
              mod_companies.push(item?.createdBy?.companyName);
            }
            // abstracting the data
            temp_tagids.push({
              family: item,
              subfamily: null,
              controlpoint: item2?.controlpoint,
              tagIds: item4,
            });
          });
          //});
        });
      });
      //setcompanies(mod_companies);
      console.log("mod_companies", mod_companies);
      setmod_tagids([...temp_tagids]);
      setorg_tagids([...temp_tagids]);
    }
  }, [families]);
  console.log("mod_tagids", mod_tagids);
  const getfamilies = async () => {
    try {
      let date = "";
      if (value) {
        if (!value.includes(null)) {
          date = value;
        }
      }
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/getuserallfamilies`,
        {
          date,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setfamilies(res.data.families);
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
  console.log("families", families);
  useEffect(() => {
    getfamilies();
    getusers();
  }, []);
  useEffect(() => {
    if (value) {
      if (!value.includes(null)) {
        setloading(true);
        getfamilies();
      }
    }
  }, [value]);

  useEffect(() => {
    let searchedids = [];
    if (selectedCompany) {
      if (selectedCompany == "All") {
        searchedids = [...org_tagids];
      } else {
        searchedids = org_tagids.filter(
          (item) => item?.family?.createdBy?.companyName == selectedCompany
        );
      }
    }
    if (search != undefined) {
      searchedids = org_tagids.filter((item) => {
        if (
          item.tagIds?.location.buildingname?.search(search) > -1 ||
          item.tagIds?.location.floor?.search(search) > -1 ||
          item.tagIds?.location.location?.search(search) > -1
        ) {
          return true;
        }
        // if (item.tagIds.tagId)
        //   return item.tagIds.tagId.search(search) != -1;
        // }
      });
    }
    setmod_tagids([...searchedids]);
  }, [search, selectedCompany]);

  const deletenfc = async () => {
    try {
      setdeleteloading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/deletenfctag`,
        {
          controlpointId: edittagdata.controlpoint._id,
          tagId: edittagdata.tagIds._id,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        getfamilies();
        setdeleteloading(false);
        setOpen2(false);
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
    document.addEventListener("click", () => {
      setHide(false);
    });
  }, []);

  const Confirm = () => {
    return (
      <>
        <div className="confirm-delte flex aic flex-col">
          {deleteloading ? (
            <Loader />
          ) : (
            <>
              <div className="heading-tag flex aic jc s16 font b6">
                <div>Delete Controlpoint</div>
              </div>
              <div className="desc flex aic jc s14 font b5">
                Do You Want To Delete Controlpoint?
              </div>
              <div className="actions-row flex aic">
                <button
                  className="btn-cancle button cleanbtn"
                  onClick={(e) => setOpen2(false)}
                >
                  No! Cancel
                </button>
                <button
                  onClick={() => deletenfc()}
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

  return (
    <div className="nfc-page">
      <Header title="Controlpoint Management" rightbarIcon="setting" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="nfc-management-p flex rel sidebar-gap">
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
                          {["All", ...companies].map((item, index) => (
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
                                  {item}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Date Picker */}
                    <div className="date-selector flex">
                      <CustomDateRangeInputs
                        value={value}
                        setValue={setValue}
                      />
                    </div>
                    {/* Search Box */}
                    <div className="search-by flex">
                      <div className="search-box flex aic">
                        <input
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                          type="text"
                          placeholder="Search Anything"
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
                  onClick={(e) => setOpen(true)}
                >
                  <div className="ico">
                    <RoundAdd />
                  </div>
                  <div className="txt s12 b6 cfff">Create Controlpoint</div>
                </button>
              </div>
            </div>
            <div className="table-sec flex flex-col">
              <div className="tbl-row flex aic">
                <div className="row-item">
                  <FilterIcon />
                </div>
                {/* <div className="row-item">Tag ID</div>
                <div className="row-item">Family Name</div>
                <div className="row-item">Sub-Family Name</div> */}
                <div className="row-item">Controlpoint Name</div>
                <div className="row-item">Company Name</div>
                <div className="row-item">Building Name</div>
                <div className="row-item">Floor</div>
                <div className="row-item">Location</div>
                {/* <div className="row-item">Manufacturing</div> */}
                <div className="row-item">Expiry</div>
                <div className="row-item">Action</div>
              </div>
              {mod_tagids.map((item, index) => {
                console.log(item.tagId);
                const tagindex = item?.controlpoint?.tagIds?.findIndex(
                  (item2) => item2.tagId == item.tagId
                );
                return (
                  <div className="tbl-row flex aic" key={index}>
                    <div className="row-item">
                      <div className="ico-bg flex aic jc">
                        {/* <SigIcon /> */}
                        <img
                          style={{ borderRadius: "50px" }}
                          src={`${process.env.REACT_APP_END_URL}${item?.controlpoint?.image}`}
                          className="img"
                        />
                      </div>
                    </div>
                    {/* <div className="row-item font">{item?.tagIds?.tagId}</div>
                  <div className="row-item font">
                    {item?.family?.deviceName}
                  </div>
                  <div className="row-item font">
                    {item?.subfamily?.subfamilyname}
                  </div> */}
                    <div className="row-item font">
                      {item?.controlpoint?.controlpointname}
                    </div>
                    <div className="row-item font">
                      {item?.family?.createdBy?.companyName}
                    </div>
                    <div className="row-item font">
                      {item.tagIds?.location.buildingname}
                    </div>
                    <div className="row-item font">
                      {item.tagIds?.location.floor}
                    </div>
                    <div className="row-item font">
                      {item.tagIds?.location.location}
                    </div>
                    {/* <div className="row-item font">
                    {`${moment(Number(item.tagIds?.manufacturingdate)).format(
                      "D"
                    )}-${moment(Number(item.tagIds?.manufacturingdate)).format(
                      "MM"
                    )}-${moment(Number(item.tagIds?.manufacturingdate)).format(
                      "YYYY"
                    )}`}
                  </div> */}
                    <div className="row-item font">
                      {`${moment((item.tagIds?.expirydate)).format(
                        "D"
                      )}-${moment((item.tagIds?.expirydate)).format(
                        "MM"
                      )}-${moment((item.tagIds?.expirydate)).format(
                        "YYYY"
                      )}`}
                    </div>
                    <div className="row-item font">
                      <div
                        className="icon-del flex aic"
                        onClick={(e) => {
                          setOpen2(true);
                          setedittagdata(item);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                      <div
                        className="ico-copy flex aic jc"
                        onClick={(e) => {
                          setedittagdata(item);
                          setopennfctag(true);
                          setcloneddata(item);
                        }}
                      >
                        <CloneIcon />
                      </div>
                      <div
                        onClick={() => {
                          setedittagdata(item);
                          setOpen3(true);
                        }}
                        className="ico-edit pointer flex aic jc"
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="ico-action pointer flex aic jc"
                        onClick={(e) => {
                          setOpen4(true);
                          console.log("tagIndex", tagindex);
                          settheinspections(item.tagIds);
                          setselectedcontrolpoint(item);
                        }}
                      >
                        <ActionIcon />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNewNFCTag
          families={families}
          setfamilies={setfamilies}
          setOpen={setOpen}
          setOpen5={setOpen5}
          setloading={setloading}
          getfamilies={getfamilies}
          companies={companies}
          userList={userList}
          syncfusionselected={syncfusionselected}
        />
      </Modal>

      <Modal open={opennfctag} onClose={() => {
        setopennfctag(false)
        setsyncfusionselected(edittagdata?.tagIds?.syncfusiondetails?.object)
        }}>
        <CloneNFCTag
          families={families}
          edittagdata={edittagdata}
          setOpen3={setOpen3}
          setfamilies={setfamilies}
          getfamilies={getfamilies}
          setloading={setloading}
          companies={companies}
          userList={userList}
          syncfusionselected={syncfusionselected}
        />
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)}>
        <Confirm />
      </Modal>

      <Modal open={open3} onClose={() => {
        setOpen3(false)
        setsyncfusionselected(edittagdata?.tagIds?.syncfusiondetails?.object)
        }}>
        <EditNFCTag
          families={families}
          edittagdata={edittagdata}
          setOpen3={setOpen3}
          setfamilies={setfamilies}
          getfamilies={getfamilies}
          setloading={setloading}
          companies={companies}
          userList={userList}
          syncfusionselected={syncfusionselected}
        />
      </Modal>
      <Modal open={open4} onClose={() => setOpen4(false)}>
        <NfcControlPointInfo
          setOpen4={setOpen4}
          selectedcontrolpoint={selectedcontrolpoint}
          theinspection={theinspection}
        />
      </Modal>

      <Modal open={open5} onClose={() => setOpen5(false)}>
        <div className="flex flex-col">
          <div className="sync-calender-hdr flex aic je">
            <div
              className="close-icon flex aic jc pointer"
              onClick={(e) => setOpen5(false)}
            >
              <CloseIcon />
            </div>
          </div>
          <SyncfusionCalender setOpen5={setOpen5} setsyncfusionselected={setsyncfusionselected} />
        </div>
      </Modal>
    </div>
  );
};

export default NfcManagment;
