"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/authAPI";
import toast from "react-hot-toast";
import { setNavData } from "../common/setNavData";
import { useOnboardingStore } from "@/global/store";
import { sendOtp } from "@/api/otpApi";
import { ResponseValue } from "@/interfaces/enums";

const Login = () => {
  const { setNavPath, setOtpRequestId, setEmail } = useOnboardingStore();
  const navigate = useNavigate();
  const navPath = useOnboardingStore();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };

    login(data)
      .then((res) => {
        if (res?.error) {
          toast.error(res.message);
          return;
        }

        if (res.status === ResponseValue.SUCCESS) {
          toast.success('Login Successful');
          setNavData(navPath, values.email, res);
          localStorage.setItem(
            "adminToken",
            JSON.stringify({ access: res?.data?.token })
          );
          navigate("/");
        } else if (res.status === 'reset-pass') {
          const otpData = {
            otp_request_id: res?.otp_request_id,
            otp_mode: 'email'
          };

          sendOtp(otpData)
            .then((otpRes) => {
              if (otpRes?.error) {
                toast.error(otpRes.message || 'Failed to send OTP');
              } else {
                setOtpRequestId(otpRes?.data?.otp_request_id);
                toast.success('OTP sent. Please enter the code to reset your password.');
                navigate('/login/forgot-password');
                setNavPath("enter-otp");
                setEmail(values.email);
              }
            })
            .catch((otpError) => {
              toast.error(otpError.message || "An error occurred while sending OTP");
            });
        } else {
          toast.error(res?.response?.data?.msg);
        }
      })
      .catch((error) => {
        toast.error(error.message || "An unexpected error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="col-12">
        <div className="row justify-content-center g-0">
          <div className="col-12">
            <div className="bg-white rounded10">
            <div className="content-top-agile text-left! mb-20">
                <h2 className="text-[#1C2023]">Let's Get Started</h2>
                <p className="mb-0 text-lg">Sign in to continue.</p>
              </div>
              <div className="">
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Invalid email format!' },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      placeholder="Password"
                      iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  <div className="d-flex justify-content-end mb-3">
                    <a
                      className="text-[#F9607F]"
                      onClick={() => navigate("/login/forgot-password")}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-[100%] h-[42px]!"
                      loading={loading}
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>

                <div className="text-center mt-3">
                  <p className="mb-0 text-[#7D8489]" onClick={() => {
                        navPath.setNavPath("basic-info");
                    }}>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#F9607F]">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
