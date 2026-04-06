import Banner from "../Banner/Banner"
import HowItWorks from "../HowItWorks/HowItWorks"
import OurServices from "../OurServices/OurServices"
import Brands from "../Brands/Brands"
import AbouteService from "../AbouteService/AbouteService"
import Reviews from "../Reviews/Reviews"
import Faq from "../Faq/Faq"

const reviewsPromise= fetch('/reviews.json').then(res=>res.json())

const Home = () => {
  return (
    <div>
        <Banner/>
        <HowItWorks/>
        <OurServices/>
        <Brands/>
        <AbouteService/>
        <Reviews reviewsPromise={reviewsPromise}/>
        <Faq/>
    </div>
  )
}

export default Home