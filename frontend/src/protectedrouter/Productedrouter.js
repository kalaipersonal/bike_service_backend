import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastMessageError, ToastMessageSuccess } from "../toastmessage/Toastmessage";
import { EnduserGetdata, SellerGetcurrentuser } from "../services/login_services/Login_services";
import jwt_decode from "jwt-decode";

import './styles/Productedrouter.scss';
import Header from "../pages/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { LoginActiongetdata } from "../Redux/actions/userGetData";
import { AdminActiongetdata } from "../Redux/actions/userAdmingetdata";
import { Badge } from 'primereact/badge';
const ProtectedRoutes = () => {

    const path = useLocation();
    const tokens = localStorage.getItem("accessToken");
    var decoded = jwt_decode(tokens);
    const state = useSelector((state) => state);
    const { admin, userdetails } = state;
    const adminroleid = admin?.adminuser?.data
    const { loading, loginuser, error } = state?.userdetails;


    const [rollid, setRollid] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(LoginActiongetdata())
        dispatch(AdminActiongetdata())
    }, [])
    const navigatepaths = [
        {
            id: 1,
            name: "Dasboard",
            Path: "/dashboard"
        },
        {
            id: 2,
            name: "User Profile",
            Path: "/profile"
        },
        {
            id: 3,
            name: "workers",
            Path: "/workers"
        },
        {
            id: 4,
            name: "product",
            Path: "/productadd"
        }
    ]


    const navigatepathsadmin = [
        {
            id: 1,
            name: "Dasboard",
            Path: "/admindashboard"
        },
        {
            id: 2,
            name: "All sellers",
            Path: "/allsellers"
        },
        {
            id: 3,
            name: "All Workers",
            Path: "/allworkers"
        },
        {
            id: 4,
            name: "Approval Product",
            Path: "/productapproval"
        }
    ]
    const handlepathchange = (data) => {
        navigate(data);
    }


    useEffect(() => {

        const formids = {
            userid: decoded?.userid
        }

        EnduserGetdata(formids).then((res) => {
            console.log("protected", res?.data)
            setRollid(res?.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const Logoutuser = () => {
        localStorage.clear();

        navigate("/");
    }

    console.log(state?.cart?.Cartdata, 'state')
    // state?.cart?.Cartdata
    if (tokens) {
        return <>


            {rollid?.roleNo == 3 ? <>
                <div className="endusersection">
                    <div className="insideenduser">
                        <div className="commonheaderenduser">
                            <div className="col-lg-4">
                            </div>
                            <div className="col-lg-4">
                                <div onClick={() => {
                                    navigate("/orderlist")
                                }}>
                                    Orders
                                </div>
                            </div>
                            <div className="col-lg-4 buttonsection">

                                EndUser : {rollid?.userName}
                                <div>
                                    {/* <span className="pi pi-shopping-cart">
                                    
                                </span> */}

                                    <i className="pi pi-shopping-cart p-overlay-badge" style={{ fontSize: '1.5rem' }}>
                                        {state?.cart?.Cartdata?.productname ?

                                            <Badge value={state?.cart?.Cartdata?.productname ? "1" : null} severity="success"></Badge>

                                            : null}
                                    </i>
                                </div>
                                <div>
                                    <button className='logout' onClick={Logoutuser}>Logout</button>
                                </div>
                            </div>
                        </div>
                        <div className="bodysections">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </> : <>


                <div className="mainsectiondashboard">
                    <div className="inside-section-dashboard">
                        <div className="header-section-dashboard">
                            <Header state={state} />
                        </div>
                        <div className="body-section-dashboard">
                            <div className="insidesidebar">
                                <div className="leftsidebar">
                                    {adminroleid?.roleNo == 1 ? <>
                                        <div>
                                            {navigatepathsadmin?.map((item, index) => {
                                                return (
                                                    <div className={`mb-4 mt-2  ${item?.Path == path?.pathname ? "Active" : "Inactive"}`} onClick={() => handlepathchange(item?.Path)}>
                                                        <h6> {item?.name}</h6>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </> : <>

                                        {navigatepaths?.map((item, index) => {
                                            return (
                                                <div className={`mb-4 mt-2 ms-2  ${item?.Path == path?.pathname ? "Active" : "Inactive"}`} onClick={() => handlepathchange(item?.Path)}>
                                                    <h6> {item?.name}</h6>
                                                </div>
                                            )
                                        })}

                                    </>}

                                </div>
                                <div className="rightbodysection">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}



        </>
    }
    else {
        return <Navigate to="/login" />
    }
};

export default ProtectedRoutes;
