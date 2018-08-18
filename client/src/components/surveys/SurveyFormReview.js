import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import formFields from "./formFields";

import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, submitSurvey, formValues, history }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {formFields.map(field => {
        return (
          <div key={field.label}>
            <label>{field.label}</label>
            <div>{formValues[field.name]}</div>
          </div>
        );
      })}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
