import IController from "@/interfaces/controller.interface";
import express, { Request, Response, NextFunction } from "express";
import TaskService from "./task.service";
import TaskGenerator from "./taskGenerator";

class TaskController implements IController {
  path = "/task";
  router = express.Router();
  private taskService: TaskService = new TaskService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.getTasks);
    this.router.get(`${this.path}/schedule`, this.getSchedule);
    this.router.post(`${this.path}/create`, this.createTask);
    this.router.post(`${this.path}/complete`, this.completeTask);
    this.router.delete(`${this.path}/delete/:tid`, this.deleteTask);
  }

  private getTasks = async (req: Request, res: Response) => {
    const { startAt, endAt, roomId } = req.query;
    const tasks = await TaskGenerator.generate(roomId as string, startAt as string, endAt as string);
    tasks
      ? res.status(200).json({ tasks })
      : res.status(500).json({ message: "tasks generation unsuccessful" });
  }

  private getSchedule = async (req: Request, res: Response) => {
    const { roomId } = req.query;
    const schedules = await this.taskService.getSchedules(roomId as string);
    schedules
      ? res.status(200).json({ schedules })
      : res.status(500).json({ message: "tasks generation unsuccessful" });
  }

  private createTask = async (req: Request, res: Response) => {
    const { title, points, days, startAt, roomId, assignedUsers } = req.body;
    if (!title || (!+points && points !== 0) || !days?.length || !startAt || !roomId || !assignedUsers?.length) {
      return res.status(400).json({ message: "invalid body" });
    }

    const taskTemplate = await this.taskService.createTask(req.body);
    taskTemplate
      ? res.status(200).json({ taskTemplate })
      : res.status(500).json({ message: "task couldn't be created" });
  }

  private completeTask = async (req: Request, res: Response) => {
    const { id, date, userId } = req.body;
    if (!id || !date || !userId) {
      return res.status(400).json({ message: "invalid body" });
    }

    const taskTemplate = await this.taskService.completeTask(req.body);
    taskTemplate
      ? res.status(200).json({ taskTemplate })
      : res.status(500).json({ message: "server " })
  }

  private deleteTask = async (req: Request, res: Response) => {
    const { tid } = req.params;
    if (!tid) return res.status(400).json({ message: "task doesn't exist" });

    const taskTemplate = await this.taskService.deleteTask(tid, req.query.roomId as string);
    taskTemplate
      ? res.status(200).json({ taskTemplate })
      : res.status(500).json({ message: "server " })
  }
}

export default TaskController;