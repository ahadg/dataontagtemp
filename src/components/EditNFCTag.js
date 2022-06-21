import React, { useState, useEffect } from "react";
import { ArrowDownIcon, FireCaylinder } from "../svg";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import Lottie from "react-lottie";
import LoadPage from "./LoadPage.json";
import { ToastContainer, toast } from 'react-toastify';
const EditNFCTag = ({
  families,
  setfamilies,
  edittagdata,
  setOpen3,
  setloading,
  companies,
  userList,
  getfamilies
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadPage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState(edittagdata.tagIds?.selectedchecklistname);
  const [selectedfamily, setSelectedfamily] = useState();
  const [selectedSubfamily, setSelectedSubfamily] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [companymodified,setcompanymodified] = useState(false)
  const [familmodified,setfamilmodified] = useState(false)
  const [selectedUser, setSelectedUser] = useState(edittagdata.tagIds?.selectedUser);
  const [gowithoutsubfamily, setgowithoutsubfamily] = useState(edittagdata?.subfamily ? false : true);
  const [subfamilymodified,setsubfamilymodified] = useState(edittagdata.tagIds?.gowithoutsubfamily)
  const [templatemodified,settemplatemodified] = useState(false)
  const [checklists,setchecklists] = useState(['Maintainer Admin','Maintainer User','Company Admin','Company User'])
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [buildingname, setbuildingname] = useState(
    edittagdata.tagIds?.location?.buildingname
  );
  const [floor, setfloor] = useState(edittagdata.tagIds?.location?.floor);
  const [location, setlocation] = useState(
    edittagdata.tagIds?.location?.location
  );
  const [startDate, setStartDate] = useState(
    new Date(Number(edittagdata.tagIds?.manufacturingdate)).getTime()
  );
  const [endDate, setEndDate] = useState(
    new Date(Number(edittagdata.tagIds?.expirydate)).getTime()
  );
  const [tagId, settagId] = useState(edittagdata.tagIds?.tagId);
  console.log("edittagdata", edittagdata);
  console.log(
    "startDate",
    new Date(edittagdata.tagIds?.manufacturingdate).getTime(),
    startDate
  );
  console.log(
    "endDate",
    new Date(edittagdata.tagIds?.expirydate).getTime(),
    endDate
  );
  const [selectedPriority, setSelectedPriority] = useState(edittagdata.tagIds?.priority);
  const [loader,setloader] = useState(false)
  useEffect(() => {
    setSelectedfamily(edittagdata.family)
    setSelectedSubfamily(edittagdata.subfamily)
    setSelectedTemplate(edittagdata.controlpoint)
    setSelectedCompany(edittagdata.family.createdBy.companyName)
},[])

  const editnfc = async () => {
    try {
      setloading(true);
      setloader(true)
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/editnfctag`,
        {
          controlpointId: edittagdata.controlpoint._id,
          tagId,
          location: {
            floor,
            location,
            buildingname,
          },
          startDate,
          endDate,
          edittagdata,
          familmodified,
          subfamilymodified,
          templatemodified,
          companymodified,
          selectedCompany,
          selectedUser : selectedUser._id,
          selectedSubfamily,
          selectedTemplate,
          selectedfamily,
          gowithoutsubfamily
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        //setfamilies(res.data.families);
        getfamilies()
        setloading(false);
        setOpen3(false);
        setloader(false)
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

  console.log("families", families);
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
        <div className="empty-loader flex aic jc">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      ) : (
      <div className="wrap flex flex-col">
        <div className="heading-tag flex aic jc s16 font b6">
          <div>Edit Controlpoint</div>
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
                            : "Company Filter"}
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
                          setfamilmodified(true)
                          setSelectedSubfamily('')
                          setSelectedTemplate('')
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
              <div className="lbl">Tag ID</div>
              <input
                style={{ color: "#a6a6a6" }}
                type="text"
                className="txt-input cleanbtn"
                placeholder="Put Tag ID"
                value={tagId}
                onChange={(e) => settagId(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="fields-row flex aic">
            <div 
             style={{
              color : gowithoutsubfamily ? 'grey' : ''
            }}
            className="field-item-l flex flex-col">
              <div className="lbl">Select ControlPoint Sub-Family</div>
              <div className="dropDown flex aic jc flex-col rel">
                <div className="category flex aic">
                  <div
                    className="cbox cleanbtn flex aic rel"
                    onClick={(e) => {
                      e.stopPropagation();
                      if(!gowithoutsubfamily){
                        setHide2(!hide2);
                      }
                      //setHide2(!hide2);
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
                          setsubfamilymodified(true)
                          setSelectedTemplate('')
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
                  className={`cleanbtn radio-btn rel ${gowithoutsubfamily ? "on" : ""}`}
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
                          {selectedTemplate
                            ? selectedTemplate.controlpointname
                            : "ControlPoint Type"}
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
                    {selectedSubfamily?.controlpoints?.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide3(!hide3);
                          setSelectedTemplate(item);
                          settemplatemodified(true)
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
                    ))}
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
                        {/* <div className="icon-fire flex aic jc ">
                          <FireCaylinder />
                        </div> */}
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
                    {/* <div className="arrow s12 c666 anim" /> */}
                    <div>
                      <ArrowDownIcon />
                    </div>
                  </div>
                </div>
                <div className={`block flex aic abs ${hide4 ? "show" : ""}`}>
                  <div className="manue flex aic col anim">
                    {companies.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide4(!hide4);
                          setSelectedCompany(item);
                          setcompanymodified(true)
                          setSelectedTemplate('')
                          setSelectedSubfamily('')
                          setSelectedfamily('')
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
                <div className="lbl">Select Priority</div>
                <div className="dropDown flex aic jc flex-col rel">
                  <div className="category flex aic">
                    <div
                      className="cbox cleanbtn flex aic rel"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHide7(!hide7);
                      }}
                    >
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          {/* <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div> */}
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Select Checklist"
                          >
                            {selectedPriority
                              ? selectedPriority
                              : "Maintenance Priority"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ArrowDownIcon />
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide7 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {["High",'Medium',"Low"].map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide7(!hide7);
                            setSelectedPriority(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            {/* <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div> */}
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
            </div>

          <div className="heading-tag-2 flex aic jc s16 font b6">
            <div>Manufacturing & Expiry date</div>
          </div>
          <div className="fields-row flex aic">
              <div className="field-item-l flex flex-col">
                <div className="lbl">Select Checklist</div>
                <div className="dropDown flex aic jc flex-col rel">
                  <div className="category flex aic">
                    <div
                      className="cbox cleanbtn flex aic rel"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHide5(!hide5);
                      }}
                    >
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          {/* <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div> */}
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Select Checklist"
                          >
                            {selectedChecklist
                              ? selectedChecklist
                              : "Select Checklist"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ArrowDownIcon />
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide5 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {checklists.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide5(!hide5);
                            setSelectedChecklist(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            {/* <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div> */}
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
              <div className="field-item-r flex flex-col">
                <div className="lbl">User Selection</div>
                <div className="dropDown flex aic jc flex-col rel">
                  <div className="category flex aic">
                    <div
                      className="cbox cleanbtn flex aic rel"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHide6(!hide6);
                      }}
                    >
                      <div className="slt flex aic">
                        <div className="unit-name flex aic font s14 b4">
                          {/* <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div> */}
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="User Selection"
                          >
                            {selectedUser
                              ? selectedUser.userName
                              : "User Selection"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <ArrowDownIcon />
                      </div>
                    </div>
                  </div>
                  <div className={`block flex aic abs ${hide6 ? "show" : ""}`}>
                    <div className="manue flex aic col anim">
                      {userList.map((item, index) => (
                        <div
                          key={index}
                          className="slt flex aic"
                          onClick={(e) => {
                            setHide6(!hide6);
                            setSelectedUser(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            {/* <div className="icon-fire flex aic jc ">
                              <FireCaylinder />
                            </div> */}
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
            </div>
          <div className="fields-row flex aic">
            <div className="field-item-l flex flex-col">
              <div className="lbl">Manufacturing Date</div>
              <div className="date-picker flex aic jc pointer">
                <Datetime
                  closeOnSelect={true}
                  value={startDate}
                  onChange={(value) => {
                    console.log("value", new Date(value).getTime());
                    setStartDate(new Date(value).getTime());
                  }}
                  timeFormat={false}
                  dateFormat="DD-MM-YYYY"
                  className="start-date cleanbtn pointer"
                />
                <CalendarTodayIcon className="calender-icon" />
              </div>
            </div>
            <div className="field-item-r flex flex-col">
              <div className="lbl">Expiry Date</div>
              <div className="date-picker flex aic jc">
                <Datetime
                  closeOnSelect={true}
                  value={endDate}
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
          <div className="fields-row flex aic">
            <button
              className="btn-cancle button cleanbtn"
              onClick={(e) => setOpen3(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => editnfc()}
              className="btn-create button cleanbtn"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default EditNFCTag;
