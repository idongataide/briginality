"use client";
import React from "react";
import { Form, Button, Select } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useLeadershipStore } from "@/global/leadershipStore";

// Club list array with categories and clubs
const clubOptions = [
  {
    label: "Stem-Focused Clubs",
    field: "stem_focused_club",
    options: [
      { label: "Code for Change - Empowers teens to build real-world tech solutions through beginner-friendly coding, collaboration, and creative problem-solving", value: "code_for_change" },
      { label: "Women in STEM Circle - Uplifts girls in STEM through mentorship, speakers, and a zine.", value: "women_in_stem" },
      { label: "Space & Astronomy Club - Explores the cosmos and produces space-themed blog and media.", value: "space_astronomy" },
      { label: "Health & Bioethics Circle - Writes and discusses health justice and bioethics topics online.", value: "health_bioethics" },
    ],
  },
  {
    label: "Creative & Cultural Clubs",
    field: "creative_cultural_club",
    options: [
      { label: "Crochet & Fiber Arts Club - Hosts stitch circles and creates photo essays and visuals.", value: "crochet_fiber_arts" },
      { label: "Poetry & Prose Circle - Publishes original poems, short stories, and spoken word.", value: "poetry_prose" },
      { label: "Visual Art & Illustration Club - Designs art for campaigns, zines, and social media.", value: "visual_art_illustration" },
      { label: "Music Production & Performance Club - Produces Bridginality's soundtrack and intros.", value: "music_production" },
      { label: "Culinary Cultures Club - Shares recipes, food identity stories, and tutorial videos.", value: "culinary_cultures" },
      { label: "Language Exchange & Linguistics Club - Leads language sessions and translates content.", value: "language_exchange" },
    ],
  },
  {
    label: "Civic & Intellectual Clubs",
    field: "civic_intellectual_club",
    options: [
      { label: "Story Circles – A safe space for students to share personal experiences and resilience.", value: "story_circles" },
      { label: "Model United Nations (MUN)– Simulates global policy and debates; shares audio/video content.", value: "mun" },
      { label: "Debate & Public Speaking Club – Hosts live debates, speeches, and uploads reels.", value: "debate_public_speaking" },
      { label: "Journalism & Op-Ed Writing Club – Manages blog content, op-eds, and youth journalism.", value: "journalism_oped" },
      { label: "Human Rights & Advocacy Club – Collaborates on campaigns and youth justice topics.", value: "human_rights_advocacy" },
    ],
  },
  {
    label: "Innovation & Life Skill Clubs",
    field: "innovation_life_skill_club",
    options: [
      { label: "Entrepreneurship & Innovation Club – Features youth-run businesses and founders.", value: "entrepreneurship_innovation" },
      { label: "Finance & Investing for Teens – Teaches money basics and produces a 'Money Talks' column.", value: "finance_investing" },
      { label: "Study Skills & Productivity Circle – Shares planners, templates, and productivity hacks.", value: "study_skills_productivity" },
    ],
  },
];

const ClubPreference = () => {
  const { setNavPath } = useLeadershipStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const navPath = useLeadershipStore();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // Mock or replace this with actual API call logic if needed
      console.log("Form values:", values);
      toast.success("Form submitted successfully");
      // Redirect to next section
      setNavPath("leadership-motivation");
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
            {clubOptions.map((category) => (
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
                    navPath.setNavPath("leadership-availability");   
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

export default ClubPreference;
