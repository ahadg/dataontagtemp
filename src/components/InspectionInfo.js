import React, { useState, useEffect } from "react";

import {
  FamilyTreeIcon,
  MultiUserIcon,
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

const InspectionInfo = ({ setOpen,selectedinspection }) => {
  const [detected, setDetected] = useState(true);

  const [devicesInfo, setDevicesInfo] = useState([
    { name: "Work Helmet", id: "FG125464512321", status: "Detected" },
    { name: "Work Gloves", id: "FG125464512321", status: "Detected" },
    { name: "Work Glasses", id: "FG125464512321", status: "Not Found" },
  ]);

  return (
    <div className="inspection-info flex flex-col">
      <div className="inspection-hdr flex aic">
        <div className="lbl flex aic jc">Inspection INFO</div>
        <div className="ico flex pointer" onClick={(e) => setOpen(false)}>
          <CloseIcon />
        </div>
      </div>
      <div className="meta flex flex-col">
        <div className="about-user flex">
          <div className="img-side flex aic jc">
           <img style={{borderRadius : '50%'}}  src={`${process.env.REACT_APP_END_URL}${selectedinspection.userRef?.image}`} className="img" />
          </div>
          <div className="info-side flex flex-col jc">
            <div className="user-name">{selectedinspection.userRef?.userName} ({selectedinspection.userRef?.userType})</div>
            <div className="user-co">Company : {selectedinspection?.userCreatedBy?.companyName}</div>
          </div>
        </div>
        <div className="device-lbl flex aic jc">Assigned Devices</div>
        <div className="device-info flex flex-col">
          {selectedinspection?.detectedDevices.map((item, i) => (
            <div className="device-item flex aic">
              <div className="left flex aic">
                <div className="img-box flex aic jc">
                <img style={{borderRadius : '50px'}}  src={`${process.env.REACT_APP_END_URL}${item.deviceRef?.image}`} className="img" />
                </div>
                <div className="about-device felx flex-col">
                  <div className="dev-name">{item.deviceRef?.deviceName}</div>
                  <div className="dev-id">
                    <span className="b5">RFID </span>: {item.deviceRef?.rfid}
                  </div>
                </div>
              </div>
              <div className="right flex">
                <div
                  className={`btn-status button ${
                    item.detected ? "bg-green" : "bg-red"
                  }`}
                >
                  Detected
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectionInfo;
