
export class CreateUserDto  {
  telegramId: number;
  username: string;

  constructor(
    telegramId: number,
    username: string,
  ) {
    this.telegramId = telegramId;
    this.username = username;
  }
}