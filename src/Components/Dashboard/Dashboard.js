import React, { useEffect, useState } from 'react'
import "./Dashboard.scss"
import getImages from '../../utils/getImages';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [imagesData, setImagesData] = useState(null)

  const handleOnChange = (e) => {
    setQuery(e.target.value)
  }

  const searchImages = async (e) => {
    e.preventDefault()

    const images = await getImages(query)
    setImagesData(images?.data?.hits)
  }

  const fetchDataOnStart = async () => {
    const images = await getImages('flowers')
    setImagesData(images?.data?.hits)
    console.log(imagesData)
  }

  useEffect(() => {
    fetchDataOnStart()
  }, [])

  
  return (
    <div className='dashboard'>
      <form onSubmit={searchImages}>
        <input type='search' name="Search" placeholder='Search...' onChange={handleOnChange} />
        <button type='Submit'>Search</button>
      </form>

      <div className='images-container'>
        {imagesData && imagesData?.map(image => <div key={image?.id} className='image'>
          <img alt='Image' src={image?.largeImageURL} loading='lazy' />
        </div>)}
      </div>
    </div>
  )
}

export default Dashboard