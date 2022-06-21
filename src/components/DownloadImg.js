import React, { useState, useEffect } from "react";
import { DownloadIcon } from "../svg";

const DownloadImg = ({ data }) => {
  const { issueimage } = issueimage;
  return (
    <div
      className="download-img flex"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_END_URL}${issueimage}.jpeg)`,
      }}
    >
      <div className="download-btn flex">
        <button className="btn cleanbtn">
          <DownloadIcon />
          <div className="lbl s12 font ">Download</div>
        </button>
      </div>
    </div>
  );
};

export default DownloadImg;
