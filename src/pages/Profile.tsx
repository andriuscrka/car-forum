import '../scss/profile.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAge } from '../utils';
import MainLayout from '../layouts/MainLayout';
import { getProfile } from '../store/slices/auth/authSlice';
import { useAppContext } from '../App';

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const {dispatch, authState,  user} = useAppContext();
  const {userId} = useParams();
  
  const {_id, name} = user || {};
  const {status, error} = authState;

  useEffect(() => {
    dispatch(getProfile(userId)).then((response) => {
      if(response.payload.success){
        setProfile(response.payload.data);
      }
    });
  }, [dispatch, userId]);

  return (
    <MainLayout>
      <div className='d-flex justify-content-center mt-5'>
        <div className='profile-container'>
          <div className='left-card'>
            <div className='profile-picture'/>
            <div className='profile-name mt-3'>
              <span>{profile?.name}, </span>
              <span>{getAge(profile?.birthday)} years old</span>
            </div>
            <h3>Member since: {new Date(profile?.createdAt).toLocaleDateString('en-GB')}</h3>
          </div>
          <div className='right-card'>
            <div className='mb-5'>
              <h3>Cars:</h3>
              {profile && profile.cars.length === 0 && <p>No cars added</p>}
              <ul>
                {profile?.cars.map((car: any) => (
                  <li key={car._id}>{car.description}</li>
                )) }
              </ul>
            </div>
            <h3>Description:</h3>
            <p>{profile?.description || 'No description given'}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;