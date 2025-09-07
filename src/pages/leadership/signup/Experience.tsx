"use client";
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";

const Experience = () => {
  const { setNavPath, setLeadershipSignupData, leadershipSignupData } = useLeadershipStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [hasExperience, setHasExperience] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const navPath = useLeadershipStore();

  useEffect(() => {
    // Load existing data if available
    if (leadershipSignupData?.experience) {
      const formData = leadershipSignupData.experience;
      form.setFieldsValue(formData);
      if (formData.hasLeadershipExperience) {
        setHasExperience(formData.hasLeadershipExperience);
      }
    }
  }, [form, leadershipSignupData?.experience]);

  const onFinish = async (values: any) => {
    try {
      console.log('sds1')
      setLoading(true);
      // Add the hasExperience to the form values
      const formData = { ...values, hasLeadershipExperience: hasExperience };
      setLeadershipSignupData("experience", formData);
      toast.success("Experience saved");
      setNavPath("leadership-case-study");
      navigate("/leadership/signup");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSelection = (value: string) => {
    setHasExperience(value);
    // Update the form field value
    form.setFieldsValue({ hasLeadershipExperience: value });
  };

  return (
    <div className="col-md-12 mx-auto">
      <div className="bg-white rounded10">
        <div className="content-top-agile text-left! mb-30">
          <h2 className="text-[#1C2023]">Experience <span className="text-xs">(Optional but Encouraged)</span></h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
              <Form.Item
                name="hasLeadershipExperience"
                label="Do you have any leadership experience (formal or informal)? *"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    type={hasExperience === "yes" ? "primary" : "default"}
                    onClick={() => handleExperienceSelection("yes")}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    type={hasExperience === "no" ? "primary" : "default"}
                    onClick={() => handleExperienceSelection("no")}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </Form.Item>
            </div>

            {hasExperience === "yes" && (
              <div className="col-md-12">
                <Form.Item
                  name="leadershipDetails"
                  label="If you answered yes to the previous question, please tell us more about your leadership experience!"
                  rules={[{ required: true, message: "This field is required" }]}
                >
                  <Input.TextArea rows={10} className="min-h-[80px]!" placeholder="Describe your leadership experience" />
                </Form.Item>
              </div>
            )}

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    navPath.setNavPath("leadership-motivation");   
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

export default Experience; 