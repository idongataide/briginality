"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Select, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";
// import { ResponseValue } from "@/interfaces/enums";
import { Country, ICountry } from "country-state-city";
import dayjs from "dayjs";

const BasicInfo = () => {
  const { setNavPath } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [showGuardianEmail, setShowGuardianEmail] = useState(false);
  const navigate = useNavigate();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { Option } = Select;

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const calculateAge = (dateOfBirth: dayjs.Dayjs) => {
    const today = dayjs();
    return today.diff(dateOfBirth, 'year');
  };

  const handleDateOfBirthChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const age = calculateAge(date);
      setShowGuardianEmail(age < 18);
    } else {
      setShowGuardianEmail(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      // Mock or replace this with actual API call logic if needed
      console.log("Form values:", values);
      toast.success("Form submitted successfully");

      // Redirect to next section
      setNavPath("club-preference");
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
          <h2 className="text-[#1C2023]">Basic Info</h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
                <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
                >
                <Input placeholder="Test Name" />
                </Form.Item>
            </div>
           
              <div className="col-md-6">
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ required: true, message: "Please enter your date of birth" }]}
                >
                  <DatePicker 
                    placeholder="Select Date of Birth"
                    className="w-full h-[43px]!"
                    onChange={handleDateOfBirthChange}
                  />
                </Form.Item>
              </div>
            {showGuardianEmail && (
              <div className="col-md-6">
                  <Form.Item
                  name="guardianEmail"
                  label="Guardian Email Address"
                  rules={[
                      { required: true, message: "Please enter guardian's email" },
                      { type: "email", message: "Invalid email format" },
                  ]}
                  >
                  <Input placeholder="guardian@email.com" />
                  </Form.Item>
              </div>
            )}
           
              <div className="col-md-6">
                  <Form.Item
                  name="email"
                  label="Student Email Address"
                  rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Invalid email format" },
                  ]}
                  >
                  <Input placeholder="your@email.com" />
                  </Form.Item>
              </div>
            
        
            <div className="col-md-6">
                <Form.Item name="pronouns" label="Pronouns (Optional)">
                <Input placeholder="They/Them" />
                </Form.Item>
            </div>
            <div className="col-md-6">
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, message: "Please select your country" }]}
                >
                  <Select
                    showSearch
                    placeholder="Select Country"
                    className="rounded-[5px] h-[43px]! font-[400]!"
                    filterOption={(input, option) =>
                      String(option?.children)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value="">Select Country</Option>
                    {countries.map((country) => (
                      <Option key={country.isoCode} value={country.name}>
                        {country.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
            </div>
            <Form.Item
              name="homeschoolStatus"
              label="Are you homeschooled? (Includes non-traditional learning)"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group>
                <Radio value="homeschooled">Yes, I'm homeschooled</Radio>
                <Radio value="non-traditional">
                   I follow a non-traditional or flexible learning model
                </Radio>
                <Radio value="traditional">
                  No, I attend a traditional in-person school
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="region"
              label="Which region are you located in?"
              rules={[{ required: true, message: "Please select a region" }]}
            >
              <Radio.Group>
                <Radio value="afro-euro">AfroEuro – Africa + Europe</Radio>
                <Radio value="amerisphere">
                  AmeriSphere – North, Central & South America
                </Radio>
                <Radio value="asialume">
                  AsiaLume – Asia + Australia/Oceania
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-[100%] font-medium h-[42px]!"
              >
                Submit & Continue
              </Button>
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

export default BasicInfo;
