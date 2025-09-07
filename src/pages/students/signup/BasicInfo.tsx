"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Select, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useOnboardingStore } from "@/global/store";
// import { ResponseValue } from "@/interfaces/enums";
import { Country, ICountry } from "country-state-city";
import dayjs from "dayjs";
import { useRegions } from "@/hooks/useEnums";
import { FaAngleLeft } from "react-icons/fa";


const BasicInfo = () => {
  const { setNavPath, studentSignupData, setStudentSignupData } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [showGuardianEmail, setShowGuardianEmail] = useState(false);
  const navigate = useNavigate();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { Option } = Select;
  const homeschoolStatus = Form.useWatch('homeschoolStatus', form);

  const {data : regions } = useRegions();


  useEffect(() => {
    setCountries(Country.getAllCountries());
    
    // Load existing data if available
    if (studentSignupData?.basicInfo) {
      const formData: any = { ...studentSignupData.basicInfo };
      
      // Convert date string to dayjs object if it exists
      if (formData.dateOfBirth && typeof formData.dateOfBirth === 'string') {
        try {
          const dateObj = dayjs(formData.dateOfBirth);
          if (dateObj.isValid()) {
            formData.dateOfBirth = dateObj;
            
            // Check if guardian email should be shown
            const age = calculateAge(dateObj);
            setShowGuardianEmail(age < 18);
          } else {
            console.warn('Invalid date format:', formData.dateOfBirth);
            delete formData.dateOfBirth; // Remove invalid date
          }
        } catch (error) {
          console.error('Error parsing date:', error);
          delete formData.dateOfBirth; // Remove problematic date
        }
      }
      
      form.setFieldsValue(formData);
    }
  }, [form, studentSignupData?.basicInfo]);

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

      if (values?.homeschoolStatus !== 'homeschooled') {
        toast.error("To continue, select 'Yes, I'm homeschooled'.");
        return;
      }

      // Convert dayjs date to string before saving
      const dataToSave = { ...values };
      if (dataToSave.dateOfBirth && typeof dataToSave.dateOfBirth !== 'string') {
        dataToSave.dateOfBirth = dataToSave.dateOfBirth.format('YYYY-MM-DD');
      }

      // Save data to store
      setStudentSignupData("basicInfo", dataToSave);
      
      console.log("Form values:", dataToSave);
      toast.success("Basic information saved successfully");

      // Redirect to next section
      setNavPath("club-preference");
      navigate('/student/signup')
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
          <h2 className="text-[#1C2023] flex items-center">  <FaAngleLeft 
            onClick={() => {
            navigate(-1);
          }} className="me-1 cursor-pointer" /> Basic Info</h2>
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
                  label="Date of Birth (14-18 years)"
                  rules={[{ required: true, message: "Please enter your date of birth" }]}
                >
                  <DatePicker 
                    placeholder="Select Date of Birth"
                    className="w-full h-[43px]!"
                    onChange={handleDateOfBirthChange}
                                         disabledDate={(current) => {
                       if (!current) return false;
                       
                       const today = dayjs();
                       // Allow students who are 14-18 years old
                       // Calculate the birth years dynamically based on current year
                       const minBirthYear = today.subtract(18, 'year').year(); // 18 years ago
                       const maxBirthYear = today.subtract(14, 'year').year(); // 14 years ago
                       
                       const birthYear = current.year();
                       
                       // Only allow years within the 14-18 age range
                       if (birthYear < minBirthYear || birthYear > maxBirthYear) {
                         return true; // Disable all dates outside these years
                       }
                       
                       return false; // Allow all dates within the valid years
                     }}
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
                {regions?.data?.map((region: any) => (
                  <Radio key={region.id} value={region.id}>
                    {region.name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            {homeschoolStatus === 'homeschooled' ? (
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-[100%] font-medium h-[42px]!"
                >
                  Save & Continue
                </Button>
              </Form.Item>
            ) : (
              <div className="mb-3 text-center text-[#7D8489]">
                You can proceed by selecting "Yes, I'm homeschooled".
              </div>
            )}
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
