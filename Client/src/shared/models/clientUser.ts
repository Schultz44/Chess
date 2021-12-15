export class ClientUser {
  constructor(data?: Record<string, unknown>) {
    Object.assign(this, data);
  }
  public username: string;
}
