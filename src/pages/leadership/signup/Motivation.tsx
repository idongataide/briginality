"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";
// import { ResponseValue } from "@/interfaces/enums";


const Motivation = () => {
  const { setNavPath } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const navPath = useOnboardingStore();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Motivation form values:", values);
      toast.success("Form submitted successfully");
      setNavPath("leadership-experience");
      navigate('/leadership/signup');
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12 mx-auto">
      <div className="bg-white rounded10">
        <div className="content-top-agile text-left! mb-30">
          <h2 className="text-[#1C2023]">Motivation & Values</h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
              <Form.Item
                name="motivation"
                label="Why do you want to be part of the Bridginality leadership team? *"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input.TextArea rows={4} className="min-h-[80px]!" placeholder="Describe your motivation for joining the leadership team" />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="fitReason"
                label="What makes you a strong fit for the position(s) you selected? *"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input.TextArea rows={10} className="min-h-[80px]!" placeholder="Explain why you are a strong fit for the selected position(s)" />
              </Form.Item>
            </div>

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    navPath.setNavPath("club-preference");   
                  }}               
                  className="w-[50%] mt-4 font-medium h-[42px]!"
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-[50%] mt-4 font-medium h-[42px]!"
                >
                  Submit & Continue
                </Button>
              </div>
            </Form.Item>
          </Form> 
          <p className="mb-0 text-center text-[#7D8489]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#F9607F]">
                    Sign in
                </Link>
            </p>       
        </div>
      </div>
    </div>
  );
};

export default Motivation;