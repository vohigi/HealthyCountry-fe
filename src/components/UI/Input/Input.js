import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import "./_input.scss";
import "react-datepicker/dist/react-datepicker.css";
const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "#31b33c"
        : isFocused
        ? "#5ed668"
        : null,
      color: isDisabled ? "#ccc" : isSelected || isFocused ? "#fff" : "#333",
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && "#31b33c",
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
        // <select
        //   className={inputClasses.join(" ")}
        //   value={props.value}
        //   onChange={props.changed}
        // >
        //   {props.elementConfig.options.map((option) => (
        //     <option key={option.value} value={option.value}>
        //       {option.displayValue}
        //     </option>
        //   ))}
        // </select>
      );
      break;
    case "asyncSelect":
      inputElement = (
        <AsyncSelect
          value={props.value}
          placeholder={props.elementConfig.placeholder}
          cacheOptions
          loadOptions={props.loadOptions}
          defaultOptions
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
