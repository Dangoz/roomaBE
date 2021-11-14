import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import express, { Request, Response, NextFunction } from "express";
import { schedule } from "@/configs/rest";

class TaskController implements IController {
  public path = "/v1/task";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

  }

}

export default TaskController;