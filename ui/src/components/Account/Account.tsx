import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IAccount, IAccountTransactionHistory} from "../../interfaces";
import AccountSummary from "./components/AccountSummary";
import currencyFormatter from "../../shared/currencyFormatter";
import AccountDiffs from "./components/AccountDiffs";
import AccountTransactions from "./components/AccountTransactions";

export default function Account() {
  const {id} = useParams<{ id: string }>();

  const [account, setAccount] = useState<IAccount>();
  const [balance, setBalance] = useState<IAccountTransactionHistory>();
  const [formatter, setFormatter] = useState<any>();

  useEffect(() => {
    setAccount({
      id,
      title: "Account Title",
      currency: "USD",
      balance: 1234,
    });

    setBalance({
      diffByPeriod: {
        month: -100,
        quarter: 200,
        halfYear: 500,
        year: 1000,
      },
      transactions: [
        {
          id: "1",
          timestamp: new Date(),
          amount: 1234,
          type: "Deposit",
        }, {
          id: "2",
          timestamp: new Date(),
          amount: -123,
          type: "Dividend",
        }
      ],
    })
  }, []);

  useEffect(() => {
    account && setFormatter(currencyFormatter(account.currency));
  }, [account]);

  return (
    <Fragment>
      <h2>Account {account?.id}: {account?.title}</h2>

      {account && formatter
        ? <AccountSummary account={account} formatter={formatter}/>
        : null}

      {balance && formatter
        ? <AccountDiffs diffs={balance.diffByPeriod} formatter={formatter}/>
        : null}

      {balance && formatter
        ? <AccountTransactions transactions={balance.transactions} formatter={formatter}/>
        : null}
    </Fragment>
  );
}
