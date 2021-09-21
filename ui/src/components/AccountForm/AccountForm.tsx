import React, {useState} from "react";
import Input from "../form-components/Input";
import Select from "../form-components/Select";
import {IAccount} from "../../interfaces";
import "./AccountForm.css";

interface IProps {
  account: IAccount;
  setAlert: Function;
}

export default function AccountForm({account: {id, userId, title, currency, balance}, setAlert}: IProps) {
  const [account, setAccount] = useState<IAccount>({
    id,
    userId,
    title,
    currency,
    balance,
  });

  const [currencyList, setCurrencyList] = useState({
    "inUse": ["CLP", "MXN", "USD"],
    "all": undefined, // TODO: load on demand using ReactQuery
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // client side validation
    if (!isFormValid()) {
      return false;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    fetch("http://localhost:4000/v1/account", {
      method: payload.id !== "" ? "PUT" : "POST",
      body: JSON.stringify(payload),
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlert({
            type: "alert-danger",
            message: data.error.message,
          });
        } else {
          setAlert({
            type: "alert-success",
            message: "Changes saved!"
          });
        }
      });
  };

  const isFormValid = () => {
    let preErrors = [];
    if (account.title === "") {
      preErrors.push("title");
    }
    if (account.currency === "") {
      preErrors.push("currency");
    }

    setErrors(preErrors);

    return !preErrors.length;
  };

  const hasError = (key) => errors.indexOf(key) !== -1;

  return (
    <form onSubmit={handleSubmit}>
      <input type={"hidden"} name={"id"} id={"id"} defaultValue={account.id}/>
      <input type={"hidden"} name={"userId"} id={"userId"} defaultValue={account.userId}/>
      <input type={"hidden"} name={"balance"} id={"balance"} defaultValue={account.balance}/>
      <Input type={"text"} id={"title"} name={"title"} title={"Title"} value={account.title}
             handleChange={handleChange} className={hasError("title") ? "is-invalid" : ""}
             errorDiv={hasError("title") ? "text-danger" : "d-none"} errorMsg={"Please specify a title"}/>
      <Select id={"currency"} name={"currency"} title={"Currency"} value={account.currency}
              handleChange={handleChange} placeholder={"Select a currency"} options={currencyList.inUse}
              className={hasError("currency") ? "is-invalid" : ""}
              errorDiv={hasError("currency") ? "text-danger" : "d-none"} errorMsg={"Please select a currency"}/>
      <button className="btn btn-primary">Save</button>
    </form>
  );
}
