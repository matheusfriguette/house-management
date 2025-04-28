"use client";
import { useEffect, useState } from "react";
import AddItemDialog from "../_components/add-item-dialog";
import AddRoomDialog from "../_components/add-room-dialog";
import ItemList from "../_components/item-list";
import RoomFilter from "../_components/room-filter";
import { CreateItemDto } from "../_lib/actions/dtos";
import { createItem, listItems } from "../_lib/actions/items";
import { createRoom, getRooms } from "../_lib/actions/rooms";

export default function Home() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | undefined>(undefined);

  const handleAddRoom = async (name: string) => {
    await createRoom(name);
    const updated = await getRooms();
    setRooms(updated);
  };

  const handleAddItem = async (values: CreateItemDto) => {
    await createItem(values);
    const updated = await listItems(activeRoom);
    setItems(updated);
  };

  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  useEffect(() => {
    listItems(activeRoom).then(setItems);
  }, [activeRoom]);

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex-1 px-4 py-12">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <RoomFilter
              rooms={rooms}
              activeRoom={activeRoom}
              setActiveRoom={setActiveRoom}
            />

            <AddRoomDialog onAddRoom={handleAddRoom} />
          </div>

          {activeRoom && (
            <AddItemDialog roomId={activeRoom} onAddItem={handleAddItem} />
          )}
        </div>

        <ItemList items={items} />
      </div>

      <div className="sticky bottom-0 w-full">
        {/* <StatsBar items={mockItems} /> */}
      </div>
    </div>
  );
}
