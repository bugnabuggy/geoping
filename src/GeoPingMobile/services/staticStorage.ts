import IServiceLocator from '../types/serviceTypes/serviceLocatorType';
import { buildEnvironment, environments } from './environmentsServiceLocator';

export default class StaticStorage {
  static serviceLocator: IServiceLocator = environments.get( buildEnvironment );
}
