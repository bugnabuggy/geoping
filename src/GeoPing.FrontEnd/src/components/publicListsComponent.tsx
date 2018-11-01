import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';

import IPublicListsComponentProps from '../componentProps/publicListsComponentProps';
import { PublicListItem } from './listComponents/publicListItem';
import { IGeoListPublickDTO } from '../DTO/geoListDTO';

export class PublicListsComponent extends React.Component<IPublicListsComponentProps, any> {

  renderPublicListItem = () => {
    const listItem: Array<any> = this.props.publicListItem.map( ( item: IGeoListPublickDTO ) => {
      return (
        <PublicListItem
          key={uuidV4()}
          author={item.ownerName}
          nameList={item.name}
          raiting={item.rating}
          subscribers={item.subscribersNumber}
        />
      );
    } );
    return listItem;
  };

  render() {
    return (
      <div>
        {this.renderPublicListItem()}
      </div>
    );
  }
}