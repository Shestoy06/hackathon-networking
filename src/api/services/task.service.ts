import {ObjectId} from "@/utils/types/objectId.type.ts";
import {TaskType} from "@/utils/interfaces/task.interface.ts";
import axiosInstance from "@/api/interceptors.ts";

class TaskService {
  BASE_URL: string = '/task';

  async checkTask(taskId: ObjectId, taskType: TaskType, userId: ObjectId): Promise<boolean> {
    return axiosInstance.post(this.BASE_URL + `/${taskId}/${userId}/check`, {
      taskType
    }).then(res => res.data)
  }
}

export default new TaskService();