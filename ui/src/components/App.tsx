import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Accounts from "./Accounts";
import Dashboard from "./Dashboard";
import AppFooter from "./AppFooter";
import AccountDetails from "./AccountDetails";
import Goals from "./Goals";
import Goal from "./Goal";
import EditAccount from "./EditAccount";
import CreateAccount from "./CreateAccount";

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Finzy</h1>
          <hr className="mb-3"/>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/account/list">Accounts</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/goals">Goals</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-9">
            <Switch>
              <Route path="/account/create">
                <CreateAccount userId={"2704aed7-e431-4ee1-90d6-465c4f744c61"}/>
              </Route>
              <Route path="/account/edit/:id" component={EditAccount}/>
              <Route path="/account/list/:id" component={AccountDetails}/>
              <Route path="/account/list">
                <Accounts/>
              </Route>
              <Route path="/goals/:id">
                <Goal/>
              </Route>
              <Route path="/goals">
                <Goals/>
              </Route>
              <Route path="/">
                <Dashboard/>
              </Route>
            </Switch>
          </div>
        </div>

        <AppFooter/>
      </div>
    </Router>
  );
}
