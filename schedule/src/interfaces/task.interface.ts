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
