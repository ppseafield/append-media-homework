import React from 'react'
import { Form, Fireld, FormElement, Field } from '@progress/kendo-react-form'
import { Error } from '@progress/kendo-react-labels'
import { Input } from '@progress/kendo-react-inputs'
import { Dialog } from '@progress/kendo-react-dialogs'

export default class OrderDialog extends React.Component {
  dialogTitle () {
    const { order } = this.props
    return order?.orderID ? `Editing Order #${order.orderID}` : 'New Order'
  }
  render () {
    return (
      <Dialog title={this.dialogTitle()}>
        <Form
        onSubmit="this.props.handleSubmit"
        render={(formRenderProps) => (
          <FormElement
            style={{ maxWidth: "850px" }} 
          >
            <fieldset className={"k-form-fieldset"}>
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
                  component={Input}
                  label="OrderDate"
                  />
              </div>
              <div className="mb-3">
                <Field
                  name="shipName"
                  component={Input}
                  label="Ship To"
                />
              </div>
            </fieldset>
          </FormElement>
        )}
      />
      </Dialog>
    )
  }
}