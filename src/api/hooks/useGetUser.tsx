import {useQuery} from "@tanstack/react-query";
import {useInitData, useLaunchParams} from "@telegram-apps/sdk-react";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
import UserService from "@/api/services/user.service.ts";
import axios from "axios";
import {User} from "@/utils/interfaces/user.interface.ts";

const UseGetUser = () => {
  const initData = useInitData()
  const lp = useLaunchParams()

  const {data: user, isLoading, isError, error} = useQuery<User>({
    queryKey: [QueryKeys.USER],
    queryFn: (): Promise<User> => UserService.getUserByTelegramId(initData!.user!.id, lp!.initDataRaw!),
    enabled: initData !== undefined,
    retry: (failureCount, error) => {
      // 404 -> stop retry, other server error (overload) -> keep trying
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          return false;
        }
      }

      return failureCount < 10;
    },
    staleTime: 120 * 1000
    }
  );

  return {user, isLoading, isError, error};
};

export default UseGetUser;