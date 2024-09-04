import { useState } from "react";

const RoomBookingForm = () => {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement booking logic here, such as saving to a database
    console.log("Client Name:", clientName);
    console.log("Client Phone:", clientPhone);
    console.log("Booking Date:", bookingDate);
    console.log("Booking Time:", bookingTime);

    // Show success message to the user
    alert("Room booked successfully!");

    // Reset form fields after submission
    setClientName("");
    setClientPhone("");
    setBookingDate("");
    setBookingTime("");
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingForm;
