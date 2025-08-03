import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Avatar, Button } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined, TeamOutlined, BookOutlined, HeartOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

// Mock data - in real app, this would come from API
const mockLeadershipData = {
  id: '1',
  fullName: 'Oscar Adetona',
  role: 'regional-president',
  dateOfBirth: '2009-05-15',
  guardianEmail: 'oscar.guardian@email.com',
  pronouns: 'He/Him',
  country: 'Nigeria',
  homeschoolStatus: 'homeschooled',
  region: 'afro-euro',
  dateJoined: 'Thur, 14/08/24 2:30pm',
  availabilityCommitment: 'both',
  weekendAvailability: ['Saturday Morning', 'Sunday Afternoon'],
  clubs: ['code_for_change', 'poetry_prose', 'mun', 'entrepreneurship_innovation'],
  motivation: 'I want to help build a strong community and create opportunities for other homeschooled students to connect and grow together.',
  fitReason: 'I have experience organizing events and leading small groups. I am passionate about technology and believe I can contribute to the Code for Change club while learning from others.',
  hasLeadershipExperience: 'yes',
  leadershipDetails: 'I have been the leader of my local homeschool co-op for 2 years, organizing weekly meetings and coordinating activities for 15+ students.',
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

// Role mapping for display
const roleLabels: { [key: string]: string } = {
  'regional-president': 'Regional President',
  'regional-vice-president': 'Regional Vice President',
  'club-president': 'Club President',
  'club-vice-president': 'Club Vice President',
  'open-any': 'Open to any leadership position'
};

const LeadershipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leadership, setLeadership] = useState(mockLeadershipData);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    // In real app, fetch leadership data by ID
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLeadership(mockLeadershipData);
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
                  {leadership.fullName}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Role</div>
                <div className="info-value">{roleLabels[leadership.role] || leadership.role}</div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Date of Birth</div>
                <div className="info-value">
                  <CalendarOutlined className="mr-2" />
                  {leadership.dateOfBirth}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Pronouns</div>
                <div className="info-value">{leadership.pronouns || 'Not specified'}</div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Country</div>
                <div className="info-value">
                  <GlobalOutlined className="mr-2" />
                  {leadership.country}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Guardian Email</div>
                <div className="info-value">
                  <MailOutlined className="mr-2" />
                  {leadership.guardianEmail}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Homeschool Status</div>
                <div className="info-value">
                  {leadership.homeschoolStatus === 'homeschooled' ? 'Homeschooled' :
                   leadership.homeschoolStatus === 'non-traditional' ? 'Non-traditional learning' :
                   'Traditional school'}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Region</div>
                <div className="info-value">
                  {leadership.region === 'afro-euro' ? 'AfroEuro – Africa + Europe' :
                   leadership.region === 'amerisphere' ? 'AmeriSphere – North, Central & South America' :
                   'AsiaLume – Asia + Australia/Oceania'}
                </div>
              </div>
              <div className="info-item col-span-2">
                <div className="info-label text-md font-medium text-[#171717]">Date Joined</div>
                <div className="info-value">{leadership.dateJoined}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Availability & Commitment',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Commitment Level</div>
                <div className="info-value">
                  <ClockCircleOutlined className="mr-2" />
                  {leadership.availabilityCommitment === 'both' ? 'Yes, I can commit to both' :
                   leadership.availabilityCommitment === 'occasional' ? 'I may have occasional conflicts, but I\'m generally available' :
                   'No, I can\'t commit right now'}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Weekend Availability</div>
                <div className="flex flex-wrap gap-2">
                  {leadership.weekendAvailability.map((time, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Club Preferences',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {leadership.clubs.map((club, index) => (
                  <div key={index} className="border rounded p-3 border-l-4 border-[#3898CB]">
                    <div className="space-y-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded text-[#fff] bg-[#3898CB]">
                        {clubCategories[club as keyof typeof clubCategories]}
                      </span>
                      <div className="font-medium text-sm">
                        {clubLabels[club as keyof typeof clubLabels]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div>
                <h4 className="font-medium mb-2">Club Selection Summary</h4>
                <div className="text-sm text-gray-600">
                  Leadership has selected {leadership.clubs.length} clubs across different categories, 
                  showing interest in {Object.keys(clubCategories).filter(cat => 
                    leadership.clubs.some(club => clubCategories[club as keyof typeof clubCategories] === cat)
                  ).length} different areas.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Motivation & Fit',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Motivation</div>
                <div className="max-w-full">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <HeartOutlined className="text-[#F9607F]! mt-1" />
                      <div className="text-md text-gray-700">
                        {leadership.motivation}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Why They're a Good Fit</div>
                <div className="max-w-full">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <UserOutlined className="text-blue-500 mt-1" />
                      <div className="text-md text-gray-700">
                        {leadership.fitReason}
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
      key: '5',
      label: 'Leadership Experience',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Has Leadership Experience</div>
                <div className="info-value">
                  <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                    leadership.hasLeadershipExperience === 'yes' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {leadership.hasLeadershipExperience === 'yes' ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              {leadership.leadershipDetails && (
                <div className="info-item">
                  <div className="info-label text-md font-medium text-[#171717]">Experience Details</div>
                  <div className="max-w-2xl">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <BookOutlined className="text-yellow-600 mt-1" />
                        <div className="text-sm text-gray-700">
                          {leadership.leadershipDetails}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '6',
      label: 'Accessibility & Accommodations',
      children: (
        <div className="card shadow-sm mb-0!">
          <div className="card-body">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="info-item">
                  <div className="info-label text-md font-medium text-[#171717]">Accessibility Needs</div>
                  <div className="info-value">
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                      leadership.accessibilityNeeds === 'Yes' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {leadership.accessibilityNeeds}
                    </span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-label text-md font-medium text-[#171717]">Participation Accommodations</div>
                  <div className="info-value">
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                      leadership.participationNeeds === 'Yes' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {leadership.participationNeeds}
                    </span>
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-[#3898CB] mb-2">Support Information</h4>
                <div className="text-sm text-blue-700">
                  {leadership.accessibilityNeeds === 'Yes' || leadership.participationNeeds === 'Yes' 
                    ? 'This leadership has indicated specific accommodation needs. Please review their requirements and ensure appropriate support is provided.'
                    : 'This leadership has indicated no specific accommodation needs at this time.'
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
              <h3 className="page-title">Leadership Profile</h3>
              <div className="d-inline-block align-items-center">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#" onClick={() => navigate('/admin/leadership')}>
                        <i className="mdi mdi-home-outline" />
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Leadership
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {leadership.fullName}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="ms-auto">
              <Button 
                type="primary" 
                onClick={() => navigate('/admin/leadership')}
                className="me-2 h-[43px]!"
              >
                Back to Leadership
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="box">
                {/* <div className="box-header with-border">
                  <h3 className="box-title">Leadership Information</h3>
                </div> */}
                <div className="box-body">
                  <Tabs 
                    defaultActiveKey="1" 
                    items={items}
                    className="leadership-details-tabs"
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
                                {leadership.fullName}
                            </h3>
                            <h6 className="widget-user-desc text-white">
                                {roleLabels[leadership.role] || leadership.role} • {leadership.dateOfBirth}
                            </h6>
                        </div>
                </div>

                {/* Avatar */}
                <div className="widget-user-image">
                  <Avatar 
                    size={80} 
                    icon={<UserOutlined />} 
                    src={leadership.avatar}
                    className="border-4 bg-white text-gray-400! border-[#EAEAEA]!"
                  />
                </div> 

                {/* Footer Stats */}
                <div className="box-footer mt-10">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">{leadership.clubs.length}</h5>
                        <span className="description-text">CLUBS</span>
                      </div>
                    </div>
                    <div className="col-sm-4 be-1 bs-1">
                      <div className="description-block">
                        <h5 className="description-header">
                          {leadership.hasLeadershipExperience === 'yes' ? 'Yes' : 'No'}
                        </h5>
                        <span className="description-text">EXPERIENCE</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">
                          {leadership.region.split('-')[0].toUpperCase()}
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
                          <span className="text-md text-gray-600">
                            {leadership.guardianEmail}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GlobalOutlined className="text-gray-400" />
                          <span className="text-md text-gray-600">
                            {leadership.country}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TeamOutlined className="text-gray-400" />
                          <span className="text-md text-gray-600">
                            {leadership.homeschoolStatus === 'homeschooled' ? 'Homeschooled' :
                             leadership.homeschoolStatus === 'non-traditional' ? 'Non-traditional' :
                             'Traditional school'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockCircleOutlined className="text-gray-400" />
                          <span className="text-md text-gray-600">
                            {leadership.availabilityCommitment === 'both' ? 'Full Commitment' :
                             leadership.availabilityCommitment === 'occasional' ? 'Occasional Conflicts' :
                             'Limited Availability'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="box">             
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

export default LeadershipDetails;