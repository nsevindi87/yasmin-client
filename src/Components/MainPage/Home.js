import { useEffect, useContext } from 'react';
import image from "../../Images/contentImg.png"
import { useAuth0 } from '@auth0/auth0-react';

import { wordsContext } from "../../Context/wordsListContext.js";
import { UserContext } from '../../Context/UserContext.js';

const Home = () => {
  const { getWordsList, getAsideWordList} = useContext(wordsContext)
  const {profileInfo,getProfileInfo,getTodoList} = useContext(UserContext)
  const {isAuthenticated } = useAuth0();

  
    useEffect(() => {
      getProfileInfo()
      getWordsList(profileInfo?.id)
      getAsideWordList(profileInfo?.id)
    }, [isAuthenticated])
  return (
    <div>
      <div className="row h-100" >
        <div className="col-6 ps-5" style={{height:"100vh",paddingTop:"15rem", backgroundColor:"#5fafff"}} >
          <h1>Don't work hard </h1>
          <h1>work smart </h1>
          <p>“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.”
— Abraham Lincoln</p>

        <button type="button" className="btn btn-outline-dark px-5 py-2 bg-warning">Let's Start</button>  
        </div>
        <div className="col-6" style={{paddingTop:"5rem", paddingLeft:"1rem", backgroundColor:"#5fafff"}}>
          <img src={image} class="img-fluid" alt="Image" style={{width:"100rem",}}/>
        </div>
      </div>

    </div>
  )
}

export default Home