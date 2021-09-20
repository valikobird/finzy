import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IAccount} from "../interfaces";
import currencyFormatter from "../shared/currencyFormatter";

export default function Accounts() {
  const [accounts, setAccounts] = useState<Array<IAccount>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/v1/accounts")
      .then((response) => {
        if (response.status !== 200) {
          let err = Error(`Invalid response code: ${response.status}`);
          setError(err);
          return {accounts: []};
        } else {
          error && setError(null);
          return response.json();
        }
      })
      .then((json) => {
        setAccounts(json.accounts ?? []);
        setIsLoaded(true);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h2>Accounts</h2>

      <table className="table table-hover">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Currency</th>
          <th scope="col">Balance</th>
        </tr>
        </thead>
        <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>
              <Link to={`/account/list/${account.id}`}>{account.title}</Link>
            </td>
            <td>{account.currency}</td>
            <td>
              {currencyFormatter(account.currency).format(account.balance)}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  );
}
