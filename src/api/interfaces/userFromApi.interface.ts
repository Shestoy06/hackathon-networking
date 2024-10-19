import {TaskFromApi} from "@/api/interfaces/taskFromApi.interface.ts";
import {UserFriendFromApi} from "@/api/interfaces/userFriendFromApi.inetrface.ts";
import {ObjectId} from "@/utils/types/objectId.type.ts";

export interface UserFromApi {
  _id: ObjectId;
  telegramId: number;
  username: string;
  tokens: number;
  ageReward: number;
  isVerified: boolean;
  friends: UserFriendFromApi[];
  friendsTotalCount: number;
  taskRefs: TaskFromApi[];
  refBonus: number;
}