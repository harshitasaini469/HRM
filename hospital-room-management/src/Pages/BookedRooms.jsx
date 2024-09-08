import { useEffect, useState } from "react";
const BookedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    console.log("calling");
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookings/bookedRooms"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRooms(data);
        setFilteredBookings(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDateFilter = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    if (selectedDate === " ") {
      setFilteredBookings(rooms);
    } else {
      const filtered = rooms.filter((room) => {
        const bookingDate = new Date(room.bookingDate)
          .toISOString()
          .split("T")[0];
        return bookingDate === selectedDate;
      });
      setFilteredBookings(filtered);
    }
  };
  return (
    <div className="container ">
      <p className="h3 font-semibold">Client Bookings</p>
      <div className="form-group">
        <label htmlFor="filterDate">Filter by Booking Date:</label>
        <input
          type="date"
          id="filterDate"
          className="form-control"
          onChange={handleDateFilter}
        />
      </div>
      {filteredBookings.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Client Name</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Room Booked</th>
              <th scope="col">Price</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((room, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{room.clientName}</td>
                <td>{room.clientPhone}</td>
                <td>{room.roomType}</td>
                <td>{room.price}</td>
                <td>{new Date(room.bookingDate).toLocaleDateString()}</td>
                <td>{room.bookingDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Bookings found for the selected date</p>
      )}
    </div>
  );
};
export default BookedRooms;
