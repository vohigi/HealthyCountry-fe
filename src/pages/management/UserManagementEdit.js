import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import RegisterForm from "../../components/UI/RegisterForm/RegisterForm";
import Loader from "../../components/Loader/Loader";

class UserManagementEdit extends Component {
  componentDidMount() {
    console.log("getUser " + this.props.match.params.userId);
    this.props.onGetUser(this.props.match.params.userId);
  }
  submitHandler = (data) => {
    this.props.onEditUser(
      this.props.match.params.userId,
      data,
      this.props.history
    );
  };
  render() {
    const { loading, errors, user } = this.props;
    return (
      <div>
        {loading && <Loader />}
        {user && (
          <RegisterForm
            loading={loading}
            errors={errors}
            onSubmit={this.submitHandler}
            isAdmin={true}
            email={user.email}
            lastName={user.lastName}
            firstName={user.firstName}
            middleName={user.middleName}
            birthDate={user.birthDate}
            role={user.role}
            phone={user.phone}
            taxId={user.taxId}
            organization={user.organization}
            specialization={user.specialization}
            gender={user.gender}
          />
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: (id) => dispatch(actions.getUser(id)),
    onEditUser: (id, data, history) =>
      dispatch(actions.editUser(id, data, history)),
  };
};
export default connect(
  (state) => ({
    loading: state.management.loading,
    errors: state.management.errors,
    user: state.management.user,
  }),
  mapDispatchToProps
)(UserManagementEdit);
