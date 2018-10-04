import * as React from 'react';

import IPublicGEOCheckListsPageProps from '../componentPagesProps/publicGEOCheckListsPageProps';
import FilterForPublicCheckListsComponentContainer
  from '../componentContainers/filterForPublicCheckListsComponentContainer';
import PublicCheckListsComponent from '../componentContainers/publicCheckListsComponentContainer';

export default class PublicGEOCheckListsPage extends React.Component<IPublicGEOCheckListsPageProps, any> {
  render() {
    return (
      <div className="public-check-list-container">
        <span><h2 className="">Public GEO check lists</h2></span>
        <div className="public-check-list-info">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </div>
        <div className="public-check-list-filter">
          <FilterForPublicCheckListsComponentContainer/>
        </div>
        <div className="public-check-lists">
          <PublicCheckListsComponent/>
        </div>
      </div>
    );
  }
}