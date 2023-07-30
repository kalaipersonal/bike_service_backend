import React, { useEffect } from 'react'
import '../login/styles/Login.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { ToastMessageError, ToastMessageSuccess } from '../../toastmessage/Toastmessage';
import { Sellerregiter } from '../../services/login_services/Login_services';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const datas = {
            userName: values?.username,
            email: values?.email,
            password: values?.password,
            contactno: values?.contactno
        }

        try {
            const response = await Sellerregiter(datas);
            ToastMessageSuccess(response?.data?.message);
            setTimeout(() => {
                navigate("/");
            }, 700);
        }
        catch (err) {
            ToastMessageError(err);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div className='insidemainsection'>
            <div className='insidelogin'>
                <div className='col-lg-6 left-image'>
                    <img src='https://cdn3d.iconscout.com/3d/premium/thumb/euro-money-delivery-by-motorbike-5139583-4300862.png' alt="no image" />
                </div>
                <div className='col-lg-6 right-content'>
                    <div className='inside-forms'>
                        <div className='mb-5 mt-2'>
                            <h3>Signup</h3>
                        </div>
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
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="contactno"
                                name="contactno"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                                max={10}

                            >
                                <Input />
                            </Form.Item>

                            <div className='mt-2'>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                            </div>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup