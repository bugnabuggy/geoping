import { ERoleUser } from '../../DTO/types/stateTypes/userStateType';

export default interface IGetRoutesProps {
  authorized: boolean;
  location: any;
  roleUser: ERoleUser;
}