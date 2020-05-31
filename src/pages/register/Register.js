import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject } from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../redux/actions/index";
import "./_register.scss";

export class Register extends Component {
  static propTypes = {};
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Логін",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Пароль",
        },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
      },
      firstName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ім'я",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      lastName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Прізвище",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      middleName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "По батькові",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      birthDate: {
        elementType: "date",
        elementConfig: {
          type: "text",
          placeholder: "Дата народження",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      taxId: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ІПН",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.controls.email.valid && this.state.controls.password.valid) {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignup
      );
    }
  };
  //loginRef = React.createRef();
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Loader />;
    }

    let errorMessage = null;

    if (this.props.errors) {
      errorMessage = this.props.errors.map((error, index) => (
        <p key={index} style={{ color: "red" }}>
          {error.messages[0]}
        </p>
      ));
    }
    let loginRedirect = null;
    if (this.props.isAuthenticated) {
      loginRedirect = <Redirect to={this.props.loginRedirectPath} />;
    }
    return (
      <div className="register">
        {loginRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="success">Зареєструватись</Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
    isAuthenticated: state.auth.token !== null,
    loginRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
