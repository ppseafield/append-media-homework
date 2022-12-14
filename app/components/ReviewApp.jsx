import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy, orderBy } from '@progress/kendo-data-query';
import rawOrders from '../orders.json';
import OrderDetailRow from './OrderDetailRow.jsx';
import OrderDialog from './OrderDialog.jsx';

const newOrder = () => {
  // stubbed new order
  return {
    orderID: '',
    customerID: '',
    employeeID: 0,
    orderDate: null,
    requiredDate: null,
    shippedDate: null,
    shipVia: 0,
    freight: 0,
    shipName: '',
    shipAddress: {
      street: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
    },
    details: [
      {
        id: 1,
        productID: 0,
        unitPrice: 0.0,
        quantity: 0,
        discount: 0,
      },
    ],
  };
};

export default class ReviewApp extends React.Component {
  state = {
    orders: rawOrders.map((item) => {
      return {
        ...item,
        orderDate: item.orderDate === 'NULL' ? null : new Date(item.orderDate),
        requiredDate: item.requiredDate === 'NULL' ? null : new Date(item.requiredDate),
        shippedDate: item.shippedDate === 'NULL' ? null : new Date(item.shippedDate),
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
    dialog: {
      open: false,
      order: null,
    },
  };

  openNewOrderDialog() {
    this.setState({
      dialog: {
        open: true,
        order: newOrder(),
      },
    });
  }
  openRowOrderDialog(e) {
    this.setState({
      dialog: {
        open: true,
        order: e.dataItem,
      },
    });
  }
  closeDialog() {
    this.setState({
      dialog: {
        open: false,
      },
    });
  }

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

  removeOrder(order) {
    this.setState({
      orders: this.state.orders.filter((o) => o.orderID != order.orderID),
      dialog: {
        open: false,
      },
    });
  }

  handleSubmit(order) {
    if (order.hasOwnProperty('orderID')) {
      this.setState({
        orders: this.state.orders.map(o => o.orderID === order.orderID ? order : o),
        dialog: {
          open: false
        }
      })
    } else {
    this.setState({
      orders: [
        {
          ...order,
          orderID:
            order?.orderID && order.orderID.length > 0
              ? order.orderID
              : `99${Math.floor(Math.random() * 1000)}`,
          orderDate: order.orderDate || 'NULL',
          requiredDate: order.requiredDate || 'NULL',
          shippedDate: order.shippedDate || 'NULL',
          shipAddress: {
            region:
              order?.shipAddress?.region && order.region.length > 0
                ? order.region
                : 'NULL',
          },
        },
        ...this.state.orders,
      ],
      dialog: {
        open: false,
      },
    })
  }
  }

  render() {
    return (
      <main>
        {this.state.dialog.open && (
          <OrderDialog
            dataItem={this.state.dialog.order}
            onClose={this.closeDialog.bind(this)}
            removeOrder={this.removeOrder.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
          />
        )}
        <h1>Order History</h1>
        <Grid
          style={{ height: '700px' }}
          data={this.showOrders(this.state)}
          onRowClick={this.openRowOrderDialog.bind(this)}
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
          <GridToolbar>
            <Button
              title="Add New Order"
              onClick={this.openNewOrderDialog.bind(this)}
            >
              Add New Order
            </Button>
          </GridToolbar>
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
