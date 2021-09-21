import React from "react";
import {IAlert} from "../../interfaces";

export default function Alert({type, message}: IAlert) {
  return (
    <div className={`alert ${type}`} role={"alert"}>
      {message}
    </div>
  );
};
