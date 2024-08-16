import { useLoaderData } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

const HomePage = () => {
  const {count} = useLoaderData()
  return (
    <div className="p-4">
      <Navbar />
      <Banner/>
      <Products count={count}/>
      <Footer/>
    </div>
  );
};

export default HomePage;
