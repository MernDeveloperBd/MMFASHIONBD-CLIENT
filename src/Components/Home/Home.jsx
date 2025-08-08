
import { Helmet } from "react-helmet-async";
import Products from "../Products/Products";
import PopularProducts from "../PopularProducts/PopularProducts";
import RecentCollections from "../RecentCollections/RecentCollections";
import AddBanner from "../AddBanner/AddBanner";
import HomeScrollingBanner from "../HomeScrollingBanner/HomeScrollingBanner";
import SmallAddBanner from "../SmallAddBanner/SmallAddBanner";
import HorizontalProductScroll from "../HorizontalProductScroll/HorizontalProductScroll";
import SmallBanner1 from "../SmallAddBanner/SmallBanner1";


const Home = () => {

    return (
        <div className="space-y-12">
            <Helmet>
                <title>Home | Welcome to Haramain Shop</title>
            </Helmet>
            <HomeScrollingBanner />
            <RecentCollections></RecentCollections>
            <SmallAddBanner></SmallAddBanner>
            <Products></Products>
            <SmallBanner1/>
            <PopularProducts></PopularProducts>
            <SmallBanner1/>
            <HorizontalProductScroll></HorizontalProductScroll>
            <AddBanner></AddBanner>
            {/* <OfferBanner /> */}


        </div>
    );
};

export default Home;