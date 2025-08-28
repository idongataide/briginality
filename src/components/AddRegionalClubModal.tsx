import React, { useState } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { useRegions, useClubs } from '@/hooks/useEnums';
import { useApprovedLeaders } from '@/hooks/useAdmin';
import { createClubGroup } from '@/api/useAdmin';
import toast from 'react-hot-toast';
import { ResponseValue } from '@/interfaces/enums';

interface AddRegionalClubModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

interface RegionalClubData {
  region_id: number;
  club_id: number;
  president_id?: number;
  vice_id?: number;
}

const AddRegionalClubModal: React.FC<AddRegionalClubModalProps> = ({
  visible,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Fetch data
  const { data: regions, isLoading: regionsLoading } = useRegions();
  const { data: clubs, isLoading: clubsLoading } = useClubs();
  const { data: approvedLeaders, isLoading: leadersLoading } = useApprovedLeaders();


  const handleSubmit = async (values: RegionalClubData) => {
    setLoading(true);
    try {
      const payload: RegionalClubData = {
        region_id: values.region_id,
        club_id: values.club_id,
        ...(values.president_id ? { club_president_id: values.president_id } : {}),
        ...(values.vice_id ? { club_vice_id: values.vice_id } : {}),
      };

      const response = await createClubGroup(payload);
      if (response?.status === ResponseValue.SUCCESS) {
        toast.success('Regional club added successfully');
        form.resetFields();
        onSuccess();
      }
      else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to add regional club');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add Regional Club"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          region_id: undefined,
          club_id: undefined,
          president_id: undefined,
          vice_id: undefined
        }}
        className='p-5'
      >
        <Form.Item
          label="Region"
          className='mt-5!'
          name="region_id"
          rules={[{ required: true, message: 'Please select a region' }]}
        >
          <Select
            placeholder="Select a region"
            loading={regionsLoading}
            showSearch
            optionFilterProp="children"
            className='h-[43px]!'
          >
            {regions?.data?.map((region: any) => (
              <Select.Option key={region?.id} value={region?.id}>
                {region?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Club"
          name="club_id"
          rules={[{ required: true, message: 'Please select a club' }]}
        >
          <Select
            placeholder="Select a club"
            loading={clubsLoading}
            showSearch
            optionFilterProp="children"
            className='h-[43px]!'
          >
            {clubs?.data?.map((club: any) => (
              <Select.Option key={club?.id} value={club?.id}>
                {club?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="President (Optional)"
          name="president_id"
        >
          <Select
            placeholder="Select a president"
            loading={leadersLoading}
            showSearch
            optionFilterProp="children"
            allowClear
            className='h-[43px]!'
          >
            {approvedLeaders?.map((leader: any) => (
              <Select.Option key={leader?.id} value={leader?.id}>
                {leader?.name} - {leader?.role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Vice President (Optional)"
          name="vice_id"
        >
          <Select
            placeholder="Select a vice president"
            loading={leadersLoading}
            showSearch
            optionFilterProp="children"
            allowClear
            className='h-[43px]!'
          >
            {approvedLeaders?.map((leader: any) => (
              <Select.Option key={leader?.id} value={leader?.id}>
                {leader?.name} - {leader?.role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="mt-10! mb-0">
          <div className="flex justify-end space-x-3">
            <Button className='py-5! px-10!' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" className='py-5! px-10! ml-3!' htmlType="submit" loading={loading}>
              Add Regional Club
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRegionalClubModal;
