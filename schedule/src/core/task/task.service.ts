import Taskdb from "@/model/task.model";
import { ICompleteTask, ICreateTask, ISchedule } from "@/interfaces/task.interface";
import { Task, Prisma } from "@prisma/client";
import { convertDays } from "./taskUtil";
import { parseTask } from "./taskGenerator";
import dayjs, { Dayjs } from "dayjs";
import { week } from "./taskUtil";

class TaskService {
  async getSchedules(roomId: string): Promise<ISchedule[]> {
    try {
      const tasks = await Taskdb.getTaskByRoomId(roomId);

      // parse tasks into ISchedule[]
      const schedules: ISchedule[] = tasks.map(t => {
        const { id, title, points, roomId } = t;
        const assignedUsers = t.assignedUsers.map(au => au.userId);
        const days = t.days.map(d => week[d]);
        const startAt = t.startAt.toISOString();
        return {
          id, title, points, roomId, startAt,
          assignedUsers, days
        }
      });
      return schedules;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async createTask(data: ICreateTask): Promise<Task> {
    try {
      const days = convertDays(data.days as string[]);
      if (days.length !== data.days.length) throw new Error("invalid days");

      const task = await Taskdb.createTask({ ...data, days });
      return task;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async completeTask(data: ICompleteTask): Promise<Task> {
    try {
      const task = await Taskdb.getTaskById(data.id);

      // verify userId is an assignedUsers
      const index = task.assignedUsers.findIndex(au => au.userId === data.userId);
      if (index === -1) throw new Error("invalid userId");

      const itasks = await parseTask(task, dayjs(data.date), dayjs(data.date).add(1, 'day'));

      const itask = itasks.find(t => {
        return t.status === "incomplete"
          && dayjs(t.date).isSame(dayjs(data.date), 'day')
      })

      if (!itask) throw new Error("invalid date. already completed or doesn't exist");
      if (itask.userId !== data.userId) throw new Error("incorrect assigned user for the task");

      const updatedTask = await Taskdb.updateTaskRecord(data, task.points);
      return updatedTask;

    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }

  async deleteTask(id: string, roomId: string): Promise<Task> {
    try {

      // check task by Id, validate room
      const task = await Taskdb.getTaskById(id);
      if (task.roomId !== roomId) throw new Error("invalid room. task deletion denied.");

      const deletedTask = await Taskdb.deleteTaskById(id);
      return deletedTask;
    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }
}

export default TaskService;
