import React, {  useState } from 'react';
import { List, Button, Tabs } from 'antd';
import dayjs from 'dayjs';
import { FaVideo } from "react-icons/fa6";
import { useEvents } from '@/hooks/useEvents';

const { TabPane } = Tabs;

const MeetingsPage: React.FC = () => {
    const { data: events, isLoading } = useEvents();

  const currentDate = dayjs().format('YYYY-MM-DD');
  const [activeTab, setActiveTab] = useState('upcoming');
 


  const upcomingEvents = (events || []).filter(event => dayjs(event.date).isAfter(dayjs(currentDate)) || dayjs(event.date).isSame(dayjs(currentDate)));
  const pastEvents = (events || []).filter(event => dayjs(event.date).isBefore(dayjs(currentDate)));

  return (
    <div className="col-xl-12 col-12">
      <div className="box">
        <div className="box-header with-border">
          <h4 className="box-title">Club Events</h4>
         
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
                          disabled={!event.meetingLink}
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
     
     </div>
  );
};

export default MeetingsPage;