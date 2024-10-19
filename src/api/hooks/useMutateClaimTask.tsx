import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ObjectId} from "@/utils/types/objectId.type.ts";
import UserService from "@/api/services/user.service.ts";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
import {User} from "@/utils/interfaces/user.interface.ts";
import Task from "@/utils/interfaces/task.interface.ts";
import toast from "react-hot-toast";

const useMutateClaimTask = () => {
  const queryClient = useQueryClient();

  const {mutate: mutateUserTask} = useMutation({
    mutationFn: ({telegramId, taskId}: { telegramId: number, taskId: ObjectId}) => {
      return UserService.claimTask(telegramId, taskId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QueryKeys.USER],
        (oldUser: User): User => {
          if (oldUser) {
            const updatedTasks = oldUser.tasks.map((task: Task) =>
              task.id === data.task.id ? { ...task, status: data.task.status } : task
            );

            toast.success("RATS assigned to your account!")

            return {
              ...oldUser,
              tokens: data.tokens,
              tasks: updatedTasks
            }
          }

          return oldUser
        }
      )
    },
    onError: (error) => {
      console.log(error);
      queryClient.invalidateQueries({queryKey: [QueryKeys.USER]}).then(() => console.log('User query invalidated'))
    }
  })

  return {mutateUserTask}
};

export default useMutateClaimTask;