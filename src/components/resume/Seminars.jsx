import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { sample, sample1, sample2, sample3 } from '../../assets';
import BannerTitle from '../layouts/BannerTitle';

const Seminars = () => {
  const [swiperRef, setSwiperRef] = useState(null);



  return (
    <>
    <BannerTitle 
    title="Seminars"/>
      <div className="w-full h-auto bg-slate-950 " >
        <div className="block bg-white">

        </div>


        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={6}
          centeredSlides={true}
          spaceBetween={25}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className=""
        >
          
          <SwiperSlide><img src={sample} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample1} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample2} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample3} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample1} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample2} alt="" /></SwiperSlide>
          <SwiperSlide><img src={sample3} alt="" /></SwiperSlide>
        </Swiper>

      </div>



    </>
  );
}

export default Seminars
