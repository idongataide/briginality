import React, { useState } from 'react';
import { Modal, Button, Space, Input, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface RejectConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const RejectConfirmationModal: React.FC<RejectConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Reject Application',
  cancelText = 'Cancel',
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    form.validateFields().then(() => {
      onConfirm(notes);
    });
  };

  const handleClose = () => {
    setNotes('');
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
      centered
      className="reject-confirmation-modal"
    >
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="mb-4 text-4xl">
            <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
        </div>
        
        <Form form={form} layout="vertical">
          <Form.Item
            label="Rejection Reason (Optional)"
            name="notes"
            rules={[
              {
                max: 500,
                message: 'Notes cannot exceed 500 characters',
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Please provide a reason for rejection (optional)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Form>
        
        <div className="text-center mt-6">
          <Space size="middle">
            <Button
              onClick={handleClose}
              disabled={loading}
              className="px-6"
            >
              {cancelText}
            </Button>
            
            <Button
              type="primary"
              onClick={handleConfirm}
              loading={loading}
              className="px-6 bg-red-500 border-red-500 hover:bg-red-600 text-white"
            >
              {confirmText}
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default RejectConfirmationModal;

