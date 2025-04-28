import { Room } from "../_lib/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function RoomFilter({
  rooms,
  activeRoom,
  setActiveRoom,
}: {
  rooms: Room[];
  activeRoom?: string;
  setActiveRoom: (activeRoom?: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      value={activeRoom}
      onValueChange={(value) => {
        setActiveRoom(value);
      }}
      className="flex-wrap justify-start gap-2"
    >
      {rooms.map((room) => (
        <ToggleGroupItem key={room.id} value={room.id}>
          {room.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
