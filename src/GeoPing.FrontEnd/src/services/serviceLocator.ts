import IServiceLocator from '../DTO/serviceLocatorType';

class ServiceLocator implements IServiceLocator {
  private container: Map<any, any> = new Map<any, any>();

  get<S>( type: any ) {
    return this.container.get( type ) as S;
  }

  set( type: any, implementation: any ) {
    this.container.set( type, implementation );
  }

}

export default ServiceLocator;