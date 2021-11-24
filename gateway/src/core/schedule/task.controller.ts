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
    this.router.get(`${this.path}/schedule`, ensureAuthenticated, checkRoomId, this.getSchedule);
    this.router.post(`${this.path}/create`, ensureAuthenticated, checkRoomId, this.createTask);
    this.router.post(`${this.path}/complete`, ensureAuthenticated, checkRoomId, this.completeTask);
    this.router.delete(`${this.path}/delete/:tid`, ensureAuthenticated, checkRoomId, this.deleteTask);
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

  private getSchedule = async (req: Request, res: Response) => {
    try {
      const schedulesRes = await schedule.get('/task/schedule', {
        params: { roomId: req.user.roomId }
      });
      const schedules = schedulesRes.data.schedules;
      res.status(200).json({ message: "schedule retrieved", schedules });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private createTask = async (req: Request, res: Response) => {
    try {
      const taskTemplateRes = await schedule.post('/task/create', {
        ...req.body,
        roomId: req.user.roomId
      });
      const taskTemplate = taskTemplateRes.data.task;
      res.status(200).json({ message: "task (template) created", taskTemplate });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private completeTask = async (req: Request, res: Response) => {
    try {
      const taskTemplateRes = await schedule.post('/task/complete', req.body);
      const taskTemplate = await taskTemplateRes.data.task;
      res.status(200).json({ message: "task completed", taskTemplate });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }

  private deleteTask = async (req: Request, res: Response) => {
    try {
      const taskTemplateRes = await schedule.delete(`/task/delete/${req.params.tid}`, {
        params: { roomId: req.user.roomId }
      });
      const taskTemplate = taskTemplateRes.data.task;
      res.status(200).json({ message: "task deleted", taskTemplate });
    } catch (error) {
      console.error((error as Error).message);
      res.status(500).json({ message: "server error" });
    }
  }
}

export default TaskController;