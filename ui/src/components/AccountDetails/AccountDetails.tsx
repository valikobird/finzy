import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IAccount, IAccountTransactionHistory} from "../../interfaces";
import currencyFormatter from "../../shared/currencyFormatter";
import AccountSummary from "./components/AccountSummary";
import AccountDiffs from "./components/AccountDiffs";
import AccountTransactions from "./components/AccountTransactions";

export default function AccountDetails() {
  const {id} = useParams<{ id: string }>();

  const [account, setAccount] = useState<IAccount>();
  const [balance, setBalance] = useState<IAccountTransactionHistory>();
  const [formatter, setFormatter] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/account/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          let err = Error(`Invalid response code: ${response.status}`);
          setError(err);
          return {account: null};
        } else {
          error && setError(null);
          return response.json();
        }
      })
      .then((json) => {
        setAccount(json.account);
        setIsLoaded(true);
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
        },
        {
          id: "2",
          timestamp: new Date(),
          amount: -123,
          type: "Dividend",
        },
      ],
    });
  }, []);

  useEffect(() => {
    account && setFormatter(currencyFormatter(account.currency));
  }, [account]);

  return (
    <Fragment>
      {error
        ? <div>Error: {error.message}</div>
        : !isLoaded
          ? <p>Loading...</p>
          : (
            <Fragment>
              <h2>{account?.title} ({account?.currency})</h2>
              <hr/>
              {account ? (
                <Fragment>
                  <a href={`/account/edit/${account?.id}`} className={"btn btn-secondary"}>Edit</a>
                  <hr/>
                </Fragment>
              ) : null}

              {account && formatter ? (
                <AccountSummary account={account} formatter={formatter}/>
              ) : null}

              {balance && formatter ? (
                <AccountDiffs diffs={balance.diffByPeriod} formatter={formatter}/>
              ) : null}

              {balance && formatter ? (
                <AccountTransactions
                  transactions={balance.transactions}
                  formatter={formatter}
                />
              ) : null}
            </Fragment>
          )
      }
    </Fragment>
  );
}
