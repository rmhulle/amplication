import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SubmissionList } from "./SubmissionList";
import { CreateSubmission } from "./CreateSubmission";
import { Submission } from "./Submission";

export const SubmissionIndex = (): React.ReactElement => {
  useBreadcrumbs("/submissions/", "submissions");

  return (
    <Switch>
      <PrivateRoute exact path={"/submissions/"} component={SubmissionList} />
      <PrivateRoute path={"/submissions/new"} component={CreateSubmission} />
      <PrivateRoute path={"/submissions/:id"} component={Submission} />
    </Switch>
  );
};
