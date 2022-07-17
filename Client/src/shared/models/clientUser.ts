export class ClientUser {
  public username: string;
  public id;
  constructor(data?: Record<string, unknown>) {
    Object.assign(this, data);
  }
}
