import redis from "@/model/redis.client";
import dayjs from "dayjs";
import { IRoomCache, IInvitaiton, ICodeIndex } from "@/interfaces/roomCache.interface";
import crypto from "crypto";

// expiration time for inv code in number of days
const expireLimit = 2;

export default {
  generateInvcode: async (roomId: string): Promise<string> => {
    let invCode: string;

    try {
      const existingCache = <IRoomCache>JSON.parse((await redis.get(roomId)));

      // no cache or no invitaiton or code expired, then create new invCode
      if (!existingCache?.invitiation || +dayjs(existingCache.invitiation.expiration) <= +dayjs()) {
        const code = crypto.randomBytes(3).toString("hex");
        const expiration = dayjs().add(expireLimit, 'day').toDate();
        const invitaiton: IRoomCache = { invitiation: { code, expiration } };
        await redis.set(roomId, JSON.stringify(invitaiton));
        invCode = code;

        // check for / delete existing invcode index
        if (existingCache && existingCache.invitiation) await redis.del(existingCache.invitiation.code);
        // invcode indexing with code as key, roomId/expire as value
        redis.set(code, JSON.stringify(<ICodeIndex>{ roomId, expiration }));
      } else {
        invCode = existingCache.invitiation.code;
      }
    } catch (error) {
      console.error((error as Error).message);
    }

    return invCode;
  },

  getRoomId: async (invcode: string): Promise<string> => {
    try {
      const indexCache = <ICodeIndex>JSON.parse(await redis.get(invcode));

      // no cache or code expired, return null
      if (!indexCache || +dayjs(indexCache.expiration) <= +dayjs) return null;
      return indexCache.roomId;
    } catch (error) {
      console.error((error as Error).message);
    }
    return;
  }
}