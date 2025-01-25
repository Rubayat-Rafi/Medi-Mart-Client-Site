import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import DiscountProduct from "../Components/DiscountProduct";
import ArticalSection from "../Components/ArticalSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediMart</title>
      </Helmet>
      <div>
        <Banner />
        <Category/>
        <DiscountProduct/>
        <ArticalSection/>
      </div>
    </>
  );
};

export default Home;
