import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import AppFooter from "./AppFooter";
import Account from "./Account";
import Goals from "./Goals";
import Goal from "./Goal";

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Finzy</h1>
          <hr className="mb-3" />
        </div>
        <div className="row">
          <div className="col-md-3">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/accounts">Accounts</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/goals">Goals</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-9">
            <Switch>
              <Route path="/accounts/:id" component={Account} />
              <Route path="/accounts">
                <Accounts />
              </Route>
              <Route path="/goals/:id">
                <Goal />
              </Route>
              <Route path="/goals">
                <Goals />
              </Route>
              <Route path="/">
                <Dashboard />
                {/*<Signature/>*/}
              </Route>
            </Switch>
          </div>
        </div>

        <AppFooter />
      </div>
    </Router>
  );
}
