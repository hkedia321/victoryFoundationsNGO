import { Route, Switch } from "react-router-dom";
import UserManagementScreen from "./components/UserManagementScreen";
import UserManagementEditScreen from "./components/UserManagementEditScreen";
import React from "react";
import UserStatus from "./components/UserStatus";
import CreateHub from "./components/CreateHub";
import HubActivityTracker from "./components/HubActivityTracker";
import NoMatch from "./components/NoMatch";
import NewStudent from "./components/NewStudent";
import LandingPage from "./components/LandingPage";
import ScoringPage from "./components/ScoringPage";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/user_mgmt" component={UserManagementScreen} />
      <Route path="/edit_user" component={UserManagementEditScreen} />
      <Route path="/user_status" component={UserStatus} />
      <Route path="/create_hub" component={CreateHub} />
      <Route path={"/new_std"} component={NewStudent} />
      <Route path="/hub_activity_tracker" component={HubActivityTracker} />
      <Route path="/hub_score/:hubId/:activityDate" component={ScoringPage} />

      <Route path="/" component={LandingPage} />
      <Route component={NoMatch} />
    </Switch>
  );
};
