import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import jwt_decode from "jwt-decode";
import './styles/product.scss'
import { ApprovalProduct, ApprovalProductRejected, getProductLists } from '../../../services/admin_services/adminapproval_product_services';
import { ToastMessageSuccess } from '../../../toastmessage/Toastmessage';
function ProductApproval() {
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);
    const navigate = useNavigate();
    const [datas, setDatas] = useState([])
    const [editId, setEditid] = useState("")
    const [deleteId, setDeleteid] = useState("")

    const [loading, setLoading] = useState(false);


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

    const ProductImageshow = (data) => {
        return (
            <React.Fragment>
                <div>
                    <img src={data.productimages[0]} alt="no image" style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px"

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
                <DataTable value={datas} scrollable scrollHeight="100%" tableStyle={{ minWidth: '80%' }}>
                <Column field="productimages" header="Productimage" body={ProductImageshow} ></Column>

                    <Column field="productname" header="productname" ></Column>
                    <Column field="productid" header="productid" ></Column>
                    <Column field="price" header="price"></Column>
                    <Column field="approvalStatus" header="Status" body={approvalStatus}></Column>
                    <Column field="_id approvalStatus" header="Approval" body={editDataAprroval}></Column>
                    <Column field="_id " header="Reject" body={deleteData}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default ProductApproval