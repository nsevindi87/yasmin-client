import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import Login from './Login';
import Logout from './Logout';

const Main = () => {

    const {isAuthenticated} = useAuth0()
  return (
    <div>
        {isAuthenticated ? 
        <div><Profile/><Logout/></div> : <Login/>
        }
    </div>
  )
}

export default Main