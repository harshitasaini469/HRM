import { useState } from "react";

const BookingCancellationForm = () => {
  const [orderId, setOrderId] = useState("");
  const [room, setRoom] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${orderId}`
      );
      const data = await response.json();
      setRoom(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const cancelBooking = async () => {
    const currentTime = new Date();
    const bookingCreatedAt = new Date(room.createdAt);

    const timeDiff = Math.abs(currentTime - bookingCreatedAt);
    let hh = Math.floor(timeDiff / 1000 / 60 / 60);
    console.log(hh);
    if (hh > 12) {
      alert("Booking can be cancelled only within 12hrs after booking time");
      setRoom(null);
      return;
    }
    try {1
      const result = await fetch(
        `http://localhost:5000/api/bookings/${room.roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        console.log("Booking cancelled");
        if (room.roomTypeId) {
          console.log(room.roomTypeId);
          updateRoomCount(room.roomTypeId);
        } else {
          console.log("room type id not found for updating room count");
        }
      } else {
        console.log(`failed to cancel bookng. Status : ${result.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateRoomCount = async (id) => {
    try {
      const roomResponse = await fetch(`http://localhost:5000/api/rooms/${id}`);
      if (!roomResponse.ok) {
        throw new Error(`Failed to room details : ${roomResponse.status}`);
      }
      const roomData = await roomResponse.json();

      const result = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalRooms: roomData.totalRooms + 1,
        }),
      });
      if (result.ok) {
        const data = await result.json();
        console.log(data);
        console.log("room count updated");
        alert("Room Booking Cancelled");
        setRoom(null);
        setOrderId("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orderId">Order Id:</label>
          <input
            type="text"
            name="OrderId"
            id="OrderId"
            className="form-control"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        {!room && <button className="btn btn-primary">Submit</button>}
      </form>
      <div className="flex flex-col gap-2">
        {room && (
          <div>
            <div className="form-group">
              <label htmlFor="clientName">Client Name:</label>
              <input
                type="text"
                name="clientName"
                id="clientName"
                className="form-control"
                value={room?.clientName}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="clientPhone">Client Phone Number:</label>
              <input
                type="tel"
                name="clientPhone"
                id="clientPhone"
                className="form-control"
                value={room?.clientPhone}
                // pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="bookingDate">Booking Date:</label>
              <input
                type="date"
                id="bookingDate"
                className="form-control"
                value={
                  room?.bookingDate
                    ? new Date(room.bookingDate).toISOString().split("T")[0]
                    : ""
                }
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookingDays">No. of Days</label>
              <input
                type="number"
                id="bookingDays"
                className="form-control"
                value={room?.bookingDays}
                disabled
              />
            </div>
          </div>
        )}
        {room && (
          <button className="btn btn-danger" onClick={cancelBooking}>
            Cancel Booking
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default BookingCancellationForm;
