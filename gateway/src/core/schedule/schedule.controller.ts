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
    this.router.get(`${this.path}/:rid`, ensureAuthenticated, this.getSchedules);
  }

  private getSchedules = async (req: Request, res: Response) => {
    let result = null
    try {
      const serviceRes = await schedule.get('/');
      if (serviceRes && serviceRes.data) result = serviceRes.data;
    } catch (error) {
      console.error("error: ", (error as Error).message);
    }
    result
      ? res.status(200).json(result)
      : res.status(500).send();
  }
}

export default ScheduleController;