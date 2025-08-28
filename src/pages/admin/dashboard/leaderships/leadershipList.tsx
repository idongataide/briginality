import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { useState } from 'react';
import { useRoleApplications, useApproveRoleApplication, useRejectRoleApplication } from '@/hooks/useAdmin';
import ConfirmationModal from '@/components/DeleteConfirmationModal';
import RejectConfirmationModal from '@/components/RejectConfirmationModal';
import { message } from 'antd';

interface LeadershipData {
  key: string;
  id: number;
  name: string;
  role: string;
  age: string;
  email: string;
  pronouns: string;
  country_timezone: string;
  homeschool_status: string;
  region_name: string;
  availability: string[];
  club_preference_names: string[];
  motivation: string[];
  experience: string[];
  case_study: string[];
  notes: string;
  status: string;
  submitted_at: string;
}

const Leadership: FC = () => {
  const { data: leadershipData, mutate } = useRoleApplications();
  const { approveApplication } = useApproveRoleApplication();
  const { rejectApplication } = useRejectRoleApplication();
  
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<LeadershipData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!selectedApplication) return;
    
    setLoading(true);
    try {
      await approveApplication(selectedApplication.id.toString());
      message.success('Application approved successfully');
      mutate(); // Refresh the data
      setApproveModalVisible(false);
      setSelectedApplication(null);
    } catch (error) {
      message.error('Failed to approve application');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (notes: string) => {
    if (!selectedApplication) return;
    
    setLoading(true);
    try {
      await rejectApplication(selectedApplication.id.toString(), notes);
      message.success('Application rejected successfully');
      mutate(); // Refresh the data
      setRejectModalVisible(false);
      setSelectedApplication(null);
    } catch (error) {
      message.error('Failed to reject application');
    } finally {
      setLoading(false);
    }
  };

  const openApproveModal = (record: LeadershipData) => {
    setSelectedApplication(record);
    setApproveModalVisible(true);
  };

  const openRejectModal = (record: LeadershipData) => {
    setSelectedApplication(record);
    setRejectModalVisible(true);
  };

  const columns: ColumnsType<LeadershipData> = [
    {
      title: 'S/N',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const roleLabels: { [key: string]: string } = {
          'regional-president': 'Regional President',
          'regional-vice-president': 'Regional Vice President',
          'club-president': 'Club President',
          'club-vice-president': 'Club Vice President',
          'open-any': 'Open to any leadership position'
        };
        return <span className="text-[#667085] font-[500]">{roleLabels[role] || role}</span>;
      },
    },
    {
      title: 'Region',
      dataIndex: 'region_name',
      key: 'region_name',
      render: (region_name) => {        
        return <span className="text-[#667085] font-[#667085] font-[500]">{region_name}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          pending: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
          approved: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
          rejected: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const statusText = status?.charAt(0).toUpperCase() + status?.slice(1) || 'Pending';
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bg} ${config.border}`}>
            {statusText}
          </span>
        );
      },
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' }
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date Joined',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      render: (text) => <span className="text-[#667085] font-[500]">{text}</span>,
      sorter: (a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>         
          <Button
            type="primary"
            size="small"
            onClick={() => window.open(`/admin/leadership/${record.id}`)}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            <EyeOutlined className="mr-2" />
            Full Profile
          </Button>
          {record.status === 'pending' && (
            <Button 
              type="primary"
              size="small"
              onClick={() => openApproveModal(record)}
              className="border-green-500 bg-green-600! text-white! hover:bg-green-50"
              icon={<CheckOutlined />}
            >
              Approve
            </Button>
          )}
          {record.status === 'pending' && (
            <Button 
              type="primary"
              size="small"
              onClick={() => openRejectModal(record)}
              className="border-red-500  bg-red-600! text-white hover:bg-red-50"
              icon={<CloseOutlined />}
            >
              Reject
            </Button>
          )}
          {record.status === 'approved' && (
            <Button 
              type="primary"
              size="small"
              onClick={() => openRejectModal(record)}
              className="border-red-500 bg-red-600! text-white hover:bg-red-50"
              icon={<CloseOutlined />}
            >
              Reject
            </Button>
          )}
          {record.status === 'rejected' && (
            <Button 
              type="primary"
              size="small"
              onClick={() => openApproveModal(record)}
              className="border-green-500 bg-green-600! text-green-500 hover:bg-green-50"
              icon={<CheckOutlined />}
            >
              Approve
            </Button>
          )}
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
          dataSource={leadershipData}
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

      {/* Approve Confirmation Modal */}
      <ConfirmationModal
        isOpen={approveModalVisible}
        onClose={() => {
          setApproveModalVisible(false);
          setSelectedApplication(null);
        }}
        onConfirm={handleApprove}
        title="Approve Application"
        message={`Are you sure you want to approve ${selectedApplication?.name}'s leadership application?.`}
        confirmText="Approve Application"
        type="approve"
        loading={loading}
      />

      {/* Reject Confirmation Modal */}
      <RejectConfirmationModal
        isOpen={rejectModalVisible}
        onClose={() => {
          setRejectModalVisible(false);
          setSelectedApplication(null);
        }}
        onConfirm={handleReject}
        title="Reject Application"
        message={`Are you sure you want to reject ${selectedApplication?.name}'s leadership application?`}
        confirmText="Reject Application"
        loading={loading}
      />
    </div>
  );
};

export default Leadership;