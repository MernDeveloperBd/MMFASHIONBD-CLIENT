
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import image1 from '../../images/carousel1.jpg'
import image2 from '../../images/carousel2.jpg'
import image3 from '../../images/carousel3.jpg'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slider from "./Slider";

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slider text={<h1>Buy your  <span className="text-blue-400">Own</span>{" "}
              Choise</h1>} image={image1}></Slider>
        </SwiperSlide>
        <SwiperSlide>
          <Slider text={<h1>Buy your  <span className="text-blue-400">Own</span>{" "}
              Choise</h1>} image={image2}></Slider>
        </SwiperSlide>
        <SwiperSlide>
          <Slider text={<h1>Buy your  <span className="text-blue-400">Own</span>{" "}
              Choise</h1>} image={image3}></Slider>
        </SwiperSlide>
       
        
      </Swiper>
    </>
  );
}
