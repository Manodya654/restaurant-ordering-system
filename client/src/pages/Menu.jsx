import Header from "../components/Header";
import FlashDeal from "../components/FlashDeal";
import Filters from "../components/Filters";
import FoodGrid from "../components/FoodGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <FlashDeal />
      <Filters />
      <FoodGrid />
      <Footer />
    </div>
  );
}