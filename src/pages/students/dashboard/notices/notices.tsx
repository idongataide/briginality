import React, { useEffect } from 'react';
import { 
  Table, 
  Card,
  Typography,
  // Tag,
  Row,
  Col,
  Divider
} from 'antd';

import { useNotices } from '@/hooks/useNotices';
import { useOnboardingStore } from '@/global/store';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const NoticesPage: React.FC = () => {
  const { pathname } = useLocation();
  const { setNavPath } = useOnboardingStore();
  const { data: notices, isLoading } = useNotices();


  useEffect(() => {
    setNavPath(pathname.replace("/notices", "dashboard"));
  }, [pathname, setNavPath]);






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
    // {
    //   title: 'Club',
    //   dataIndex: 'club_id',
    //   key: 'club_id',
    //   render: (clubId: number) => (
    //     <Tag color="blue">{getClubName(clubId)}</Tag>
    //   ),
    // },   
   
  ];

  return (
    <div className="container-full">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Title level={3} style={{ margin: 0 }}>Notices Management</Title>              
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

    </div>
  );
};

export default NoticesPage;
