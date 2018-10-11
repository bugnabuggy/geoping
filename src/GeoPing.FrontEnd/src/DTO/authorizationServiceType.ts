export default interface IAuthorization {
  getVirtualDatabase?: () => Promise<any>;
  signin: ( email: string, password: string ) => Promise<any>;
}