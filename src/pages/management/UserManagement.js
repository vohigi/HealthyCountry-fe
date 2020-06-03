import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import Loader from "../../components/Loader/Loader";
import { UserCard } from "../../components/UserCard/UserCard";
import "./_management.scss";

class UserManagement extends Component {
  state = {};
  componentDidMount() {
    this.props.onGetUsers();
  }
  onEditClickHandler = (id) => {
    console.log(`edit click + ${id}`);
    this.props.history.push(`/management/users/${id}/edit`);
  };
  onCreateClickHandler = () => {
    this.props.history.push(`/management/users/create`);
  };
  onDeactivateClickHandler = (id, status) => {
    this.props.onDeactivateUser(id, status);
  };
  render() {
    const { users, errors, loading } = this.props;
    return (
      <div>
        <button className="addButton" onClick={this.onCreateClickHandler}>
          Додати користувача
        </button>
        {loading ? (
          <Loader />
        ) : (
          <div className="cardContainer">
            {users &&
              users.map((user) => (
                <UserCard
                  key={user.userId}
                  user={user}
                  onEditClick={() => this.onEditClickHandler(user.userId)}
                  onDeactivateClick={() =>
                    this.onDeactivateClickHandler(user.userId, !user.isActive)
                  }
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onGetUsers: () => dispatch(actions.getUsers()),
    onDeactivateUser: (id, status) =>
      dispatch(actions.deactivateUser(id, status)),
  };
};
export default connect(
  (state) => ({
    loading: state.management.loading,
    errors: state.management.errors,
    users: state.management.users,
  }),
  mapDispatchToProps
)(UserManagement);
