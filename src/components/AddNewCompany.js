import React, { useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useDispatch, useSelector } from "react-redux";
import { CameraIcon, ArrowDownIcon, FireCaylinder,RoundAdd,
  RoundRemoveIcon,
  SearchIcon, } from "../svg/index";
import axios from "axios";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
const AddNewCompany = ({ setOpen, companies, getcompanies,controlpoints }) => {
  const user = useSelector((state) => state.generalReducers.user);
  const [img, setImg] = useState();
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [selectedcontrolpoints,setselectedcontrolpoints] = useState([])
  const [selectedcompanies,setselectedcompanies] = useState([])
  const [search, setsearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [showList2, setShowList2] = useState(false);
  const [selectedrole, setSelectedrole] = useState();
  const [roles, setroles] = useState([
    { id: 1, title: "Super admin", value: "superadmin" },
    { id: 2, title: "Company admin", value: "companyadmin" },
    { id: 3, title: "Company user", value: "companyuser" },
    { id: 4, title: "Maintenance admin", value: "maintaineradmin" },
    { id: 5, title: "Maintenance user", value: "maintaineruser" },
  ]);
  const [companyname, setcompanyname] = useState("");
  const [companyemail, setcompanyemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setzipcode] = useState();
  const [loading, setloading] = useState(false);
  const [selectedtype,setselectedtype] = useState("Company")
  console.log("companies",companies)
  const validatecompanyemail = (companyemail) => {
    return companyemail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const createnewcompany = async (id) => {
    console.log('vallidd',validatecompanyemail(companyemail))
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (!companyname) {
      return toast.error("Please input an companyname.");
    } else if (!companyemail) {
      return toast.error("Please input companyemail.");
    } else if (!mobile) {
      return toast.error("Please input phone number.");
    } else if (!city) {
      return toast.error("Please input city.");
    } else if (!province) {
      return toast.error("Please input province.");
    } else if (!address) {
      return toast.error("Please input address.");
    } else if(!validatecompanyemail(companyemail)) {
      return toast.error("Please input a valid companyemail.");
    } else if(mobile.length > 12){
      return toast.error("Phone number length should'nt be greater than 12.");
    }
    setloading(true);
    formData.append("file", img);
    let body;
    body = {
      companyname,
      companyemail,
      phonenumber: mobile,
      city,
      province,
      address,
      zipcode,
      selectedcontrolpoints,
      selectedcompanies,
      selectedtype
    };
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/createcompany`,
        formData,
        config
      );
      console.log(res2);
      setloading(false);
      setOpen(false);
      getcompanies()
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
            <div className="lbl s16 b6 font">CREATE NEW COMPANY</div>
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
                <div className="lbl s12 font">Company Name</div>
                <input
                  type="text"
                  className="txt cleanbtn s12 font"
                  placeholder="Company Name"
                  onChange={(e) => setcompanyname(e.target.value)}
                />
              </div>
              <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Company email</div>
                <input
                  type="text"
                  className="txt cleanbtn s12 font"
                  placeholder="Company email"
                  onChange={(e) => setcompanyemail(e.target.value)}
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
                <div className="lbl s12 font">Phone Number</div>
                    <input
                    type="tel"
                    className="txt cleanbtn s12 font"
                    placeholder="Phone Number"
                    pattern="/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/"
                    onChange={(e) => setmobile(e.target.value)}
                    />
                </div>
                <div className="txt-field flex flex-col">
                <div className="lbl s12 font">City</div>
                    <input
                    type="city"
                    className="txt cleanbtn s12 font"
                    placeholder="City"
                    onChange={(e) => setcity(e.target.value)}
                    />
                </div>
            </div>
            <div className="data-item flex  aic">
                <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Province</div>
                    <input
                    type="province"
                    className="txt cleanbtn s12 font"
                    placeholder="Province"
                    onChange={(e) => setprovince(e.target.value)}
                    />
                </div>
                <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Address</div>
                    <input
                    type="address"
                    className="txt cleanbtn s12 font"
                    placeholder="Address"
                    onChange={(e) => setaddress(e.target.value)}
                    />
                </div>
            </div>
            <div className="txt-field flex flex-col">
                <div className="lbl s12 font">Zip</div>
                    <input
                    type="zip"
                    className="txt cleanbtn s12 font"
                    placeholder="Zip Code"
                    onChange={(e) => setzipcode(e.target.value)}
                    />
            </div>
            <div className="txt-field flex flex-col">
                <div className="lbl s12 font">
                  Select Type
                </div>
                {
                user?.userType == "superadmin" && (
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
                              {selectedtype}
                            </span>
                          </div>
                        </div>

                        <div className="flex aic jc">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide2 ? "show" : ""}`}
                    >
                      <div className="manue flex aic col anim">
                        {["Company","Maintainer"].map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic"
                            onClick={(e) => {
                              setHide2(!hide2);
                              setselectedtype(item);
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4">
                              <span className="unit-eng flex aic font s14 b4">
                                {item}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )  }
              </div>
               
            <div className="fields-row flex aic">
              <div className="data-item flex aic">
                  <div className="txt-field flex flex-col"
                  style={{width: "100%"}}
                  >
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
                            placeholder="Search template"
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
            {
            selectedtype == "Maintainer"
              &&
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
            }
            
          </div>
          <div className="action flex aic">
            <button
              onClick={() => setOpen(false)}
              className="btn cleanbtn button s14 font"
            >
              Cancel
            </button>
            <button
              onClick={() => createnewcompany()}
              className="btn cleanbtn button s14 font"
            >
              Create Company
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddNewCompany;
