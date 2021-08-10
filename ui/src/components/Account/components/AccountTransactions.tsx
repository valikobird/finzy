import React from "react";
import {IAccountTransaction} from "../../../interfaces";

interface IProps {
  transactions: Array<IAccountTransaction>,
  formatter: any,
}

export default function AccountTransactions({transactions, formatter}: IProps) {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Amount</th>
        <th scope="col">Type</th>
      </tr>
      </thead>
      <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.timestamp.toLocaleDateString()}</td>
          <td>{formatter.format(transaction.amount)}</td>
          <td>{transaction.type}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};
