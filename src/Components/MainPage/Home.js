import React from 'react'
import image from "../../Images/contentImg.png"

const Home = () => {
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