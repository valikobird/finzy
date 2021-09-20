import React from "react";

export default function Select({
                                 name,
                                 title,
                                 value,
                                 handleChange,
                                 placeholder,
                                 options,
                                 className,
                                 errorDiv,
                                 errorMsg
                               }) {
  return (
    <div className={"mb-3"}>
      <label htmlFor={name} className={"form-label"}>{title || " "}</label>
      <select className={`form-select ${className}`} name={name} value={value} onChange={handleChange}>
        <option value={""}>{placeholder}</option>
        {options.map((option) => (
          <option className={"form-select"} key={option} value={option} label={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
}
