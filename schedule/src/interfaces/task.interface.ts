export interface ICreateTask {
  title: string;
  points: string;
  days: string[] | number[];
  startAt: string;
  roomId: string;
  assignedUsers: string[];
}

export interface ICompleteTask {
  id: string;
  date: string;
  userId: string;
}

export interface ISchedule {
  id: string;
  title: string;
  points: number;
  days: string[];
  startAt: string;
  roomId: string;
  assignedUsers: string[];
}