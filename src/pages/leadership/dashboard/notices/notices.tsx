import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Popconfirm,
  Card,
  Typography,
  Tag,
  Tooltip,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { useNotices, useNoticeActions } from '@/hooks/useNotices';
import { useLeadershipStore } from '@/global/leadershipStore';
import { Notice, CreateNoticePayload, UpdateNoticePayload } from '@/api/noticesApi';
import { useOnboardingStore } from '@/global/store';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NoticesPage: React.FC = () => {
  const { pathname } = useLocation();
  const { setNavPath } = useOnboardingStore();
  const { presidedClubs } = useLeadershipStore();
  const { data: notices, isLoading, mutate } = useNotices();
  const { createNotice, updateNotice, deleteNotice } = useNoticeActions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNavPath(pathname.replace("/notices", "dashboard"));
  }, [pathname, setNavPath]);

  const handleCreate = () => {
    setEditingNotice(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Notice) => {
    setEditingNotice(record);
    form.setFieldsValue({
      title: record.title,
      content: record.content,
      club_id: record.club_id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteNotice(id);
      message.success('Notice deleted successfully');
      mutate();
    } catch (error: any) {
      message.error(error.message || 'Failed to delete notice');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      
      if (editingNotice) {
        // Update notice
        const updatePayload: UpdateNoticePayload = {
          ...values,
          _method: 'PUT'
        };
        await updateNotice(editingNotice.id, updatePayload);
        message.success('Notice updated successfully');
      } else {
        // Create notice
        const createPayload: CreateNoticePayload = {
          title: values.title,
          content: values.content,
          club_id: values.club_id,
        };
        await createNotice(createPayload);
        message.success('Notice created successfully');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      mutate();
    } catch (error: any) {
      message.error(error.message || 'Failed to save notice');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingNotice(null);
  };

  const getClubName = (clubId: number) => {
    const club = presidedClubs.find(c => c.id === clubId);
    return club?.name || `Club ${clubId}`;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <Text strong style={{ maxWidth: 200 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <Text style={{ maxWidth: 300 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Club',
      dataIndex: 'club_id',
      key: 'club_id',
      render: (clubId: number) => (
        <Tag color="blue">{getClubName(clubId)}</Tag>
      ),
    },   
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Notice) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Notice">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Notice">
            <Popconfirm
              title="Delete Notice"
              description="Are you sure you want to delete this notice? This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
              icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Title level={3} style={{ margin: 0 }}>Notices Management</Title>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleCreate}
                size="large"
              >
                Create Notice
              </Button>
            </div>
            
            <Divider />
            
            <Table
              columns={columns}
              dataSource={notices}
              rowKey="id"
              loading={isLoading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} notices`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Create/Edit Modal */}
      <Modal
        title={editingNotice ? 'Edit Notice' : 'Create New Notice'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            id: presidedClubs[0]?.id || undefined
          }}
        >
          <Form.Item
            name="title"
            label="Notice Title"
            rules={[
              { required: true, message: 'Please enter a title for the notice' },
              { min: 3, message: 'Title must be at least 3 characters long' }
            ]}
          >
            <Input 
              placeholder="Enter notice title" 
              maxLength={100}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="club_id"
            label="Select Club"
            rules={[
              { required: true, message: 'Please select a club' }
            ]}
          >
            <Select className='h-[43px]!'  placeholder="Select a club">
              {presidedClubs.map((club) => (
                <Option key={club.id} value={club.id}>
                  {club.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="Notice Content"
            rules={[
              { required: true, message: 'Please enter the notice content' },
              { min: 10, message: 'Content must be at least 10 characters long' }
            ]}
          >
            <TextArea
              placeholder="Enter notice content..."
              rows={8}
              maxLength={2000}
              showCount
              style={{ resize: 'vertical' }}
            />
          </Form.Item>

          <Form.Item className='mt-[40px]!' style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button className='h-[43px]!' onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                className='h-[43px]!'
                loading={loading}
              >
                {editingNotice ? 'Update Notice' : 'Create Notice'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NoticesPage;
