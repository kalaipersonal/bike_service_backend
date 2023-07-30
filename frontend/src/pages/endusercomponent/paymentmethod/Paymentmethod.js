import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './styles/Paymentmethods.scss';
import { ToastMessageError, ToastMessageSuccess } from '../../../toastmessage/Toastmessage';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { OrderBooking } from '../../../services/orderbooking_services/Orderbooking_services';
import { CreatenotificationSeller } from '../../../services/notification_services/Notification_services';

function Paymentmethod() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const tokens = JSON.parse(localStorage.getItem("accessToken"));
  var decoded = jwt_decode(tokens);



  const states = useSelector((state) => state?.cart?.Cartdata);

  console.log(states, 'states')

  const [paymenttype, setPaymenttype] = useState("");

  const [indexs, setIndexs] = useState(0);

  const datas = [
    {
      id: 1,
      name: 'Paytm'
    },
    {
      id: 2,
      name: 'Phone Pay'
    },
    {
      id: 3,
      name: 'Google Pay'
    },
    {
      id: 4,
      name: 'Credit Card'
    },
    {
      id: 5,
      name: 'Debit Card'
    },
    {
      id: 5,
      name: 'Cash On Buy'
    }
  ]

  const handleChange = (data) => {
    setPaymenttype(data)
  }



  const PaymentGo = () => {
    if (paymenttype?.length === 0) {
      ToastMessageError("Please Select Payment Method")
    }

    if (paymenttype) {
      const datas = {
        orderdetails: [{
          productname: states?.productname,
          price: states?.price,
          newprice: states?.newprice,
          workingslots: state?.id,
          description: states?.description,
          productimages: states?.productimages,
        }],
        GST: states?.GST,
        paymenttype: paymenttype,
        enduserid: decoded?.userid,
        sellerid: states?.userid,
        workerdetails: states?.workerdetails,
        userdetails: states?.userdetails,
        totalAmount: Number(states?.newprice) + Number(states?.GST)
      }
      OrderBooking(datas).then((res) => {
        ToastMessageSuccess("Order Created Successfully")

        CreatenotificationSeller({
          title: states?.productname,
          image: states.productimages[0],
          userName: "kalai",
          onClickpath: "/product",
          userid: states?.userid
        }).then((res) => {
          navigate("/productadd")
        }).catch((err) => {
          ToastMessageError("Errro notification create product")
        })

        setTimeout(() => {
          navigate("/orderlist")

        }, 500);
      }).catch((err) => {
        console.log(err);
      })
    }


  }



  return (
    <div>
      <Container>
        <Row>
          <div className='col-lg-6'>
            <div>

              {datas?.map((item, index) => {
                return (
                  <div>
                    <div className={`card p-2 mb-4 ${indexs === index ? "active" : "inactive"}`} onClick={() => {
                      handleChange(item?.name)

                      setIndexs(index)
                    }}>
                      {item?.name}
                    </div>
                  </div>
                )
              })}


            </div>

            <div>
              <button className='continuebooking' onClick={PaymentGo}>Continue Booking</button>
            </div>
          </div>
          <div className='col-lg-6'>
            <Card className='p-3'>
              <div>
                Booking Details
              </div>
              <hr></hr>
              <div>
                <div>
                  <img src={states?.productimages} alt="no image" width={"100%"} height={"auto"}
                    style={{
                      borderRadius: "20px",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>
              <div className='mb-3 mt-3'>
                Price: Rs.{states?.newprice}
              </div>
              <div className='mb-3 mt-3'>
                GST: Rs.{states?.GST}
              </div>
              <hr></hr>
              <div>
                Total Amount : Rs.{Number(states?.newprice) + Number(states?.GST)}
              </div>

            </Card>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Paymentmethod