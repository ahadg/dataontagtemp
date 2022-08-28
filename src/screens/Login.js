import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loaduser } from "../actions/auth";
import { ToastContainer, toast } from 'react-toastify';
const Login = ({ history }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const login = async () => {
    try {
      if(!email || !password){
        return toast.error("Please input all fields");
      }
      else if(password.length < 7)
      {
        return toast.error("Password length should'nt be less than 7");
      }
      const res = await axios.post(
        `${process.env.REACT_APP_END_URL}api/signin`,
        {
          email,
          password,
        }
      );
      console.log("response_checks", res.data);
      if (res.data) {
        // callme()
        localStorage.setItem(
          "dataontag12344H",
          JSON.stringify({ token: res.data.token })
        );
        console.log("inside");
        dispatch(loaduser());
        history.push("/");
      }
      //navigation.navigate('homeScreen')
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
  const keyupListener = (e, keyCode, callback) => {
    var key = e.which || e.keyCode;
    key === keyCode && callback();
  };
  return (
    <div className="login-p flex flex-col aic">
      <div className="wrapper">
        <div className="logo flex aic">
          <img src="./images/banner-logo.svg" className="img" />
        </div>
        <div className="title font s32 b5 c000">Login</div>
        <div className="feild flex flex-col">
          <div className="lbl font s14 c68">Email</div>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="text"
            className="iput font s14 c000"
          />
        </div>
        <div className="feild flex flex-col">
          <div className="lbl font s14 c68">Password</div>
          <input
            onKeyUp={(e) => {
              keyupListener(e, 13, () => {
                login();
              });
            }}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="iput font s14 c000"
          />
        </div>
        <div
          className="feild btn flex flex-col"
          // style={{
          //   color: "#686868",
          //   borderColor: "#686868",
          // }}
        >
          <button
            style={{
              height: "50px",
              color: "#fff",
            }}
            onClick={login}
            className="btn button"
          >
            Login
          </button>
        </div>
        <Link to="/forgot" className="font s14 c68">
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default Login;
