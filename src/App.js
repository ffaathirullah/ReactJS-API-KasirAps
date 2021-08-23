import React from "react";
import { Home, Sukses } from "./pages";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NavbarComponent } from "./components";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sukses" component={Sukses} exact />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
