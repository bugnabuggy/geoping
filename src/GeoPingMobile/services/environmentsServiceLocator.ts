import IServiceLocator from '../types/serviceTypes/serviceLocatorType';
import ServiceLocator from './serviceLocator';
import { EBuildEnvironment } from '../enums/environment';

export const testServiceLocator = new ServiceLocator();
export const httpServiceLocator = new ServiceLocator();

export const environments = new Map<string, IServiceLocator>();

export let buildEnvironment: EBuildEnvironment = EBuildEnvironment.HTTP;

export function getBuildEnvironment( env: EBuildEnvironment ) {
  buildEnvironment = env;
}