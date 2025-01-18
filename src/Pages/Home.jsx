import { Helmet } from "react-helmet-async";
import Banner from "../Components/Banner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MediMart</title>
      </Helmet>
      <div className=" min-h-[calc(100vh-288px)] ">
        <Banner />
      </div>
    </>
  );
};

export default Home;
