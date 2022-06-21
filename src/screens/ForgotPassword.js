import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
const ForgotPassword = () => {
  const [email,setemail] = useState('')
  const sendemail = async (type) => {
    if(!email){
      return toast.error("Please input your email address!");
    }
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/senduseremail`,
        {
          type : 'resetpassword',
          email : email
        },
      );
      toast("An email has been sent!");
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
    <div className="login-p flex flex-col aic">
      <div className="wrapper">
        <div className="logo flex aic">
          <img src="./images/logo-small.svg" className="img" />
        </div>
        <div className="title font s32 b5 c000">Forgot Password</div>
        <div className="feild flex flex-col">
          <div className="lbl font s14 c68">Email</div>
          <input type="email" className="iput font s14 c000" 
          value={email}
          onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="feild flex flex-col">
          <button 
          onClick={sendemail}
          className="cleanbtn submit-btn font s15 cfff">
            Reset Password
          </button>
        </div>
        <Link to="/login" className="font s14 c68">
          Or Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
