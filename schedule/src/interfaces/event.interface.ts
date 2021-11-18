export interface ICreateEvent {
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  roomId: string;
  color: string;
}

export interface IUpdateEvent {
  id: string;
  title?: string;
  description?: string;
  startAt?: string;
  endAt?: string;
}