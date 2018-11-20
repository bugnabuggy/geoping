export default interface IHttpCommunicator {
  get: ( url: string, ) => any;
  post: ( url: string, data: any ) => any;
  put: ( url: string, data: any ) => any;
  delete: ( url: string ) => any;
}