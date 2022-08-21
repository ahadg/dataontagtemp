import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  CameraIcon,
  ArrowDownIcon,
  FireCaylinder,
  RoundAdd,
  RoundRemoveIcon,
  SearchIcon,
} from "../svg/index";
import axios from "axios";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const EditUser = ({ setOpen, companyfilter, getusers, selecteduser }) => {
  console.log('companyfilter',companyfilter)
  const user = useSelector((state) => state.generalReducers.user);
  const [showList, setShowList] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [search, setsearch] = useState("");
  const [selectedcontrolpoints,setselectedcontrolpoints] = useState([])
  const [img, setImg] = useState();
  const [img2, setImg2] = useState(selecteduser.image);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [selectedCompany2, setselectedcompany2] = useState(
    selecteduser.createdBy
  );
  const [selectedrole, setSelectedrole] = useState();
  const [selectedtemplate, setselectedtemplate] = useState();
  const [controlpoints, setcontrolpoints] = useState([]);
  const [roles, setroles] = useState([
    { id: 1, title: "Super admin", value: "superadmin" },
    { id: 2, title: "Company admin", value: "companyadmin" },
    { id: 3, title: "Company user", value: "companyuser" },
    { id: 4, title: "Maintenance admin", value: "maintaineradmin" },
    { id: 5, title: "Maintenance user", value: "maintaineruser" },
    { id: 5, title: "User", value: "user" },
  ]);
  useEffect(() => {
    const foundrole = roles.find((item) => {
      return selecteduser.userType == item.value;
    });
    setSelectedrole(foundrole);
  }, []);
  console.log("selecteduser", selecteduser);
  console.log("selecteduser", selectedCompany2);
  const [userName, setuserName] = useState(selecteduser.userName);
  const [email, setemail] = useState(selecteduser.email);
  const [mobile, setmobile] = useState(selecteduser.mobile);
  const [password, setpassword] = useState();
  const [companyRef, setselectedcompanyRef] = useState("");
  const [loading, setloading] = useState(false);
  const [companyName, setcompanyName] = useState(false);

  const getcontrolpointlist = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getcontrolpointlist`
      );
      console.log("response_checks-getcontrolpointlist", res.data);
      if (res.data) {
        setcontrolpoints(res.data.controlpoints);
      }
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      } else {
        return toast.error("Error in server");
      }
    }
  };

  const edituser = async (id) => {
    let formData = new FormData();
    setloading(true);
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    //console.log(body)
    setloading(true);
    formData.append("file", img);
    let body;
    if (selectedrole?.value != "companyadmin") {
      body = {
        id: selecteduser._id,
        userName,
        email,
        mobile,
        password,
        confirmPassword: password,
        companyRef: selectedCompany2._id,
        userType: selectedrole?.value,
        selectedcontrolpoints
      };
    } else {
      body = {
        id: selecteduser._id,
        userName,
        email,
        mobile,
        password,
        confirmPassword: password,
        companyName,
        userType: selectedrole?.value,
        selectedcontrolpoints
      };
    }
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/edituser`,
        formData,
        config
      );
      console.log(res2);
      setloading(false);
      setOpen(false);
      getusers();
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      } else {
        return toast.error("Error in server");
      }
    }
    //})
  };
  console.log('controlpoints',controlpoints)
  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
    if (user.userType == "superadmin") {
      getcontrolpointlist();
    }
  }, []);
  return (
    <div className="add-new-user flex flex-col">
      <div className="asd-header flex aic jc">
        <div className="lbl s16 b6 font">Edit USER</div>
      </div>
      <div className="user-info flex">
        <div className="select-img flex aic jc">
          <div
            className="img-box flex flex-col aic jc"
            onClick={() => document.getElementById("upload_img").click()}
          >
            {img ? (
              <img
                style={{ width: "160px", height: "120px" }}
                src={URL.createObjectURL(img)}
                className="img"
              />
            ) : (
              <img
                // style={{ width: "160px", height: "120px"}}
                src={`${process.env.REACT_APP_END_URL}${img2}`}
                className="img"
              />
            )}
            <input
              type="file"
              accept="image/*"
              title=""
              id="upload_img"
              className="select-file cleanbtn"
              onChange={(e) => {
                let file = e.target.files[0];
                //setImg(e.target.files[0]);
                setImg(file);
              }}
            />
          </div>
        </div>
        <div className="info-right flex flex-col">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Name</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Email</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="asd-header-b flex flex-col aic">
        {/* <div className="lbl s14 b6 font">Other Information</div> */}
      </div>
      <div className="user-data flex flex-col">
        <div className="data-item flex  aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Password</div>
            <input
              type="password"
              className="txt cleanbtn s12 font"
              placeholder="********"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Phone Number</div>
            <input
              type="number"
              className="txt cleanbtn s12 font"
              placeholder="Phone Number"
              value={Number(mobile)}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>
        </div>
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Role</div>
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
                        placeholder="Role Filter"
                      >
                        {selectedrole ? selectedrole.title : "Roles Filter"}
                      </span>
                    </div>
                  </div>

                  <div className="flex aic jc">
                    <ArrowDownIcon />
                  </div>
                </div>
              </div>
              <div className={`block flex aic abs ${hide ? "show" : ""}`}>
                <div className="manue flex aic col anim">
                  {roles.map((item, index) => (
                    <div
                      key={index}
                      className="slt flex aic"
                      onClick={(e) => {
                        setHide(!hide);
                        setSelectedrole(item);
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
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">
              {selectedrole?.value != "companyadmin"
                ? "Select Company"
                : "Input company"}
            </div>
            {selectedrole?.value != "companyadmin" ? (
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
                      <div className="unit-name flex aic font s14 b4">
                        <span
                          className="unit-eng flex aic font s14 b4"
                          placeholder="Company Filter"
                        >
                          {selectedCompany2
                            ? selectedCompany2.companyName
                            : "Company Filter"}
                        </span>
                      </div>
                    </div>

                    <div className="flex aic jc">
                      <ArrowDownIcon />
                    </div>
                  </div>
                </div>
                <div className={`block flex aic abs ${hide2 ? "show" : ""}`}>
                  <div className="manue flex aic col anim">
                    {companyfilter.map((item, index) => (
                      <div
                        key={index}
                        className="slt flex aic"
                        onClick={(e) => {
                          setHide2(!hide2);
                          setselectedcompany2(item);
                        }}
                      >
                        <div className="unit-name flex aic font s14 b4">
                          <span className="unit-eng flex aic font s14 b4">
                            {item.companyName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <input
                type="text"
                className="txt cleanbtn s12 font"
                placeholder="Company name"
                onChange={(e) => setcompanyName(e.target.value)}
              />
            )}
          </div>
        </div>
        {/* <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Select Template</div>
            <div className="dropDown flex aic jc flex-col rel">
              <div className="category flex aic">
                <div
                  className="cbox cleanbtn flex aic rel"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHide3(!hide);
                  }}
                >
                  <div className="slt flex aic">
                    <div className="unit-name flex aic font s14 b4">
                      <span
                        className="unit-eng flex aic font s14 b4"
                        placeholder="Role Filter"
                      >
                        {selectedtemplate
                          ? selectedtemplate.controlpointname
                          : "Template Filter"}
                      </span>
                    </div>
                  </div>

                  <div className="flex aic jc">
                    <ArrowDownIcon />
                  </div>
                </div>
              </div>
              <div className={`block flex aic abs ${hide3 ? "show" : ""}`}>
                <div className="manue flex aic col anim">
                  {controlpoints?.map((item, index) => (
                    <div
                      key={index}
                      className="slt flex aic"
                      onClick={(e) => {
                        setHide3(!hide3);
                        setselectedtemplate(item)
                      }}
                    >
                      <div className="unit-name flex aic font s14 b4">
                        <span className="unit-eng flex aic font s14 b4">
                          {item.controlpointname}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="fields-row flex aic">
          <div className="data-item flex aic">
            <div className="txt-field flex flex-col">
              <div className="lbl s12 font">Template Selection</div>
              <div
                className="search-box txt  flex flex-col rel pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowList(!showList);
                }}
              >
                <div className="txt-box flex aic">
                  <div
                    // type="text"
                    className="flex aic txt-b s12 cleanbtn flex-wrap"
                    // value={selectedUser}
                  >
                    {selectedcontrolpoints?.map((item, index) => (
                      <div className="flex s12">
                        {item.controlpointname}, {""}
                      </div>
                    ))}
                  </div>
                  <div
                    className="icon flex aic jc pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowList(!showList);
                    }}
                  >
                    <ArrowDownIcon />
                  </div>
                </div>
                <div
                  className={`list-box flex flex-col abs ${
                    showList ? "show" : ""
                  }`}
                >
                  <div
                    className="txt-search flex aic"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      className="txt-s cleanbtn"
                      placeholder="Search users"
                      onChange={(e) => setsearch(e.target.value)}
                    />
                    <div className="icon flex aic jc">
                      <SearchIcon />
                    </div>
                  </div>
                  <div className="user-list flex flex-col">
                  {controlpoints?.map((item, index) =>
                          search?.toLowerCase() ? (
                            item?.controlpointname?.toLowerCase()?.search(search) > -1 && (
                              <div className="list-item flex aic">
                                <div className="name s13 font b5">
                                  {item.controlpointname}
                                </div>
                                {selectedcontrolpoints.findIndex((item2) =>  item2.controlpointname == item.controlpointname) > -1 ? (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      const index = selectedcontrolpoints.findIndex((item2) =>  item2.controlpointname == item.controlpointname);
                                      console.log("mod_selector", index);
                                      const mod_selector = selectedcontrolpoints.splice(
                                        index,
                                        1
                                      );
                                      console.log("mod_selector", mod_selector);
                                      console.log("mod_selector", selectedcontrolpoints);
                                      setselectedcontrolpoints([...selectedcontrolpoints]);
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundRemoveIcon />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="action-ico pointer"
                                    onClick={(e) => {
                                      setselectedcontrolpoints([
                                        ...selectedcontrolpoints,
                                        item,
                                      ]);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <div className="action-icon">
                                      <RoundAdd />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          ) : (
                            <div className="list-item flex aic">
                              <div className="name s13 font b5">
                                {item.controlpointname}
                              </div>
                              {selectedcontrolpoints.findIndex((item2) =>  item2.controlpointname == item.controlpointname) > -1 ? (
                                <div
                                  className="action-ico pointer"
                                  onClick={(e) => {
                                    const index = selectedcontrolpoints.findIndex((item2) =>  item2.controlpointname == item.controlpointname);
                                    console.log("mod_selector", index);
                                    const mod_selector = selectedcontrolpoints.splice(
                                      index,
                                      1
                                    );
                                    console.log("mod_selector", mod_selector);
                                    console.log("mod_selector", selectedcontrolpoints);
                                    setselectedcontrolpoints([...selectedcontrolpoints]);
                                  }}
                                >
                                  <div className="action-ico">
                                    <RoundRemoveIcon />
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="action-ico pointer"
                                  onClick={(e) => {
                                    setselectedcontrolpoints([
                                      ...selectedcontrolpoints,
                                      item,
                                    ]);
                                  }}
                                >
                                  <div className="action-icon">
                                    <RoundAdd />
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action flex aic">
        <button
          onClick={() => setOpen(false)}
          className="btn cleanbtn button s14 font"
        >
          Cancel
        </button>
        <button
          onClick={() => edituser()}
          className="btn cleanbtn button s14 font"
        >
          Edit User
        </button>
      </div>
    </div>
  );
};

export default EditUser;
