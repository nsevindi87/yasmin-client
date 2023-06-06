import React, { useContext, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../../Context/UserContext';


const Profile = () => {
  const {profileInfo,getProfileInfo} = useContext(UserContext)

  const { user, isAuthenticated, isLoading } = useAuth0();


  useEffect(() => {
    getProfileInfo()
  }, [isAuthenticated])

  if (isLoading) {
    return <div>Page is loading...</div>

  }


  return (
    <div>
      {isAuthenticated &&
        <div>
          <img src={user?.picture} alt="user_picture" />
          <h1>{profileInfo?.firstName}</h1>
          <h1>{profileInfo?.id}</h1>
          <h1>{user?.email}</h1>
        </div>
      }
    </div>
  )
}

export default Profile