import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { SearchIcon, PlusIcon, ArrowDownIcon } from "../svg";
const Companies = () => {
  return (
    <>
      <Header title="Company Managment" />
      <div className="users-p company-p sidebar-gap">
        <div className="title-blk flex aic">
          <div className="lit flex aic">
            <div className="title font s20 b6 c000 upc">Users</div>
          </div>
          <div className="rit flex aix">
            <button className="cleanbtn add-btn flex aic">
              <div className="ico">
                <PlusIcon />
              </div>
              <div className="txt s15 b5 cfff">Add User</div>
            </button>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Companies;
