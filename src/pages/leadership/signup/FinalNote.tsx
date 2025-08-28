"use client";
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";
import dayjs from "dayjs";
import { submitLeadershipApplication } from "@/api/authAPI";

const FinalNote = () => {
  const { setNavPath, leadershipSignupData, setLeadershipSignupData, clearLeadershipSignupData } = useLeadershipStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load existing data if available
    if (leadershipSignupData?.finalNotes) {
      form.setFieldsValue(leadershipSignupData.finalNotes);
    }
  }, [form, leadershipSignupData?.finalNotes]);

  const buildPayload = () => {
    const basicInfo = leadershipSignupData.basicInfo || {};
    const availability = leadershipSignupData.availability || {};
    const clubPreference = leadershipSignupData.clubPreference || {};
    const motivation = leadershipSignupData.motivation || {};
    const experience = leadershipSignupData.experience || {};
    const caseStudy = leadershipSignupData.case_study || {};
    const finalNotes = leadershipSignupData.finalNotes || {};

    const calculateAge = (dateOfBirth: string | dayjs.Dayjs) => {
      try {
        const today = dayjs();
        const birthDate = typeof dateOfBirth === 'string' ? dayjs(dateOfBirth) : dateOfBirth;
        if (!birthDate?.isValid?.() || !birthDate) return null;
        let age = today.diff(birthDate, 'year');
        const monthDiff = today.month() - birthDate.month();
        if (monthDiff < 0 || (monthDiff === 0 && today.date() < birthDate.date())) {
          age--;
        }
        return age;
      } catch {
        return null;
      }
    };

    const clubIds = Object.values(clubPreference || {}).filter(Boolean) as (string|number)[];
    const availabilityList = Array.isArray(availability?.weekendAvailability) ? availability.weekendAvailability : [];

    return {
      name: basicInfo?.fullName || "",
      email: basicInfo?.guardianEmail || "",
      age: basicInfo?.dob ? calculateAge(basicInfo.dob) : null,
      pronouns: basicInfo?.pronouns || "",
      country_timezone: basicInfo?.country || "",
      homeschool_status: basicInfo?.homeschoolStatus || "",
      region_id: basicInfo?.region || null,
      role: basicInfo?.role || "",
      availability: availabilityList,
      club_preference: clubIds,
      motivation: [motivation?.motivation, motivation?.fitReason].filter(Boolean) as string[],
      experience: experience?.hasLeadershipExperience === 'yes' && experience?.leadershipDetails ? [experience.leadershipDetails] : [],
      case_study: caseStudy?.caseStudyResponse ? [caseStudy.caseStudyResponse] : [],
      notes: finalNotes?.additionalNotes || "Available to start immediately"
    };
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setLeadershipSignupData("finalNotes", values);

      if (!leadershipSignupData.basicInfo || !leadershipSignupData.clubPreference || !leadershipSignupData.motivation) {
        toast.error("Please complete all previous steps before submitting.");
        return;
      }

      const payload = buildPayload();
      const response = await submitLeadershipApplication(payload);

        // Handle API validation errors
        if (response?.response?.data?.status === "error") {
          // If error_message contains field errors, display them
          if (response?.response?.data?.error_message && typeof response?.response?.data?.error_message === "object") {
            Object.entries(response?.response?.data?.error_message).forEach(([_, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((msg) => toast.error(msg));
              }
            });
          } else if (response.message) {
            toast.error(response?.response?.data?.message);
          } else {
            toast.error("Signup failed due to an unknown error.");
          }
          return; // stop execution here
        }    
        // Success case
        if (response?.status === "success") {
          toast.success("Signup successful! Please check your email for verification.");
          clearLeadershipSignupData();
          setNavPath("success");
          navigate("/leadership/success");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } catch (error) {
      toast.error("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12 mx-auto">
      <Toaster/>
      <div className="bg-white rounded10">
        <div className="content-top-agile text-left! mb-30">
          <h2 className="text-[#1C2023]">Final Notes</h2>
        </div>
        <div className="p-0">
          <Form layout="vertical" form={form} onFinish={onFinish} className="row">
            <div className="col-md-12">
              <Form.Item
                name="additionalNotes"
                label="IS THERE ANYTHING ELSE YOU'D LIKE US TO KNOW ABOUT YOU? (OPTIONAL)"
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Share any additional information that might be relevant to your application..."
                />
              </Form.Item>
            </div>



            <Form.Item>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button
                  type="default"
                  onClick={() => {
                    setNavPath("leadership-case-study");   
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

export default FinalNote; 