import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { FormList } from "./FormList";
import { CreateForm } from "./CreateForm";
import { Form } from "./Form";

export const FormIndex = (): React.ReactElement => {
  useBreadcrumbs("/forms/", "forms");

  return (
    <Switch>
      <PrivateRoute exact path={"/forms/"} component={FormList} />
      <PrivateRoute path={"/forms/new"} component={CreateForm} />
      <PrivateRoute path={"/forms/:id"} component={Form} />
    </Switch>
  );
};
