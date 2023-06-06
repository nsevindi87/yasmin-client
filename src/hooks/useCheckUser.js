import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const useCheckUser = () => {

  const { user, isAuthenticated } = useAuth0();
  
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(user);

  const checkUser = async () => {
    if (isAuthenticated) {
      const remoteUser = await userService.getUser(user.email);
      if (remoteUser) {
        setCurrentUser({
          ...user,
          role:remoteUser.role,
          id:remoteUser.id
        })
      } else {
        console.log("ilk giris welcome git")
        navigate('/welcome');
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, [isAuthenticated]);

  return currentUser;
};

export default useCheckUser;
