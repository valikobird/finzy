import React, {Fragment, useState} from "react";
import AccountForm from "./AccountForm";
import {IAlert} from "../interfaces";
import Alert from "./ui-components/Alert";

export default function CreateAccount({userId}) {
  const [alert, setAlert] = useState<IAlert>({
    type: "d-none",
    message: "",
  });

  return (
    <Fragment>
      <h2>Create Account</h2>
      <Alert type={alert.type} message={alert.message}/>
      <hr/>
      <AccountForm account={{
        id: undefined,
        userId,
        title: "",
        currency: "",
        balance: 0,
      }} setAlert={setAlert}/>
    </Fragment>
  );
}
