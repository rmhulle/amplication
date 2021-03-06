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
import { ClientSelect } from "../client/ClientSelect";
import { Lead as TLead } from "../api/lead/Lead";
import { LeadUpdateInput } from "../api/lead/LeadUpdateInput";

export const Lead = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/leads/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TLead,
    AxiosError,
    [string, string]
  >(["get-/api/leads", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/leads"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TLead, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/leads"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//leads");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TLead, AxiosError, LeadUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/leads"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: LeadUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["anonId", "client", "email", "name", "phone"]),
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
                title={`${"lead"} ${
                  data?.name && data?.name.length ? data.name : data?.id
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
