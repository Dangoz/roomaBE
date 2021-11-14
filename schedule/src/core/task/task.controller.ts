import IController from "@/interfaces/controller.interface";
import express from "express";

class TaskController implements IController {
  path = "";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  }

}

export default TaskController;