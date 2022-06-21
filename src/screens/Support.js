import React, { useState } from "react";
import { Header, Rightbar } from "../components";
import { EnvalopIcon, PhoneNumberIcon, EmailIcon } from "../svg";

const Support = () => {
  return (
    <>
      <Header title="Support" rightbarIcon="support" />
      <div className="support-p flex rel sidebar-gap">
        <div className="container flex flex-col"></div>
      </div>
    </>
  );
};

export default Support;
