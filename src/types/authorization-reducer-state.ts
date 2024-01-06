import { User } from './user.ts';

export interface AuthorizationReducerState {
  user: User | null;
  authorizationStatus: string;
}
