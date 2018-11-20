export default interface IServiceLocator {
  get: <S>( type: any ) => S;
  set: ( type: any, implementation: any ) => void;
}