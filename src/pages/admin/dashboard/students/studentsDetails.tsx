import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Avatar, Button } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined, TeamOutlined, BookOutlined, HeartOutlined } from '@ant-design/icons';

// Mock data - in real app, this would come from API
const mockStudentData = {
  id: '1',
  fullName: 'Oscar Adetona',
  age: 15,
  guardianEmail: 'oscar.guardian@email.com',
  pronouns: 'He/Him',
  country: 'Nigeria',
  homeschoolStatus: 'homeschooled',
  region: 'afro-euro',
  dateJoined: 'Thur, 14/08/24 2:30pm',
  clubs: ['code_for_change', 'poetry_prose', 'mun', 'entrepreneurship_innovation'],
  experience: '3 years',
  expectations: 'I hope to gain new friends and learn coding skills while socializing with like-minded peers.',
  accessibilityNeeds: 'No',
  participationNeeds: 'No',
  avatar: null
};

// Club mapping for display
const clubLabels: { [key: string]: string } = {
  'code_for_change': 'Code for Change',
  'women_in_stem': 'Women in STEM Circle',
  'space_astronomy': 'Space & Astronomy Club',
  'health_bioethics': 'Health & Bioethics Circle',
  'crochet_fiber_arts': 'Crochet & Fiber Arts Club',
  'poetry_prose': 'Poetry & Prose Circle',
  'visual_art_illustration': 'Visual Art & Illustration Club',
  'music_production': 'Music Production & Performance Club',
  'culinary_cultures': 'Culinary Cultures Club',
  'language_exchange': 'Language Exchange & Linguistics Club',
  'story_circles': 'Story Circles',
  'mun': 'Model United Nations (MUN)',
  'debate_public_speaking': 'Debate & Public Speaking Club',
  'journalism_oped': 'Journalism & Op-Ed Writing Club',
  'human_rights_advocacy': 'Human Rights & Advocacy Club',
  'entrepreneurship_innovation': 'Entrepreneurship & Innovation Club',
  'finance_investing': 'Finance & Investing for Teens',
  'study_skills_productivity': 'Study Skills & Productivity Circle'
};

const clubCategories: { [key: string]: string } = {
  'code_for_change': 'STEM-Focused',
  'women_in_stem': 'STEM-Focused',
  'space_astronomy': 'STEM-Focused',
  'health_bioethics': 'STEM-Focused',
  'crochet_fiber_arts': 'Creative & Cultural',
  'poetry_prose': 'Creative & Cultural',
  'visual_art_illustration': 'Creative & Cultural',
  'music_production': 'Creative & Cultural',
  'culinary_cultures': 'Creative & Cultural',
  'language_exchange': 'Creative & Cultural',
  'story_circles': 'Civic & Intellectual',
  'mun': 'Civic & Intellectual',
  'debate_public_speaking': 'Civic & Intellectual',
  'journalism_oped': 'Civic & Intellectual',
  'human_rights_advocacy': 'Civic & Intellectual',
  'entrepreneurship_innovation': 'Innovation & Life Skills',
  'finance_investing': 'Innovation & Life Skills',
  'study_skills_productivity': 'Innovation & Life Skills'
};

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(mockStudentData);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    // In real app, fetch student data by ID
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStudent(mockStudentData);
      setLoading(false);
    }, 500);
  }, [id]);

  const items = [
    {
      key: '1',
      label: 'Basic Information',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Full Name</div>
                <div className="info-value">
                  <UserOutlined className="mr-2" />
                  {student.fullName}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Age</div>
                <div className="info-value">{student.age} years old</div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Pronouns</div>
                <div className="info-value">{student.pronouns || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Country</div>
                <div className="info-value">
                  <GlobalOutlined className="mr-2" />
                  {student.country}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Guardian Email</div>
                <div className="info-value">
                  <MailOutlined className="mr-2" />
                  {student.guardianEmail}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Homeschool Status</div>
                <div className="info-value">
                  {student.homeschoolStatus === 'homeschooled' ? 'Homeschooled' :
                   student.homeschoolStatus === 'non-traditional' ? 'Non-traditional learning' :
                   'Traditional school'}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Region</div>
                <div className="info-value">
                  {student.region === 'afro-euro' ? 'AfroEuro – Africa + Europe' :
                   student.region === 'amerisphere' ? 'AmeriSphere – North, Central & South America' :
                   'AsiaLume – Asia + Australia/Oceania'}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Date Joined</div>
                <div className="info-value">{student.dateJoined}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Club Preferences',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {student.clubs.map((club, index) => (
                  <div key={index} className="border rounded p-3 border-l-4 border-[#3898CB]">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded text-[#fff] bg-[#3898CB]">
                        {clubCategories[club]}
                      </span>
                      <div className="font-medium text-sm">
                        {clubLabels[club]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div>
                <h4 className="font-medium mb-2">Club Selection Summary</h4>
                <div className="text-sm text-gray-600">
                  Student has selected {student.clubs.length} clubs across different categories, 
                  showing interest in {Object.keys(clubCategories).filter(cat => 
                    student.clubs.some(club => clubCategories[club] === cat)
                  ).length} different areas.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Experience & Goals',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Homeschooling Experience</div>
                <div className="info-value">
                  <BookOutlined className="mr-2" />
                  {student.experience}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Joining Expectations</div>
                <div className="max-w-2xl">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <HeartOutlined className="text-red-500 mt-1" />
                      <div className="text-sm text-gray-700">
                        {student.expectations}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Accessibility & Accommodations',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="info-item">
                  <div className="info-label text-md font-medium text-[#171717]">Accessibility Needs</div>
                  <div className="info-value">
                    <span className={`inline-block px-2 py-1 text-sm rounded ${
                      student.accessibilityNeeds === 'Yes' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.accessibilityNeeds}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label text-md font-medium text-[#171717]">Participation Accommodations</div>
                  <div className="info-value">
                    <span className={`inline-block px-2 py-1 text-sm rounded ${
                      student.participationNeeds === 'Yes' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {student.participationNeeds}
                    </span>
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-[#3898CB] mb-2">Support Information</h4>
                <div className="text-sm text-blue-700">
                  {student.accessibilityNeeds === 'Yes' || student.participationNeeds === 'Yes' 
                    ? 'This student has indicated specific accommodation needs. Please review their requirements and ensure appropriate support is provided.'
                    : 'This student has indicated no specific accommodation needs at this time.'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
      <div className="container-full">
        {/* Content Header */}
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Student Profile</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" onClick={() => navigate('/admin/students')}>
                        <i className="mdi mdi-home-outline" />
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Students
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {student.fullName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="ms-auto">
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/students')}
                className="me-2 h-[43px]!"
              >
                Back to Students
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Student Information</h3>
                </div>
                <div className="box-body">
                  <Tabs 
                    defaultActiveKey="1" 
                    items={items}
                    className="student-details-tabs"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-4">
              <div className="box overflow-hidden box-widget widget-user">
                {/* Header */}
                <div
                    className="relative h-[120px] bg-cover bg-center bg-imgages">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-0" />
                        <div className="relative z-10 text-white p-4">
                            <h3 className="widget-user-username text-white">
                                {student.fullName}
                            </h3>
                            <h6 className="widget-user-desc text-white">
                                Student • Age {student.age}
                            </h6>
                        </div>
                    {/* </div> */}
                </div>

                {/* Avatar */}
                <div className="widget-user-image">
                  <Avatar 
                    size={80} 
                    icon={<UserOutlined />} 
                    src={student.avatar}
                    className="border-4 border-white"
                  />
                </div>

                {/* Footer Stats */}
                <div className="box-footer">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">{student.clubs.length}</h5>
                        <span className="description-text">CLUBS</span>
                      </div>
                    </div>
                    <div className="col-sm-4 be-1 bs-1">
                      <div className="description-block">
                        <h5 className="description-header">{student.experience}</h5>
                        <span className="description-text">EXPERIENCE</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">
                          {student.region.split('-')[0].toUpperCase()}
                        </h5>
                        <span className="description-text">REGION</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="box">
                <div className="box-body box-profile">
                  <div className="row">
                    <div className="col-12">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MailOutlined className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.guardianEmail}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GlobalOutlined className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.country}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TeamOutlined className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.homeschoolStatus === 'homeschooled' ? 'Homeschooled' :
                             student.homeschoolStatus === 'non-traditional' ? 'Non-traditional' :
                             'Traditional school'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Quick Actions</h3>
                </div>
                <div className="box-body">
                  <div className="space-y-2">
                    <Button className='mb-3 h-[43px]!' type="primary" block>
                      Send Message
                    </Button>
                    <Button className='h-[43px]!' type="default" block>
                      View Progress
                    </Button>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default StudentDetails;