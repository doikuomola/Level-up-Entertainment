// @ts-nocheck
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../Config/Config';
import './Carousel.css'



const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([])

  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        // @ts-ignore
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        // @ts-ignore
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));


  // @ts-ignore
  const fetchCredits = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setCredits(data.cast);
  }

  useEffect(() => {
    // @ts-ignore
    fetchCredits();
    // eslint-disable-next-line
  }, []);


  const responsive = {
    0: { items: 3 },
    568: { items: 5 },
    1024: { items: 7 },
  };

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  )

}



export default Gallery