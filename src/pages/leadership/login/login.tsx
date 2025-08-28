"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";
import { login } from "@/api/authAPI";
import { ResponseValue } from "@/interfaces/enums";
import { setNavData } from "../common/setNavData";
import { useOnboardingStore } from "@/global/store";
import { FaAngleLeft } from "react-icons/fa";

const LeadershipLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { setEmail, setUserName, setRole, setPresidedClubs } = useLeadershipStore();
  const navPath = useLeadershipStore();
  // const onboardingStore = useOnboardingStore();

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

        localStorage.clear();
        useLeadershipStore.persist.clearStorage();
        useOnboardingStore.persist.clearStorage(); 

        if (res.status === ResponseValue.SUCCESS) {
          toast.success('Login Successful');
          setNavData(navPath, values.email, res);
          try {
            setEmail(res?.data?.email ?? values.email);
            setUserName(res?.data?.name ?? '');
            const roles = Array.isArray(res?.data?.role)
              ? res.data.role
              : res?.data?.role
              ? [res.data.role]
              : [];
            setRole(roles[0] ?? '');
            const clubs = Array.isArray(res?.data?.presided_clubs) ? res.data.presided_clubs : [];
            setPresidedClubs(clubs as any);
          } catch (_) {}
      
          localStorage.setItem(
            "apiToken",
            JSON.stringify({ access: res?.data?.apiToken })
          );
          navigate("/leadership/dashboard");
        }  else {
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
      <div className="row justify-content-center g-0">
        <div className="col-12">
          <div className="bg-white rounded10">
            <div className="content-top-agile text-left! mb-20">
              <h2 className="text-[#1C2023] flex items-center">  <FaAngleLeft 
                    onClick={() => {
                    navigate(-1);
                  }} className="me-1 cursor-pointer" /> Login as a Student </h2>
              {/* <p className="mb-0 text-lg">Sign in to continue as leader.</p> */}
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