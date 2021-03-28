import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClientList } from "./ClientList";
import { CreateClient } from "./CreateClient";
import { Client } from "./Client";

export const ClientIndex = (): React.ReactElement => {
  useBreadcrumbs("/clients/", "clients");

  return (
    <Switch>
      <PrivateRoute exact path={"/clients/"} component={ClientList} />
      <PrivateRoute path={"/clients/new"} component={CreateClient} />
      <PrivateRoute path={"/clients/:id"} component={Client} />
    </Switch>
  );
};
