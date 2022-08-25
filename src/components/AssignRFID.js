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
  AddIcon,
} from "../svg/index";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import SelectDevices from "../components/SelectDevices";

const AssignRFID = ({ setOpen2, userList, rfidlist, getrfids }) => {
  const [img, setImg] = useState();
  const [ssid, setssid] = useState("");

  const [search, setsearch] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [showList, setShowList] = useState(true);
  // const [userList, setUserList] = useState([
  //   { id: 1, user: "Muddasir Nazir" },
  //   { id: 2, user: "Ar" },
  //   { id: 3, user: "Ahad" },
  //   { id: 4, user: "Abc" },
  //   { id: 5, user: "Xyz" },
  // ]);
  const assignrfids = async (id) => {
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/assignrfids`,
        {
          devicesList,
          selectedUser,
        }
      );
      console.log(res2);
      setOpen2(false);
      getrfids();
      // setUser(res2.data.users);
      //setloading(false)
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
  const [devicesList, setDevicesList] = useState([
    { id: "", name: "", image: "" },
  ]);
  useEffect(() => {
    document.addEventListener("click", () => {
      setShowList(false);
    });
  }, []);

  return (
    <div className="assign-rfid-user flex flex-col">
      <div className="asd-header flex aic jc">
        <div className="lbl s16 b6 font">Assign RFID To User</div>
      </div>
      <div className="asd-header-b flex flex-col aic">
        {/* <div className="lbl s14 b6 font">Other Information</div> */}
      </div>
      <div className="group-data flex flex-col">
        <div className="data-item flex aic">
          <div className="txt-field flex flex-col">
            <div className="lbl s14 font">Select User</div>
            <div className="search-box txt  flex flex-col rel">
              <div
                className="txt-box flex aic pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowList(!showList);
                }}
              >
                <div
                  // type="text"
                  className="flex aic txt-b s12 cleanbtn flex-wrap"
                  // value={selectedUser}
                >
                  <div className="flex s12">
                    {selectedUser.userName
                      ? selectedUser.userName
                      : "Select User"}
                  </div>
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
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <div className="icon flex aic jc">
                    <SearchIcon />
                  </div>
                </div>
                <div className="user-list flex flex-col">
                  {userList.map((item, index) =>
                    search ? (
                      item.userName.search(search) > -1 && (
                        <div
                          onClick={() => {
                            setSelectedUser(item);
                          }}
                          className="list-item flex aic pointer"
                        >
                          <div className="name s13 font b5">
                            {item.userName}
                          </div>
                        </div>
                      )
                    ) : (
                      <div
                        onClick={() => {
                          setSelectedUser(item);
                        }}
                        className="list-item flex aic pointer"
                      >
                        <div className="name s13 font b5">{item.userName}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="data-item flex aic flex-col">
          <div className="txt-field flex flex-col">
            <div className="lbl s14 font">Select Devices</div>
            <div className="devices-list flex flex-col">
              {devicesList.map((item, index) => (
                <SelectDevices
                  rfidlist={rfidlist}
                  devicesList={devicesList}
                  setDevicesList={setDevicesList}
                  index={index}
                />
              ))}
            </div>
          </div>
          <div className="add-more flex">
            <div
              className="btn-add flex aic"
              onClick={(e) =>
                setDevicesList([
                  ...devicesList,
                  { id: "", name: "", image: "" },
                ])
              }
              >
              <div className="ico s18 font b6">+</div>
              <div className="lbl">Add More</div>
            </div>
          </div>
        </div>
      </div>
      <div className="action flex aic">
        <button
          onClick={() => setOpen2(false)}
          className="btn cleanbtn button s14 font"
        >
          Cancel
        </button>
        <button
          onClick={() => assignrfids()}
          className="btn cleanbtn button s14 font"
        >
          Assign Devices
        </button>
      </div>
    </div>
  );
};

export default AssignRFID;
