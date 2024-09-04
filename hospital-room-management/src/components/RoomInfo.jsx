import hp from "../assets/hospitalRoom.jpg";
import { useNavigate } from "react-router-dom";

const RoomInfo = ({ image, type, totalRooms, price }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card mb-3 w-4/5 cursor-pointer"
      onClick={() => navigate("/booking-form")}
    >
      <div className="row g-0">
        <div className="col-md-4 p-2">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{type} Room</h5>
            <p className="card-text">Total Rooms: {totalRooms}</p>
            <p className="card-text">
              <small className="text-muted">Price per Night: Rs. {price}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
