import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { FC } from 'react';

interface LeadershipData {
  key: string;
  fullName: string;
  role: string;
  dateOfBirth: string;
  guardianEmail: string;
  pronouns?: string;
  country: string;
  homeschoolStatus: string;
  region: string;
  dateJoined: string;
  availabilityCommitment: string;
  weekendAvailability: string[];
  clubs: string[];
  motivation: string;
  fitReason: string;
  hasLeadershipExperience: string;
  leadershipDetails?: string;
  accessibilityNeeds: string;
  participationNeeds: string;
}

const data: LeadershipData[] = [
  {
    key: '1',
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
    participationNeeds: 'No'
  },
  {
    key: '2',
    fullName: 'Sarah Johnson',
    role: 'club-president',
    dateOfBirth: '2010-03-22',
    guardianEmail: 'sarah.parent@email.com',
    pronouns: 'She/Her',
    country: 'United States',
    homeschoolStatus: 'non-traditional',
    region: 'amerisphere',
    dateJoined: 'Mon, 12/08/24 10:15am',
    availabilityCommitment: 'occasional',
    weekendAvailability: ['Saturday Afternoon', 'It varies / I\'m flexible'],
    clubs: ['women_in_stem', 'visual_art_illustration', 'human_rights_advocacy', 'finance_investing'],
    motivation: 'I am passionate about empowering girls in STEM and want to create a supportive environment where everyone feels welcome to explore their interests.',
    fitReason: 'I have strong organizational skills and experience in art and design. I believe I can help create engaging content and foster a positive community atmosphere.',
    hasLeadershipExperience: 'yes',
    leadershipDetails: 'I have led art workshops for younger students and organized several community service projects in my local area.',
    accessibilityNeeds: 'Yes',
    participationNeeds: 'No'
  },
  {
    key: '3',
    fullName: 'Aarob Constructions',
    role: 'open-any',
    dateOfBirth: '2008-11-08',
    guardianEmail: 'aarob.family@email.com',
    pronouns: 'They/Them',
    country: 'Canada',
    homeschoolStatus: 'traditional',
    region: 'amerisphere',
    dateJoined: 'Wed, 10/08/24 3:45pm',
    availabilityCommitment: 'both',
    weekendAvailability: ['Saturday Morning', 'Sunday Morning', 'Sunday Afternoon'],
    clubs: ['space_astronomy', 'music_production', 'debate_public_speaking', 'study_skills_productivity'],
    motivation: 'I want to contribute to building a global community and help create meaningful experiences for students from diverse backgrounds.',
    fitReason: 'I am flexible and willing to take on any role that helps the community. I have strong communication skills and enjoy working with people.',
    hasLeadershipExperience: 'no',
    accessibilityNeeds: 'No',
    participationNeeds: 'Yes'
  },
  {
    key: '4',
    fullName: 'Musa Garki',
    role: 'club-vice-president',
    dateOfBirth: '2011-07-14',
    guardianEmail: 'musa.parent@email.com',
    country: 'Ghana',
    homeschoolStatus: 'homeschooled',
    region: 'afro-euro',
    dateJoined: 'Tue, 09/08/24 1:20pm',
    availabilityCommitment: 'both',
    weekendAvailability: ['Saturday Afternoon', 'Sunday Morning'],
    clubs: ['health_bioethics', 'culinary_cultures', 'journalism_oped', 'finance_investing'],
    motivation: 'I want to help create content that educates and inspires other students, particularly around health and cultural topics.',
    fitReason: 'I have experience writing articles and creating content. I am passionate about journalism and believe I can help manage the blog content effectively.',
    hasLeadershipExperience: 'yes',
    leadershipDetails: 'I have been writing for my local community newsletter for the past year and have organized several cultural events.',
    accessibilityNeeds: 'No',
    participationNeeds: 'No'
  },
  {
    key: '5',
    fullName: 'Roy Crambell',
    role: 'regional-vice-president',
    dateOfBirth: '2009-09-30',
    guardianEmail: 'roy.guardian@email.com',
    pronouns: 'He/Him',
    country: 'United Kingdom',
    homeschoolStatus: 'non-traditional',
    region: 'afro-euro',
    dateJoined: 'Fri, 08/08/24 4:10pm',
    availabilityCommitment: 'occasional',
    weekendAvailability: ['It varies / I\'m flexible'],
    clubs: ['code_for_change', 'crochet_fiber_arts', 'story_circles', 'entrepreneurship_innovation'],
    motivation: 'I want to help build a supportive community and create opportunities for students to develop their skills and interests.',
    fitReason: 'I have experience in both technical and creative areas. I believe I can help bridge different interests and create inclusive spaces.',
    hasLeadershipExperience: 'yes',
    leadershipDetails: 'I have led coding workshops and organized creative projects. I enjoy helping others learn and grow.',
    accessibilityNeeds: 'Yes',
    participationNeeds: 'Yes'
  },
  {
    key: '6',
    fullName: 'Feyl Ayobami',
    role: 'club-president',
    dateOfBirth: '2010-01-18',
    guardianEmail: 'feyl.parent@email.com',
    country: 'Kenya',
    homeschoolStatus: 'homeschooled',
    region: 'afro-euro',
    dateJoined: 'Sat, 07/08/24 11:30am',
    availabilityCommitment: 'both',
    weekendAvailability: ['Saturday Morning', 'Saturday Afternoon', 'Sunday Morning'],
    clubs: ['women_in_stem', 'language_exchange', 'mun', 'study_skills_productivity'],
    motivation: 'I want to help create a global community where students can connect, learn from each other, and develop their leadership skills.',
    fitReason: 'I am passionate about STEM and have experience organizing study groups. I believe I can help create engaging learning experiences.',
    hasLeadershipExperience: 'yes',
    leadershipDetails: 'I have organized study groups and led language exchange sessions. I enjoy helping others improve their skills.',
    accessibilityNeeds: 'No',
    participationNeeds: 'No'
  },
];


// Role mapping for display
const roleLabels: { [key: string]: string } = {
  'regional-president': 'Regional President',
  'regional-vice-president': 'Regional Vice President',
  'club-president': 'Club President',
  'club-vice-president': 'Club Vice President',
  'open-any': 'Open to any leadership position'
};

const Leadership: FC = () => {
 

  const columns: ColumnsType<LeadershipData> = [
    {
      title: 'S/N',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <span className="text-[#667085] font-[500]">{roleLabels[role] || role}</span>,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (region) => {
        const regionLabels: { [key: string]: string } = {
          'afro-euro': 'AfroEuro',
          'amerisphere': 'AmeriSphere',
          'asialume': 'AsiaLume'
        };
        return <span className="text-[#667085] font-[500]">{regionLabels[region] || region}</span>;
      },
    },
    {
      title: 'Date Joined',
      dataIndex: 'dateJoined',
      key: 'dateJoined',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
      sorter: (a, b) => new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>         
          <Button
            type="primary"
            size="small"
            onClick={() => window.open(`/admin/leadership/${record.key}`)}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            <EyeOutlined className="mr-2" />
            Full Profile
          </Button>
        </Space>
      ),
    },
  ];

  const customEmpty = (
    <div className="flex flex-col items-center justify-center py-8">
      <SearchOutlined style={{ fontSize: '48px', color: '#3b82f6' }} />
      <div className="text-center mt-4">
        <div className="text-lg font-medium text-gray-900 mb-2">No Leadership yet</div>
        <div className="text-gray-600">
          Your leadership will appear here once they register
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="p-4 border bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
        <h3 className="text-md font-semibold text-[#667085]">Leadership List</h3>
      </div>
      <div className="border-[0.6px] bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
        <Table
          columns={columns}
          dataSource={data}
          locale={{ emptyText: customEmpty }}
          size="small"
          className="custom-table text-[14px]"
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>

     
    </div>
  );
};

export default Leadership;