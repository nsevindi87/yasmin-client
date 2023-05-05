import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {

    const { user, isAuthenticated, isLoading}=useAuth0();

if(isLoading){
    return <div>Page is loading...</div>

}

  return (
    <div>
        {isAuthenticated && 
        <div>
            <img src={user?.picture} alt="user_picture"/>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
            <h1>{user?.locale}</h1>
        </div>
        }
    </div>
  )
}

export default Profile