import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RoundIcon,
  ListIcon,
  UserIcon,
  NFCIcon,
  ShopIcon,
  SupportIcon,
  AccountIcon,
  ProtectionIcon,
  LogoutIcon,
  SmartDevices,
  UsersIcon,
  RifdManageIcon,
  RifdInspecIcon,
} from "../svg";

const Siderbar = ({ history }) => {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.generalReducers);

  const nav = [
    { label: "Inspection", slug: "/", icon: <RoundIcon /> },
    { label: "Template", slug: "/checkpoint", icon: <ListIcon /> },
    { label: "Controlpoint", slug: "/nfc-managment", icon: <NFCIcon /> },
    { label: "Smart Devices", slug: "/smartDevices", icon: <SmartDevices /> },
    { label: "Users Managment", slug: "/usersManagment", icon: <UsersIcon /> },
    {
      label: "RFID Managment",
      slug: "/RfidManagment",
      icon: <RifdManageIcon />,
    },
    {
      label: "RFID Inspection",
      slug: "/RfidInspection",
      icon: <RifdInspecIcon />,
    },
    {
      label: "Support Managment",
      slug: "/support-managment",
      icon: <SupportIcon />,
    },
    // {
    //   label: "Task Managment",
    //   slug: "/task-managment",
    //   icon: <ProtectionIcon />,
    // },
    // { label: "Download", slug: "/download", icon: <AccountIcon /> },
  ];

  useEffect(() => {
    document.body.addEventListener("click", () =>
      dispatch({ type: "SHOW_SIDE_BAR", payload: false })
    );
  }, []);
  const logout = () => {
    localStorage.removeItem("dataontag12344H");
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className={`sidebar-overlay abs anim ${showSidebar ? "sho" : "hid"}`}
      />
      <div
        className={`sidebar flex flex-col aic fixed anim ${
          showSidebar ? "sho" : "hid"
        }`}
      >
        <div className="meta flex">
          <Link to="/" className="logo flex aic">
            <img src="/images/logo-small.svg" className="img" />
          </Link>
        </div>
        <div className="links flex flex-col aic">
          {nav.map((item) => (
            <NavLink exact to={item.slug} className="item flex aic rel">
              <div className="ico flex aic">{item.icon}</div>
              <div className="lbl tip font s14 cfff abs anim">{item.label}</div>
            </NavLink>
          ))}
        </div>
        {/* <div className="links flex flex-col aic ">
          <div className="item flex aic rel pointer" onClick={logout}>
            <div className="ico flex aic">
              <LogoutIcon />
            </div>
            <div className="lbl tip font s14 cfff abs anim">Logout</div>
          </div>
        </div> */}
        {/* <div
         
          style={{ cursor: "pointer" }}
          className="item flex aic rel"
        >
          <div className="ico flex aic">
            <LogoutIcon />
          </div>
          <div className="lbl tip font s14 cfff abs anim">Logout</div>
        </div> */}
      </div>
    </>
  );
};

export default Siderbar;
