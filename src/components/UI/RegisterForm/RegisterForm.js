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
  specializations = [
    { label: "Терапевт", value: "Therapist" },
    { label: "Педіатр", value: "Pediatrician" },
  ];
  state = {
    controls: {
      email: {
        label: "Email",
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
        label: "Пароль",
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
        label: "Ім'я",
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
        label: "Прізвище",
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
        label: "По батькові",
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
        label: "Дата народження",
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
      phone: {
        label: "Телефон",
        elementType: "input",
        elementConfig: {
          type: "phone",
          placeholder: "Телефон",
        },
        value: this.props.phone,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      gender: {
        label: "Стать",
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
        label: "ІПН",
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
        specialization: {
          label: "Спеціальність",
          elementType: "select",
          elementConfig: {
            options: this.specializations,
            placeholder: "Спеціальність",
          },
          value:
            this.specializations.find((spec) => {
              console.log(
                `${spec.value} ${this.props.specialization} ${
                  spec.value === this.props.specialization
                }`
              );
              return spec.value === this.props.specialization;
            }) ?? {},
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      }),
      ...(this.props.isAdmin && {
        role: {
          label: "Роль",
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
          label: "Організація",
          elementType: "select",
          elementConfig: {
            options: [{ label: "Тестова Поліклініка", value: "org_1" }],
            placeholder: "Організація",
          },
          value: this.props.organization
            ? { label: "Тестова Поліклініка", value: "org_1" }
            : {},
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
      phone: this.state.controls.phone.value,
      role: this.props.isAdmin
        ? this.state.controls.role.value.value
        : "PATIENT",
      ...(this.props.isAdmin &&
        this.state.controls.role.value.value !== "PATIENT" && {
          organizationId: this.state.controls.organization.value.value,
        }),
      ...(this.props.isAdmin &&
        this.state.controls.role.value.value !== "PATIENT" && {
          specialization: this.state.controls.specialization.value.value,
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
        label={formElement.config.label}
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
