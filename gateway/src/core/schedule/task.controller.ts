import IController from "@/interfaces/controller.interface";
import { ensureAuthenticated } from "@/middlewares/authen.middleware";
import express, { Request, Response, NextFunction } from "express";
import { schedule } from "@/configs/rest";
import { checkRoomId } from "@/middlewares/check.middleware";

class TaskController implements IController {
  public path = "/v1/task";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, ensureAuthenticated, checkRoomId, this.getTasks);
    this.router.post(`${this.path}/create`, ensureAuthenticated, checkRoomId, this.createTask);
  }

  private getTasks = async (req: Request, res: Response) => {
    try {
      const tasksRes = await schedule.get('/task/list', {
        params: { ...req.query, roomId: req.user.roomId }
      });
      const tasks = tasksRes.data.tasks;
      res.status(200).json({ message: "tasks retrieved", tasks });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private createTask = async (req: Request, res: Response) => {
    try {
      const taskRes = await schedule.post('/task/create', {
        ...req.body,
        roomId: req.user.roomId
      });
      const task = taskRes.data.task;
      res.status(200).json({ message: "task created", task });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }
}

export default TaskController;