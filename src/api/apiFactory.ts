import {UserFromApi} from "@/api/interfaces/userFromApi.interface.ts";
import {User} from "@/utils/interfaces/user.interface.ts";
import {TaskFromApi} from "@/api/interfaces/taskFromApi.interface.ts";
import Task, {
  BaseTask,
  CollabBotTask, CollabDownloadTask,
  CollabTelegramTask,
  CollabYoutubeTask,
  FriendsCountTask,
  FriendsTask,
  PremiumTask,
  TaskType,
  TelegramTask,
  TelegramTransactionTask,
  TelegramWalletTask,
  TwitterTask,
  YoutubeTask
} from "@/utils/interfaces/task.interface.ts";
import {UserFriendFromApi} from "@/api/interfaces/userFriendFromApi.inetrface.ts";
import {UserFriend} from "@/utils/interfaces/userFriend.interface.ts";

class ApiFactory {

  transformUser(userFromApi: UserFromApi): User {
    return {
      ...userFromApi,
      friends: this.transformUserFriends(userFromApi.friends),
      tasks: this.transformTasks(userFromApi.taskRefs)
    }
  }

  transformTasks(tasksFromApi: TaskFromApi[]): Task[] {
    const tasks: Task[] = [];

    tasksFromApi.forEach((taskFromApi) => {
      const baseTask: BaseTask = {
        id: taskFromApi._id,
        title: taskFromApi.taskRef.title,
        reward: taskFromApi.taskRef.reward,
        type: taskFromApi.taskRef.type,
        status: taskFromApi.status
      }

      switch (taskFromApi.taskRef.type) {

        case TaskType.FRIENDS:
          tasks.push({
            ...baseTask,
            countToComplete: taskFromApi.taskRef.countToComplete
          } as FriendsTask)
          break;

        case TaskType.FRIENDS_COUNT:
          tasks.push({
            ...baseTask,
            count: taskFromApi.count,
            countToComplete: taskFromApi.countToComplete,
            endDate: taskFromApi.taskRef.endDate,
          } as FriendsCountTask)
          break;

        case TaskType.YOUTUBE:
          tasks.push({
            ...baseTask,
            link: taskFromApi.taskRef.link
          } as YoutubeTask)
          break;

        case TaskType.TELEGRAM:
          tasks.push({
            ...baseTask,
            link: taskFromApi.taskRef.link
          } as TelegramTask)
          break;

        case TaskType.TWITTER:
        tasks.push({
          ...baseTask,
          link: taskFromApi.taskRef.link
          } as TwitterTask)
          break;

        case TaskType.PREMIUM:
          tasks.push({
            ...baseTask,
          } as PremiumTask)
          break;

        case TaskType.TELEGRAM_WALLET:
          tasks.push({
            ...baseTask,
          } as TelegramWalletTask)
          break;

        case TaskType.TELEGRAM_TRANSACTION:
          tasks.push({
            ...baseTask,
          } as TelegramTransactionTask)
          break;

        case TaskType.COLLAB_BOT:
          tasks.push({
            ...baseTask,
            collabId: taskFromApi.taskRef.collabId,
            link: taskFromApi.taskRef.link,
            count: taskFromApi.taskRef.count,
            countToComplete: taskFromApi.taskRef.countToComplete,
            iconUrl: taskFromApi.taskRef.iconUrl,
            description: taskFromApi.taskRef.description
          } as CollabBotTask)
          break;

        case TaskType.COLLAB_TELEGRAM:
          tasks.push({
            ...baseTask,
            collabId: taskFromApi.taskRef.collabId,
            link: taskFromApi.taskRef.link,
            count: taskFromApi.taskRef.count,
            countToComplete: taskFromApi.taskRef.countToComplete,
            iconUrl: taskFromApi.taskRef.iconUrl,
            description: taskFromApi.taskRef.description
          } as CollabTelegramTask)
          break;

        case TaskType.COLLAB_YOUTUBE:
          tasks.push({
            ...baseTask,
            collabId: taskFromApi.taskRef.collabId,
            link: taskFromApi.taskRef.link,
            count: taskFromApi.taskRef.count,
            countToComplete: taskFromApi.taskRef.countToComplete,
            iconUrl: taskFromApi.taskRef.iconUrl,
            description: taskFromApi.taskRef.description
          } as CollabYoutubeTask)
          break

        case TaskType.COLLAB_DOWNLOAD:
          tasks.push({
            ...baseTask,
            collabId: taskFromApi.taskRef.collabId,
            link: taskFromApi.taskRef.link,
            count: taskFromApi.taskRef.count,
            countToComplete: taskFromApi.taskRef.countToComplete,
            iconUrl: taskFromApi.taskRef.iconUrl,
            description: taskFromApi.taskRef.description
          } as CollabDownloadTask)
      }
    })

    console.log(tasks)

    return tasks;
  }

  transformUserFriends(userFriends: UserFriendFromApi[]): UserFriend[] {
    const friends: UserFriend[] = []
    userFriends.forEach(friend => {
      friends.push({
        username: friend.username,
        refBonus: friend.refBonus
      })
    })

    return friends
  }
}

export default new ApiFactory();