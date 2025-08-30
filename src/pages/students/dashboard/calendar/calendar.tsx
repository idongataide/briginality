import React, { useState } from 'react';
import { Calendar, Badge, Tabs, Card, Tag, Button, Spin } from 'antd';
import { FaClock, FaMapMarkerAlt, FaVideo } from 'react-icons/fa';
import { useRegions } from '@/hooks/useEnums';
import { useEventsByRegion } from '@/hooks/useEvents';
import { useProfile } from '@/hooks/useProfile';

const { TabPane } = Tabs;

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeRegion, setActiveRegion] = useState<string>('');
  
  const { data: regions, isLoading: regionsLoading } = useRegions();
  const { profile } = useProfile();
  const { data: events, isLoading: eventsLoading } = useEventsByRegion(activeRegion);

  // Set first region as active when regions load
  React.useEffect(() => {
    if (regions && regions.length > 0 && !activeRegion) {
      setActiveRegion(regions[0].id?.toString() || '');
    }
  }, [regions, activeRegion]);

  // Function to get region ID by name
  const getRegionIdByName = (regionName: string) => {
    if (!regions?.data || !regionName) return null;
    const region = regions.data.find((r: { name: string; id: string | number }) => r.name === regionName);
    return region ? region.id : null;
  };

  const getListData = (value: any) => {
    if (!events) return [];
    const date = value.format('YYYY-MM-DD');
    return events.filter(event => event.start_date === date);
  };

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge 
              status="processing" 
              color="#3898CB"
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

  const renderEventCard = (event: any) => {
    const eventRegionId = getRegionIdByName(event.region);
    const userRegionId = profile?.user_details?.region_id;
    const showJoinButton = eventRegionId && userRegionId && eventRegionId == userRegionId;

    console.log(eventRegionId,userRegionId,'eventRegionIds')
    
    return (
      <Card 
        key={event.id} 
        className="mb-4"
        style={{ borderLeft: '4px solid #3898CB' }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-lg font-semibold mb-0">{event.title}</h4>
                <Tag color="#3898CB">
                  {event.club.length > 10 ? event.club.slice(0, 15) + "..." : event.club}
                </Tag>
            </div>
            <p className="text-gray-600 mb-3">{event.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{event.club}</span>
              </div>
            </div>
          </div>
          {showJoinButton && event.meetingLink && (
            <Button 
              type="primary" 
              icon={<FaVideo />}
              onClick={() => window.open(event.meetingLink, '_blank')}
            >
              Join
            </Button>
          )}
        </div>
      </Card>
    );
  };

  if (regionsLoading) {
    return (
      <div className="container-full">
        <div className="row">
          <div className="col-xl-12">
            <div className="box">
              <div className="box-body text-center p-8">
                <Spin size="large" />
                <p className="mt-4">Loading regions...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                onChange={(key) => setActiveRegion(key)}
                className="mb-4"
              >
                {regions?.data?.map((region: any) => (
                  <TabPane 
                    tab={
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: '#3898CB' }}
                        />
                        <span>{region.name}</span>
                      </div>
                    } 
                    key={region.id?.toString() || ''}
                  >
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold mb-2">Region: {region.name}</h5>
                      <p className="text-sm text-gray-600">Click on a date to view events</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Calendar */}
                      <div>
                        <h5 className="font-semibold mb-3">Calendar View</h5>
                        <Calendar 
                          fullscreen={false}
                          dateCellRender={dateCellRender}
                          onSelect={(date) => setSelectedDate(date.toDate())}
                          style={{ 
                            border: '1px solid #d9d9d9',
                            borderRadius: '6px',
                            padding: '8px'
                          }}
                        />
                      </div>
                      
                      {/* Events List */}
                      <div>
                        <h5 className="font-semibold mb-3">Events</h5>
                        {eventsLoading ? (
                          <div className="text-center p-8">
                            <Spin />
                            <p className="mt-4">Loading events...</p>
                          </div>
                        ) : events && events.length > 0 ? (
                          <div className="max-h-96 overflow-y-auto">
                            {events.map(renderEventCard)}
                          </div>
                        ) : (
                          <div className="text-center p-8 text-gray-500">
                            <p>No events found for this region</p>
                          </div>
                        )}
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