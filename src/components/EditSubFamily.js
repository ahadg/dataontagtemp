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
const EditSubFmaily = ({ setOpenEditSubFamily, HandleTextField,selectedFamily,getfamilies,setSelectedSubfamily,selectedSubfamily }) => {
  console.log(selectedFamily)
  const [hide, setHide] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [file1, setfile1] = useState("");
  const [familyname, setfamilyname] = useState("");
  const [subfamilydata, setsubfamilydata] = useState([
    { subfamilyname: "", image: "" },
  ]);
  const [statusData, setStatusData] = useState([
    { id: 1, title: "NO" },
    { id: 2, title: "YES" },
  ]);
  const [subfamiliesdeletedindex,setsubfamiliesdeletedindex] = useState([])
  const [loading, setloading] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
    });
  }, []);

  useEffect(() => {
     setsubfamilydata(selectedFamily.subfamilies)
  },[])
  console.log('subfamiliesdeletedindex',subfamiliesdeletedindex)
  const deleteasubfamily = async (theindex) => {
    //let index = -1
    setloading(true)
    const body = {
      index : theindex,
      //type,
      familyid : selectedFamily._id
    };
      try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/deleteasubfamilybyindex`,
        body
      );
      setloading(false)
      } catch (error) {
        console.log("error1", error);
        if (error.response) {
          if (error.response.data) {
            console.log("error", error.response.data);
          }
        }
      }
  }

  const editsubfamily = async (id) => {
    let index = -1
    setloading(true)
    console.log('itemmmdeleted',subfamiliesdeletedindex)
    for (const item of subfamilydata) {
      index++
      console.log('itemmm',item)
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
        image : item.image,
        index,
        familyid: id,
        subfamilyname: item.subfamilyname,
        _id : item._id
        //type : 'addnew'
      };
      console.log(body);
      formData.append("data", JSON.stringify(body));
       try {
        let res2 = await axios.post(
          `${process.env.REACT_APP_END_URL}api/editsubfamily`,
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
    }
    getfamilies();
    setOpenEditSubFamily(false)
    setloading(false)
    //})
  };

  return (
    <div className="create-family flex">
      {loading ? (
        <Loader />
      ) : (
        <div className="wrap flex flex-col">
          <div className="family-heading s16 font b6 flex aic jc">
            Sub-Families
          </div>

          <div className="control-field flex flex-col">
            <div className="lbl s13 font">Family Name</div>
            <div className="dropDown flex aic jc flex-col rel">
              <div className="category flex aic">
                <div
                  className="cbox cleanbtn flex aic rel"
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   setHide(!hide);
                  // }}
                >
                  <div className="slt flex aic">
                    <div className="unit-name flex aic font s14 b4">
                      <span
                        className="unit-eng flex aic font s14 b4"
                        placeholder="Family Name"
                      >
                        {selectedFamily.deviceName}
                      </span>
                    </div>
                  </div>
                  {/* <div className="arrow s12 c666 anim icon-chevron-down" /> */}
                  {/* <div>
                    <ArrowDownIcon />
                  </div> */}
                </div>
              </div>
              <div className={`block flex aic abs ${hide ? "show" : ""}`}>
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
                        <span className="unit-eng flex aic font s14 b4">
                          {item.title}
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
                deleteonclickingminus={true}
                setsubfamiliesdeletedindex={setsubfamiliesdeletedindex}
                subfamiliesdeletedindex={subfamiliesdeletedindex}
                deleteasubfamily={deleteasubfamily}
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

          <div className="action-box flex aic">
            <button
              onClick={() => {
                setOpenEditSubFamily(false);
              }}
              className="btn btn-cancel button cleanbtn s15 font"
            >
              Cancel
            </button>
            <button 
            onClick={() => {
              editsubfamily(selectedFamily._id);
            }}
            className="btn btn-create button cleanbtn s15 font">
              Save 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSubFmaily;
