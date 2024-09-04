import RoomInfo from "../components/RoomInfo";
import { useEffect, useState } from "react";
import axios from "axios";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("calling");
    const fetchRooms = async () => {
      const response = await axios.get(
        "https://eaeadc2b-f4e7-42d3-9738-75934f038dc6-00-1hkpz925mjm36.pike.replit.dev/api/rooms/room-booking",
      );

      setRooms(response.data);
    };
    fetchRooms();
  }, []);
  return (
    <div className="flex flex-col gap-3 items-center  ">
      {rooms.map((room, index) => (
        <RoomInfo
          key={index}
          id={room._id}
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
