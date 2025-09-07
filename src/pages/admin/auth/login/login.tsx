"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/authAPI";
import toast from "react-hot-toast";
import { setNavData } from "../common/setNavData";
import { useOnboardingStore } from "@/global/store";
import { ResponseValue } from "@/interfaces/enums";
import { useLeadershipStore } from "@/global/leadershipStore";

const AdminLogin = () => {
  const navigate = useNavigate();
  const navPath = useOnboardingStore();
  const [loading, setLoading] = React.useState(false);
  const { setEmail, setUserName, setRole } = useOnboardingStore();

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
          localStorage.clear();
          useLeadershipStore.persist.clearStorage();
          useOnboardingStore.persist.clearStorage(); 
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
          } catch (_) {}
          localStorage.setItem(
            "apiToken",
            JSON.stringify({ access: res?.data?.apiToken })
          );
          navigate("/admin/dashboard");
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
     <div className="col-12 bg-red-600 d-flex justify-content-center align-items-center min-h-[100vh]">
        <div className="row justify-content-center g-0 w-[500px]"> {/* Adjust width here */}
          <div className="col-12">
            <div className="bg-white rounded10 p-40 w-full">
              <div className="content-top-agile text-center! mb-20">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-[250px] mb-4 mx-auto"
                />
                <h2 className="text-[#1C2023] font-semibold!">Welcome Back Admin</h2>
                <p className="mb-0 text-lg">Sign in to continue as admin.</p>
              </div>
              <div>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Invalid email format!" },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                  >
                    <Input.Password
                      placeholder="Password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>

                  {/* <div className="d-flex justify-content-end mb-3">
                    <a
                      className="text-[#F9607F]"
                      onClick={() => navigate("/login/forgot-password")}
                    >
                      Forgot Password?
                    </a>
                  </div> */}

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

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminLogin;
