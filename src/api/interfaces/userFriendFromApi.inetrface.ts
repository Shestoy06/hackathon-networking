import {ObjectId} from "@/utils/types/objectId.type.ts";

export interface UserFriendFromApi {
  _id: ObjectId;
  username: string;
  refBonus: number;
}