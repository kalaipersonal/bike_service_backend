import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { SellerGetcurrentuser, SellerUpdateprofile } from '../../services/login_services/Login_services';
import jwt_decode from "jwt-decode";
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
import './styles/Profile.scss';
function Profile() {

    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    var decoded = jwt_decode(tokens);
    const [error, setError] = useState(false);

    const [usersdetails, setUsersDetails] = useState({
        userName: "", email: "", contactno: "",
        description: "",
        profileimage: ''
    })

    const { userName, email, contactno, description, profileimage } = usersdetails;

    const handleChange = (e) => {
        setUsersDetails({ ...usersdetails, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userName?.length === 0 || email?.length === 0 || contactno?.length == 0 || description?.length === 0 || profileimage?.length === 0) {
            setError(true);
        }

        if (userName && email && contactno && description && profileimage) {
            SellerUpdateprofile(decoded?.userid, usersdetails).then((res) => {
                ToastMessageSuccess("Updated Profile")
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    useEffect(() => {

        const ids = {
            userid: decoded?.userid
        }
        SellerGetcurrentuser(ids).then((res) => {
            setUsersDetails({
                userName: res?.data?.userName,
                email: res?.data?.email,
                contactno: res?.data?.contactno,
                description: res?.data?.description,
                profileimage: res?.data?.profileimage
            })
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <div className='col-lg-10 mt-5  mx-auto '>
            <Card className='p-3'>

                <Row>
                    <Col>

                    {profileimage?<>
                        <img src={profileimage} alt="no image"
                            className='profileimage'
                        />
                    </>:null}
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                name='userName'
                                value={userName}
                                onChange={handleChange}
                            />

                            <div className="">
                                {error && userName?.length <= 0 ? <span className="text-danger">userName is Required</span> : null}
                            </div>

                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                name='email'
                                value={email}
                                onChange={handleChange}
                            />

                            <div className="">
                                {error && email?.length <= 0 ? <span className="text-danger">email is Required</span> : null}
                            </div>

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Contact No</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                name='contactno'
                                value={contactno}
                                onChange={handleChange}
                            />

                            <div className="">
                                {error && contactno?.length <= 0 ? <span className="text-danger">contactno is Required</span> : null}
                            </div>

                        </div>
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                name='description'
                                value={description}
                                onChange={handleChange}
                            />

                            <div className="">
                                {error && description?.length <= 0 ? <span className="text-danger">description is Required</span> : null}
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">profileimage</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"

                                name='profileimage'
                                value={profileimage}
                                onChange={handleChange}
                            />

                            <div className="">
                                {error && profileimage?.length <= 0 ? <span className="text-danger">profileimage is Required</span> : null}
                            </div>

                        </div>
                    </Col>
                </Row>

                <div>
                    <button onClick={handleSubmit} className='Updateprofile'>
                        Update
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default Profile