import React from 'react';
import { Grid, GridColumn, GridToolbar, GridDetailRow } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

export default class OrderDetailRow extends GridDetailRow {
  render() {
    const details = this.props.dataItem.details.map(
      ({ id, productID, unitPrice, quantity, discount }) => {
        const itemTotal = unitPrice * quantity * (1 - discount);
        return {
          id,
          productID,
          unitPrice,
          quantity,
          discount,
          discountPercent: discount * 100,
          itemTotal,
          inEdit: this.props.editable,
        };
      }
    );
    const grandTotal = details.reduce(
      (sum, detailItem) => sum + detailItem.itemTotal,
      0
    );
    return (
      <div>
        <Grid
          data={details}
          editField={'inEdit'}
          onItemChange={this.props.onItemChange}
        >
          <GridToolbar>
            <Button
              title="Add New"
              onClick={this.props.addNewDetailItem}
            >
              Add New
            </Button>
          </GridToolbar>
          <GridColumn
            field="productID"
            title="Product ID"
            editor="text"
            editable={this.props.editable}
          />
          <GridColumn
            field="unitPrice"
            title="Price"
            format="{0:c}"
            editor="text"
          />
          <GridColumn field="quantity" title="Qty" editor="numeric" />
          <GridColumn
            field="discountPercent"
            title="Discount"
            editor="text"
          />
          <GridColumn
            field="itemTotal"
            title="Item Total"
            format="{0:c}"
            editor="text"
          />
        </Grid>
        <p style={{ textAlign: 'center' }}>
          <strong>Grand Total: </strong>${grandTotal.toFixed(2)}
        </p>
      </div>
    );
  }
}
