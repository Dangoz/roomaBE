import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import express, { Request, Response, NextFunction } from "express";
import { schedule } from "@/configs/rest";

class ScheduleController implements IController {
  public path = "/v1/schedule";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.getSchedules);
  }

  private getSchedules = async (req: Request, res: Response) => {
    try {
      const serviceRes = await schedule.get('/');
      res.status(200).json(serviceRes.data);
    } catch (error) {
      console.error("error: ", (error as Error).message);
      res.status(500).json();
    }
  }
}

export default ScheduleController;