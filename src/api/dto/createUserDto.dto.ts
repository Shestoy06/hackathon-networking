
export class CreateUserDto  {
  telegramId: number;
  username: string;
  refBonus: number;
  parentRefId: string | undefined = undefined;
  isPremium: boolean;

  constructor(
    telegramId: number,
    username: string,
    refBonus: number,
    parentRefId: string | undefined,
    isPremium: boolean,
  ) {
    this.telegramId = telegramId;
    this.username = username;
    this.refBonus = refBonus;
    this.parentRefId = parentRefId;
    this.isPremium = isPremium;
  }
}