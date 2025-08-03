"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";

const LeadershipLogin = () => {
  const navigate = useNavigate();
  const navPath = useLeadershipStore();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true);
    // Leadership login logic here
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem(
        "leadershipToken",
        JSON.stringify({ access: "dummy-leadership-token" })
      );
      toast.success('Leadership Login Successful');
      navigate("/leadership");
    }, 1000);
  };

  return (
    <>
      <div className="row justify-content-center g-0">
        <div className="col-12">
          <div className="bg-white rounded10">
            <div className="content-top-agile text-left! mb-20">
              <h2 className="text-[#1C2023]">Welcome Back</h2>
              <p className="mb-0 text-lg">Sign in to continue as leader.</p>
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
                    onClick={() => navigate("/leadership/login/forgot-password")}
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
                  navPath.setNavPath("leadership-basic-info");
                }}>
                  Don't have an account?{" "}
                  <Link to="/leadership/signup" className="text-[#F9607F]">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipLogin; 