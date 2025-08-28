import React from 'react';
import { useParams } from 'react-router-dom';
import { useMembersByRegion } from '@/hooks/useAdmin';
import { Table, ColumnDefinition } from '@/components/ui/Table';

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  joined_date?: string;
  club_name?: string;
}

const MembersGroups: React.FC = () => {
  const { region_id } = useParams();
  const { data: memberRegion, isLoading } = useMembersByRegion(region_id);

  const columns: ColumnDefinition<Member>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'font-medium text-[#101828]',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: string) => value || '-',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value: string) => value || 'Member',
    },
    {
      title: 'Club',
      dataIndex: 'club_name',
      key: 'club_name',
      render: (value: string) => value || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'inactive' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value || 'Active'}
        </span>
      ),
    },
    {
      title: 'Joined Date',
      dataIndex: 'joined_date',
      key: 'joined_date',
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString();
      },
    },
  ];

  const handleRowClick = (id: string) => {
    // Handle row click - you can navigate to member details or perform other actions
    console.log('Member clicked:', id);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#101828] mb-2">Club Members</h1>
        <p className="text-[#667085]">Manage and view all members in this region</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E5E9F0]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#101828]">
              Members List
            </h2>
            <div className="text-sm text-[#667085]">
              {memberRegion?.length || 0} members
            </div>
          </div>

          <Table<Member>
            columns={columns}
            data={memberRegion || []}
            loading={isLoading}
            onRowClick={handleRowClick}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MembersGroups;

 