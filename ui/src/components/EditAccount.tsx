import React, {Fragment, useEffect, useState} from "react";
import {IAccount, IAlert} from "../interfaces";
import {useParams} from "react-router-dom";
import AccountForm from "./AccountForm";
import Alert from "./ui-components/Alert";

export default function EditAccount() {
  const {id} = useParams<{ id: string }>();

  const emptyAccount = {
    id: undefined,
    userId: "2704aed7-e431-4ee1-90d6-465c4f744c61",
    title: "",
    currency: "",
    balance: 0,
  };

  const [account, setAccount] = useState<IAccount>(emptyAccount);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [alert, setAlert] = useState<IAlert>({
    type: "d-none",
    message: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/v1/account/${id}`)
        .then((response) => {
          if (response.status !== 200) {
            let err = Error(`Invalid response code: ${response.status}`);
            setError(err);
            return {
              account: emptyAccount
            };
          } else {
            error && setError(null);
            return response.json();
          }
        })
        .then((json) => {
          if (json.account) {
            setAccount(json.account);
          }
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, []);

  return (
    <Fragment>
      {error
        ? <div>Error: {error.message}</div>
        : !isLoaded
          ? <p>Loading...</p>
          : (
            <Fragment>
              <h2>Edit Account</h2>
              <Alert type={alert.type} message={alert.message}/>
              <hr/>
              {account.id
                ? <AccountForm account={{...account}} setAlert={setAlert}/>
                : <p>Account not found</p>
              }
            </Fragment>
          )
      }
    </Fragment>
  );
};
