import React from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Images from "@/components/images";
import { useNavigate } from "react-router-dom";
import { useLeadershipStore } from "@/global/leadershipStore";

const EnterPassword = () => {
    const { setOtpRequestId, setOtpValue, setNavPath } = useLeadershipStore();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            form.setFields([
                {
                    name: 'confirmPassword',
                    errors: ['Passwords do not match'],
                },
            ]);
            return;
        }
        // Add leadership password reset logic here
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpRequestId(null);
            setOtpValue(null);
            navigate('/leadership/login/forgot-password');
            setNavPath("success");
        }, 1000);
    };

    return (
        <div className="flex flex-col items-start w-full">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Leadership: Set New Password</title>
            </Helmet>
            <div className="flex justify-center m-auto mb-6">
                <img src={Images.logo} alt="Logo" className="h-10" />
            </div>
            <div className="mb-8 text-start ">
                <h2 className="text-2xl font-bold! text-[#475467] mb-1!">Set New Password</h2>
                <p className="text-sm font-medium text-[#667085]">Please set your new password.</p>
            </div>
            <Form
                form={form}
                name="leadership-resetPassword"
                layout="vertical"
                onFinish={onFinish}
                className="w-full"
            >
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Enter your new password"
                        className="h-[42px]"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        placeholder="Confirm your new password"
                        className="h-[42px]"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-[46px]! mt-3! rounded-lg bg-[#FF6C2D] text-white font-medium text-lg hover:bg-[#FF6C2D]/90 transition border-0"
                    >
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EnterPassword; 