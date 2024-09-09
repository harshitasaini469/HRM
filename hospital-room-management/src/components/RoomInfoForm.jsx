import { useState } from "react";

const RoomInfoForm = () => {
  const [roomType, setRoomType] = useState("");
  const [roomImages, setRoomImages] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [price, setPrice] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (roomImages.length + files.length > 5) {
      alert("You can only add up to 5 images.");
      return;
    }

    setRoomImages((prevImages) => [...prevImages, ...files]);
  };

  // Remove image from selection
  const removeImage = (index) => {
    const updatedImages = roomImages.filter((_, i) => i !== index);
    setRoomImages(updatedImages);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData to send images as files
    const formData = new FormData();
    formData.append("roomType", roomType);
    formData.append("totalRooms", totalRooms);
    formData.append("price", price);

    // Append images to FormData
    roomImages.forEach((image) => {
      formData.append("roomImages", image); // 'roomImages' should match field name in backend
    });

    try {
      const response = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      alert("Room details submitted");

      // Reset form fields after submission
      setRoomType("");
      setRoomImages([]);
      setTotalRooms(0);
      setRoomImages([])
      setPrice("");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container mt-3">
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
        encType="multipart/form-data"
      >
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
            <option value="" disabled>
              Select Room Type
            </option>
            <option value="Single">Single</option>
            <option value="Double">Double Sharing</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
            <option value="General ward">General Ward</option>
            <option value="Standard">Standard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="roomImages">Room Images (Max 5): </label>
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
                    src={URL.createObjectURL(image)} // Convert file to a preview URL
                    alt={`Room preview ${index + 1}`}
                    className="img-fluid img-thumbnail h-full"
                  />
                  <button
                    type="button"
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
          <label htmlFor="totalRooms">Total Number of Rooms:</label>
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
          <label htmlFor="price">Price Per Room:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            min="500"
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
