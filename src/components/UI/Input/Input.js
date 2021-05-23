import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./_input.scss";
import "react-datepicker/dist/react-datepicker.css";
const colourStyles = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "none",
    border: isFocused || isSelected ? "1px solid #05b905" : "1px solid #cccccc",
    "&:hover": {
      borderColor: "#05b905",
      boxShadow: "none",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "#05b905"
        : isFocused
        ? "#f1f1f1"
        : null,
      color: isDisabled ? "#ccc" : isSelected ? "#fff" : "#333",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && "#05b905",
      },
    };
  },
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles }),
};
const Input = (props) => {
  let inputElement = null;
  const inputClasses = ["inputElement"];
  console.log(props.elementType + " " + props.value);
  if (props.className) inputClasses.push(props.className);
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <Select
          options={props.elementConfig.options}
          onChange={props.changed}
          value={props.value}
          styles={colourStyles}
          placeholder={props.elementConfig.placeholder}
        />
      );
      break;
    case "asyncSelect":
      inputElement = (
        <AsyncSelect
          value={props.value}
          placeholder={props.elementConfig.placeholder}
          loadOptions={props.loadOptions}
          // defaultOptions
          onInputChange={props.changed}
          styles={colourStyles}
        />
      );
      break;
    case "date":
      inputElement = (
        <DatePicker
          onChange={props.changed}
          selected={Date.parse(props.value)}
          className={inputClasses.join(" ")}
          dateFormat="yyyy-MM-dd"
          placeholderText={props.elementConfig.placeholder}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div
      className={
        props.containerClassName ? "input " + props.containerClassName : "input"
      }
    >
      {props.label && <label className="label">{props.label}</label>}
      {inputElement}
    </div>
  );
};

export default Input;
