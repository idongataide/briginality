import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'delete' | 'approve' | 'confirm';
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  type = 'confirm',
  loading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'approve':
        return <CheckOutlined style={{ color: '#52c41a' }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
    }
  };

  type PrimaryButtonType = 'primary' | 'default';

  const getConfirmButtonType = (): PrimaryButtonType => {
    switch (type) {
      case 'delete':
      case 'approve':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const getConfirmButtonStyle = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-500 border-red-500 hover:bg-red-600';
      case 'approve':
        return 'bg-green-500 border-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 border-blue-500 hover:bg-blue-600';
    }
  };

  const getDefaultConfirmText = () => {
    switch (type) {
      case 'delete':
        return 'Delete';
      case 'approve':
        return 'Approve';
      default:
        return 'Confirm';
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      className="confirmation-modal"
    >
      <div className="text-center p-4">
        <div className="mb-4 text-4xl">
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-bold! text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <Space size="middle">
          <Button
            onClick={onClose}
            disabled={loading}
            className="px-6"
          >
            {cancelText}
          </Button>
          
          <Button
            type={getConfirmButtonType()}
            onClick={onConfirm}
            loading={loading}
            className={`px-6 text-white ${getConfirmButtonStyle()}`}
          >
            {confirmText || getDefaultConfirmText()}
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ConfirmationModal; 