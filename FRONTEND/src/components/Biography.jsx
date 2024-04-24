import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className=" container biography">
        <div className="banner">
            <img src={imageUrl} alt="AboutImg" />
        </div>
        <div className="banner">
            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>In the chronicles of human history, few endeavors have been as paramount to the welfare of societies as the pursuit of healthcare. At its core, healthcare embodies the relentless dedication of individuals and institutions to safeguard and enhance the well-being of humanity. From ancient healing practices to modern medical marvels, the story of healthcare is a testament to human ingenuity, compassion, and resilience.</p>
            <p>At its essence, healthcare is not merely a profession or an industry but a vocation imbued with profound significance</p>
            <p>In the annals of history, the story of healthcare stands as a testament to the indomitable spirit of humanity, forging a path toward a brighter, healthier tomorrow.</p>
            
            <p>Technological advancements have heralded groundbreaking innovations, enabling healthcare professionals to diagnose diseases with unparalleled precision, perform intricate surgical procedures, and develop life-saving therapies.</p>
        </div>
    </div>
  )
}

export default Biography