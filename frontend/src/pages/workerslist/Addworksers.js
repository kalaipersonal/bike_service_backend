
import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import './styles/Addnewproduct.scss';
import { Button } from 'antd';
import { CreateWorker, Getsingleworkers, GetsingleworkersUpdate } from '../../services/worker_services/workser_services';
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Addworksers() {

    const { id } = useParams();

    const navigate = useNavigate();

    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);


    const [errors, setErrors] = useState(false);

    const [listworkers, setWorkers] = useState({
        username: "",
        email: "",
        contactno: "",
        alternatecontactno: "",
        bankname: "",
        adharcardno: "",
        accountno: "",
        description: "",
        workingexperience: "",
        age: "",
        profileimage: ""

    })




    const {
        username,
        email,
        contactno,
        alternatecontactno,
        bankname,
        adharcardno,
        accountno,
        description,
        workingexperience,
        age,
        profileimage
    } = listworkers

    const handleChange = (e) => {
        setWorkers({ ...listworkers, [e.target.name]: e.target.value });
    }

    const handleSubmits = (e) => {
        e.preventDefault();

        if (username?.length == 0 || email?.length == 0 || contactno?.length == 0 || alternatecontactno?.length == 0 || bankname?.length == 0 || adharcardno?.length == 0 || accountno?.length == 0 ||
            description?.length == 0 || workingexperience?.length == 0 || age?.length == 0 || profileimage?.length == 0
        ) {
            setErrors(true);
        }

        if (username &&
            email &&
            contactno &&
            alternatecontactno &&
            bankname &&
            adharcardno &&
            accountno &&
            description &&
            workingexperience && profileimage &&
            age) {

            const datas = {
                userid: decoded?.userid,
                username,
                email,
                contactno,
                alternatecontactno,
                bankname,
                adharcardno,
                accountno,
                description,
                workingexperience,
                age,
                profileimage
            }



            CreateWorker(datas).then((res) => {

                ToastMessageSuccess("Created Workers Completed");

                navigate('/workers')

            }).catch((err) => {
                ToastMessageError("Error Creaet Workers")
            })
        }

    }


    useEffect(() => {

        if(id)
        {
            Getsingleworkers(id).then((res) => {
                console.log("kalai", res?.workers)
                setWorkers({
                    username: res?.workers?.username,
                    email: res?.workers?.email,
                    contactno: res?.workers?.contactno,
                    alternatecontactno: res?.workers?.alternatecontactno,
                    bankname: res?.workers?.bankname,
                    adharcardno: res?.workers?.adharcardno,
                    accountno: res?.workers?.accountno,
                    description: res?.workers?.description,
                    workingexperience: res?.workers?.workingexperience,
                    age: res?.workers?.age,
                    profileimage: res?.workers?.profileimage
                })
            }).catch((err) => {
                ToastMessageError("error get workers single")
            })
        }
       
    }, [id])


    const handleSubmitsUpdate = () => {
        GetsingleworkersUpdate(id,listworkers).then((res) => {
            ToastMessageSuccess("Worker Update Sucessfully");
            navigate('/workers')
        }).catch((err) => {
            ToastMessageError("update error worker")
        })
    }
    return (

        <div className="p-5 addnewproducts">


            <h3>Add New Workers Details</h3>
            <Card className='p-5 h-100'>

                <div className='col-lg-12 d-flex flex-column justify-content-center mx-auto w-100 '>




                    <Row>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='username'
                                    value={username}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && username?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && email?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>

                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='age'
                                    value={age}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && age?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>


                    </Row>



                    <Row>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Contactno</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='contactno'
                                    value={contactno}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && contactno?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Alteernatecontactno</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='alternatecontactno'
                                    value={alternatecontactno}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && alternatecontactno?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>

                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">bankname</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='bankname'
                                    value={bankname}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && bankname?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>


                    </Row>





                    <Row>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Adhar carNno</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='adharcardno'
                                    value={adharcardno}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && adharcardno?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>
                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">accountno</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='accountno'
                                    value={accountno}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && accountno?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>

                        <Col lg="4">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">workingexperience</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='workingexperience'
                                    value={workingexperience}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && workingexperience?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                        </Col>


                    </Row>

                    <Row>
                        <Col>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">description</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='description'
                                    value={description}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && description?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Profile Image</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                    name='profileimage'
                                    value={profileimage}
                                    onChange={handleChange}
                                />

                                <div className="">
                                    {errors && profileimage?.length <= 0 ? <span className="text-danger">Required</span> : null}
                                </div>

                            </div>

                            <div>
                                <img src={profileimage} alt="no image" width="100px" height="100px" />
                            </div>
                        </Col>
                    </Row>


                    {id ? <>

                        <div className='mt-3'>
                            <button className='slotboxtimess' onClick={handleSubmitsUpdate}>
                                Update Worker
                            </button>
                        </div>
                    </> : <>

                        <div className='mt-3'>
                            <button className='slotboxtimess' onClick={handleSubmits}>
                                Create Worker
                            </button>
                        </div>
                    </>}





                </div>
            </Card>
        </div>
    )
}

export default Addworksers