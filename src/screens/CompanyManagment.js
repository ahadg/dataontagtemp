import React, { useState, useEffect } from "react";
import { Header } from "../components";
import Modal from "../components/Modal";
import "react-datetime/css/react-datetime.css";
import {
  FamilyTreeIcon,
  MultiUserIcon,
  ArrowDownIcon,
  FilterIcon,
  SigIcon,
  RoundAdd,
  DeleteIcon,
  EditIcon,
  CloneIcon,
  SearchIcon,
  FireCaylinder,
  CameraIcon,
  ActionIcon,
} from "../svg";

import axios from "axios";
import Loader from "../components/Loader";
import moment from "moment";
import CustomDateRangeInputs from "../components/CustomDateRangeInputs";
import AddNewCompany from "../components/AddNewCompany";
import EditCompany from "../components/EditCompany";
import AddGroup from "../components/AddGroup";
import { ToastContainer, toast } from "react-toastify";

const Company = [
  { CompName: 'Newbiz',
    email: 'Newbiz@gmail.com',
    phone: '+394544313211',
    city: 'toronto',
    province: 'Itlano',
    address: '123 Main Street, New York, NY 10030',
    zip: '66001'
}
]

const CompanyManagment = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  // const [selectedCompany, setselectedcompany] = useState();
  const [selectedrole, setselectedrole] = useState();
  const [companyfilter, setcompanyfilter] = useState([]);
  const [userfilter, setuserfilter] = useState([
    { id: 1, title: "Users" },
  ]);
  const [selectedcompanyfilter, setselectedcompanyfilter] = useState({
    id: 1,
    title: "Users",
  });

  const [companies,setcompanies] = useState([])
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(undefined);
  const [groupsearch, setgroupsearch] = useState(undefined);
  const [filteruserList, setfilteruserList] = useState([]);
  const [selectedcompany, setselectedcompany] = useState({});


  const getcompanies = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getcompanies`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        // setfamilies(res.data.families);
        // setOpen(false);
        setloading(false);
        setcompanies(res.data.companies);
        setfilteruserList(res.data.users);
        setcompanyfilter(res.data.companies);
      }
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
  };


  const [userList, setuserList] = useState([
    {
      img: "./images/user55.png",
      Companyname: "Muddasir Nazir",
      copmany: "Newbiz.srl",
      mail: "muddasirnazir92@gmail.com",
      numb: "+92 306 9089531",
      Role: "Super Admin",
    },
  ]);
  const [deleteloading, setdeleteloading] = useState(false);
  const [companytobedelete, setcompanytobedelete] = useState({});
  const deletecompany = async (id) => {
    try {
      setdeleteloading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_END_URL}api/deletecompany/${companytobedelete._id}`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        getcompanies();
        setdeleteloading(false);
        setOpen3(false);
      }
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
  };

  const Confirm = () => {
    return (
      <>
        <div className="confirm-delte flex aic flex-col">
          {deleteloading ? (
            <Loader />
          ) : (
            <>
              <div className="heading-tag flex aic jc s16 font b6">
                <div>Delete Company</div>
              </div>
              <div className="desc flex aic jc s14 font b5">
                Do You Want To Delete Company?
              </div>
              <div className="actions-row flex aic">
                <button
                  className="btn-cancle button cleanbtn"
                  onClick={(e) => setOpen3(false)}
                >
                  No! Cancel
                </button>
                <button
                  onClick={() => deletecompany()}
                  className="btn-create button cleanbtn"
                >
                  Yes! Delete
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    getcompanies();
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);
  console.log('selectedcompany',selectedcompany)
  return (
    <div className="users-page">
      <Header title="Company Managment" rightbarIcon="setting" />
      {loading ? (
        <Loader loader_color={true} />
      ) : (
        <div className="users-management-p flex rel sidebar-gap">
          <div className="container flex flex-col">
            <div className="title-blk flex">
              <div className="lit flex aic">
                <div className="filter-sec flex flex-col">
                  <div className="f-head flex aic">
                    <div className="menu-icon">
                      <FilterIcon />
                    </div>
                    <div className="lbl font s18 b5">Filters</div>
                  </div>
                </div>
              </div>
              <div className="rit flex aix">
                <button
                  className="cleanbtn add-btn  flex aic"
                  onClick={(e) => setOpen(true)}
                >
                  <div className="ico">
                    <RoundAdd />
                  </div>
                  <div className="txt s12 b6 cfff">Create New Company</div>
                </button>
              </div>
            </div>
            <div className="table-block flex">
                <div className="table-sec flex flex-col">
                  <div className="tbl-row flex aic">
                    <div className="row-item">
                      <FilterIcon />
                    </div>
                    <div className="row-item">Company Name</div>
                    <div className="row-item">Email</div>
                    <div className="row-item">Phone Number</div>
                    <div className="row-item">City</div>
                    <div className="row-item">Province</div>
                    <div className="row-item">Address</div>
                    <div className="row-item">Zip Code</div>
                    <div className="row-item">Action</div>
                  </div>
                  {companies.map((item, index) => (
                    <div className="tbl-row flex aic" key={index}>
                      <div className="row-item">
                        <div className="ico-bg flex aic jc">
                          <img
                            style={{ borderRadius: "50px" }}
                            src={`${process.env.REACT_APP_END_URL}${item.image}`}
                            className="img"
                          />
                        </div>
                      </div>
                      <div className="row-item font">{item.companyname}</div>
                      <div className="row-item font">{item.companyemail}</div>
                      <div className="row-item font">{item.phonenumber}</div>
                      <div className="row-item font">{item.city}</div>
                      <div className="row-item font">{item.province}</div>
                      <div className="row-item font">{item.address}</div>
                      <div className="row-item font">{item.zipcode}</div>
                      <div className="row-item font">
                        <div
                          onClick={() => {
                            setOpen4(true);
                            setselectedcompany(item);
                          }}
                          className="ico-edit pointer flex aic jc"
                        >
                          <EditIcon />
                        </div>
                        <div
                          onClick={() => {
                            setOpen3(true);
                            setcompanytobedelete(item);
                          }}
                          className="icon-del flex aic"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      )}
      <Modal open={open3} onClose={() => setOpen3(false)}>
        <Confirm />
      </Modal>

      <Modal open={open4} onClose={() => setOpen4(false)}>
        <EditCompany
          getcompanies={getcompanies}
          companyfilter={companyfilter}
          setOpen={setOpen4}
          selectedcompany={selectedcompany}
        />
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNewCompany
          getcompanies={getcompanies}
          companyfilter={companyfilter}
          setOpen={setOpen}
        />
      </Modal>

    </div>
  );
};

export default CompanyManagment;
