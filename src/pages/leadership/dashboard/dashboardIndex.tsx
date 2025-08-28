import { useOnboardingStore } from "@/global/store";
import { useLeadershipStore } from "@/global/leadershipStore";
import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Button, Calendar, Badge, List } from 'antd';
import { FaArrowRight } from "react-icons/fa";
import { useNotices } from "@/hooks/useNotices";
import { useEvents } from "@/hooks/useEvents";
import { useRegions } from "@/hooks/useEnums";
import dayjs from 'dayjs';
import Images from "@/components/images";

const DashboardIndex: React.FC = () => {
  const { pathname } = useLocation();
  const { setNavPath } = useOnboardingStore();
  const { firstName, lastName, userName, presidedClubs } = useLeadershipStore();
  const { data: notices, isLoading: noticesLoading } = useNotices();
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: regions } = useRegions();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  console.log(selectedDate)

  useEffect(() => {
    setNavPath(pathname.replace("/overview", "dashboard"));
  }, []);

  // Filter only upcoming events (events with dates in the future)
  const getUpcomingEvents = () => {
    if (!events) return [];
    
    const currentDate = dayjs().format('YYYY-MM-DD');
    return (events || []).filter(event => 
      dayjs(event.date).isAfter(dayjs(currentDate)) || 
      dayjs(event.date).isSame(dayjs(currentDate))
    ).sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());
  };



  // Get region name by region ID
  const getRegionName = (regionId: string | number | undefined) => {
    if (!regions || !regionId) return 'Club';
    
    const region = regions?.data?.find((r: any) => r.id == regionId);
    return region ? region.name : 'Club';
  };

  const getListData = (value: any) => {
    const date = value.format('YYYY-MM-DD');
    return getUpcomingEvents().filter(event => event.date === date);
  };

  const dateCellRender = (value: any) => {
    if (eventsLoading) return null;
    
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge 
              status="processing" 
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



  return (
      <div className="container-full">
        {/* Main content */}
        <section className="content">
          <div className="row">
            {/* Welcome Section */}
            <div className="col-xl-12 col-12">
             <div className="box" style={{background: "linear-gradient(135deg, #f9607f 0%, #ff7e5f 100%)"}}>
               <div className="box-body p-xl-0">
                  <div className="row align-items-center">
                    <div className="col-12 col-lg-4">
                      <img className="w-full pt-20" src="../images/svg-icon/color-svg/custom-14.svg"
                        alt=""
                      />
                    </div>
                    <div className="col-12 col-lg-8">
                      <h2 className="font-bold! text-white!">Welcome back {(firstName || lastName) ? `${firstName} ${lastName}`.trim() : (userName || "there")}!</h2>
                      <p className="text-white mb-0 fs-16 pe-10">
                        it’s always a pleasure to see you again. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    

            {/* Notice Board */}
            <div className="col-xl-4 col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">Notice Board</h4>
                </div>
                <div className="box-body p-0">
                  <div className="media-list  media-list-hover" style={{ height: '390px', overflowY: 'auto' }}>
                    {noticesLoading ? (
                      <div className="text-center p-20">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : notices.length > 0 ? (notices.slice(0, 5).map((notice: any) => (
                       <div key={notice.id} className="media bar-0">                        
                           <div className="media-body fw-500">
                             <p className="d-flex align-items-center justify-content-between">
                               <a className="hover-success" href="#">
                                 <strong>{notice.title}</strong>
                               </a>
                             </p>
                             <p className="text-fade">
                               {notice.content}
                             </p>
                           </div>
                         </div>
                      ))
                    ) : (
                      <div className="text-center mt-[100px] p-20 text-fade">
                        <div className="flex items-center justify-center">
                            <img className="w-[30%] mb-10" src={Images.empty} alt="empty" />
                          </div>                    
                          <p className="text-[#7D8489] text-xl">Notices will appear here <br/>once you have any</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="box-footer text-center p-10">
                  <a href="/leadership/notices" className="btn w-p100 btn-primary-light p-5">
                    View all
                  </a>
                </div>
              </div>
            </div>

                         {/* My Clubs */}
             <div className="col-xl-4 col-12">
               <div className="box bg-transparent no-shadow mb-30">
                 <div className="box-header no-border pb-0">
                   <h4 className="box-title">My Clubs</h4>
                   <ul className="box-controls pull-right d-md-flex d-none">
                     <li>
                       <button className="btn btn-primary-light px-10">
                         View All
                       </button>
                     </li>
                   </ul>
                 </div>
               </div>
               {presidedClubs && presidedClubs.length > 0 ? (
                 presidedClubs.map((club, index) => {
                   // Generate initials from club name - just first 2 letters
                   const clubInitials = club.name.split(' ').map(word => word.charAt(0)).join('').substring(0, 1);
                   const bgColors = [
                     '#e3f2fd', // light blue
                     '#f3e5f5', // light purple
                     '#e8f5e8', // light green
                     '#fff3e0', // light orange
                     '#fce4ec', // light pink
                     '#f1f8e9', // light lime
                     '#e0f2f1', // light teal
                     '#fafafa'  // light gray
                   ];
                   
                   const bgColor = bgColors[index % bgColors.length];
                   
                   return (
                     <div key={club.id} className="box mb-15 pull-up">
                       <div className="box-body">
                         <div className="d-flex align-items-center justify-content-between">
                           <div className="d-flex align-items-center">
                             <div 
                               className="me-15 h-50 w-30! l-h-60 rounded text-center d-flex align-items-center justify-content-center"
                               style={{
                                 background: bgColor,
                                 color: '#333',
                                 fontSize: '16px',
                                 fontWeight: 'bold'
                               }}
                             >
                               {clubInitials}
                             </div>
                             <div className="d-flex flex-column fw-500">
                               <a
                                 href="#"
                                 className="text-dark  hover-primary mb-1 fs-xs"
                               >
                                 {club.name}
                               </a>
                                <span className="text-fade text-[10px]">{getRegionName(club.region_id)}</span>
                             </div>
                           </div>
                           <a href="#">
                             <FaArrowRight className="fs-16" /> 
                           </a>
                         </div>
                       </div>
                     </div>
                   );
                 })
               ) : (
                 <div className="text-center py-8">
                   <div className="flex items-center justify-center">
                     <img className="w-[100%] mb-10" src={Images.empty} alt="empty" />
                   </div>                    
                   <p className="text-[#7D8489] text-xl">No clubs assigned yet</p>
                 </div>
               )}
             </div>

            {/* Calendar */}
            <div className="col-xl-4 col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">Upcoming Events Calendar</h4>
                </div>
                <div className="box-body">
                  {eventsLoading ? (
                    <div className="text-center py-8">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <Calendar 
                      fullscreen={false}
                      dateCellRender={dateCellRender}
                      onSelect={(date) => setSelectedDate(date.toDate())}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="col-xl-12 col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">Upcoming Events</h4>
                </div>
                <div className="box-body">
                  {eventsLoading ? (
                    <div className="text-center py-8">
                      <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : getUpcomingEvents().length > 0 ? (
                    <List
                      dataSource={getUpcomingEvents()}
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
                                onClick={() => event.meetingLink && window.open(event.meetingLink, '_blank')}
                                disabled={!event.meetingLink}
                              >
                                Join Meeting
                              </Button>
                              </div>
                            </div>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">No upcoming events at the moment.</p>
                      <p className="text-gray-400">Check back later for new events and meetings.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default DashboardIndex;
