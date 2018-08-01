import * as React from 'react';
import { Route } from 'react-router-dom';

// import { App } from '../components/app';

export class ListOfRoutes extends React.Component<any, any>{
  constructor(props: any){
    super(props);
  }

  renderRoutes = () => {
    let component:any = null;

    component = <Route 
      path={this.props.location.pathname} 
      exact={this.props.mapComponent[this.props.location.pathname].exact || false}
      component={this.props.mapComponent[this.props.location.pathname].component} 
      />;
    return component;
  }

  render(){
    return this.renderRoutes();
  }
}