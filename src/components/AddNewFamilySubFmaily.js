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
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify';
const AddNewFamilySubFmaily = ({getfamilies,families,setOpen,HandleTextField}) => {

    const [hide, setHide] = useState(false);
    const [selectedState, setSelectedState] = useState();
    const [selection, setSelection] = useState(true);
    const [selection1, setSelection1] = useState(false);
    const [selection2, setSelection2] = useState(false);
    const [file1, setfile1] = useState("");
    const [familyname, setfamilyname] = useState("");
    const [subfamilydata, setsubfamilydata] = useState([
      { subfamilyname: "", image: "" },
    ]);
    const [loading,setloading] = useState(false)
    console.log("selection", selection);
    console.log("selection1", selection1);
    console.log("selection2", selection2);
    useEffect(() => {
      document.addEventListener("click", () => {
        setHide(false);
      });
    }, []);

    const createsubfamily = async (id) => {
      for (const item of subfamilydata) {
        let formData = new FormData();
        const config = {
          header: {
            "content-type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        };
        //console.log(body)
        formData.append("file", item.image);
        const body = {
          familyid: id,
          subfamilyname: item.subfamilyname,
        };
        console.log(body);
        formData.append("data", JSON.stringify(body));
        try {
          let res2 = await axios.post(
            `${process.env.REACT_APP_END_URL}api/createsubfamily`,
            formData,
            config
          );
          console.log(res2);
          setloading(false)
          getfamilies();
        } catch (error) {
          console.log("error1", error);
          if (error.response) {
            if (error.response.data) {
              console.log("error", error.response.data);
            }
          }
        }
      }
      //})
    };

    const createfamily = async () => {
      let formData = new FormData();
      const config = {
        header: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };
      //console.log(body)
      formData.append("file", file1);
      const body = {
        familyname,
      };
      console.log(body);
      formData.append("data", JSON.stringify(body));
      try {
        let res2 = await axios.post(
          `${process.env.REACT_APP_END_URL}api/createfamily`,
          formData,
          config
        );
        console.log(res2);
        getfamilies();
        setloading(false)
        return res2;
      } catch (error) {
        console.log("error1", error);
        if (error.response) {
          if (error.response.data) {
            console.log("error", error.response.data);
          }
        }
      }
    };
    const submitdata = async () => {
      setloading(true)
      if (selection) {
        await createfamily();
        setOpen(false);
      } else if (selection1) {
        await createsubfamily(selectedState._id);
        setOpen(false);
      } else if (selection2) {
        const res = await createfamily();
        if (res?.data?.success == "true") {
          console.log("got inn");
          await createsubfamily(res?.data?.family?._id);
          setOpen(false);
        }
      }
    };

    return (
      <div className="create-family flex">
        {loading  ?
         <Loader />
         :
        <div className="wrap flex flex-col">
          <div className="family-heading s16 font b6 flex aic jc">
            CREATE Family OR Sub-Family
          </div>

          <div className="family-option flex aic">
            <div className="select-item flex aic">
              <div className="radito-select flex je">
                <div className="c555 b4 font lbl">Family</div>
                <button
                  onClick={(e) => {
                    setSelection(true);
                    setSelection1(false);
                    setSelection2(false);
                  }}
                  className={`cleanbtn radio-btn rel ${selection ? "on" : ""}`}
                />
              </div>
              <div className="radito-select flex je">
                <div className="c555 b4 font lbl">Sub-Family</div>
                <button
                  onClick={(e) => {
                    setSelection(false);
                    setSelection1(true);
                    setSelection2(false);
                  }}
                  className={`cleanbtn radio-btn rel ${selection1 ? "on" : ""}`}
                />
              </div>
              <div className="radito-select flex je">
                <div className="c555 b4 font lbl">Both</div>
                <button
                  onClick={(e) => {
                    setSelection(false);
                    setSelection1(false);
                    setSelection2(true);
                  }}
                  className={`cleanbtn radio-btn rel ${selection2 ? "on" : ""}`}
                />
              </div>
            </div>
          </div>
          {selection ? (
            <div className="control-field flex flex-col">
              <div className="lbl s13 font">Family Name</div>
              <input
                type="text"
                className="txt cleanbtn s14 b4 font"
                placeholder="Family Name"
                onChange={(e) => setfamilyname(e.target.value)}
              />
            </div>
          ) : selection1 ? (
            <>
              <div className="control-field flex flex-col">
                <div className="lbl s13 font">Family Name</div>
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
                          <span
                            className="unit-eng flex aic font s14 b4"
                            placeholder="Family Name"
                          >
                            {selectedState
                              ? selectedState.deviceName
                              : "Family Name"}
                          </span>
                        </div>
                      </div>
                      {/* <div className="arrow s12 c666 anim icon-chevron-down" /> */}
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
                            setSelectedState(item);
                          }}
                        >
                          <div className="unit-name flex aic font s14 b4">
                            <span className="unit-eng flex aic font s14 b4">
                              {item.deviceName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {subfamilydata.map((item, index) => {
                return (
                  <HandleTextField
                    key={index}
                    item={item}
                    myindex={index}
                    subfamilydata={subfamilydata}
                    setsubfamilydata={setsubfamilydata}
                  />
                );
              })}
              <div className="add-new-field flex">
                <div
                  onClick={() => {
                    setsubfamilydata([
                      ...subfamilydata,
                      { subfamilyname: "", image: "" },
                    ]);
                  }}
                  className="btn font b5 s13 "
                >
                  + More Sub-Family
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="control-field flex flex-col">
                <div className="lbl s13 font">Family Name</div>
                <input
                  type="text"
                  className="txt cleanbtn s14 b4 font"
                  placeholder="Family Name"
                  onChange={(e) => setfamilyname(e.target.value)}
                />
              </div>
              {subfamilydata.map((item, index) => {
                return (
                  <HandleTextField
                    key={index}
                    item={item}
                    myindex={index}
                    subfamilydata={subfamilydata}
                    setsubfamilydata={setsubfamilydata}
                  />
                );
              })}
              <div className="add-new-field flex">
                <div
                  onClick={() => {
                    setsubfamilydata([
                      ...subfamilydata,
                      { subfamilyname: "", image: "" },
                    ]);
                  }}
                  className="btn font b5 s13 "
                >
                  + More Sub-Family
                </div>
              </div>
            </>
          )}
          {selection || selection2 ? (
            <div
              className="select-img flex flex-col aic jc"
              onClick={() => document.getElementById("upload_img").click()}
            >
              {file1 ? (
                <img
                  style={{ width: "60px", height: "60px" }}
                  src={URL.createObjectURL(file1)}
                  className="img"
                />
              ) : (
                <>
                  <div className="icon-camera">
                    <CameraIcon />
                  </div>
                  <div className="lbl s12">Choose Family Image</div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                title=""
                id="upload_img"
                className="select-file cleanbtn"
                onChange={(e) => {
                  //let file = e.target.files[0];
                  setfile1(e.target.files[0]);
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="action-box flex aic">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="btn btn-cancel button cleanbtn s15 font"
            >
              Cancel
            </button>
            <button
              onClick={submitdata}
              className="btn btn-create button cleanbtn s15 font"
            >
              Create Family
            </button>
          </div>
        </div>
        }
      </div>
    );
  };


  export default AddNewFamilySubFmaily;