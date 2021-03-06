export default interface IUserType {
  email: string;
  id: string;
  identityId: string;
  isActivated: boolean;
  phone: string;
  login: string;
  firstName: string;
  lastName: string;
  birthday: string;
  accountType: string;
  lastPaid: string;
  avatar: string;
}

export interface IAutocompleteUsersDTO {
  userName: string;
  email: string;
  fullName: string;
  userId: string;
}