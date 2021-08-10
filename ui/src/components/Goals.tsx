import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {IGoal} from "../interfaces";
import currencyFormatter from "../shared/currencyFormatter";

export default function Goals() {

  const [goals, setGoals] = useState<Array<IGoal>>([]);

  useEffect(() => {
    setGoals([
      {
        id: "1",
        title: "Emergency fund",
        currency: "USD",
        requires: 1000,
        achieved: 0,
        parts: [],
      },
      {
        id: "2",
        title: "6 months fund",
        currency: "USD",
        requires: 30000,
        achieved: 0,
        parts: [],
      },
    ]);
  }, []);

  return (
    <Fragment>
      <h2>Goals</h2>

      <table className="table table-hover">
        <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Currency</th>
          <th scope="col">Requires</th>
          <th scope="col">Achieved</th>
          <th scope="col">Left</th>
        </tr>
        </thead>
        <tbody>
        {goals.map(goal => (
          <tr key={goal.id}>
            <td>
              <Link to={`/goals/${goal.id}`}>{goal.title}</Link>
            </td>
            <td>{goal.currency}</td>
            <td>{currencyFormatter(goal.currency).format(goal.requires)}</td>
            <td>{currencyFormatter(goal.currency).format(goal.achieved)}</td>
            <td>{currencyFormatter(goal.currency).format(goal.requires - goal.achieved)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Fragment>
  );
};
