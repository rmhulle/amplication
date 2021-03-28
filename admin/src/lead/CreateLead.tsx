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
import { ClientSelect } from "../client/ClientSelect";
import { Lead } from "../api/lead/Lead";
import { LeadCreateInput } from "../api/lead/LeadCreateInput";

const INITIAL_VALUES = {} as LeadCreateInput;

export const CreateLead = (): React.ReactElement => {
  useBreadcrumbs("/leads/new", "Create lead");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Lead,
    AxiosError,
    LeadCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/leads", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/leads"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: LeadCreateInput) => {
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
            <FormHeader title={"Create lead"}>
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
            <ClientSelect label="client" name="client.id" />
          </div>
          <div>
            <TextField type="email" label="email" name="email" />
          </div>
          <div>
            <TextField label="name" name="name" />
          </div>
          <div>
            <TextField label="phone" name="phone" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
