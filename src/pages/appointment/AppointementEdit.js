import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject, getBearer } from "../../shared/utility";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import axios from "axios";

class AppointementEdit extends Component {
  state = {
    appointment: null,
    loading: true,
    errors: null,
    controls: {
      reason: {
        elementType: "select",
        elementConfig: {
          placeholder: "Причина",
          options: [
            {
              value: "01109556-bcf0-41e5-aa52-1a0a3ea01647",
              label: "Біль загальний / множинної локалізації A01",
            },
            {
              value: "6f7c0ddb-6b11-447e-b6e2-e154cfea8b64",
              label: "Озноб A02",
            },
            {
              value: "8e165c8a-ced2-4d96-a010-24e83ff9cf05",
              label: "Лихоманка A03",
            },
            {
              value: "794de074-9dc8-42bd-9aaa-29c0f8bf7037",
              label: "Загальна слабкість/втома A04",
            },
            {
              value: "b742e4ab-e65b-4f4c-b698-6c689dc2c801",
              label: "Нездужання A05",
            },
            {
              value: "425cf27b-9767-4626-a441-01a5a2bba4f6",
              label: "Втрата свідомості/непритомність A06",
            },
            {
              value: "84434bf8-1797-4754-a73f-3df6d85ef590",
              label: "Кома A07",
            },
            {
              value: "b902939e-d4f4-464d-b382-999fc1903d17",
              label: "Занепокоєння /страх, пов’язані з лікуванням A08",
            },
          ],
        },
        value: "",
        label: "Причина",
        validation: {},
        valid: false,
        touched: false,
      },
      diagnosis: {
        elementType: "select",
        elementConfig: {
          placeholder: "Діагноз",
          options: [
            {
              value: "01109556-bcf0-41e5-aa52-1a0a3ea01647",
              label: "Біль загальний / множинної локалізації A01",
            },
            {
              value: "6f7c0ddb-6b11-447e-b6e2-e154cfea8b64",
              label: "Озноб A02",
            },
            {
              value: "8e165c8a-ced2-4d96-a010-24e83ff9cf05",
              label: "Лихоманка A03",
            },
            {
              value: "794de074-9dc8-42bd-9aaa-29c0f8bf7037",
              label: "Загальна слабкість/втома A04",
            },
            {
              value: "b742e4ab-e65b-4f4c-b698-6c689dc2c801",
              label: "Нездужання A05",
            },
            {
              value: "425cf27b-9767-4626-a441-01a5a2bba4f6",
              label: "Втрата свідомості/непритомність A06",
            },
            {
              value: "84434bf8-1797-4754-a73f-3df6d85ef590",
              label: "Кома A07",
            },
            {
              value: "b902939e-d4f4-464d-b382-999fc1903d17",
              label: "Занепокоєння /страх, пов’язані з лікуванням A08",
            },
          ],
        },
        value: "",
        label: "Діагноз",
        validation: {},
        valid: false,
        touched: false,
      },
      action: {
        elementType: "select",
        elementConfig: {
          placeholder: "Дія",
          options: [
            {
              value: "0c6be487-b478-49d5-ba4a-147ecc796c3f",
              label: "Часткове медичне обстеження A31",
            },
            {
              value: "a4d94af5-baf0-42a7-8793-3527d7996d6c",
              label: "Тест на чутливість A32",
            },
            {
              value: "f07984cd-6bf9-4fd8-9abd-9b2a905e867b",
              label: "Мікробіологічний / імунологічний тест A33",
            },
            {
              value: "da0fecef-31ff-43fb-8859-9b0e57a9043a",
              label: "Аналіз крові A34",
            },
            {
              value: "ca62094c-661a-4e57-8e4a-91e20adebe4b",
              label: "Аналіз сечі A35",
            },
            {
              value: "d8d0bee5-5bf7-4878-9153-be637fe32db0",
              label: "Аналіз калу A36",
            },
            {
              value: "b0160835-80b5-4cc3-94e9-f4d1d953a64c",
              label: "Гістологія / цитологія A37",
            },
            {
              value: "ee9961b6-451d-4fa4-bdbf-2864a84db4a7",
              label: "Інші лабораторні дослідження НКІ A38",
            },
          ],
        },
        value: "",
        label: "Дія",
        validation: {},
        valid: false,
        touched: false,
      },
      comment: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Комментар",
        },
        value: "",
        validation: {
          required: true,
        },
        label: "Коментар",
        valid: false,
        touched: false,
      },
    },
  };
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios
      .get(`/api/appointments/${this.props.match.params.appointmentId}/one`, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => {
        this.setState({ appointment: response.data });
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
    const data = this.state.appointment;
    data.diagnosisId = this.state.controls.diagnosis.value.value;
    data.reasonId = this.state.controls.reason.value.value;
    data.actionId = this.state.controls.action.value.value;
    data.comment = this.state.controls.comment.value;
    data.status = "FINISHED";
    console.log(data);
    axios
      .patch(`/api/appointments/${data.appointmentId}`, data, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => {
        this.props.history.push("/doctor/profile");
      });
  }
  searchCode = (inputValue, group) => {
    axios
      .get(`/api/appointments/icpc2`, {
        params: {
          search: inputValue,
          groupId:
            group === "reason"
              ? "REASON"
              : group === "diagnosis"
              ? "RESULT"
              : "ACTION",
        },
      })
      .then((response) => {
        response.data.data.map((icpcEntity) => ({
          label: `${icpcEntity.name} ${icpcEntity.code}`,
          value: icpcEntity.id,
        }));
      });
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
        label={formElement.config.label}
        // loadOptions={(inputValue) =>
        //   this.searchCode(inputValue, formElement.id)
        // }
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
          <Button btnType="success">Зберегти</Button>
        </form>
      </div>
    );
  }
}
export default AppointementEdit;
