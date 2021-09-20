import React from "react";
import {IAccount} from "../../../interfaces";

interface IProps {
  account: IAccount,
  formatter: any,
}

export default function AccountSummary({account, formatter}: IProps) {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Currency</th>
        <th scope="col">Balance</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{account.title}</td>
        <td>{account.currency}</td>
        <td>{account && formatter.format(account.balance)}</td>
      </tr>
      </tbody>
    </table>
  );
};
