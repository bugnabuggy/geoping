import * as React from 'react';
import IAdminPaymentStatisticsPageProps from '../pageAdminProps/adminPaymentStatisticsPageProps';
import FilterPaymentContainer from '../componentContainers/filterPaymentContainer';
import TablePaymentStatistics from '../componentContainers/tablePaymentStatisticsContainer';

export class AdminPaymentStatisticsPage extends React.Component<IAdminPaymentStatisticsPageProps, any> {
  render() {
    return (
      <div className="admin-payment-statistics-container">
        <h3>Payment Statistics</h3>
        <div>
          <FilterPaymentContainer/>
        </div>
        <div>
          <TablePaymentStatistics/>
        </div>
      </div>
    );
  }
}