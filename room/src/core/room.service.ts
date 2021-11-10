import Roomdb from "@/model/room.model";
import { Room } from "@prisma/client";

class RoomService {

  async getRoom(roomId: string): Promise<Room> {
    try {
      const room = await Roomdb.getRoom(roomId);
      return room;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async createRoom(name: string, description?: string): Promise<Room> {
    try {
      const room = await Roomdb.createRoom(name, description);
      return room;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }
}

export default RoomService;