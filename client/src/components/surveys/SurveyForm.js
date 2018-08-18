import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";

import SurveyField from "./SurveyField";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields = () => {
    return (
      <div>
        {formFields.map(field => {
          return (
            <Field
              key={field.label}
              label={field.label}
              type="text"
              name={field.name}
              component={SurveyField}
            />
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            <i className="material-icons right">done</i>
            Next
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.emails = validateEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
