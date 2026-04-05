
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { IoMdArrowRoundBack } from "react-icons/io";


const Banner = () => {
    return (
          <Carousel autoPlay={false} infiniteLoop={false}>
                <div className="relative">
                    <img src={banner1} />
                    <div className="absolute bottom-4 left-4   md:w-1/2 bg-amber-200/30 text-left">
                        <p className="text-justify">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                        <section className="mt-4">
                            <button className="mr-4 ">
                                <section className="flex items-center">
                                    <p className="btn btn-primary text-secondary text-lg  rounded-full">Track Your Parcel</p>  <span className="p-1 ml-1 bg-black  border-2 border-emerald-800 rounded-full"><IoMdArrowRoundBack className="rotate-135  w-6 h-6 text-white  "/></span>
                                </section>
                            </button>
                            <button className="btn">Be A Rider</button>
                        </section>
                    </div>
                </div>
                <div>
                    <img src={banner2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={banner3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    );
};

export default Banner;