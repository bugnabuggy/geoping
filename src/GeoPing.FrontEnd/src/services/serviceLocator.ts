import { ServiceTest } from './serviceTest/serviceTest';
import { ServiceQa } from './serviceQa/serviceQa';
import { ServiceProduction } from './serviceProduction/serviceProduction';
import { ServiceDevelopment } from './serviceDevelopment/serviceDevelopment';
import { EBuildEnvironment } from '../DTO/environment';
import IGeopingServicesType from '../DTO/geopingServicesType';

const serviceLocatorMap: any = new Map();

serviceLocatorMap.set('test', new ServiceTest());
serviceLocatorMap.set('qa', new ServiceQa());
serviceLocatorMap.set('development', new ServiceDevelopment());
serviceLocatorMap.set('production', new ServiceProduction());

export let buildEnvironment: EBuildEnvironment = EBuildEnvironment.Test;
let serviceLocator: IGeopingServicesType = serviceLocatorMap.get(buildEnvironment);

export function getBuildEnvironment( env: EBuildEnvironment ) {
  buildEnvironment = env;
}

export default serviceLocator;