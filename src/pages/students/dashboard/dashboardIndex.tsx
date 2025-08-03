import { useOnboardingStore } from "@/global/store";
import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Button, Calendar, Badge, List } from 'antd';
import { FaArrowRight } from "react-icons/fa";

// Mock student data - in real app, this would come from API
const mockStudentData = {
  fullName: 'Oscar Adetona',
  age: 15,
  guardianEmail: 'oscar.guardian@email.com',
  pronouns: 'He/Him',
  country: 'Nigeria',
  homeschoolStatus: 'homeschooled',
  region: 'afro-euro',
  dateJoined: 'Thur, 14/08/24 2:30pm',
  clubs: ['code_for_change', 'poetry_prose', 'mun', 'entrepreneurship_innovation'],
  experience: '3 years',
  expectations: 'I hope to gain new friends and learn coding skills while socializing with like-minded peers.',
  accessibilityNeeds: 'No',
  participationNeeds: 'No',
  avatar: null
};

// Club mapping for display
const clubLabels: { [key: string]: string } = {
  'code_for_change': 'Code for Change',
  'women_in_stem': 'Women in STEM Circle',
  'space_astronomy': 'Space & Astronomy Club',
  'health_bioethics': 'Health & Bioethics Circle',
  'crochet_fiber_arts': 'Crochet & Fiber Arts Club',
  'poetry_prose': 'Poetry & Prose Circle',
  'visual_art_illustration': 'Visual Art & Illustration Club',
  'music_production': 'Music Production & Performance Club',
  'culinary_cultures': 'Culinary Cultures Club',
  'language_exchange': 'Language Exchange & Linguistics Club',
  'story_circles': 'Story Circles',
  'mun': 'Model United Nations (MUN)',
  'debate_public_speaking': 'Debate & Public Speaking Club',
  'journalism_oped': 'Journalism & Op-Ed Writing Club',
  'human_rights_advocacy': 'Human Rights & Advocacy Club',
  'entrepreneurship_innovation': 'Entrepreneurship & Innovation Club',
  'finance_investing': 'Finance & Investing for Teens',
  'study_skills_productivity': 'Study Skills & Productivity Circle'
};

const clubCategories: { [key: string]: string } = {
  'code_for_change': 'STEM-Focused',
  'women_in_stem': 'STEM-Focused',
  'space_astronomy': 'STEM-Focused',
  'health_bioethics': 'STEM-Focused',
  'crochet_fiber_arts': 'Creative & Cultural',
  'poetry_prose': 'Creative & Cultural',
  'visual_art_illustration': 'Creative & Cultural',
  'music_production': 'Creative & Cultural',
  'culinary_cultures': 'Creative & Cultural',
  'language_exchange': 'Creative & Cultural',
  'story_circles': 'Civic & Intellectual',
  'mun': 'Civic & Intellectual',
  'debate_public_speaking': 'Civic & Intellectual',
  'journalism_oped': 'Civic & Intellectual',
  'human_rights_advocacy': 'Civic & Intellectual',
  'entrepreneurship_innovation': 'Innovation & Life Skills',
  'finance_investing': 'Innovation & Life Skills',
  'study_skills_productivity': 'Innovation & Life Skills'
};

// Mock notice board data
const noticeBoardData = [
  {
    id: 1,
    title: 'New Club Meeting Schedule',
    content: 'Code for Change club will now meet every Saturday at 2 PM. All members are encouraged to attend.',
    author: 'Code for Change Club',
    time: 'Just Now',
    type: 'club-update',
  },
  {
    id: 2,
    title: 'Poetry Workshop This Weekend',
    content: 'Join us for a special poetry workshop with guest speaker Sarah Johnson. Learn new writing techniques!',
    author: 'Poetry & Prose Circle',
    time: '2 hours ago',
    type: 'event',
  },
  {
    id: 3,
    title: 'MUN Conference Registration Open',
    content: 'Registration for the upcoming Model United Nations conference is now open. Limited spots available.',
    author: 'Model United Nations',
    time: '1 day ago',
    type: 'conference',
  },
  {
    id: 4,
    title: 'Entrepreneurship Challenge',
    content: 'Submit your business ideas for the annual entrepreneurship challenge. Prizes worth $500!',
    author: 'Entrepreneurship & Innovation Club',
    time: '3 days ago',
    type: 'competition',
  }
];

// Mock upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Code for Change Weekly Meeting',
    club: 'Code for Change',
    date: '2024-08-17',
    time: '14:00 - 15:30',
    type: 'weekly-meeting',
    meetingLink: 'https://zoom.us/j/123456789',
    description: 'Weekly coding session focusing on web development basics'
  },
  {
    id: 2,
    title: 'Poetry Workshop with Guest Speaker',
    club: 'Poetry & Prose Circle',
    date: '2024-08-18',
    time: '16:00 - 17:30',
    type: 'workshop',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    description: 'Special workshop with published poet Sarah Johnson'
  }  
];

const DashboardIndex: React.FC = () => {
  const { pathname } = useLocation();
  const { setNavPath } = useOnboardingStore();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  console.log(selectedDate);

  useEffect(() => {
    setNavPath(pathname.replace("/overview", "dashboard"));
  }, []);

  const getListData = (value: any) => {
    const date = value.format('YYYY-MM-DD');
    return upcomingEvents.filter(event => event.date === date);
  };

  const dateCellRender = (value: any) => {
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
                <div className="box-body d-flex px-0">
                  <div
                    className="p-30 flex-grow-1 bg-img dask-bg bg-none-md"
                    style={{
                      backgroundPosition: "right bottom",
                      backgroundSize: "auto 100%",
                      backgroundImage: "url(../images/svg-icon/color-svg/custom-1.svg)"
                    }}
                  >
                    <div className="row">
                      <div className="col-12 col-xl-7">
                        <h2 className="text-white">
                          Welcome back, <strong>{mockStudentData.fullName}!</strong>
                        </h2>
                        <p className="text-white my-10 fs-16">
                          You have <strong className="text-white">{mockStudentData.clubs.length} clubs</strong> and{" "}
                          <strong className="text-white">{upcomingEvents.length} upcoming events</strong>.
                        </p>
                        <p className="text-dark my-10 fs-16">
                          Your progress is <strong className="text-warning">excellent!</strong>
                        </p>
                      </div>
                      <div className="col-12 col-xl-5" />
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
                  <div className="media-list media-list-hover" style={{ height: '390px', overflowY: 'auto' }}>
                    {noticeBoardData.map((notice) => (
                      <div key={notice.id} className="media bar-0">                        
                        <div className="media-body fw-500">
                          <p className="d-flex align-items-center justify-content-between">
                            <a className="hover-success" href="#">
                              <strong>{notice.title}</strong>
                            </a>
                            <span className="text-fade fw-500 fs-12">{notice.time}</span>
                          </p>
                          <p className="text-fade">
                            {notice.content}
                          </p>
                          <small className="">- {notice.author}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="box-footer text-center p-10">
                  <a href="#" className="btn w-p100 btn-primary-light p-5">
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
              {mockStudentData.clubs.map((club, index) => {
                // Generate initials from club name - just first 2 letters
                const clubInitials = clubLabels[club].split(' ').map(word => word.charAt(0)).join('').substring(0, 2);
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
                  <div key={index} className="box mb-15 pull-up">
                    <div className="box-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div 
                            className="me-15 h-50 w-50 l-h-60 rounded text-center d-flex align-items-center justify-content-center"
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
                              className="text-dark hover-primary mb-1 fs-16"
                            >
                              {clubLabels[club]}
                            </a>
                            <span className="text-fade">{clubCategories[club]}</span>
                          </div>
                        </div>
                        <a href="#">
                          <FaArrowRight className="fs-16" /> 
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar */}
            <div className="col-xl-4 col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">Upcoming Events Calendar</h4>
                </div>
                <div className="box-body">
                  <Calendar 
                    fullscreen={false}
                    dateCellRender={dateCellRender}
                    onSelect={(date) => setSelectedDate(date.toDate())}
                  />
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
                  <List
                    dataSource={upcomingEvents}
                    renderItem={(event) => (
                      <List.Item>
                        <div className="d-flex align-items-center justify-content-between w-full">
                          <div className="flex  mb-2">
                            <div>
                              <h5 className="font-semibold! mb-1">{event.title}</h5>
                              <p className=" mb-1">{event.club}</p>                            
                              <p className="text-md">{event.description}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-left">
                              <p className="text-md ">
                                {new Date(event.date).toLocaleDateString()} • {event.time}
                              </p>
                          </div>
                          
                          <div className="flex flex-column">
                           
                            <Button 
                              type="primary" 
                              size="small"
                              onClick={() => window.open(event.meetingLink, '_blank')}
                            >
                              Join Meeting
                            </Button>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default DashboardIndex;
