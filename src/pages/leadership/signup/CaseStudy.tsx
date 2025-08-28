"use client";
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";

const CaseStudy = () => {
  const { setNavPath, setLeadershipSignupData, leadershipSignupData } = useLeadershipStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const navPath = useLeadershipStore();

  useEffect(() => {
    // Load existing data if available
    if (leadershipSignupData?.case_study) {
      form.setFieldsValue(leadershipSignupData.case_study);
    }
  }, [form, leadershipSignupData?.case_study]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setLeadershipSignupData("case_study", values);
      toast.success("Case study saved");
      setNavPath("leadership-final-notes");
      navigate("/leadership/signup");
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
          <h2 className="text-[#1C2023]">Case Study <span className="text-xs">(Required for all applicants)</span></h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-800 mb-2">SCENARIO:</h4>
                <p className="text-gray-700 leading-relaxed">
                  DURING A CLUB MEETING, A STUDENT MAKES AN INSENSITIVE JOKE THAT ANOTHER MEMBER FINDS OFFENSIVE. 
                  THE UPSET STUDENT MESSAGES YOU PRIVATELY AFTER THE MEETING, CLEARLY HURT.
                </p>
              </div>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="caseStudyResponse"
                label="HOW WOULD YOU HANDLE THIS SITUATION AS A LEADER?"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input.TextArea 
                  rows={8} 
                  placeholder="Please describe how you would handle this sensitive situation as a leader. Consider aspects like conflict resolution, empathy, communication, and maintaining a positive club environment."
                  className="min-h-[200px]"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    navPath.setNavPath("leadership-experience");   
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
                  Next
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

export default CaseStudy; 