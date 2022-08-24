import React from 'react'
import { Grid, GridColumn, GridDetailRow } from '@progress/kendo-react-grid'

export default class OrderDetailRow extends GridDetailRow {
  render() {
    const details = this.props.dataItem.details.map(
      ({ productID, unitPrice, quantity, discount }) => {
      const itemTotal =  unitPrice * quantity * (1 - discount)
      return {
        productID,
        unitPrice,
        quantity,
        discountPercent: `${discount * 100}%`,
        itemTotal
      }
    })
    const grandTotal = details.reduce((sum, detailItem) => sum + detailItem.itemTotal, 0)
    return (
      <div>
      <Grid data={details}>
        <GridColumn field="productID" title="Product ID" />
        <GridColumn field="unitPrice" title="Price" format="{0:c}"/>
        <GridColumn field="quantity" title="Qty" />
        <GridColumn field="discountPercent" title="Discount" />
        <GridColumn field="itemTotal" title="Item Total"  format="{0:c}"/>
      </Grid>
      <p style={{'text-align': 'center'}}>
        <strong>Grand Total: </strong>
        ${grandTotal.toFixed(2)}
      </p>
      </div>
    )
  }
}