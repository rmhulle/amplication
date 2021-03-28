import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { FormSelect } from "../form/FormSelect";
import { LeadSelect } from "../lead/LeadSelect";
import { Submission } from "../api/submission/Submission";
import { SubmissionCreateInput } from "../api/submission/SubmissionCreateInput";

const INITIAL_VALUES = {} as SubmissionCreateInput;

export const CreateSubmission = (): React.ReactElement => {
  useBreadcrumbs("/submissions/new", "Create submission");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Submission,
    AxiosError,
    SubmissionCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/submissions", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/submissions"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SubmissionCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create submission"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
