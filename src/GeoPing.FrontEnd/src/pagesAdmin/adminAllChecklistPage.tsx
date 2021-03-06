import * as React from 'react';

import AllChecklistsFilterComponentContainer from '../componentContainers/allChecklistsFilterComponentContainer';
import { TableComponent } from '../components/tableComponents/tableComponent';
import { ITableStructure } from '../componentProps/tableComponentProps/tableComponentProps';
import AllChecklistTableComponentContainer from '../componentContainers/allChecklistTableComponentContainer';
import IAdminAllCheckListPageProps from '../pageAdminProps/adminAllCheckListPageProps';

const table: Array<ITableStructure> = [
  {
    field: 'id',
    label: 'Id',
    data: ['1', '2', '3'],
  },
  {
    field: 'name',
    label: 'Name',
    data: ['asdfgsdg', 'sdfgsergsd', 'sgsdfgsdfgsdf'],
    dataSort: true,
  },
  {
    field: 'price',
    label: 'Price',
    data: ['sgsrrfcsercser', 'servsdfvgsercgser', 'secgsdrgsthfghdtghdfgh'],
  }
];

export default class AdminAllChecklistPage extends React.Component<IAdminAllCheckListPageProps, any> {
  render() {
    return (
      <div className="admin-checklist-container">
        <h3>All CheckLists</h3>
        <div className="admin-checklist-filter-container">
          <AllChecklistsFilterComponentContainer/>
        </div>
        <div className="admin-checklist-table">
          {/*<TableComponent*/}
            {/*striped={true}*/}
            {/*bordered={true}*/}
            {/*condensed={true}*/}
            {/*hover={true}*/}
            {/*tableHeaderColumn={table}*/}
          {/*/>*/}
          <AllChecklistTableComponentContainer/>
        </div>
      </div>
    );
  }
}