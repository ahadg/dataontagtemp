import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CameraIcon, ArrowDownIcon, FireCaylinder } from "../svg/index";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const AddSmartDevice = ({setOpen,getdevices,companies}) => {
  const [img, setImg] = useState();
  const [hide, setHide] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [devicename,setdevicename] = useState('')
  const [plugid,setplugid] = useState('')
  const [ssid,setssid] = useState('')
  const [disabled,setdisabled] = useState(false)
  const [password,setpassword] = useState('')
  const [ipaddress,setipaddress] = useState('')
  const [deviceamperes,setdeviceamperes] = useState('')
  const [endDate, setEndDate] = useState(new Date().getTime());
  

  const createSmartdevice = async () => {
    setdisabled(true)
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    //console.log(body)
    //setloading(true)
    if(!img){
      return toast.error("Please select an image.");
      setdisabled(false)
    }
    else if(!deviceamperes){
      return toast.error("Please input device Ampere.");
      setdisabled(false)
    }
    else if(!ipaddress){
      return toast.error("Please input Ip address.");
      setdisabled(false)
    }
    else if(!ssid){
      return toast.error("Please input ssid.");
      setdisabled(false)
    }
    else if(!plugid || !devicename){
      return toast.error("Please input all fields.");
      setdisabled(false)
    }
    else if(!selectedState){
      return toast.error("Please select a company.");
      setdisabled(false)
    }
    formData.append("file", img);
    const body = {
      deviceamperes: deviceamperes,
      ipaddress,
      password,
      ssid,
      plugid,
      devicename,
      addingdate : endDate,
      company : selectedState._id
    };
    console.log('datatobesended',body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createdevice`,
        formData,
        config
      );
      setOpen(false)
      getdevices()
      setdisabled(false)
    } catch (error) {
      setdisabled(false)
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
  return (
    <div className="add-smart-device flex flex-col">
      <div className="asd-header flex aic jc">
        <div className="lbl s16 b6 font">Add Smart Devices</div>
      </div>
      <div className="device-info flex">
        <div className="select-img flex">
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
                  <div className="img-lbl s14 font b5">Choose Device Image</div>
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
              onChange={(e) => setdevicename(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Plug ID</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Plug ID"
              onChange={(e) => setplugid(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="asd-header-b flex flex-col aic">
        <div className="lbl s14 b6 font">Other Information</div>
      </div>
      <div className="device-data flex flex-col">
        <div className="data-item flex  aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">SSID</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="SSID"
              onChange={(e) => setssid(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Password</div>
            <input
              type="password"
              className="txt cleanbtn s12 font"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        </div>
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">IP Address</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="IP Address"
              onChange={(e) => setipaddress(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Device Amperes</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Device Amperes"
              onChange={(e) => setdeviceamperes(e.target.value)}
            />
          </div>
        </div>
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Adding Date</div>
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
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Company Name</div>
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
                      {/* <div className="icon-fire flex aic jc ">
                        <FireCaylinder />
                      </div> */}
                      <span
                        className="unit-eng flex aic font s14 b4"
                        placeholder="Company Name"
                      >
                        {selectedState ? selectedState.companyname : "Company Name"}
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
                  {companies.map((item, index) => (
                    <div
                      key={index}
                      className="slt flex aic"
                      onClick={(e) => {
                        setHide(!hide);
                        setSelectedState(item);
                      }}
                    >
                      <div className="unit-name flex aic font s14 b4">
                        {/* <div className="icon-fire flex aic jc ">
                          <FireCaylinder />
                        </div> */}
                        <span className="unit-eng flex aic font s14 b4">
                          {item.companyname}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action flex aic">
        <button 
        onClick={() => setOpen(false)}
        className="btn cleanbtn button s14 font">Cancel</button>
        <button 
        onClick={createSmartdevice}
        disabled={disabled}
        className="btn cleanbtn button s14 font">Add Device</button>
      </div>
    </div>
  );
};

export default AddSmartDevice;
