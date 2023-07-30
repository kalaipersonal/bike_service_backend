import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DeleteSingleproduct, Getproduct } from '../../services/Product_services/product_services';
import jwt_decode from "jwt-decode";
import './components/addnewproduct/styles/Addnewproduct.scss'
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
function ProductAdd() {
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);
    const navigate = useNavigate();
    const [datas, setDatas] = useState([])

    const [loading, setLoading] = useState(false);
    const [editId, setEditid] = useState("")
    const [deleteId, setDeleteid] = useState("")
    const NavigateProduct = () => {
        navigate("/productnew")
    }

    useEffect(() => {
        const datas = {
            userid: decoded?.userid
        }
        Getproduct(datas).then((res) => {
            setDatas(res?.CreateProductnew);

            console.log(res, "kalai")
        }).catch((err) => {
            console.log(err);
        })
    }, [loading])

    const EditProductDetails = (data) => {
        navigate(`/productnew/${data}`)

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


    const DeleteProductdetials = (id) => {
        setLoading(true)
        DeleteSingleproduct(id).then((res) => {
            ToastMessageSuccess("Delete product Successfully")
            setLoading(false)
        }).catch((err) => {
            ToastMessageError("Product delete error")
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
                    onClick={() => DeleteProductdetials(data?._id)}
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
                <Button onClick={NavigateProduct}>
                    + Add New Product
                </Button>
            </div>

            <div className='mt-4'>
                <DataTable value={datas} scrollable scrollHeight="100%" tableStyle={{ minWidth: '80%' }}>
                    <Column field="productimages" header="Productimage" body={ProductImageshow} ></Column>
                    <Column field="productname" header="productname" ></Column>
                    <Column field="productid" header="productid" ></Column>
                    <Column field="price" header="price"></Column>
                    <Column field="approvalStatus" header="Status" body={approvalStatus}></Column>
                    <Column field="_id" header="Edit Stylist" body={editData}></Column>
                    <Column field="_id" header="View Stylist" body={deleteData}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default ProductAdd