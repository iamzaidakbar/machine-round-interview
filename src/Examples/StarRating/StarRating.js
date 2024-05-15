import React, { useState } from 'react'
import "./StarRating.scss"

import { IoMdStar } from "react-icons/io";

const StarRating = () => {
  const [star, setStars] = useState([
    { id: 1, isChecked: false, isHovered: false },
    { id: 2, isChecked: false, isHovered: false },
    { id: 3, isChecked: false, isHovered: false },
    { id: 4, isChecked: false, isHovered: false },
    { id: 5, isChecked: false, isHovered: false },
  ])

  const unCheckAllStars = () => {
    setStars(prevStars => prevStars.map(star => ({ ...star, isChecked: false })))
  }

  const handleStarClick = (starId) => {
    unCheckAllStars()
    setStars(prevStars => prevStars.map(star => star.id <= starId ? { ...star, isChecked: true } : star))
  }

  const handleMouseEnter = (starId) => {
    setStars(prevStars => prevStars.map(star => star.id <= starId ? { ...star, isHovered: true } : star))
  }


  const handleMouseLeave = (starId) => {
    setStars(prevStars => prevStars.map(star => star.id <= starId ? { ...star, isHovered: false } : star))
  }



  return (
    <div className='StarRating'>
      <div className='star-wrapper'>
        {star && star.map(star => <IoMdStar onMouseEnter={() => { handleMouseEnter(star.id) }} onMouseLeave={() => { handleMouseLeave(star.id) }} onClick={() => { handleStarClick(star.id) }} key={star.id} size='40px' style={{ marginRight: '12px', cursor: 'pointer' }} color={(star.isChecked || star.isHovered) ? 'yellow' : 'black'} />)}
      </div>
    </div>
  )
}

export default StarRating