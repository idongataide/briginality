"use client";
import React, { useEffect } from "react";
import { Form, Button, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";
import { useClubCategories } from "@/hooks/useEnums";



const ClubPreference = () => {
  const { setNavPath, studentSignupData, setStudentSignupData } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
  const {data : clubs} = useClubCategories()

  const clubOptions =
  clubs?.data?.map((category:any) => ({
    label: category?.name,
    field: category?.name.toLowerCase().replace(/ & | /g, "_") + "_club",
    options: category?.clubs?.map((club:any) => ({
      label: `${club?.name} `,
      value: club?.id,
    })),
  })) || [];

  useEffect(() => {
    // Load existing data if available
    if (studentSignupData?.clubPreference) {
      form.setFieldsValue(studentSignupData.clubPreference);
    }
  }, [form, studentSignupData?.clubPreference]);

  const onFinish = async (values: any) => {
    
    try {
      setLoading(true);
      
      // Save data to store
      setStudentSignupData("clubPreference", values);
      
      console.log("Form values:", values);
      toast.success("Club preferences saved successfully");
      
      // Redirect to next section
      setNavPath("experience");
      navigate('/signup')

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
          <h2 className="text-[#1C2023]">Club Preference</h2>
          <p>Select up to 4 clubs—one from each category: STEM, Creative & Cultural, Civic & Intellectual, and Life Skills.</p>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            {clubOptions.map((category:any) => (
              <div className="col-md-12" key={category.field}>
                <Form.Item
                  name={category.field}
                  label={category.label}
                  rules={[{ required: true, message: `Please select a club from ${category.label}` }]}
                >
                  <Select
                    allowClear
                    placeholder={`Select one club from ${category.label}`}
                    options={category.options}
                    className="min-h-[42px]!"
                  />
                </Form.Item>
              </div>
            ))}
            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    setNavPath("basic-info");   
                    navigate('/signup');
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

export default ClubPreference;
