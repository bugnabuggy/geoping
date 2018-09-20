import * as React from 'react';
import { v4 as uuidV4 } from 'uuid';

import IPublicListsComponentProps from '../componentProps/publicListsComponentProps';
import { PublicListItem } from './listComponents/publicListItem';
import IPublicCheckListItemProps from '../componentProps/publicCheckListItemProps';

export class PublicListsComponent extends React.Component<IPublicListsComponentProps, any> {

  renderPublicListItem = () => {
    const listItem: Array<any> = this.props.publicListItem.map ( ( item: IPublicCheckListItemProps ) => {
      return (
        <PublicListItem
          key={uuidV4()}
          author={item.author}
          nameList={item.nameList}
          raiting={item.raiting}
          subscribers={item.subscribers}
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