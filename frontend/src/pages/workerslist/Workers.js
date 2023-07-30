
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Getproduct } from '../../services/Product_services/product_services';
import jwt_decode from "jwt-decode";
import { Deleteworkers, Getallworkers } from '../../services/worker_services/workser_services';
import './styles/Addnewproduct.scss';
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
import { useDispatch, useSelector } from 'react-redux';
import { WorkersGetdata } from '../../Redux/actions/Workersdetails';
function Workers() {
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);
    const navigate = useNavigate();
    const [datas, setDatas] = useState([])
    const [editId, setEditid] = useState("")
    const [deleteId, setDeleteid] = useState("")

    const [loading,setLoading]=useState(false);
    const NavigateProduct = () => {
        navigate("/workersadd")
    }


    const dispatch=useDispatch();

    const state=useSelector((state)=>state);



    useEffect(() => {
        const datas = {
            userid: decoded?.userid
        }
        Getallworkers(datas).then((res) => {
            setDatas(res?.workers);
        }).catch((err) => {
            console.log(err);
        })

        dispatch(WorkersGetdata());

    }, [loading])

    const EditProductDetails = (data) => {
        navigate(`/workersadd/${data}`)

    }


    const editData = (data) => {
        return (
            <React.Fragment>
                <i
                    style={{ fontSize: "20px" }}
                    className="fas fa-pen mx-auto"
                    onClick={() => {
                        setEditid(data?._id)
                        EditProductDetails(data?._id);
                    }}
                />
            </React.Fragment>
        );

    }


    const DeleteWorkerdetail=(id)=>{
        setLoading(true)
Deleteworkers(id).then((res)=>{
    ToastMessageSuccess("Worker Deleted Successfully")
    setLoading(false)
}).catch((err)=>{
    ToastMessageError("Worker error")
    setLoading(false)

})
    }

    const deleteData = (data) => {

        return (
            <React.Fragment>
                {/* <i
                style={{ fontSize: "20px" }}
                className="fas fa-pen mx-auto"
           
              /> */}

                <i class="fa fa-trash" aria-hidden="true" style={{ fontSize: "20px" }}
                    onClick={() => DeleteWorkerdetail(data?._id)}
                ></i>

            </React.Fragment>
        );
    }

    const approvalStatus = (data) => {
        return (
            <React.Fragment>
                {data?.approvalStatus == 1 ? "Pending Approval" : null}
                {data?.approvalStatus == 2 ? "Approval" : null}
                {data?.approvalStatus == 3 ? "Rejected" : null}
            </React.Fragment>
        )
    }


    const Profileimagebod = (data) => {
        return (
            <React.Fragment>
                <div>
                    <img src={data?.profileimage} alt='No image' width='100px' height="100px" style={{
                        borderRadius: "10px"
                    }} />
                </div>
            </React.Fragment>
        )
    }
    return (
        <div className="addproductsectionmain">
            <div className='d-flex justify-conetent-end mt-4 ms-5'>
                <Button onClick={NavigateProduct}>
                    + Add New Worker
                </Button>
            </div>

            <div className='mt-4'>
                <DataTable value={datas} scrollable scrollHeight="100%" tableStyle={{ minWidth: '80%' }}>
                    <Column field="profileimage" header="Profileimage" body={Profileimagebod} ></Column>

                    <Column field="username" header="UserName" ></Column>
                    <Column field="contactno" header="ContactNo" ></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="age" header="Age"></Column>

                    {/* <Column field="approvalStatus" header="Status" body={approvalStatus}></Column> */}
                    <Column field="_id" header="Edit Stylist" body={editData}></Column>
                    <Column field="_id" header="View Stylist" body={deleteData}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default Workers