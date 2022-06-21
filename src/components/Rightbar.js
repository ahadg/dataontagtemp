import React from "react";
import { MenuIcon } from "../svg";
import { useDispatch, useSelector } from "react-redux";

const Rightbar = ({ header, title, name, children }) => {
  const dispatch = useDispatch();
  const { showRightbar } = useSelector((state) => state.generalReducers);

  return (
    <>
      <div
        className={`right-bar-cmp flex flex-col fixed ${name} ${
          showRightbar ? "sho" : "hid"
        }`}
      >
        {header && (
          <div className="hdr flex aic">
            <button
              className="menu-btn cleanbtn flex aic"
              onClick={() => {
                dispatch({ type: "SHOW_RIGHT_BAR", payload: false });
              }}
            >
              <div className="font s24 c333">&times;</div>
            </button>
            <div className="title font s18 c000">{title}</div>
          </div>
        )}
        <div>{children}</div>
      </div>
      <div className="clear-right-bar-cmp" />
    </>
  );
};

export default Rightbar;
