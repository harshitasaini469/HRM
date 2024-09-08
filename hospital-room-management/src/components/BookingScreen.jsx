import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomInfoForm from "./RoomInfoForm";
// import RoomBookingForm from "./RoomBookingForm";
import RoomBookingForm from "./RoomBookingForm";
import Rooms from "../Pages/Rooms";
import BookingCancellationForm from "./BookingCancellationForm";
import BookedRooms from "../Pages/BookedRooms";

const BookingScreen = () => {
  return (
    <div className="p-3 h-full overflow-y-auto">
      <Router>
        <Routes>
          <Route index path="/" element={<RoomInfoForm />} />
          <Route path="/room-booking" element={<Rooms />} />
          <Route path="/booking-form/:id" element={<RoomBookingForm />} />
          <Route
            path="/booking-cancellation"
            element={<BookingCancellationForm />}
          />
          <Route path="/bookedRooms" element={<BookedRooms />} />
        </Routes>
      </Router>
    </div>
  );
};

export default BookingScreen;
