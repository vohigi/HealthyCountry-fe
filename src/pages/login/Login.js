import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject } from "../../shared/utility";
// import Button from "../../components/UI/Button/Button";
// import Input from "../../components/UI/Input/Input";
import * as actions from "../../redux/actions/index";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./_login.scss";
import Logo from "../../components/Logo/Logo";

export class Login extends Component {
  static propTypes = {};
  state = {
    controls: {
      email: {
        label: "Email",
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
        label: "Пароль",
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

  submitHandler = (values) => {
    this.props.onAuth(values.email, values.password);
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    // let form = formElementsArray.map((formElement) => (
    //   <Input
    //     key={formElement.id}
    //     label={formElement.config.label}
    //     elementType={formElement.config.elementType}
    //     elementConfig={formElement.config.elementConfig}
    //     value={formElement.config.value}
    //     invalid={!formElement.config.valid}
    //     shouldValidate={formElement.config.validation}
    //     touched={formElement.config.touched}
    //     changed={(event) => this.inputChangedHandler(event, formElement.id)}
    //   />
    // ));

    // if (this.props.loading) {
    //   form = <Loader />;
    // }

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
      // this.props.history.push(this.props.loginRedirectPath);
      loginRedirect = <Redirect to={this.props.loginRedirectPath} />;
    }
    return (
      <div className="login">
        <Logo
          imageContainerClass="login-logo-container"
          imageClass="login-logo-container-img"
        />
        {loginRedirect}
        {errorMessage}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.submitHandler}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Будь-ласка введіть ім'я користувача",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Будь-ласка введіть пароль" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Увійти
            </Button>
            Немає акаунта? <Link to="/register">Зареєструватись</Link>
            <a href=""></a>
          </Form.Item>
        </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
