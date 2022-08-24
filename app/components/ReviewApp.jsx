import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import rawOrders from '../orders.json';
import OrderDetailRow from './OrderDetailRow.jsx';
import OrderDialog from './OrderDialog.jsx';

export default class ReviewApp extends React.Component {
  state = {
    orders: rawOrders.map((item) => {
      return {
        ...item,
        orderDate: new Date(item.orderDate),
        shipAddress: {
          ...item.shipAddress,
          region:
            item.shipAddress.region === 'NULL' ? '' : item.shipAddress.region,
        },
        expanded: false,
      };
    }),
    sort: [
      {
        field: 'orderID',
        dir: 'desc',
      },
    ],
    filter: {
      logic: 'and',
      filters: [],
    },
    page: {
      skip: 0,
      take: 15,
    },
  };

  showOrders({ filter, sort, page: { skip, take } }) {
    return orderBy(filterBy(this.state.orders, filter), sort).slice(
      skip,
      take + skip
    );
  }
  toggleExpandItem(toggleItem) {
    this.setState({
      orders: this.state.orders.map((i) => {
        if (toggleItem.orderID === i.orderID) {
          return { ...i, expanded: !i.expanded };
        } else {
          return i;
        }
      }),
    });
  }

  render() {
    return (
      <main>
        <OrderDialog order={null} />
        <h1>Order History</h1>
        <Grid
          style={{ height: '700px' }}
          data={this.showOrders(this.state)}
          sortable={true}
          sort={this.state.sort}
          onSortChange={(e) => {
            this.setState({
              sort: e.sort,
            });
          }}
          filterable={true}
          filter={this.state.filter}
          onFilterChange={(e) => {
            this.setState({
              filter: e.filter,
            });
          }}
          pageable={true}
          skip={this.state.page.skip}
          take={this.state.page.take}
          total={this.state.orders.length}
          onPageChange={(e) => {
            this.setState({
              page: { ...e.page },
            });
          }}
          detail={OrderDetailRow}
          expandField="expanded"
          onExpandChange={(e) => {
            this.toggleExpandItem(e.dataItem);
          }}
        >
          <GridColumn field="orderID" title="ID" width="140px" />
          <GridColumn
            field="orderDate"
            title="Order Date"
            filter="date"
            format="{0:d}"
            width="240px"
          />
          <GridColumn field="customerID" title="Customer ID" width="150px" />
          <GridColumn field="shipName" title="Shipped To" width="270px" />
          <GridColumn
            field="shipAddress.street"
            title="Street Address"
            className="text-ellipsis"
            width="300px"
          />
          <GridColumn field="shipAddress.city" title="City" width="180px" />
          <GridColumn
            field="shipAddress.region"
            title="State/Region"
            width="140px"
          />
          <GridColumn
            field="shipAddress.postalCode"
            title="Postal Code"
            width="150px"
          />
          <GridColumn
            field="shipAddress.country"
            title="Country"
            width="150px"
          />
          <GridColumn field="employeeID" title="Employee ID" width="140" />
        </Grid>
      </main>
    );
  }
}
