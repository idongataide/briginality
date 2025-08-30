import React from 'react';
import { useApplicants, useRoleApplications, useWaitlist } from '@/hooks/useAdmin';
import { useClubs } from '@/hooks/useEnums';
import { 
  FaUsers, 
  FaUserTie, 
  FaClock, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const DashboardStats = () => {
  const { data: students = [] } = useApplicants();
  const { data: leaders = [] } = useRoleApplications();
  const { data: waitlist = [] } = useWaitlist();
  const { data: regionClubs = [] } = useClubs();

  const stats = [
    {
      title: 'New Users',
      value: students.length,
      icon: <FaUsers className="text-[#1883F7] !text-[24px]" />,
      bgColor: 'bg-[#EAF6FF]',
      textPosition: '',
    },
    {
      title: 'Club Leaders',
      value: leaders.length,
      icon: <FaUserTie className="text-[#36AA39] !text-[24px]" />,
      bgColor: 'bg-[#EBF8EC]',
      textPosition: 'text-end',
    },
    {
      title: 'Waitlist',
      value: waitlist.length,
      icon: <FaClock className="text-[#F0003C] !text-[24px]" />,
      bgColor: 'bg-[#FEE6EC]',
      textPosition: 'text-end',
    },
    {
      title: 'Region Clubs',
      value: regionClubs?.data?.length || 0,
      icon: <FaMapMarkerAlt className="text-[#475467] !text-[24px]" />,
      bgColor: 'bg-[#D9D9D9]',
      textPosition: 'text-end',
    }
  ];

  return (
    <div className="row">
      {stats.map((stat, index) => (
        <div key={index} className="col-xl-3 col-12">
          <div className="info-box !flex items-center ">
            <div className={`w-50 h-50 p-10 flex items-center justify-center ${stat.bgColor}  rounded-full `}>
              {stat.icon}
            </div>

            <div className={`info-box-content !ms-auto ${stat.textPosition}`}>
              <span className="text-[#475467] font-[600] text-[22px]">
                {stat.value}
              </span>
              <span className="info-box-text text-[#667085]">{stat.title}</span>
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        /* /.col */
      ))}
    </div>
  );
};

export default DashboardStats;