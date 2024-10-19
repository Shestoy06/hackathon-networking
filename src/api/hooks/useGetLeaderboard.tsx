import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
import UserService from "@/api/services/user.service.ts";
import {GetLeaderboardResponse} from "@/api/interfaces/getLeaderboardResponse.interface.ts";

const UseGetLeaderboard = (userTokens: number) => {
  const {data: leaderboard, isLoading, isError, error} = useQuery<GetLeaderboardResponse>({
      queryKey: [QueryKeys.LEADERBOARD],
      queryFn: (): Promise<GetLeaderboardResponse> => UserService.getLeaderboard(userTokens),
      staleTime: 120 * 1000
    }
  );

  return { leaderboard, isLoading, isError, error };
};

export default UseGetLeaderboard;