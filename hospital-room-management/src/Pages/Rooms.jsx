import RoomInfo from "../components/RoomInfo";
import { useEffect, useState } from "react";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("calling");
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/rooms/room-booking"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRooms(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);
  return (
    <div className="flex flex-col gap-3 items-center  ">
      {rooms.map((room, index) => (
        <RoomInfo
          key={index}
          id={room._id}
          image={`http://localhost:5000${room.images[0]}`}
          type={room.type}
          totalRooms={room.totalRooms}
          price={room.price}
        />
      ))}
    </div>
  );
};

export default Rooms;
