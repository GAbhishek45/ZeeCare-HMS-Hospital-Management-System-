import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className = "hero container" >
           <div className="banner">
           <h1>{title}</h1>
            <p>Introducing Zeecare Healthcare, a visionary leader in revolutionizing healthcare solutions. With an unwavering commitment to innovation and patient-centric care, Zeecare Healthcare is at the forefront of transforming the healthcare landscape. Our state-of-the-art facilities boast cutting-edge technology, seamlessly integrated with compassionate and expert medical professionals.
            </p>
           </div>
           <div className = "banner">
                <img src={imageUrl} alt="Hero" className="animated-image" />
                <span>
                    <img src="/Vector.png" alt="Vector" />
                </span>
           </div>
    </div>
   
  )
}

export default Hero