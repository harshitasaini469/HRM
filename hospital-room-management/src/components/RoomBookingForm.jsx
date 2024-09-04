import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

const RoomBookingForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDays, setBookingDays] = useState("");
  const roomId = uuid();
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    const fetchRoom = async () => {
      console.log(id);
      try {
        const response = await fetch(
          `https://eaeadc2b-f4e7-42d3-9738-75934f038dc6-00-1hkpz925mjm36.pike.replit.dev/api/rooms/${id}`,
        );
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
      price: room.price,
      bookingDate,
      bookingTime,
      bookingDays,
      roomId,
    };
    console.log(bookingData);
    const response = await fetch(
      "https://eaeadc2b-f4e7-42d3-9738-75934f038dc6-00-1hkpz925mjm36.pike.replit.dev/api/bookings/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      },
    );
    if (response.ok) {
      console.log("Booking created successfully");
      const result = await fetch(
        `https://eaeadc2b-f4e7-42d3-9738-75934f038dc6-00-1hkpz925mjm36.pike.replit.dev/api/rooms/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalRooms: room.totalRooms - 1,
          }),
        },
      );
      if (result.ok) {
        console.log("total rooms updated");
        alert(`Room booked successfully!\n your order id is ${roomId}`);
      } else {
        throw new Error(
          `Room update request failed with status: ${updateRoomResponse.status}`,
        );
      }
    } else {
      throw new Error(
        `Booking request failed with status: ${bookingResponse.status}`,
      );
    }

    // Reset form fields after submission
    setClientName("");
    setClientPhone("");
    setBookingDate("");
    setBookingTime("");
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
            <label htmlFor="bookingTime">Booking Time:</label>
            <input
              type="time"
              id="bookingTime"
              className="form-control"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
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
