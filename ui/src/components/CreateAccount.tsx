import React, {Fragment} from "react";
import AccountForm from "./AccountForm";

export default function CreateAccount({userId}) {
  return (
    <Fragment>
      <h2>Create Account</h2>
      <hr/>
      <AccountForm id={undefined} userId={userId} title={""} currency={""} balance={0}/>
    </Fragment>
  );
}
