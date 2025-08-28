import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegions } from '@/hooks/useEnums';
import { useRegionClubs } from '@/hooks/useAdmin';
import { Button } from 'antd';
import { FaPlus } from 'react-icons/fa';
import AddRegionalClubModal from '@/components/AddRegionalClubModal';

const RegionalClubs: React.FC = () => {
  const { data: regions, isLoading: regionsLoading } = useRegions();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const { data: clubs, isLoading: clubsLoading, mutate } = useRegionClubs(selectedRegionId || '1');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(clubs,'clubs')

  if (regionsLoading || clubsLoading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box-body text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid">
      {/* Regions Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="box">
            <div className="box-header flex! justify-between items-center">
              <h4 className="box-title">Regions Overview</h4>
              <Button 
                className='bg-primary text-white! font-bold' 
                onClick={() => setModalVisible(true)}
              > 
                <FaPlus/> Add Club
              </Button>
            </div>
            <div className="box-body">
              <div className="row">
                 {regions?.data?.map((region: any, index: number) => {
                   const colors = [
                     'bg-primary text-white',
                     'bg-info text-white',
                     'bg-success text-white'
                   ];
                   const colorClass = colors[index % colors.length];
                   const isSelected = selectedRegionId === region?.id;
                   
                   return (
                   <div key={region?.id} className="col-xl-4 col-md-6 col-12 mb-3 ">
                     <div 
                       className={`box box-body min-h-[180px] ${colorClass} hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isSelected ? 'ring-4 ring-yellow-400' : ''}`}
                       onClick={() => setSelectedRegionId(region.id)}
                     >
                      <div className='d-flex align-items-center justify-content-between'>
                         <div className='w-full lg:w-4/5'>
                           <span className="text-white text-2xl font-bold">{region?.name}</span>
                         </div>                        
                       </div>
                       <div className="text-white text-sm opacity-90 mt-3">
                           {region?.description}                           
                       </div>
                       <div className='flex align-center mt-2 justify-end'>
                              <span className="float-end bg-white px-2 text-dark fs-12 py-1 font-medium bg-opacity-20 rounded-3xl">
                                   View Clubs                                
                              </span>

                              <span className="float-end bg-white px-2   fs-12 py-1 font-medium bg-opacity-20 ml-2 rounded-3xl">
                                  <Link className='text-dark' to={`/admin/regions/${region.id}/members`}>
                                View Members
                              </Link>
                            </span>
                        </div>
                     </div>
                   </div>
                 );
               })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="box">
            <div className="box-header flex! items-center justify-between">
              <h4 className="box-title ">
                {selectedRegionId 
                  ? `Clubs for ${regions?.data?.find((r: any) => r.id === selectedRegionId)?.name || 'Selected Region'}`
                  : 'All Clubs by Region'
                }
              </h4>
              {selectedRegionId && (
                <button 
                  className="btn ms-auto btn-sm text-white bg-primary"
                  onClick={() => setSelectedRegionId(null)}
                >
                  Show All Regions
                </button>
              )}
            </div>
            <div className="box-body">
              <div className="row">
                {clubs?.map((item: any) => (
                  <div key={item.id} className="col-xl-6 col-lg-12 col-12 mb-3">
                    <div className="box mb-15 cursor-pointer">
                      <div className="box-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="me-15 bg-primary-light h-50 w-50 l-h-40 rounded text-center">
                              <span className="fs-26 font-bold">{(item?.club?.name || item?.name || '').charAt(0)}</span>
                            </div>
                            <div className="d-flex flex-column fw-500">
                              <span className="text-dark mb-1 fs-16">{item?.club?.name || item?.name}</span>
                              {item?.club?.category && (
                                <span className="text-[#3898CB]">{item?.club?.category}</span>
                              )}
                            </div>
                          </div>
                          <div className="d-none d-md-block">
                            <span className="badge bg-success">{item?.open_status || 'Active'}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-muted small mb-1"><b>President:</b> {item?.club_president || 'N/A'}</p>
                          <p className="text-muted small mb-0"><b>Vice President:</b> {item?.club_vice || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>

      <AddRegionalClubModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          mutate(); // Refresh the clubs data
        }}
      />
    </>
  );
};

export default RegionalClubs;
