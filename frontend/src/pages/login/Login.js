import React, { useEffect, useState } from 'react'
import './styles/Login.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
import { AdminLogin, EnduserLogin, SellerLogin } from '../../services/login_services/Login_services';
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();

    const [buttonname, setButtonname] = useState('sellerlogin');
    const onFinish = async (values) => {
        console.log('Success:', values);
        const datas = {
            email: values?.email,
            password: values?.password
        }

        if (buttonname == 'sellerlogin') {
            try {

                const response = await SellerLogin(datas);

                localStorage.setItem("accessToken", JSON.stringify(response?.token));
                localStorage.setItem("userid", JSON.stringify(response?.user?._id));
                ToastMessageSuccess('User Login Successfully');
                setTimeout(() => {
                    navigate("/dashboard");
                }, 700);

            }
            catch (err) {
                ToastMessageError(err?.response?.data?.message);
            }
        }

        if (buttonname == 'adminlogin') {
            try {

                const response = await AdminLogin(datas);

                localStorage.setItem("accessToken", JSON.stringify(response?.token));
                localStorage.setItem("userid", JSON.stringify(response?.user?._id));
                ToastMessageSuccess('Admin Login Successfully');
                setTimeout(() => {
                    navigate("/admindashboard");
                }, 700);

            }
            catch (err) {
                ToastMessageError(err?.response?.data?.message);
            }
        }

        if (buttonname == 'enduser') {
            try {

                const response = await EnduserLogin(datas);

                localStorage.setItem("accessToken", JSON.stringify(response?.token));
                localStorage.setItem("userid", JSON.stringify(response?.user?._id));
                ToastMessageSuccess('Enduser Login Successfully');
                setTimeout(() => {
                    navigate("/home");
                }, 700);

            }
            catch (err) {
                ToastMessageError(err?.response?.data?.message);
            }
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/dashboard")
        }
    }, [buttonname])

    const signups = () => {
        navigate("/register")
    }
    const signups1 = () => {
        navigate("/signup")
    }
    return (
        <div className='insidemainsection'>
            <div className='insidelogin'>

                {buttonname == "sellerlogin" ? <>

                    <div className='col-lg-6 left-image'>
                        <img src='https://cdn3d.iconscout.com/3d/premium/thumb/euro-money-delivery-by-motorbike-5139583-4300862.png' alt="no image" />
                    </div>
                </> : null}

                {buttonname == "enduser" ? <>

                    <div className='col-lg-6 left-image'>
                        <img src='https://gaadiwaadi.com/wp-content/uploads/2020/01/2020-bajaj-ns-bs6-fi-2.jpg' alt="no image"

                            width={"80%"}
                            height={"auto"}
                        />
                    </div>
                </> : null}


                {buttonname == "adminlogin" ? <>

                    <div className='col-lg-6 left-image'>
                        <img src='  https://gaadiwaadi.com/wp-content/uploads/2017/09/%E2%80%8B%E2%80%8B2018-Bajaj-Pulsar-NS200-ABS-Launched-Price-Engine-Specs-Features.jpg
' alt="no image"

                            width={"80%"}
                            height={"auto"}
                        />
                    </div>
                </> : null}








                <div className='col-lg-6 right-content'>

                    <div className='mt-5 buttonsections'>
                        <button onClick={() => setButtonname('sellerlogin')} className={buttonname == "sellerlogin" ? "sellerloginsactive" : "sellerlogininactive"}>Seller Login</button>
                        <button onClick={() => setButtonname('adminlogin')} className={buttonname == "adminlogin" ? "sellerloginsactive" : "sellerlogininactive"}>Admin Login</button>
                        <button onClick={() => setButtonname('enduser')} className={buttonname == "enduser" ? "sellerloginsactive" : "sellerlogininactive"}>End User</button>


                    </div>


                    {/* {(() => {

                    }), ()} */}
                    <div className='switchnames'>
                        {(() => {
                            switch (buttonname) {
                                case 'sellerlogin':

                                    return (
                                        <div>
                                            <div className='inside-forms'   >
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 8 }}
                                                    wrapperCol={{ span: 16 }}
                                                    style={{ maxWidth: 600 }}
                                                    initialValues={{ remember: true }}
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                    autoComplete="off"
                                                    layout='vertical'
                                                >
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        rules={[{ required: true, message: 'Please input your Email!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <div className='mt-5'>
                                                        <Form.Item
                                                            label="Password"
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                                        >
                                                            <Input.Password />
                                                        </Form.Item>

                                                    </div>

                                                    <div onClick={signups}>
                                                        Signup
                                                    </div>

                                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                        <Button type="primary" htmlType="submit" className="kalai">
                                                            Login Seller
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>

                                        </div>
                                    )
                                case 'adminlogin':
                                    return (
                                        <div>
                                            <div className='inside-forms'   >
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 8 }}
                                                    wrapperCol={{ span: 16 }}
                                                    style={{ maxWidth: 600 }}
                                                    initialValues={{ remember: true }}
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                    autoComplete="off"
                                                    layout='vertical'
                                                >
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        rules={[{ required: true, message: 'Please input your Email!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <div className='mt-5'>
                                                        <Form.Item
                                                            label="Password"
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                                        >
                                                            <Input.Password />
                                                        </Form.Item>

                                                    </div>


                                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                        <Button type="primary" htmlType="submit" className="kalai">
                                                            Login Admin
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </div>
                                    )

                                case 'enduser':
                                    return (
                                        <div>
                                            <div className='inside-forms'   >
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 8 }}
                                                    wrapperCol={{ span: 16 }}
                                                    style={{ maxWidth: 600 }}
                                                    initialValues={{ remember: true }}
                                                    onFinish={onFinish}
                                                    onFinishFailed={onFinishFailed}
                                                    autoComplete="off"
                                                    layout='vertical'
                                                >
                                                    <Form.Item
                                                        label="Email"
                                                        name="email"
                                                        rules={[{ required: true, message: 'Please input your Email!' }]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <div className='mt-5'>
                                                        <Form.Item
                                                            label="Password"
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                                        >
                                                            <Input.Password />
                                                        </Form.Item>

                                                    </div>

                                                    <div onClick={signups1}>
                                                        Signup
                                                    </div>


                                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                                        <Button type="primary" htmlType="submit" className="kalai">
                                                            Login End User
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </div>
                                    )
                            }
                        })()}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login