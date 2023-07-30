
import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import { Space, Spin } from 'antd';
import ProtectedRoutes from './protectedrouter/Productedrouter';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { EnduserGetdata } from './services/login_services/Login_services';
import jwt_decode from "jwt-decode";

const Login = lazy(() => import('../src/pages/login/Login'));
const Signup = lazy(() => import('../src/pages/signup/Signup'));
const EnduserSignup = lazy(() => import('../src/pages/enduserregister/Enduserregister'));

const Dashboard = lazy(() => import('../src/pages/dashboard/Dashboard'));
const adminDashboard = lazy(() => import('../src/pages/componentsadmin/dasboardadmin/Dashboardadmin'));
const Allsellers = lazy(() => import('../src/pages/componentsadmin/allsellerslist/Allsellers'));
const Allworkers = lazy(() => import('../src/pages/componentsadmin/workerslist/Allworkers'));
const Allproductlist = lazy(() => import('../src/pages/componentsadmin/productapproval/ProductApproval'));
const Profile = lazy(() => import('../src/pages/profile/Profile'));
const Enduserhomepage = lazy(() => import('../src/pages/endusercomponent/homepage/Homepage'));
const Productview = lazy(() => import('../src/pages/endusercomponent/productview/ProductView'));
const Paymentmethod = lazy(() => import('../src/pages/endusercomponent/paymentmethod/Paymentmethod'));
const EnduserProfile = lazy(() => import('../src/pages/endusercomponent/enduserprofile/Enduserprofile'));









const ProductAdd = lazy(() => import('../src/pages/productadd/ProductAdd'));
const ProductAddNew = lazy(() => import('../src/pages/productadd/components/addnewproduct/AddNewproduct'));
const Workers = lazy(() => import('../src/pages/workerslist/Workers'));
const WorkersAdd = lazy(() => import('../src/pages/workerslist/Addworksers'));





function App() {

  // const tokens = localStorage.getItem("accessToken");
  // var decoded = jwt_decode(tokens);

  const [rollid, setRollid] = useState({});
  useEffect(() => {
    // const formids = {
    //   userid: decoded?.userid
    // }
    // EnduserGetdata(formids).then((res) => {
    //   setRollid(res?.data);
    // }).catch((err) => {
    //   console.log(err);
    // })
  }, [])

  return (
    <div className="App ">
      <div className='spiners'>
        {/* <Spin size="large" /> */}
        {/* <section>
          <div class="content">
            <h2>Kalai</h2>
            <h2>Kalai</h2>
          </div>
        </section> */}

        {/* <div class="shape">
  <div class="wave">
  </div>
</div> */}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/signup" element={<EnduserSignup />}></Route>


          {/* <Route path="/register" element={<Signup />}></Route> */}
          <Route element={<ProtectedRoutes></ProtectedRoutes>}>




            <Route path="/home" element={<Enduserhomepage />}></Route>
            <Route path="/productview/:id" element={<Productview />}></Route>
            <Route path="/payment" element={<Paymentmethod />}></Route>
            <Route path="/orderlist" element={<EnduserProfile />}></Route>









            <Route path="/dashboard" element={<Dashboard />}></Route>

            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/productadd" element={<ProductAdd />}></Route>
            <Route path="/productnew" element={<ProductAddNew />}></Route>
            <Route path="/productnew/:id" element={<ProductAddNew />}></Route>

            {/* admin start */}

            <Route path="/admindashboard" element={<adminDashboard />}></Route>
            <Route path="/allsellers" element={<Allsellers />}></Route>
            <Route path="/allworkers" element={<Allworkers />}></Route>
            <Route path="/productapproval" element={<Allproductlist />}></Route>
            <Route path="/workers" element={<Workers />}></Route>
            <Route path="/Workersadd" element={<WorkersAdd />}></Route>
            <Route path="/Workersadd/:id" element={<WorkersAdd />}></Route>







          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;




