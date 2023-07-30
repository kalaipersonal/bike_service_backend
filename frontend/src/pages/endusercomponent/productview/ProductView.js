import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

import React, { useState, useEffect, Fragment } from 'react';
import { Galleria } from 'primereact/galleria';
import { ProductListEnduserSingle } from '../../../services/enduser_products/enduser_product_services';
import './styles/Productview.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CartActionsdata } from '../../../Redux/actions/Cartactions';
import { ToastMessageError } from '../../../toastmessage/Toastmessage';
function ProductView() {


    const dispatch = useDispatch();

    const navigate = useNavigate();



    const [slotindex, setSlotindexs] = useState(0);

    const [bookingslots, setBookingslots] = useState([]);

    const state = useSelector((state) => state)


    const { id } = useParams();

    const [images, setImages] = useState([]);

    const [indexs, setIndexs] = useState(images?.productimages);



    console.log(images, 'images')

    useEffect(() => {
        ProductListEnduserSingle(id).then((res) => {
            setImages(res?.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [indexs])

    console.log(bookingslots, 'bookingslots')


    const Addtocart = (data) => {

        const calculate = Math.max(
            0,

            data?.newprice - (data?.newprice) * 10 / 100

        );


        if (bookingslots?.length === 0 || bookingslots == []) {
            ToastMessageError("Please Select Timers")
        }

        if (bookingslots?.length > 0) {

            const datas = {
                productname: data?.productname,
                price: data?.price,
                newprice: data?.newprice,
                workingslots:
                    images?.workingslots?.filter((item, index) => {
                        return index == slotindex
                    }),
                description: data?.description,
                productimages: data?.productimages,
                GST: data?.newprice - calculate,
                userid: data?.user?._id,
                workerdetails: data?.workerdetails,
                userdetails: data?.user
            }

            console.log(datas, 'datas')
            dispatch(CartActionsdata(datas))
            setTimeout(() => {
                navigate("/payment", {
                    state: { id: bookingslots }
                })
            }, 400);
        }



    }


    const handleSelectslots = (data) => {
        // setBookingslots(data)

        const filters = images?.workingslots?.filter((item, index) => {
            return index == data;
        })
        setBookingslots(filters);
    }



    return (
        <Fragment>

            <Container>

                <div className='mainboxcard'>
                    <div className='leftmainboxcard'>
                        {images ? <>
                            <div>
                                <img src={indexs ? indexs : images?.productimages} alt="no image"
                                    className='imageboxover'
                                />
                            </div>
                        </> : null}



                        <div className='boxrow'>
                            {images?.productimages?.map((item, index) => {
                                return (
                                    <div className='d-flex col-lg-3'
                                        onClick={() => {
                                            setIndexs(item);
                                        }}
                                    >
                                        <img src={item} alt='no images'
                                            className='imagebox'
                                        />
                                    </div>


                                )
                            })}
                        </div>
                    </div>
                    <div className='rightboxcard'>
                        <div>
                            <h3>{images?.productname}</h3>
                        </div>
                        <div className='d-flex gap-4 align-items-center '>
                            <div>
                                <h4> <del>Rs.{images?.price}</del></h4>
                            </div>
                            <div>
                                <h3>Rs.{images?.newprice}</h3>
                            </div>
                        </div>
                        <div>
                            {images?.description}
                        </div>

                        <div className='row d-flex gap-3 mt-4'>
                            {images?.workingslots?.map((item, index) => {
                                return (
                                    <div className={`card col-lg-3 p-2 ${slotindex === index ? "active" : "inactive"}`} onClick={() => {
                                        handleSelectslots(index);
                                        setSlotindexs(index)
                                    }}>
                                        {item?.dayName}
                                        <div>
                                            {item?.workingHours}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <button className='Booknow'
                                onClick={() => {
                                    Addtocart(images)
                                }}
                            >Book Now</button>
                        </div>
                    </div>
                </div>




            </Container>


        </Fragment>
    )
}

export default ProductView