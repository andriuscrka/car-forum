import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAge } from '../utils';
import MainLayout from '../layouts/MainLayout';
import { getProfile } from '../store/slices/auth/authSlice';
import { RootState } from '../store/store';

const Profile = () => {

  const {userId} = useParams();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  
  const {status, error} = useSelector((state: RootState) => state.auth);
  const {_id, name} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : { _id: null, name: null };
    
  useEffect(() => {
    //@ts-expect-error dapasholnachuitypescriptasjibanas
    dispatch(getProfile(userId)).then((response) => {
      setProfile(response.payload.data);
    });
  }, []);

  return (
    <MainLayout>
      <div className='d-flex justify-content-center mt-5'>
        <div style={{width: '1000px', minHeight: '500px', backgroundColor: 'whitesmoke'}}>
          <h1>Profile</h1>
          <div>
            <h3>{profile?.name}</h3>
            <h3>{getAge(profile?.birthday)} years old</h3>
          </div>
          <div>
            <h3>Member since: {new Date(profile?.createdAt).toLocaleDateString('en-GB')}</h3>
          </div>
          <div>
            <h3>Cars:</h3>
            <ul>
              {profile?.cars.map((car: any) => (
                <li key={car._id}>{car.description}</li>
              ))}
            </ul>
            <h3>Description:</h3>
            <p>{profile?.description || 'No description given'}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;