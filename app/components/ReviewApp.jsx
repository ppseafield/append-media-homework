import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import rawOrders from '../orders.json';
import OrderDetailRow from './OrderDetailRow.jsx';

export default class ReviewApp extends React.Component {
  state = {
    orders: rawOrders.map((item) => {
      return { ...item, expanded: false };
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
          return { ...i, expanded: !i.expanded }
        } else {
          return i
        }
      })
    })
  }

  render() {
    return (
      <Grid
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
        onExpandChange={(e) => { this.toggleExpandItem(e.dataItem) }}
      >
        <GridColumn
          field="orderID"
          title="ID"
          filterable={false}
          width="70px"
        />
        <GridColumn field="shipName" title="Shipped To" />
        <GridColumn field="shipAddress.city" title="City" />
        <GridColumn field="shipAddress.region" title="State" />
      </Grid>
    );
  }
}
