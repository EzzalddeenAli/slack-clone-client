import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Home } from "./routes/Home";
import { Register } from './routes/Register';
import { Login } from './routes/Login';
import { CreateTeam } from "./routes/CreateTeam";
import { AppLayout } from "./routes/MainApp/index";
import { JoinTeam } from './routes/JoinTeam';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/create-team" component={CreateTeam} />
        <Route path="/view-team/:teamid?/:channelid?" component={AppLayout} />
        <Route path="/join-team" component={JoinTeam} />
        <Route path="/view-team-error" component={() => "You have no teams"}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
