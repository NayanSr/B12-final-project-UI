import { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const data = use(reviewsPromise);
  console.log(data);
  return (
    <div className="text-center">
      <div>
        <h3 className="text-4xl font-semibold">
          What our customers are sayings
        </h3>
        <p className="my-4">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <div>
        <Swiper
        loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}

          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            scale:0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay:2000, disableOnInteraction:false
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {data.map((rev, index) => (
            <SwiperSlide key={index}>
              <ReviewCard rev={rev} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
