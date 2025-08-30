import React from 'react';
import { Card, Avatar, Tag, Typography, Space, Badge, Tabs, Form, Input, Button } from 'antd';
import { FaUser } from 'react-icons/fa';
import { useProfile } from '@/hooks/useProfile';
import { changePassword } from '@/api/changePasswordApi';
import toast from 'react-hot-toast';
import { ResponseValue } from '@/interfaces/enums';
import LoadingScreen from '@/pages/dashboard/common/LoadingScreen';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { profile, error } = useProfile();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrator',
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

  return (
    <div className="p-6">
      <Card bordered={false}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Profile" key="1">
            <div className="text-center mb-6">
              <Avatar size={120} icon={<FaUser />} style={{ backgroundColor: '#3898CB' }} />
              <Title level={2} className="mt-4 mb-4">{profile.name}</Title>
              <Space wrap className="mb-3">
                <Tag color="blue">{getRoleDisplayName(profile.role[0])}</Tag>
              </Space>
              <Badge status={getStatusColor(profile.status)} text={`Status: ${profile.status}`} />
            </div>
            <div className="px-6 pb-6">
              <Space direction="vertical" size="large">
                <Text strong>Email:</Text> <Text>{profile.email}</Text>
              </Space>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Update Password" key="2">
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
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};


export default ProfilePage;
