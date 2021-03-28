import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { FormSelect } from "../form/FormSelect";
import { LeadSelect } from "../lead/LeadSelect";
import { Submission as TSubmission } from "../api/submission/Submission";
import { SubmissionUpdateInput } from "../api/submission/SubmissionUpdateInput";

export const Submission = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/submissions/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TSubmission,
    AxiosError,
    [string, string]
  >(["get-/api/submissions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/submissions"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TSubmission, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/submissions"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//submissions");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TSubmission, AxiosError, SubmissionUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/submissions"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: SubmissionUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.anonId);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["anonId", "data", "form", "lead"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"submission"} ${
                  data?.anonId && data?.anonId.length ? data.anonId : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="anon_id" name="anonId" />
            </div>
            <div>
              <TextField label="data" name="data" textarea />
            </div>
            <div>
              <FormSelect label="form" name="form.id" />
            </div>
            <div>
              <LeadSelect label="lead" name="lead.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
