export default interface IUser {
  loadUsersForSharedList: ( idCheckLists: string ) => Promise<any>;
  loadUserForStatistic: ( idList: string ) => Promise<any>;
  changePassword: ( password: string, newPassword: string) => Promise<any>;
  loadUserData: () => Promise<any>;
  sendLoginOrEmail: ( loginOrEmail: string ) => Promise<any>;
  sendNewPassword: ( userId: string, token: string, newPassword: string ) => Promise<any>;
  confirmEmail: ( userId: string, token: string ) => Promise<any>;
}