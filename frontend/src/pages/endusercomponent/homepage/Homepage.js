import React, { useEffect, useState } from 'react'
import { ProductListEnduser } from '../../../services/enduser_products/enduser_product_services'
import { Container, Row, Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
function Homepage() {

  const Navigate = useNavigate();

  const [allproducts, setAllproducts] = useState([])

  useEffect(() => {
    ProductListEnduser().then((res) => {
      console.log(res?.data, "kalaienduser")
      setAllproducts(res?.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  const NavigatePath = (data) => {
    Navigate(`/productview/${data}`)
  }
  return (
    <div>
      <Container>
        <Row lg={4} className="d-flex row  mb-5">

          {allproducts?.map((item, index) => {
            return (
              <div className='mb-5'>

                {item?.approvalStatus == 2 ? <>

                  <Card style={{ width: '18rem', padding: "10px", cursor: "pointer" }} onClick={() => NavigatePath(item?._id)}>
                    <Card.Img variant="top" src={item?.productimages[0]}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain"

                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item?.productname}</Card.Title>
                      <Card.Text>
                        {item?.description}
                      </Card.Text>
                      <Button variant="primary" onClick={() => NavigatePath(item?._id)}>
                        Book Now
                      </Button>
                    </Card.Body>
                  </Card>
                </> : <>

                </>}


              </div>
            )
          })}

          {allproducts?.length === 0 && <div className='mt-5 text-center'>
            No Data Found
          </div>}

        </Row>
      </Container>
    </div>
  )
}

export default Homepage