import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import React from "react";

const HomeSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1.2}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="p-4 pr-0 text-black w-full"
    >
      <SwiperSlide>
        <HomeSlideInner
          title={"Youtube Channel"}
          description={"Learn from videos"}
          link={"https://www.youtube.com/@the_ratskingdom?feature=shared"}
          buttonText={"Subscribe"}/>
      </SwiperSlide>
      <SwiperSlide>
        <HomeSlideInner
          title={"Join Rats Kingdom"}
          description={"Home for Telegram OGs"}
          link={"https://t.me/The_RatsKingdom"}
          buttonText={"Join"}/>
      </SwiperSlide>
      <SwiperSlide>
        <HomeSlideInner
          title={"Follow X (twitter)"}
          description={"Stay updated with the latest news"}
          link={"https://x.com/The_RatsKingdom"}
          buttonText={"Follow"}/>
      </SwiperSlide>
      ...
    </Swiper>
  );
};

interface HomeSlideInnerProps {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

const HomeSlideInner: React.FC<HomeSlideInnerProps> = ({title, description, link, buttonText}) => {
  return (
    <div className="w-[90%] p-4 py-4 bg-[#1A1A1A] h-32 flex flex-col justify-between items-start rounded-3xl">
      <h1 className="font-bold text-[18px] leading-none text-white text-left">
        {title.toUpperCase()}
        <div className="text-sm">
          {description}
        </div>
      </h1>

      <button
        onClick={() => window.open(link, "_blank")}
        className="rounded-full p-2 px-4 bg-white text-black font-medium"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default HomeSlider;