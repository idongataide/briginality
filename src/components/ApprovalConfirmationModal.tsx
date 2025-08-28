import React from 'react';
import { Modal, Button, Space } from 'antd';
import { CheckOutlined, UserOutlined } from '@ant-design/icons';

interface ApprovalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
  loading?: boolean;
}

const ApprovalConfirmationModal: React.FC<ApprovalConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  studentName,
  loading = false,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={450}
      centered
      className="approval-confirmation-modal"
    >
      <div className="text-center p-6">
        <div className="mb-4 text-5xl text-green-500">
          <CheckOutlined />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Approve Application
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-center mb-3">
            <UserOutlined className="text-gray-400 mr-2" />
            <span className="text-gray-600 font-medium">{studentName}</span>
          </div>
          <p className="text-gray-600 text-sm">
            Are you sure you want to approve this student's club application?
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This action will change their status from "Pending" to "Approved"
          </p>
        </div>
        
        <Space size="middle">
          <Button
            onClick={onClose}
            disabled={loading}
            className="px-6 h-10"
          >
            Cancel
          </Button>
          
          <Button
            type="primary"
            onClick={onConfirm}
            loading={loading}
            className="px-6 h-10 bg-green-500 border-green-500 hover:bg-green-600"
            icon={<CheckOutlined />}
          >
            Approve Application
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ApprovalConfirmationModal; 