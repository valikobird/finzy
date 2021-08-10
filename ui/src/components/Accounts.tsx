import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {IAccount} from "../interfaces";
import currencyFormatter from "../shared/currencyFormatter";

export default function Accounts() {

  const [accounts, setAccounts] = useState<Array<IAccount>>([]);

  useEffect(() => {
    setAccounts([
      {id: "1", title: "Cash", currency: "CLP", balance: 16000000.00},
      {id: "2", title: "Payoneer", currency: "USD", balance: 10000.00},
    ]);
  }, []);

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
        {accounts.map(account => (
          <tr key={account.id}>
            <td>
              <Link to={`/accounts/${account.id}`}>{account.title}</Link>
            </td>
            <td>{account.currency}</td>
            <td>{currencyFormatter(account.currency).format(account.balance)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  );
};
