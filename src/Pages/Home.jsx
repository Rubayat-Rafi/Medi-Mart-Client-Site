import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Category from "../Components/Category";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediMart</title>
      </Helmet>
      <div>
        <Banner />
        <Category/>
      </div>
    </>
  );
};

export default Home;
