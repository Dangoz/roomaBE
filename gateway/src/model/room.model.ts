import prisma from "./prisma.client";
import { Room, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import Userdb from "@/model/user.model";

export default {
  createRoom: async (): Promise<Room> => {
    let room: any;
    let user: any;
    let namekey = uuidv4();
    console.log("999999999999999999999");
    console.log(namekey);

    try {
      room = await prisma.room.create({
        data: {
          name: namekey,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }

    // try {
    //     user = Userdb.updateRoomId(userId, room.id);
    // } catch (error: any) {
    //     throw new Error(error.message);
    // }
    console.log("000000000000000000000");
    console.log(room);

    return room;
  },

  getRoomById: async (id: string): Promise<Room> => {
    // const room = await prisma.room.find({
    //   where: { id: name },
    // });

    console.log("getRoomById - name : " + id);

    const room = await prisma.room.findFirst({
      where: { id },
    });

    console.log("rooooom");
    console.log(room);

    return room;
  },
};
