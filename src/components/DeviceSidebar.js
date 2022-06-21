import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeCircle, ConnectIcon } from "../svg";

const DeviceSidebar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { showRightbar } = useSelector((state) => state.generalReducers);

  useEffect(async () => {
    document.body.addEventListener("click", () => {
      dispatch({ type: "SHOW_RIGHT_BAR", payload: false });
      document.body.style.overflowY = "auto";
    });
  }, []);

  return (
    <div
      className={`device-sidebar fixed rel anim ${
        showRightbar ? "show" : "hide"
      }`}
    >
      <div
        className={`side-block flex col anim ${showRightbar ? "show" : "hide"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hdr flex rel aic jc">
          <div className="circle abs">
            <TimeCircle />
            <div className="timer-block flex aic jc flex-col">
              <div className="lbl-time">LAST RUNTIME</div>
              <div className="timer">15:30</div>
            </div>
          </div>
        </div>
        <div className="device-info flex flex-col">
          <div className="info-item flex aic">
            <div className="left flex aic">
              <div className="icon flex aic jc">
                <ConnectIcon />
              </div>
              <div className="lbl">IP Address</div>
            </div>
            <div className="right flex">
              <div className="val">192 : 168 : 142.1</div>
            </div>
          </div>
          <div className="info-item flex aic">
            <div className="left flex aic">
              <div className="icon flex aic jc">
                <ConnectIcon />
              </div>
              <div className="lbl">Plug ID</div>
            </div>
            <div className="right flex">
              <div className="val">192 : 168 : 142.1</div>
            </div>
          </div>
          <div className="info-item flex aic">
            <div className="left flex aic">
              <div className="icon flex aic jc">
                <ConnectIcon />
              </div>
              <div className="lbl">Amperes Consumed</div>
            </div>
            <div className="right flex">
              <div className="val">192 : 168 : 142.1</div>
            </div>
          </div>
          <div className="info-item flex aic">
            <div className="left flex aic">
              <div className="icon flex aic jc">
                <ConnectIcon />
              </div>
              <div className="lbl">Added Date</div>
            </div>
            <div className="right flex">
              <div className="val">192 : 168 : 142.1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceSidebar;
