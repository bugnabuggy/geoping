export default interface IProfileServiceType {
  loadProfileData: () => Promise<any>;
  upgradeAccount: () => Promise<any>;
}