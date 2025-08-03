import React, { useState } from 'react';
import { Calendar, Badge, Tabs, Card, Tag, Button } from 'antd';
import { FaClock, FaMapMarkerAlt, FaUsers, FaVideo } from 'react-icons/fa';

const { TabPane } = Tabs;

// Regional time blocks data
const regionalTimeBlocks = {
  amerisphere: {
    name: 'AmeriSphere (The Americas)',
    day: 'Saturday',
    time: '4 – 8 PM UTC',
    localTime: '12 – 4 PM EST',
    color: '#1890ff',
    meetings: [
      {
        id: 1,
        title: 'Code for Change Weekly Meeting',
        club: 'Code for Change',
        date: '2024-08-17',
        time: '16:00 - 17:30 UTC',
        localTime: '12:00 - 13:30 EST',
        type: 'weekly-meeting',
        meetingLink: 'https://zoom.us/j/123456789',
        description: 'Weekly coding session focusing on web development basics',
        attendees: 15,
        region: 'amerisphere'
      },
      {
        id: 2,
        title: 'Entrepreneurship Workshop',
        club: 'Entrepreneurship & Innovation Club',
        date: '2024-08-17',
        time: '18:00 - 19:30 UTC',
        localTime: '14:00 - 15:30 EST',
        type: 'workshop',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        description: 'Business model canvas workshop for young entrepreneurs',
        attendees: 8,
        region: 'amerisphere'
      }
    ]
  },
  afroeuro: {
    name: 'AfroEuro (Africa + Europe)',
    day: 'Saturday',
    time: '12 – 4 PM UTC',
    localTime: '1 – 5 PM WAT / 2 – 6 PM CET',
    color: '#52c41a',
    meetings: [
      {
        id: 3,
        title: 'Poetry & Prose Circle',
        club: 'Poetry & Prose Circle',
        date: '2024-08-17',
        time: '12:00 - 13:30 UTC',
        localTime: '13:00 - 14:30 WAT',
        type: 'workshop',
        meetingLink: 'https://zoom.us/j/987654321',
        description: 'Creative writing workshop with guest poet',
        attendees: 12,
        region: 'afroeuro'
      },
      {
        id: 4,
        title: 'MUN Practice Session',
        club: 'Model United Nations (MUN)',
        date: '2024-08-17',
        time: '14:00 - 16:00 UTC',
        localTime: '15:00 - 17:00 WAT',
        type: 'practice',
        meetingLink: 'https://meet.google.com/xyz-uvw-123',
        description: 'Debate practice for upcoming MUN conference',
        attendees: 20,
        region: 'afroeuro'
      }
    ]
  },
  asialume: {
    name: 'AsiaLume (Asia + Australia)',
    day: 'Sunday',
    time: '5 – 9 PM UTC',
    localTime: '2 – 6 PM JST / AEST',
    color: '#722ed1',
    meetings: [
      {
        id: 5,
        title: 'Space & Astronomy Club',
        club: 'Space & Astronomy Club',
        date: '2024-08-18',
        time: '17:00 - 18:30 UTC',
        localTime: '02:00 - 03:30 JST',
        type: 'discussion',
        meetingLink: 'https://zoom.us/j/555666777',
        description: 'Discussion on latest space discoveries',
        attendees: 10,
        region: 'asialume'
      },
      {
        id: 6,
        title: 'Language Exchange Session',
        club: 'Language Exchange & Linguistics Club',
        date: '2024-08-18',
        time: '19:00 - 20:30 UTC',
        localTime: '04:00 - 05:30 JST',
        type: 'exchange',
        meetingLink: 'https://meet.google.com/abc-123-def',
        description: 'Multi-language conversation practice',
        attendees: 18,
        region: 'asialume'
      }
    ]
  }
};

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeRegion, setActiveRegion] = useState('amerisphere');
  console.log(selectedDate);

  const getListData = (value: any, region: string) => {
    const date = value.format('YYYY-MM-DD');
    const regionData = regionalTimeBlocks[region as keyof typeof regionalTimeBlocks];
    return regionData.meetings.filter(event => event.date === date);
  };

  const dateCellRender = (value: any, region: string) => {
    const listData = getListData(value, region);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge 
              status="processing" 
              color={regionalTimeBlocks[region as keyof typeof regionalTimeBlocks].color}
              text={
                <div className="text-xs truncate max-w-[80px]">
                  {item.title}
                </div>
              } 
            />
          </li>
        ))}
      </ul>
    );
  };

  const renderMeetingCard = (meeting: any) => {
    const regionData = regionalTimeBlocks[meeting.region as keyof typeof regionalTimeBlocks];
    
    return (
      <Card 
        key={meeting.id} 
        className="mb-4"
        style={{ borderLeft: `4px solid ${regionData.color}` }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-semibold mb-0">{meeting.title}</h4>
              <Tag color={regionData.color}>{meeting.club}</Tag>
            </div>
            <p className="text-gray-600 mb-3">{meeting.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{meeting.localTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{regionData.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers />
                <span>{meeting.attendees} attendees</span>
              </div>
            </div>
          </div>
          
          <Button 
            type="primary" 
            icon={<FaVideo />}
            onClick={() => window.open(meeting.meetingLink, '_blank')}
          >
            Join
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="container-full">
      <div className="row">
        <div className="col-xl-12">
          <div className="box">
            <div className="box-header with-border">
              <h4 className="box-title">Regional Calendar</h4>
            </div>
            <div className="box-body">
              <Tabs 
                activeKey={activeRegion} 
                onChange={setActiveRegion}
                className="mb-4"
              >
                {Object.entries(regionalTimeBlocks).map(([key, region]) => (
                  <TabPane 
                    tab={
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: region.color }}
                        />
                        <span>{region.name}</span>
                      </div>
                    } 
                    key={key}
                  >
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold mb-2">Regional Time Block</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong>Day:</strong> {region.day}
                        </div>
                        <div>
                          <strong>UTC Time:</strong> {region.time}
                        </div>
                        <div>
                          <strong>Local Time:</strong> {region.localTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Calendar */}
                      <div>
                        <h5 className="font-semibold mb-3">Calendar View</h5>
                        <Calendar 
                          fullscreen={false}
                          dateCellRender={(value) => dateCellRender(value, key)}
                          onSelect={(date) => setSelectedDate(date.toDate())}
                          style={{ 
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            padding: '8px'
                          }}
                        />
                      </div>
                      
                      {/* Meetings List */}
                      <div>
                        <h5 className="font-semibold mb-3">Upcoming Meetings</h5>
                        <div className="max-h-96 overflow-y-auto">
                          {region.meetings.map(renderMeetingCard)}
                        </div>
                      </div>
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;