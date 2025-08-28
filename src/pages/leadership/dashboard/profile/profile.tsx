import React from 'react';
import { Card, Avatar, Tag, Spin, Row, Col, Tabs, Typography, Space, Empty, Descriptions, Badge } from 'antd';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import { useProfile } from '@/hooks/useProfile';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card>
          <Text type="danger">Failed to load profile. Please try again.</Text>
        </Card>
      </div>
    );
  }

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'club-president': 'Club President',
      'club-member': 'Club Member',
      'admin': 'Administrator',
      'moderator': 'Moderator'
    };
    return roleMap[role] || role;
  };

  type BadgeStatusType = 'success' | 'error' | 'warning' | 'default' | 'processing';

  const getStatusColor = (status: string): BadgeStatusType => {
    const statusMap: { [key: string]: BadgeStatusType } = {
      'active': 'success',
      'inactive': 'error',
      'pending': 'warning',
      'suspended': 'error'
    };
    return statusMap[status] || 'default';
  };

  return (
    <div className="p-6">
      <Card bordered={false}>
        {/* Profile Header */}
        <div className="text-center mb-6">
          <Avatar size={120} icon={<FaUser />} style={{ backgroundColor: '#3898CB' }} />
          <Title level={2} className="mt-4 mb-4">{profile.name}</Title>

          <Space wrap className="mb-3">
              <Tag color="blue">{getRoleDisplayName(profile.role[0]) }</Tag>
          </Space>

          <Badge status={getStatusColor(profile.status)} text={`Status: ${profile.status}`} />
        </div>

        {/* Tabs Layout */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic Information" key="1">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label={<InfoLabel icon={<FaEnvelope />} text="Email" />}>{profile.email}</Descriptions.Item>
              <Descriptions.Item label={<InfoLabel icon={<FaUser />} text="Age" />}>{profile.user_details.age} years old</Descriptions.Item>
              <Descriptions.Item label={<InfoLabel icon={<FaUser />} text="Pronouns" />}>{profile.user_details.pronouns}</Descriptions.Item>
              <Descriptions.Item label={<InfoLabel icon={<FaMapMarkerAlt />} text="Timezone" />}>{profile.user_details.country_timezone}</Descriptions.Item>
              <Descriptions.Item label={<InfoLabel icon={<FaGraduationCap />} text="Education Status" />}>{profile.user_details.homeschool_status}</Descriptions.Item>
              <Descriptions.Item label={<InfoLabel icon={<FaClock />} text="Member Since" />}>{new Date(profile.user_details.created_at).toLocaleDateString()}</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab="Presided Clubs" key="2">
            {profile.presided_clubs.length > 0 ? (
              <Space direction="vertical" className="w-full">
                {profile.presided_clubs.map((club) => (
                  <Card key={club.id} size="small">
                    <Text strong>{club.name}</Text>
                    <br />
                    <Text type="secondary">Region ID: {club.region_id}</Text>
                    <br />
                    <Text>Status: <Tag color="green">{club.open_status}</Tag></Text>
                    <br />
                    <Text type="secondary">Created: {new Date(club.created_at).toLocaleDateString()}</Text>
                  </Card>
                ))}
              </Space>
            ) : (
              <Empty description="No presided clubs" />
            )}
          </TabPane>

          <TabPane tab="Club Memberships" key="3">
            {profile.memberships.length > 0 ? (
              <Space direction="vertical" className="w-full">
                {profile.memberships.map((membership) => (
                  <Card key={membership.id} size="small">
                    <Row justify="space-between" align="middle">
                      <Col>
                        <Text strong>{membership.club}</Text>
                        <br />
                        <Text type="secondary">Joined: {membership.joined_at}</Text>
                      </Col>
                      <Col>
                        <Tag color={getStatusColor(membership.status)}>{membership.status}</Tag>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            ) : (
              <Empty description="No club memberships" />
            )}
          </TabPane>

          {profile.user_details.bio && (
            <TabPane tab="Bio" key="4">
              <Paragraph>{profile.user_details.bio}</Paragraph>
            </TabPane>
          )}
        </Tabs>
      </Card>
    </div>
  );
};

const InfoLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <Space>
    {icon}
    <span>{text}</span>
  </Space>
);

export default ProfilePage;
