"use client";
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";
// import { ResponseValue } from "@/interfaces/enums";


const Experiences = () => {
  const { setNavPath, studentSignupData, setStudentSignupData } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load existing data if available
    if (studentSignupData.experience) {
      form.setFieldsValue(studentSignupData.experience);
    }
  }, [form, studentSignupData.experience]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      // Save data to store
      setStudentSignupData("experience", values);
      
      console.log("Form values:", values);
      toast.success("Experience information saved successfully");
      
      setNavPath("accomodations");
      navigate('/student/signup');
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
          <h2 className="text-[#1C2023]">Decisive and Goals</h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
              <Form.Item
                name="managementExperience"
                label="How long have you been homeschooled? *"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input placeholder="Enter your experience duration" />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="joinExpectations"
                label="What do you hope to gain from joining Bridginality? (e.g., new friends, learning skills, socializing)"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input.TextArea rows={10} className="min-h-[80px]!" placeholder="Enter your expectations" />
              </Form.Item>
            </div>

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    setNavPath("club-preference");   
                    navigate('/student/signup');
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
                  Save & Continue
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

export default Experiences;