export default interface IUser {
  getUserProfile: ( idUser: string ) => Promise<any>;
  loadUsersForSharedList: ( idCheckLists: string ) => Promise<any>;
  changePassword: ( password: string, newPassword: string) => Promise<any>;
}