import RoomInfo from "../components/RoomInfo";
import { useEffect, useState } from "react";
import axios from "axios";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    console.log("calling");
    const fetchRooms = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/rooms/room-booking"
      );

      setRooms(response.data);
    };
    fetchRooms();
  }, []);
  return (
    <div className="flex flex-col gap-3 items-center  ">
      {rooms.map((room) => (
        <RoomInfo
          key={room._id}
          image={room.images[0]}
          type={room.type}
          totalRooms={room.totalRooms}
          price={room.price}
        />
      ))}
    </div>
  );
};

export default Rooms;
