import React, { useState, useEffect } from "react";
import { Header } from "../components";
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
import { ToastContainer, toast } from 'react-toastify';
const EditFamily = ({ setOpenEditFamily,selectedFamily,getfamilies }) => {
  console.log('selectedFamily',selectedFamily)
  const [hide, setHide] = useState(false);

  const [file1, setfile1] = useState("");
  const [familyname, setfamilyname] = useState(selectedFamily.deviceName);
  const [subfamilydata, setsubfamilydata] = useState([
    { subfamilyname: "", image: "" },
  ]);
  const [loading, setloading] = useState(false);

  const editfamily = async () => {
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
      id: selectedFamily._id,
      familyname,
    };
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/editfamily`,
        formData,
        config
      );
      console.log(res2);
      getfamilies();
      setloading(false)
      setOpenEditFamily(false)
      return res2;
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      }
      else {
        return toast.error("Error in server");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
    });
  }, []);

  return (
    <div className="create-family flex">
      <div className="wrap flex flex-col">
        <div className="family-heading s16 font b6 flex aic jc">
          Family
        </div>
        <div className="control-field flex flex-col">
          <div className="lbl s13 font">Family Name</div>
          <input
            type="text"
            className="txt cleanbtn s14 b4 font"
            placeholder="Family Name"
            value={familyname}
            onChange={(e) => setfamilyname(e.target.value)}
          />
        </div>

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
                  <img
                  style={{ width: "60px", height: "60px" }}
                  src={`${process.env.REACT_APP_END_URL}${selectedFamily.image}`}
                  className="img"
                />
              </div>
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
        <div className="action-box flex aic">
          <button
            onClick={() => {
              setOpenEditFamily(false);
            }}
            className="btn btn-cancel button cleanbtn s15 font"
          >
            Cancel
          </button>
          <button 
          onClick={editfamily}
          className="btn btn-create button cleanbtn s15 font">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditFamily;
