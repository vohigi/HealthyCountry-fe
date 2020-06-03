import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_register.scss";
import RegisterForm from "../../components/UI/RegisterForm/RegisterForm";

class Register extends Component {
  submitHandler = (data) => {
    this.props.onRegister(data, this.props.history);
  };
  render() {
    const { loading, errors } = this.props;
    return (
      <RegisterForm
        loading={loading}
        errors={errors}
        onSubmit={this.submitHandler}
        isAdmin={false}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.register.loading,
    errors: state.register.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (data, history) => dispatch(actions.register(data, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
