import { useNavigate } from "react-router-dom";

const RoomInfo = ({ id, image, type, totalRooms, price }) => {
  const navigate = useNavigate();
  const handleBookingNavigation = () => {
    if (totalRooms === 0) {
      alert("No Rooms Availabe for booking");
    } else {
      navigate(`/booking-form/${id}`);
    }
  };
  return (
    <div className="card mb-3 w-full cursor-pointer">
      <div className="row g-0">
        <div className="col-md-4 p-2">
          <img
            src={image} // Display the first image
            className="img-fluid rounded-start h-full w-full"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{type} Room</h5>
            <p className="card-text">
              <p className="card-text">Rooms Available: {totalRooms}</p>
              <small className="text-muted">Price per Night: Rs. {price}</small>
            </p>
            <button
              className={`btn btn-primary`}
              disabled={totalRooms === 0}
              onClick={handleBookingNavigation}
            >
              {totalRooms >= 1 ? "Book" : "Not Avaiblabe"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
