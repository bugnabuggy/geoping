import * as React from 'react';

import AllChecklistsFilterComponentContainer from '../componentContainers/allChecklistsFilterComponentContainer';
import { TableComponent } from '../components/tableComponent';
import { ITableStructure } from '../componentProps/tablesProps/tableComponentProps';
import AllChecklistTableComponentContainer from '../componentContainers/allChecklistTableComponentContainer';

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

export default class AdminAllChecklistPage extends React.Component<any, any> {
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