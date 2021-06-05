import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
import Login from "./Components/Auth/Login";
import TaskList from "./Components/Task/TaskList";
import SignUp from "./Components/Auth/SignUp";
import PrivateRoute from "./Components/routing/PrivateRoute";
import { loadUser } from "./actions/authActions";
import { setUserToken } from "./utils/setUserToken";
import UpdateTaskForm from "./Components/Task/UpdateTaskForm";
const App = () => {
  if (localStorage.token) {
    setUserToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        {/* <Alert /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
          <PrivateRoute exact path="/task" component={TaskList} />
          <PrivateRoute exact path="/task/:id" component={UpdateTaskForm} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
