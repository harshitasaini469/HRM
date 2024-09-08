import { useState } from "react";

const RoomInfoForm = () => {
  const [roomType, setRoomType] = useState("");
  const [roomImages, setRoomImages] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (roomImages.length + files.length > 5) {
      alert("you can only add upto 5 images");
      return;
    }
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setRoomImages((prevImages) => [...prevImages, ...imagePreviews]);
    console.log(roomImages);
  };

  const removeImage = (index) => {
    const updateImages = roomImages.filter((_, i) => i !== index);
    setRoomImages(updateImages);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      type: roomType,
      totalRooms: totalRooms,
      price: price,
      images: roomImages,
    };
    await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    })
      .then((result) => console.log(result.json()))
      .catch((err) => console.log(err));

    console.log("room type", roomType);
    console.log("room images", roomImages);
    console.log("total rooms", totalRooms);
    alert("Room details submitted");

    setRoomType("");
    setRoomImages([]);
    setTotalRooms("");
    setPrice("");
  };

  return (
    <div className="container mt-3">
      <form action="" onSubmit={handleSubmit} className="space-y-3">
        <div className="form-group">
          <label htmlFor="roomtype">Room Type:</label>
          <select
            name="roomtype"
            id="roomtype"
            className="form-control"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="" className="" disabled>
              Select Room Type
            </option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="roomImages">RoomImages (Max 5): </label>
          <input
            type="file"
            id="roomImages"
            className="form-control-file mx-2"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={roomImages.length >= 5}
            required
          />
        </div>
        <div className="form-group">
          <div className="row">
            {roomImages.map((image, index) => (
              <div key={index} className="col-md-4 col-sm-6 mb-3">
                <div className="position-relative">
                  <img
                    src={image}
                    alt={`Room preview ${index + 1}`}
                    className="img-fluid img-thumbnail h-full"
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => removeImage(index)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="totalRooms" className="">
            Total Number of Rooms:
          </label>
          <input
            type="number"
            id="totalRooms"
            className="form-control"
            value={totalRooms}
            onChange={(e) => setTotalRooms(e.target.value)}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="">
            Price Per Room :
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            min="1"
            max="5000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default RoomInfoForm;
