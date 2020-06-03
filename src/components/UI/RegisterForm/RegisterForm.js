import React, { Component } from "react";
import Loader from "../../Loader/Loader";
import { checkValidity, updateObject } from "../../../shared/utility";
import Button from "../Button/Button";
import Input from "../Input/Input";

class RegisterForm extends Component {
  roles = [
    { value: "PATIENT", label: "Пацієнт" },
    { value: "DOCTOR", label: "Лікар" },
    { value: "ADMIN", label: "Адмін" },
  ];
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Логін",
        },
        value: this.props.email,
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
          ...(this.props.isAdmin && { required: true }),
          ...(this.props.isAdmin && { minLength: 8 }),
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
        value: this.props.firstName,
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
        value: this.props.lastName,
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
        value: this.props.middleName,
        validation: {},
        valid: false,
        touched: false,
      },
      birthDate: {
        elementType: "date",
        elementConfig: {
          type: "text",
          placeholder: "Дата народження",
        },
        value: this.props.birthDate,
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
            { label: "Чоловіча", value: "MALE" },
            { label: "Жіноча", value: "FEMALE" },
          ],
          placeholder: "Стать",
        },
        value:
          this.props.gender === "MALE"
            ? { value: "MALE", label: "Чоловіча" }
            : { value: "FEMALE", label: "Жіноча" },
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
        value: this.props.taxId,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      ...(this.props.isAdmin && {
        role: {
          elementType: "select",
          elementConfig: {
            options: this.roles,
            placeholder: "Роль",
          },
          value:
            this.roles.find((role) => role.value === this.props.role) ?? {},
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      }),
      ...(this.props.isAdmin && {
        organization: {
          elementType: "select",
          elementConfig: {
            options: [{ label: "Тестова Поліклініка", value: "org_1" }],
            placeholder: "Стать",
          },
          value: this.props.organization
            ? { label: "Тестова Поліклініка", value: "org_1" }
            : null,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      }),
    },
  };
  componentDidMount() {
    //   for (let key in this.state.controls) {
    //       this.props.key
    //   }
    this.setState({
      controls: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Логін",
          },
          value: this.props.email,
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
            ...(this.props.isAdmin && { required: true }),
            ...(this.props.isAdmin && { minLength: 8 }),
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
          value: this.props.firstName,
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
          value: this.props.lastName,
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
          value: this.props.middleName,
          validation: {},
          valid: false,
          touched: false,
        },
        birthDate: {
          elementType: "date",
          elementConfig: {
            type: "text",
            placeholder: "Дата народження",
          },
          value: this.props.birthDate,
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
              { label: "Чоловіча", value: "MALE" },
              { label: "Жіноча", value: "FEMALE" },
            ],
            placeholder: "Стать",
          },
          value:
            this.props.gender === "MALE"
              ? { value: "MALE", label: "Чоловіча" }
              : { value: "FEMALE", label: "Жіноча" },
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
          value: this.props.taxId,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        ...(this.props.isAdmin && {
          role: {
            elementType: "select",
            elementConfig: {
              options: this.roles,
              placeholder: "Роль",
            },
            value:
              this.roles.find((role) => role.value === this.props.role) ?? {},
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
        }),
        ...(this.props.isAdmin && {
          organization: {
            elementType: "select",
            elementConfig: {
              options: [{ label: "Тестова Поліклініка", value: "org_1" }],
              placeholder: "Стать",
            },
            value: this.props.organization
              ? { label: "Тестова Поліклініка", value: "org_1" }
              : null,
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
        }),
      },
    });
  }
  inputChangedHandler = (event, controlName) => {
    console.log(event);
    console.log(controlName);
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value:
          this.state.controls[controlName].elementType === "date"
            ? event.toISOString()
            : this.state.controls[controlName].elementType === "select"
            ? event
            : event.target.value,
        valid:
          this.state.controls[controlName].elementType === "date" ||
          this.state.controls[controlName].elementType === "select"
            ? true
            : checkValidity(
                event.target.value,
                this.state.controls[controlName].validation
              ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };
  submitHandler(e) {
    e.preventDefault();
    const data = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
      firstName: this.state.controls.firstName.value,
      lastName: this.state.controls.lastName.value,
      middleName: this.state.controls.middleName.value,
      birthDate: this.state.controls.birthDate.value,
      taxId: this.state.controls.taxId.value,
      gender: this.state.controls.gender.value.value,
      role: this.props.isAdmin ? this.state.controls.role.value.с : "PATIENT",
      ...(this.props.isAdmin && {
        organizationId: this.state.controls.organization.value.value,
      }),
    };
    this.props.onSubmit(data);
  }
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
        <form onSubmit={(e) => this.submitHandler(e)}>
          {form}
          <Button btnType="success">
            {this.props.isAdmin ? "Зберегти" : "Зареєструватись"}
          </Button>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
