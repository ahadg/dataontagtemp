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
import { ToastContainer, toast } from 'react-toastify';
const AddGroup = ({ setOpen5, userList, getusergroup,selectedgroup }) => {
  const [img, setImg] = useState();
  const [img2, setImg2] = useState(selectedgroup.image);
  const [ssid, setssid] = useState("");
  const [search, setsearch] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  console.log("selectedUser",selectedUser);
  const [showList, setShowList] = useState(true);
  const [loading, setloading] = useState(false);
  const [groupname, setgroupname] = useState(selectedgroup.groupname);
  // const [userList, setUserList] = useState([
  //   { id: 1, user: "Muddasir Nazir" },
  //   { id: 2, user: "Ar" },
  //   { id: 3, user: "Ahad" },
  //   { id: 4, user: "Abc" },
  //   { id: 5, user: "Xyz" },
  // ]);
  useEffect(() => {
    document.addEventListener("click", () => {
      setShowList(false);
    });
    let names = [];
    selectedgroup?.grouplist.map((item) => {
        names.push(item?._id?.userName)
    });
    setSelectedUser(names)
  }, []);

  const editgroup = async (id) => {
    let formData = new FormData();
    setloading(true);
    const config = {
      header: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    //console.log(body)
    if(!groupname){
      return toast.error("Please input an group name.");
    }
    // else if(!email){
    //   return toast.error("Please input email.");
    // }
    setloading(true);
    let grouplist = [];
    userList.map((item) => {
      if (selectedUser.includes(item.userName)) {
        grouplist.push(item);
      }
    });
    formData.append("file", img);
    let body;
    body = {
      groupname,
      grouplist,
    };
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/editgroup`,
        formData,
        config
      );
      console.log("res2", res2);
      setloading(false);
      setOpen5(false);
      getusergroup();
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
    //})
  };

  return (
    <div className="add-new-group flex flex-col">
      <div className="asd-header flex aic jc">
        <div className="lbl s16 b6 font">EDIT GROUP</div>
      </div>
      <div className="group-info flex">
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
      </div>
      <div className="asd-header-b flex flex-col aic">
        {/* <div className="lbl s14 b6 font">Other Information</div> */}
      </div>
      <div className="group-data flex flex-col">
        <div className="data-item flex  aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">Group Name</div>
            <input
              type="text"
              className="txt cleanbtn s12 font"
              placeholder="Group Name"
              onChange={(e) => setgroupname(e.target.value)}
              value={groupname}
            />
          </div>
        </div>
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s12 font">User Selection</div>
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
                  {selectedUser.map((item, index) => (
                    <div className="flex s12">
                      {item}, {""}
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
                    placeholder="Select Users For Group"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <div className="icon flex aic jc">
                    <SearchIcon />
                  </div>
                </div>
                <div className="user-list flex flex-col">
                  {userList.map((item, index) =>
                    search ? (
                        (item.userName).toLowerCase().search(search.toLowerCase()) > -1 && (
                        <div className="list-item flex aic">
                          <div className="name s13 font b5">{item.userName}</div>
                          {selectedUser.includes(item.userName) ? (
                            <div
                              className="action-ico pointer"
                              onClick={(e) => {
                                const index = selectedUser.findIndex(
                                  (item2) => {
                                    // console.log('mod_selector',item)
                                    // console.log('mod_selector',item.userName)
                                    // console.log('mod_selector',item == item.userName)
                                    return item2 == item.userName;
                                  }
                                );
                                console.log("mod_selector", index);
                                const mod_selector = selectedUser.splice(
                                  index,
                                  1
                                );
                                console.log("mod_selector", mod_selector);
                                console.log("mod_selector", selectedUser);
                                setSelectedUser([...selectedUser]);
                                e.stopPropagation()
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
                                setSelectedUser([
                                  ...selectedUser,
                                  item.userName,
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
                        <div className="name s13 font b5">{item.userName}</div>
                        {selectedUser.includes(item.userName) ? (
                          <div
                            className="action-ico pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              const index = selectedUser.findIndex((item2) => {
                                // console.log('mod_selector',item)
                                // console.log('mod_selector',item.userName)
                                // console.log('mod_selector',item == item.userName)
                                return item2 == item.userName;
                              });
                              console.log("mod_selector", index);
                              const mod_selector = selectedUser.splice(
                                index,
                                1
                              );
                              console.log("mod_selector", mod_selector);
                              console.log("mod_selector", selectedUser);
                              setSelectedUser([...selectedUser]);
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
                              e.stopPropagation()
                              setSelectedUser([...selectedUser, item.userName]);
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
      <div className="action flex aic">
        <button
          onClick={() => setOpen5(false)}
          className="btn cleanbtn button s14 font"
        >
          Cancel
        </button>
        <button
          onClick={() => editgroup()}
          className="btn cleanbtn button s14 font"
        >
          Edit Group
        </button>
      </div>
    </div>
  );
};

export default AddGroup;