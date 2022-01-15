import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "./App";

import Error from "./components/error";
import { AuthContext } from "./contexts/authContext";
import { UserContext } from "./contexts/userContext";
import { useAuth } from "./hooks/useAuth";
import Auth from "./screens/auth";

var createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();
const RouterPath = () => {
  const { auth, state } = useAuth();
  if (state.loading) {
    return <div>Loading...</div>;
  }
  console.log(state);

  if (state.user?.user) {
    return (
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={state.user}>
          <div>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={App} />

                <Route component={Error} />
              </Switch>
            </Router>
          </div>
        </UserContext.Provider>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <Auth />
    </AuthContext.Provider>
  );
};

export default RouterPath;
