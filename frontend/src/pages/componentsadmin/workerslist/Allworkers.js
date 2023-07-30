import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import jwt_decode from "jwt-decode";
import './styles/product.scss'
import { ApprovalProduct, ApprovalProductRejected, getProductLists } from '../../../services/admin_services/adminapproval_product_services';
import { ToastMessageSuccess } from '../../../toastmessage/Toastmessage';
import { useDispatch, useSelector } from 'react-redux';
import { GetallworkersAdmin } from '../../../services/worker_services/workser_services';
function Allworkers() {
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const state = useSelector((state) => state);

    console.log(state, 'state')
    const [datas, setDatas] = useState([])
    const [editId, setEditid] = useState("")
    const [deleteId, setDeleteid] = useState("")

    const [loading, setLoading] = useState(false);

    const [workersadmin,setWorkersadmin]=useState([]);


    useEffect(() => {
        const datas = {
            userid: decoded?.userid
        }
        getProductLists(datas).then((res) => {
            setDatas(res?.AllProducts);
            console.log(res, "res")

            console.log(res, "kalai")
        }).catch((err) => {
            console.log(err);
        })


        GetallworkersAdmin().then((res)=>{
console.log("ko",res)
setWorkersadmin(res?.workers);
        }).catch((err)=>{
            console.log(err);
        })
    }, [loading])

    const ProductApprovalDetails = (data) => {
        setLoading(false)

        console.log(data?.approvalStatus, "data")
        ApprovalProduct(data?._id).then((res) => {
            ToastMessageSuccess("Approval Product Successfully")
            setLoading(true)
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })

    }


    const ProductApprovalDetailsRejected = (data) => {
        setLoading(false)
        ApprovalProductRejected(data?._id).then((res) => {
            ToastMessageSuccess("Rejected Product Successfully")
            setLoading(true)
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })

    }


    const editDataAprroval = (data) => {
        return (
            <React.Fragment>
                {/* <i
                    style={{ fontSize: "20px" }}
                    className="fas fa-pen mx-auto"
                    onClick={() => {
                        setEditid(data?._id)
                        EditProductDetails(data?._id);
                    }}
                /> */}
                {data?.approvalStatus == 2 ? <>
                    <button
                        onClick={() => {
                            ProductApprovalDetailsRejected(data);
                        }}
                        className={'Rejected'}
                    >
                        Rejected
                    </button>
                </> : <>

                    <button
                        onClick={() => {
                            ProductApprovalDetails(data);
                        }}
                        className={"Approved"}
                    >
                        Approved
                    </button>
                </>}

            </React.Fragment>
        );

    }

    const deleteData = (data) => {

        return (
            <React.Fragment>
                {/* <i
                style={{ fontSize: "20px" }}
                className="fas fa-pen mx-auto"
           
              /> */}

                <i class="fa fa-trash" aria-hidden="true" style={{ fontSize: "20px" }}
                    onClick={() => setDeleteid(data?._id)}
                ></i>

            </React.Fragment>
        );
    }

    const approvalStatus = (data) => {
        return (
            <React.Fragment>
                {data?.approvalStatus == 1 ? "Pending Approval" : null}
                {data?.approvalStatus == 2 ? "Approved" : null}
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

            </div>

            <div className='mt-4'>
                <DataTable value={workersadmin} scrollable scrollHeight="100%" tableStyle={{ minWidth: '80%' }}>
                    <Column field="profileimage" header="Profileimage" body={Profileimagebod} ></Column>

                    <Column field="username" header="UserName" ></Column>
                    <Column field="contactno" header="ContactNo" ></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="age" header="Age"></Column>
                    {/* <Column field="approvalStatus" header="Status" body={approvalStatus}></Column> */}
                    {/* <Column field="_id approvalStatus" header="Approval" body={editDataAprroval}></Column> */}
                    {/* <Column field="_id " header="Reject" body={deleteData}></Column> */}
                </DataTable>
            </div>
        </div>
    )
}

export default Allworkers