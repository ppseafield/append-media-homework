import React from 'react'
import { Grid, GridColumn, GridDetailRow } from '@progress/kendo-react-grid'

export default class OrderDetailRow extends GridDetailRow {
  render() {
    const details = this.props.dataItem.details.map(
      ({ productID, unitPrice, quantity, discount }) => {
      const itemTotal =  unitPrice * quantity * (1 - discount)
      return {
        productID,
        priceDollars: `\$${unitPrice.toFixed(2)}`,
        quantity,
        discountPercent: `${discount * 100}%`,
        itemTotal,
        totalDollars: `\$${itemTotal.toFixed(2)}`
      }
    })
    const grandTotal = details.reduce((sum, detailItem) => sum + detailItem.itemTotal, 0)
    return (
      <div>
      <Grid data={details}>
        <GridColumn field="productID" title="Product ID" />
        <GridColumn field="priceDollars" title="Price" />
        <GridColumn field="quantity" title="Qty" />
        <GridColumn field="discountPercent" title="Discount" />
        <GridColumn field="totalDollars" title="Item Total" />
      </Grid>
      <p style={{'text-align': 'right'}}>
        <strong>Grand Total: </strong>
        ${grandTotal.toFixed(2)}
      </p>
      </div>
    )
  }
}