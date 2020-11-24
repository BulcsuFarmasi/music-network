import React, { lazy, FunctionComponent, Suspense } from "react";

import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { History } from "history";

import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import { AppState } from "../../models/state/app-state";

const Profile = lazy(() => import("../Profile/Profile/Profile"));
const AddTrack = lazy(() => import("../Tracks/AddTrack/AddTrack"));

interface Props {
  authed: boolean;
  history: History;
}

const Routes: FunctionComponent<Props> = (props: Props) => {
  const { authed } = props;

  const unauthedRoutes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/" />
    </Switch>
  );
  const authedRoutes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/add-track" render={() => <AddTrack {...props} />} />
      <Route path="/:accountId" exact render={() => <Profile />} />
    </Switch>
  );

  const routes = authed ? authedRoutes : unauthedRoutes;

  return <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>;
};

const mapStateToProps = (state: AppState) => {
  return {
    authed: state.auth.authed,
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
