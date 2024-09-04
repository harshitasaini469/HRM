import { Link } from "react-router-dom";
const RoomInfo = ({ id, image, type, totalRooms, price }) => {
  return (
    <div className="card mb-3 w-4/5 cursor-pointer">
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
            <Link to={`/booking-form/${id}`}>
              <button className="btn btn-primary">Book</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
