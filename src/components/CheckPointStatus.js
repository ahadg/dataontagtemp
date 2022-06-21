import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DownloadImg from "./DownloadImg";
import { CloseIcon, CloseSmall, CheckSmall } from "../svg";
import { ToastContainer, toast } from 'react-toastify';
const CheckPointStatus = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { checklists } = data;
  console.log("This is my checklist: " + JSON.stringify(checklists));
  const [issueimage, setissueimage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  return (
    <div className="check-point flex flex-col">
      <div className="check-point-header flex jc">
        <div className="box-h flex aic jc">
          <div className="lbl b7 flex jc aic font">CHECKPOINT STATUS</div>
        </div>
        <div
          className="cross-icon pointer"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="check-list flex flex-col">
        {checklists?.map((item, index) => {
          return item.status == "normal" ? (
            <div className="check-item flex flex-col">
              <div className="item-header flex aic">
                <div className="header-left flex flex-col">
                  <div className="tag b6 font">Check {index + 1}</div>
                  <div className="des s12 b5 font">CO2 fire extinguisher</div>
                </div>
                <div className="header-right flex aic">
                  <div className="status-icon flex aic jc green">
                    <CheckSmall />
                  </div>
                  <div className="status-tag b7">Normal</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="check-item flex flex-col">
              <div className="item-header flex aic">
                <div className="header-left flex flex-col">
                  <div className="tag b6 font">Check {index + 1}</div>
                  <div className="des s12 b5 font">CO2 fire extinguisher</div>
                </div>
                <div className="header-right flex aic">
                  <div className="status-icon flex aic jc red">
                    <CloseSmall />
                  </div>
                  <div className="status-tag b7">Abnormal</div>
                </div>
              </div>
              <div className="item-detail flex aic">
                <div className="detail-left flex flex-col">
                  <div className="warning-tag s12 font b5">Issue</div>
                  <div className="warning-desc s12 b5 font">{item.issue}</div>
                </div>
                <div className="detail-right flex">
                  <div
                    className="pointer"
                    onClick={(e) => {
                      setOpen(false);
                      setOpen2(true);
                      setissueimage(item.image);
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_END_URL}${item.image}.jpeg`}
                      className="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-box">
          <DownloadImg data={issueimage} />
        </div>
      </Dialog>
    </div>
  );
};

export default CheckPointStatus;
