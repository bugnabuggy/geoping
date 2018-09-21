import { ERoleUser } from '../../DTO/types/stateTypes/userStateType';

export default interface IRoutesComponentProps {
  authorized: boolean;
  roleUser: ERoleUser;
}