"use client";
import  { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/global/store";
import { signup } from "@/api/authAPI";
import dayjs from "dayjs";

const Accommodations = () => {
  const { setNavPath, studentSignupData, setStudentSignupData, clearStudentSignupData } = useOnboardingStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accountedNeeds, setAccountedNeeds] = useState<string | null>(null);
  const [participationNeeds, setParticipationNeeds] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Load existing data if available
    if (studentSignupData.accommodations) {
      form.setFieldsValue(studentSignupData.accommodations);
      setAccountedNeeds(studentSignupData.accommodations.accountedNeeds);
      setParticipationNeeds(studentSignupData.accommodations.participationAccommodations);
    }
  }, [form, studentSignupData.accommodations]);

  const handleAccountedNeedsSelection = (value: string) => {
    setAccountedNeeds(value);
    form.setFieldsValue({ accountedNeeds: value });
  };

  const handleParticipationNeedsSelection = (value: string) => {
    setParticipationNeeds(value);
    form.setFieldsValue({ participationAccommodations: value });
  };

  // Transform the data to match the API payload structure
  const transformDataForAPI = () => {
    const basicInfo = studentSignupData.basicInfo;
    const clubPreference = studentSignupData.clubPreference;
    const experience = studentSignupData.experience;
    const accommodations = studentSignupData.accommodations;

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth: string | dayjs.Dayjs) => {
      try {
        const today = dayjs();
        const birthDate = typeof dateOfBirth === 'string' ? dayjs(dateOfBirth) : dateOfBirth;
        
        // Validate the date
        if (!birthDate.isValid()) {
          console.warn('Invalid date of birth:', dateOfBirth);
          return null;
        }
        
        let age = today.diff(birthDate, 'year');
        const monthDiff = today.month() - birthDate.month();
        if (monthDiff < 0 || (monthDiff === 0 && today.date() < birthDate.date())) {
          age--;
        }
        return age;
      } catch (error) {
        console.error('Error calculating age:', error);
        return null;
      }
    };

    // Extract club IDs from club preference
    const clubIds = Object.values(clubPreference || {}).filter(Boolean);

    return {
      name: basicInfo?.fullName || "",
      email: basicInfo?.email || "",
      parent_email: basicInfo?.guardianEmail || basicInfo?.email || "",
      age: basicInfo?.dateOfBirth ? calculateAge(basicInfo.dateOfBirth) || null : null,
      pronouns: basicInfo?.pronouns || "",
      country_timezone: basicInfo?.country || "",
      homeschool_status: basicInfo?.homeschoolStatus || "",
      region_id: basicInfo?.region || null,
      club_preference: clubIds,
      experience: [
        ...(experience?.managementExperience ? [experience.managementExperience] : []),
        ...(experience?.joinExpectations ? [experience.joinExpectations] : [])
      ],
      accessibility: [
        ...(accommodations?.accountedNeeds === "Yes" && accommodations?.accountedNeedsDetails ? [accommodations.accountedNeedsDetails] : ["No special accommodations needed"]),
        ...(accommodations?.participationAccommodations === "Yes" && accommodations?.participationDetails ? [accommodations.participationDetails] : ["No participation accommodations needed"])
      ],
      participation: "Very active", // Default value as per your requirement
      notes: `${experience?.joinExpectations || ""} ${accommodations?.accountedNeedsDetails || ""}`.trim() || "Looking forward to joining"
    };
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setStudentSignupData("accommodations", values);

      if (!studentSignupData.basicInfo || !studentSignupData.clubPreference || !studentSignupData.experience) {
        message.error("Please complete all previous steps before submitting.");
        return;
      }

      const payload = transformDataForAPI();
      const response = await signup(payload);

      // Handle API validation errors
      if (response?.response?.data?.status === "error") {
        // If error_message contains field errors, display them
        if (response?.response?.data?.error_message && typeof response?.response?.data?.error_message === "object") {
          Object.entries(response?.response?.data?.error_message).forEach(([_, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => message.error(msg));
            }
          });
        } else if (response.message) {
          message.error(response?.response?.data?.message);
        } else {
          message.error("Signup failed due to an unknown error.");
        }
        return; // stop execution here
      }    
      // Success case
      if (response?.status === "success") {
        message.success("Signup successful! Please check your email for verification.");
        clearStudentSignupData();
        setNavPath("success");
        navigate("/signup");
      } else {
        message.error("Signup failed. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred during submission.");
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
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    type={accountedNeeds === "Yes" ? "primary" : "default"}
                    onClick={() => handleAccountedNeedsSelection("Yes")}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    type={accountedNeeds === "No" ? "primary" : "default"}
                    onClick={() => handleAccountedNeedsSelection("No")}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
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
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    type={participationNeeds === "Yes" ? "primary" : "default"}
                    onClick={() => handleParticipationNeedsSelection("Yes")}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    type={participationNeeds === "No" ? "primary" : "default"}
                    onClick={() => handleParticipationNeedsSelection("No")}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
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
                  onClick={() => {
                    setNavPath("experience");
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
                  Submit Application
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
