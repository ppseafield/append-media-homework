import React from 'react';
import { Form, Fireld, FormElement, Field } from '@progress/kendo-react-form';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Dialog } from '@progress/kendo-react-dialogs';
import OrderDetailRow from './OrderDetailRow.jsx';

export default class OrderDialog extends React.Component {
  state = {
    nextDetailsID: 2,
    dataItem: {
      details: [
        {
          id: 1,
          productID: 0,
          unitPrice: 0.0,
          quantity: 0,
          discount: 0,
        },
      ],
    },
  };
  onItemChange(e) {
    console.log('onItemChange:', e.dataItem, e.field, e.value)
    const { details } = this.state.dataItem
    this.setState({
      dataItem: {
        details: details.map((i) => {
          if (e.dataItem.id === i.id) {
            if (e.field === 'discountPercent') {
              const discountPercent = Number(e.value)
              if (isNaN(discountPercent)) {
                return i
              } else {
                return { ...i, discount: discountPercent / 100 }
              }
            } else {
              return { ...i, [e.field]: e.value }
            }
           } else {
             return i
           }
        }),
      },
    });
  }
  dialogTitle() {
    const { order } = this.props;
    return order?.orderID ? `Editing Order #${order.orderID}` : 'New Order';
  }
  handleSubmit() {
    // collect detail items
    this.props.handleSubmit();
  }
  render() {
    return (
      <Dialog title={this.dialogTitle()}>
        <Form
          onSubmit={this.handleSubmit}
          render={(formRenderProps) => (
            <FormElement style={{ maxWidth: '1050px' }}>
              <GridLayout
                rows={[{ height: 580 }]}
                cols={[{ width: 180 }, { width: 180 }, { width: 700 }]}
                gap={{ rows: 0, cols: 20 }}
              >
                <GridLayoutItem>
                  <fieldset className={'k-form-fieldset'}>
                    <legend>Order Details</legend>
                    <div className="mb-3">
                      <Field
                        name="customerID"
                        component={Input}
                        label="Customer ID"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="employeeID"
                        component={Input}
                        label="Employee ID"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="orderDate"
                        component={DatePicker}
                        label="Order Date"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="requiredDate"
                        component={DatePicker}
                        label="Required Date"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipDate"
                        component={DatePicker}
                        label="Ship Date"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipVia"
                        component={Input}
                        label="Ship Via"
                      />
                    </div>
                    <div className="mb-3">
                      <Field name="freight" component={Input} label="Freight" />
                    </div>
                  </fieldset>
                </GridLayoutItem>
                <GridLayoutItem>
                  <fieldset className="k-form-fieldset">
                    <legend>Address</legend>
                    <div className="mb-3">
                      <Field
                        name="shipName"
                        component={Input}
                        label="Ship To"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipAddress.street"
                        component={Input}
                        label="Street Address"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipAddress.city"
                        component={Input}
                        label="City"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipAddress.region"
                        component={Input}
                        label="State/Region"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipAddress.postalCode"
                        component={Input}
                        label="Postal Code/ZIP"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="shipAddress.country"
                        component={Input}
                        label="Country"
                      />
                    </div>
                  </fieldset>
                </GridLayoutItem>
                <GridLayoutItem>
                  <OrderDetailRow
                    dataItem={this.state.dataItem}
                    editable={true}
                    onItemChange={this.onItemChange.bind(this)}
                  />
                </GridLayoutItem>
              </GridLayout>
            </FormElement>
          )}
        />
      </Dialog>
    );
  }
}
