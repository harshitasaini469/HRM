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
            <p className="card-text">
              <p className="card-text">Rooms Available: {totalRooms}</p>
              <small className="text-muted">Price per Night: Rs. {price}</small>
            </p>
            <a
              className={`btn btn-primary ${totalRooms == 0 ? "disabled" : ""}`}
              href={totalRooms === 0 ? "#" : `/booking-form/${id}`}
            >
              {totalRooms >= 1 ? "Book" : "Not Avaiblabe"}{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
