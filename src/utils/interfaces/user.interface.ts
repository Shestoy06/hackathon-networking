import Task from "@/utils/interfaces/task.interface.ts";
import {UserFriend} from "@/utils/interfaces/userFriend.interface.ts";
import {ObjectId} from "@/utils/types/objectId.type.ts";

export interface User {
  _id: ObjectId,
  telegramId: number;
  username: string;
  tokens: number;
  ageReward: number;
  isVerified: boolean;
  friends: UserFriend[];
  friendsTotalCount: number;
  tasks: Task[];
  refBonus: number;
  contacts: Contact[];
  links: Contact[];
}

interface Contact {
  username: string;
}

interface Link {
  username: string;
}