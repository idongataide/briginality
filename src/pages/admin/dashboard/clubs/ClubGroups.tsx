import React from 'react';
import { useParams } from 'react-router-dom';
import { useClubsByRegion } from '@/hooks/useAdmin';
const ClubGroups: React.FC = () => {
  const { region_id } = useParams();
  const { data: clubsRegion } = useClubsByRegion(region_id || '');

 
  return (
    <div className="container-fluid">
     <div className="row">
        <div className="col-12">
          <div className="box">
            <div className="box-header">
              <h4 className="box-title">All Clubs by Region</h4>
            </div>
            <div className="box-body">
              {clubsRegion?.data?.map((category: any) => (
                <div key={category.id} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="text-black font-medium! m-0">{category.name}</h5>
                    <span className="badge bg-primary">{category.clubs?.length || 0} clubs</span>
                  </div>
                  <div className="row">
                    {category.clubs?.map((club: any) => (
                      <div key={club.id} className="col-xl-6 col-lg-12 col-12 mb-3">
                        <div className="box mb-15 cursor-pointer">
                          <div className="box-body">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <div className="me-15 bg-primary-light h-50 w-50 l-h-40 rounded text-center">
                                    <span className="fs-26 font-bold">{club.name.charAt(0)}</span>
                                </div>
                                <div className="d-flex flex-column fw-500">
                                  <span className="text-dark mb-1 fs-16">
                                    {club.name}
                                  </span>
                                  <span className="text-[#3898CB]">{category.name}</span>
                                </div>
                              </div>
                              <div className="d-none d-md-block">
                                <span className="badge bg-success">Active</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-muted small mb-0">{club.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubGroups;
