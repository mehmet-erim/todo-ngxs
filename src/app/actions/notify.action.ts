export class NotifyMessage {
  static readonly type = '[MSG] text';

  constructor(public payload: any) { }
}

export class GetUserData {
  static readonly type = '[MSG] Get User Data';
}

