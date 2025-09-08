import { useEffect, useState } from "react";
import { Table, Alert, Tag, List, Typography, Empty, Tooltip } from "antd";
import { useProfile } from "@/hooks/useProfile";
import { usefetchClubMembers } from "@/hooks/useClubMembers";
import DashboadLoadingScreen from "../dashboardScreen";
import { SearchOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const ClubMembers = () => {
  const { profile, error: profileError, isLoading: profileLoading } = useProfile();
  const [clubId, setClubId] = useState<string | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });

  useEffect(() => {
    if (profile && profile.memberships && profile.memberships.length > 0) {
      const firstClubId = profile.memberships[0].club_id
        ? String(profile.memberships[0].club_id)
        : null;
      setClubId(firstClubId);
      setSelectedClubId(firstClubId);
    }
  }, [profile]);

  const { data: members } = usefetchClubMembers(clubId);

  const customEmpty = (
    <Empty
      image={<SearchOutlined style={{ fontSize: 48, color: "#3b82f6" }} />}
      description={
        <div>
          <p className="text-lg font-medium text-gray-800">No members yet</p>
          <p className="text-sm text-gray-500">
            Members will appear here once they join your club.
          </p>
        </div>
      }
    />
  );

  if (profileLoading) return <DashboadLoadingScreen />;

  if (profileError)
    return (
      <Alert
        message="Error"
        description={profileError}
        type="error"
        showIcon
      />
    );

  const handleClubClick = (id: string | null) => {
    setSelectedClubId(id);
    setClubId(id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <UserOutlined className="text-gray-400" />
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: "Club",
      dataIndex: "club",
      key: "club",
      render: (club: string) => (
        <Tooltip title="Club this member belongs to">
          <span className="text-gray-700">{club}</span>
        </Tooltip>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag className="capitalize" color="blue">
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Joined At",
      dataIndex: "joined_at",
      key: "joined_at",
      render: (date: string) => (
        <span className="text-gray-600 text-sm">{date}</span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <TeamOutlined />
              Your Clubs
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            {profile && profile.memberships && profile.memberships.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={profile.memberships}
                renderItem={(item) => (
                  <List.Item
                    className={`cursor-pointer px-3 py-2 rounded-md transition ${
                      selectedClubId === String(item.club_id)
                        ? "bg-blue-50 border-l-4 border-[#3898CB]"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleClubClick(String(item.club_id))}
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Text className="font-medium text-gray-800">
                          {item.club}
                        </Typography.Text>
                      }
                      description={<Tag color="blue">{item.role}</Tag>}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Alert
                message="No club memberships found."
                type="info"
                showIcon
              />
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <h3 className="text-sm font-semibold text-gray-600">
              Membership List
            </h3>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-2">
            <Table
              columns={columns}
              dataSource={members}
              locale={{ emptyText: customEmpty }}
              size="middle"
              rowKey="id"
              className="custom-table text-[14px]"
              pagination={{
                ...pagination,
                showSizeChanger: false,
                showQuickJumper: false,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} members`,
              }}
              onChange={(pag) =>
                setPagination({
                  current: pag.current ?? 1,
                  pageSize: pag.pageSize ?? 8,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubMembers;
