import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject } from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import * as actions from "../../redux/actions/index";
import "./_register.scss";

class Register extends Component {
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
      gender: {
        elementType: "select",
        elementConfig: {
          options: [
            { displayValue: "Чоловіча", value: "MALE" },
            { displayValue: "Жіноча", value: "FEMALE" },
          ],
          placeholder: "Стать",
        },
        value: "MALE",
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
      const data = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value,
        firstName: this.state.controls.firstName.value,
        lastName: this.state.controls.lastName.value,
        middleName: this.state.controls.middleName.value,
        birthDate: this.state.controls.birthDate.value,
        taxId: this.state.controls.taxId.value,
        gender: this.state.controls.gender.value,
        role: "PATIENT",
      };
      console.log(this.props);
      console.log(this.props.onRegister);
      console.log(this.props.loading);
      this.props.onRegister(data, this.props.history);
    }
  };
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
    return (
      <div className="register">
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
