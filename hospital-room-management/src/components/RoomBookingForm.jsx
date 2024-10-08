import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

const RoomBookingForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingDays, setBookingDays] = useState("");
  const { id } = useParams();
  const unique_id = uuid();
  const bookedRoomId = unique_id.slice(0, 8);

  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchRoom = async () => {
      console.log(id);
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/${id}`);
        const data = await response.json();
        setRoom(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoom();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      clientName,
      clientPhone,
      room: room.type,
      roomTypeId: id,
      price: room.price,
      bookingDate,
      bookingDays,
      roomId: `${room.type}${bookedRoomId}`,
    };
    console.log(bookingData);
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    if (response.ok) {
      console.log("Booking created successfully");
      const result = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalRooms: room.totalRooms - 1,
        }),
      });
      if (result.ok) {
        console.log("total rooms updated");
        const data = await response.json();
        console.log(data.roomId);
        alert(`Room booked successfully!\n your order id is ${data.roomId}`);
      } else {
        throw new Error(
          `Room update request failed with status: ${result.status}`
        );
      }
    } else {
      throw new Error(`Booking request failed with status: ${response.status}`);
    }

    // Reset form fields after submission
    setClientName("");
    setClientPhone("");
    setBookingDate("");
    setBookingDays("");
  };

  return (
    <div>
      <div className="container mt-3">
        <form action="" onSubmit={handleSubmit} className="space-y-3">
          <div className="form-group">
            <label htmlFor="clientName">Client Name:</label>
            <input
              type="text"
              name="clientName"
              id="clientName"
              className="form-control"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="clientPhone">Client Phone Number:</label>
            <input
              type="tel"
              name="clientPhone"
              id="clientPhone"
              className="form-control"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              // pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input
              type="date"
              id="bookingDate"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="bookingDays">No. of Days</label>
            <input
              type="number"
              id="bookingDays"
              className="form-control"
              value={bookingDays}
              onChange={(e) => setBookingDays(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingForm;
