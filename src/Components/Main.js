import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import HeaderLoggedin from "./Header-Footer/Header-loggedin.js"
import HeaderLoggedout from "./Header-Footer/Header-loggedout.js"

const Main = () => {

    const {isAuthenticated} = useAuth0()
  return (
    <div>
        {isAuthenticated ? 
        <div>
            <HeaderLoggedin/>
            <Profile/>
        </div> : 
        <div>
            <HeaderLoggedout/>
        </div>
        }
    </div>
  )
}

export default Main