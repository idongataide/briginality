"use client";
import  { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";

const Accommodations = () => {
  const { setNavPath } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accountedNeeds, setAccountedNeeds] = useState<string | null>(null);
  const [participationNeeds, setParticipationNeeds] = useState<string | null>(null);

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log("Form values:", values);
      toast.success("Form submitted successfully");
      setNavPath("success");
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
          <h2 className="text-[#1C2023]">Accessibility and Needs</h2>
        </div>
        <div className="p-0">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            className="row"
          >
            <div className="col-md-12 p-20">
              <Form.Item
                name="accountedNeeds"
                label="Do you have any accessibility needs we should be aware of?*"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Radio.Group
                  value={accountedNeeds}
                  onChange={(e) => {
                    setAccountedNeeds(e.target.value);
                    form.setFieldsValue({ accountedNeeds: e.target.value });
                  }}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

              {accountedNeeds === "Yes" && (
                <Form.Item
                  name="accountedNeedsDetails"
                  label="If you answered 'Yes', please tell us how we can accommodate your needs!"
                  rules={[{ required: true, message: "Please provide details." }]}
                >
                  <Input.TextArea rows={3} placeholder="Your answer" />
                </Form.Item>
              )}
            </div>

            <div className="col-md-12 p-20">
              <Form.Item
                name="participationAccommodations"
                label="Do you need any accommodations to participate in it?"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Radio.Group
                  value={participationNeeds}
                  onChange={(e) => {
                    setParticipationNeeds(e.target.value);
                    form.setFieldsValue({ participationAccommodations: e.target.value });
                  }}
                >
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

              {participationNeeds === "Yes" && (
                <Form.Item
                  name="participationDetails"
                  label="If you answered 'Yes', please tell us how we can accommodate your needs!"
                  rules={[{ required: true, message: "Please provide details." }]}
                >
                  <Input.TextArea rows={3} placeholder="Your answer" />
                </Form.Item>
              )}
            </div>

            <Form.Item className="col-md-12 p-20">
              <div style={{ display: "flex", gap: "12px" }}>
                <Button
                  type="default"
                  onClick={() => setNavPath("experience")}
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

export default Accommodations;
