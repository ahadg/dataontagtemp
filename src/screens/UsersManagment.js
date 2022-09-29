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
import AddNewUser from "../components/AddNewUser";
import EditUser from "../components/EditUser";
import AddGroup from "../components/AddGroup";
import EditGroup from "../components/EditGroup";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
const UsersManagment = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [companies,setcompanies] = useState([])
  const [selectedCompany, setselectedcompany] = useState();
  const { showRightbar,user } = useSelector((state) => state.generalReducers);
  const [selectedrole, setselectedrole] = useState();
  const [companyfilter, setcompanyfilter] = useState([]);
  const [userfilter, setuserfilter] = useState([
    { id: 1,title : "Users" },
    { id: 2, title : "Groups" },
  ]);
  const [selecteduserfilter, setselecteduserfilter] = useState( { id: 1,title : "Users" },);
  const [roles, setroles] = useState([
    { id: 1,title : "Super admin", value: "superadmin" },
    { id: 2, title : "Company admin",value: "companyadmin" },
    { id: 3, title : "Company user",value: "companyuser" },
    { id: 4, title : "Maintenance admin",value: "maintaineradmin" },
    { id: 5, title : "Maintenance user",value: "maintaineruser" },
  ]);
  const [groups,setgroups] = useState([])
  const [filterdgroups,setfilterdgroups] = useState([])
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(undefined);
  const [groupsearch, setgroupsearch] = useState(undefined);
  const [filteruserList,setfilteruserList] = useState([])
  const [selecteduser,setselecteduser] = useState({})
  const [selectedgroup,setselectedgroup] = useState({})
  console.log('filterdgroups',filterdgroups)
  const returnnames = (grouplist) => {
   let names = ""
   grouplist.map((item) => {
     console.log('iteeeem',item)
     names += ` ,${item?._id?.userName}`
   })
   return names
  }
  useEffect(() => {
    console.log('selectedCompany',selectedCompany)
    let listtobefiltered = [...userList]
    if(selectedCompany){
      if(selectedCompany?.companyname != "All companies"){
        listtobefiltered = listtobefiltered.filter(
          (item) => {
            console.log('itemmmmm',item)
            let bool = false;
            item?.assignedcompanies?.map((item) => {
              console.log("checkingg",item?.companyname,selectedCompany.companyname)
              if(item?.companyname == selectedCompany.companyname){
               
                bool = true
              }
            })
              return bool
          }
        );
      }
    }
    if (search != undefined) {
      let thesearch  = search.toLowerCase()
      listtobefiltered = listtobefiltered.filter((item) => {
        console.log('item2245',item)
        if (
         (item.userName)?.toLowerCase()?.search(thesearch) > -1 ||  
         (item.email)?.toLowerCase()?.search(thesearch) > -1 ||  
         (item?.mobile?.toString())?.search(thesearch.toString()) > -1 ||  
         (item.createdBy?.companyName)?.toLowerCase()?.search(thesearch) > -1 
        ) {
          return true;
        }
      });
      
    }
    setfilteruserList([...listtobefiltered]);
  }, [search,selectedCompany]);
  console.log('gr',groupsearch)
  useEffect(() => {
    if(groupsearch == "" || groupsearch == " "){
      setfilterdgroups([...groups])
    }
    else if (groupsearch != undefined) {
      const searchedids = groups.filter((item) => {
        if (
          (item.groupname).toLowerCase().search((groupsearch).toLowerCase()) > -1
        ) {
          return true;
        }
      });
      setfilterdgroups([...searchedids]);
    }
  }, [groupsearch]);

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
        //setfilteruserList(res.data.users);
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
  
  const getusers = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getallusers`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
        // setfamilies(res.data.families);
        // setOpen(false);
        setloading(false);
        setuserList(res.data.users)
        setfilteruserList(res.data.users)
        setcompanyfilter(res.data.companies)
      }
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

  const getusergroup = async () => {
    try {
      //setloading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_END_URL}api/getusergroups`,
      );
      console.log("response_checks", res.data);
      if (res.data) {
        setgroups(res.data.user.groups)
        setfilterdgroups(res.data.user.groups)
      }
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

  const [userList,setuserList] = useState([
    {
      img: "./images/user55.png",
      name: "Muddasir Nazir",
      copmany: "Newbiz.srl",
      mail: "muddasirnazir92@gmail.com",
      numb: "+92 306 9089531",
      Role: "Super Admin",
    }
  ])
  console.log('userList',userList)
  const [deleteloading, setdeleteloading] = useState(false);
  const [usertobedelete, setusertobedelete] = useState({});
  const [grouptobedelete, setgrouptobedelete] = useState({});
  const deleteuser = async (id) => {
    try {
      setdeleteloading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_END_URL}api/deleteuser/${usertobedelete._id}`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        getusers();
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
      }
      else {
        return toast.error("Error in server");
      }
    }
  };

  const deletegroup = async (id) => {
    try {
      setdeleteloading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_END_URL}api/deleteusergroup/${grouptobedelete._id}`
      );
      console.log("response_checks", res.data);
      if (res.data) {
        getusergroup();
        setdeleteloading(false);
        setOpen6(false);
      }
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

    const Confirm = () => {
    return (
      <>
        <div className="confirm-delte flex aic flex-col">
          {deleteloading ? (
            <Loader />
          ) : (
            <>
              <div className="heading-tag flex aic jc s16 font b6">
                <div>Delete User</div>
              </div>
              <div className="desc flex aic jc s14 font b5">
                Do You Want To Delete User?
              </div>
              <div className="actions-row flex aic">
                <button
                  className="btn-cancle button cleanbtn"
                  onClick={(e) => setOpen3(false)}
                >
                  No! Cancel
                </button>
                <button
                  onClick={() => deleteuser()}
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

  const GroupConfirm = () => {
    return (
      <>
        <div className="confirm-delte flex aic flex-col">
          {deleteloading ? (
            <Loader />
          ) : (
            <>
              <div className="heading-tag flex aic jc s16 font b6">
                <div>Delete Group</div>
              </div>
              <div className="desc flex aic jc s14 font b5">
                Do You Want To Delete Group?
              </div>
              <div className="actions-row flex aic">
                <button
                  className="btn-cancle button cleanbtn"
                  onClick={(e) => setOpen6(false)}
                >
                  No! Cancel
                </button>
                <button
                  onClick={() => deletegroup()}
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
    getusers()
    getusergroup()
    getcompanies()
    document.addEventListener("click", () => {
      setHide(false);
      setHide2(false);
    });
  }, []);

  return (
    <div className="users-page">
      <Header title="User Managment" rightbarIcon="setting" />
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
                { selecteduserfilter.title == "Users" && 
                  <div className="f-fields flex aic">
                     {/* First */}
                    <div className="dropDown flex aic jc flex-col rel">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide3(!hide3);
                          }}
                        >
                          <div className="slt flex aic">
                            <div className="unit-name flex aic font s14 b4">
                              <span
                                className="unit-eng flex aic font s14 b4"
                                placeholder="Filter"
                              >
                                {selecteduserfilter
                                  ? selecteduserfilter.title
                                  : "user Filter"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide3 ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {userfilter.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide3(!hide3);
                                setselecteduserfilter(item);
                              }}
                            >
                              <div className="unit-name flex aic font s14 b4">
                                <span className="unit-eng flex aic font s14 b4">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* First */}
                    {
                    user.userType == "superadmin"
                      &&
                    <div className="dropDown flex aic jc flex-col rel">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide(!hide);
                          }}
                        >
                          <div className="slt flex aic">
                            <div className="unit-name flex aic font s14 b4">
                              <span
                                className="unit-eng flex aic font s14 b4"
                                placeholder="Company Filter"
                              >
                                {selectedCompany
                                  ? selectedCompany.companyname
                                  : "Company Filter"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {[{companyname : "All companies"},...companies]?.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide(!hide);
                                setselectedcompany(item);
                              }}
                            >
                              <div className="unit-name flex aic font s14 b4">
                                <span className="unit-eng flex aic font s14 b4">
                                  {item?.companyname}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    }
                    {/* Second */}
                    {/* <div className="dropDown flex aic jc flex-col rel">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide2(!hide2);
                          }}
                        >
                          <div className="slt flex aic">
                            <div className="unit-name flex aic font s14 b4">
                              <span
                                className="unit-eng flex aic font s14 b4"
                                placeholder="Roles Filter"
                              >
                                {selectedrole
                                  ? selectedrole.title
                                  : "Roles Filter"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide2 ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {roles.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide2(!hide2);
                                setselectedrole(item);
                              }}
                            >
                              <div className="unit-name flex aic font s14 b4">
                                <span className="unit-eng flex aic font s14 b4">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div> */}
                    {/* Search Box */}
                    <div className="search-by flex">
                      <div className="search-box flex aic">
                        <input
                          onChange={(e) => {
                            setsearch(e.target.value);
                          }}
                          type="text"
                          placeholder="Search "
                          className="txt cleanbtn s16"
                        />
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                }
                { selecteduserfilter.title == "Groups" &&
                  <div className="f-fields flex aic">
                    <div className="dropDown flex aic jc flex-col rel">
                      <div className="category flex aic">
                        <div
                          className="cbox cleanbtn flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHide3(!hide3);
                          }}
                        >
                          <div className="slt flex aic">
                            <div className="unit-name flex aic font s14 b4">
                              <span
                                className="unit-eng flex aic font s14 b4"
                                placeholder="Filter"
                              >
                                {selecteduserfilter
                                  ? selecteduserfilter.title
                                  : "user Filter"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <ArrowDownIcon />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`block flex aic abs ${hide3 ? "show" : ""}`}
                      >
                        <div className="manue flex aic col anim">
                          {userfilter?.map((item, index) => (
                            <div
                              key={index}
                              className="slt flex aic"
                              onClick={(e) => {
                                setHide3(!hide3);
                                setselecteduserfilter(item);
                              }}
                            >
                              <div className="unit-name flex aic font s14 b4">
                                <span className="unit-eng flex aic font s14 b4">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="search-by flex">
                      <div className="search-box flex aic">
                        <input
                          onChange={(e) => {
                            setgroupsearch(e.target.value);
                          }}
                          type="text"
                          placeholder="Search Groups"
                          className="txt cleanbtn s16"
                        />
                        <SearchIcon />
                      </div>
                    </div>
                  </div>
                }
                </div>
              </div>
              {
              user.userType == "superadmin"
                &&
              <div className="rit flex aix">
                <button
                  className="cleanbtn creat-btn  flex aic"
                  onClick={(e) => setOpen2(true)}
                >
                  <div className="ico">
                    <MultiUserIcon />
                  </div>
                  <div className="txt s12 b6 cfff">Create New Group</div>
                </button>
                <button
                  className="cleanbtn add-btn  flex aic"
                  onClick={(e) => setOpen(true)}
                >
                  <div className="ico">
                    <RoundAdd />
                  </div>
                  <div className="txt s12 b6 cfff">Create New User</div>
                </button>
              </div>
              }
            </div>
            { selecteduserfilter.title == "Users"
            &&
            <div className="table-sec flex flex-col">
              <div className="tbl-row flex aic">
                <div className="row-item">
                  <FilterIcon />
                </div>
                <div className="row-item">Name</div>
                <div className="row-item">Company Names</div>
                <div className="row-item">Email</div>
                <div className="row-item">Phone Number</div>
                <div className="row-item">Role</div>
                <div className="row-item">Action</div>
              </div>
              {filteruserList?.map((item, index) => {
                if(item?.id == user._id) {
                  return
                }
                return ( <div className="tbl-row flex aic" key={index}>
                  <div className="row-item">
                    <div className="ico-bg flex aic jc">
                      <img  
                      style={{borderRadius : '50px'}}
                      src={`${process.env.REACT_APP_END_URL}${item.image}`} className="img" />
                    </div>
                  </div>
                  <div className="row-item font">{item.userName}</div>
                  <div className="row-item font">{item?.assignedcompanies?.map((item,index) => {
                    return index == 0 ? `${item?.companyname}` : `,${item?.companyname}`
                  })}
                  </div>
                  <div className="row-item font">{item.email}</div>
                  <div className="row-item font">{item.mobile}</div>
                  <div className="row-item font">{item.userType}</div>
                  <div className="row-item font">
                    <div 
                    onClick={() => {
                      setOpen4(true)
                      setselecteduser(item)
                    }}
                    className="ico-edit pointer flex aic jc">
                      <EditIcon />
                    </div>
                    <div 
                    onClick={() => {
                      setOpen3(true)
                      setusertobedelete(item)
                    }}
                    className="icon-del flex aic">
                      <DeleteIcon />
                    </div>
                  </div>
                </div> )
               })}
              </div>
            }

          { selecteduserfilter.title == "Groups"
            &&
            <div className="table-sec flex flex-col">
              <div className="tbl-row flex aic">
                <div className="row-item">
                  <FilterIcon />
                </div>
                <div className="row-item">Group Name</div>
                <div className="row-item">Members</div>
                <div className="row-item">Number of members</div>
                <div className="row-item">Action</div>
              </div>
              {filterdgroups.map((item, index) => (
                <div className="tbl-row flex aic" key={index}>
                  <div className="row-item">
                    <div className="ico-bg flex aic jc">
                      <img  
                       style={{borderRadius : '50px'}}
                      src={`${process.env.REACT_APP_END_URL}${item.image}`} className="img" />
                    </div>
                  </div>
                  <div className="row-item font">{item.groupname}</div>
                  <div className="row-item font">{returnnames(item.grouplist)}</div>
                  <div className="row-item font">{(item.grouplist).length}</div>
                  <div className="row-item font">
                    <div 
                     onClick={() => {
                      setOpen5(true)
                      setselectedgroup(item)
                    }}
                    className="ico-edit pointer flex aic jc">
                      <EditIcon />
                    </div>
                    <div 
                     onClick={() => {
                      setOpen6(true)
                      setgrouptobedelete(item)
                    }}
                    className="icon-del flex aic">
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              ))}
              </div>
            }

          </div>
        </div>
      )}
      <Modal open={open3} onClose={() => setOpen3(false)}>
        <Confirm />
      </Modal>
      <Modal open={open6} onClose={() => setOpen6(false)}>
        <GroupConfirm />
      </Modal>

      <Modal open={open4} onClose={() => setOpen4(false)}>
        <EditUser companies={companies} getusers={getusers} companyfilter={companyfilter} setOpen={setOpen4} selecteduser={selecteduser}/>
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNewUser companies={companies} getusers={getusers} companyfilter={companyfilter} setOpen={setOpen}/>
      </Modal>

      <Modal open={open2} onClose={() => setOpen2(false)}>
        <AddGroup getusergroup={getusergroup} setOpen2={setOpen2} userList={userList}/>
      </Modal>
      <Modal open={open5} onClose={() => setOpen5(false)}>
        <EditGroup selectedgroup={selectedgroup} getusergroup={getusergroup} setOpen5={setOpen5} userList={userList}/>
      </Modal>
    </div>
  );
};

export default UsersManagment;
