import React, { useState, useEffect } from "react";
import {
  ArrowDownIcon,
  FireCaylinder,
  RoundAdd,
  RoundRemoveIcon,
  SearchIcon,
} from "../svg";
import { Link } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import moment from "moment";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const AddNewNFCTag = ({
  families,
  setfamilies,
  setOpen,
  setOpen5,
  setloading,
  companies,
  userList,
  getfamilies,
  syncfusionselected,
}) => {
  console.log('userList',userList)
  const user = useSelector((state) => state.generalReducers.user);
  const [showList, setShowList] = useState(false);
  const [gowithoutsubfamily, setgowithoutsubfamily] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [search, setsearch] = useState("");
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);
  const [selectedfamily, setSelectedfamily] = useState();
  const [selectedSubfamily, setSelectedSubfamily] = useState();
  const [selectedcontrolpoint, setSelectedcontrolpoint] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedChecklist, setSelectedChecklist] = useState();
  const [selectedPriority, setSelectedPriority] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [daysbefore,setdaysbefore] = useState('')
  const [reminderselections,setreminderseletions] = useState([{
    selectedUsers : [],
    daysbefore : '',
    showList : false
  }])
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  console.log("selectedfamily", selectedfamily);
  const [checklists, setchecklists] = useState([
    "Maintainer Admin",
    "Maintainer User",
    "Company Admin",
    "Company User",
  ]);
  const [buildingname, setbuildingname] = useState("");
  const [floor, setfloor] = useState("");
  const [location, setlocation] = useState("");
  const [manufacturingdate, setmanufacturingdate] = useState(
    new Date().getTime()
  );
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [tagId, settagId] = useState();
  const [loader, setloader] = useState(false);
  console.log('selectedUsers',selectedUsers)
  const createnewtag = async () => {
    if (!selectedfamily) {
      return toast.error("Please select family.");
    } else if (!selectedSubfamily && !gowithoutsubfamily) {
      return toast.error("Please select subfamily.");
    } else if (!selectedcontrolpoint) {
      return toast.error("Please select template.");
    } else if (!tagId) {
      return toast.error("Please input tagId.");
    } else if (!floor || !location || !buildingname) {
      return toast.error("Please input all location fields.");
    } else if (!manufacturingdate) {
      return toast.error("Please select start date.");
    } else if (!endDate) {
      return toast.error("Please select end date.");
    } else if (!syncfusionselected) {
      return toast.error("Please select expiry date.");
    }
    try {
      setloading(true);
      let mod_reminderselction = reminderselections.map((item) => {
        //var result = new Date(syncfusionselected[0]?.StartTime);
        var result = moment(syncfusionselected[0]?.StartTime);
        result = result.subtract(Number(item.daysbefore), "days");
        result = result.format();
        // info : by default date will be selected according to timezone, with maybe hours will be zoro if is'nt selected, so if convert it to italy zone, 'll subtract 4 hours and one day wil be less
        // carefull..
        return {
          ...item,
          reminderdate : result,
          //reminderdate : new Date(result).toLocaleString('en-US', { timeZone: 'Antarctica/Troll' }),
          showList : false
        }
      })
      const theusers = []
      selectedUsers.map((item) => {
        theusers.push({theuser :item._id,userinfo : item})
      })
      //setloader(true);
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createtag`,
        {
          familyId: selectedfamily?._id,
          subfamilyId: selectedSubfamily?._id,
          controlpointId: selectedcontrolpoint?._id,
          tagId,
          location: {
            floor,
            location,
            buildingname,
          },
          selectedchecklistname: selectedChecklist,
          selectedUsers: theusers,
          selectedCompany: selectedCompany,
          gowithoutsubfamily: gowithoutsubfamily,
          startDate: syncfusionselected[0]?.StartTime,
          endDate: syncfusionselected[0]?.EndTime,
          syncfusiondetails: {
            recurrencetype:
              syncfusionselected[0]?.RecurrenceRule?.split(";")[0]?.split(
                "="
              )[1],
            startDate: syncfusionselected[0]?.StartTime,
            endDate: syncfusionselected[0]?.EndTime,
            syncfusionselected,
            reminderselectionsobject : mod_reminderselction,
            //daysbefore
          },
          priority: selectedPriority,
          manufacturingdate,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        //setfamilies(res.data.families);
        setOpen(false);
        //setloader(false);
        getfamilies();
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

  console.log("companies", companies);
  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
      setHide3(false);
      setHide4(false);
    });
  }, []);

  return (
    <div className="create-new-nfc-taf flex">
      {loader ? (
        <Loader />
      ) : (
        <div className="wrap flex flex-col">
          <div className="heading-tag flex aic jc s16 font b6">
            <div>CREATE NEW CONTROLPOINT</div>
          </div>
          <div className="field-block flex flex-col">
            <div className="fields-row flex aic">
              <div className="field-item-l flex flex-col">
                <div className="lbl">Select ControlPoint Family</div>
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
                          <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div>
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Company Filter"
                          >
                            {selectedfamily
                              ? selectedfamily.deviceName
                              : "ControlPoint family"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="arrow s12 c666 anim" /> */}
                      <div>
                        <ArrowDownIcon />
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
                            setSelectedfamily(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div>
                            <span className="unit-eng flex aic font s14 b4">
                              {item.deviceName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-item-r flex flex-col">
                <div className="lbl">Put Tag ID</div>
                <input
                  type="text"
                  className="txt-input cleanbtn"
                  placeholder="Put Tag ID"
                  value={tagId}
                  onChange={(e) => settagId(e.target.value)}
                />
              </div>
            </div>
            <div className="fields-row flex aic">
              <div
                style={{
                  color: gowithoutsubfamily ? "grey" : "",
                }}
                className="field-item-l flex flex-col"
              >
                <div className="lbl">Select ControlPoint Sub-Family</div>
                <div className="dropDown flex aic jc flex-col rel">
                  <div className="category flex aic">
                    <div
                      className="cbox cleanbtn flex aic rel"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!gowithoutsubfamily) {
                          setHide2(!hide2);
                        }
                      }}
                    >
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div>
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Company Filter"
                          >
                            {selectedSubfamily
                              ? selectedSubfamily.subfamilyname
                              : "ControlPoint Sub-Family"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="arrow s12 c666 anim" /> */}
                      <div>
                        <ArrowDownIcon />
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {selectedfamily?.subfamilies?.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide2(!hide2);
                            setSelectedSubfamily(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div>
                            <span className="unit-eng flex aic font s14 b4">
                              {item.subfamilyname}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-item-r flex flex-col">
                <div className="lbl">Building Name</div>
                <input
                  type="text"
                  className="txt-input cleanbtn"
                  placeholder="Building Name"
                  value={buildingname}
                  onChange={(e) => setbuildingname(e.target.value)}
                />
              </div>
            </div>
            <div className="fields-row flex aic">
              <div className="field-item-l flex aic">
                <div className="lbl mr-10">Go Without Sub-Family</div>
                <button
                  onClick={(e) => {
                    setgowithoutsubfamily(!gowithoutsubfamily);
                  }}
                  className={`cleanbtn radio-btn rel ${
                    gowithoutsubfamily ? "on" : ""
                  }`}
                />
              </div>
            </div>
            <div className="fields-row flex aic">
              <div className="field-item-l flex flex-col">
                <div className="lbl">Select Template</div>
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
                          <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div>
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Company Filter"
                          >
                            {selectedcontrolpoint
                              ? selectedcontrolpoint.controlpointname
                              : "Template"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="arrow s12 c666 anim" /> */}
                      <div>
                        <ArrowDownIcon />
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide3 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {gowithoutsubfamily
                        ? selectedfamily?.nonsubfamilycontrolpoints?.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="slt flex aic"
                                onClick={(e) => {
                                  setHide3(!hide3);
                                  setSelectedcontrolpoint(item.controlpoint);
                                }}
                              >
                                <div className="unit-name flex aic font s14 b4">
                                  <div className="icon-fire flex aic jc ">
                                    <FireCaylinder />
                                  </div>
                                  <span className="unit-eng flex aic font s14 b4">
                                    {item?.controlpoint?.controlpointname}
                                  </span>
                                </div>
                              </div>
                            )
                          )
                        : selectedSubfamily?.controlpoints?.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="slt flex aic"
                                onClick={(e) => {
                                  setHide3(!hide3);
                                  setSelectedcontrolpoint(item);
                                }}
                              >
                                <div className="unit-name flex aic font s14 b4">
                                  <div className="icon-fire flex aic jc ">
                                    <FireCaylinder />
                                  </div>
                                  <span className="unit-eng flex aic font s14 b4">
                                    {item.controlpointname}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-item-r flex flex-col">
                <div className="lbl">Floor</div>
                <input
                  type="text"
                  className="txt-input cleanbtn"
                  placeholder="Floor"
                  value={floor}
                  onChange={(e) => setfloor(e.target.value)}
                />
              </div>
            </div>
            <div className="fields-row flex aic">
              {user.userType == "superadmin" && (
                <div className="field-item-l flex flex-col">
                  <div className="lbl">Select Company</div>
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
                            <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div>
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
                      className={`block flex aic abs ${hide4 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {companies.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide4(!hide4);
                              setSelectedCompany(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <div className="icon-fire flex aic jc ">
                                <FireCaylinder />
                              </div>
                              <span className="unit-eng flex aic font s14 b4">
                                {item}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="field-item-r flex flex-col">
                <div className="lbl">Location</div>
                <input
                  type="text"
                  className="txt-input cleanbtn"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                />
              </div>
            </div>
            <div className="fields-row flex aic">
              <div className="field-item-l flex flex-col">
                <div className="lbl">Manufacturing Date</div>
                <div className="date-picker flex aic jc pointer">
                  <Datetime
                    closeOnSelect={true}
                    value={
                      manufacturingdate
                        ? manufacturingdate
                        : new Date().getTime()
                    }
                    onChange={(value) => {
                      setmanufacturingdate(new Date(value).getTime());
                    }}
                    timeFormat={false}
                    dateFormat="DD-MM-YYYY"
                    className="start-date cleanbtn pointer"
                  />
                  <CalendarTodayIcon className="calender-icon" />
                </div>
              </div>
            </div>
            <div className="heading-tag-2 flex aic jc s16 font b6">
              <div>Manufacturing & Expiry dates</div>
            </div>
            <div className="fields-row flex aic">
              <div className="field-item-r flex flex-col">
                <div className="lbl">Expiry Date</div>
                <div
                  // to={"/syncfusion-calender"}
                  className="txt-input b6 s18 flex aic jc pointer"
                  onClick={(e) => {
                    setOpen5(true);
                  }}
                >
                  {syncfusionselected
                    ? `${moment(syncfusionselected[0]?.StartTime).format(
                        "D"
                      )}-${moment(syncfusionselected[0]?.StartTime).format(
                        "MM"
                      )}-${moment(syncfusionselected[0]?.StartTime).format(
                        "YYYY"
                      )} -
                  ${moment(syncfusionselected[0]?.EndTime).format(
                    "D"
                  )}-${moment(syncfusionselected[0]?.EndTime).format(
                        "MM"
                      )}-${moment(syncfusionselected[0]?.EndTime).format(
                        "YYYY"
                      )},
                  ${
                    syncfusionselected[0]?.RecurrenceRule
                    ?
                    syncfusionselected[0]?.RecurrenceRule?.split(";")[0]?.split(
                      "="
                    )[1]
                    :
                    ''
                  }`
                    : "Select Expiry Date"}
                </div>
              </div>
              </div>
            {
            reminderselections.map((mainitem,mainindex) => <>
              <div className="fields-row flex aic">
                <div className="field-item-r flex flex-col">
                  <div className="lbl">Days before</div>
                  <input
                    type="number"
                    className="txt-input cleanbtn"
                    placeholder="Days before"
                    value={mainitem.daysbefore}
                    onChange={(e) => {
                      reminderselections[mainindex]['daysbefore'] = e.target.value
                      setreminderseletions([...reminderselections])
                    }}
                  />
                </div>
              </div>
            
            <div className="fields-row flex aic">
              <div className="data-item flex aic">
                <div className="txt-field flex flex-col">
                  <div className="lbl s12 font">User Selection</div>
                  <div
                    className="search-box txt  flex flex-col rel pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      reminderselections[mainindex]['showList'] = !reminderselections[mainindex]['showList']
                      setreminderseletions([...reminderselections])
                      //setShowList(!item.showList);
                    }}
                  >
                    <div className="txt-box flex aic">
                      <div
                        // type="text"
                        className="flex aic txt-b s12 cleanbtn flex-wrap"
                        // value={selectedUsers}
                      >
                        {mainitem.selectedUsers?.map((item, index) => (
                          <div className="flex s12">
                            {item.userName}, {""}
                          </div>
                        ))}
                      </div>
                      <div
                        className="icon flex aic jc pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          reminderselections[mainindex]['showList'] = !reminderselections[mainindex]['showList']
                          setreminderseletions([...reminderselections])
                        }}
                      >
                        <ArrowDownIcon />
                      </div>
                    </div>
                    <div
                      className={`list-box flex flex-col abs ${
                        reminderselections[mainindex]['showList'] ? "show" : ""
                      }`}
                    >
                      <div
                        className="txt-search flex aic"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          className="txt-s cleanbtn"
                          placeholder="Search users"
                          onChange={(e) => setsearch(e.target.value)}
                        />
                        <div className="icon flex aic jc">
                          <SearchIcon />
                        </div>
                      </div>
                      <div className="user-list flex flex-col">
                        {userList?.map((item, index) =>
                          search.toLowerCase() ? (
                            item.userName.toLowerCase().search(search) > -1 && (
                              <div className="list-item flex aic">
                                <div className="name s13 font b5">
                                  {item.userName}
                                </div>
                                {mainitem?.selectedUsers?.findIndex((item2) =>  item2.userName == item.userName) > -1 ? (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      const index = mainitem.selectedUsers.findIndex((item2) =>  item2.userName == item.userName);
                                      console.log("mod_selector", index);
                                      const mod_selector = mainitem.selectedUsers.splice(
                                        index,
                                        1
                                      );
                                      console.log("mod_selector", mod_selector);
                                      console.log("mod_selector", selectedUsers);
                                      //reminderselections[index]['daysbefore'] = e.target.value
                                      setreminderseletions([...reminderselections]);
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
                                      reminderselections[mainindex]['selectedUsers'] = [...mainitem.selectedUsers,item]
                                      setreminderseletions([...reminderselections]);
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
                              {mainitem?.selectedUsers?.findIndex((item2) =>  item2.userName == item.userName) > -1 ? (
                                <div
                                  className="action-ico pointer"
                                  onClick={(e) => {
                                    const index = mainitem.selectedUsers.findIndex((item2) =>  item2.userName == item.userName);
                                    console.log("mod_selector", index);
                                    const mod_selector = mainitem.selectedUsers.splice(
                                      index,
                                      1
                                    );
                                    console.log("mod_selector", mod_selector);
                                    console.log("mod_selector", selectedUsers);
                                    //reminderselections[index]['daysbefore'] = e.target.value
                                    setreminderseletions([...reminderselections]);
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
                                    reminderselections[mainindex]['selectedUsers'] = [...mainitem.selectedUsers,item]
                                    setreminderseletions([...reminderselections]);
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
              </div>
            </div>
            </>
            )}
            <div className="add-new-field flex">
              <div
                onClick={() => {
                  setreminderseletions([
                    ...reminderselections,
                    {
                      daysbefore : '',
                      selectedUsers : [],
                      showList : false
                    }
                  ])
                }}
                className="btn font b5 s13 "
              >
                + Add More
              </div>
            </div>
            <div className="fields-row flex aic">
              <button
                className="btn-cancle button cleanbtn"
                onClick={(e) => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => createnewtag()}
                className="btn-create button cleanbtn"
              >
                Create Controlpoint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewNFCTag;
