import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import jwt_decode from "jwt-decode";
import './styles/product.scss'
import { ApprovalProduct, ApprovalProductRejected, getProductLists } from '../../../services/admin_services/adminapproval_product_services';
import { ToastMessageSuccess } from '../../../toastmessage/Toastmessage';
import { SellerAproval, SellerAprovalUnBlock, getAllSellers } from '../../../services/admin_services/seller_approval';
function Allsellers() {
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
    getAllSellers().then((res) => {
      setDatas(res?.ApprovalSellerdata);
      console.log(res, "res")

      console.log(res, "kalai")
    }).catch((err) => {
      console.log(err);
    })
  }, [loading])

  const ProductApprovalDetails = (data) => {
    setLoading(false)
    SellerAproval(data?._id).then((res) => {
      ToastMessageSuccess(" Blocked User Successfully")
      setLoading(true)
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })

  }


  const ProductApprovalDetailsRejected = (data) => {
    setLoading(false)
    SellerAprovalUnBlock(data?._id).then((res) => {
      ToastMessageSuccess("UnBlock User Successfully")
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
        {/* {data?.approvalStatus == 2 ? <>
          <button
            onClick={() => {
              ProductApprovalDetailsRejected(data);
            }}
            className={'Rejected'}
          >
            Rejected
          </button>
        </> : <> */}

        {data?.sellerStatus == true ? <>
          <button
            onClick={() => {
              ProductApprovalDetails(data);
            }}
            className={"Approved"}
          >
            Blocked
          </button>
        </> : <>
          <button
            onClick={() => {
              ProductApprovalDetailsRejected(data);
            }}
            className={"Approved"}
          >
            UnBlockUser
          </button>
        </>}

        {/* </>} */}

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
        {data?.sellerStatus == true ? <>Active</> : <>InActive</>}
      </React.Fragment>
    )
  }



  return (
    <div className="addproductsectionmain">
      <div className='d-flex justify-conetent-end mt-4 ms-5'>

      </div>

      <div className='mt-4'>
        <DataTable value={datas} scrollable scrollHeight="100%" tableStyle={{ minWidth: '80%' }}>
          <Column field="userName" header="userName" ></Column>
          <Column field="email" header="Email" ></Column>
          <Column field="role" header="Role"></Column>
          <Column field="sellerStatus" header="sellerStatus" body={approvalStatus}></Column>
          <Column field="_id approvalStatus" header="Approval" body={editDataAprroval}></Column>
          {/* <Column field="_id " header="Reject" body={deleteData}></Column> */}
        </DataTable>
      </div>
    </div>
  )
}

export default Allsellers