import React from "react";
import {IAccountTransactionDiff} from "../../../interfaces";

interface IProps {
  diffs: IAccountTransactionDiff,
  formatter: any,
}

export default function AccountDiffs({diffs, formatter}: IProps) {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Quarter</th>
        <th scope="col">Half Year</th>
        <th scope="col">Year</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{formatter.format(diffs.month)}</td>
        <td>{formatter.format(diffs.quarter)}</td>
        <td>{formatter.format(diffs.halfYear)}</td>
        <td>{formatter.format(diffs.year)}</td>
      </tr>
      </tbody>
    </table>
  );
};
