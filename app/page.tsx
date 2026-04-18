import Header from './components/Header'
import Banner from './components/Banner'
import LatestTutions from './components/LatestTutions'
import Categories from './components/Categories'
import WhyChooseUs from './components/WhyChooseUs'
import TopTutors from './components/TopTutors'
import GuardiansReviews from './components/GuardiansReviews'
import TutorsReviews from './components/TutorsReviews'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import AboutUsPage from './aboutUs/page'

export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <LatestTutions />
      <Categories />
      <WhyChooseUs />
      <TopTutors />
      <GuardiansReviews />
      <TutorsReviews />
      <HowItWorks />
      <Footer />

      {/* mostakim */}
      {/* <AboutUsPage /> */}
    </div>
  )
}
