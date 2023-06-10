import React from 'react';
import image from "../../Images/error.png"

const TextReview = () => {
  return (
    <div className='d-flex justify-content-center align-item-center'>
      <div className="col-6" style={{paddingTop:"5rem", paddingLeft:"1rem"}}>
          <img src={image} class="img-fluid" alt="Image" style={{width:"100rem",}}/>
        </div>
    </div>
  )
}

export default TextReview