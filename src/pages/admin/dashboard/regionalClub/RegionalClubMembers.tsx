import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ColumnDefinition } from "@/components/ui/Table";
import { useMembersByRegion } from "@/hooks/useAdmin";
import { Table } from 'antd';
import { FaAngleLeft } from "react-icons/fa";

interface RegionalClubMemberData {
  id: string;
  name: string;
  email: string;
  status: string;
  joined_at: string; 
  club: string;
  role: string;
}

const RegionalClubMembers: React.FC = () => {
  const { region_id } = useParams<{ region_id: string }>();
  const { data, isLoading } = useMembersByRegion(region_id);
  const navigate = useNavigate();

  const columns: ColumnDefinition<RegionalClubMemberData>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },  
    {
      title: "Club Name",
      dataIndex: "club",
      key: "club",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig: { [key: string]: { color: string; bg: string; border: string } } = {
          pending: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
          active: { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }, // Added 'active' status
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
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Joined At",
      dataIndex: "joined_at",
      key: "joined_at",
    },
  ];

  return (
    <div className="">
      <div className="p-4 border bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
      <h3
        className="text-md font-semibold text-[#667085] flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)} // 👈 go back to previous page
        >
        <FaAngleLeft /> Regional Club Members ({region_id})
        </h3>     
      </div>
      <div className="border-[0.6px] bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
        <Table
          columns={columns}
          dataSource={data || []}
          loading={isLoading}
          className="custom-table text-[14px]"
          pagination={{
            current: 1,
            pageSize: 8,
            total: data?.data?.length || 0,
            onChange: () => {},
          }}
        />        
      </div>
    </div>
  );
};

export default RegionalClubMembers;
