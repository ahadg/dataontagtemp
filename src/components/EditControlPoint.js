import React, { useState, useEffect } from "react";
import { Header } from ".";
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
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
const EditControlPoint = ({ setOpenEditCtrlPoint,selectedFamily,selectedSubfamily,selectedControlpoint,getfamilies }) => {
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [selectedState2, setSelectedState2] = useState();
  const [controlpointname, setcontrolpointname] = useState(selectedControlpoint.controlpointname);
  const [controlpointimage, setcontrolpointimage] = useState();
  const [loading, setloading] = useState(false);
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);
  console.log('selectedControlpoint',selectedControlpoint)

  const editcontrolpoint = async (id) => {
      setloading(true)
      let formData = new FormData();
      const config = {
        header: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };
      //console.log(body)
      formData.append("file", controlpointimage);
      const body = {
        //image : controlpointimage,
        id: selectedControlpoint.id,
        controlpointname : controlpointname
      };
      console.log(body);
      formData.append("data", JSON.stringify(body));
      try {
        let res2 = await axios.post(
          `${process.env.REACT_APP_END_URL}api/editcontrolpoint`,
          formData,
          config
        );
        console.log(res2);
      } catch (error) {
        console.log("error1", error);
        if (error.response) {
          if (error.response.data) {
            console.log("error", error.response.data);
          }
        }
      }
    getfamilies();
    setloading(false)
    setOpenEditCtrlPoint(false)
    //})
  };

  return (
    <div className="create-new-controal-point flex">
      {loading && <Loader />}
      <div className="wrap flex flex-col">
        <div className="controal-point-heading s16 font b6 flex aic jc">
          TEMPLATE
        </div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">ControlPoint Family</div>
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
                  <div className="unit-name flex aic font s14 b4 font">
                  <div className="d-img flex aic jc">
                    <img
                      src={`${process.env.REACT_APP_END_URL}${selectedFamily?.image}`}
                      className="img"
                      />
                  </div>
                    <span
                      className="unit-eng flex aic font s14 b4 font"
                      placeholder="ControlPoint Family"
                    >
                      {selectedFamily
                        ? selectedFamily.deviceName
                        : "ControlPoint Family"}
                    </span>
                  </div>
                </div>
                {/* <div>
                  <ArrowDownIcon />
                </div> */}
              </div>
            </div>
            {/* <div className={`block flex aic abs ${hide ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {statusData.map((item, index) => (
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
                      <span className="unit-eng flex aic font s14 b4 font">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">ControlPoint Sub-Family</div>
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
                  <div className="unit-name flex aic font s14 b4 font">
                  <div className="d-img flex aic jc">
                    <img
                      src={`${process.env.REACT_APP_END_URL}${selectedSubfamily?.image}`}
                      className="img"
                      />
                  </div>
                    <span
                      className="unit-eng flex aic font s14 b4 font"
                      placeholder="ControlPoint Sub-Family"
                    >
                      {selectedSubfamily
                        ? selectedSubfamily.subfamilyname
                        : "ControlPoint Sub-Family"}
                    </span>
                  </div>
                </div>
                {/* <div>
                  <ArrowDownIcon />
                </div> */}
              </div>
            </div>
            {/* <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {statusData.map((item, index) => (
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
                      <span className="unit-eng flex aic font s14 b4 font">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Template Name</div>
          <input
            type="text"
            className="txt cleanbtn s14 b4 font"
            placeholder="Template Name"
            onChange={(e) => setcontrolpointname(e.target.value)}
            value={controlpointname}
          />
        </div>
        <div
          className="select-img flex flex-col aic jc"
          onClick={() => document.getElementById("upload_img").click()}
        >
          <div className="icon-camera">
            {controlpointimage ? (
              <img
                style={{ width: "20px", height: "20px" }}
                src={URL.createObjectURL(controlpointimage)}
                className="img"
              />
            ) : (
              <img
                style={{ width: "20px", height: "20px" }}
                src={`${process.env.REACT_APP_END_URL}${selectedControlpoint.image}`}
                className="img"
              />
            )}
          </div>
          {/* <div className="lbl s12">Choose Template Image</div> */}
          <input
            type="file"
            accept="image/*"
            title=""
            id="upload_img"
            className="select-file cleanbtn"
            onChange={(e) => {
              let file = e.target.files[0];
              //setImg(e.target.files[0]);
              setcontrolpointimage(file);
            }}
          />
        </div>
        <div className="action-box flex aic">
          <button
            onClick={() => {
              setOpenEditCtrlPoint(false);
            }}
            className="btn btn-cancel button cleanbtn s15 font"
          >
            Cancel
          </button>
          <button 
          onClick={editcontrolpoint}
          className="btn btn-create button cleanbtn s15 font">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditControlPoint;
