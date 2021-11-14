import { Request, Response, NextFunction } from "express";

export const checkRoomId = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.roomId) {
    return next();
  }

  res.status(400).json({ message: "user not in room" });
}