import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';
const UserProfile = ({location}) => {
  const dispatch = useDispatch();
  const [confirmPassword, setconfirmPassword] = useState('');
  const [password, setpassword] = useState('');
  const [nemail, setnemail] = useState('');
  const { email,type,token } = queryString.parse(location.search);
  useEffect(() => {
    setloading(false)
  },[])
  const [loading,setloading] = useState(true)
  console.log('params',queryString.parse(location.search))
  const {isAuthenticated} = useSelector(state => state.generalReducers)
  const resetpassword = async () => {
    if(!password || !confirmPassword){
        return toast.error("Please input a password!");
    }
    else if(password != confirmPassword){
        return toast.error("Your password did'nt match!");
    }
    else if(password.length < 7){
        return toast.error("password length should be greater than 6");
    }
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/resetpassword`,
        {
            email,type,token,password
        },
      );
      toast("Your password updated successfulyy!");
      if(isAuthenticated){
        window.location.href = './'
      }
      else {
        window.location.href = './login'
      }
      console.log(res2);
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error("Your Token is expired!");
        }
      }
      else {
        return toast.error("Error in server");
      }
    }
    //})
  };


  const modifyemail = async () => {
    if(!nemail){
        return toast.error("Please input an email!");
    }
    try {
      let res2 = await axios.post(
        `${process.env.REACT_APP_END_URL}api/changeemail`,
        {
            email: nemail,type,token
        },
      );
      toast("Your password updated successfulyy!");
      if(isAuthenticated){
        window.location.href = './'
      }
      else {
        window.location.href = './login'
      }
      console.log(res2);
    } catch (error) {
      console.log("error1", error);
      if (error.response) {
        if (error.response.data) {
          console.log("error", error.response.data);
          return toast.error(error?.response?.data?.error);
        }
      }
      else {
        return toast.error("Error in server");
      }
    }
    //})
  };




  return (
    <div className="user-profile">
        {
        !loading
        &&
        <>
        {
            type == "resetpassword"
            ?

        <div className="login-p flex flex-col aic">
        <div className="wrapper">
          <div className="logo flex aic">
            <img src="./images/logo-small.svg" className="img" />
          </div>
          <div className="title font s32 b5 c000">Reset password</div>
          <div className="feild flex flex-col">
            <div className="lbl font s14 c68">New password</div>
            <input type="password" 
              placeholder="New password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            className="iput font s14 c000" />
          </div>
          <div className="feild flex flex-col">
            <div className="lbl font s14 c68">Confirm password</div>
            <input type="password" 
              placeholder="New password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            className="iput font s14 c000" />
          </div>
          <div className="feild flex flex-col">
            <button 
            onClick={() => {
              resetpassword()
            }}
            className="cleanbtn submit-btn font s15 cfff">
              Reset Password
            </button>
          </div>
        </div>
      </div>
        :
        <div className="login-p flex flex-col aic">
        <div className="wrapper">
          <div className="logo flex aic">
            <img src="./images/logo-small.svg" className="img" />
          </div>
          <div className="title font s32 b5 c000">Change email address</div>
          <div className="feild flex flex-col">
            {/* <div className="lbl font s14 c68">New email address</div> */}
            <input type="email" 
              placeholder="New email address"
              className="iput font s14 c000"
              value={nemail}
              onChange={(e) => setnemail(e.target.value)}/>
          </div>
          <div className="feild flex flex-col">
            <button 
            onClick={() => {
              modifyemail()
            }}
            className="cleanbtn submit-btn font s15 cfff">
              Modify email
            </button>
          </div>
        </div>
      </div>
        }
        </>
        }
    </div>
  );
};

export default UserProfile;
