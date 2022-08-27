import React, { useState, useEffect } from "react";
import moment from "moment";
import { CopyIcon, CloseIcon } from "../svg";
import { ToastContainer, toast } from "react-toastify";
const ControlPointInfo = ({
  setOpen3,
  selectedcontrolpoint,
  theinspection,
}) => {
  console.log("selectedcontrolpoint", selectedcontrolpoint);
  console.log("theinspection", theinspection);

  const CopyFun = async (text) => {
    await navigator.clipboard.writeText(text)
    toast("Successfully Tag ID Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setOpen3(false);
  };
  return (
    <div className="control-point-info  flex flex-col">
      <div className="check-point-header flex jc">
        <div className="box-h flex aic jc">
          <div className="lbl b7 flex jc aic font">Control Point INFO</div>
        </div>
        <div
          className="cross-icon pointer"
          onClick={(e) => {
            setOpen3(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="check-points-meta flex flex-col">
        <div className="check-points-item flex aic">
          <div className="left flex aic jc">
            <img src="./images/image4.png" className="img" />
          </div>
          <div className="right flex aic jc">
            {selectedcontrolpoint.controlpointId.controlpointname}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Control point description :</div>
          <div className="right flex">
            {" "}
            {selectedcontrolpoint.controlpointId.controlpointname}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Tag ID :</div>
          <div className="right flex aic">
            {theinspection.tagId}
            <div 
            className="copy-icon flex aic jc" onClick={(e) => CopyFun(theinspection.tagId)}>
              <CopyIcon />
            </div>
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Company :</div>
          <div className="right flex">
            {selectedcontrolpoint.controlpointId?.createdBy?.companyName}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Company Address :</div>
          <div className="right flex">
            {selectedcontrolpoint.controlpointId?.createdBy?.companyAddress}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Inspector :</div>
          <div className="right flex">
            {selectedcontrolpoint?.checkedby?.userName}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Last Inspection :</div>
          <div className="right flex">21-12-2021 at 2.31pm</div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Location :</div>
          <div className="right flex">{theinspection?.location?.location}</div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Building :</div>
          <div className="right flex">
            {theinspection?.location?.buildingname}
          </div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Floor :</div>
          <div className="right flex">{theinspection?.location?.floor}</div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Status :</div>
          <div className="right flex cggg">Ok</div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Manufacturing :</div>
          <div className="right flex ">{`${moment(
            Number(theinspection.manufacturingdate)
          ).format("D")}-${moment(
            Number(theinspection.manufacturingdate)
          ).format("MM")}-${moment(
            Number(theinspection.manufacturingdate)
          ).format("YYYY")}`}</div>
        </div>
        <div className="check-points-item flex aic">
          <div className="left flex">Expiry :</div>
          <div className="right flex crrr">{`${moment(
            (theinspection.expirydate)
          ).format("D")}-${moment((theinspection.expirydate)).format(
            "MM"
          )}-${moment((theinspection.expirydate)).format("YYYY")}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ControlPointInfo;
