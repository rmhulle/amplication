import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { LeadList } from "./LeadList";
import { CreateLead } from "./CreateLead";
import { Lead } from "./Lead";

export const LeadIndex = (): React.ReactElement => {
  useBreadcrumbs("/leads/", "leads");

  return (
    <Switch>
      <PrivateRoute exact path={"/leads/"} component={LeadList} />
      <PrivateRoute path={"/leads/new"} component={CreateLead} />
      <PrivateRoute path={"/leads/:id"} component={Lead} />
    </Switch>
  );
};
