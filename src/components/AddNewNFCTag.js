import React, { useState, useEffect } from "react";
import { ArrowDownIcon, FireCaylinder } from "../svg";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
const AddNewNFCTag = ({ families, setfamilies, setOpen, setloading }) => {
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [selectedState2, setSelectedState2] = useState();
  const [selectedState3, setSelectedState3] = useState();
  const [selectedState4, setSelectedState4] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [buildingname, setbuildingname] = useState("");
  const [floor, setfloor] = useState("");
  const [location, setlocation] = useState("");
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [tagId, settagId] = useState();

  const createnewtag = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createtag`,
        {
          familyId: selectedState._id,
          subfamilyId: selectedState2._id,
          controlpointId: selectedState3._id,
          tagId,
          location: {
            floor,
            location,
            buildingname,
          },
          startDate,
          endDate,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setfamilies(res.data.families);
        setOpen(false);
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
      <div className="wrap flex flex-col">
        <div className="heading-tag flex aic jc s16 font b6">
          <div>CREATE BNEW NFC TAG</div>
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
                          {selectedState
                            ? selectedState.deviceName
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
                          setSelectedState(item);
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
            <div className="field-item-l flex flex-col">
              <div className="lbl">Select ControlPoint Sub-Family</div>
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
                        <div className="icon-fire flex aic jc ">
                          <FireCaylinder />
                        </div>
                        <span
                          className="unit-eng flex aic font s14 b4"
                          placeholder="Company Filter"
                        >
                          {selectedState2
                            ? selectedState2.subfamilyname
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
                    {selectedState?.subfamilies?.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide2(!hide2);
                          setSelectedState2(item);
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
            <div className="field-item-l flex flex-col">
              <div className="lbl">Select ControlPoint Type</div>
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
                          {selectedState3
                            ? selectedState3.controlpointname
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
                    {selectedState2?.controlpoints?.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide3(!hide3);
                          setSelectedState3(item);
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
              {/* <div className="lbl">Select Company</div>
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
                          {selectedState
                            ? selectedState.title
                            : "Company Filter"}
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
                    {statusData.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide4(!hide4);
                          setSelectedState(item);
                        }}
                      >
                        <div className="unit-name flex aic font s14 b4">
                          <div className="icon-fire flex aic jc ">
                            <FireCaylinder />
                          </div>
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

          <div className="heading-tag-2 flex aic jc s16 font b6">
            <div>Manufacturing & Expiry date</div>
          </div>

          <div className="fields-row flex aic">
            <div className="field-item-l flex flex-col">
              <div className="lbl">Manufacturing Date</div>
              <div className="date-picker flex aic jc pointer">
                <Datetime
                  closeOnSelect={true}
                  value={startDate ? startDate : new Date().getTime()}
                  onChange={(value) => {
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
              Create NFC TAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewNFCTag;
