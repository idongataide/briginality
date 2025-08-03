import React, { useState } from 'react';
import { List, Button, Tabs } from 'antd';
import dayjs from 'dayjs';
import { FaVideo } from "react-icons/fa6";

const { TabPane } = Tabs;

const MeetingsPage: React.FC = () => {
    const allEvents = [
        {
          id: 1,
          title: 'Code for Change Weekly Meeting',
          club: 'Code for Change',
          date: '2025-08-17',
          time: '14:00 - 15:30',
          type: 'weekly-meeting',
          meetingLink: 'https://zoom.us/j/123456789',
          description: 'Weekly coding session focusing on web development basics',
          icon: 'fa-code',
          bgColor: 'bg-primary-light'
        },
        {
          id: 2,
          title: 'Poetry Workshop with Guest Speaker',
          club: 'Poetry & Prose Circle',
          date: '2025-08-18',
          time: '16:00 - 17:30',
          type: 'workshop',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          description: 'Special workshop with published poet Sarah Johnson',
          icon: 'fa-pencil',
          bgColor: 'bg-warning-light'
        },
        {
          id: 3,
          title: 'MUN Practice Session',
          club: 'Model United Nations',
          date: '2024-08-20',
          time: '15:00 - 16:30',
          type: 'practice',
          meetingLink: 'https://teams.microsoft.com/l/meetup-join/123',
          description: 'Practice session for upcoming conference',
          icon: 'fa-globe',
          bgColor: 'bg-success-light'
        },
        {
          id: 4,
          title: 'Entrepreneurship Pitch Night',
          club: 'Entrepreneurship & Innovation Club',
          date: '2024-08-22',
          time: '18:00 - 20:00',
          type: 'event',
          meetingLink: 'https://discord.gg/entrepreneurship',
          description: 'Present your business ideas to the community',
          icon: 'fa-lightbulb-o',
          bgColor: 'bg-info-light'
        },
        {
          id: 5,
          title: 'Space & Astronomy Club Meeting',
          club: 'Space & Astronomy Club',
          date: '2024-07-24',
          time: '19:00 - 20:30',
          type: 'weekly-meeting',
          meetingLink: 'https://zoom.us/j/987654321',
          description: 'Discussion on latest space discoveries and telescope observations',
          icon: 'fa-rocket',
          bgColor: 'bg-purple-light'
        },
        {
          id: 6,
          title: 'Debate Club Practice',
          club: 'Debate & Public Speaking Club',
          date: '2024-07-25',
          time: '14:00 - 16:00',
          type: 'practice',
          meetingLink: 'https://meet.google.com/xyz-uvw-rst',
          description: 'Practice debate session on current events',
          icon: 'fa-comments',
          bgColor: 'bg-danger-light'
        }
      ];

  const currentDate = dayjs().format('YYYY-MM-DD');
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = allEvents.filter(event => dayjs(event.date).isAfter(dayjs(currentDate)) || dayjs(event.date).isSame(dayjs(currentDate)));
  const pastEvents = allEvents.filter(event => dayjs(event.date).isBefore(dayjs(currentDate)));

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