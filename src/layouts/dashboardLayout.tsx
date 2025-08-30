import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaHome, FaLock, FaSignOutAlt, FaUserGraduate, FaUserTie, FaList, FaCoins, FaUser, FaCog, FaUsers, FaCalendar } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import Images from '@/components/images';
import { useOnboardingStore } from '@/global/store';
import { useLeadershipStore } from '@/global/leadershipStore';
import { FaMessage } from 'react-icons/fa6';
import { Modal } from 'antd';

const DashboardLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { userName: generalUserName } = useOnboardingStore();
  const { userName: leadershipUserName } = useLeadershipStore();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    useOnboardingStore.persist.clearStorage();
    useLeadershipStore.persist.clearStorage();
    navigate("/onboarding", { replace: true });
    setShowLogoutModal(false);
    window.location.reload();
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Determine if we'sre in admin, student, or leadership route
  const isAdminRoute = pathname.includes('/admin');
  const isStudentRoute = pathname.includes('/students');
  const isLeadershipRoute = pathname.includes('/leadership');
  
  const adminNavData = [
    { id: 1, name: "Dashboard", icon: <FaHome />, URL: "dashboard" },
    { id: 2, name: "Students", icon: <FaUserGraduate />, URL: "students" },
    { id: 2, name: "Waitlist", icon: <FaUserGraduate />, URL: "waitlist" },
    { id: 3, name: "Leadership", icon: <FaUserTie />, URL: "leaderships" },
    { id: 4, name: "Regional Club", icon: <FaList />, URL: "regional-clubs" },
    { id: 4, name: "Clubs", icon: <FaList />, URL: "clubs" },
    { id: 5, name: "Bridge Points", icon: <FaCoins />, URL: "bridge-points" },
    { id: 6, name: "Profile", icon: <FaUser />, URL: "profile" },
  ];

  const studentNavData = [
    { id: 1, name: "Dashboard", icon: <FaHome />, URL: "dashboard" },
    { id: 2, name: "Meetings", icon: <FaCalendar />, URL: "meetings" },
    { id: 3, name: "Calendar", icon: <FaCalendar />, URL: "calendar" },
    { id: 4, name: "Notices", icon: <FaBell />, URL: "notices" },
    { id: 3, name: "Clubs", icon: <FaUsers />, URL: "clubs" },
    { id: 3, name: "Chat", icon: <FaMessage />, URL: "chat" },
    { id: 4, name: "Points", icon: <FaCoins />, URL: "points" },
    { id: 5, name: "Profile", icon: <FaUser />, URL: "profile" },
  ];

  const leadershipNavData = [
    { id: 1, name: "Dashboard", icon: <FaHome />, URL: "dashboard" },
    { id: 2, name: "Meetings", icon: <FaCalendar />, URL: "meetings" },
    { id: 3, name: "Calendar", icon: <FaCalendar />, URL: "calendar" },
    { id: 4, name: "Notices", icon: <FaBell />, URL: "notices" },
    { id: 5, name: "Clubs", icon: <FaUsers />, URL: "clubs" },
    { id: 6, name: "Chat", icon: <FaMessage />, URL: "chat" },
    { id: 7, name: "Points", icon: <FaCoins />, URL: "points" },
    { id: 8, name: "Profile", icon: <FaUser />, URL: "profile" },
  ];

  // Use appropriate navigation data based on route
  const navData = isAdminRoute ? adminNavData : isStudentRoute ? studentNavData : isLeadershipRoute ? leadershipNavData : studentNavData;
  const basePath = isAdminRoute ? "/admin" : isStudentRoute ? "/students" : isLeadershipRoute ? "/leadership" : "/students";
  const fallbackName = isAdminRoute ? 'Admin' : isLeadershipRoute ? 'Leader' : 'Michele';
  const selectedUserName = isLeadershipRoute ? leadershipUserName : generalUserName;
  const greetingName = selectedUserName && selectedUserName.trim().length > 0 ? selectedUserName : fallbackName;
  const greeting = `Hello ${greetingName} 👋`;

  const siderBarView = true; 
  const handleStart = pathname.split("/")[1] === "" ? true : false;

  
  return (
    <div className="wrapper min-h-screen">
      <header className="main-header border-b border-gray-200 bg-[#f24848] fixed! w-full">
        <div className="d-flex align-items-center  bg-[#f24848]! logo-box justify-content-start fixed">        
          <Link to="/" className="logo flex! items-center justify-center">
            {/* logo*/}
            <div className="logo-lg">
              <span className="light-logo">
                  <img src={Images.logo} className="w-[180px] mt-[30px] sm:mt-[0px]" alt="logo" />
              </span>              
            </div>
          </Link>
        </div>
        {/* Header Navbar */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            <i  className="ti-menu d-block d-md-none text-white"></i>
          </div>
          <div className='flex position-absolute'>
            <div className="text-[#fff] text-2xl font-semibold d-none d-lg-flex">
              {greeting}
            </div>
          </div>
          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              <li className="btn-group d-lg-inline-flex d-none">
                <div className="app-menu">
                  <div className="search-bx mx-5">
                    <form>
                      <div className="input-group">
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn" type="submit" id="button-addon3">
                            <i className="ti-search" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
              {/* Notifications */}
              <li className="dropdown notifications-menu">
                <Link
                  to="#"
                  className="waves-effect waves-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                  title="Notifications"
                >
                  <FaBell className='text-[#5A5959]' />
                </Link>
                <ul className="dropdown-menu animated bounceIn">
                  <li className="header">
                    <div className="p-20">
                      <div className="flexbox">
                        <div>
                          <h4 className="mb-0 mt-0">Notifications</h4>
                        </div>
                        <div>
                          <Link to="#" className="text-danger">
                            Clear All
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    {/* inner menu: contains the actual data */}
                    <ul className="menu sm-scrol">
                      <li>
                        <Link to="#">
                          <i className="fa fa-users text-info" /> Curabitur id eros
                          quis nunc suscipit blandit.
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-warning text-warning" /> Duis
                          malesuada justo eu sapien elementum, in semper diam
                          posuere.
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-user text-success" /> Nullam euismod
                          dolor ut quam interdum, at scelerisque ipsum imperdiet.
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <Link to="#">View all</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside
        className="main-sidebar border-r border-gray-200 !fixed bg-[#f24848]"
        style={{
          top: 0,
          left: 0,
          height: '80vh',
          width: '260px',
          zIndex: 50,
          // On large screens, always show sidebar. On small screens, slide in/out.
          transform: typeof window !== 'undefined' && window.innerWidth < 768
            ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-270px)')
            : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
          {/* sidebar*/}
          <section className="sidebar position-relative">
            <div className="multinav">
              <div className="multinav-scroll" style={{ height: "100%" }}>
                {/* sidebar menu*/}
                <ul className="sidebar-menu" data-widget="tree">
                  {navData.map((item, index) => (
                    <li className="treeview" key={item.id}>
                      <NavLink
                        to={`${basePath}/${item.URL}`}
                        onClick={() => setIsSidebarOpen(false)}
                        children={({ isActive }) => (
                          <div
                            className={`
                              ${index === 0 && handleStart ? "text-[#F9607F] bg-[#f6e8eb]" : ""}
                              flex items-center font-[400] transition-all duration-300 py-3 px-2 my-0 overflow-hidden capitalize 
                              ${siderBarView ? `${handleStart && "px-2 mx-2 rounded-xl transition-all duration-500"}` : "rounded-full w-10 h-10 flex justify-center items-center pl-2"}
                              ${
                                isActive
                                  ? "text-[#F9607F] bg-[#f6e8eb]  rounded-xl"
                                  : "hover:bg-[#eef2ff] text-[#fff] hover:text-[#7D8489]"
                              }
                            `}
                          >
                            <span className="mr-3 text-xl">{item.icon}</span>
                            {siderBarView  && <span className='text-lg'>{item.name}</span>}
                          </div>
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <div className="sidebar-footer">
            <Link
              to="#"
              className="link"
              data-bs-toggle="tooltip"
              title="Settings"
            >
              <FaCog />
            </Link>
            <Link
              to="#"
              className="link"
              data-bs-toggle="tooltip"
              title="Settings"
            >
              <FaLock />
            </Link>
            <Link
              to="#"
              className="link"
              data-bs-toggle="tooltip"
              title="Logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </Link>
          </div>
        </aside>
      <Modal
        title="Confirm Logout"
        open={showLogoutModal}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
      <div className="content-wrapper mt-25!">
        <div className="container-full p-15">
          <Outlet />
        </div>
      </div>

      {/* <footer className="main-footer">
        <div className="pull-right d-none d-sm-inline-block">
          <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                FAQ
              </Link>
            </li>            
          </ul>
        </div>
        © 2024 <Link to="#">Leadership</Link>.
        All Rights Reserved.
      </footer> */}
    </div>
  );
};

export default DashboardLayout;