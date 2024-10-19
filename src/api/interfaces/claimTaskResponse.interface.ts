import {TaskFromApi} from "@/api/interfaces/taskFromApi.interface.ts";
import Task from "@/utils/interfaces/task.interface.ts";

export interface ClaimTaskApiResponse {
  tokens: number;
  task: TaskFromApi;
}

export interface ClaimTaskResponse {
  tokens: number;
  task: Task;
}