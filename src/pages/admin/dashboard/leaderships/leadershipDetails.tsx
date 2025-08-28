import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Avatar, Button, Spin } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined, TeamOutlined, BookOutlined, HeartOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useRoleApplicationDetails } from '@/hooks/useAdmin';

const LeadershipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: applicationData, isLoading } = useRoleApplicationDetails(id as string);

  const leadership = {
    id: applicationData?.id ?? '',
    fullName: applicationData?.name ?? '',
    role: applicationData?.role ?? '',
    age: applicationData?.age ?? '',
    email: applicationData?.email ?? '',
    pronouns: applicationData?.pronouns ?? '',
    country: applicationData?.country_timezone ?? '',
    homeschoolStatus: applicationData?.homeschool_status ?? '',
    region: applicationData?.region_name ?? '',
    dateJoined: applicationData?.submitted_at ?? '',
    availability: applicationData?.availability ?? [],
    clubs: applicationData?.club_preference_names ?? [],
    motivation: Array.isArray(applicationData?.motivation)
      ? (applicationData?.motivation as string[]).join(' • ')
      : (applicationData?.motivation as string) ?? '',
    fitReason: Array.isArray(applicationData?.experience)
      ? (applicationData?.experience as string[]).join(' • ')
      : (applicationData?.experience as string) ?? '',
    hasLeadershipExperience: applicationData?.experience ? 'yes' : 'no',
    leadershipDetails: Array.isArray(applicationData?.case_study)
      ? (applicationData?.case_study as string[]).join(' • ')
      : (applicationData?.case_study as string) ?? '',
    accessibilityNeeds: 'No', // Default value as not provided in the response
    participationNeeds: 'No', // Default value as not provided in the response
    avatar: null
  };

  // Role mapping for display
  const roleLabels: { [key: string]: string } = {
    'regional-president': 'Regional President',
    'regional-vice-president': 'Regional Vice President',
    'club-president': 'Club President',
    'club-vice-president': 'Club Vice President',
    'open-any': 'Open to any leadership position'
  };

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
                <div className="info-label text-md font-medium text-[#171717]">Age</div>
                <div className="info-value">
                  <CalendarOutlined className="mr-2" />
                  {leadership.age} years old
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
                <div className="info-label text-md font-medium text-[#171717]">Email</div>
                <div className="info-value">
                  <MailOutlined className="mr-2" />
                  {leadership.email}
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
                  {leadership.region}
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
                <div className="info-label text-md font-medium text-[#171717]">Weekend Availability</div>
                <div className="flex flex-wrap gap-2">
                  {leadership.availability.map((time: string, index: number) => (
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
                {leadership.clubs.map((club: string, index: number) => (
                  <div key={index} className="border rounded p-3 border-l-4 border-[#3898CB]">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">
                        {club}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div>
                <h4 className="font-medium mb-2">Club Selection Summary</h4>
                <div className="text-sm text-gray-600">
                  Leadership has selected {leadership.clubs.length} clubs.
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
                <div className="info-label text-md font-medium text-[#171717]">Experience</div>
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
                  <div className="info-label text-md font-medium text-[#171717]">Case Study</div>
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
                <div className="box-body">
                  {isLoading ? (
                    <div className="py-10 text-center"><Spin /></div>
                  ) : (
                    <Tabs 
                      defaultActiveKey="1" 
                      items={items}
                      className="leadership-details-tabs"
                    />
                  )}
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
                                {roleLabels[leadership.role] || leadership.role} • Age {leadership.age}
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
                          {leadership.region?.split(' ')[0]?.toUpperCase() || 'REGION'}
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
                            {leadership.email}
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
                            {leadership.availability.length} time slots available
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