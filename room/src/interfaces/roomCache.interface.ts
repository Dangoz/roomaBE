export interface IRoomCache {
  invitiation: IInvitaiton;
}

export interface IInvitaiton {
  code: string;
  expiration: Date;
}

export interface ICodeIndex {
  roomId: string;
  expiration: Date;
}