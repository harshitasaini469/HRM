import BookingScreen from "../components/BookingScreen";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="w-3/5 h-[90%] border rounded-md p-3">
        <Navbar />
        <BookingScreen />
      </div>
    </div>
  );
};

export default Home;
