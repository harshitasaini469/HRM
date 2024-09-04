import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomInfoForm from "./RoomInfoForm";
// import RoomBookingForm from "./RoomBookingForm";
import RoomBookingForm from "./RoomBookingForm";
import Rooms from "../Pages/Rooms";

const BookingScreen = () => {
  return (
    <div className="p-3 h-full overflow-y-auto">
      <Router>
        <Routes>
          <Route index path="/" element={<RoomInfoForm />} />
          <Route path="/room-booking" element={<Rooms/>} />
          <Route path="/booking-form" element={<RoomBookingForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default BookingScreen;
