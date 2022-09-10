import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { CameraIcon } from "../svg";
import {loaduser} from '../actions/auth'

const UserProfile = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.generalReducers);
  const [img, setImg] = useState();
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("1234567890");
  const [mobile, setmobile] = useState(user.mobile);
  const [role, setRole] = useState(user.userType);
  const [company, setCompany] = useState(user?.companyRef?.companyName);
  console.log('user',user)
  const updateprofile = async (id) => {
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
    body = {
      userName,
    };
    console.log(body);
    formData.append("data", JSON.stringify(body));
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/updateprofile`,
        formData,
        config
      );
      console.log(res2);
      dispatch(loaduser())
      setloading(false);
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

  const updateuser = async (id) => {
    try {
       await axios.post(
        `${process.env.REACT_APP_END_URL}api/updateuser`,
        {
          userName,
          mobile
        }
      );
      dispatch(loaduser())
      toast.success("Profile updated successfully");
      setloading(false);
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

  const sendemail = async (type) => {
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/senduseremail`,
        {
          type,
          email: user.email,
        }
      );
      toast("An email has been sent!");
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
    if (img) {
      updateprofile();
    }
  }, [img]);

  return (
    <div className="user-profile">
      <Header title="User Profile" rightbarIcon="setting" />
      {loading ? (
        <Loader />
      ) : (
        <div className="user-profile-p flex rel sidebar-gap">
          <div className="container flex">
            <div className="left flex flex-col">
              <div className="asd-header flex aic jc">
                <div className="lbl s16 b6 font">Profile Info</div>
              </div>
              <div className="asd-header flex aic jc">
                <div className="lbl s16 font">Date Created : {`
                        ${moment(Number(user.createdAt ? user.createdAt : new Date(1646384612799) )).format("D")}-${moment(
                          Number(user.createdAt ? user.createdAt : new Date(1646384612799))
                        ).format("MM")}-${moment(Number(user.createdAt ? user.createdAt : new Date(1646384612799))).format(
                          "YYYY"
                        )}`}
                        {' at '}
                        {`${moment(Number(user.createdAt ? user.createdAt : new Date(1646384612799))).format("HH")}:${moment(
                          Number(user.createdAt ? user.createdAt : new Date(1646384612799))
                        ).format("mm")}`
                      }</div>
              </div>
              <div className="asd-header flex aic jc">
                <div className="lbl s16  font">Created By : {user?.createdBy?.userName}</div>
              </div>
              <div className="user-info flex">
                <div className="select-img flex aic jc">
                  <div
                    className="img-box flex flex-col aic jc"
                    onClick={() =>
                      document.getElementById("upload_img").click()
                    }
                  >
                    {!img ? (
                      <img
                        src={`${process.env.REACT_APP_END_URL}${user.image}`}
                        className="img"
                      />
                    ) : (
                      <img src={URL.createObjectURL(img)} className="img" />
                    )}

                    {/* {img ? (
                      <img
                         src={URL.createObjectURL(img)}
                        className="img"
                      />
                    ) : (
                      <>
                        <CameraIcon />
                      </>
                    )} */}
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
                    <div className="lbl s12 font">User Name</div>
                    <input
                      type="text"
                      className="txt cleanbtn s12 font"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="txt-field flex flex-col">
                    <div className="lbl s12 font">Email</div>
                    <input
                      type="mail"
                      className="txt cleanbtn s12 font bg-none"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="asd-header-b flex flex-col aic">
                {/* <div className="lbl s14 b6 font">Other Information</div> */}
              </div>
              <div className="user-data flex aic">
                <div className="txt-field flex flex-col">
                  <div className="lbl s12 font">Phone Number</div>
                  <input
                    type="tel"
                    className="txt cleanbtn s12 font"
                    placeholder="Phone Number"
                    pattern="/^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/"

                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                </div>
                <div className="txt-field flex flex-col">
                  <div className="lbl s12 font">My Company</div>
                  <input
                    type="text"
                    className="txt cleanbtn s12 font bg-none"
                    placeholder="My Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled
                  />
                </div>
                {/* <div className="txt-field flex flex-col">
                  <div className="lbl s12 font">Password</div>
                  <input
                    type="password"
                    className="txt cleanbtn s12 font bg-none"
                    placeholder="Password"
                    disabled
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div> */}
              </div>
              <div className="user-data flex aic">
                <div className="txt-field flex flex-col">
                  <div className="lbl s12 font">My Role</div>
                  <input
                    type="text"
                    className="txt cleanbtn s12 font bg-none"
                    placeholder="My Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              <div 
              className="fields-row flex aic">
              <button
                onClick={updateuser}
                className="btn-create button cleanbtn"
              >
                Update info 
              </button>
              </div>
            </div>
            <div className="right flex flex-col">
              <div className="blk">
                <div className="box flex flex-col">
                  <div className="tag">Request to Change The Password</div>
                  <div className="desc">
                    You can Receive An Email To change The Password You cannot
                    able to Change the password Without having a Same Email
                    Which is Listed on this Acount. Please Click on Change
                    Password to Change The Password.
                  </div>
                  <button
                    onClick={() => {
                      sendemail("resetpassword");
                    }}
                    className="btn button"
                  >
                    Change Password
                  </button>
                </div>
                <div className="box flex flex-col">
                  <div className="tag">Request to Change The Email</div>
                  <div className="desc">
                    You can Receive An Email To change The Eamil You cannot able
                    to Change the Email Without having a Same Email Which is
                    Listed on this Acount. Please Click on Change Email to
                    Change The Email.
                  </div>
                  <button
                    onClick={() => {
                      sendemail("modifyemail");
                    }}
                    className="btn button"
                  >
                    Change Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
