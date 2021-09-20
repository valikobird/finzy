import React from "react";

export default function Input({type, id, name, title, value, handleChange, className, errorDiv, errorMsg}) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{title}</label>
      <input type={type} className={`form-control ${className}`} id={id} name={name} value={value}
             onChange={handleChange}/>
      <div className={errorDiv}>{errorMsg}</div>
    </div>
  );
}
