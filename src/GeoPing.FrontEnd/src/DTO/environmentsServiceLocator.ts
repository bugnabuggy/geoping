import IServiceLocator from './serviceLocatorType';
import ServiceLocator from '../services/serviceLocator';
import { EBuildEnvironment } from './environment';

export const testServiceLocator = new ServiceLocator();
export const httpServiceLocator = new ServiceLocator();

export const environments = new Map<string, IServiceLocator>();

export let buildEnvironment: EBuildEnvironment = EBuildEnvironment.HTTP;

export function getBuildEnvironment( env: EBuildEnvironment ) {
  buildEnvironment = env;
}