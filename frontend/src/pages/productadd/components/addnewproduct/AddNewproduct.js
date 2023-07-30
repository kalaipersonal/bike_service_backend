



import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import './styles/Addnewproduct.scss';
import { Createproduct, GetSingleproduct, UpdateSingleproduct } from '../../../../services/Product_services/product_services';
import { ToastMessageError, ToastMessageSuccess } from '../../../../toastmessage/Toastmessage';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginActiongetdata } from '../../../../Redux/actions/userGetData';
import jwt_decode from "jwt-decode";
import { WorkersGetdata } from '../../../../Redux/actions/Workersdetails';
import { Createnotification } from '../../../../services/notification_services/Notification_services';
import Allworkers from '../../../componentsadmin/workerslist/Allworkers';
import { Getallworkers } from '../../../../services/worker_services/workser_services';

function AddNewproduct() {

    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);


    const state = useSelector((state) => state);

    const sellerid = state?.userdetails?.loginuser?.data?._id;
    const sellerName = state?.userdetails?.loginuser?.data?.userName;


    const [allwork, setAllworkers] = useState([]);


    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { id } = useParams();
    const [firstdayas, setFirstDays] = useState("");
    const [secondtimes, setSecondtimes] = useState("");
    const [thirdtimes, setThirdtimes] = useState("");
    const [errortimer, setTimeerror] = useState(false);
    const [errortimer1, setTimeerror1] = useState(false);
    const [selectMonths, setCheckBoxsMonth] = useState([]);
    const [selectMonthsimage, setCheckBoxsMonthimages] = useState([]);
    const [selectMonthsimage1, setCheckBoxsMonthimages1] = useState('');
    const [idproduct, setProductid] = useState("");



    const [productnew, setProductNew] = useState({
        productname: "",
        price: "",
        newprice: "",
        couponcode: "",
        categories: "",
        images: "",
        vehicletype: "",
        workingslots: "",
        laberdetails: "",
        description: ""
    })

    const { productname, price, newprice, couponcode, images, vehicletype, workingslots, categories, laberdetails, productid, description } = productnew;


    const [checkboxs, setCheckboxs] = useState([]);
    const handleChange = (e) => {
        setProductNew({ ...productnew, [e.target.name]: e.target.value });

    }



    const handleSubmit = (e) => {
        // e?.preventdefault();

        if (productname?.length == 0 || price?.length == 0 || newprice?.length == 0 || couponcode?.length == 0 || vehicletype?.length == 0 || categories?.length == 0 || laberdetails?.length == 0 || description?.length == 0) {
            setTimeerror(true);
        }

        if (productname && price && newprice && couponcode && vehicletype && categories && laberdetails && description) {
            const formdata = {
                productname: productname,
                price: price,
                newprice: newprice,
                couponcode: couponcode,
                vehicletype: vehicletype,
                categories: categories,
                workerid: laberdetails,
                description: description,
                workingslots: selectMonths,
                productid: idproduct,
                userid: decoded?.userid,
                productimages: selectMonthsimage

            }


            Createproduct(formdata).then((res) => {
                ToastMessageSuccess("Success Create Data")
                Createnotification({
                    title: res?.CreateProductnew?.productname,
                    image: res?.CreateProductnew?.productimages[0],
                    userName: sellerName,
                    typeId: "1",
                    onClickpath: "/productapproval",
                    userid: sellerid
                }).then((res) => {
                    navigate("/productadd")
                }).catch((err) => {
                    ToastMessageError("Errro notification create product")
                })
            }).catch((err) => {
                console.log(err);
            })
        }



    }


    const remove = (
        <svg
            width="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                opacity="0.4"
                d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z"
                fill="currentColor"
            ></path>
            <path
                d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                fill="currentColor"
            ></path>
        </svg>
    );


    const handleMonthData = (e) => {
        if (firstdayas?.length === 0 || secondtimes?.length === 0 || thirdtimes?.length === 0) {
            setTimeerror1(true);

        }

        if (firstdayas && secondtimes && thirdtimes) {
            const forms = {
                dayName: firstdayas,
                workingHours: `${secondtimes} to ${thirdtimes}`
            }
            setCheckBoxsMonth([...selectMonths, forms]);
            setFirstDays("");
            setSecondtimes("");
            setThirdtimes("");


        }


    };


    const WorkingDays = [
        {
            id: 1,
            name: "Sunday"
        },
        {
            id: 2,
            name: "Monday"
        },
        {
            id: 3,
            name: "Tuesday"
        },
        {
            id: 4,
            name: "Wednesday"
        },
        {
            id: 5,
            name: "Thursday"
        },
        {
            id: 6,
            name: "Friday"
        },
        {
            id: 7,
            name: "Saturday"
        }
    ]


    const variationsTimesam = [
        {
            id: 1,
            time: "1:00 AM"
        },
        {
            id: 2,
            time: "2:00 AM"

        },
        {
            id: 3,
            time: "3:00 AM"

        },
        {
            id: 4,
            time: "4:00 AM"

        },
        {
            id: 5,
            time: "5:00 AM"

        },
        {
            id: 6,
            time: "6:00 AM"

        },
        {
            id: 7,
            time: "7:00 AM"

        },
        {
            id: 8,
            time: "8:00 AM"

        },
        {
            id: 9,
            time: "9:00 AM"

        },
        {
            id: 10,
            time: "10:00 AM"

        },
        {
            id: 11,
            time: "11:00 AM"

        },
        {
            id: 12,
            time: "12:00 AM"

        },
        {
            id: 13,
            time: "1:00 PM"
        },
        {
            id: 14,
            time: "2:00 PM"

        },
        {
            id: 15,
            time: "3:00 PM"

        },
        {
            id: 16,
            time: "4:00 PM"

        },
        {
            id: 17,
            time: "5:00 PM"

        },
        {
            id: 18,
            time: "6:00 PM"

        },
        {
            id: 19,
            time: "7:00 PM"

        },
        {
            id: 20,
            time: "8:00 PM"

        },
        {
            id: 21,
            time: "9:00 PM"

        },
        {
            id: 22,
            time: "10:00 PM"

        },
        {
            id: 23,
            time: "11:00 PM"

        },
        {
            id: 24,
            time: "12:00 PM"

        },
    ];
    const variationsTimespm = [
        {
            id: 1,
            time: "1:00 PM"
        },
        {
            id: 2,
            time: "2:00 PM"

        },
        {
            id: 3,
            time: "3:00 PM"

        },
        {
            id: 4,
            time: "4:00 PM"

        },
        {
            id: 5,
            time: "5:00 PM"

        },
        {
            id: 6,
            time: "6:00 PM"

        },
        {
            id: 7,
            time: "7:00 PM"

        },
        {
            id: 8,
            time: "8:00 PM"

        },
        {
            id: 9,
            time: "9:00 PM"

        },
        {
            id: 10,
            time: "10:00 PM"

        },
        {
            id: 11,
            time: "11:00 PM"

        },
        {
            id: 12,
            time: "12:00 PM"

        },
        {
            id: 13,
            time: "1:00 AM"
        },
        {
            id: 14,
            time: "2:00 AM"

        },
        {
            id: 15,
            time: "3:00 AM"

        },
        {
            id: 16,
            time: "4:00 AM"

        },
        {
            id: 17,
            time: "5:00 AM"

        },
        {
            id: 18,
            time: "6:00 AM"

        },
        {
            id: 19,
            time: "7:00 AM"

        },
        {
            id: 20,
            time: "8:00 AM"

        },
        {
            id: 21,
            time: "9:00 AM"

        },
        {
            id: 22,
            time: "10:00 AM"

        },
        {
            id: 23,
            time: "11:00 AM"

        },
        {
            id: 24,
            time: "12:00 AM"

        }
    ];


    const handledeleteMonthTimes = (id) => {
        const valuegets = selectMonths?.filter((item, index) => {
            return index + 1 !== id
        })
        setCheckBoxsMonth(valuegets)
    }


    const RandomProductid = () => {

        let counts = Math.floor(Math.random() * 10000000000000)

        setProductid(counts);
    }

    const ImageUploadFiles = (e) => {

        setCheckBoxsMonthimages([...selectMonthsimage, selectMonthsimage1])


        setCheckBoxsMonthimages1('');






    }
    const ImageDeleteid = (data) => {
        const filters = selectMonthsimage.filter((item, index) => {
            return index + 1 != data;
        })

        setCheckBoxsMonthimages(filters);
    }

    useEffect(() => {
        dispatch(LoginActiongetdata());
        GetProductDataSingle();
        dispatch(WorkersGetdata());
        Allworkersdata();
    }, [])


    const GetProductDataSingle = () => {
        GetSingleproduct(id).then((res) => {
            setProductNew({
                productname: res?.CreateProductnew?.productname,
                price: res?.CreateProductnew?.price,
                newprice: res?.CreateProductnew?.newprice,
                couponcode: res?.CreateProductnew?.couponcode,
                vehicletype: res?.CreateProductnew?.vehicletype,
                categories: res?.CreateProductnew?.categories,
                laberdetails: res?.CreateProductnew?.laberdetails,
                description: res?.CreateProductnew?.description,
                workingslots: selectMonths,
            })
            setCheckBoxsMonthimages(res?.CreateProductnew?.productimages)
            setCheckBoxsMonth(res?.CreateProductnew?.workingslots)
            setProductid(res?.CreateProductnew?.productid)
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSubmitUpdate = () => {
        const formdata = {
            productname: productname,
            price: price,
            newprice: newprice,
            couponcode: couponcode,
            vehicletype: vehicletype,
            categories: categories,
            workerid: laberdetails,
            description: description,
            workingslots: selectMonths,
            productid: idproduct,
            // productimages: productimages
        }

        UpdateSingleproduct(id, formdata).then((res) => {
            ToastMessageSuccess('Updated Successfully')
            navigate('/productadd')
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChangeImage = (e) => {
        setCheckBoxsMonthimages1(e?.target?.value);
    }


    const Allworkersdata = () => {


        const datas = {
            userid: sellerid
        }


        Getallworkers(datas).then((res) => {
            setAllworkers(res?.workers);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="p-5 addnewproducts">


            <Card className='p-5 h-100'>

                <div className='col-lg-12 d-flex flex-column justify-content-center mx-auto w-100'>
                    <Row>

                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='productname'
                                    value={productname}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errortimer && productname?.length <= 0 ? <span className="text-danger">Productname is Required</span> : null}
                                </div>

                            </div>

                        </Col>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Id</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    value={idproduct}

                                />

                                <div className="">
                                    {errortimer && idproduct?.length <= 0 ? <span className="text-danger">productid is Required</span> : null}
                                </div>

                            </div>


                        </Col>
                        <Col lg="4">

                            <div className="buttonslots mt-2">
                                <button onClick={RandomProductid} className={"slotboxtimes"}>Create Product Id </button>
                            </div>
                        </Col>
                    </Row>

                    <div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                name='price'
                                value={price}
                                onChange={handleChange}
                            />

                            <div className="">
                                {errortimer && price?.length <= 0 ? <span className="text-danger">price is Required</span> : null}
                            </div>
                        </div>
                    </div>

                    <Row>

                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">new Price</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                    name='newprice'
                                    value={newprice}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errortimer && newprice?.length <= 0 ? <span className="text-danger">newprice is Required</span> : null}
                                </div>
                            </div>

                        </Col>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">couponcode</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                    name='couponcode'
                                    value={couponcode}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errortimer && couponcode?.length <= 0 ? <span className="text-danger">couponcode is Required</span> : null}
                                </div>
                            </div>

                        </Col>
                        <Col lg="4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Select Categorys</label>

                            <div className='col-lg-12 mb-3'>
                                <select className="form-select" aria-label="Default select example" name="categories" value={categories} onChange={handleChange}>
                                    <option selected>Select Categorys</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <div className="">
                                    {errortimer && categories?.length <= 0 ? <span className="text-danger">categories is Required</span> : null}
                                </div>
                            </div>

                        </Col>
                    </Row>




                    <div>
                        <div className='col-lg-12'>
                            <label htmlFor="exampleInputPassword1" className="form-label">Select Laber</label>

                            <select className="form-select" aria-label="Default select example" name="laberdetails" value={laberdetails} onChange={handleChange}>
                                <option selected >Laber details</option>

                                {allwork?.map((item, index) => {
                                    return (
                                        <option value={item?._id}>{item?.username}</option>
                                    )
                                })}
                                {/* <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                            </select>

                            {errortimer && price?.length <= 0 ? <span className="text-danger">price is Required</span> : null}

                        </div>
                    </div>





                    <div>

                        <div className="row mt-3">

                            {/* const WorkingDays = [ */}
                            <Col lg={4}>
                                <Form.Select name="hours1" className="serviceform mt-2" onChange={(e) => setFirstDays(e?.target.value)} value={firstdayas}>
                                    <option value="">--Days--</option>
                                    {WorkingDays?.map((item, index) => {
                                        return (
                                            <>
                                                <option label={item?.name} value={item?.name} name={item?.name}>
                                                    {item?.name}
                                                </option>
                                            </>
                                        )
                                    })}

                                </Form.Select>

                                <div className="">
                                    {errortimer1 && firstdayas?.length <= 0 ? <span className="text-danger">firstdayas is Required</span> : null}

                                </div>
                            </Col>



                            <Col lg={3}>
                                <Form.Select name="hours1" className="serviceform mt-2" onChange={(e) => setSecondtimes(e?.target.value)} value={secondtimes}>
                                    <option value="">--Slot Time--</option>
                                    {variationsTimesam?.map((item, index) => {
                                        return (
                                            <>
                                                <option label={item?.time} value={item?.time} name={item?.time}>
                                                    {item?.time}
                                                </option>
                                            </>
                                        )
                                    })}

                                </Form.Select>

                                <div className="">
                                    {errortimer1 && secondtimes?.length <= 0 ? <span className="text-danger">secondtimes is Required</span> : null}

                                </div>
                            </Col>

                            <Col lg={3}>
                                <Form.Select name="hours1" className="serviceform mt-2" onChange={(e) => setThirdtimes(e?.target.value)} value={thirdtimes}>
                                    <option value="">--Slot Time--</option>
                                    {variationsTimespm?.map((item, index) => {
                                        return (
                                            <>
                                                <option label={item?.time} value={item?.time} name={item?.time}>
                                                    {item?.time}
                                                </option>
                                            </>
                                        )
                                    })}

                                </Form.Select>

                                <div className="">
                                    {errortimer1 && thirdtimes?.length <= 0 ? <span className="text-danger">thirdtimes is Required</span> : null}

                                </div>


                            </Col>

                            <Col lg={2}>
                                <div className="buttonslots">
                                    <button onClick={handleMonthData} className={"slotboxtimes"}>+ Add Slot </button>
                                </div>
                            </Col>

                            <div className="mainslots row mt-5 mb-3">
                                {selectMonths?.map((item, index) => {
                                    return (
                                        <div className="slottimesbox mt-2">
                                            <div className={"insidesoltstimeboxs"}>

                                                <div className="mb-2 mt-1">
                                                    {item?.dayName}
                                                </div>
                                                <div className="mb-2 mt-1">
                                                    {item?.workingHours}
                                                </div>

                                                <div className="insidedeletetimes">
                                                    <Button
                                                        className="btn btn-primary btn-icon btn-sm rounded-pill ms-2"
                                                        to="#"
                                                        role="button"
                                                        onClick={() => handledeleteMonthTimes(index + 1)}
                                                    >
                                                        <span className="btn-inner">{remove}</span>
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>


                            <Row>

                                <Col lg="6">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Select vehicletype</label>

                                    <div className='col-lg-12 mb-3'>
                                        <select className="form-select" aria-label="Default select example" name="vehicletype" value={vehicletype} onChange={handleChange}>
                                            <option selected>Select vehicle types</option>
                                            <option value="1">two</option>
                                            <option value="2">four</option>

                                        </select>

                                        <div className="">
                                            {errortimer && vehicletype?.length <= 0 ? <span className="text-danger">vehicletype is Required</span> : null}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6">
                                    <div className="mb-3 col-lg-12">
                                        <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1"
                                            name='description'
                                            value={description}
                                            onChange={handleChange}
                                        />

                                        <div className="">
                                            {errortimer && description?.length <= 0 ? <span className="text-danger">description is Required</span> : null}
                                        </div>
                                    </div>



                                </Col>
                            </Row>

                            {/* <Row>
                                <input type="file" placeholder='Image file upload'
                                    style={{ display: "none" }}
                                    id="kalai"
                                    onChange={ImageUploadFiles}
                                />
                                <label htmlFor='kalai'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBUvPlY2sGS-3lAAPjAsDdeL5Rmfs7WSeSQ&usqp=CAU'
                                        alt="no immage"
                                        width='100px'
                                        height="100px"
                                    />
                                </label>
                            </Row> */}

                            {/*  */}



                            <div>
                                <Row>
                                    <Col>
                                        <div className="mb-3 col-lg-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Image Uploads</label>
                                            <input type="text" className="form-control" id="exampleInputPassword1"
                                                name='file'
                                                value={selectMonthsimage1}
                                                onChange={handleChangeImage}
                                            />

                                            <div className="">
                                                {errortimer && description?.length <= 0 ? <span className="text-danger">description is Required</span> : null}
                                            </div>
                                        </div>

                                        <div>
                                            <button className='mb-5' onClick={ImageUploadFiles}>
                                                + Add Image
                                            </button>
                                        </div>
                                    </Col>
                                </Row>

                                <div>
                                    {selectMonthsimage?.map((item, index) => {
                                        return (
                                            <div className=''>
                                                <img src={item} alt="no image"
                                                    width="150px"
                                                    height="150px"
                                                />
                                                <button onClick={() => ImageDeleteid(index + 1)}>
                                                    Delete image
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {id ? <>
                                <button className="btn btn-primary col-lg-2 ms-5" onClick={handleSubmitUpdate}>UpDate</button>
                            </> : <>
                                <button className="btn btn-primary col-lg-2 ms-5" onClick={handleSubmit}>Submit</button>
                            </>}



                        </div>

                    </div>

                </div>
            </Card>
        </div>


    )
}

export default AddNewproduct