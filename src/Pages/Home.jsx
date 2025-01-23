import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Category from "../Components/Category";
import DiscountProduct from "../Components/DiscountProduct";

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
      </div>
    </>
  );
};

export default Home;
