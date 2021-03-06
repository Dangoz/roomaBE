import prisma from "./prisma.client";
import { Task, Record, User_Task } from "@prisma/client";
import { ICompleteTask, ICreateTask } from "@/interfaces/task.interface";

export default {

  getTaskById: async (id: string): Promise<Task & {
    records: Record[];
    assignedUsers: User_Task[];
  }> => {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        records: true,
        assignedUsers: true
      }
    });
    return task;
  },

  getTaskByRoomId: async (roomId: string): Promise<(Task & {
    records: Record[];
    assignedUsers: User_Task[];
  })[]> => {
    const taskList = await prisma.task.findMany({
      where: { roomId },
      include: {
        records: true,
        assignedUsers: true
      }
    });
    return taskList;
  },

  createTask: async (data: ICreateTask): Promise<Task> => {
    const { title, points, days, assignedUsers, startAt, roomId } = data;
    const userTaskData = assignedUsers.map(userId => { return { userId } });

    const task = await prisma.task.create({
      data: {
        title, startAt, roomId,
        points: +points,
        days: days as number[],
        assignedUsers: {
          createMany: {
            data: userTaskData
          }
        }
      }
    })
    return task;
  },

  updateTaskRecord: async (data: ICompleteTask, points: number): Promise<Task> => {
    const { id, userId, date } = data;
    const task = prisma.task.update({
      where: { id },
      data: {
        records: {
          create: {
            date: new Date(date),
            userId
          }
        }
      }
    });

    const user = prisma.user.update({
      where: { id: userId },
      data: {
        points: { increment: points }
      }
    });

    const transcation = await prisma.$transaction([task, user]);
    return transcation[0];
  },

  deleteTaskById: async (id: string): Promise<Task> => {

    const deletedRecord = prisma.record.deleteMany({
      where: { taskId: id }
    });

    const deletedUserTask = prisma.user_Task.deleteMany({
      where: { taskId: id }
    });

    const deletedTask = prisma.task.delete({
      where: { id }
    });

    // delete Records, UserTasks, task in order within one transaction
    const transaction = await prisma.$transaction([deletedRecord, deletedUserTask, deletedTask]);
    return transaction[2];
  }
}