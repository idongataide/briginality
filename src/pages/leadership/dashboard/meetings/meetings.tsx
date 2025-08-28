import React, { useMemo, useState } from 'react';
import { List, Button, Tabs, Modal, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { FaVideo } from "react-icons/fa6";
import { useLeadershipStore } from '@/global/leadershipStore';
import { createEvent } from '@/api/eventsApi';
import { useEvents } from '@/hooks/useEvents';
import toast from 'react-hot-toast';

const { TabPane } = Tabs;

const MeetingsPage: React.FC = () => {
    const { presidedClubs } = useLeadershipStore();
    const { data: events, isLoading, mutate } = useEvents();

  const currentDate = dayjs().format('YYYY-MM-DD');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const clubOptions = useMemo(() => {
    return (presidedClubs || []).map((c) => ({
      label: c.name,
      value: c.id,
    }));
  }, [presidedClubs]);

  const upcomingEvents = (events || []).filter(event => dayjs(event.date).isAfter(dayjs(currentDate)) || dayjs(event.date).isSame(dayjs(currentDate)));
  const pastEvents = (events || []).filter(event => dayjs(event.date).isBefore(dayjs(currentDate)));

  return (
    <div className="col-xl-12 col-12">
      <div className="box">
        <div className="box-header with-border">
          <h4 className="box-title">Club Events</h4>
          <div className="box-controls pull-right">
            <Button type="primary" size="middle" onClick={() => setIsModalOpen(true)}>Add Event</Button>
          </div>
        </div>
        <div className="box-body">
          <Tabs 
            activeKey={activeTab} 
            onChange={key => setActiveTab(key)}
            className="mb-20"
          >
            <TabPane tab="Upcoming Events" key="upcoming">
              <List
                loading={isLoading}
                dataSource={upcomingEvents}
                renderItem={(event) => (
                  <List.Item>
                    <div className="d-flex align-items-center justify-content-between w-full">
                      <div className="flex mb-2">
                        <div>
                          <h5 className="font-semibold! mb-1">{event.title}</h5>
                          <p className="mb-1">{event.club}</p>
                          <p className="text-md">{event.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-left">
                        <p className="text-md">
                          {dayjs(event.date).format('MMMM D, YYYY')} • {event.time}
                        </p>
                      </div>
                      <div className="flex flex-column">
                        <Button 
                          type="primary" 
                          size="small"
                          onClick={() => window.open(event.meetingLink, '_blank')}
                        >
                          <FaVideo className="mr-1" />
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Past Events" key="past">
              <List
                loading={isLoading}
                dataSource={pastEvents}
                renderItem={(event) => (
                  <List.Item>
                    <div className="d-flex align-items-center justify-content-between w-full">
                      <div className="flex mb-2">
                        <div>
                          <h5 className="font-semibold! mb-1">{event.title}</h5>
                          <p className="mb-1">{event.club}</p>
                          <p className="text-md">{event.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-left">
                        <p className="text-md">
                          {dayjs(event.date).format('MMMM D, YYYY')} • {event.time}
                        </p>
                      </div>
                      <div className="flex flex-column">
                        <Button 
                          type="default" 
                          size="small"
                          disabled
                        >
                          Event Ended
                        </Button>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        title="Add New Event"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Create Event"
        confirmLoading={submitting}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            try {
              setSubmitting(true);
              const payload = {
                name: values.name,
                assigned_club_id: values.assigned_club_id,
                start_date: values.date.format('YYYY-MM-DD'),
                end_date: values.date.format('YYYY-MM-DD'),
                start_time: values.time?.[0]?.format('HH:mm'),
                end_time: values.time?.[1]?.format('HH:mm'),
                description: values.description,
                zoom_link: values.zoom_link,
              };
              const res = await createEvent(payload);
              if ((res as any)?.error) {
                toast.error((res as any)?.message || 'Failed to create event');
                return;
              }
              toast.success('Event created');
              setIsModalOpen(false);
              form.resetFields();
              mutate();
            } catch (e: any) {
              toast.error(e?.message || 'Failed to create event');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form.Item name="assigned_club_id" label="Club" rules={[{ required: true, message: 'Select a club' }]}>
            <Select
              className='h-[43px]!'
              options={clubOptions}
              placeholder={clubOptions.length ? 'Select club' : 'No presided clubs found'}
            />
          </Form.Item>
          <Form.Item name="name" label="Event Name" rules={[{ required: true, message: 'Enter event name' }]}>
            <Input placeholder="Emergency Club Board Meeting" />
          </Form.Item>
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item 
              name="date" 
              label="Date" 
              rules={[{ required: true, message: 'Select date' }]}
              style={{ flex: 1 }}
            >
              <DatePicker className="w-full h-[43px]!" />
            </Form.Item>

            <Form.Item 
              name="time" 
              label="Time Range" 
              rules={[{ required: true, message: 'Select start and end time' }]}
              style={{ flex: 1 }}
            >
              <TimePicker.RangePicker className="w-full h-[43px]!" format="HH:mm" />
            </Form.Item>
          </div>

          <Form.Item name="zoom_link" label="Meeting Link" rules={[{ type: 'url', message: 'Enter a valid URL' }]}>
            <Input placeholder="https://zoom.us/j/7778889990" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={6} placeholder="Event description and agenda" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MeetingsPage;