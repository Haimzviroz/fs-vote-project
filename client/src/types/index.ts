export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedfor: null | string;
}
export interface RootState {
  users: User[];
}
