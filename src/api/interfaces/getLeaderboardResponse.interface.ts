export interface GetLeaderboardResponse {
  topUsers: LeaderboardTopUser[];
  usersCount: number;
  userPosition: number;
}

export interface LeaderboardTopUser {
  username: string;
  tokens: number;
  isVerified: boolean;
}