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
  render() {
    const { users, errors, loading } = this.props;
    return (
      <div>
        <button className="addButton">Додати користувача</button>
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
