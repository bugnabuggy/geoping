export default interface IUser {
  loadUsersForSharedList: ( idCheckLists: string ) => Promise<any>;
  loadUserForStatistic: ( idList: string ) => Promise<any>;
  changePassword: ( password: string, newPassword: string) => Promise<any>;
  loadUserData: () => Promise<any>;
}