import dayjs, { Dayjs } from "dayjs";
import { Task, Record, User_Task } from "@prisma/client";
import Taskdb from "@/model/task.model";
import { week } from "./taskUtil";

// default number of days for getting ITask(s)
const defaultRange: number = 30;

type status = "complete" | "incomplete";

interface ITask {
  id: string;
  title: string;
  points: number;
  status: status;
  date: Date;
  weekday: string;
  userId: string;
  roomId: string;
}

export const parseTask = async (task: Task & { records: Record[]; assignedUsers: User_Task[]; },
  startAt: Dayjs, endAt: Dayjs): Promise<ITask[]> => {

  // can't start before task's startAt. end has to end after start.
  const start = startAt.isBefore(dayjs(task.startAt), 'day') ? dayjs(task.startAt) : startAt;
  const end = endAt.isAfter(start, 'day') ? endAt : start.add(1, 'day');

  // get all days from task.startAt to end
  let count: Dayjs = dayjs(task.startAt);
  let days: Dayjs[] = [];
  while (!count.isAfter(end, 'day')) {
    days.push(count);
    count = count.add(1, 'day');
  }

  // keep days that meet weekly criteria
  days = days.filter(d => task.days.indexOf(d.day()) !== -1);

  const { id, title, points, roomId, assignedUsers } = task;
  const startIndex = days.findIndex(d => d.isSame(start, 'day') || d.isAfter(start, 'day'));
  if (startIndex === -1) return [];

  let result = days.slice(startIndex)
    .map(day => {

      // find record, apply status & userId according to record. build ITask
      const record = task.records.find(r => dayjs(r.date).isSame(day, 'day'));
      const weekday = week[day.day()];
      const itask: ITask = record
        ? { id, title, points, roomId, status: "complete", date: day.toDate(), weekday, userId: record.userId }
        : { id, title, points, roomId, status: "incomplete", date: day.toDate(), weekday, userId: "unassigned" };
      return itask;
    });

  // generate assigned user index on each day - array indexes
  const limit = assignedUsers.length - 1;
  let index = 0;
  let indexes: number[] = [];
  days.forEach(() => {
    indexes.push(index);
    index = index === limit ? 0 : index + 1;
  });
  indexes = indexes.slice(startIndex);

  // assign corresponding userId for unassigned ITask
  result = result.map((r, i) => {
    if (r.userId !== "unassigned") return r;
    return { ...r, userId: assignedUsers[indexes[i]].userId };
  })

  return result;
}

export default {

  generate: async (roomId: string, startAt?: string, endAt?: string): Promise<ITask[]> => {
    try {
      const templates = await Taskdb.getTaskByRoomId(roomId);
      const start = startAt ? dayjs(startAt) : dayjs();
      const end = endAt ? dayjs(endAt) : dayjs().add(defaultRange, 'day');

      // generate ITask(s) from the room's Task templates, sort by date (ascending)
      const itasksPromise = templates.map(template => parseTask(template, start, end));
      const itasks = (await Promise.all(itasksPromise))
        .flat()
        .sort((a, b) => +dayjs(a.date) - +dayjs(b.date));

      return itasks;

    } catch (error) {
      console.error((error as Error).message);
      return null;
    }
  }
}