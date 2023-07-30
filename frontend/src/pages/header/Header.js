import React, { useEffect, useState } from 'react';
import './styles/Header.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { Badge } from 'primereact/badge';
import { Getenotification, GetenotificationSeller, Updatenotification, UpdatenotificationSeller } from '../../services/notification_services/Notification_services';
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
function Header({ state }) {

    const sellername = state?.userdetails?.loginuser?.data?.userName
    const adminname = state?.admin?.adminuser?.data?.userName
    const userid = state?.userdetails?.loginuser?.data?._id
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);


    const [countlengthcheck, setCountlengthcheck] = useState('');

    const [allnotifications, setNotifications] = useState([]);
    const Logout = () => {
        localStorage.clear();
        navigate("/")

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);

        if (countlengthcheck > 0) {
            CheckReadMessage();

        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const showModal1 = () => {
        setIsModalOpen1(true);

        if (countlengthcheck > 0) {
            CheckReadMessage1()

        }
    };

    const handleOk1 = () => {
        setIsModalOpen1(false);
    };

    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };

    useEffect(() => {
        getNotifications();
        getNotifications1();
    }, [loading,loading1])


    const getNotifications1 = async () => {
        setLoading1(true);
        try {

            const ids = {
                userid: userid
            }


            let countnotifytrue = [];
            let countnotifyfalse = [];


            const responsedata = await GetenotificationSeller(ids);



            responsedata?.CreateNotify?.map((item, index) => {
                if (item?.readstatus == true) {

                    countnotifytrue.push(item);
                }
                else if (item?.readstatus == false) {
                    countnotifyfalse.push(item);
                }

            })


            setCountlengthcheck(countnotifyfalse?.length);

            setLoading1(false);
            setNotifications(responsedata?.CreateNotify)
        } catch (error) {
            ToastMessageError("error notification");
            // setLoading1(false);

        }
    }



    const getNotifications = async () => {
        setLoading(true);
        try {

            const ids = {
                userid: userid
            }


            let countnotifytrue = [];
            let countnotifyfalse = [];


            const responsedata = await Getenotification(ids);

            responsedata?.CreateNotify?.map((item, index) => {
                if (item?.readstatus == true) {

                    countnotifytrue.push(item);
                }
                else if (item?.readstatus == false) {
                    countnotifyfalse.push(item);
                }

            })


            setCountlengthcheck(countnotifyfalse?.length);

            setLoading(false);
            setNotifications(responsedata?.CreateNotify)
        } catch (error) {
            ToastMessageError("error notification");
            setLoading(false);

        }
    }


    const CheckReadMessage = (data) => {
        setLoading(true);

        const idscheck = {
            typeId: "1",
            userid: userid
        }

        Updatenotification(idscheck).then((res) => {
            ToastMessageSuccess("Read Message success");
            setLoading(false);

        }).catch((err) => {
            ToastMessageError("Update error notication")
            setLoading(false);

        })
    }

    const CheckReadMessage1 = (data) => {
        setLoading(true);

        // const idscheck = {
        //     typeId: "1",
        //     userid: userid
        // }

        UpdatenotificationSeller().then((res) => {
            ToastMessageSuccess("Read Message success");
            setLoading(false);

        }).catch((err) => {
            ToastMessageError("Update error notication")
            setLoading(false);

        })
    }

    const NavigatePath = (data) => {
        navigate(data);
        handleOk();
    }
    return (
        <div
            className='header-section'>
            <div className='row '>
                <div className='col-lg-6'>
                    logo
                </div>
                <div className='col-lg-6 d-flex align-items-center justify-content-center pt-2 '>
                    <button onClick={Logout} className='logout'>Logout</button>

                    <div className='ms-5'>
                        {sellername ? <>
                            Seller : {sellername}
                        </> : null}
                        {adminname ? <>
                            Admin : {adminname}

                        </> : null}


                    </div>
                    <div className='ms-5'>
                        {adminname ? <>
                            {/* <Button type="primary" onClick={showModal}>
                                <Badge value="3" severity="danger"></Badge>
                            </Button> */}
                            {/* <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1rem', }} onClick={showModal}>
                                <Badge value="3" severity="danger"></Badge>
                            </i> */}

                            {allnotifications ? <>
                                <Button type="button" label="Messages" className="p-button-warnings" onClick={showModal}>
                                    Notification
                                    <Badge value={countlengthcheck} severity="danger"></Badge>
                                </Button>
                                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    {allnotifications?.map((item, index) => {
                                        return (
                                            <div onClick={() => NavigatePath(item?.onClickpath)}>


                                                <div>
                                                    {item?.username}
                                                </div>
                                                <div>
                                                    {item?.title}
                                                </div>
                                                <div>
                                                    <img src={item?.image} alt="no image" width={"100px"} height={"100px"} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Modal>
                            </> : null}

                        </> : null}
                    </div>

                    <div className='ms-5'>
                        {sellername ? <>
                            {/* <Button type="primary" onClick={showModal}>
                                <Badge value="3" severity="danger"></Badge>
                            </Button> */}
                            {/* <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1rem', }} onClick={showModal}>
                                <Badge value="3" severity="danger"></Badge>
                            </i> */}

                            {allnotifications ? <>
                                <Button type="button" label="Messages" className="p-button-warnings" onClick={showModal1}>
                                    Notification
                                    <Badge value={countlengthcheck} severity="danger"></Badge>
                                </Button>
                                <Modal title="Basic Modal" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
                                    {allnotifications?.map((item, index) => {
                                        return (
                                            <div onClick={() => NavigatePath(item?.onClickpath)}>


                                                <div>
                                                    {item?.username}
                                                </div>
                                                <div>
                                                    {item?.title}
                                                </div>
                                                <div>
                                                    <img src={item?.image} alt="no image" width={"100px"} height={"100px"} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Modal>
                            </> : null}

                        </> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header