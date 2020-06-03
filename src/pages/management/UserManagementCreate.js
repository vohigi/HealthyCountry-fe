import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import RegisterForm from "../../components/UI/RegisterForm/RegisterForm";
import Loader from "../../components/Loader/Loader";

class UserManagementCreate extends Component {
  submitHandler = (data) => {
    this.props.onCreateUser(data, this.props.history);
  };
  render() {
    const { loading, errors } = this.props;
    return (
      <div>
        {loading && <Loader />}
        <RegisterForm
          loading={loading}
          errors={errors}
          onSubmit={this.submitHandler}
          isAdmin={true}
        />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCreateUser: (data, history) =>
      dispatch(actions.register(data, history, "/management/users")),
  };
};
export default connect(
  (state) => ({
    loading: state.management.loading,
    errors: state.management.errors,
  }),
  mapDispatchToProps
)(UserManagementCreate);
