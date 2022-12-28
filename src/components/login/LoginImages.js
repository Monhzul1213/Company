import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import office  from '../../assets/office.jpg';

export default function LoginImages(){
 

  return (
    <div>
      <div className='login_image_container'>
        <img src={office} alt='image_login' className='login_image' />
      </div>
    </div>
  )
} 