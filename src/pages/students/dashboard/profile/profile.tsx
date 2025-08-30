import React from 'react';
import { Card, Avatar, Tag,Row, Col, Tabs, Typography, Space, Empty, Descriptions, Badge, Form, Input, Button } from 'antd';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import { useProfile } from '@/hooks/useProfile';
import { changePassword } from '@/api/changePasswordApi';
import toast from 'react-hot-toast';
import { ResponseValue } from '@/interfaces/enums';
import LoadingScreen from '@/layouts/LoadingScreen';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { profile, error } = useProfile();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    const data = {
      current_password: values.current_password,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    changePassword(data)
      .then((res) => { 
        if (res.status === ResponseValue.SUCCESS) {
          toast.success('Password updated successfully!');
          form.resetFields();
        } else {
          const errorObj = res?.response?.data?.error_message;
          if (errorObj && typeof errorObj === 'object') {
            const allErrors = Object.values(errorObj)
              .map((arr) => Array.isArray(arr) ? arr.join(' ') : arr)
              .join(' ');
            toast.error(allErrors || res?.message || 'An error occurred');
          } else {
            toast.error(res?.message || 'An error occurred');
          }
        }
      })
      .catch((error) => {
        toast.error(error.message || "An unexpected error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (error || !profile) {
    return (
      <LoadingScreen/>
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
          <Title level={2} className="mt-4 mb-3">{profile.name}</Title>

          <Space wrap className="mb-3">
            {profile.role.map((role, index) => (
              <Tag key={index} color="blue">{getRoleDisplayName(role)}</Tag>
            ))}
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
            {profile?.presided_clubs?.length > 0 ? (
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
          <TabPane tab="Update Password" key="5">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: 400, margin: '0 auto', marginTop: 32 }}
            >
              <Form.Item
                label="Current Password"
                name="current_password"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="password_confirmation"
                dependencies={["password"]}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className='!h-[43px]' htmlType="submit" loading={loading} block>
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
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