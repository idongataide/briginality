"use client";
import React from "react";
import { Form, Button, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";


const Availability = () => {
  const { setNavPath } = useLeadershipStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const navPath = useLeadershipStore();


  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Form values:", values);
      toast.success("Form submitted successfully");
      setNavPath("leadership-club-preference");
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
          <h2 className="text-[#1C2023]">Availability & Commitment</h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
              <Form.Item
                name="availabilityCommitment"
                label={
                  <span>
                    Are you available for:<br />
                    - A 2-week online training period?<br />
                    - A 1-year volunteer leadership role (approx. 2-4 hours/week)?
                  </span>
                }
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Select className="h-[43px]!" placeholder="Select your availability">
                  <Select.Option value="both">Yes, I can commit to both</Select.Option>
                  <Select.Option value="occasional">I may have occasional conflicts, but I'm generally available</Select.Option>
                  <Select.Option value="no">No, I can't commit right now</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="weekendAvailability"
                label={
                  <span>
                    What times are you most available on weekends? Please select all that apply:
                  </span>
                }
                rules={[{ required: true, message: "Please select at least one option" }]}
              >
                <Select
                  mode="multiple"
                  className="h-[43px]!"
                  placeholder="Select available times"
                  options={[
                    { label: "Saturday Morning", value: "Saturday Morning" },
                    { label: "Saturday Afternoon", value: "Saturday Afternoon" },
                    { label: "Sunday Morning", value: "Sunday Morning" },
                    { label: "Sunday Afternoon", value: "Sunday Afternoon" },
                    { label: "It varies / I'm flexible", value: "It varies / I'm flexible" },
                  ]}
                />
              </Form.Item>
            </div>

            {/* The rest of your form fields can go here if needed */}
            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    navPath.setNavPath("leadership-basic-info");   
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
                <Link to="/leadership" className="text-[#F9607F]">
                    Sign in
                </Link>
            </p>       
        </div>
      </div>
    </div>
  );
};

export default Availability;