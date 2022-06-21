import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  CameraIcon,
  ArrowDownIcon,
  FireCaylinder,
  Scan,
  ScanIcon,
} from "../svg/index";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const AddNewRfid = ({ setOpen,companyfilter,getrfids }) => {
  const [img, setImg] = useState();
  const [hide2, setHide2] = useState(false);
  const [selectedCompany2, setselectedcompany2] = useState();
  const [deviceName, setdeviceName] = useState("");
  const [rfid2, setrfid2] = useState("");
  const [startDate, setstartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [loading,setloading] = useState(false)
  const {socket,rfid} = useSelector((state) => state.generalReducers);
  const [scan, setScan] = useState(false);
  useEffect(() => {
    setrfid2(rfid)
 },[rfid])
  const createnewrfid = async (id) => {
    let formData = new FormData();
    setloading(true);
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    //console.log(body)
    setloading(true)
    formData.append("file", img);
    let body;
      body = {
        deviceName,
        rfid : rfid2 ,
        companyRef : selectedCompany2?._id,
        manufacturingdate : startDate,
        expirydate : endDate
      };
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createrfid`,
        formData,
        config
      );
      console.log(res2);
      getrfids()
      setloading(false);
      setOpen(false)
      //getusers()
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
    //})
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      //setHide(false);
      setHide2(false);
    });
  }, []);
  return (
    <div className="add-new-rfid flex flex-col">
      <div className="asd-header flex aic jc">
        <div className="lbl s16 b6 font">CREATE NEW RFID</div>
      </div>
      <div className="user-info flex">
        <div className="select-img flex aic jc">
          <div
            className="img-box flex flex-col aic jc"
            onClick={() => document.getElementById("upload_img").click()}
          >
            {img ? (
              <img
                style={{ width: "160px", height: "120px" }}
                src={URL.createObjectURL(img)}
                className="img"
              />
            ) : (
              <>
                <CameraIcon />
              </>
            )}
            <input
              type="file"
              accept="image/*"
              title=""
              id="upload_img"
              className="select-file cleanbtn"
              onChange={(e) => {
                let file = e.target.files[0];
                //setImg(e.target.files[0]);
                setImg(file);
              }}
            />
          </div>
        </div>
        <div className="info-right flex flex-col">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Device Name</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Device Name"
              value={deviceName}
              onChange={(e) => setdeviceName(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Scan RFID</div>
            <div className="txt-box flex aic">
              <input
                type="text"
                className="txt cleanbtn s12 font"
                placeholder="Input the ID or scan the RFID"
                value={rfid2}
                onChange={(e) => setrfid2(e.target.value)}
              />
              <div
                className={`icon flex aic jc  pointer ${scan ? "active" : ""}`}
                // onClick={(e) => setScan(true)}
              >
                <ScanIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="asd-header-b flex flex-col aic">
        {/* <div className="lbl s14 b6 font">Other Information</div> */}
      </div>
      <div className="user-data flex flex-col">
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
                        placeholder="Company Filter"
                      >
                        {selectedCompany2
                          ? selectedCompany2.companyName
                          : "Company Filter"}
                      </span>
                    </div>
                  </div>

                  <div className="flex aic jc">
                    <ArrowDownIcon />
                  </div>
                </div>
              </div>
              <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
                <div className="manue flex aic col anim">
                  {companyfilter.map((item, index) => (
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
                          {item.companyName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Manufacturing Date</div>
            <div className="date-picker flex aic jc">
              <Datetime
                closeOnSelect={true}
                value={startDate ? startDate : new Date().getTime()}
                onChange={(value) => {
                  setstartDate(new Date(value).getTime());
                }}
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                className="start-date cleanbtn"
              />
              <CalendarTodayIcon className="calender-icon" />
            </div>
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Expiry Date</div>
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
      </div>
      <div className="action flex aic">
        <button
          onClick={() => setOpen(false)}
          className="btn cleanbtn button s14 font"
        >
          Cancel
        </button>
        <button 
        onClick={() => createnewrfid(false)}
        className="btn cleanbtn button s14 font">Create RFID</button>
      </div>
    </div>
  );
};

export default AddNewRfid;
