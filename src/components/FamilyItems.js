import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Dialog from "@mui/material/Dialog";
import {
  SearchIcon,
  PlusIcon,
  FamilyTreeIcon,
  ArrowDownIcon,
  FilterIcon,
  RoundAdd,
  EditIcon,
  FireCaylinder,
  DeleteIcon,
  CameraIcon,
} from "../svg";
import axios from "axios";

const FamilyItems = ({ data,setcontrolpoint }) => {
    const { subfamilyname, controlpoints } = data;
    console.log("_subfamily", data);
    const [show, setShow] = useState(false);
    const [listItem, setListItem] = useState([
      { txt: "Controlpoint Sub-Family 1" },
      { txt: "Controlpoint Sub-Family 2" },
      { txt: "Controlpoint Sub-Family 3" },
      { txt: "Controlpoint Sub-Family 4" },
    ]);
    return (
      <div className={`family-item flex flex-col ${show ? "bg-color" : ""}`}>
        <div className={`item-head flex aic jc ${show ? "bd-b" : ""}`}>
          <div
            className="title-lbl flex aic"
            onClick={(e) => {
              setShow(!show);
            }}
          >
            <div className="icon-fire flex aic jc">
              <img
                style={{ width: 15, height: 15, borderRadius: "50%" }}
                src={`${process.env.REACT_APP_END_URL}${data.image}`}
                className="img"
              />
            </div>
            <div className="lbl font s14">{subfamilyname}</div>
            <div className="ico">
              <ArrowDownIcon />
            </div>
          </div>
          <div className="ico-edit pointer flex aic jc">
            <EditIcon />
          </div>
        </div>
        <div
          className={`family-detail flex flex-col aic jc ${show ? "show" : ""}`}
        >
          {controlpoints.map((item, index) => (
            <div
              onClick={() => setcontrolpoint(item)}
              className="detail-item flex aic"
            >
              <div className="icon-cyc flex aic jc">
                <FireCaylinder />
              </div>
              <div className="detail-lbl b5 s12">{item.controlpointname}</div>
              <div className="ico flex aic jc">
                <EditIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default FamilyItems;