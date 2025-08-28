import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Avatar, Button, Spin } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined, TeamOutlined, BookOutlined, HeartOutlined } from '@ant-design/icons';
import { useApplicantDetails } from '@/hooks/useAdmin';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: applicantData, isLoading } = useApplicantDetails(id as string);

  const student = {
    fullName: applicantData?.name ?? '',
    age: parseInt(applicantData?.age ?? '0', 10) || 0,
    guardianEmail: applicantData?.parent_email ?? '',
    pronouns: applicantData?.pronouns ?? '',
    country: applicantData?.country_timezone ?? '',
    homeschoolStatus: applicantData?.homeschool_status ?? '',
    regionName: applicantData?.region_name ?? '',
    dateJoined: applicantData?.submitted_at ?? '',
    clubs: applicantData?.club_preference_names ?? [],
    experience: Array.isArray(applicantData?.experience)
      ? (applicantData?.experience as string[]).join(' • ')
      : (applicantData?.experience as string) ?? '',
    experienceOnly: applicantData?.experience[0],
    notes: applicantData?.notes ?? '',
    accessibilityNeeds:
      Array.isArray(applicantData?.accessibility) && applicantData?.accessibility[0]
        ? (applicantData?.accessibility[0].toLowerCase().includes('no') ? 'No' : 'Yes')
        : 'No',
    participationNeeds:
      Array.isArray(applicantData?.accessibility) && applicantData?.accessibility[1]
        ? (applicantData?.accessibility[1].toLowerCase().includes('no') ? 'No' : 'Yes')
        : 'No',
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
                  {student.regionName}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {student.clubs.map((clubName: string, index: number) => (
                  <div key={index} className="border rounded p-3 border-l-4 border-[#3898CB]">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">
                        {clubName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div>
                <h4 className="font-medium mb-2">Club Selection Summary</h4>
                <div className="text-sm text-gray-600">
                  Student has selected {student.clubs.length} clubs.
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
                <div className="info-label text-md font-medium text-[#171717]">Experience</div>
                <div className="info-value">
                  <BookOutlined className="mr-2" />
                  {student.experience}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label text-md font-medium text-[#171717]">Notes</div>
                <div className="max-w-2xl">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <HeartOutlined className="text-red-500 mt-1" />
                      <div className="text-sm text-gray-700">
                        {student.notes || 'No additional notes provided.'}
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
                  {isLoading ? (
                    <div className="py-10 text-center"><Spin /></div>
                  ) : (
                    <Tabs 
                      defaultActiveKey="1" 
                      items={items}
                      className="student-details-tabs"
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
                    className="border-4 border-white"
                  />
                </div>

                {/* Footer Stats */}
                <div className="box-footer">
                  <div className="row mt-2">
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">{student.clubs.length}</h5>
                        <span className="description-text">CLUBS</span>
                      </div>
                    </div>
                    <div className="col-sm-4 be-1 bs-1">
                      <div className="description-block">
                        <h5 className="description-header">{student.experienceOnly}</h5>
                        <span className="description-text">EXPERIENCE</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="description-block">
                        <h5 className="description-header">
                        {student.regionName?.length > 10 
                          ? student.regionName.slice(0, 8) 
                          : student.regionName}
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