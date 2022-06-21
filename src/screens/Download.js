import React from "react";
import { Header } from "../components";
import {
  AppleIcon,
  WindowIcon,
  LinuxIcon,
  AppstoreIcon,
  PlaystoreIcon,
} from "../svg";

const Download = () => {
  return (
    <>
      <Header title="Download" hideRightbar={true} />
      <div className="download-p sidebar-gap flex flex-col">
        <div className="download-wrapper">
          <div className="title font s26 b6 c68 upc">
            Download our desktop app & mobile app
          </div>
          <div className="from font s22 c68 upc">From</div>
          <div className="wrap flex">
            <div className="blk flex aic">
              <div className="lbl font s15 b6 upc">Download for Mac OSX</div>
              <div className="ico">
                <AppleIcon />
              </div>
            </div>
            <div className="blk flex aic">
              <div className="lbl font s15 b5 upc">Download for Windowns</div>
              <div className="ico">
                <WindowIcon />
              </div>
            </div>
            <div className="blk flex aic">
              <div className="lbl font s15 b6 upc">Download for Linux</div>
              <div className="ico">
                <LinuxIcon />
              </div>
            </div>
          </div>
          <div className="app-wrap flex flex-col aic">
            <div className="app-label font s16 b6 upc c68">For Mobile App</div>
            <div className="links flex aic">
              <div className="app-item flex aic">
                <AppstoreIcon />
              </div>
              <div className="app-item flex aic">
                <PlaystoreIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;
