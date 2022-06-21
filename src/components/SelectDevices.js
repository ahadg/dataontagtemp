import React, { useState, useEffect } from "react";
import {
  CameraIcon,
  ArrowDownIcon,
  FireCaylinder,
  RoundAdd,
  RoundRemoveIcon,
  SearchIcon,
  AddIcon,
} from "../svg/index";
import axios from "axios";

const SelectDevices = ({ rfidlist, devicesList, setDevicesList, index }) => {
  const [hide2, setHide2] = useState(false);
  const [selectedCompany2, setselectedcompany2] = useState();
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  useEffect(() => {
    document.addEventListener("click", () => {
      setHide2(false);
    });
  }, []);
  return (
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
            <div className="img-box flex aic jc">
              {devicesList[index].image ? (
                <img
                  src={`${process.env.REACT_APP_END_URL}${devicesList[index].image}`}
                  className="img"
                />
              ) : (
                <img src="/images/question.svg.png" className="img" />
              )}
            </div>
            <div className="unit-name flex  font s14 b4 flex-col">
              <span
                className="unit-eng flex aic font s14 b4"
                placeholder="Company Filter"
              >
                {devicesList[index].deviceName
                  ? devicesList[index].deviceName
                  : "Select Device"}
              </span>
              <span className="rf-id s12 b4 font flex aic">
                {devicesList[index].rfid
                  ? `"RFID :" ${devicesList[index].rfid}`
                  : ""}
              </span>
            </div>
          </div>

          <div className="arrow-icon flex aic jc">
            <ArrowDownIcon />
          </div>
        </div>
      </div>
      <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
        <div className="manue flex aic col anim">
          {rfidlist.map((item, index2) => {
            return (
              !item.assignedTo && (
                <div
                  key={index2}
                  className="slt flex aic"
                  onClick={(e) => {
                    setHide2(!hide2);
                    devicesList[index] = item;
                    setDevicesList([...devicesList]);
                  }}
                >
                  <div className="unit-name flex aic font s14 b4">
                    <div className="img-box flex aic jc">
                      <img
                        src={`${process.env.REACT_APP_END_URL}${item.image}`}
                        className="img"
                      />
                    </div>
                    <div className="left flex flex-col">
                      <span className="unit-eng flex aic font s14 b4">
                        {item.deviceName}
                      </span>
                      <span className="rf-id s12 b4 font flex aic">
                        RFID : {item.rfid}
                      </span>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectDevices;
