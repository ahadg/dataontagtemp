import React, { useState, useEffect } from "react";

const DeviceHistory = () => {
  const tblData = [
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
    { name: "Alessio Bacin", date: "20-06-202 00:12", time: "47 mins" },
  ];
  return (
    <div className="device-history flex flex-col">
      <div className="device-history-wrap flex flex-col">
        <div className="device-history-tag">Device Info & History</div>
        <div className="device-info flex aic jc">
          <div className="device-img flex aic jc">
            <img src="./images/img-device.png" className="img" />
          </div>
          <div className="device-meta flex flex-col">
            <div className="device-name">Drill Machine</div>
            <div className="device-id">Plug Id : 124597133F224</div>
          </div>
        </div>
        <div className="tbl-block flex flex-col">
          <div className="tbl flex flex-col">
            <div className="row flex">
              <div className="row-item">User Name</div>
              <div className="row-item">Date & Time</div>
              <div className="row-item">Uptime</div>
            </div>
            {tblData.map((item, index) => (
              <div className="row flex">
                <div className="row-item">{item.name}</div>
                <div className="row-item">{item.date}</div>
                <div className="row-item">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceHistory;
