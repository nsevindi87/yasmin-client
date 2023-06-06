import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState,useEffect } from "react";
import { initializeHttpService } from "../services/httpService.js";
import useCheckUser from "../hooks/useCheckUser.js";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0();
    initializeHttpService(getAccessTokenSilently, "http://localhost:3302");

    let user2 = useCheckUser();
    console.log(user2)




    const { user } = useAuth0();
    const [profileInfo, setProfileInfo] = useState([])
  
 const getProfileInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3302/users/profile/${user.email}`);
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            console.log(data)

            setProfileInfo(data)
            return data
        } catch (error) {
            console.error(error);
            setProfileInfo(null)
            throw new Error("Failed to fetch posts")
        }
    };

    return (
        <UserContext.Provider value={{ profileInfo,getProfileInfo,user2 }}>
            {children}
        </UserContext.Provider>
    )
}