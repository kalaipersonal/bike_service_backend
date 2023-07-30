import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import jwt_decode from "jwt-decode";
import { OrderAllBooking } from '../../../services/orderbooking_services/Orderbooking_services';

function Enduserprofile() {
  const tokens = JSON.parse(localStorage.getItem("accessToken"));
  var decoded = jwt_decode(tokens);

  const [orders, setOrders] = useState([]);


  useEffect(() => {

    const datas = {
      userid: decoded?.userid
    }
    OrderAllBooking(datas).then((res) => {
      console.log(res?.data, "kalai")
      setOrders(res?.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <div className='col-lg-6'>
            <img src='https://www.washmycaronline.com/img/slider-moc-2.png' alt="no image"
              width="100%"
              height="400px"
            />
          </div>
          <div className='col-lg-6'>
            <div className='card p-3 mb-4'>
              {orders?.map((item, index) => {
                return (
                  <div>
                    {item?.orderdetails?.map((items, index) => {
                      return (
                        <div className='card p-4 mb-4'>

                          <div>
                            <img src={items?.productimages} alt="no image"
                              width={"100%"}
                              height={"300px"}

                              style={{
                                borderRadius: "20px"
                              }}
                            />
                          </div>

                          <div className='mt-2'>
                            {items?.productname}

                          </div>
                          <div className='mt-2'>
                            Rs.{items?.newprice}
                          </div>

                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Enduserprofile