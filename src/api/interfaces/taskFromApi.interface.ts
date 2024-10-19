import {TaskStatus, TaskType} from "@/utils/interfaces/task.interface.ts";
import {ObjectId} from "@/utils/types/objectId.type.ts";

export interface TaskFromApi {
  _id: ObjectId;
  status: TaskStatus;
  count: number;
  countToComplete: number;
  taskRef: {
    title: string;
    reward: number;
    type: TaskType;
    link: string | null;
    count: number | null;
    countToComplete: number | null;
    endDate: Date | null;
    collabId: string | null;
    iconUrl: string | null;
    description: string | null;
  },
}
