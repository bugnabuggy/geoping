import IServiceLocator from '../DTO/serviceLocatorType';
import { buildEnvironment, environments } from '../DTO/environmentsServiceLocator';

export default class StaticStorage {
  static serviceLocator: IServiceLocator = environments.get( buildEnvironment );
}
