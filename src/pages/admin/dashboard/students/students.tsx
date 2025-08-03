import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import type { FC } from 'react';

interface StudentData {
  key: string;
  fullName: string;
  age: number;
  guardianEmail: string;
  pronouns?: string;
  country: string;
  homeschoolStatus: string;
  region: string;
  dateJoined: string;
  clubs: string[];
  experience: string;
  expectations: string;
  accessibilityNeeds: string;
  participationNeeds: string;
}

const data: StudentData[] = [
  {
    key: '1',
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
    participationNeeds: 'No'
  },
  {
    key: '2',
    fullName: 'Sarah Johnson',
    age: 14,
    guardianEmail: 'sarah.parent@email.com',
    pronouns: 'She/Her',
    country: 'United States',
    homeschoolStatus: 'non-traditional',
    region: 'amerisphere',
    dateJoined: 'Mon, 12/08/24 10:15am',
    clubs: ['women_in_stem', 'visual_art_illustration', 'human_rights_advocacy', 'finance_investing'],
    experience: '2 years',
    expectations: 'Looking to develop leadership skills and connect with other creative students.',
    accessibilityNeeds: 'Yes',
    participationNeeds: 'No'
  },
  {
    key: '3',
    fullName: 'Aarob Constructions',
    age: 16,
    guardianEmail: 'aarob.family@email.com',
    pronouns: 'They/Them',
    country: 'Canada',
    homeschoolStatus: 'traditional',
    region: 'amerisphere',
    dateJoined: 'Wed, 10/08/24 3:45pm',
    clubs: ['space_astronomy', 'music_production', 'debate_public_speaking', 'study_skills_productivity'],
    experience: '1 year',
    expectations: 'Want to improve public speaking skills and learn about space science.',
    accessibilityNeeds: 'No',
    participationNeeds: 'Yes'
  },
  {
    key: '4',
    fullName: 'Musa Garki',
    age: 13,
    guardianEmail: 'musa.parent@email.com',
    country: 'Ghana',
    homeschoolStatus: 'homeschooled',
    region: 'afro-euro',
    dateJoined: 'Tue, 09/08/24 1:20pm',
    clubs: ['health_bioethics', 'culinary_cultures', 'journalism_oped', 'finance_investing'],
    experience: '4 years',
    expectations: 'Interested in journalism and learning about different cultures through food.',
    accessibilityNeeds: 'No',
    participationNeeds: 'No'
  },
  {
    key: '5',
    fullName: 'Roy Crambell',
    age: 15,
    guardianEmail: 'roy.guardian@email.com',
    pronouns: 'He/Him',
    country: 'United Kingdom',
    homeschoolStatus: 'non-traditional',
    region: 'afro-euro',
    dateJoined: 'Fri, 08/08/24 4:10pm',
    clubs: ['code_for_change', 'crochet_fiber_arts', 'story_circles', 'entrepreneurship_innovation'],
    experience: '2.5 years',
    expectations: 'Looking to build a community and develop entrepreneurial skills.',
    accessibilityNeeds: 'Yes',
    participationNeeds: 'Yes'
  },
  {
    key: '6',
    fullName: 'Feyl Ayobami',
    age: 14,
    guardianEmail: 'feyl.parent@email.com',
    country: 'Kenya',
    homeschoolStatus: 'homeschooled',
    region: 'afro-euro',
    dateJoined: 'Sat, 07/08/24 11:30am',
    clubs: ['women_in_stem', 'language_exchange', 'mun', 'study_skills_productivity'],
    experience: '3 years',
    expectations: 'Want to improve language skills and participate in global discussions.',
    accessibilityNeeds: 'No',
    participationNeeds: 'No'
  },
];


const Students: FC = () => {



  const columns: ColumnsType<StudentData> = [
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
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
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
            onClick={() => window.open(`/admin/students/${record.key}`)}
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
        <div className="text-lg font-medium text-gray-900 mb-2">No Students yet</div>
        <div className="text-gray-600">
          Your students will appear here once they register
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="p-4 border bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
        <h3 className="text-md font-semibold text-[#667085]">Student List</h3>
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

export default Students;