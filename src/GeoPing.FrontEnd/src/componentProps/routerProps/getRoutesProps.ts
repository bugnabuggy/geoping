import { ERoleUser } from '../../types/stateTypes/userStateType';

export default interface IGetRoutesProps {
  authorized: boolean;
  location: any;
  roleUser: ERoleUser;
}