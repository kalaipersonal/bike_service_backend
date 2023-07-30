import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { LoginActiongetdata } from '../../Redux/actions/userGetData';

function Dashboard() {




  // const dispatch=useDispatch();

  // const  state  = useSelector((state) => state);
  // console.log(state, "state");

  // useEffect(()=>{
  //   dispatch(LoginActiongetdata())
  // },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard