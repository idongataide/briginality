"use client";
import React from "react";
import { Form, Input, Button, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";

const Experience = () => {
  const { setNavPath } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [hasExperience, setHasExperience] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const navPath = useOnboardingStore();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Experience form values:", values);
      toast.success("Form submitted successfully");
      setNavPath("motivation");
      navigate("/signup");
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
                <Radio.Group
                  onChange={e => setHasExperience(e.target.value)}
                  value={hasExperience}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            {hasExperience === "yes" && (
              <div className="col-md-12">
                <Form.Item
                  name="leadershipDetails"
                  label="If you answered yes to the previous question, please tell us more about your leadership experience!"
                  rules={[{ required: true, message: "This field is required" }]}
                >
                  <Input.TextArea rows={6} placeholder="Describe your leadership experience" />
                </Form.Item>
              </div>
            )}

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    navPath.setNavPath("availability");   
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