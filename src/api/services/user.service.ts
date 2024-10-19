import axiosInstance from "@/api/interceptors.ts";
import {ObjectId} from "@/utils/types/objectId.type.ts";
import {CreateUserDto} from "@/api/dto/createUserDto.dto.ts";
import {User} from "@/utils/interfaces/user.interface.ts";
import apiFactory from "@/api/apiFactory.ts";
import {ClaimTaskApiResponse, ClaimTaskResponse} from "@/api/interfaces/claimTaskResponse.interface.ts";
import {GetLeaderboardResponse} from "@/api/interfaces/getLeaderboardResponse.interface.ts";

class UserService {
  BASE_URL = '/user'

  async getUserByTelegramId(id: number): Promise<User> {
    return axiosInstance.get<User>(this.BASE_URL + `/${id}/${UserServiceEndpoint.GET_BY_TELEGRAM_ID}`,)
      .then(res => res.data)
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return axiosInstance.post(this.BASE_URL, {
    username: user.username, telegramId: user.telegramId,
    })
      .then(res => res.data)
  }

  async addContact(id: number, contactUsername: string): Promise<User> {
    return axiosInstance.post(this.BASE_URL + `/${id}/addContact`, {
      username: contactUsername
    })
      .then(res => res.data)
  }

  async claimTask(id: number, taskId: ObjectId): Promise<ClaimTaskResponse> {
    return axiosInstance.patch<ClaimTaskApiResponse>(this.BASE_URL + `/${UserServiceEndpoint.CLAIM_TASK_BY_ID}`, {
      telegramId: id,
      taskId
    }).then(res => ({tokens: res.data.tokens, task: apiFactory.transformTasks([res.data.task])[0]}))
  }

  async getLeaderboard(userTokens: number): Promise<GetLeaderboardResponse> {
    return axiosInstance.get<GetLeaderboardResponse>(this.BASE_URL + `/${userTokens}/${UserServiceEndpoint.GET_LEADERBOARD}`)
      .then(res => res.data)
  }
}

enum UserServiceEndpoint {
  GET_BY_TELEGRAM_ID = "telegramId",
  CLAIM_TASK_BY_ID = "claimTaskById",
  GET_LEADERBOARD = "leaderboard"
}

export default new UserService();