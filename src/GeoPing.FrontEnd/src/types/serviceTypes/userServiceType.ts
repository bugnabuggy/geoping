export default interface IUser {
  loadUsersForSharedList: ( idCheckLists: string ) => Promise<any>;
  changePassword: ( password: string, newPassword: string) => Promise<any>;
}