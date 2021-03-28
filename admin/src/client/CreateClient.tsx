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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Client } from "../api/client/Client";
import { ClientCreateInput } from "../api/client/ClientCreateInput";

const INITIAL_VALUES = {} as ClientCreateInput;

export const CreateClient = (): React.ReactElement => {
  useBreadcrumbs("/clients/new", "Create client");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Client,
    AxiosError,
    ClientCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/clients", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/clients"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ClientCreateInput) => {
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
            <FormHeader title={"Create client"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
