import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";
import Category from "../Components/Category";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediMart</title>
      </Helmet>
      <div className=" min-h-[calc(100vh-288px)] ">
        <Banner />
        <Category/>
      </div>
    </>
  );
};

export default Home;
