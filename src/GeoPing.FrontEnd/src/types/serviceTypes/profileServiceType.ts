export default interface IProfileServiceType {
  loadProfileData: (idUser: string) => Promise<any>;
  updateProfileData: (data: any) => Promise<any>;
  upgradeAccount: () => Promise<any>;
}