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
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
const AddNewControlPoint = ({ getfamilies, families, setOpen2 }) => {
  const [gowithoutsubfamily, setgowithoutsubfamily] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedfamily, setSelectedfamily] = useState();
  const [selectedsubfamily, setSelectedsubfamily] = useState();
  const [controlpointname, setcontrolpointname] = useState();
  const [controlpointimage, setcontrolpointimage] = useState();
  const [loading, setloading] = useState(false)
  const [priorities,setpriorities] = useState({
    high : '',
    medium : '',
    low : ''
  })
  console.log("selectedfamily", selectedfamily);
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);

  const createControlpoint = async (id) => {
    if(!selectedfamily){
      return toast.error("Please select a controlpoint family");
    }
    else if(!gowithoutsubfamily && !selectedsubfamily){
      return toast.error("Please select a controlpoint subfamily");
    }
    else if(!controlpointname){
      return toast.error("Please input a template name");
    }
    else if(!priorities.high || !priorities.medium || !priorities.low){
      return toast.error("Please fill all priorities fields");
    }
    else if(!controlpointimage){
      return toast.error("Please input a template image");
    }
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    //console.log(body)
    setloading(true);
    formData.append("file", controlpointimage);
    const body = {
      familyid: selectedfamily._id,
      subfamilyid: selectedsubfamily?._id,
      controlpointname,
      priorities
    };
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createcontrolpoint`,
        formData,
        config
      );
      console.log(res2);
      getfamilies();
      setloading(false);
      setOpen2(false);
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
        }
      }
    }
    //})
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);

  return (
    <div className="create-new-controal-point flex">
      {loading && <Loader />}
      <div className="wrap flex flex-col">
        <div className="controal-point-heading s16 font b6 flex aic jc">
          CREATE NEW TEMPLATE
        </div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Select ControlPoint Family</div>
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
                    <div className="icon-fire flex aic jc ">
                      <FireCaylinder />
                    </div>
                    <span
                      className="unit-eng flex aic font s14 b4 font"
                      placeholder="ControlPoint Family"
                    >
                      {selectedfamily
                        ? selectedfamily.deviceName
                        : "ControlPoint Family"}
                    </span>
                  </div>
                </div>
                <div>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className={`block flex aic abs ${hide ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {families.map((item, index) => (
                  <div
                    key={index}
                    className="slt flex aic"
                    onClick={(e) => {
                      setHide(!hide);
                      setSelectedfamily(item);
                    }}
                  >
                    <div className="unit-name flex aic font s14 b4">
                      <div className="icon-fire flex aic jc ">
                        <FireCaylinder />
                      </div>
                      <span className="unit-eng flex aic font s14 b4 font">
                        {item.deviceName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {
          !gowithoutsubfamily
          &&
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Select ControlPoint Sub-Family</div>
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
                    <div className="icon-fire flex aic jc ">
                      <FireCaylinder />
                    </div>
                    <span
                      className="unit-eng flex aic font s14 b4 font"
                      placeholder="ControlPoint Sub-Family"
                    >
                      {selectedsubfamily
                        ? selectedsubfamily.subfamilyname
                        : "ControlPoint Sub-Family"}
                    </span>
                  </div>
                </div>
                <div>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
            <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
              <div className="manue flex aic col anim">
                {selectedfamily?.subfamilies?.map((item, index) => (
                  <div
                    key={index}
                    className="slt flex aic"
                    onClick={(e) => {
                      setHide2(!hide2);
                      setSelectedsubfamily(item);
                    }}
                  >
                    <div className="unit-name flex aic font s14 b4">
                      <div className="icon-fire flex aic jc ">
                        <FireCaylinder />
                      </div>
                      <span className="unit-eng flex aic font s14 b4 font">
                        {item.subfamilyname}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        }
        <div className="control-field flex aic jb">
          <div className="lbl-2 s15 b5 font">Go Without Sub-Family</div>
          <button
            onClick={(e) => {
              setgowithoutsubfamily(!gowithoutsubfamily);
            }}
            className={`cleanbtn radio-btn rel ${gowithoutsubfamily ? "on" : ""}`}
          />
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
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Maintenance Priority Setting</div>
          <div className="input-filed flex aic">
            <input
              type="text"
              className="txt-l cleanbtn s14 b4 font"
              placeholder="Maintenance Priority "
              disabled
              value={"High"}
            />
            <input
              type="number"
              className="txt-r cleanbtn s14 b4 font"
              placeholder="Days"
              value={priorities.high}
              onChange={e => setpriorities({...priorities,high : e.target.value})}
            />
          </div>
          <div className="input-filed flex aic">
            <input
              type="text"
              className="txt-l cleanbtn s14 b4 font"
              placeholder="Maintenance Priority "
              value={"Medium"}
              disabled
            />
            <input
              type="number"
              className="txt-r cleanbtn s14 b4 font"
              placeholder="Days"
              value={priorities.medium}
              onChange={e => setpriorities({...priorities,medium : e.target.value})}
            />
          </div>
          <div className="input-filed flex aic">
            <input
              type="text"
              className="txt-l cleanbtn s14 b4 font"
              placeholder="Maintenance Priority "
              value={"Low"}
              disabled
            />
            <input
              type="number"
              className="txt-r cleanbtn s14 b4 font"
              placeholder="Days"
              value={priorities.low}
              onChange={e => setpriorities({...priorities,low : e.target.value})}
            />
          </div>
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
              <CameraIcon />
            )}
          </div>
          <div className="lbl s12">Choose Template Image</div>
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
              setOpen2(false);
            }}
            className="btn btn-cancel button cleanbtn s15 font"
          >
            Cancel
          </button>
          <button
            onClick={createControlpoint}
            className="btn btn-create button cleanbtn s15 font"
          >
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewControlPoint;
