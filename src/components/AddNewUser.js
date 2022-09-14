import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CameraIcon, ArrowDownIcon, FireCaylinder ,RoundAdd,
  RoundRemoveIcon,
  SearchIcon,} from "../svg/index";
import axios from "axios";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const AddNewUser = ({ setOpen, companyfilter, getusers,companies }) => {
  const [img, setImg] = useState();
  const user = useSelector((state) => state.generalReducers.user);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedCompany2, setselectedcompany2] = useState();
  const [selectedrole, setSelectedrole] = useState();
  const [search, setsearch] = useState("");
  const [roles, setroles] = useState([
    { id: 1, title: "Super admin", value: "superadmin" },
    { id: 2, title: "Company admin", value: "companyadmin" },
    { id: 3, title: "Company user", value: "companyuser" },
    { id: 4, title: "Maintenance admin", value: "maintaineradmin" },
    { id: 5, title: "Maintenance user", value: "maintaineruser" },
  ]);
  const [userName, setuserName] = useState("");
  const [showList2, setShowList2] = useState(false);
  const [selectedcompanies,setselectedcompanies] = useState([])
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [companyRef, setselectedcompanyRef] = useState("");
  const [loading, setloading] = useState(false);
  const [companyName, setcompanyName] = useState(false);
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const createnewuser = async (id) => {
    console.log('vallidd',validateEmail(email))
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (!userName) {
      return toast.error("Please input an username.");
    } else if (!email) {
      return toast.error("Please input email.");
    } else if (!mobile) {
      return toast.error("Please input phone number.");
    } else if(!validateEmail(email)) {
      return toast.error("Please input a valid email.");
    } else if (!password) {
      return toast.error("Please input password.");
    } else if (password != confirmpassword) {
      return toast.error("Password confirmation does not matched.");
    } else if(mobile.length > 12){
      return toast.error("Phone number length should'nt be greater than 12.");
    }
    // else if(password){
    //   return toast.error("your password was'nt matched.");
    // }
    else if (
      (selectedrole.title == "Company user" && !selectedCompany2) ||
      (selectedrole.title == "Maintenance user" && !selectedCompany2)
    ) {
      return toast.error("Please select a company.");
    } else if (!selectedrole) {
      return toast.error("Please select a role.");
    }
    //console.log(body)
    setloading(true);
    formData.append("file", img);
    let body;
    if (selectedrole.title == "Company user" || selectedrole.title == "Maintenance user") {
      body = {
        userName,
        email,
        mobile,
        password,
        confirmPassword: password,
        companyRef: selectedCompany2._id,
        userType: selectedrole?.value,
        selectedcompanies
      };
    } else {
      body = {
        userName,
        email,
        mobile,
        password,
        confirmPassword: password,
        companyName,
        userType: selectedrole?.value,
        selectedcompanies
      };
    }
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/register`,
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
          setloading(false);
          console.log("error", error.response.data);
          return toast.error(error.response.data.error);
        }
      } else {
        setloading(false);
        return toast.error("Error in server");
      }

    }
    //})
  };

  // const getcompanies = async () => {
  //   try {
  //     setloading(true);
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_END_URL}api/getallusers`,
  //     );
  //     console.log("response_checks", res.data);
  //     if (res.data) {
  //       // setfamilies(res.data.families);
  //       // setOpen(false);
  //       // setloading(false);
  //     }
  //   } catch (error) {
  //     console.log("error1", error);
  //     if (error.response) {
  //       if (error.response.data) {
  //         console.log("error", error.response.data);
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    //getcompanies()
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);
  return (
    <div className="add-new-user flex flex-col">
      {loading ? (
        <div className="flex aic jc">
          <Loader loader_color={true} />
        </div>
      ) : (
        <>
          <div className="asd-header flex aic jc">
            <div className="lbl s16 b6 font">CREATE NEW USER</div>
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
                  <>
                    <CameraIcon />
                  </>
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
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Email</div>
                <input
                  type="text"
                  className="txt cleanbtn s12 font"
                  placeholder="Email"
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
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Confirm Password</div>
                <input
                  type="password"
                  className="txt cleanbtn s12 font"
                  placeholder="Confirm Password"
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
              </div>
            </div>
            <div className="data-item flex  aic">
              <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Phone Number</div>
                <input
                  type="tel"
                  className="txt cleanbtn s12 font"
                  placeholder="Phone Number"
                  pattern="/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/"
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
                      {roles.map((item, index) => {
                        if(item.value == "superadmin" && user?.userType != "superadmin"){
                          return
                        }
                        else {
                         return <div
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
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="txt-field flex flex-col">
           
              <div className="fields-row flex aic">
              <div className="data-item flex aic">
                  <div className="txt-field flex flex-col" style={{width:'100%'}}>
                    <div className="lbl s12 font">Company Selection</div>
                    <div
                      className="search-box txt  flex flex-col rel pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowList2(!showList2);
                      }}
                    >
                      <div className="txt-box flex aic">
                        <div
                          // type="text"
                          className="flex aic txt-b s12 cleanbtn flex-wrap"
                          // value={selectedUser}
                        >
                          {selectedcompanies?.map((item, index) => (
                            <div className="flex s12">
                              {item.companyname}, {""}
                            </div>
                          ))}
                        </div>
                        <div
                          className="icon flex aic jc pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowList2(!showList2);
                          }}
                        >
                          <ArrowDownIcon />
                        </div>
                      </div>
                      <div
                        className={`list-box flex flex-col abs ${
                          showList2 ? "show" : ""
                        }`}
                      >
                        <div
                          className="txt-search flex aic"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            className="txt-s cleanbtn"
                            placeholder="Search company"
                            onChange={(e) => setsearch(e.target.value)}
                          />
                          <div className="icon flex aic jc">
                            <SearchIcon />
                          </div>
                        </div>
                        <div className="user-list flex flex-col">
                        {companies?.map((item, index) =>
                                search?.toLowerCase() ? (
                                  item?.companyname?.toLowerCase()?.search(search) > -1 && (
                                    <div className="list-item flex aic">
                                      <div className="name s13 font b5">
                                        {item.companyname}
                                      </div>
                                      {selectedcompanies.findIndex((item2) =>  item2.companyname == item.companyname) > -1 ? (
                                        <div
                                          className="action-ico pointer"
                                          onClick={(e) => {
                                            const index = selectedcompanies.findIndex((item2) =>  item2.companyname == item.companyname);
                                            console.log("mod_selector", index);
                                            const mod_selector = selectedcompanies.splice(
                                              index,
                                              1
                                            );
                                            console.log("mod_selector", mod_selector);
                                            console.log("mod_selector", selectedcompanies);
                                            setselectedcompanies([...selectedcompanies]);
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
                                            setselectedcompanies([
                                              ...selectedcompanies,
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
                                      {item.companyname}
                                    </div>
                                    {selectedcompanies.findIndex((item2) =>  item2.companyname == item.companyname) > -1 ? (
                                      <div
                                        className="action-ico pointer"
                                        onClick={(e) => {
                                          const index = selectedcompanies.findIndex((item2) =>  item2.companyname == item.companyname);
                                          console.log("mod_selector", index);
                                          const mod_selector = selectedcompanies.splice(
                                            index,
                                            1
                                          );
                                          console.log("mod_selector", mod_selector);
                                          console.log("mod_selector", selectedcompanies);
                                          setselectedcompanies([...selectedcompanies]);
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
                                          setselectedcompanies([
                                            ...selectedcompanies,
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
              onClick={() => createnewuser()}
              className="btn cleanbtn button s14 font"
            >
              Create User
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewUser;
