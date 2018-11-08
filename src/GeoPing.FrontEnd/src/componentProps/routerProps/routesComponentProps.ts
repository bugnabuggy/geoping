import { ERoleUser } from '../../types/stateTypes/userStateType';

export default interface IRoutesComponentProps {
  authorized: boolean;
  roleUser: ERoleUser;
  path: string;
}